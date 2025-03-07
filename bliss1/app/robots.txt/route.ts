import { NextResponse } from "next/server"

export function GET() {
  return new NextResponse(
    `# Allow all user agents
User-agent: *
Allow: /

# Sitemap
Sitemap: ${process.env.NEXTAUTH_URL}/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  )
}

