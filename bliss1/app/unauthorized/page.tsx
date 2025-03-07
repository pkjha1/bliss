"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ShieldAlert, Home } from "lucide-react"

export default function UnauthorizedPage() {
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
              <ShieldAlert className="h-16 w-16 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this page. This area is restricted to administrators only.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center gap-4">
            <Link href="/">
              <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
                <Home className="h-4 w-4" />
                Go to Homepage
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

