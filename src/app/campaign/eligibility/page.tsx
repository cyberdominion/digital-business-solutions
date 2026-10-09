import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ArrowLeft, Check } from "lucide-react"

const eligibilityCriteria = [
  "Must be a registered or registering business in Nigeria",
  "Must have a valid business name",
  "Must operate in an eligible industry (retail, food, fashion, services, etc.)",
  "Must have a valid phone number and email address",
  "Must be able to pay the ₦50,000 campaign fee upon approval",
]

export default function EligibilityPage() {
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

            <h1 className="text-4xl font-bold text-center mb-4">Eligibility Criteria</h1>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              To qualify for the 1000 Digital Businesses campaign, your business must meet the following criteria.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                {eligibilityCriteria.map((criterion) => (
                  <div key={criterion} className="flex items-start gap-3 p-4 border rounded-lg bg-card hover:bg-muted/50 transition-smooth">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p>{criterion}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button size="lg" asChild className="transition-bounce hover:shadow-glow">
                  <Link href="/apply">Check If You Qualify</Link>
                </Button>
              </div>
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
