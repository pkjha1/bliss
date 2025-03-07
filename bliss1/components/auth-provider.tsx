"use client"

import type React from "react"

import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
          card: "bg-background border border-border",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton: "bg-muted text-muted-foreground border border-border hover:bg-muted/80",
          dividerLine: "bg-border",
          dividerText: "text-muted-foreground",
          formFieldLabel: "text-foreground",
          formFieldInput: "bg-background text-foreground border border-input focus:border-ring focus:ring-ring",
          footerActionLink: "text-primary hover:text-primary/90",
          identityPreviewEditButton: "text-primary hover:text-primary/90",
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

