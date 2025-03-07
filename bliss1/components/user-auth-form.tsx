"use client"

import { SignIn } from "@clerk/nextjs"

export function UserAuthForm() {
  return (
    <div className="mx-auto w-full max-w-md">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
            card: "bg-background border border-border shadow-sm",
          },
        }}
      />
    </div>
  )
}

