import { prisma } from "@/lib/db/client"
import { NextResponse } from "next/server"
import { z } from "zod"

const getSchema = z.object({
  slug: z.string().optional(),
})

export async function GET(request: Request) {
  const url = new URL(request.url)
  const slug = url.searchParams.get("slug")

  if (slug) {
    const campaign = await prisma.campaign.findUnique({
      where: { slug },
      include: { applications: true },
    })

    if (!campaign) {
      return NextResponse.json(
        { success: false, error: { message: "Campaign not found" } },
        { status: 404 }
      )
    }

    const remaining = Math.max(0, campaign.capacity - campaign.enrolledCount)
    const slotStatus = remaining === 0
      ? "FULL"
      : remaining <= 5
        ? "LIMITED"
        : "AVAILABLE"

    return NextResponse.json({
      success: true,
      data: {
        ...campaign,
        remaining,
        slotStatus,
      },
    })
  }

  const campaigns = await prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ success: true, data: campaigns })
}

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = z.object({
    name: z.string().min(2),
    slug: z.string().min(1),
    price: z.number().positive(),
    currency: z.string().default("NGN"),
    capacity: z.number().int().positive(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    inclusions: z.array(z.string()).optional(),
    eligibilityRules: z.record(z.unknown()).optional(),
    terms: z.string().optional(),
  }).safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { message: "Validation failed", details: parsed.error.errors } },
      { status: 400 }
    )
  }

  const campaign = await prisma.campaign.create({
    data: {
      name: parsed.data.name,
      slug: parsed.data.slug,
      price: parsed.data.price,
      currency: parsed.data.currency,
      capacity: parsed.data.capacity,
      startDate: parsed.data.startDate,
      endDate: parsed.data.endDate,
      status: "ACTIVE",
      inclusions: parsed.data.inclusions as any,
      eligibilityRules: parsed.data.eligibilityRules as any,
      terms: parsed.data.terms,
    },
  })

  return NextResponse.json({ success: true, data: campaign }, { status: 201 })
}
