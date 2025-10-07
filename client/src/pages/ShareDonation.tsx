import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ShareDonation() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const donationUrl = window.location.origin + "/donate";

  const handleCopy = () => {
    navigator.clipboard.writeText(donationUrl);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Donation link has been copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(donationUrl)}`
    },
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      color: "bg-sky-500 hover:bg-sky-600",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(donationUrl)}&text=${encodeURIComponent("Support MCEFL's mission to empower youth and transform communities in Liberia!")}`
    },
    {
      name: "LinkedIn",
      icon: "fab fa-linkedin-in",
      color: "bg-blue-700 hover:bg-blue-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(donationUrl)}`
    },
    {
      name: "WhatsApp",
      icon: "fab fa-whatsapp",
      color: "bg-green-600 hover:bg-green-700",
      url: `https://wa.me/?text=${encodeURIComponent("Support MCEFL's mission to empower youth! " + donationUrl)}`
    },
    {
      name: "Email",
      icon: "fas fa-envelope",
      color: "bg-gray-600 hover:bg-gray-700",
      url: `mailto:?subject=${encodeURIComponent("Support MCEFL")}&body=${encodeURIComponent("I'd like to share this opportunity to support MCEFL's mission to empower youth and transform communities in Liberia: " + donationUrl)}`
    }
  ];

  return (
    <div className="py-20 bg-muted min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-testid="share-header">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Share Our Mission</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Spread the Word
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Help us reach more supporters by sharing our donation page with your network. Every share can make a difference!
          </p>
        </div>

        {/* Social Share Buttons */}
        <Card className="mb-8" data-testid="share-buttons">
          <CardContent className="p-8">
            <h2 className="font-heading font-bold text-2xl mb-6 text-center">Share on Social Media</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {shareOptions.map((option, index) => (
                <a
                  key={index}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${option.color} text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all hover:scale-105`}
                  data-testid={`share-${option.name.toLowerCase()}`}
                >
                  <i className={`${option.icon} text-2xl`}></i>
                  <span className="text-sm font-semibold">{option.name}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Copy Link */}
        <Card className="mb-8" data-testid="copy-link">
          <CardContent className="p-8">
            <h2 className="font-heading font-bold text-2xl mb-6 text-center">Copy Donation Link</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={donationUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-muted rounded-lg border border-border text-foreground"
                data-testid="donation-link-input"
              />
              <Button 
                onClick={handleCopy}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                data-testid="copy-link-button"
              >
                <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} mr-2`}></i>
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Impact Message */}
        <Card className="bg-gradient-to-br from-secondary to-accent text-white mb-8" data-testid="impact-message">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-share-alt text-3xl"></i>
            </div>
            <h3 className="font-heading font-bold text-2xl mb-4">Why Your Share Matters</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              When you share our mission with your network, you help us reach potential donors, volunteers, and partners who can multiply our impact. Together, we can transform more lives and strengthen more communities.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">10x</div>
                <div className="text-sm text-white/80">Average reach per share</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">25%</div>
                <div className="text-sm text-white/80">Convert to supporters</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">5+</div>
                <div className="text-sm text-white/80">Lives impacted per donation</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Message */}
        <Card className="mb-8" data-testid="suggested-message">
          <CardContent className="p-8">
            <h2 className="font-heading font-bold text-2xl mb-4">Suggested Share Message</h2>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <p className="text-muted-foreground italic">
                "I'm supporting MCEFL's mission to empower youth and transform communities in Liberia. Their programs provide leadership training, educational support, and opportunities to over 1,000 young people. Join me in making a difference! {donationUrl}"
              </p>
            </div>
            <p className="text-sm text-muted-foreground">Feel free to personalize this message or create your own!</p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center" data-testid="share-cta">
          <h3 className="font-heading font-bold text-2xl mb-4">Ready to Make a Direct Impact?</h3>
          <p className="text-muted-foreground mb-6">While sharing helps spread the word, your direct contribution creates immediate change.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 font-semibold" data-testid="donate-now-button">
                <i className="fas fa-heart mr-2"></i>
                Donate Now
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button variant="outline" className="px-8 py-3 font-semibold" data-testid="get-involved-button">
                <i className="fas fa-hands-helping mr-2"></i>
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
