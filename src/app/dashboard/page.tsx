export const dynamic = "force-dynamic"
import { getAuthContextCached } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { FileText, CreditCard, FolderOpen, CheckCircle, ArrowRight, Globe, Building2, Clock, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const formatNumber = (n: number) => n.toLocaleString()

export default async function DashboardPage() {
  const authContext = await getAuthContextCached()

  if (!authContext.user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md shadow-strong border border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-gradient">Access Required</CardTitle>
            <CardDescription>
              You need to be logged in to view this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full transition-bounce hover:shadow-glow">
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient">Welcome back, {authContext.user.name ?? "there"}</h1>
        <p className="text-muted-foreground">Manage your business infrastructure.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gradient flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">Submitted</div>
            <Badge className="mt-2 inline-block bg-blue-100 text-blue-800">Under Review</Badge>
            <p className="text-xs text-muted-foreground mt-2">Your application has been submitted for review.</p>
          </CardContent>
        </Card>

        <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gradient flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">Pending</div>
            <Badge className="mt-2 inline-block bg-amber-100 text-amber-800">Awaiting Approval</Badge>
            <p className="text-xs text-muted-foreground mt-2">₦50,000 payment pending approval.</p>
          </CardContent>
        </Card>

        <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gradient flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-primary" />
              Onboarding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">Not Started</div>
            <Badge className="mt-2 inline-block bg-gray-100 text-gray-800">Pending Payment</Badge>
            <p className="text-xs text-muted-foreground mt-2">Onboarding begins after payment verification.</p>
          </CardContent>
        </Card>

        <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gradient flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Website
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">In Production</div>
            <Badge className="mt-2 inline-block bg-purple-100 text-purple-800">Building</Badge>
            <p className="text-xs text-muted-foreground mt-2">Your website is being built.</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gradient">Next Actions</h2>
        <div className="space-y-3">
          <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gradient">Awaiting application review</p>
                    <p className="text-sm text-muted-foreground">Our team will review your application within 48 hours.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gradient">Payment pending approval</p>
                    <p className="text-sm text-muted-foreground">Once approved, you can complete your ₦50,000 payment.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Assistant Section */}
      <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
        <CardHeader>
          <CardTitle className="text-gradient flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            AI Assistant
          </CardTitle>
          <CardDescription>Get instant help with your application, payments, and onboarding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-muted-foreground">Ask me anything about your application, payment process, onboarding requirements, or website development.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="sm" variant="outline" className="transition-smooth hover:bg-primary/10 hover:text-primary flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Application Status
              </Button>
              <Button size="sm" variant="outline" className="transition-smooth hover:bg-primary/10 hover:text-primary flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Process
              </Button>
              <Button size="sm" variant="outline" className="transition-smooth hover:bg-primary/10 hover:text-primary flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                Onboarding Guide
              </Button>
              <Button size="sm" className="transition-bounce hover:shadow-glow flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Chat with AI Assistant
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
