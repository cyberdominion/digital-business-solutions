import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Clock, CreditCard, FileText, Rocket } from "lucide-react"

const steps = [
  { icon: FileText, title: "1. Apply", description: "Fill out a short application about your business." },
  { icon: Clock, title: "2. Review", description: "Our team reviews your application within 48 hours." },
  { icon: CreditCard, title: "3. Pay", description: "Pay the ₦50,000 campaign fee via Paystack." },
  { icon: Check, title: "4. Onboard", description: "Complete your onboarding and submit business assets." },
  { icon: Rocket, title: "5. Build", description: "We build and deploy your website." },
  { icon: Rocket, title: "6. Launch", description: "Your business goes live on the platform." },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <Link href="/campaign" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Campaign
        </Link>

        <h1 className="text-4xl font-bold text-center mb-4">How It Works</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Our streamlined process makes getting your business online simple and straightforward.
        </p>

        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-4 items-start">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="w-px bg-border ml-5 mt-10 -mb-6"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/apply">Start Your Application</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
