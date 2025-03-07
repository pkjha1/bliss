import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/auth/login",
    "/auth/signup",
    "/auth/error",
    "/api/webhook/clerk",
    "/api/religious-places",
    "/religious-places(.*)",
    "/places(.*)",
    "/temples(.*)",
    "/teachings(.*)",
    "/story(.*)",
    "/books(.*)",
    "/audiobooks(.*)",
  ],
  // Routes that can be accessed by authenticated users or visitors
  ignoredRoutes: ["/api/maps-key"],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

