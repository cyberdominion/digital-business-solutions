export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>
}) {
  const { search = "", status: statusFilter = "all" } = await searchParams
  const where: Record<string, unknown> = {}
  if (search) {
    where.OR = [
      { businessName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ]
  }
  if (statusFilter && statusFilter !== "all") {
    where.status = statusFilter
  }

  const applications = await prisma.application.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { campaign: true, organization: true },
  })

  const statusColors: Record<string, string> = {
    DRAFT: "bg-gray-100 text-gray-800",
    SUBMITTED: "bg-blue-100 text-blue-800",
    UNDER_REVIEW: "bg-yellow-100 text-yellow-800",
    REJECTED: "bg-red-100 text-red-800",
    APPROVED: "bg-green-100 text-green-800",
    PAYMENT_PENDING: "bg-orange-100 text-orange-800",
    PAID: "bg-green-100 text-green-800",
    ONBOARDING: "bg-purple-100 text-purple-800",
    DEVELOPMENT: "bg-indigo-100 text-indigo-800",
    REVIEW: "bg-yellow-100 text-yellow-800",
    CHANGES_REQUESTED: "bg-orange-100 text-orange-800",
    LIVE: "bg-emerald-100 text-emerald-800",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient">Applications</h1>
        <p className="text-muted-foreground">Review and manage campaign applications.</p>
      </div>

      <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
        <CardHeader>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by business name or email..."
                className="pl-10 bg-background border-border/50 focus:ring-2 focus:ring-primary/20"
                name="search"
                defaultValue={search}
              />
            </div>
            <select name="status" defaultValue={statusFilter} className="border border-border/50 rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-primary/20">
              <option value="all">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="PAID">Paid</option>
              <option value="LIVE">Live</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 text-left text-sm font-medium text-muted-foreground">
                  <th className="pb-3">Business</th>
                  <th className="pb-3">Industry</th>
                  <th className="pb-3">Owner</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Submitted</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-border/30 text-sm hover:bg-muted/30 transition-smooth">
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-gradient">{app.businessName}</p>
                        <p className="text-sm text-muted-foreground">{app.email}</p>
                      </div>
                    </td>
                    <td className="py-4 text-muted-foreground">{app.industry}</td>
                    <td className="py-4 text-muted-foreground">{app.ownerName}</td>
                    <td className="py-4">
                      <Badge className={statusColors[app.status] ?? "bg-gray-100 text-gray-800"}>{app.status}</Badge>
                    </td>
                    <td className="py-4 text-muted-foreground">{app.score ?? "—"}</td>
                    <td className="py-4 text-muted-foreground">
                      {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="py-4 text-right">
                      <Link href={`/admin/applications/${app.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-smooth">
                        View
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
