"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db/client"
import { z } from "zod"

const updateCampaignCapacitySchema = z.object({
  campaignId: z.string(),
  capacity: z.number().int().min(0),
})

export async function updateCampaignCapacity(formData: FormData) {
  const campaignId = formData.get("campaignId") as string
  const capacity = parseInt(formData.get("capacity") as string, 10)

  const parsed = updateCampaignCapacitySchema.safeParse({ campaignId, capacity })

  if (!parsed.success) {
    throw new Error("Invalid input")
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
    select: { enrolledCount: true },
  })

  if (!campaign) {
    throw new Error("Campaign not found")
  }

  if (parsed.data.capacity < campaign.enrolledCount) {
    throw new Error(`Cannot reduce capacity below enrolled count (${campaign.enrolledCount})`)
  }

  await prisma.campaign.update({
    where: { id: campaignId },
    data: { capacity: parsed.data.capacity },
  })

  revalidatePath("/admin/campaign")
  revalidatePath("/campaign")
  revalidatePath("/")
}