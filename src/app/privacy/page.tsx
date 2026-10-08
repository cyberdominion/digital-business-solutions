import Link from "next/link"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Back to Home
              </Link>
            </div>

            <h1 className="text-4xl font-bold text-gradient mb-6">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
              <p>
                At Digital Business Solutions (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;),
                we are committed to protecting your personal data and respecting your privacy. This Privacy
                Policy explains how we collect, use, and protect your information when you participate in
                the 100 Digital Businesses campaign or use our services.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">1. Information We Collect</h2>
              <p>We collect the following information when you interact with our platform:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address, phone number, and business
                  details you provide during application, registration, and onboarding.
                </li>
                <li>
                  <strong>Business Information:</strong> Business name, industry, location, years operating,
                  and business model details.
                </li>
                <li>
                  <strong>Digital Presence Data:</strong> Social media handles, website URLs, existing domain
                  information, and business email addresses.
                </li>
                <li>
                  <strong>Payment Information:</strong> Payment status and transaction records processed
                  through our payment partners (Paystack). We do not store full payment card details.
                </li>
                <li>
                  <strong>Communications:</strong> Messages, feedback, and correspondence you send to us.
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, browser type, device information, and usage
                  data collected automatically through cookies and analytics.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-10 mb-4">2. How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process and review your campaign application</li>
                <li>To communicate with you about your application status and onboarding</li>
                <li>To provision and build your business website</li>
                <li>To process payments and manage your account</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To improve our services and user experience</li>
                <li>To comply with legal obligations and resolve disputes</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-10 mb-4">3. Legal Basis for Processing</h2>
              <p>
                We process your personal data based on the following legal grounds:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contract Performance:</strong> Processing necessary to fulfill our agreement with you</li>
                <li><strong>Legitimate Interests:</strong> Processing for our legitimate business interests</li>
                <li><strong>Consent:</strong> Processing where you have given explicit consent</li>
                <li><strong>Legal Obligations:</strong> Processing required to comply with applicable laws</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-10 mb-4">4. Data Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share
                your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who assist us in operating our
                  platform (e.g., Paystack for payments, Cloudinary for asset storage, email providers).
                </li>
                <li>
                  <strong>Business Partners:</strong> Trusted partners who help deliver campaign services,
                  subject to confidentiality agreements.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, regulation, or legal process.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of
                  assets, provided the receiving party agrees to honor your information.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-10 mb-4">5. Data Security</h2>
              <p>
                We take data security seriously and implement appropriate technical and organizational
                measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Secure password hashing using industry-standard algorithms (PBKDF2 with SHA-256)</li>
                <li>HTTPS encryption for all communications</li>
                <li>Regular security assessments and monitoring</li>
                <li>Access controls and authentication measures</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-10 mb-4">6. Data Retention</h2>
              <p>
                We retain your personal data for as long as necessary to provide our services, comply with
                legal obligations, resolve disputes, and enforce our agreements. Specifically:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Application data: Retained indefinitely for business and legal purposes</li>
                <li>Session data: Up to 30 days</li>
                <li>Audit logs: Retained for compliance and security monitoring</li>
                <li>Marketing preferences: Until you request deletion</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-10 mb-4">7. Your Rights and Choices</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and obtain a copy of your personal data</li>
                <li>Correct inaccurate or incomplete personal data</li>
                <li>Request deletion of your personal data (subject to legal obligations)</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability - request transfer of your data to another provider</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with the National Data Protection Bureau (NDPB) of Nigeria</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the details provided in this policy.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">8. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience and analyze
                platform usage. You can control cookies through your browser settings, though this may
                limit some functionality.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">9. International Data Transfer</h2>
              <p>
                Your data may be transferred to and processed in countries other than your home country,
                including countries that may have different data protection laws. We will take appropriate
                measures to protect your data in such transfers.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">10. Third-Party Links</h2>
              <p>
                Our platform may contain links to third-party websites or services. We are not responsible
                for the privacy practices of those third parties. We encourage you to read their privacy
                policies before providing any information.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">11. Children&apos;s Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly
                collect personal data from children. If we become aware of such collection, we will take
                steps to delete the information.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">12. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on our
                website with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this
                page periodically for any changes.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">13. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-none pl-0 space-y-2">
                <li><strong>Email:</strong> privacy@digitalbusinessolutions.online</li>
                <li><strong>WhatsApp:</strong> +234 800 000 0000</li>
                <li><strong>Address:</strong> Atlas Digital Infrastructure, Uyo, Nigeria</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Atlas Digital Infrastructure Limited. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
