import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground dark:bg-card text-white dark:text-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-xl">M</span>
              </div>
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

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 text-white dark:text-foreground">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start" data-testid="footer-address">
                <i className="fas fa-map-marker-alt text-primary mt-1 mr-3"></i>
                <span className="text-white/80 dark:text-muted-foreground">Carey Street, Behind The Old CSA Building, Monrovia, Liberia</span>
              </li>
              <li className="flex items-start" data-testid="footer-phone">
                <i className="fas fa-phone text-primary mt-1 mr-3"></i>
                <div className="text-white/80 dark:text-muted-foreground">
                  <a href="tel:+231775333753" className="hover:text-primary transition-colors">(+231) 775333753</a><br />
                  <a href="tel:+231555147861" className="hover:text-primary transition-colors">(+231) 555147861</a>
                </div>
              </li>
              <li className="flex items-start" data-testid="footer-email">
                <i className="fas fa-envelope text-primary mt-1 mr-3"></i>
                <a href="mailto:movementforchangemcefl@gmail.com" className="text-white/80 dark:text-muted-foreground hover:text-primary transition-colors break-all">
                  movementforchangemcefl@gmail.com
                </a>
              </li>
            </ul>
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
                Web Developer: <span className="text-secondary font-semibold">One Purpose Graphics Media Inc.</span>
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors" data-testid="footer-legal-privacy">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors" data-testid="footer-legal-terms">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors" data-testid="footer-legal-cookies">Cookie Policy</a>
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
