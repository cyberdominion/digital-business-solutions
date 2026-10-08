import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/client"
import { paystackService } from "@/lib/paystack"
import { PaymentStatus, FulfillmentStatus } from "@/types/domain"

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get("x-paystack-signature")

    if (!signature) {
      console.error("Missing Paystack signature")
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!paystackService.verifyWebhookSignature(rawBody, signature)) {
      console.error("Invalid Paystack webhook signature")
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const event = JSON.parse(rawBody)

    await prisma.auditLog.create({
      data: {
        action: "payment.webhook_received",
        resource: "payment",
        metadata: {
          eventType: event.event,
          reference: event.data?.reference,
        },
      },
    })

    switch (event.event) {
      case "charge.success": {
        const transaction = event.data
        await handleSuccessfulPayment(transaction)
        break
      }

      case "charge.failed": {
        const transaction = event.data
        await handleFailedPayment(transaction)
        break
      }

      case "charge.refunded": {
        const transaction = event.data
        await handleRefund(transaction)
        break
      }

      default:
        console.log(`Unhandled Paystack event: ${event.event}`)
    }

    return new NextResponse("OK", { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

async function handleSuccessfulPayment(transaction: {
  reference: string
  status: string
  amount: number
  currency: string
  customer: { email: string }
  metadata?: Record<string, unknown>
}) {
  const existingPayment = await prisma.payment.findUnique({
    where: { providerReference: transaction.reference },
  })

  if (!existingPayment) {
    console.error(`Payment not found for reference: ${transaction.reference}`)
    return
  }

  if (existingPayment.status === PaymentStatus.SUCCESS) {
    return
  }

  if (transaction.status !== "success") {
    return
  }

  const expectedAmount = existingPayment.amount
  if (transaction.amount !== expectedAmount * 100) {
    console.error(`Amount mismatch: expected ${expectedAmount * 100}, got ${transaction.amount}`)
    await prisma.payment.update({
      where: { id: existingPayment.id },
      data: {
        status: PaymentStatus.FAILED,
        fulfillmentStatus: FulfillmentStatus.FAILED,
      },
    })
    return
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: existingPayment.id },
      data: {
        status: PaymentStatus.SUCCESS,
        paidAt: new Date(),
        fulfillmentStatus: FulfillmentStatus.PROCESSING,
      },
    })

    await tx.paymentEvent.create({
      data: {
        paymentId: existingPayment.id,
        type: "webhook_success",
        notes: "Payment verified via Paystack webhook",
      },
    })

    await tx.auditLog.create({
      data: {
        action: "payment.verified",
        resource: "payment",
        resourceId: existingPayment.id,
        metadata: { reference: transaction.reference },
      },
    })

    const application = await tx.application.findUnique({
      where: { id: existingPayment.applicationId },
    })

    if (application && application.status === "PAYMENT_PENDING") {
      await tx.application.update({
        where: { id: application.id },
        data: { status: "PAID" },
      })

      await tx.applicationEvent.create({
        data: {
          applicationId: application.id,
          fromStatus: "PAYMENT_PENDING",
          toStatus: "PAID",
          actor: "webhook",
        },
      })
    }
  })
}

async function handleFailedPayment(transaction: { reference: string; status: string }) {
  const payment = await prisma.payment.findUnique({
    where: { providerReference: transaction.reference },
  })

  if (!payment) return

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: payment.id },
      data: { status: PaymentStatus.FAILED },
    })

    await tx.paymentEvent.create({
      data: {
        paymentId: payment.id,
        type: "webhook_failed",
        notes: "Payment failed via webhook",
      },
    })
  })
}

async function handleRefund(transaction: { reference: string; amount: number }) {
  const payment = await prisma.payment.findUnique({
    where: { providerReference: transaction.reference },
  })

  if (!payment) return

  await prisma.$transaction(async (tx) => {
    const refund = await tx.refund.create({
      data: {
        paymentId: payment.id,
        amount: transaction.amount / 100,
        currency: payment.currency,
        status: "PROCESSED",
      },
    })

    await tx.paymentEvent.create({
      data: {
        paymentId: payment.id,
        type: "webhook_refunded",
        metadata: { refundAmount: transaction.amount },
      },
    })
  })
}
