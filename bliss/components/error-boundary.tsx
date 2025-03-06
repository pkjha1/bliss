"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Unhandled error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center">
      <AlertTriangle className="h-16 w-16 text-amber-600 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} className="bg-amber-600 hover:bg-amber-700">
          Try again
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go to homepage
        </Button>
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md text-left overflow-auto max-w-2xl w-full">
          <p className="text-red-500 font-mono text-sm">{error.message}</p>
          <p className="text-gray-500 font-mono text-xs mt-2">{error.stack}</p>
        </div>
      )}
    </div>
  )
}

