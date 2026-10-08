import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/client"
import { paystackService } from "@/lib/paystack"
import { z } from "zod"

const initPaymentSchema = z.object({
  applicationId: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = initPaymentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { message: "Invalid input" } },
        { status: 400 }
      )
    }

    const { applicationId } = parsed.data

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { campaign: true },
    })

    if (!application) {
      return NextResponse.json(
        { success: false, error: { message: "Application not found", code: "NOT_FOUND" } },
        { status: 404 }
      )
    }

    if (application.status !== "APPROVED") {
      return NextResponse.json(
        { success: false, error: { message: "Application not approved", code: "NOT_APPROVED" } },
        { status: 400 }
      )
    }

    const existingPayment = await prisma.payment.findFirst({
      where: {
        applicationId,
        status: "SUCCESS",
      },
    })

    if (existingPayment) {
      return NextResponse.json({
        success: true,
        data: { alreadyPaid: true, payment: existingPayment },
      })
    }

    const reference = `pay_${application.id}_${Date.now()}`

    let payment = await prisma.payment.findUnique({
      where: { providerReference: reference },
    })

    if (payment && payment.status === "SUCCESS") {
      return NextResponse.json({
        success: true,
        data: { alreadyPaid: true, payment },
      })
    }

    payment = await prisma.payment.upsert({
      where: { providerReference: reference },
      update: {
        status: "PENDING",
        fulfillmentStatus: "PENDING",
      },
      create: {
        applicationId,
        provider: "PAYSTACK",
        providerReference: reference,
        amount: application.campaign.price,
        currency: application.campaign.currency,
        status: "PENDING",
      },
    })

    if (application.organizationId) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { organizationId: application.organizationId },
      })
    }

    const { authorizationUrl } = await paystackService.initializeTransaction({
      email: application.email,
      amount: paystackService.formatAmount(application.campaign.price),
      currency: application.campaign.currency,
      reference,
      metadata: {
        applicationId: application.id,
        campaignId: application.campaign.id,
      },
    })

    await prisma.application.update({
      where: { id: application.id },
      data: { status: "PAYMENT_PENDING" },
    })

    await prisma.applicationEvent.create({
      data: {
        applicationId: application.id,
        fromStatus: application.status,
        toStatus: "PAYMENT_PENDING",
        actor: "system",
      },
    })

    await prisma.paymentEvent.create({
      data: {
        paymentId: payment.id,
        type: "init",
        notes: "Payment initialization request received",
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        authorizationUrl,
        reference,
      },
    })
  } catch (error) {
    console.error("Payment initiation error:", error)
    return NextResponse.json(
      { success: false, error: { message: "Internal server error", code: "INTERNAL_ERROR" } },
      { status: 500 }
    )
  }
}

const getPaymentSchema = z.object({
  applicationId: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const parsed = getPaymentSchema.safeParse(Object.fromEntries(searchParams))

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { message: "Invalid query parameters" } },
      { status: 400 }
    )
  }

  const where: Record<string, unknown> = {}
  if (parsed.data.applicationId) {
    where.applicationId = parsed.data.applicationId
  }

  const payments = await prisma.payment.findMany({
    where,
    include: {
      application: true,
      organization: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ success: true, data: payments })
}
