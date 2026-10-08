export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default async function AdminBusinessesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = "" } = await searchParams
  const where: Record<string, unknown> = {}
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
    ]
  }

  const organizations = await prisma.organization.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { members: { include: { user: true } }, payments: { where: { status: "SUCCESS" } }, applications: true },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Businesses</h1>
      <p className="text-muted-foreground">Manage all tenant organizations.</p>
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search organizations..." className="pl-10" name="search" defaultValue={search} />
          </div>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium">
                <th className="pb-3">Business Name</th>
                <th className="pb-3">Slug</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Members</th>
                <th className="pb-3">Payments</th>
                <th className="pb-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr key={org.id} className="border-b text-sm">
                  <td className="py-3">
                    <p className="font-medium">{org.name}</p>
                    <p className="text-muted-foreground">{org.legalName}</p>
                  </td>
                  <td className="py-3">{org.slug}</td>
                  <td className="py-3">
                    <Badge variant="outline">{org.status}</Badge>
                  </td>
                  <td className="py-3">{org.members.length}</td>
                  <td className="py-3">{org.payments.length}</td>
                  <td className="py-3">{new Date(org.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
