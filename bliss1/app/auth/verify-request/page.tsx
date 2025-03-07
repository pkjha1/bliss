"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"

export default function VerifyRequestPage() {
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
              <Mail className="h-16 w-16 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <CardDescription>
              A sign in link has been sent to your email address. Please check your inbox and click the link to sign in.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            <p>If you don't see the email, check your spam folder.</p>
            <p className="mt-2">The link will expire in 24 hours.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/auth/login">
              <Button className="bg-amber-600 hover:bg-amber-700">Return to Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

