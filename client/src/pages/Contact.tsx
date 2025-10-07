import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  
  const contactForm = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      contactForm.reset();
      setAgreedToPrivacy(false);
    },
    onError: (error: any) => {
      toast({
        title: "Message Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onContactSubmit = (data: InsertContactSubmission) => {
    if (!agreedToPrivacy) {
      toast({
        title: "Privacy Policy Required",
        description: "Please agree to the privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Address",
      content: (
        <>
          Carey Street, Behind The Old CSA Building<br />
          Monrovia, Liberia<br />
          Postal Code: 1000
        </>
      ),
      color: "primary"
    },
    {
      icon: "fas fa-phone",
      title: "Phone",
      content: (
        <>
          <a href="tel:+231775333753" className="hover:text-primary transition-colors">(+231) 775333753</a><br />
          <a href="tel:+231555147861" className="hover:text-primary transition-colors">(+231) 555147861</a>
        </>
      ),
      color: "accent"
    },
    {
      icon: "fas fa-envelope",
      title: "Email",
      content: (
        <a href="mailto:movementforchangemcefl@gmail.com" className="hover:text-primary transition-colors">
          movementforchangemcefl@gmail.com
        </a>
      ),
      color: "secondary"
    },
    {
      icon: "fas fa-globe",
      title: "Website",
      content: (
        <a href="https://www.movementforchangemcefl.org" className="hover:text-primary transition-colors">
          www.movementforchangemcefl.org
        </a>
      ),
      color: "primary"
    }
  ];

  const socialLinks = [
    { platform: "Facebook", icon: "fab fa-facebook-f", href: "#" },
    { platform: "Instagram", icon: "fab fa-instagram", href: "#" },
    { platform: "Twitter", icon: "fab fa-twitter", href: "#" },
    { platform: "LinkedIn", icon: "fab fa-linkedin-in", href: "#" },
  ];

  return (
    <div className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16" data-testid="contact-header">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Get In Touch
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Have questions or want to learn more? We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            {/* Head Office */}
            <Card className="shadow-lg border border-border mb-8" data-testid="contact-info-card">
              <CardContent className="p-8">
                <h2 className="font-heading font-bold text-xl text-foreground mb-6">Head Office</h2>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start" data-testid={`contact-info-${index}`}>
                      <div className={`w-12 h-12 bg-${info.color}/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                        <i className={`${info.icon} text-${info.color} text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                        <div className="text-muted-foreground">
                          {info.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Social Media */}
            <Card className="bg-gradient-to-br from-primary to-secondary text-white" data-testid="social-media-card">
              <CardContent className="p-8">
                <h3 className="font-heading font-bold text-xl mb-6">Follow Us</h3>
                <p className="text-white/90 mb-6">Stay connected and follow our journey on social media</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.href}
                      className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-all"
                      data-testid={`social-link-${social.platform.toLowerCase()}`}
                    >
                      <i className={`${social.icon} text-2xl mb-2`}></i>
                      <div className="text-sm font-semibold">{social.platform}</div>
                    </a>
                  ))}
                </div>
                
                <p className="text-sm text-white/80 mt-4 text-center">@MCEFL_Leaders</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border border-border" data-testid="contact-form-card">
              <CardContent className="p-8">
                <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Send Us a Message</h2>
                
                <Form {...contactForm}>
                  <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={contactForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} data-testid="contact-name-input" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={contactForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} data-testid="contact-email-input" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={contactForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject *</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this about?" {...field} data-testid="contact-subject-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={6}
                              placeholder="Tell us more about your inquiry..."
                              {...field}
                              data-testid="contact-message-textarea"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="privacy"
                        checked={agreedToPrivacy}
                        onCheckedChange={setAgreedToPrivacy}
                        data-testid="contact-privacy-checkbox"
                      />
                      <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed">
                        I agree to the privacy policy and consent to my data being used to respond to my inquiry.
                      </label>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground px-6 py-4 font-semibold text-lg btn-primary"
                      disabled={contactMutation.isPending}
                      data-testid="contact-submit-button"
                    >
                      {contactMutation.isPending ? (
                        <>
                          <div className="spinner w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2"></i> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Embedded Google Map */}
        <div className="mt-16" data-testid="contact-map-section">
          <h3 className="font-heading font-bold text-2xl text-foreground mb-6 text-center">Find Us</h3>
          <Card className="overflow-hidden shadow-lg border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.8895472!2d-10.7969!3d6.3156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnNTYuMiJOIDEwwrA0Nyc0OC44Ilc!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="MCEFL Office Location"
              data-testid="contact-google-map"
            />
          </Card>
        </div>

        {/* Office Hours */}
        <div className="mt-12 text-center" data-testid="office-hours">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <h4 className="font-heading font-bold text-lg text-foreground mb-4">Office Hours</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
