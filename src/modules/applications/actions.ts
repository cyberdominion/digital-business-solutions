"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db/client"

export async function updateApplicationStatus(formData: FormData) {
  const applicationId = formData.get("applicationId") as string
  const newStatus = formData.get("status") as string

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { status: true, id: true, email: true, businessName: true },
  })

  if (!application) {
    return
  }

  await prisma.$transaction(async (tx) => {
    await tx.application.update({
      where: { id: applicationId },
      data: { status: newStatus },
    })

    await tx.applicationEvent.create({
      data: {
        applicationId,
        fromStatus: application.status,
        toStatus: newStatus,
        actor: "admin",
      },
    })

    await tx.auditLog.create({
      data: {
        action: "application.status_updated",
        resource: "application",
        resourceId: applicationId,
        metadata: { from: application.status, to: newStatus },
      },
    })
  })

  revalidatePath(`/admin/applications/${applicationId}`)
  revalidatePath("/admin/applications")
}

export async function recordManualPayment(formData: FormData) {
  const applicationId = formData.get("applicationId") as string
  const amount = parseFloat(formData.get("amount") as string) || 50000
  const currency = (formData.get("currency") as string) || "NGN"
  const reference = `manual_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const notes = (formData.get("notes") as string) || "Manual payment recorded by admin"

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { status: true, id: true, email: true, businessName: true, campaignId: true },
  })

  if (!application) {
    throw new Error("Application not found")
  }

  await prisma.$transaction(async (tx) => {
    // Create payment record
    await tx.payment.create({
      data: {
        applicationId,
        provider: "MANUAL",
        providerReference: reference,
        amount,
        currency,
        status: "SUCCESS",
        paidAt: new Date(),
        metadata: { notes, recordedBy: "admin" },
        fulfillmentStatus: "PENDING",
      },
    })

    // Update application status to PAID
    await tx.application.update({
      where: { id: applicationId },
      data: { status: "PAID" },
    })

    // Create application event
    await tx.applicationEvent.create({
      data: {
        applicationId,
        fromStatus: application.status,
        toStatus: "PAID",
        actor: "admin",
        notes: `Manual payment recorded: ${currency} ${amount.toLocaleString()}`,
        metadata: { reference, amount, currency },
      },
    })

    // Increment campaign enrolled count
    await tx.campaign.update({
      where: { id: application.campaignId },
      data: { enrolledCount: { increment: 1 } },
    })

    // Create audit log
    await tx.auditLog.create({
      data: {
        action: "payment.manual_recorded",
        resource: "payment",
        resourceId: applicationId,
        metadata: { reference, amount, currency, notes },
      },
    })
  })

  revalidatePath(`/admin/applications/${applicationId}`)
  revalidatePath("/admin/applications")
  revalidatePath("/admin/dashboard")
}
