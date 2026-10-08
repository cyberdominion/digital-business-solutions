import { randomBytes, pbkdf2Sync } from "crypto"
import { cookies } from "next/headers"
import { nanoid } from "nanoid"
import { prisma } from "@/lib/db/client"
import { AuthContext, Permission } from "@/lib/permissions"
import { cache } from "react"

const SESSION_COOKIE_NAME = "dbi_session"

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex")
  const hash = pbkdf2Sync(password, salt, 100000, 64, "sha256").toString("hex")
  return `${salt}:${hash}`
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(":")
  if (!salt || !hash) return false
  const testHash = pbkdf2Sync(password, salt, 100000, 64, "sha256").toString("hex")
  return timingSafeEqual(Buffer.from(hash), Buffer.from(testHash))
}

function timingSafeEqual(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i]
  }
  return result === 0
}

export async function createSession(userId: string): Promise<string> {
  const token = `${userId}.${nanoid(64)}`
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  await prisma.session.create({
    data: {
      id: token,
      userId,
      expiresAt,
    },
  })

  return token
}

export async function verifySessionToken(token: string): Promise<{ userId: string } | null> {
  if (!token) return null

  const session = await prisma.session.findUnique({
    where: { id: token },
    include: { user: true },
  })

  if (!session) return null
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: token } }).catch(() => {})
    return null
  }

  return { userId: session.userId }
}

export async function destroySession(): Promise<void> {
  const token = await getSessionToken()
  if (token) {
    await prisma.session.delete({ where: { id: token } }).catch(() => {})
  }
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null
}

export async function getAuthContext(): Promise<AuthContext> {
  const token = await getSessionToken()
  if (!token) {
    return createEmptyAuthContext()
  }

  const session = await verifySessionToken(token)
  if (!session) {
    return createEmptyAuthContext()
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      memberships: {
        include: {
          organization: true,
        },
      },
    },
  })

  if (!user) {
    return createEmptyAuthContext()
  }

  const platformRoles = ["PLATFORM_OWNER", "PLATFORM_ADMIN", "PLATFORM_OPERATIONS", "PLATFORM_SUPPORT"]
  const isPlatformAdmin = platformRoles.includes(user.role)

  let organization = null
  let permissions: Permission[] = []

  if (isPlatformAdmin) {
    permissions = getPlatformPermissions(user.role)
  } else if (user.memberships.length > 0) {
    const membership = user.memberships[0]
    organization = membership.organization
    permissions = getPermissionsForRole(membership.roleId)
  }

  return {
    user,
    userId: user.id,
    userRole: user.role,
    organization,
    organizationId: organization?.id ?? null,
    membershipRole: user.memberships[0]?.roleId ?? null,
    permissions,
  }
}

function createEmptyAuthContext(): AuthContext {
  return {
    user: null,
    userId: null,
    userRole: null,
    organization: null,
    organizationId: null,
    membershipRole: null,
    permissions: [],
  }
}

function getPlatformPermissions(role: string): Permission[] {
  const allPermissions: Permission[] = [
    "applications.read",
    "applications.review",
    "applications.approve",
    "campaigns.manage",
    "payments.read",
    "organizations.read",
    "organizations.update",
    "members.manage",
    "onboarding.manage",
    "tasks.manage",
    "audit.read",
    "platform.settings.manage",
  ]

  if (role === "PLATFORM_OWNER" || role === "PLATFORM_ADMIN") {
    return allPermissions
  }

  return [
    "applications.read",
    "applications.review",
    "payments.read",
    "organizations.read",
    "onboarding.manage",
    "tasks.manage",
    "audit.read",
  ]
}

function getPermissionsForRole(roleId: string): Permission[] {
  const rolePerms: Record<string, Permission[]> = {
    OWNER: [
      "applications.read",
      "payments.read",
      "organizations.read",
      "organizations.update",
      "audit.read",
    ],
    ADMIN: [
      "applications.read",
      "payments.read",
      "organizations.read",
      "organizations.update",
      "members.manage",
      "audit.read",
    ],
    STAFF: ["applications.read", "payments.read"],
    CUSTOMER: ["applications.read", "payments.read"],
  }

  return rolePerms[roleId] ?? []
}

export const getAuthContextCached = cache(getAuthContext)

