"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, ChevronDown, User, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  isLoggedIn?: boolean
  userInitials?: string
  userImage?: string
  notificationCount?: number
}

function SiteHeader({ isLoggedIn = false, userInitials = "U", userImage, notificationCount = 0 }: SiteHeaderProps) {
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b h-16" : "bg-white/70 backdrop-blur-sm h-20",
      )}
    >
      <div className="container flex h-full items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Link href="/" className="flex items-center">
            <svg
              className={cn("transition-all duration-300", isScrolled ? "h-8 w-auto" : "h-10 w-auto")}
              viewBox="0 0 3136.66 741.2"
              fill="currentColor"
            >
              <path d="M665.42,235.75c-2.1,0-4.3.5-6.2,1.5-1.1.6-2.3,1.2-3.5,1.6-4.2.9-5.7,4-6,7.7-.5,5.8,1.7,11,5.4,15.4.8.9,2,1.6,3.2,1.9,2.2.4,4.4.7,6.6.7,8.1.4,14.9-5.8,15.4-13.8h0c.4-8-6.1-14.8-15-14.9l.1-.1ZM216.62,661.05c7,0,13-4.8,14.5-11.6,1.3-6.9-2.5-13.7-9-16.2-2.5-1-5.1-1.8-7.7-2.5-3.2-.8-6.2.3-7.5,2.9-1.6,3.4-3.4,7-4.1,10.6-1.8,9.5,5.7,17.1,13.8,16.7v.1ZM262.92,80.65c7.9.3,14.5-6.7,14.6-14.1,0-8-6.3-14.5-14.3-14.6-8,0-14.5,6.3-14.6,14.3h0c-.1,7.5,6.5,14.6,14.2,14.4h.1ZM50.92,462.35c0,7.9,6.4,14.4,14.4,14.4s14.4-6.4,14.4-14.4-6.4-14.4-14.4-14.4h-.1c-7.9,0-14.3,6.4-14.3,14.3h0v.1ZM629.62,528.55c-.3,6.6,5,14,14.3,14.2,7.9,0,14.2-6.5,14.2-14.4s-6.5-14.2-14.4-14.2c-8.7.2-14.5,7.1-14.2,14.3h0l.1.1ZM69.82,224.55c-.1,7.7,6.1,14.1,13.8,14.2h.5c7.9,0,14.3-6.6,14.2-14.5s-6.6-14.3-14.5-14.2c-7.8,0-14.1,6.4-14,14.2v.3ZM455.92,688.95c1.8-.9,3.4-1.7,5-2.5,2-1,3.7-2.5,5-4.3,3.4-4.5,3.8-10.5.9-15.4-2.5-5-7.9-8-13.5-7.5-6.7.3-12.1,5.4-13,12-1.1,7.3,2,12.8,9,15.5,2,.8,4.2,1.3,6.6,2.1v.1ZM515.82,76.65c0-7.9-5.5-14.2-14.4-14-9.7.2-14.2,7.5-14.1,14.4,0,7.7,6.1,14,13.8,14h.6c8.2,0,14.1-6.1,14-14.4h.1ZM638.72,581.05v-.3h-.3c0,.1.3.3.3.3Z" />
              <path d="M423.12,360.75c2.4-1.8,4.2-3.3,6.2-4.7,27.8-19.5,59.2-33.5,92.3-41,12.6-2.8,25.5-4.6,38.4-5.4,11.3-.8,22.7-.8,34,0,21.7,1.7,43.1,6,63.8,12.7,30.7,9.9,58.2,25.4,83.4,45.4.9.8,1.7,1.6,2.5,2.5-.4,2.1-1.9,2.9-3.1,3.9-5.7,4.4-11.4,8.8-17.3,12.9-28.6,19.8-61.1,33.4-95.2,40-15.7,3.2-31.6,5-47.6,5.5-39.7,1-79-7.8-114.5-25.4-13.8-6.8-27-14.6-39.6-23.5-.9-.6-1.8-1.3-2.8-1.9-.4-.1-.9-.2-1.4-.3-1.6,1.2-3.6,2.6-5.4,4.1-2.9,2.5-4,7.9-2.5,11.5.6,1.4,1.7,2.4,3.2,2.7,1.7.5,3.4.9,5.1,1.1,23.6,4.1,46.6,11.4,68.4,21.5,30.5,14.5,56.6,34.6,79,59.8,26.4,29.6,45.4,63.2,56.2,101.5,3.8,13.5,6.5,27.4,8.2,41.3,.2,2.1,.7,4.1,.9,6.2s-.8,3-2.8,2.8c-7.1-.9-14.3-1.8-21.4-2.9-14.7-2.2-29.1-6-43-11.4-57.3-22-103-58.1-134.6-111.1-14.1-23.6-23.6-49.3-29.5-76.1-1.1-5.1-2-10.3-2.8-15.5-.1-1.7-1.4-3-3-3.2-1.4-.3-2.8-.5-4.3-.7-2.6-.5-5.2.4-7,2.3-1.2,1.3-2.4,2.6-3.5,4-.6.8-1.1,1.7-1.5,2.6.7,1.1,1.4,2.2,2.1,3.2,22.1,30.2,37.3,64.8,44.6,101.4,4.2,20.5,5.6,41.5,4.4,62.5-2.2,36.5-11.7,72.2-28.1,104.8-7.7,15.3-17.1,29.7-27.8,43-1,1.3-2.1,2.4-3.3,3.5-1.1,1.1-2.8,1.1-4,.2-.5-.4-1-.8-1.5-1.2-4.8-5.3-10-10.4-13.4-16.8-.8-1.5-1.8-3-2.8-4.5-17.9-27.6-30.4-58.2-37.1-90.4-3.8-19.1-5.6-38.6-5.4-58.1.3-31.3,7.1-61.1,18.8-90,5.8-14.4,13-28.2,21.3-41.3,2.5-3.9,5.4-7.6,8-11.4,3.6-5.2,3.5-5.9-.8-10.7-2.6-3-5.6-4-9.4-3-.8.2-1.6.3-2.4.4-2.7.6-3.1,.9-3.5,3.8-2.6,19.3-8,37.8-15.1,55.9-.9,2.2-1.8,4.5-2.7,6.7-3.6,8.7-7.8,17.2-12.5,25.3-19.7,34.7-46.4,63-79.3,85.3-28.3,19.2-60,32.6-93.4,39.7-5.6,1.2-11.3,2.1-17,2.9-4.3,.6-8.7,.7-13.1,.2-1.2-1-.8-2-.7-2.9,1.2-12.2,3.3-24.3,6.2-36.3,2.4-10.8,5.8-21.3,10.2-31.4,1.3-3.1,2.7-6.2,3.9-9.3,8.7-22.4,21.3-42.5,36.5-61.1,38.2-46.9,87-76.4,146-89.2,4.7-1,9.4-1.8,14.1-2.6,2-.3,3.2-1.2,3.6-3.2,0-.5.2-.9.3-1.4.9-6.9.8-8-5.6-13-1.2-1.1-3.1-1.2-4.5-.3-1.5.9-3,1.8-4.5,2.8-19.6,13.3-40.7,24.3-62.9,32.6-18.6,6.9-38,11.5-57.7,13.7-15.1,1.6-30.4,1.8-45.5,.5-37-3.1-71.7-14-104.8-30.5-14.2-7.1-27.4-16-39.3-26.4-5.1-4.4-5.1-4.8,0-8.9,27.3-21.4,57.4-37.6,90.9-47.2,14.4-4.1,29.2-6.9,44.2-8.4,16.4-1.6,32.9-1.8,49.4-.6,33.6,2.5,66.3,12,96,27.9,9.9,5.2,19.5,11.1,28.7,17.4,1.7,1.2,3.3,2.5,4.9,3.8,1,.9,2.5,1,3.5,.3,1.1-.7,2.1-1.4,3.2-2.1,3.6-2.4,4.6-5.9,4.6-10,.1-2.5-1.5-4.8-3.9-5.5-1.7-.6-3.4-1-5.1-1.3-24.3-4.5-47.7-11.7-70.1-22.5-38.3-18.4-69.4-45.4-94.2-79.8-18.9-26.2-32.9-54.7-41.1-86-3.2-12.5-5.5-25.3-6.9-38.2,0-.8-.1-1.6-.1-2.4,0-2.9,1.2-4.1,4.2-3.9,4.6.4,9.2,1,13.8,1.7,21.1,3.3,41.6,8.7,61.2,17.2,54.1,23.5,96.5,60.3,125.5,111.9,12.7,22.6,21.1,46.8,26.5,72.2,.8,3.6,1.4,7.2,2.1,10.8,.2,1.2,.5,2.5,.9,3.7,.4,1.4,1.6,2.5,3.1,2.7,5.5,1.2,10.1-.6,13.8-4.8,2-2.3,2-3.8,.1-6.4-10.6-14.4-19.8-29.9-27.2-46.2-9.1-19.9-15.4-41-18.7-62.7-2.3-14.5-3.5-29.2-3.6-43.9,0-38.2,8.7-75.9,25.6-110.2,8.4-17.1,18.5-33.3,30-48.5,.9-1.3,1.9-2.5,3-3.7,2.3-2.4,3.6-2.3,6,.1,.7,.7,1.3,1.4,1.9,2.1,25,31.6,42.2,66.9,50.8,106.4,4.1,18.9,6.2,38.3,6.2,57.6,0,39-9.2,77.5-27,112.2-5.8,11.4-12.4,22.4-19.6,32.9-1.4,2.1-3,4.1-4.6,6.2,1.1,2.6,2.6,4.9,4.6,6.8,1,1,2.3,1.8,3.6,2.2,5.6,2,9.5,0,11-5.7,1.4-5.2,2.4-10.6,3.7-15.9,5.8-24.4,14.7-48,26.6-70.1,22.3-41,54.2-72.5,95-95.1,23.8-13.1,49.3-23.1,75.7-29.5,6.8-1.7,13.8-2.4,20.8-3.6l8-1.4c3.3-.6,3.9,.1,4.2,3.2,.6,5.7-.7,11.1-1.9,16.6-3.2,15-6.3,30-11.5,44.5-10.1,28.9-25.2,55.8-44.7,79.4-7.1,8.8-15,17.1-23.5,24.6-1.7,1.5-3.4,3-5,4.5-23.2,21.5-50.1,36.8-79.6,48-16.3,6.1-33.2,10.5-50.5,13.3-.8,.1-1.6,.2-2.4,.4-1,.2-1.7,1-1.9,2-.3,2.2-.6,4.4-.6,6.7-.1,2.6,1.1,5.1,3.2,6.6,1.8,1.3,3.6,2.4,5.7,3.8l.8,.2Z" />
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-amber-600 relative py-1",
                    isActive ? "text-amber-600" : "text-gray-600",
                  )}
                >
                  {item.name}
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={cn("rounded-full transition-all", "text-gray-600")}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <div className="flex items-center gap-2">
            <Link href="/about">
              <Button variant="ghost" className="text-gray-600">
                About
              </Button>
            </Link>
            <Link href="/donate">
              <Button variant="ghost" className="text-gray-600">
                Donate
              </Button>
            </Link>
          </div>

          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className={cn("rounded-full transition-all relative", "text-gray-600")}
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                )}
                <span className="sr-only">Notifications</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn("flex items-center gap-2 rounded-full pl-1 pr-3 transition-all", "text-gray-600")}
                  >
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src={userImage} />
                      <AvatarFallback className="bg-amber-100 text-amber-800 text-xs">{userInitials}</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 opacity-75" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-5">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/bookmarks" className="cursor-pointer">
                      Bookmarks
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="text-red-500 focus:text-red-500">
                    <Link href="/api/auth/signout" className="cursor-pointer">
                      Sign Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full transition-all text-gray-600">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-5">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/auth/login" className="cursor-pointer">
                    Sign In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/signup" className="cursor-pointer">
                    Create Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/about" className="cursor-pointer text-gray-500 text-sm">
                    About Bliss
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center gap-2">
          {/* Donate Button */}
          <Link href="/donate">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
              <DollarSign className="h-4 w-4 mr-1" />
              Donate
            </Button>
          </Link>

          {/* User Profile/Login */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0 h-8 w-8">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={userImage} />
                    <AvatarFallback className="bg-amber-100 text-amber-800 text-xs">{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="text-red-500 focus:text-red-500">
                  <Link href="/api/auth/signout" className="cursor-pointer">
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
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

export { SiteHeader }
export default SiteHeader

