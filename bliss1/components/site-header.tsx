"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserButton } from "@/components/user-button"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"

interface SiteHeaderProps {
  isLoggedIn?: boolean
  userInitials?: string
  userImage?: string
  notificationCount?: number
}

// function SiteHeader({ isLoggedIn = false, userInitials = "U", userImage, notificationCount = 0 }: SiteHeaderProps) {
export function SiteHeader({
  isLoggedIn = false,
  userInitials = "U",
  userImage,
  notificationCount = 0,
}: SiteHeaderProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Mock search data - in a real app, this would come from an API
  const mockSearchData = [
    { id: 1, title: "Introduction to Meditation", type: "teaching", url: "/teachings/meditation" },
    { id: 2, title: "Bhagavad Gita Explained", type: "book", url: "/books/bhagavad-gita" },
    { id: 3, title: "Varanasi: The Holy City", type: "place", url: "/religious-places/varanasi" },
    { id: 4, title: "Karma Yoga", type: "teaching", url: "/teachings/karma-yoga" },
    { id: 5, title: "Temples of South India", type: "place", url: "/religious-places/south-india" },
    { id: 6, title: "Meditation Techniques for Beginners", type: "teaching", url: "/teachings/meditation-beginners" },
    { id: 7, title: "Ramayana", type: "book", url: "/books/ramayana" },
    { id: 8, title: "Understanding Dharma", type: "teaching", url: "/teachings/dharma" },
  ]

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const results = mockSearchData.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length > 2) {
      handleSearch()
    } else {
      setSearchResults([])
    }
  }

  // Handle search submission
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // Close search
  const closeSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery("")
    setSearchResults([])
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mainNavItems = [
    { name: "Home", href: "/" },
    { name: "Books", href: "/books" },
    { name: "Teachings", href: "/teachings" },
    { name: "Audiobooks", href: "/audiobooks" },
    { name: "Stories", href: "/story" },
    { name: "Places", href: "/religious-places" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        // isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b h-16" : "bg-white/70 backdrop-blur-sm h-20",
      )}
    >
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link href="/auth/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                Sign In
              </Link>
              <Link href="/auth/signup" className={buttonVariants({ size: "sm" })}>
                Sign Up
              </Link>
            </SignedOut>
          </nav>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b shadow-md p-4 animate-in slide-in-from-top-5">
          <div className="container max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for books, teachings, places..."
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                autoFocus
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchSubmit}
              />
              {searchQuery && (
                <button
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setSearchQuery("")
                    setSearchResults([])
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span className="sr-only">Clear search</span>
                </button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
                onClick={closeSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {/* Search Results */}
            <div className="mt-4">
              {isSearching ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-                  border-b-2 border-amber-600"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Search Results</h3>
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={closeSearch}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          {result.type === "book" && (
                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-600"
                              >
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                              </svg>
                            </div>
                          )}
                          {result.type === "teaching" && (
                            <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-amber-600"
                              >
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                              </svg>
                            </div>
                          )}
                          {result.type === "place" && (
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-600"
                              >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{result.title}</h4>
                          <p className="text-xs text-gray-500 capitalize">{result.type}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : searchQuery.length > 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No results found for "{searchQuery}"</p>
                  <p className="text-sm text-gray-400 mt-2">Try different keywords or browse our categories</p>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  <p>Try searching for "meditation", "temples", or "bhagavad gita"</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setSearchQuery("meditation")
                        handleSearch()
                      }}
                      className="px-3 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors"
                    >
                      meditation
                    </button>
                    <button
                      onClick={() => {
                        setSearchQuery("temples")
                        handleSearch()
                      }}
                      className="px-3 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors"
                    >
                      temples
                    </button>
                    <button
                      onClick={() => {
                        setSearchQuery("bhagavad gita")
                        handleSearch()
                      }}
                      className="px-3 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors"
                    >
                      bhagavad gita
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default SiteHeader

