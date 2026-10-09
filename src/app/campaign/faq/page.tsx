import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ArrowLeft, ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Who is eligible for the 1000 Digital Businesses campaign?",
    answer: "The campaign is open to Nigerian businesses of any size that want a professional online presence. We welcome retail, food, fashion, services, and more.",
  },
  {
    question: "What is the cost?",
    answer: "The founding business package is ₦50,000. This covers a professional website, domain, hosting, and basic features.",
  },
  {
    question: "How long does the application take?",
    answer: "The application form takes about 10-15 minutes to complete. Review takes up to 48 hours.",
  },
  {
    question: "What happens after I pay?",
    answer: "After payment verification, we provision your organization and assign an onboarding manager. You'll receive access to your business workspace. Once your website is ready, you'll receive a link to your customized website along with admin login credentials to manage your site.",
  },
  {
    question: "How long until my website is live?",
    answer: "After onboarding is complete, website development typically takes 2-3 weeks. We'll keep you updated on progress.",
  },
  {
    question: "Can I get a refund?",
    answer: "Payments are non-refundable once the application is approved and onboarding begins. See our terms for full details.",
  },
  {
    question: "What if I need help during onboarding?",
    answer: "You'll have access to a dedicated support team through your business workspace messaging system.",
  },
]

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Link href="/campaign" className="block mb-6">
              <Button variant="ghost" size="sm" className="transition-smooth hover:shadow-glow hover-lift">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Campaign
              </Button>
            </Link>

            <h1 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Everything you need to know about the 1000 Digital Businesses campaign.
            </p>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-smooth">
                  <summary className="font-semibold cursor-pointer flex items-center justify-between">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </summary>
                  <p className="text-muted-foreground mt-3">{faq.answer}</p>
                </details>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Button asChild className="transition-bounce hover:shadow-glow">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Digital Business Solutions. All rights reserved.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
