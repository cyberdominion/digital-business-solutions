export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-100",
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

export default async function ApplicationStatusPage() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  })

  const latest = applications[0]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Application Status</h1>

      {latest ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{latest.businessName}</CardTitle>
              <Badge className={statusColors[latest.status] ?? "bg-gray-100"}>
                {latest.status}
              </Badge>
            </div>
            <CardDescription>{latest.industry}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div><span className="font-medium">Business:</span> {latest.businessName}</div>
            <div><span className="font-medium">Owner:</span> {latest.ownerName}</div>
            <div><span className="font-medium">Email:</span> {latest.email}</div>
            <div><span className="font-medium">Submitted:</span>
              {latest.submittedAt ? new Date(latest.submittedAt).toLocaleDateString() : "—"}
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className="text-muted-foreground">No application found.</p>
      )}
    </div>
  )
}