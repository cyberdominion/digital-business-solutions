import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Shield } from "lucide-react"

export default async function AdminAuditLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = "" } = await searchParams

  const where: Record<string, unknown> = {}
  if (search) {
    where.OR = [
      { action: { contains: search, mode: "insensitive" } },
      { resource: { contains: search, mode: "insensitive" } },
    ]
  }

  const auditLogs = await prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: true },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Audit Logs</h1>
      <p className="text-muted-foreground">Review all platform actions and events.</p>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search logs..." className="pl-10" name="search" defaultValue={search} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium">
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Resource</th>
                <th className="pb-3">Resource ID</th>
                <th className="pb-3">User</th>
                <th className="pb-3">IP</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} className="border-b text-sm">
                  <td className="py-3">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="py-3 font-mono">{log.action}</td>
                  <td className="py-3">{log.resource}</td>
                  <td className="py-3 font-mono text-xs">{log.resourceId?.slice(0, 10)}...</td>
                  <td className="py-3">{log.user?.email ?? "system"}</td>
                  <td className="py-3">{log.ipAddress ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
