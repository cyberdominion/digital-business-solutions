export const dynamic = "force-dynamic"
import { getAuthContextCached } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { FileText, CreditCard, FolderOpen, CheckCircle, ArrowRight, Globe, Building2, Clock, Shield, ExternalLink, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/db/client"

const getStatusConfig = (status: string | null | undefined) => {
  const configs: Record<string, { label: string; color: string; description: string }> = {
    DRAFT: { label: "Draft", color: "bg-gray-100 text-gray-800", description: "Your application is being drafted." },
    SUBMITTED: { label: "Submitted", color: "bg-blue-100 text-blue-800", description: "Your application has been submitted for review." },
    UNDER_REVIEW: { label: "Under Review", color: "bg-yellow-100 text-yellow-800", description: "Our team is reviewing your application." },
    REJECTED: { label: "Rejected", color: "bg-red-100 text-red-800", description: "Your application was not approved. You may reapply." },
    APPROVED: { label: "Approved", color: "bg-green-100 text-green-800", description: "Your application has been approved! You can now proceed to payment." },
    PAYMENT_PENDING: { label: "Payment Pending", color: "bg-orange-100 text-orange-800", description: "Payment of ₦50,000 is required to continue." },
    PAID: { label: "Paid", color: "bg-green-100 text-green-800", description: "Payment verified. Onboarding will begin shortly." },
    ONBOARDING: { label: "Onboarding", color: "bg-purple-100 text-purple-800", description: "Your onboarding process has started." },
    DEVELOPMENT: { label: "In Development", color: "bg-indigo-100 text-indigo-800", description: "Your website is being built by our team." },
    REVIEW: { label: "In Review", color: "bg-yellow-100 text-yellow-800", description: "Your website is under review before launch." },
    CHANGES_REQUESTED: { label: "Changes Requested", color: "bg-orange-100 text-orange-800", description: "Our team has requested changes to your website." },
    LIVE: { label: "Live", color: "bg-emerald-100 text-emerald-800", description: "Your website is live! Visit it via the Website card." },
  }
  return configs[status ?? ""] ?? { label: "Unknown", color: "bg-gray-100 text-gray-800", description: "Status not recognized." }
}

export default async function DashboardPage() {
  const authContext = await getAuthContextCached()

  // Fetch user's latest application
  const latestApplication = await prisma.application.findFirst({
    where: authContext.organizationId
      ? { organizationId: authContext.organizationId }
      : { applicantUserId: authContext.user?.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, status: true, businessName: true, submittedAt: true, updatedAt: true }
  })

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

  const appStatus = getStatusConfig(latestApplication?.status)
  const isApprovedOrBeyond = ["APPROVED", "PAYMENT_PENDING", "PAID", "ONBOARDING", "DEVELOPMENT", "REVIEW", "CHANGES_REQUESTED", "LIVE"].includes(latestApplication?.status ?? "")
  const isPaidOrBeyond = ["PAID", "ONBOARDING", "DEVELOPMENT", "REVIEW", "CHANGES_REQUESTED", "LIVE"].includes(latestApplication?.status ?? "")
  const isOnboardingOrBeyond = ["ONBOARDING", "DEVELOPMENT", "REVIEW", "CHANGES_REQUESTED", "LIVE"].includes(latestApplication?.status ?? "")
  const isLive = latestApplication?.status === "LIVE"

  // Step completion states for visual progress
  const stepCompleted = {
    application: latestApplication && ["SUBMITTED", "UNDER_REVIEW", "APPROVED", "PAYMENT_PENDING", "PAID", "ONBOARDING", "DEVELOPMENT", "REVIEW", "CHANGES_REQUESTED", "LIVE"].includes(latestApplication.status),
    payment: isPaidOrBeyond,
    onboarding: isOnboardingOrBeyond,
    website: isLive,
  }

  const stepCurrent = {
    application: latestApplication && ["SUBMITTED", "UNDER_REVIEW"].includes(latestApplication.status),
    payment: ["APPROVED", "PAYMENT_PENDING"].includes(latestApplication?.status ?? ""),
    onboarding: ["PAID", "ONBOARDING", "DEVELOPMENT", "REVIEW", "CHANGES_REQUESTED"].includes(latestApplication?.status ?? ""),
    website: isOnboardingOrBeyond && !isLive,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient">Welcome back, {authContext.user.name ?? "there"}</h1>
        <p className="text-muted-foreground">Manage your business infrastructure.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Application Card */}
        <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gradient flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Application
            </CardTitle>
            {stepCompleted.application && (
              <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{appStatus.label}</div>
            <Badge className={`mt-2 inline-block ${appStatus.color}`}>{appStatus.label}</Badge>
            <p className="text-xs text-muted-foreground mt-2">{appStatus.description}</p>
            {latestApplication && (
              <Button asChild variant="outline" size="sm" className="mt-3 w-full transition-smooth hover:bg-primary/10 hover:text-primary">
                <Link href="/dashboard/application/status">View Details</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Payment Card */}
        <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gradient flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Payment
            </CardTitle>
            {stepCompleted.payment && (
              <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </div>
            )}
            {stepCurrent.payment && !stepCompleted.payment && (
              <div className="flex items-center justify-center w-6 h-6 bg-amber-100 rounded-full animation-pulse">
                <CreditCard className="h-4 w-4 text-amber-600" />
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{stepCompleted.payment ? "Completed" : (isApprovedOrBeyond ? "Ready" : "Pending")}</div>
            <Badge className={`mt-2 inline-block ${stepCompleted.payment ? "bg-green-100 text-green-800" : (isApprovedOrBeyond ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800")}`}>
              {stepCompleted.payment ? "Paid" : (isApprovedOrBeyond ? "Ready to Pay" : "Awaiting Approval")}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">{stepCompleted.payment ? "Payment verified and completed." : (isApprovedOrBeyond ? "₦50,000 payment can be completed now." : "₦50,000 payment pending approval.")}</p>
            {isApprovedOrBeyond && !stepCompleted.payment && (
              <Button asChild className="mt-3 w-full transition-bounce hover:shadow-glow bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/dashboard/payment">Complete Payment</Link>
              </Button>
            )}
            {stepCompleted.payment && (
              <Button asChild variant="outline" size="sm" className="mt-3 w-full transition-smooth hover:bg-primary/10 hover:text-primary">
                <Link href="/dashboard/payment">View Receipt</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Onboarding Card */}
        <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gradient flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-primary" />
              Onboarding
            </CardTitle>
            {stepCompleted.onboarding && (
              <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </div>
            )}
            {stepCurrent.onboarding && !stepCompleted.onboarding && (
              <div className="flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full animation-pulse">
                <FolderOpen className="h-4 w-4 text-purple-600" />
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{stepCompleted.onboarding ? "Completed" : (isPaidOrBeyond ? "Active" : "Not Started")}</div>
            <Badge className={`mt-2 inline-block ${stepCompleted.onboarding ? "bg-green-100 text-green-800" : (isPaidOrBeyond ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800")}`}>
              {stepCompleted.onboarding ? "Completed" : (isPaidOrBeyond ? "In Progress" : "Pending Payment")}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">{stepCompleted.onboarding ? "Onboarding milestones completed." : (isPaidOrBeyond ? "Onboarding is in progress." : "Onboarding begins after payment verification.")}</p>
            {isPaidOrBeyond && !stepCompleted.onboarding && (
              <Button asChild className="mt-3 w-full transition-bounce hover:shadow-glow bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/dashboard/onboarding">Continue Onboarding</Link>
              </Button>
            )}
            {stepCompleted.onboarding && (
              <Button asChild variant="outline" size="sm" className="mt-3 w-full transition-smooth hover:bg-primary/10 hover:text-primary">
                <Link href="/dashboard/onboarding">View Progress</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Website Card */}
        <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gradient flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Website
            </CardTitle>
            {stepCompleted.website && (
              <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 rounded-full">
                <Check className="h-4 w-4 text-emerald-600" />
              </div>
            )}
            {stepCurrent.website && !stepCompleted.website && (
              <div className="flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full animation-pulse">
                <Globe className="h-4 w-4 text-indigo-600" />
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{isLive ? "Live" : (isOnboardingOrBeyond ? "In Production" : "Not Started")}</div>
            <Badge className={`mt-2 inline-block ${isLive ? "bg-emerald-100 text-emerald-800" : (isOnboardingOrBeyond ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800")}`}>
              {isLive ? "Live" : (isOnboardingOrBeyond ? "Building" : "Pending")}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">{isLive ? "Your website is live!" : (isOnboardingOrBeyond ? "Your website is being built." : "Website creation starts after onboarding.")}</p>
            {isLive && (
              <Button asChild className="mt-3 w-full transition-bounce hover:shadow-glow bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/dashboard/application/status">View Website</Link>
              </Button>
            )}
            {isOnboardingOrBeyond && !isLive && (
              <Button asChild variant="outline" size="sm" className="mt-3 w-full transition-smooth hover:bg-primary/10 hover:text-primary">
                <Link href="/dashboard/onboarding">Track Build</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gradient">Next Actions</h2>
        <div className="space-y-3">
          {latestApplication && latestApplication.status !== "LIVE" ? (
            <>
              {["DRAFT", "SUBMITTED", "UNDER_REVIEW"].includes(latestApplication.status) && (
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
                      <Button asChild variant="outline" size="sm" className="transition-smooth hover:bg-primary/10 hover:text-primary">
                        <Link href="/dashboard/application/status">View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              {["APPROVED", "PAYMENT_PENDING"].includes(latestApplication.status) && (
                <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <CreditCard className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gradient">Complete payment to proceed</p>
                          <p className="text-sm text-muted-foreground">Your application is approved. Complete the ₦50,000 payment to start onboarding.</p>
                        </div>
                      </div>
                      <Button asChild className="transition-bounce hover:shadow-glow" size="sm">
                        <Link href="/dashboard/payment">Pay Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              {["PAID", "ONBOARDING", "DEVELOPMENT", "REVIEW", "CHANGES_REQUESTED"].includes(latestApplication.status) && (
                <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <FolderOpen className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gradient">Onboarding in progress</p>
                          <p className="text-sm text-muted-foreground">Track your onboarding milestones and provide required information.</p>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="transition-smooth hover:bg-primary/10 hover:text-primary">
                        <Link href="/dashboard/onboarding">View Onboarding</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : !latestApplication ? (
            <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gradient">No application found</p>
                      <p className="text-sm text-muted-foreground">Start your application to join the 100 Digital Businesses campaign.</p>
                    </div>
                  </div>
                  <Button asChild className="transition-bounce hover:shadow-glow" size="sm">
                    <Link href="/apply">Start Application</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Globe className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gradient">Your website is live!</p>
                      <p className="text-sm text-muted-foreground">Congratulations! Your business website is now live and serving customers.</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="transition-smooth hover:bg-primary/10 hover:text-primary">
                    <Link href="/dashboard/application/status">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
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
              <Button asChild variant="outline" size="sm" className="transition-smooth hover:bg-primary/10 hover:text-primary flex items-center gap-2">
                <Link href="/dashboard/application/status">
                  <FileText className="h-4 w-4" />
                  Application Status
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="transition-smooth hover:bg-primary/10 hover:text-primary flex items-center gap-2">
                <Link href="/dashboard/payment">
                  <CreditCard className="h-4 w-4" />
                  Payment Process
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="transition-smooth hover:bg-primary/10 hover:text-primary flex items-center gap-2">
                <Link href="/dashboard/onboarding">
                  <FolderOpen className="h-4 w-4" />
                  Onboarding Guide
                </Link>
              </Button>
              <Button asChild size="sm" className="transition-bounce hover:shadow-glow flex items-center gap-2">
                <Link href="/admin">
                  <Shield className="h-4 w-4" />
                  Chat with AI Assistant
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}