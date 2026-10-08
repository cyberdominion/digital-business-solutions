export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  CreditCard,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react"

export default async function AdminDashboardPage() {
  const [applications, payments] = await Promise.all([
    prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { campaign: true },
    }),
    prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { application: true, organization: true },
    }),
  ])

  const stats = {
    totalApplications: await prisma.application.count(),
    pendingReview: await prisma.application.count({ where: { status: "SUBMITTED" } }),
    approved: await prisma.application.count({ where: { status: "APPROVED" } }),
    paid: await prisma.application.count({ where: { status: "PAID" } }),
    live: await prisma.application.count({ where: { status: "LIVE" } }),
    totalRevenue: await prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS" },
    }),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient">DBI Operations Dashboard</h1>
        <p className="text-muted-foreground">
          Manage applications, payments, onboarding, and campaigns.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="shadow-strong border border-border/50 bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <div className="p-2 bg-gradient-to-br from-primary/10 to-accent-purple/10 rounded-lg">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{stats.totalApplications}</div>
          </CardContent>
        </Card>

        <Card className="shadow-strong border border-border/50 bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <div className="p-2 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-lg">
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{stats.pendingReview}</div>
          </CardContent>
        </Card>

        <Card className="shadow-strong border border-border/50 bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <div className="p-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card className="shadow-strong border border-border/50 bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <div className="p-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg">
              <CreditCard className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{stats.paid}</div>
          </CardContent>
        </Card>

        <Card className="shadow-strong border border-border/50 bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live</CardTitle>
            <div className="p-2 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{stats.live}</div>
          </CardContent>
        </Card>

        <Card className="shadow-strong border border-border/50 bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="p-2 bg-gradient-to-br from-primary/10 to-accent-purple/10 rounded-lg">
              <CreditCard className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">
              ₦{stats.totalRevenue._sum.amount?.toLocaleString() ?? "0"}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-strong border border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-gradient">Recent Applications</CardTitle>
            <CardDescription>Latest campaign applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                  <div>
                    <p className="font-semibold text-gradient">{app.businessName}</p>
                    <p className="text-sm text-muted-foreground">{app.industry}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${app.status === "APPROVED" ? "bg-green-100 text-green-800" : app.status === "SUBMITTED" ? "bg-amber-100 text-amber-800" : "bg-muted text-muted-foreground"}`}>
                      {app.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-strong border border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-gradient">Recent Payments</CardTitle>
            <CardDescription>Latest payment records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                  <div>
                    <p className="font-semibold text-gradient">
                      ₦{p.amount.toLocaleString()} {p.currency}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Org: {p.organizationId?.slice(0, 8)}...
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${p.status === "SUCCESS" ? "bg-green-100 text-green-800" : p.status === "PENDING" ? "bg-amber-100 text-amber-800" : "bg-muted text-muted-foreground"}`}>
                      {p.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
