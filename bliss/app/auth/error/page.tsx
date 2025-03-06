"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  // Map error codes to user-friendly messages
  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "Configuration":
        return "There is a problem with the server configuration. Please contact support."
      case "AccessDenied":
        return "You do not have permission to sign in."
      case "Verification":
        return "The verification link may have expired or already been used."
      case "OAuthSignin":
      case "OAuthCallback":
      case "OAuthCreateAccount":
      case "EmailCreateAccount":
      case "Callback":
      case "OAuthAccountNotLinked":
      case "EmailSignin":
      case "CredentialsSignin":
        return "There was a problem with your sign in attempt. Please try again."
      case "SessionRequired":
        return "You must be signed in to access this page."
      default:
        return "An unexpected error occurred. Please try again."
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
            <CardDescription>{getErrorMessage(error)}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center gap-4">
            <Link href="/auth/login">
              <Button className="bg-amber-600 hover:bg-amber-700">Try Again</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Go to Homepage</Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

