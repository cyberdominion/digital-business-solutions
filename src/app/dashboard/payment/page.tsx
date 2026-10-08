export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard } from "lucide-react"

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ applicationId?: string }>
}) {
  const { applicationId } = await searchParams
  let payment = null
  let application: { id: string; businessName: string; status: string } | null = null

  if (applicationId) {
    application = await prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true, businessName: true, status: true },
    })
    if (application) {
      payment = await prisma.payment.findFirst({
        where: { applicationId },
        orderBy: { createdAt: "desc" },
        include: { organization: true },
      })
    }
  } else {
    payment = await prisma.payment.findFirst({
      orderBy: { createdAt: "desc" },
      include: { organization: true, application: true },
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payment</h1>
      {payment ? (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>Amount: ₦{payment.amount.toLocaleString()} {payment.currency}</div>
            <div>Status: <Badge variant={payment.status === "SUCCESS" ? "default" : "secondary"}>{payment.status}</Badge></div>
            <div>Fulfillment: <Badge variant={payment.fulfillmentStatus === "FULFILLED" ? "default" : "secondary"}>{payment.fulfillmentStatus}</Badge></div>
            <div>Reference: {payment.providerReference}</div>
            <div>Created: {new Date(payment.createdAt).toLocaleString()}</div>
            {payment.paidAt && <div>Paid: {new Date(payment.paidAt).toLocaleString()}</div>}
            {payment.status === "PENDING" && application?.status === "APPROVED" && (
              <Button onClick={async () => {
                const res = await fetch("/api/v1/payments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ applicationId }) })
                const result = await res.json()
                if (result.success?.authorizationUrl) { window.location.href = result.success.authorizationUrl }
              }}>
                <CreditCard className="mr-2 h-4 w-4" /> Pay Now
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader><CardTitle>No Payment Found</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Payments are created after your application is approved.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}