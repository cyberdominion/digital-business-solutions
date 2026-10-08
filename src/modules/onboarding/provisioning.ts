import { prisma } from "@/lib/db/client"
import { ApplicationStatus, PaymentStatus, FulfillmentStatus, OrganizationStatus } from "@/types/domain"

export interface TenantProvisioningInput {
  applicationId: string
  businessName: string
  ownerName: string
  ownerEmail: string
  industry: string
  slug?: string
}

export class TenantProvisioningService {
  async provisionTenant(input: TenantProvisioningInput): Promise<{
    organizationId: string
    memberId: string
    onboardingProjectId: string
  }> {
    const slug = input.slug ?? this.generateSlug(input.businessName)

    const result = await prisma.$transaction(async (tx) => {
      const existingOrg = await tx.organization.findUnique({
        where: { slug },
      })

      if (existingOrg) {
        throw new Error(`Organization with slug '${slug}' already exists`)
      }

      const owner = await tx.user.upsert({
        where: { email: input.ownerEmail },
        update: {},
        create: {
          email: input.ownerEmail,
          name: input.ownerName,
          role: "OWNER",
        },
      })

      const organization = await tx.organization.create({
        data: {
          slug,
          name: input.businessName,
          legalName: input.businessName,
          industry: input.industry,
          status: OrganizationStatus.ACTIVE,
        },
      })

      const ownerRole = await tx.role.findUnique({
        where: { name: "OWNER" },
      })

      if (!ownerRole) {
        throw new Error("OWNER role not found")
      }

      const member = await tx.organizationMember.create({
        data: {
          organizationId: organization.id,
          userId: owner.id,
          roleId: ownerRole.id,
          status: "ACTIVE",
        },
      })

      const businessProfile = await tx.organization.update({
        where: { id: organization.id },
        data: {
          legalName: input.businessName,
          industry: input.industry,
          name: input.businessName,
        },
      })

      const appRecord = await tx.application.findUnique({
        where: { id: input.applicationId },
        select: { campaignId: true },
      })

      if (!appRecord) {
        throw new Error("Application not found during provisioning")
      }

      await tx.campaignEnrollment.create({
        data: {
          campaignId: appRecord.campaignId,
          organizationId: organization.id,
        },
      })

      const onboardingProject = await tx.onboardingProject.create({
        data: {
          applicationId: input.applicationId,
          organizationId: organization.id,
          status: "NOT_STARTED",
          progress: 0,
        },
      })

      await this.createDefaultOnboardingSteps(tx, onboardingProject.id)

      await tx.application.update({
        where: { id: input.applicationId },
        data: {
          status: ApplicationStatus.ONBOARDING,
          organizationId: organization.id,
        },
      })

      await tx.auditLog.create({
        data: {
          action: "organization.provisioned",
          resource: "organization",
          resourceId: organization.id,
          metadata: { applicationId: input.applicationId, slug },
        },
      })

      return {
        organizationId: organization.id,
        memberId: member.id,
        onboardingProjectId: onboardingProject.id,
      }
    })

    return result
  }

  private async createDefaultOnboardingSteps(
    tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0],
    projectId: string,
  ) {
    const defaultSteps = [
      { key: "business_profile", label: "Business Profile" },
      { key: "brand_identity", label: "Brand Identity" },
      { key: "contact_info", label: "Contact Information" },
      { key: "products_services", label: "Products/Services" },
      { key: "pricing", label: "Pricing" },
      { key: "media_assets", label: "Media Assets" },
      { key: "domain", label: "Domain Setup" },
      { key: "social_links", label: "Social Links" },
      { key: "payment_config", label: "Payment Configuration" },
      { key: "whatsapp_config", label: "WhatsApp Configuration" },
      { key: "website_content", label: "Website Content" },
      { key: "final_approval", label: "Final Approval" },
    ]

    for (const step of defaultSteps) {
      await tx.onboardingStep.create({
        data: {
          projectId,
          key: step.key,
          label: step.label,
          status: "PENDING",
        },
      })
    }
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }
}

export const tenantProvisioningService = new TenantProvisioningService()
