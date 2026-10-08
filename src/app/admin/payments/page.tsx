export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status = "all" } = await searchParams
  const where: Record<string, unknown> = {}
  if (status && status !== "all") where.status = status

  const payments = await prisma.payment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { organization: true, application: true, events: true },
  })

  const stats = {
    total: payments.length,
    success: payments.filter((p) => p.status === "SUCCESS").length,
    pending: payments.filter((p) => p.status === "PENDING").length,
    failed: payments.filter((p) => p.status === "FAILED").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">Review all payment transactions.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.success}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search payments..." className="pl-10" />
            </div>
            <select name="status" defaultValue={status} className="border rounded px-3 py-1 text-sm">
              <option value="all">All Statuses</option>
              <option value="SUCCESS">Success</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium">
                <th className="pb-3">Reference</th>
                <th className="pb-3">Organization</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Fulfillment</th>
                <th className="pb-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b text-sm">
                  <td className="py-3 font-mono text-xs">{p.providerReference.slice(0, 20)}...</td>
                  <td className="py-3">{p.organization?.name ?? "—"}</td>
                  <td className="py-3">{p.currency} {p.amount.toLocaleString()}</td>
                  <td className="py-3">
                    <Badge variant={p.status === "SUCCESS" ? "default" : p.status === "FAILED" ? "destructive" : "secondary"}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant={p.fulfillmentStatus === "FULFILLED" ? "default" : "secondary"}>
                      {p.fulfillmentStatus}
                    </Badge>
                  </td>
                  <td className="py-3">{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
