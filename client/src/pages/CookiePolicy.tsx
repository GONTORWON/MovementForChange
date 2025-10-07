import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Cookie Policy | MCEFL</title>
        <meta name="description" content="Cookie Policy for Movement for Change and Empowering Future Leaders (MCEFL). Learn about how we use cookies and similar technologies." />
      </Helmet>

      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6" data-testid="cookie-title">
            Cookie Policy
          </h1>
          <p className="text-muted-foreground mb-8" data-testid="cookie-updated">
            Last Updated: January 2025
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-introduction">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">1. What Are Cookies</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. Movement for Change and Empowering Future Leaders (MCEFL) uses cookies to enhance your browsing experience.
              </p>
            </section>

            {/* How We Use Cookies */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-usage">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">2. How We Use Cookies</h2>
              <p className="text-muted-foreground mb-3">We use cookies for various purposes, including:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., security, network management)</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences (e.g., language, theme selection)</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Functional Cookies:</strong> Enable enhanced functionality and personalization</li>
              </ul>
            </section>

            {/* Types of Cookies */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-types">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">3. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">3.1 Session Cookies</h3>
                  <p className="text-muted-foreground">
                    These are temporary cookies that expire when you close your browser. They help us maintain your session as you navigate through our website.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">3.2 Persistent Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies remain on your device for a set period or until you delete them. They help us remember your preferences for future visits.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">3.3 First-Party Cookies</h3>
                  <p className="text-muted-foreground">
                    Cookies set directly by our website. We use these for essential website functions and to improve your experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">3.4 Third-Party Cookies</h3>
                  <p className="text-muted-foreground">
                    Cookies set by other organizations, such as analytics providers or payment processors. These help us analyze website traffic and process donations securely.
                  </p>
                </div>
              </div>
            </section>

            {/* Specific Cookies */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-specific">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">4. Specific Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold text-foreground">Cookie Name</th>
                      <th className="text-left p-3 font-semibold text-foreground">Purpose</th>
                      <th className="text-left p-3 font-semibold text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="p-3">theme</td>
                      <td className="p-3">Stores your theme preference (light/dark mode)</td>
                      <td className="p-3">Persistent (1 year)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3">session_id</td>
                      <td className="p-3">Maintains your session state</td>
                      <td className="p-3">Session</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3">analytics_*</td>
                      <td className="p-3">Website usage analytics</td>
                      <td className="p-3">Persistent (2 years)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-third-party">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">5. Third-Party Services</h2>
              <p className="text-muted-foreground mb-3">
                We use the following third-party services that may set cookies:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Stripe:</strong> For secure payment processing and donation handling</li>
                <li><strong>Google Analytics:</strong> For website traffic analysis (if applicable)</li>
                <li><strong>Social Media Platforms:</strong> For social sharing features</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                These third-party services have their own privacy and cookie policies, which we encourage you to review.
              </p>
            </section>

            {/* Managing Cookies */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-managing">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">6. How to Manage Cookies</h2>
              <p className="text-muted-foreground mb-3">
                You have the right to decide whether to accept or reject cookies. You can manage cookies through:
              </p>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">6.1 Browser Settings</h3>
                  <p className="text-muted-foreground mb-2">
                    Most browsers allow you to control cookies through their settings. Here's how to manage cookies in popular browsers:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                    <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">6.2 Cookie Preferences</h3>
                  <p className="text-muted-foreground">
                    You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some features of our website may not function properly.
                  </p>
                </div>
              </div>
            </section>

            {/* Impact of Blocking */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-impact">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">7. Impact of Blocking Cookies</h2>
              <p className="text-muted-foreground mb-3">
                If you choose to block or delete cookies, you may experience:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Loss of saved preferences (e.g., theme selection, language)</li>
                <li>Inability to access certain features</li>
                <li>Need to re-enter information on subsequent visits</li>
                <li>Reduced website functionality</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Essential cookies required for basic website functionality cannot be disabled through our website settings, but you can block them through your browser settings.
              </p>
            </section>

            {/* Updates to Policy */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-updates">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">8. Updates to This Cookie Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website with a new "Last Updated" date.
              </p>
            </section>

            {/* More Information */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-more-info">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">9. More Information</h2>
              <p className="text-muted-foreground mb-3">
                For more information about cookies and how to manage them, visit:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.allaboutcookies.org</a></li>
                <li><a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutcookies.org</a></li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-contact">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground mb-3">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> movementforchangemcefl@gmail.com</p>
                <p><strong>Phone:</strong> (+231) 775333753 / (+231) 555147861</p>
                <p><strong>Address:</strong> Carey Street, Behind The Old CSA Building, Monrovia, Liberia</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
