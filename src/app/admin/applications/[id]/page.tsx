export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { updateApplicationStatus } from "@/modules/applications/actions"

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

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const app = await prisma.application.findUnique({
    where: { id },
    include: { campaign: true, organization: true, answers: true, events: true },
  })

  if (!app) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Application: {app.businessName}</h1>
        <Badge className={statusColors[app.status] ?? "bg-gray-100"}>{app.status}</Badge>
      </div>

      <Card>
        <CardHeader><CardTitle>Business Details</CardTitle></CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-2">
          <div><span className="font-medium">Business Name:</span> {app.businessName}</div>
          <div><span className="font-medium">Legal Name:</span> {app.legalName ?? "—"}</div>
          <div><span className="font-medium">Industry:</span> {app.industry}</div>
          <div><span className="font-medium">Location:</span> {app.location ?? "—"}</div>
          <div><span className="font-medium">Years Operating:</span> {app.yearsOperating ?? "—"}</div>
          <div><span className="font-medium">Registration:</span> {app.registrationStatus ?? "—"}</div>
          <div><span className="font-medium">Business Model:</span> {app.businessModel ?? "—"}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-2">
          <div><span className="font-medium">Owner:</span> {app.ownerName}</div>
          <div><span className="font-medium">Email:</span> {app.email}</div>
          <div><span className="font-medium">Phone:</span> {app.phone}</div>
          <div><span className="font-medium">WhatsApp:</span> {app.whatsapp ?? "—"}</div>
        </CardContent>
      </Card>

      <form action={updateApplicationStatus}>
        <input type="hidden" name="applicationId" value={app.id} />
        <Card>
          <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <select name="status" className="border rounded px-3 py-1">
                <option value="UNDER_REVIEW">Mark Under Review</option>
                <option value="APPROVED">Approve</option>
                <option value="REJECTED">Reject</option>
                <option value="PAID">Mark Paid</option>
              </select>
              <Button type="submit">Update Status</Button>
            </div>
          </CardContent>
        </Card>
      </form>

      <Card>
        <CardHeader><CardTitle>Event History</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {app.events.map((e) => (
              <div key={e.id} className="border-l-2 border-muted pl-3 py-1">
                <p className="text-sm">{e.fromStatus} → {e.toStatus}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(e.createdAt).toLocaleString()} {e.actor && `by ${e.actor}`}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
