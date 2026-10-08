import { NextRequest, NextResponse } from "next/server"
import { ZodSchema } from "zod"

export type ApiHandler<T = unknown> = (
  req: NextRequest,
  context: { params?: Record<string, string | string[]> },
) => Promise<NextResponse<T>>

export interface ApiOptions {
  rateLimit?: {
    windowMs?: number
    max?: number
  }
}

export function jsonResponse<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ success: true, data } as ApiSuccess<T>, { status })
}

export function errorResponse(message: string, status = 400, code?: string): NextResponse {
  return NextResponse.json({ success: false, error: { message, code } } as ApiError, { status })
}

export interface ApiSuccess<T> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  error: {
    message: string
    code?: string
  }
}

export async function validateBody<T>(req: NextRequest, schema: ZodSchema<T>): Promise<T | null> {
  try {
    const body = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      return null
    }
    return result.data
  } catch {
    return null
  }
}

export function withErrorHandling(handler: ApiHandler): ApiHandler {
  return async (req, context) => {
    try {
      return await handler(req, context)
    } catch (error) {
      console.error("API Error:", error)
      if (error instanceof Error) {
        if (error.message.includes("unauthorized") || error.message.includes("Unauthorized")) {
          return errorResponse("Unauthorized", 401, "UNAUTHORIZED")
        }
        return errorResponse(error.message, 500, "INTERNAL_ERROR")
      }
      return errorResponse("Internal server error", 500, "INTERNAL_ERROR")
    }
  }
}
