import { prisma } from "@/lib/db/client"
import { NextResponse } from "next/server"
import { z } from "zod"

const createSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  industry: z.string().optional(),
  legalName: z.string().optional(),
})

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = createSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { message: "Validation failed", details: parsed.error.errors } },
      { status: 400 }
    )
  }

  const existingOrg = await prisma.organization.findUnique({
    where: { slug: parsed.data.slug },
  })

  if (existingOrg) {
    return NextResponse.json(
      { success: false, error: { message: "Organization slug already taken" } },
      { status: 409 }
    )
  }

  const org = await prisma.organization.create({
    data: {
      ...parsed.data,
      status: "PENDING",
    },
  })

  return NextResponse.json({ success: true, data: org }, { status: 201 })
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const slug = url.searchParams.get("slug")

  if (slug) {
    const org = await prisma.organization.findUnique({
      where: { slug },
      include: {
        members: { include: { user: true } },
      },
    })

    if (!org) {
      return NextResponse.json(
        { success: false, error: { message: "Organization not found" } },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: org })
  }

  const orgs = await prisma.organization.findMany({
    orderBy: { createdAt: "desc" },
    include: { members: true },
  })

  return NextResponse.json({ success: true, data: orgs })
}
