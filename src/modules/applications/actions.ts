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
