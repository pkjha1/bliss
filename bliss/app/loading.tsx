import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="h-12 w-12 text-amber-600 animate-spin mb-4" />
      <p className="text-gray-600">Loading...</p>
    </div>
  )
}

