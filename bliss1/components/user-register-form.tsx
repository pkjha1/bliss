"use client"

import { SignUp } from "@clerk/nextjs"

export function UserRegisterForm() {
  return (
    <div className="mx-auto w-full max-w-md">
      <SignUp
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

