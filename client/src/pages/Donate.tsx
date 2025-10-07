import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Load Stripe outside of component
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_placeholder");

// Donation amounts
const PRESET_AMOUNTS = [25, 50, 100, 250, 500];
const SPONSOR_AMOUNTS = [25, 50, 100];

interface CheckoutFormProps {
  donationType: "general" | "sponsor";
  amount: number;
  donorInfo: {
    name: string;
    email: string;
  };
}

function CheckoutForm({ donationType, amount, donorInfo }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donate?success=true`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Payment Error",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="payment-form">
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-2">Donation Summary</h4>
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground">
            {donationType === "sponsor" ? "Child Sponsorship" : "General Donation"}
          </span>
          <span className="font-semibold text-foreground">${amount}</span>
        </div>
        {donorInfo.name && (
          <div className="text-sm text-muted-foreground">
            Donor: {donorInfo.name} ({donorInfo.email})
          </div>
        )}
      </div>

      <PaymentElement />

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-4 font-semibold text-lg btn-primary"
        disabled={!stripe || isProcessing}
        data-testid="complete-payment-button"
      >
        {isProcessing ? (
          <>
            <div className="spinner w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
            Processing Payment...
          </>
        ) : (
          <>
            <i className="fas fa-lock mr-2"></i> Complete Donation - ${amount}
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        <i className="fas fa-shield-alt mr-1"></i>
        Your payment is secure and encrypted. Powered by Stripe.
      </p>
    </form>
  );
}

interface DonationFormProps {
  type: "general" | "sponsor";
  onPayment: (amount: number, donorInfo: { name: string; email: string }) => void;
}

function DonationForm({ type, onPayment }: DonationFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(type === "sponsor" ? 50 : 100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);

  const presetAmounts = type === "sponsor" ? SPONSOR_AMOUNTS : PRESET_AMOUNTS;
  const finalAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (finalAmount < 1) {
      return;
    }

    if (!donorName.trim() || !donorEmail.trim()) {
      return;
    }

    onPayment(finalAmount, { name: donorName.trim(), email: donorEmail.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid={`${type}-donation-form`}>
      {/* Donor Information */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Your Information</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="donor-name">Full Name *</Label>
            <Input
              id="donor-name"
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="Your full name"
              required
              data-testid="donor-name-input"
            />
          </div>
          <div>
            <Label htmlFor="donor-email">Email Address *</Label>
            <Input
              id="donor-email"
              type="email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              placeholder="your@email.com"
              required
              data-testid="donor-email-input"
            />
          </div>
        </div>
      </div>

      {/* Amount Selection */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">
          {type === "sponsor" ? "Monthly Sponsorship Amount" : "Donation Amount"}
        </h4>
        
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                !isCustom && selectedAmount === amount
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
              onClick={() => {
                setSelectedAmount(amount);
                setIsCustom(false);
              }}
              data-testid={`preset-amount-${amount}`}
            >
              ${amount}
            </button>
          ))}
        </div>

        <div>
          <Label htmlFor="custom-amount">Custom Amount</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="custom-amount"
              type="number"
              min="1"
              step="0.01"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setIsCustom(!!e.target.value);
              }}
              className="pl-8"
              placeholder="Enter amount"
              data-testid="custom-amount-input"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-4 font-semibold text-lg btn-primary"
        disabled={finalAmount < 1 || !donorName.trim() || !donorEmail.trim()}
        data-testid="proceed-to-payment-button"
      >
        <i className="fas fa-arrow-right mr-2"></i>
        Proceed to Payment - ${finalAmount.toFixed(2)}
      </Button>
    </form>
  );
}

export default function Donate() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [donationType, setDonationType] = useState<"general" | "sponsor">("general");
  const [showPayment, setShowPayment] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [donorInfo, setDonorInfo] = useState<{ name: string; email: string }>({ name: "", email: "" });

  // Check for success parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      toast({
        title: "Payment Successful!",
        description: "Thank you for your generous donation. You will receive an email receipt shortly.",
      });
      // Clear the URL parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Check for donation type
    const type = urlParams.get('type');
    if (type === 'sponsor') {
      setDonationType('sponsor');
    }
  }, [location, toast]);

  const paymentMutation = useMutation({
    mutationFn: async (data: { amount: number; donorName: string; donorEmail: string; type: string }) => {
      const response = await apiRequest("POST", "/api/create-payment-intent", data);
      return response.json();
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
      setShowPayment(true);
    },
    onError: (error: any) => {
      toast({
        title: "Payment Setup Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handlePayment = (amount: number, donorInfo: { name: string; email: string }) => {
    setDonationAmount(amount);
    setDonorInfo(donorInfo);
    
    paymentMutation.mutate({
      amount,
      donorName: donorInfo.name,
      donorEmail: donorInfo.email,
      type: donationType
    });
  };

  const handleBack = () => {
    setShowPayment(false);
    setClientSecret("");
  };

  const impactItems = [
    { amount: 25, impact: "Provides school supplies for 1 child for a month" },
    { amount: 50, impact: "Funds leadership training for 2 youth" },
    { amount: 100, impact: "Supports a mentorship program for 5 children" },
    { amount: 250, impact: "Sponsors educational materials for an entire classroom" },
    { amount: 500, impact: "Funds a community empowerment workshop" },
  ];

  if (showPayment && clientSecret) {
    return (
      <div className="py-20 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mb-4"
              data-testid="back-to-donation-button"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back to Donation
            </Button>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Complete Your Donation</h1>
            <p className="text-muted-foreground">
              You're making a difference in the lives of children and communities.
            </p>
          </div>

          <Card className="shadow-lg border border-border">
            <CardContent className="p-8">
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm 
                  donationType={donationType}
                  amount={donationAmount}
                  donorInfo={donorInfo}
                />
              </Elements>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16" data-testid="donate-header">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Donate</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Make a Difference Today
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Your generous contribution helps us empower youth, support orphans, and build stronger communities across Liberia.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border border-border">
              <CardContent className="p-8">
                <Tabs value={donationType} onValueChange={(value) => setDonationType(value as "general" | "sponsor")}>
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="general" data-testid="general-donation-tab">General Donation</TabsTrigger>
                    <TabsTrigger value="sponsor" data-testid="sponsor-donation-tab">Sponsor a Child</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-6">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                        Support Our Mission
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Your donation helps fund our comprehensive programs including leadership development, 
                        community engagement, youth mentorship, and educational support.
                      </p>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start" data-testid="donation-use-1">
                          <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                          <span className="text-muted-foreground">School kits for orphans and underprivileged children</span>
                        </li>
                        <li className="flex items-start" data-testid="donation-use-2">
                          <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                          <span className="text-muted-foreground">Youth leadership camps and workshops</span>
                        </li>
                        <li className="flex items-start" data-testid="donation-use-3">
                          <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                          <span className="text-muted-foreground">One-on-one mentorship programs</span>
                        </li>
                        <li className="flex items-start" data-testid="donation-use-4">
                          <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                          <span className="text-muted-foreground">Community empowerment drives and initiatives</span>
                        </li>
                      </ul>
                    </div>

                    {paymentMutation.isPending ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="spinner w-8 h-8 border-4 border-primary border-t-transparent rounded-full mr-3"></div>
                        <span className="text-muted-foreground">Setting up secure payment...</span>
                      </div>
                    ) : (
                      <DonationForm type="general" onPayment={handlePayment} />
                    )}
                  </TabsContent>

                  <TabsContent value="sponsor" className="space-y-6">
                    <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg p-6 border-l-4 border-accent">
                      <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                        <i className="fas fa-heart text-accent mr-2"></i>
                        Sponsor a Child's Education
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Make a lasting impact by sponsoring a child's education. Your monthly contribution provides 
                        essential school supplies, uniforms, stationery, and educational support directly to children in need.
                      </p>
                      <div className="bg-accent/10 rounded-lg p-4">
                        <h4 className="font-semibold text-foreground mb-2">What Your Sponsorship Includes:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Complete school supply kit (notebooks, pens, pencils)</li>
                          <li>• School uniform and backpack</li>
                          <li>• Educational materials and textbooks</li>
                          <li>• Regular progress updates and photos</li>
                          <li>• Direct impact on a child's future</li>
                        </ul>
                      </div>
                    </div>

                    {paymentMutation.isPending ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="spinner w-8 h-8 border-4 border-primary border-t-transparent rounded-full mr-3"></div>
                        <span className="text-muted-foreground">Setting up secure payment...</span>
                      </div>
                    ) : (
                      <DonationForm type="sponsor" onPayment={handlePayment} />
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Impact Information */}
          <div className="space-y-8">
            {/* Impact Calculator */}
            <Card className="shadow-lg border border-border" data-testid="impact-calculator">
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-4">
                  <i className="fas fa-calculator text-primary mr-2"></i>
                  Your Impact
                </h3>
                <div className="space-y-4">
                  {impactItems.map((item) => (
                    <div key={item.amount} className="flex justify-between items-start text-sm">
                      <span className="font-semibold text-primary">${item.amount}</span>
                      <span className="text-muted-foreground text-right flex-1 ml-3">
                        {item.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Information */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-4">
                  <i className="fas fa-shield-alt text-primary mr-2"></i>
                  Secure & Trusted
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <i className="fas fa-lock text-primary mt-0.5 mr-3 flex-shrink-0"></i>
                    <span>256-bit SSL encryption protects your payment information</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-credit-card text-primary mt-0.5 mr-3 flex-shrink-0"></i>
                    <span>Powered by Stripe - trusted by millions worldwide</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-receipt text-primary mt-0.5 mr-3 flex-shrink-0"></i>
                    <span>Instant email receipts for tax purposes</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-heart text-primary mt-0.5 mr-3 flex-shrink-0"></i>
                    <span>100% of your donation goes directly to our programs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="shadow-lg border border-border">
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                  Need Help?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Our team is here to assist you with your donation or answer any questions.
                </p>
                <div className="space-y-2 text-sm">
                  <a href="mailto:movementforchangemcefl@gmail.com" className="flex items-center text-primary hover:underline">
                    <i className="fas fa-envelope mr-2"></i>
                    movementforchangemcefl@gmail.com
                  </a>
                  <a href="tel:+231775333753" className="flex items-center text-primary hover:underline">
                    <i className="fas fa-phone mr-2"></i>
                    (+231) 775333753
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Other Ways to Help */}
        <div className="mt-16 text-center" data-testid="other-ways-section">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-8">Other Ways to Help</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <Card className="shadow-lg border border-border card-hover">
              <CardContent className="p-6 text-center">
                <i className="fas fa-hands-helping text-primary text-3xl mb-4"></i>
                <h3 className="font-semibold text-foreground mb-2">Volunteer</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Join our team and directly impact lives through hands-on service.
                </p>
                <Button variant="outline" size="sm" data-testid="volunteer-link-button">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border border-border card-hover">
              <CardContent className="p-6 text-center">
                <i className="fas fa-handshake text-accent text-3xl mb-4"></i>
                <h3 className="font-semibold text-foreground mb-2">Partner</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Corporate partnerships amplify our reach and impact.
                </p>
                <Link href="/partnerships">
                  <Button variant="outline" size="sm" data-testid="partner-link-button">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-lg border border-border card-hover">
              <CardContent className="p-6 text-center">
                <i className="fas fa-share-alt text-secondary text-3xl mb-4"></i>
                <h3 className="font-semibold text-foreground mb-2">Share</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Spread the word about our mission on social media.
                </p>
                <Link href="/share-donation">
                  <Button variant="outline" size="sm" data-testid="share-link-button">
                    Share Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
