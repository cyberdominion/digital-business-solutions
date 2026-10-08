export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/client"
import { tenantProvisioningService } from "@/modules/onboarding/provisioning"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const result = await tenantProvisioningService.provisionTenant({
      applicationId: body.applicationId,
      businessName: body.businessName,
      ownerName: body.ownerName,
      ownerEmail: body.ownerEmail,
      industry: body.industry,
      slug: body.slug,
    })

    return NextResponse.json({
      success: true,
      data: result,
    }, { status: 201 })
  } catch (error) {
    console.error("Provisioning error:", error)
    return NextResponse.json(
      { success: false, error: { message: (error as Error).message } },
      { status: 400 }
    )
  }
}
