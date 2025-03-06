import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/site-header"
import { MobileNavigation } from "@/components/mobile-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blissful Life - Spiritual Wisdom & Teachings",
  description:
    "Discover the wisdom of Hindu philosophy and the teachings of Sanatan Dharma. Explore sacred texts, meditation guides, and spiritual practices.",
  keywords: [
    "spirituality",
    "hindu philosophy",
    "sanatan dharma",
    "meditation",
    "spiritual teachings",
    "temples",
    "religious places",
  ],
  authors: [{ name: "Blissful Life Team" }],
  creator: "Blissful Life",
  publisher: "Blissful Life",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blissfullife.org",
    title: "Blissful Life - Spiritual Wisdom & Teachings",
    description: "Discover the wisdom of Hindu philosophy and the teachings of Sanatan Dharma.",
    siteName: "Blissful Life",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blissful Life - Spiritual Wisdom & Teachings",
    description: "Discover the wisdom of Hindu philosophy and the teachings of Sanatan Dharma.",
    creator: "@blissfullife",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#F59E0B",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        <MobileNavigation />
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'