"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <AlertTriangle className="h-16 w-16 text-amber-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            We apologize for the inconvenience. The application has encountered a critical error.
          </p>
          <div className="flex gap-4">
            <Button onClick={reset} className="bg-amber-600 hover:bg-amber-700">
              Try again
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Go to homepage
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}

