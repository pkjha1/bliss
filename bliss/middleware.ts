import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Check if the path starts with /admin
  if (pathname.startsWith("/admin")) {
    // If not logged in, redirect to login
    if (!token) {
      const url = new URL("/auth/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(pathname))
      return NextResponse.redirect(url)
    }

    // If not an admin, redirect to unauthorized page
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  // Check if the path starts with /dashboard
  if (pathname.startsWith("/dashboard")) {
    // If not logged in, redirect to login
    if (!token) {
      const url = new URL("/auth/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(pathname))
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}

