import { Link } from "wouter";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      await apiRequest('POST', '/api/newsletter', { email });
    },
    onSuccess: () => {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate(email);
    }
  };

  return (
    <footer className="bg-foreground dark:bg-card text-white dark:text-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.jpeg" 
                alt="MCEFL Logo" 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <div className="font-heading font-bold text-lg text-white dark:text-foreground">MCEFL</div>
                <div className="text-xs text-white/70 dark:text-muted-foreground">Empowering Future Leaders</div>
              </div>
            </div>
            <p className="text-white/80 dark:text-muted-foreground text-sm mb-6">
              Building stronger societies through youth leadership, social empowerment, and compassion-driven action.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white/10 dark:bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-all" data-testid="footer-social-facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 dark:bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-all" data-testid="footer-social-instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 dark:bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-all" data-testid="footer-social-twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 dark:bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-all" data-testid="footer-social-linkedin">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white dark:text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-home">Home</Link></li>
              <li><Link href="/about" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-about">About Us</Link></li>
              <li><Link href="/programs" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-programs">Programs</Link></li>
              <li><Link href="/get-involved" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-get-involved">Get Involved</Link></li>
              <li><Link href="/testimonials" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-testimonials">Testimonials</Link></li>
              <li><Link href="/news-events" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-news">News & Events</Link></li>
              <li><Link href="/contact" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white dark:text-foreground">Our Programs</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-program-leadership">Leadership Development</a></li>
              <li><a href="#" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-program-community">Community Engagement</a></li>
              <li><a href="#" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-program-mentorship">Youth Mentorship</a></li>
              <li><a href="#" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-program-education">Educational Support</a></li>
              <li><a href="#" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-program-empower-her">Empower Her</a></li>
              <li><a href="#" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors" data-testid="footer-program-advocacy">Policy & Advocacy</a></li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white dark:text-foreground">Stay Connected</h4>
            <p className="text-white/80 dark:text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for updates on our programs and impact.
            </p>
            {subscribed ? (
              <div className="bg-green-600 text-white px-4 py-2 rounded-md text-sm mb-4" data-testid="newsletter-success">
                ✓ Successfully subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mb-6">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 dark:bg-muted border-white/20 dark:border-border text-white dark:text-foreground placeholder:text-white/50 dark:placeholder:text-muted-foreground"
                    data-testid="footer-newsletter-email"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={subscribeMutation.isPending}
                    className="bg-primary hover:bg-primary/90"
                    data-testid="footer-newsletter-submit"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-white/80 dark:text-muted-foreground" data-testid="footer-email-info">
                <i className="fas fa-envelope text-primary"></i>
                <a href="mailto:movementforchangemcefl@gmail.com" className="hover:text-primary transition-colors break-all">
                  movementforchangemcefl@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/80 dark:text-muted-foreground" data-testid="footer-phone-info">
                <i className="fas fa-phone text-primary"></i>
                <span>(+231) 775333753</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 dark:border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60 dark:text-muted-foreground">
            <div className="text-center md:text-left">
              <p data-testid="footer-copyright">
                &copy; {currentYear} Movement for Change and Empowering Future Leaders (MCEFL). All rights reserved.
              </p>
              <p className="text-xs mt-1" data-testid="footer-developer">
                Web Developer: <span className="text-white font-semibold">One Purpose Graphics Media Inc.</span>
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors" data-testid="footer-legal-privacy">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-primary transition-colors" data-testid="footer-legal-terms">Terms of Service</Link>
              <Link href="/cookie-policy" className="hover:text-primary transition-colors" data-testid="footer-legal-cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        data-testid="back-to-top-button"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </footer>
  );
}
