import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-b from-amber-50 to-white">
      <FileQuestion className="h-24 w-24 text-amber-600 mb-6" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button className="bg-amber-600 hover:bg-amber-700">Go to Homepage</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline">Contact Support</Button>
        </Link>
      </div>
    </div>
  )
}

