"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ArrowRight, Check, Star, BarChart3, Globe, TrendingUp, Shield, Clock, ClipboardEdit, Search, CreditCard, Rocket } from "lucide-react"
import { useState, useEffect } from "react"

const COUNTDOWN_TARGET = new Date("2026-12-31T23:59:59")

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = COUNTDOWN_TARGET.getTime() - new Date().getTime()
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / (1000 * 60)) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="inline-flex items-center gap-2 sm:gap-4 bg-destructive/10 border border-destructive/20 rounded-xl px-3 sm:px-6 py-2 sm:py-3">
      <Clock className="h-5 w-5 text-destructive" />
      <div className="flex items-center gap-1 sm:gap-2 text-sm font-mono">
        <span className="text-destructive font-bold">{timeLeft.days.toString().padStart(2, "0")}</span>
        <span className="text-muted-foreground">d</span>
        <span>:</span>
        <span className="text-destructive font-bold">{timeLeft.hours.toString().padStart(2, "0")}</span>
        <span className="text-muted-foreground">h</span>
        <span>:</span>
        <span className="text-destructive font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</span>
        <span className="text-muted-foreground">m</span>
        <span>:</span>
        <span className="text-destructive font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</span>
        <span className="text-muted-foreground">s</span>
      </div>
      <span className="text-xs sm:text-sm text-destructive font-medium hidden sm:inline">Limited spots</span>
    </div>
  )
}

function PriceDisplay() {
  return (
    <div className="relative inline-block">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-purple rounded-xl blur opacity-75"></div>
      <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 rounded-xl px-6 py-3">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">All-Inclusive Price</div>
        <div className="text-4xl sm:text-5xl font-extrabold text-gradient">₦50,000</div>
        <div className="text-xs text-muted-foreground mt-1">For the first 100 businesses</div>
      </div>
    </div>
  )
}

export default function RootPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-subtle pointer-events-none" />
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div
                className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm animation-fade-in mb-6"
              >
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>Launching 100 businesses onto shared infrastructure</span>
              </div>

              <div className="mb-8 animation-fade-in">
                <CountdownTimer />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 animation-fade-in text-balance">
                Digital Business <span className="text-gradient">100</span>
              </h1>

              <div className="my-8 animation-fade-in">
                <PriceDisplay />
              </div>

              <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto animation-fade-in">
                Acquire, qualify, pay and onboard your business onto a production-grade digital
                infrastructure platform for just <strong className="text-foreground">₦50,000</strong>.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  asChild
                  className="shadow-medium hover:shadow-strong transition-bounce hover-lift"
                >
                  <Link href="/apply">
                    Start Application
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="transition-smooth">
                  <Link href="/campaign">Learn More</Link>
                </Button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground animation-fade-in">
                <Shield className="h-4 w-4 text-green-500" />
                <span>All payments are secured with Paystack • 100% secure checkout</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Go Digital</h2>
            <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
              <div className="group bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-smooth hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-spring">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Professional Website</h3>
                <p className="text-sm text-muted-foreground">
                  Mobile-responsive website tailored to your industry with custom domain.
                </p>
              </div>
              <div className="group bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-smooth hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-spring">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">CRM & Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Built-in CRM, contact forms, and analytics to track your business performance.
                </p>
              </div>
              <div className="group bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-smooth hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-spring">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Payments Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Accept payments via Paystack integration with automated reconciliation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-smooth">
                <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold">Professional Business Website</h3>
                  <p className="text-sm text-muted-foreground">
                    Mobile-responsive website tailored to your industry.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-smooth">
                <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold">Domain Acquisition</h3>
                  <p className="text-sm text-muted-foreground">
                    One year domain registration included where applicable.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-smooth">
                <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold">One Year Hosting</h3>
                  <p className="text-sm text-muted-foreground">
                    Fast, secure hosting powered by Vercel Edge Network.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-smooth">
                <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold">Lead/Contact Capture</h3>
                  <p className="text-sm text-muted-foreground">
                    Built-in forms to generate and capture leads.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-smooth">
                <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold">Basic CRM & Admin</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage customers and orders through a simple dashboard.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-smooth">
                <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold">Analytics & Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic analytics to track performance and growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground">
                  <ClipboardEdit className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Apply</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out a short application about your business.
                  </p>
                </div>
                </div>
                <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Review & Approval</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team reviews your application within 48 hours.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Pay ₦50,000</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure payment via Paystack. Only after approval.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground">
                  <Rocket className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Get On Boarded</h3>
                    <p className="text-sm text-muted-foreground">
                      Access your workspace, submit assets, and we build your website.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Go Live</h3>
                    <p className="text-sm text-muted-foreground">
                      Your business goes live with a professional website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                Ready to Transform Your Business?
              </h2>
              <p className="text-muted-foreground mb-8">
                Only 100 slots available. Join the first cohort today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  asChild
                  className="shadow-medium hover:shadow-strong transition-bounce hover-lift"
                >
                  <Link href="/apply">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/campaign/how-it-works">How It Works</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                No credit card required. See{" "}
                <Link href="/terms" className="underline">
                  terms
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="font-bold text-xl text-gradient">
                Digital Business Solutions
              </Link>
              <p className="text-sm text-muted-foreground mt-3">
                Building the infrastructure for 100 Nigerian businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <div className="flex flex-col gap-2">
                <Link href="/campaign" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  The Campaign
                </Link>
                <Link href="/apply" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Apply Now
                </Link>
                <Link href="/campaign/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  How It Works
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <div className="flex flex-col gap-2">
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Terms
                </Link>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Privacy
                </Link>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <div className="flex flex-col gap-2">
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Contact
                </Link>
                <Link href="/campaign/faq" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  FAQs
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Digital Business Solutions is powered by Atlas Digital Infrastructure Limited
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              &copy; {new Date().getFullYear()} Digital Business Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
