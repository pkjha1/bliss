import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://blissfullife.org"

  // Get dynamic routes
  const books = await prisma.book.findMany({
    where: { status: "published" },
    select: { id: true, updatedAt: true },
  })

  const teachings = await prisma.teaching.findMany({
    where: { status: "published" },
    select: { id: true, updatedAt: true },
  })

  const stories = await prisma.story.findMany({
    where: { status: "published" },
    select: { id: true, updatedAt: true },
  })

  const religiousPlaces = await prisma.religiousPlace.findMany({
    select: { id: true, updatedAt: true },
  })

  // Static routes
  const staticRoutes = [
    { url: "", lastModified: new Date() },
    { url: "about", lastModified: new Date() },
    { url: "books", lastModified: new Date() },
    { url: "teachings", lastModified: new Date() },
    { url: "audiobooks", lastModified: new Date() },
    { url: "story", lastModified: new Date() },
    { url: "religious-places", lastModified: new Date() },
    { url: "donate", lastModified: new Date() },
    { url: "contact", lastModified: new Date() },
    { url: "privacy", lastModified: new Date() },
    { url: "terms", lastModified: new Date() },
  ]

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}/${route.url}</loc>
    <lastmod>${route.lastModified.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.url === "" ? "1.0" : "0.8"}</priority>
  </url>
  `,
    )
    .join("")}
  
  ${books
    .map(
      (book) => `
  <url>
    <loc>${baseUrl}/books/${book.id}</loc>
    <lastmod>${book.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  `,
    )
    .join("")}
  
  ${teachings
    .map(
      (teaching) => `
  <url>
    <loc>${baseUrl}/teachings/${teaching.id}</loc>
    <lastmod>${teaching.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  `,
    )
    .join("")}
  
  ${stories
    .map(
      (story) => `
  <url>
    <loc>${baseUrl}/story/${story.id}</loc>
    <lastmod>${story.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  `,
    )
    .join("")}
  
  ${religiousPlaces
    .map(
      (place) => `
  <url>
    <loc>${baseUrl}/religious-places/${place.id}</loc>
    <lastmod>${place.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

