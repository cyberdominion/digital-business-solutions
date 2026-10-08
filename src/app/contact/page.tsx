import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Back to Home
              </Link>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gradient mb-4">Contact Us</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Have questions about the 100 Digital Businesses campaign? We&apos;re here to help.
                  Reach out to us and our team will respond within 24 hours.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-primary/10 to-accent-purple/10 rounded-lg">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        Email Us
                      </CardTitle>
                      <CardDescription>Send us an email and we&apos;ll get back to you</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium text-gradient">support@digitalbusinessolutions.online</p>
                      <p className="text-sm text-muted-foreground mt-1">For general inquiries</p>
                      <p className="font-medium text-gradient mt-3">admin@digitalbusinessolutions.online</p>
                      <p className="text-sm text-muted-foreground mt-1">For business partnership inquiries</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
                          <Phone className="h-5 w-5 text-green-500" />
                        </div>
                        WhatsApp
                      </CardTitle>
                      <CardDescription>Chat with us directly on WhatsApp</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium text-gradient">08105519705</p>
                      <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9AM - 6PM WAT</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg">
                          <MapPin className="h-5 w-5 text-blue-500" />
                        </div>
                        Our Location
                      </CardTitle>
                      <CardDescription>Atlas Digital Infrastructure Limited</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium text-gradient">Uyo, Nigeria</p>
                      <p className="text-sm text-muted-foreground mt-1">Serving businesses across Nigeria</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-lg">
                          <Clock className="h-5 w-5 text-purple-500" />
                        </div>
                        Business Hours
                      </CardTitle>
                      <CardDescription>When you can reach us</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium text-gradient">Monday - Friday: 9:00 AM - 6:00 PM WAT</p>
                      <p className="text-sm text-muted-foreground mt-1">Saturday - Sunday: By appointment only</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="shadow-strong border border-border/50 bg-card">
                    <CardHeader>
                      <CardTitle className="text-gradient">Send a Message</CardTitle>
                      <CardDescription>Fill out the form below and we&apos;ll contact you shortly</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Name</label>
                          <input
                            type="text"
                            placeholder="Your full name"
                            className="w-full px-3 py-2 border border-border/50 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <input
                            type="email"
                            placeholder="you@company.com"
                            className="w-full px-3 py-2 border border-border/50 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subject</label>
                          <input
                            type="text"
                            placeholder="How can we help?"
                            className="w-full px-3 py-2 border border-border/50 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Message</label>
                          <textarea
                            placeholder="Your message..."
                            rows={4}
                            className="w-full px-3 py-2 border border-border/50 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-smooth"
                          />
                        </div>
                        <Button className="w-full transition-bounce hover:shadow-glow">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
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
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
