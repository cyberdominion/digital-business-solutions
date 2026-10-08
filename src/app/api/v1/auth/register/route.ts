import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/client"
import { createSession, hashPassword } from "@/lib/auth"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = registerSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { message: "Validation failed", details: parsed.error.errors } },
      { status: 400 }
    )
  }

  const { name, email, password } = parsed.data

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json(
      { success: false, error: { message: "User already exists", code: "USER_EXISTS" } },
      { status: 409 }
    )
  }

  const hashedPassword = hashPassword(password)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "APPLICANT",
      emailVerified: new Date(),
    },
  })

  await prisma.auditLog.create({
    data: {
      action: "user.registered",
      resource: "user",
      resourceId: user.id,
      metadata: { email },
    },
  })

  const token = await createSession(user.id)

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
