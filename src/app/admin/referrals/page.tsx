export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db/client"
import type { Prisma } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default async function AdminReferralsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = "" } = await searchParams
  const where: Prisma.ReferralWhereInput = search
    ? { code: { contains: search, mode: "insensitive" } }
    : {}

  const referrals = await prisma.referral.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { conversionsList: true },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Referrals</h1>
      <p className="text-muted-foreground">Track referral programs and conversions.</p>
      <Input placeholder="Search by code..." className="pl-10" name="search" defaultValue={search} />
      <Card>
        <CardHeader><CardTitle>All Referrals</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium">
                <th className="pb-3">Code</th>
                <th className="pb-3">Clicks</th>
                <th className="pb-3">Conversions</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((ref) => (
                <tr key={ref.id} className="border-b text-sm">
                  <td className="py-3 font-mono">{ref.code}</td>
                  <td className="py-3">{ref.clicks}</td>
                  <td className="py-3">{ref.conversions}</td>
                  <td className="py-3">
                    <Badge variant={ref.isActive ? "default" : "secondary"}>
                      {ref.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="py-3">{new Date(ref.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}