"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Sign out and redirect to home page after a short delay
    const handleSignOut = async () => {
      await signOut({ redirect: false })
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }

    handleSignOut()
  }, [router])

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
            <CardTitle className="text-2xl font-bold">Signing Out</CardTitle>
            <CardDescription>You are being signed out of your account</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

