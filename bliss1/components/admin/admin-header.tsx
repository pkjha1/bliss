"use client"

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
import { Breadcrumb } from "@/components/admin/breadcrumb"
import { Menu, Bell, Search, User, LogOut, Settings, Home } from "lucide-react"
import { useSession } from "next-auth/react"

export function AdminHeader() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initialize sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarOpen")
    if (savedState !== null) {
      setIsSidebarOpen(savedState === "true")
    }
  }, [])

  // Toggle sidebar and dispatch event for sidebar component
  const toggleSidebar = () => {
    const newState = !isSidebarOpen
    setIsSidebarOpen(newState)
    localStorage.setItem("adminSidebarOpen", String(newState))

    // Dispatch custom event for sidebar component to listen to
    window.dispatchEvent(new CustomEvent("toggle-sidebar", { detail: { isOpen: newState } }))
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!session?.user?.name) return "U"
    return session.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 bg-white border-b ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="flex h-16 items-center px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/admin" className="flex items-center gap-2">
            <svg className="h-8 w-auto text-amber-600" viewBox="0 0 3136.66 741.2" fill="currentColor">
              <path d="M665.42,235.75c-2.1,0-4.3.5-6.2,1.5-1.1.6-2.3,1.2-3.5,1.6-4.2.9-5.7,4-6,7.7-.5,5.8,1.7,11,5.4,15.4.8.9,2,1.6,3.2,1.9,2.2.4,4.4.7,6.6.7,8.1.4,14.9-5.8,15.4-13.8h0c.4-8-6.1-14.8-15-14.9l.1-.1ZM216.62,661.05c7,0,13-4.8,14.5-11.6,1.3-6.9-2.5-13.7-9-16.2-2.5-1-5.1-1.8-7.7-2.5-3.2-.8-6.2.3-7.5,2.9-1.6,3.4-3.4,7-4.1,10.6-1.8,9.5,5.7,17.1,13.8,16.7v.1ZM262.92,80.65c7.9.3,14.5-6.7,14.6-14.1,0-8-6.3-14.5-14.3-14.6-8,0-14.5,6.3-14.6,14.3h0c-.1,7.5,6.5,14.6,14.2,14.4h.1ZM50.92,462.35c0,7.9,6.4,14.4,14.4,14.4s14.4-6.4,14.4-14.4-6.4-14.4-14.4-14.4h-.1c-7.9,0-14.3,6.4-14.3,14.3h0v.1ZM629.62,528.55c-.3,6.6,5,14,14.3,14.2,7.9,0,14.2-6.5,14.2-14.4s-6.5-14.2-14.4-14.2c-8.7.2-14.5,7.1-14.2,14.3h0l.1.1ZM69.82,224.55c-.1,7.7,6.1,14.1,13.8,14.2h.5c7.9,0,14.3-6.6,14.2-14.5s-6.6-14.3-14.5-14.2c-7.8,0-14.1,6.4-14,14.2v.3ZM455.92,688.95c1.8-.9,3.4-1.7,5-2.5,2-1,3.7-2.5,5-4.3,3.4-4.5,3.8-10.5.9-15.4-2.5-5-7.9-8-13.5-7.5-6.7.3-12.1,5.4-13,12-1.1,7.3,2,12.8,9,15.5,2,.8,4.2,1.3,6.6,2.1v.1ZM515.82,76.65c0-7.9-5.5-14.2-14.4-14-9.7.2-14.2,7.5-14.1,14.4,0,7.7,6.1,14,13.8,14h.6c8.2,0,14.1-6.1,14-14.4h.1ZM638.72,581.05v-.3h-.3c0,.1.3.3.3.3Z" />
              <path d="M423.12,360.75c2.4-1.8,4.2-3.3,6.2-4.7,27.8-19.5,59.2-33.5,92.3-41,12.6-2.8,25.5-4.6,38.4-5.4,11.3-.8,22.7-.8,34,0,21.7,1.7,43.1,6,63.8,12.7,30.7,9.9,58.2,25.4,83.4,45.4.9.8,1.7,1.6,2.5,2.5-.4,2.1-1.9,2.9-3.1,3.9-5.7,4.4-11.4,8.8-17.3,12.9-28.6,19.8-61.1,33.4-95.2,40-15.7,3.2-31.6,5-47.6,5.5-39.7,1-79-7.8-114.5-25.4-13.8-6.8-27-14.6-39.6-23.5-.9-.6-1.8-1.3-2.8-1.9-.4-.1-.9-.2-1.4-.3-1.6,1.2-3.6,2.6-5.4,4.1-2.9,2.5-4,7.9-2.5,11.5.6,1.4,1.7,2.4,3.2,2.7,1.7.5,3.4.9,5.1,1.1,23.6,4.1,46.6,11.4,68.4,21.5,30.5,14.5,56.6,34.6,79,59.8,26.4,29.6,45.4,63.2,56.2,101.5,3.8,13.5,6.5,27.4,8.2,41.3,.2,2.1,.7,4.1,.9,6.2s-.8,3-2.8,2.8c-7.1-.9-14.3-1.8-21.4-2.9-14.7-2.2-29.1-6-43-11.4-57.3-22-103-58.1-134.6-111.1-14.1-23.6-23.6-49.3-29.5-76.1-1.1-5.1-2-10.3-2.8-15.5-.1-1.7-1.4-3-3-3.2-1.4-.3-2.8-.5-4.3-.7-2.6-.5-5.2.4-7,2.3-1.2,1.3-2.4,2.6-3.5,4-.6.8-1.1,1.7-1.5,2.6.7,1.1,1.4,2.2,2.1,3.2,22.1,30.2,37.3,64.8,44.6,101.4,4.2,20.5,5.6,41.5,4.4,62.5-2.2,36.5-11.7,72.2-28.1,104.8-7.7,15.3-17.1,29.7-27.8,43-1,1.3-2.1,2.4-3.3,3.5-1.1,1.1-2.8,1.1-4,.2-.5-.4-1-.8-1.5-1.2-4.8-5.3-10-10.4-13.4-16.8-.8-1.5-1.8-3-2.8-4.5-17.9-27.6-30.4-58.2-37.1-90.4-3.8-19.1-5.6-38.6-5.4-58.1.3-31.3,7.1-61.1,18.8-90,5.8-14.4,13-28.2,21.3-41.3,2.5-3.9,5.4-7.6,8-11.4,3.6-5.2,3.5-5.9-.8-10.7-2.6-3-5.6-4-9.4-3-.8.2-1.6.3-2.4.4-2.7.6-3.1,.9-3.5,3.8-2.6,19.3-8,37.8-15.1,55.9-.9,2.2-1.8,4.5-2.7,6.7-3.6,8.7-7.8,17.2-12.5,25.3-19.7,34.7-46.4,63-79.3,85.3-28.3,19.2-60,32.6-93.4,39.7-5.6,1.2-11.3,2.1-17,2.9-4.3,.6-8.7,.7-13.1,.2-1.2-1-.8-2-.7-2.9,1.2-12.2,3.3-24.3,6.2-36.3,2.4-10.8,5.8-21.3,10.2-31.4,1.3-3.1,2.7-6.2,3.9-9.3,8.7-22.4,21.3-42.5,36.5-61.1,38.2-46.9,87-76.4,146-89.2,4.7-1,9.4-1.8,14.1-2.6,2-.3,3.2-1.2,3.6-3.2,0-.5.2-.9.3-1.4.9-6.9.8-8-5.6-13-1.2-1.1-3.1-1.2-4.5-.3-1.5.9-3,1.8-4.5,2.8-19.6,13.3-40.7,24.3-62.9,32.6-18.6,6.9-38,11.5-57.7,13.7-15.1,1.6-30.4,1.8-45.5,.5-37-3.1-71.7-14-104.8-30.5-14.2-7.1-27.4-16-39.3-26.4-5.1-4.4-5.1-4.8,0-8.9,27.3-21.4,57.4-37.6,90.9-47.2,14.4-4.1,29.2-6.9,44.2-8.4,16.4-1.6,32.9-1.8,49.4-.6,33.6,2.5,66.3,12,96,27.9,9.9,5.2,19.5,11.1,28.7,17.4,1.7,1.2,3.3,2.5,4.9,3.8,1,.9,2.5,1,3.5,.3,1.1-.7,2.1-1.4,3.2-2.1,3.6-2.4,4.6-5.9,4.6-10,.1-2.5-1.5-4.8-3.9-5.5-1.7-.6-3.4-1-5.1-1.3-24.3-4.5-47.7-11.7-70.1-22.5-38.3-18.4-69.4-45.4-94.2-79.8-18.9-26.2-32.9-54.7-41.1-86-3.2-12.5-5.5-25.3-6.9-38.2,0-.8-.1-1.6-.1-2.4,0-2.9,1.2-4.1,4.2-3.9,4.6.4,9.2,1,13.8,1.7,21.1,3.3,41.6,8.7,61.2,17.2,54.1,23.5,96.5,60.3,125.5,111.9,12.7,22.6,21.1,46.8,26.5,72.2,.8,3.6,1.4,7.2,2.1,10.8,.2,1.2,.5,2.5,.9,3.7,.4,1.4,1.6,2.5,3.1,2.7,5.5,1.2,10.1-.6,13.8-4.8,2-2.3,2-3.8,.1-6.4-10.6-14.4-19.8-29.9-27.2-46.2-9.1-19.9-15.4-41-18.7-62.7-2.3-14.5-3.5-29.2-3.6-43.9,0-38.2,8.7-75.9,25.6-110.2,8.4-17.1,18.5-33.3,30-48.5,.9-1.3,1.9-2.5,3-3.7,2.3-2.4,3.6-2.3,6,.1,.7,.7,1.3,1.4,1.9,2.1,25,31.6,42.2,66.9,50.8,106.4,4.1,18.9,6.2,38.3,6.2,57.6,0,39-9.2,77.5-27,112.2-5.8,11.4-12.4,22.4-19.6,32.9-1.4,2.1-3,4.1-4.6,6.2,1.1,2.6,2.6,4.9,4.6,6.8,1,1,2.3,1.8,3.6,2.2,5.6,2,9.5,0,11-5.7,1.4-5.2,2.4-10.6,3.7-15.9,5.8-24.4,14.7-48,26.6-70.1,22.3-41,54.2-72.5,95-95.1,23.8-13.1,49.3-23.1,75.7-29.5,6.8-1.7,13.8-2.4,20.8-3.6l8-1.4c3.3-.6,3.9,.1,4.2,3.2,.6,5.7-.7,11.1-1.9,16.6-3.2,15-6.3,30-11.5,44.5-10.1,28.9-25.2,55.8-44.7,79.4-7.1,8.8-15,17.1-23.5,24.6-1.7,1.5-3.4,3-5,4.5-23.2,21.5-50.1,36.8-79.6,48-16.3,6.1-33.2,10.5-50.5,13.3-.8,.1-1.6,.2-2.4,.4-1,.2-1.7,1-1.9,2-.3,2.2-.6,4.4-.6,6.7-.1,2.6,1.1,5.1,3.2,6.6,1.8,1.3,3.6,2.4,5.7,3.8l.8,.2Z" />
            </svg>
            <span className="font-bold text-lg hidden md:inline-block">Admin</span>
          </Link>
        </div>

        {/* Breadcrumb - Center */}
        <div className="flex-1 px-4">
          <Breadcrumb />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>

          <Link href="/" className="hidden md:block">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              <span>View Site</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-8 w-8 p-0" aria-label="User menu">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image || undefined} />
                  <AvatarFallback className="bg-amber-100 text-amber-800">{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/api/auth/signout" className="cursor-pointer text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

