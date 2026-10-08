import { PrismaClient, User, Organization, OrganizationMember, Application, Campaign } from "@prisma/client"

export const ROLES = {
  PLATFORM_OWNER: "PLATFORM_OWNER",
  PLATFORM_ADMIN: "PLATFORM_ADMIN",
  PLATFORM_OPERATIONS: "PLATFORM_OPERATIONS",
  PLATFORM_SUPPORT: "PLATFORM_SUPPORT",
  APPLICANT: "APPLICANT",
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  SALES: "SALES",
  STAFF: "STAFF",
  CUSTOMER: "CUSTOMER",
} as const

export type Role = keyof typeof ROLES

export const PERMISSIONS = {
  APPLICATIONS_READ: "applications.read",
  APPLICATIONS_REVIEW: "applications.review",
  APPLICATIONS_APPROVE: "applications.approve",
  PAYMENTS_READ: "payments.read",
  ORGANIZATIONS_READ: "organizations.read",
  ORGANIZATIONS_UPDATE: "organizations.update",
  MEMBERS_MANAGE: "members.manage",
  CRM_READ: "crm.read",
  CRM_WRITE: "crm.write",
  WEBSITE_MANAGE: "website.manage",
  DOMAINS_MANAGE: "domains.manage",
  AI_MANAGE: "ai.manage",
  ASSETS_READ: "assets.read",
  AUDIT_READ: "audit.read",
  PLATFORM_SETTINGS_MANAGE: "platform.settings.manage",
  CAMPAIGNS_MANAGE: "campaigns.manage",
  ONBOARDING_MANAGE: "onboarding.manage",
  TASKS_MANAGE: "tasks.manage",
} as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  [ROLES.PLATFORM_OWNER]: Object.values(PERMISSIONS),
  [ROLES.PLATFORM_ADMIN]: [
    PERMISSIONS.ORGANIZATIONS_READ,
    PERMISSIONS.ORGANIZATIONS_UPDATE,
    PERMISSIONS.CAMPAIGNS_MANAGE,
    PERMISSIONS.ONBOARDING_MANAGE,
    PERMISSIONS.PLATFORM_SETTINGS_MANAGE,
    PERMISSIONS.AUDIT_READ,
  ],
  [ROLES.PLATFORM_OPERATIONS]: [
    PERMISSIONS.APPLICATIONS_READ,
    PERMISSIONS.APPLICATIONS_REVIEW,
    PERMISSIONS.APPLICATIONS_APPROVE,
    PERMISSIONS.PAYMENTS_READ,
    PERMISSIONS.ORGANIZATIONS_READ,
    PERMISSIONS.ONBOARDING_MANAGE,
    PERMISSIONS.TASKS_MANAGE,
    PERMISSIONS.AUDIT_READ,
  ],
  [ROLES.PLATFORM_SUPPORT]: [
    PERMISSIONS.APPLICATIONS_READ,
    PERMISSIONS.PAYMENTS_READ,
    PERMISSIONS.ORGANIZATIONS_READ,
    PERMISSIONS.AUDIT_READ,
  ],
  [ROLES.APPLICANT]: [],
  [ROLES.OWNER]: [
    PERMISSIONS.APPLICATIONS_READ,
    PERMISSIONS.PAYMENTS_READ,
    PERMISSIONS.ORGANIZATIONS_READ,
    PERMISSIONS.ORGANIZATIONS_UPDATE,
    PERMISSIONS.ASSETS_READ,
    PERMISSIONS.CRM_READ,
    PERMISSIONS.CRM_WRITE,
    PERMISSIONS.WEBSITE_MANAGE,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.APPLICATIONS_READ,
    PERMISSIONS.PAYMENTS_READ,
    PERMISSIONS.ORGANIZATIONS_READ,
    PERMISSIONS.ORGANIZATIONS_UPDATE,
    PERMISSIONS.MEMBERS_MANAGE,
    PERMISSIONS.CRM_READ,
    PERMISSIONS.CRM_WRITE,
    PERMISSIONS.WEBSITE_MANAGE,
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.CRM_READ,
    PERMISSIONS.CRM_WRITE,
    PERMISSIONS.WEBSITE_MANAGE,
  ],
  [ROLES.SALES]: [
    PERMISSIONS.CRM_READ,
    PERMISSIONS.CRM_WRITE,
  ],
  [ROLES.STAFF]: [
    PERMISSIONS.CRM_READ,
  ],
  [ROLES.CUSTOMER]: [],
}

export type AuthContext = {
  user: User | null
  userId: string | null
  userRole: string | null
  organization: Organization | null
  organizationId: string | null
  membershipRole: string | null
  permissions: Permission[]
}

export interface PermissionChecker {
  can: (permission: Permission) => boolean
  canAny: (permissions: Permission[]) => boolean
  isInOrganization: (orgId: string) => boolean
  isPlatformAdmin: () => boolean
}
