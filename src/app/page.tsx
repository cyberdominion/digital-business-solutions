import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

export default function RootPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            Digital Business Solutions
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/campaign" className="text-sm hover:text-foreground">
              The Campaign
            </Link>
            <Link href="/campaign/how-it-works" className="text-sm hover:text-foreground">
              How It Works
            </Link>
            <Link href="/campaign/faq" className="text-sm hover:text-foreground">
              FAQ
            </Link>
            <Button asChild>
              <Link href="/apply">Start Application</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>Launching 100 businesses onto shared infrastructure</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6">
                Digital Business 100
              </h1>
              <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
                Acquire, qualify, pay and onboard your business onto a production-grade digital
                infrastructure platform for just <strong>₦50,000</strong>.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/apply">
                    Start Application
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/campaign">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Professional Business Website</h3>
                  <p className="text-sm text-muted-foreground">
                    Mobile-responsive website tailored to your industry.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Domain & Hosting</h3>
                  <p className="text-sm text-muted-foreground">
                    One year domain registration and fast, secure hosting included.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">CRM & Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic CRM, contact forms, and analytics to track your business performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Only 100 slots available. Join the first cohort today.
            </p>
            <Button size="lg" asChild>
              <Link href="/apply">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Digital Business Solutions. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
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
    </div>
  )
}
