"use client"

import { UserButton as ClerkUserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

export function UserButton() {
  const { theme } = useTheme()

  return (
    <ClerkUserButton
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          userButtonAvatarBox: "w-8 h-8",
          userButtonTrigger: "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        },
      }}
      afterSignOutUrl="/"
    />
  )
}

