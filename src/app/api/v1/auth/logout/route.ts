import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/client"

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie")
  const token = cookieHeader
    ?.split("dbi_session=")
    .pop()
    ?.split(";")[0]

  if (token) {
    await prisma.session.delete({ where: { id: token } }).catch(() => {})
  }

  const response = NextResponse.json({
    success: true,
    data: { message: "Logged out" },
  })

  response.cookies.delete("dbi_session")

  return response
}
