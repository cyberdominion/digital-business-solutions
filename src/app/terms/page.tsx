import Link from "next/link"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function TermsPage() {
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

            <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
              <p>
                These Terms and Conditions govern your use of the 1000 Digital Businesses campaign
                (&ldquo;the Campaign&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
                and the digital infrastructure platform services provided by Atlas Digital Infrastructure
                Limited (&ldquo;Atlas&rdquo;).
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">1. Campaign Overview</h2>
              <p>
                The 1000 Digital Businesses campaign offers qualifying Nigerian businesses a professional
                business website for ₦50,000. This package includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Professional business website</li>
                <li>Domain acquisition (one year)</li>
                <li>One year hosting</li>
                <li>Mobile-responsive implementation</li>
                <li>Lead/contact capture forms</li>
                <li>Basic CRM/admin capability</li>
                <li>Basic analytics</li>
                <li>Onboarding support</li>
                <li>Selected integrations</li>
              </ul>
              <p>
                Additional services beyond the standard package may incur extra costs.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">2. Eligibility</h2>
              <p>To qualify for the Campaign, your business must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be a registered or registering business in Nigeria</li>
                <li>Have a valid business name</li>
                <li>Operate in an eligible industry (retail, food, fashion, services, beauty, real estate, education, hospitality, construction, creative, or other)</li>
                <li>Have a valid phone number and email address</li>
                <li>Be able to pay the ₦50,000 campaign fee upon approval</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-10 mb-4">3. Application and Approval Process</h2>
              <p>
                Applications are submitted through our online application portal. Our team will review
                your application within 48 hours of submission. Approval is not guaranteed and is
                subject to our review criteria. You will be notified of the outcome via your preferred
                contact method.
              </p>
              <p>
                Only 1,000 businesses will be selected for the first cohort. Applications are accepted
                on a first-approved, first-enrolled basis subject to capacity.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">4. Payment Terms</h2>
              <p>
                Payment of ₦50,000 is required only after your application has been approved. Payment
                must be completed within 7 days of approval notification. Failure to pay within this
                timeframe may result in the revocation of your approved slot.
              </p>
              <p>
                All payments are processed securely through Paystack. By completing payment, you agree
                to comply with Paystack&apos;s terms of service.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">5. Refund Policy</h2>
              <p>
                Payments are non-refundable once the application is approved and onboarding begins.
                If your application is not approved, no payment is required and no charges will be
                applied. If you decide to withdraw after payment but before onboarding begins, a
                full refund may be available at our sole discretion.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">6. Intellectual Property</h2>
              <p>
                All content, logos, trademarks, and intellectual property displayed on your business
                website remain your property. Atlas retains the right to use anonymized data and
                examples from the Campaign for marketing and portfolio purposes.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">7. Service Levels and Timeline</h2>
              <p>
                After payment and onboarding completion, website development typically takes 2-3 weeks.
                Timelines are estimates and not guaranteed. We will make reasonable efforts to meet
                stated deadlines but are not liable for delays caused by circumstances beyond our
                control, including incomplete submissions or force majeure events.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">8. Your Responsibilities</h2>
              <p>During the onboarding phase, you are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing accurate and complete business information</li>
                <li>Submitting required content and assets in a timely manner</li>
                <li>Responding to communications from our onboarding team within 48 hours</li>
                <li>Notifying us of any changes to your contact information</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-10 mb-4">9. Account Security</h2>
              <p>
                You are responsible for maintaining the security of your business account credentials.
                You agree to notify us immediately of any unauthorized access to your account. We are
                not liable for any loss or damage arising from your failure to protect your credentials.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">10. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Atlas and its affiliates shall not be liable
                for any indirect, incidental, special, consequential, or punitive damages, or any
                loss of data, profits, or revenue, whether incurred directly or indirectly. Our total
                liability for any claim shall not exceed the amount paid by you under the Campaign.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">11. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your application or campaign participation
                at any time, without prior notice or liability, for any reason, including but not
                limited to breach of these Terms. Upon termination, all rights granted to you will
                immediately cease.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">12. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify you of any changes by
                posting the new Terms on our website and updating the "Last updated" date. Your
                continued use of the Campaign after any changes constitutes acceptance of the new
                Terms.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">13. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the Federal
                Republic of Nigeria. Any disputes arising from these Terms or your use of the Campaign
                shall be subject to the exclusive jurisdiction of the courts in Lagos, Nigeria.
              </p>

              <h2 className="text-2xl font-semibold mt-10 mb-4">14. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <ul className="list-none pl-0 space-y-2">
                <li><strong>Email:</strong> support@digitalbusiness.com.ng</li>
                <li><strong>WhatsApp:</strong> 08105519705</li>
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
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
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
