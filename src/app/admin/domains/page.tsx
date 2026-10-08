export const dynamic = "force-dynamic"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default async function AdminDomainsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = "" } = await searchParams
  const where: any = search ? { name: { contains: search, mode: "insensitive" } } : {}

  const domains: any[] = []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Domains</h1>
        <Button>Add Domain</Button>
      </div>
      <div className="max-w-sm">
        <Input placeholder="Search domains..." name="search" defaultValue={search} />
      </div>
      <Card>
        <CardHeader><CardTitle>All Domains</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium">
                <th className="pb-3">Domain</th>
                <th className="pb-3">Organization</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((d: any) => (
                <tr key={d.id} className="border-b text-sm">
                  <td className="py-3">{d.name}</td>
                  <td className="py-3">{d.organization?.name ?? "—"}</td>
                  <td className="py-3">{d.status}</td>
                  <td className="py-3">{new Date(d.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {domains.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No domains found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}