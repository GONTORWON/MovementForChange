import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service | MCEFL</title>
        <meta name="description" content="Terms of Service for Movement for Change and Empowering Future Leaders (MCEFL). Read our terms and conditions for using our website and services." />
      </Helmet>

      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6" data-testid="terms-title">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-8" data-testid="terms-updated">
            Last Updated: January 2025
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            {/* Acceptance of Terms */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-acceptance">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using the Movement for Change and Empowering Future Leaders (MCEFL) website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            {/* Description of Services */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-services">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">2. Description of Services</h2>
              <p className="text-muted-foreground mb-3">
                MCEFL provides various services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Youth empowerment and leadership development programs</li>
                <li>Community engagement initiatives</li>
                <li>Volunteer opportunities</li>
                <li>Donation processing for charitable purposes</li>
                <li>Educational resources and mentorship programs</li>
              </ul>
            </section>

            {/* User Responsibilities */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-responsibilities">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">3. User Responsibilities</h2>
              <p className="text-muted-foreground mb-3">When using our services, you agree to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use our services only for lawful purposes</li>
                <li>Respect the rights and dignity of other users</li>
                <li>Not engage in any activity that could harm or disrupt our services</li>
                <li>Not use our services to distribute spam or malicious content</li>
              </ul>
            </section>

            {/* Donations and Payments */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-donations">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">4. Donations and Payments</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">4.1 Donation Policy</h3>
                  <p className="text-muted-foreground">
                    All donations made to MCEFL are voluntary and non-refundable unless required by law. Donations will be used to support our programs and operational expenses as determined by our organization.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">4.2 Payment Processing</h3>
                  <p className="text-muted-foreground">
                    Payments are processed securely through third-party payment processors. We do not store your complete credit card information on our servers. By making a donation, you authorize us to charge the specified amount to your payment method.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">4.3 Tax Deductibility</h3>
                  <p className="text-muted-foreground">
                    Donations may be tax-deductible to the extent allowed by law. Please consult with a tax professional regarding the deductibility of your donation. We will provide donation receipts upon request.
                  </p>
                </div>
              </div>
            </section>

            {/* Volunteer Services */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-volunteer">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">5. Volunteer Services</h2>
              <p className="text-muted-foreground mb-3">
                By applying to volunteer with MCEFL:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>You confirm that all information provided in your application is accurate</li>
                <li>You understand that volunteer positions are subject to approval</li>
                <li>You agree to comply with all volunteer policies and guidelines</li>
                <li>You acknowledge that volunteering is unpaid and voluntary</li>
                <li>You may be required to undergo background checks or training</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-ip">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">6. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on the MCEFL website, including text, graphics, logos, images, and software, is the property of MCEFL or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from our content without written permission.
              </p>
            </section>

            {/* User Content */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-user-content">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">7. User-Generated Content</h2>
              <p className="text-muted-foreground">
                If you submit testimonials, comments, or other content to our website, you grant MCEFL a non-exclusive, royalty-free, perpetual license to use, reproduce, modify, and display such content for promotional and operational purposes. You represent that you have the right to submit such content.
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-disclaimer">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, error-free, or secure. We disclaim all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-liability">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, MCEFL and its directors, officers, employees, and volunteers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services, even if we have been advised of the possibility of such damages.
              </p>
            </section>

            {/* Indemnification */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-indemnification">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">10. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless MCEFL and its affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of your use of our services, your violation of these Terms, or your violation of any rights of another party.
              </p>
            </section>

            {/* Termination */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-termination">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">11. Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </section>

            {/* Governing Law */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-law">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">12. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of Liberia, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Liberia.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-changes">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">13. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-card p-6 rounded-lg shadow-sm" data-testid="section-contact">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">14. Contact Us</h2>
              <p className="text-muted-foreground mb-3">
                If you have any questions about these Terms of Service, please contact us:
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
