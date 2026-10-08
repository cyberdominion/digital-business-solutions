import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/db/client"

export const runtime = "nodejs"

const PUBLIC_ROUTES = [
  "/",
  "/campaign",
  "/campaign/eligibility",
  "/campaign/how-it-works",
  "/campaign/faq",
  "/apply",
  "/success",
  "/terms",
  "/privacy",
  "/contact",
  "/api/v1/auth",
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/logout",
  "/api/v1/webhooks/paystack",
]

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
]

const ADMIN_ROUTES_PREFIX = "/admin"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  const isAdminRoute = pathname.startsWith(ADMIN_ROUTES_PREFIX)

  if (isPublic || pathname.startsWith("/api/v1/webhooks")) {
    return NextResponse.next()
  }

  const token = request.cookies.get("dbi_session")?.value

  if (!token) {
    if (isAdminRoute) {
      const url = request.nextUrl.clone()
      url.pathname = "/login"
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone()
      url.pathname = "/login"
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }

  const session = await verifySession(token)
  if (!session) {
    if (isAdminRoute || pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone()
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  if (isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  if (isAdminRoute) {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    })

    const adminRoles = ["PLATFORM_OWNER", "PLATFORM_ADMIN", "PLATFORM_OPERATIONS", "PLATFORM_SUPPORT"]
    if (!user || !adminRoles.includes(user.role)) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

async function verifySession(token: string): Promise<{ userId: string } | null> {
  const session = await prisma.session.findUnique({
    where: { id: token },
    include: { user: true },
  })

  if (!session || session.expiresAt < new Date()) {
    return null
  }

  return { userId: session.userId }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
