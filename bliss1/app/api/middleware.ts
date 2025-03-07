import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function withErrorHandling(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      console.error("API Error:", error)
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
  }
}

