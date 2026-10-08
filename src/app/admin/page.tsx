export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  CreditCard,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
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

  const statCards = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
      icon: FileText,
      gradient: "from-primary/10 to-accent-purple/10",
      iconColor: "text-primary",
    },
    {
      title: "Pending Review",
      value: stats.pendingReview,
      icon: Clock,
      gradient: "from-amber-500/10 to-orange-500/10",
      iconColor: "text-amber-500",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle,
      gradient: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-500",
    },
    {
      title: "Paid",
      value: stats.paid,
      icon: CreditCard,
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Live Sites",
      value: stats.live,
      icon: TrendingUp,
      gradient: "from-purple-500/10 to-violet-500/10",
      iconColor: "text-purple-500",
    },
    {
      title: "Total Revenue",
      value: `₦${stats.totalRevenue._sum.amount?.toLocaleString() ?? "0"}`,
      icon: DollarSign,
      gradient: "from-primary/10 to-accent-purple/10",
      iconColor: "text-primary",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient">DBI Operations Dashboard</h1>
        <p className="text-muted-foreground">
          Manage applications, payments, onboarding, and campaigns.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 bg-gradient-to-br ${stat.gradient} rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
          <CardHeader>
            <CardTitle className="text-gradient flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Recent Applications
            </CardTitle>
            <CardDescription>Latest campaign applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth border border-border/30">
                  <div>
                    <p className="font-semibold text-gradient">{app.businessName}</p>
                    <p className="text-sm text-muted-foreground">{app.industry}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      app.status === "APPROVED" ? "bg-green-100 text-green-800" :
                      app.status === "SUBMITTED" ? "bg-amber-100 text-amber-800" :
                      app.status === "PAID" ? "bg-blue-100 text-blue-800" :
                      app.status === "LIVE" ? "bg-purple-100 text-purple-800" :
                      "bg-muted text-muted-foreground"
                    }`}>
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

        <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
          <CardHeader>
            <CardTitle className="text-gradient flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Recent Payments
            </CardTitle>
            <CardDescription>Latest payment records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth border border-border/30">
                  <div>
                    <p className="font-semibold text-gradient">
                      ₦{p.amount.toLocaleString()} {p.currency}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Org: {p.organizationId?.slice(0, 8)}...
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      p.status === "SUCCESS" ? "bg-green-100 text-green-800" :
                      p.status === "PENDING" ? "bg-amber-100 text-amber-800" :
                      "bg-muted text-muted-foreground"
                    }`}>
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
