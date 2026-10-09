export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowRight, Mail, Phone, MapPin, Building2 } from "lucide-react"
import { updateApplicationStatus, recordManualPayment } from "@/modules/applications/actions"

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-800",
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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Application: {app.businessName}</h1>
          <p className="text-muted-foreground">Review application details and take action.</p>
        </div>
        <Badge className={statusColors[app.status] ?? "bg-gray-100 text-gray-800"}>{app.status}</Badge>
      </div>

      <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
        <CardHeader>
          <CardTitle className="text-gradient flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Business Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Business Name</p>
              <p className="font-medium text-gradient">{app.businessName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Legal Name</p>
              <p className="font-medium">{app.legalName ?? "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Industry</p>
              <p className="font-medium">{app.industry}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-medium">{app.location ?? "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Years Operating</p>
              <p className="font-medium">{app.yearsOperating ?? "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Registration</p>
              <p className="font-medium">{app.registrationStatus ?? "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Business Model</p>
              <p className="font-medium">{app.businessModel ?? "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
        <CardHeader>
          <CardTitle className="text-gradient flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium">{app.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-medium">{app.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">WhatsApp</p>
              <p className="font-medium">{app.whatsapp ?? "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
        <CardHeader>
          <CardTitle className="text-gradient flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-primary" />
            Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={updateApplicationStatus}>
            <input type="hidden" name="applicationId" value={app.id} />
            <div className="flex flex-col sm:flex-row gap-4">
              <select name="status" className="flex-1 border border-border/50 rounded-lg px-4 py-2 bg-background focus:ring-2 focus:ring-primary/20">
                <option value="UNDER_REVIEW">Mark Under Review</option>
                <option value="APPROVED">Approve</option>
                <option value="REJECTED">Reject</option>
                <option value="PAID">Mark Paid</option>
              </select>
              <Button type="submit" className="transition-bounce hover:shadow-glow">
                Update Status
              </Button>
            </div>
          </form>

          <hr className="border-border/50" />

          <form action={recordManualPayment}>
            <input type="hidden" name="applicationId" value={app.id} />
            <h4 className="font-medium text-gradient">Record Manual Payment</h4>
            <p className="text-sm text-muted-foreground mb-4">Use for payments made outside Paystack (bank transfer, cash, etc.)</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="amount" className="block text-sm font-medium text-muted-foreground mb-1">Amount</Label>
                <Input id="amount" name="amount" type="number" step="1" defaultValue="50000" min="1" className="border-border/50 focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <Label htmlFor="currency" className="block text-sm font-medium text-muted-foreground mb-1">Currency</Label>
                <Input id="currency" name="currency" type="text" defaultValue="NGN" className="border-border/50 focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <Label htmlFor="notes" className="block text-sm font-medium text-muted-foreground mb-1">Notes</Label>
                <Input id="notes" name="notes" placeholder="e.g., Bank transfer received, Cash payment" className="border-border/50 focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <Button type="submit" className="mt-4 transition-bounce hover:shadow-glow">
              Record Payment
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-strong border border-border/50 bg-card transition-smooth hover:shadow-glow">
        <CardHeader>
          <CardTitle className="text-gradient flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-primary" />
            Event History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {app.events.map((e) => (
              <div key={e.id} className="border-l-2 border-primary/20 pl-4 py-3 bg-muted/30 rounded-r-lg hover:bg-muted/50 transition-smooth">
                <p className="font-medium text-gradient">{e.fromStatus} → {e.toStatus}</p>
                <p className="text-sm text-muted-foreground">
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
