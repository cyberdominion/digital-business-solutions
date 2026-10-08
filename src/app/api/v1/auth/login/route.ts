import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/client"
import { createSession } from "@/lib/auth"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = loginSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { message: "Validation failed" } },
      { status: 400 }
    )
  }

  const { email, password } = parsed.data

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || !user.password) {
    return NextResponse.json(
      { success: false, error: { message: "Invalid credentials" } },
      { status: 401 }
    )
  }

  const { verifyPassword } = await import("@/lib/auth")
  const valid = await verifyPassword(password, user.password)

  if (!valid) {
    return NextResponse.json(
      { success: false, error: { message: "Invalid credentials" } },
      { status: 401 }
    )
  }

  const token = await createSession(user.id)

  await prisma.auditLog.create({
    data: {
      action: "user.login",
      resource: "user",
      resourceId: user.id,
      metadata: { email },
    },
  })

  const response = NextResponse.json({
    success: true,
    data: { user: { id: user.id, name: user.name, email: user.email, role: user.role } },
  })

  response.cookies.set("dbi_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  })

  return response
}
