export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search } from "lucide-react"

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground">Review and manage campaign applications.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by business name or email..."
                className="pl-10"
                name="search"
                defaultValue={search}
              />
            </div>
            <select name="status" defaultValue={statusFilter} className="border rounded px-3 py-1 text-sm">
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
                <tr className="border-b text-left text-sm font-medium">
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
                  <tr key={app.id} className="border-b text-sm">
                    <td className="py-3">
                      <div>
                        <p className="font-medium">{app.businessName}</p>
                        <p className="text-muted-foreground">{app.email}</p>
                      </div>
                    </td>
                    <td className="py-3">{app.industry}</td>
                    <td className="py-3">{app.ownerName}</td>
                    <td className="py-3">
                      <Badge className={statusColors[app.status] ?? "bg-gray-100"}>{app.status}</Badge>
                    </td>
                    <td className="py-3">{app.score ?? "—"}</td>
                    <td className="py-3">
                      {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="py-3 text-right">
                      <Link href={`/admin/applications/${app.id}`} className="text-sm font-medium text-primary hover:underline">
                        View
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
