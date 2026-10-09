import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ArrowRight, Globe, Users, Shield, TrendingUp, Award, MapPin } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-subtle pointer-events-none" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm animation-fade-in mb-6">
                <Award className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>About Atlas Digital Infrastructure</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Building Digital Foundations for Nigerian Businesses
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Atlas Digital Infrastructure Limited is a technology company based in Uyo, Nigeria,
                dedicated to empowering small and medium businesses with production-grade digital
                infrastructure at affordable prices.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="transition-bounce hover:shadow-glow">
                  <Link href="/apply">
Join 1,000 Digital Businesses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Our mission is to democratize access to professional digital infrastructure for Nigerian
                businesses. We believe every business, regardless of size or budget, deserves a
                professional online presence that drives growth and customer engagement.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
            <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
              <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent-purple/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-center mb-2">Web Infrastructure</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Production-grade hosting, domain management, and CDN delivery for every business.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent-purple/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-center mb-2">Business Support</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    From application review to onboarding, we guide you through every step of the journey.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent-purple/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-center mb-2">Secure Platform</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Bank-level security, encrypted data, and compliant payment processing via Paystack.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Location</h2>
              <div className="bg-card rounded-xl shadow-strong border border-border/50 p-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Uyo, Nigeria</span>
                </div>
                <p className="text-muted-foreground">
                  Atlas Digital Infrastructure Limited is headquartered in Uyo, Akwa Ibom State,
                  serving businesses across Nigeria.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose 1,000 Digital Businesses</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Affordable Pricing</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional website infrastructure for just ₦50,000 - a fraction of traditional costs.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Production Grade</h3>
                  <p className="text-sm text-muted-foreground">
                    Built on enterprise infrastructure with the same reliability and performance standards.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Go Live Fast</h3>
                  <p className="text-sm text-muted-foreground">
                    From application to live website in just 2-3 weeks with our streamlined process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Join 1,000 Digital Businesses?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Apply now and be part of Nigeria&apos;s next generation of digitally empowered businesses.
            </p>
            <Button size="lg" asChild className="transition-bounce hover:shadow-glow">
              <Link href="/apply">
                Start Your Application
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
              &copy; {new Date().getFullYear()} Atlas Digital Infrastructure Limited. All rights reserved.
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

      <WhatsAppButton />
    </div>
  )
}
