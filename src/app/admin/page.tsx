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
        <h1 className="text-3xl font-bold">DBI Operations Dashboard</h1>
        <p className="text-muted-foreground">
          Manage applications, payments, onboarding, and campaigns.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReview}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.paid}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.live}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{stats.totalRevenue._sum.amount?.toLocaleString() ?? "0"}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest campaign applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{app.businessName}</p>
                    <p className="text-sm text-muted-foreground">{app.industry}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted">
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

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Latest payment records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      ₦{p.amount.toLocaleString()} {p.currency}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Org: {p.organizationId?.slice(0, 8)}...
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted">
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
