export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db/client"
import type { Prisma } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = "" } = await searchParams
  const where: Prisma.UserWhereInput = search
    ? { email: { contains: search, mode: "insensitive" } }
    : {}

  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { memberships: { include: { organization: true } } },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Platform Users</h1>
      <p className="text-muted-foreground">Manage platform user accounts and roles.</p>
      <Input placeholder="Search by email..." className="max-w-sm" name="search" defaultValue={search} />
      <Card>
        <CardHeader><CardTitle>All Users</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium">
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Organizations</th>
                <th className="pb-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b text-sm">
                  <td className="py-3">{u.name ?? "—"}</td>
                  <td className="py-3">{u.email}</td>
                  <td className="py-3">{u.role}</td>
                  <td className="py-3">{u.memberships.length}</td>
                  <td className="py-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}