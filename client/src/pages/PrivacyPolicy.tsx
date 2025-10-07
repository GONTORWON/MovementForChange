import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy | MCEFL</title>
        <meta name="description" content="Privacy Policy for Movement for Change and Empowering Future Leaders (MCEFL). Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6" data-testid="privacy-title">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8" data-testid="privacy-updated">
            Last Updated: January 2025
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-introduction">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Movement for Change and Empowering Future Leaders (MCEFL) ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-information">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.1 Personal Information</h3>
                  <p className="text-muted-foreground">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>Fill out contact forms</li>
                    <li>Apply to volunteer</li>
                    <li>Make donations</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Participate in our programs</li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    This information may include: name, email address, phone number, mailing address, and payment information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.2 Automatic Information</h3>
                  <p className="text-muted-foreground">
                    When you visit our website, we may automatically collect certain information about your device, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Operating system</li>
                    <li>Access times and dates</li>
                    <li>Pages viewed</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-usage">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide, operate, and maintain our services</li>
                <li>Process your donations and transactions</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you updates about our programs and activities</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-sharing">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-3">We may share your information with:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website and services (e.g., payment processors, email service providers)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Partners:</strong> With your consent, we may share information with partner organizations for collaborative programs</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </section>

            {/* Data Security */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-security">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">5. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-rights">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-3">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where we rely on it</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                To exercise these rights, please contact us at movementforchangemcefl@gmail.com
              </p>
            </section>

            {/* Cookies */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-cookies">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. For more information, please see our Cookie Policy.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-third-party">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">8. Third-Party Links</h2>
              <p className="text-muted-foreground">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to read the privacy policies of any third-party sites you visit.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-children">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-changes">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-contact">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground mb-3">
                If you have any questions about this Privacy Policy, please contact us:
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
