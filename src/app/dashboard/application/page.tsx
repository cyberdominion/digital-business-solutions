export const dynamic = "force-dynamic"
import { getAuthContextCached } from "@/lib/auth"
import { prisma } from "@/lib/db/client"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function DashboardApplicationPage() {
  const authContext = await getAuthContextCached()

  if (!authContext.userId) {
    redirect("/login?callbackUrl=/dashboard/application")
  }

  const applications = await prisma.application.findMany({
    where: {
      OR: [
        authContext.organizationId ? { organizationId: authContext.organizationId } : {},
        authContext.userId ? { applicantUserId: authContext.userId } : {},
      ].filter((condition) => Object.keys(condition).length > 0),
    },
    orderBy: { createdAt: "desc" },
    include: { campaign: true },
  })

  const statusColors: Record<string, string> = {
    DRAFT: "bg-gray-100",
    SUBMITTED: "bg-blue-100 text-blue-800",
    UNDER_REVIEW: "bg-yellow-100 text-yellow-800",
    REJECTED: "bg-red-100 text-red-800",
    APPROVED: "bg-green-100 text-green-800",
    PAYMENT_PENDING: "bg-orange-100 text-orange-800",
    PAID: "bg-green-100 text-green-800",
    ONBOARDING: "bg-purple-100 text-purple-800",
    LIVE: "bg-emerald-100 text-emerald-800",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Applications</h1>
        <Button asChild>
          <Link href="/apply">New Application</Link>
        </Button>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground mb-4">You have no applications yet.</p>
            <Button asChild>
              <Link href="/apply">Start Your First Application</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{app.businessName}</CardTitle>
                  <Badge className={statusColors[app.status] ?? "bg-gray-100"}>
                    {app.status}
                  </Badge>
                </div>
                <CardDescription>{app.industry}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div><span className="font-medium">Industry:</span> {app.industry}</div>
                  <div><span className="font-medium">Submitted:</span>
                    {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : "—"}
                  </div>
                  <div><span className="font-medium">Score:</span> {app.score ?? "Not scored"}</div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/application/status`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}