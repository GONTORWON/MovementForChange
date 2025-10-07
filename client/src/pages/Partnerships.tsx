import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Partnerships() {
  const partnershipTypes = [
    {
      title: "Corporate Sponsorship",
      description: "Partner with MCEFL to sponsor programs, events, or initiatives that align with your corporate social responsibility goals.",
      icon: "fas fa-building",
      benefits: [
        "Brand visibility at events and on our platforms",
        "Tax-deductible contributions",
        "Employee engagement opportunities",
        "Impact reporting and recognition"
      ]
    },
    {
      title: "Strategic Partnerships",
      description: "Collaborate with us on joint initiatives that leverage your organization's expertise to maximize community impact.",
      icon: "fas fa-handshake",
      benefits: [
        "Co-branded programs and initiatives",
        "Shared resources and expertise",
        "Joint advocacy and campaigns",
        "Long-term collaborative framework"
      ]
    },
    {
      title: "In-Kind Donations",
      description: "Contribute products, services, or resources that support our programs and operations.",
      icon: "fas fa-gift",
      benefits: [
        "Direct impact on program delivery",
        "Efficient use of your resources",
        "Recognition for your contribution",
        "Volunteer engagement opportunities"
      ]
    },
    {
      title: "Grant Partnerships",
      description: "Foundation and institutional partners supporting our work through grants and programmatic funding.",
      icon: "fas fa-money-check-alt",
      benefits: [
        "Comprehensive impact reports",
        "Regular program updates",
        "Site visits and engagement",
        "Joint learning and evaluation"
      ]
    }
  ];

  const currentPartners = [
    { name: "Community Foundation of Liberia", type: "Foundation Partner" },
    { name: "Youth Empowerment Initiative", type: "Strategic Partner" },
    { name: "Education for All Liberia", type: "Program Partner" },
    { name: "Global Youth Network", type: "International Partner" }
  ];

  return (
    <div className="py-20 bg-muted min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16" data-testid="partnerships-header">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Partner With Us</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Creating Impact Together
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Join us in building a brighter future for Liberia's youth. Our partnerships create sustainable change that transforms communities.
          </p>
        </div>

        {/* Partnership Types */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {partnershipTypes.map((type, index) => (
            <Card key={index} className="card-hover" data-testid={`partnership-type-${index}`}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <i className={`${type.icon} text-secondary text-3xl`}></i>
                </div>
                <h3 className="font-heading font-bold text-2xl mb-3">{type.title}</h3>
                <p className="text-muted-foreground mb-6">{type.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Benefits Include:</h4>
                  {type.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-accent mt-1"></i>
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current Partners */}
        <div className="bg-background rounded-2xl p-8 md:p-12 mb-16" data-testid="current-partners">
          <h2 className="font-heading font-bold text-3xl text-center mb-8">Our Partners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentPartners.map((partner, index) => (
              <div key={index} className="text-center p-6 bg-muted rounded-xl" data-testid={`partner-${index}`}>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-star text-secondary"></i>
                </div>
                <h4 className="font-semibold text-foreground mb-1">{partner.name}</h4>
                <p className="text-xs text-muted-foreground">{partner.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Process */}
        <div className="bg-secondary text-secondary-foreground rounded-2xl p-8 md:p-12 mb-16" data-testid="partnership-process">
          <h2 className="font-heading font-bold text-3xl text-center mb-8">How to Partner With Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Connect</h3>
              <p className="text-secondary-foreground/90">Reach out to discuss your interests and how we can align our goals.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Collaborate</h3>
              <p className="text-secondary-foreground/90">Work together to design a partnership that creates maximum impact.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Create Impact</h3>
              <p className="text-secondary-foreground/90">Launch initiatives and measure the difference we make together.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-accent text-accent-foreground rounded-2xl p-8 md:p-12" data-testid="partnerships-cta">
          <h2 className="font-heading font-bold text-3xl mb-4">Ready to Make a Difference?</h2>
          <p className="text-accent-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Let's explore how your organization can partner with MCEFL to create lasting change in Liberia's communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-accent hover:bg-white/90 px-8 py-3 font-semibold" data-testid="contact-partnerships-button">
                <i className="fas fa-envelope mr-2"></i>
                Contact Us
              </Button>
            </Link>
            <Link href="/donate">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-accent px-8 py-3 font-semibold" data-testid="donate-partnerships-button">
                <i className="fas fa-heart mr-2"></i>
                Support Our Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
