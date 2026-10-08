import { prisma } from "@/lib/db/client"
import { ApplicationStatus } from "@/types/domain"
import { hashPassword } from "@/lib/auth"

async function main() {
  const campaign = await prisma.campaign.upsert({
    where: { slug: "dbi100" },
    update: {},
    create: {
      name: "Digital Business 100",
      slug: "dbi100",
      price: 50000,
      currency: "NGN",
      capacity: 100,
      enrolledCount: 0,
      startDate: new Date(),
      status: "ACTIVE",
      inclusions: [
        "Professional business website",
        "Domain acquisition",
        "One year hosting",
        "Mobile-responsive implementation",
        "Lead/contact capture",
        "Basic CRM/admin capability",
        "Basic analytics",
        "Onboarding support",
        "Selected integrations",
      ],
      eligibilityRules: {
        minimumYears: 0,
        allowedIndustries: [
          "fashion",
          "food",
          "retail",
          "services",
          "beauty",
          "real-estate",
          "education",
          "hospitality",
          "construction",
          "creative",
          "other",
        ],
      },
      terms: "The Digital Business 100 campaign offers a professional business website for ₦50,000. This includes domain, hosting, and basic functionality. Additional services may incur extra costs.",
    },
  })

  console.log("Campaign created:", campaign.id)

  const adminRole = await prisma.role.upsert({
    where: { name: "PLATFORM_ADMIN" },
    update: {},
    create: {
      name: "PLATFORM_ADMIN",
      description: "Platform administrator with full access",
    },
  })

  const ownerRole = await prisma.role.upsert({
    where: { name: "OWNER" },
    update: {},
    create: {
      name: "OWNER",
      description: "Organization owner with full access",
    },
  })

  const staffRole = await prisma.role.upsert({
    where: { name: "STAFF" },
    update: {},
    create: {
      name: "STAFF",
      description: "Organization staff member",
    },
  })

  const adminPermission = await prisma.permission.upsert({
    where: { name: "platform.settings.manage" },
    update: {},
    create: {
      name: "platform.settings.manage",
      description: "Manage platform settings",
    },
  })

  await prisma.rolePermission.upsert({
    where: { roleId_permissionId: { roleId: adminRole.id, permissionId: adminPermission.id } },
    update: {},
    create: {
      roleId: adminRole.id,
      permissionId: adminPermission.id,
    },
  })

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@admin.com",
      password: hashPassword("Admin@123!"),
      role: "PLATFORM_ADMIN",
      emailVerified: new Date(),
    },
  })

  console.log("Admin user created:", adminUser.id)

  console.log("Seed completed successfully")
}

main()
  .catch((e) => {
    console.error("Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
