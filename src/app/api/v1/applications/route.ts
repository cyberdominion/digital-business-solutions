import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/client"
import { ApplicationStatus, CampaignStatus } from "@/types/domain"
import { z } from "zod"

const getApplicationsSchema = z.object({
  status: z.string().optional(),
  campaignId: z.string().optional(),
  page: z.string().transform(Number).pipe(z.number().min(0)).optional(),
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).optional(),
})

async function getUserFromRequest(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("dbi_session")?.value
  if (!token) return null

  const session = await prisma.session.findUnique({
    where: { id: token },
  })
  if (!session || session.expiresAt < new Date()) return null

  return session.userId
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const parsed = getApplicationsSchema.safeParse(Object.fromEntries(searchParams))

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { message: "Invalid query parameters" } },
      { status: 400 }
    )
  }

  const { status, campaignId, page = 0, limit = 20 } = parsed.data

  const where: Record<string, unknown> = {}
  if (status) where.status = status
  if (campaignId) where.campaignId = campaignId

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where,
      skip: page * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { campaign: true, organization: true },
    }),
    prisma.application.count({ where }),
  ])

  return NextResponse.json({
    success: true,
    data: { applications, total, page, limit },
  })
}

const createApplicationSchema = z.object({
  campaignId: z.string(),
  businessName: z.string().min(2),
  industry: z.string().min(1),
  ownerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  whatsapp: z.string().optional(),
  preferredContact: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  yearsOperating: z.number().optional(),
  registrationStatus: z.string().optional(),
  businessModel: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  tiktok: z.string().optional(),
  googleBusiness: z.string().optional(),
  existingDomain: z.string().optional(),
  businessEmail: z.string().optional(),
  goals: z.array(z.string()).min(1),
  requirements: z.array(z.string()).min(1),
  source: z.string().optional(),
  referralCode: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = createApplicationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { message: "Validation failed", details: parsed.error.errors } },
        { status: 400 }
      )
    }

    // Get authenticated user if any
    const userId = await getUserFromRequest(req)

    const campaign = await prisma.campaign.findUnique({
      where: { slug: parsed.data.campaignId },
      select: { id: true, name: true, capacity: true, enrolledCount: true, status: true },
    })

    if (!campaign) {
      return NextResponse.json(
        { success: false, error: { message: "Campaign not found", code: "CAMPAIGN_NOT_FOUND" } },
        { status: 404 }
      )
    }

    if (campaign.status !== CampaignStatus.ACTIVE) {
      return NextResponse.json(
        { success: false, error: { message: "Campaign is not accepting applications", code: "CAMPAIGN_CLOSED" } },
        { status: 400 }
      )
    }

    const application = await prisma.$transaction(async (tx) => {
      await tx.campaign.update({
        where: { id: campaign.id },
        data: { enrolledCount: { increment: 1 } },
      })

      return await tx.application.create({
        data: {
          campaignId: campaign.id,
          applicantUserId: userId,
          businessName: parsed.data.businessName,
          legalName: parsed.data.businessName,
          industry: parsed.data.industry,
          description: parsed.data.description,
          location: parsed.data.location,
          yearsOperating: parsed.data.yearsOperating,
          registrationStatus: parsed.data.registrationStatus,
          businessModel: parsed.data.businessModel,
          ownerName: parsed.data.ownerName,
          email: parsed.data.email,
          phone: parsed.data.phone,
          whatsapp: parsed.data.whatsapp,
          preferredContact: parsed.data.preferredContact,
          website: parsed.data.website,
          instagram: parsed.data.instagram,
          facebook: parsed.data.facebook,
          tiktok: parsed.data.tiktok,
          googleBusiness: parsed.data.googleBusiness,
          existingDomain: parsed.data.existingDomain,
          businessEmail: parsed.data.businessEmail,
          goals: { set: parsed.data.goals },
          requirements: { set: parsed.data.requirements },
          source: parsed.data.source,
          referralCode: parsed.data.referralCode,
          status: ApplicationStatus.SUBMITTED,
          submittedAt: new Date(),
        },
        include: { campaign: true },
      })
    })

    await prisma.auditLog.create({
      data: {
        action: "application.submitted",
        resource: "application",
        resourceId: application.id,
        metadata: { campaignId: campaign.id, email: parsed.data.email, applicantUserId: userId },
      },
    })

    return NextResponse.json({ success: true, data: application }, { status: 201 })
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json(
      { success: false, error: { message: "Internal server error", code: "INTERNAL_ERROR" } },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const updateSchema = z.object({
    id: z.string(),
    status: z.string().optional(),
    score: z.number().optional(),
  })

  const parsed = updateSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { message: "Invalid input" } },
      { status: 400 }
    )
  }

  const { id, status, score } = parsed.data

  const updates: Record<string, unknown> = {}
  if (status) updates.status = status
  if (score !== undefined) updates.score = score

  const updatedApplication = await prisma.application.update({
    where: { id },
    data: updates,
    include: { campaign: true, organization: true },
  })

  return NextResponse.json({ success: true, data: updatedApplication })
}
