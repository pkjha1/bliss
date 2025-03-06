"use client"

import type { ReactNode } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Admin content wrapper */}
      <div className="flex flex-col min-h-screen w-full">
        {/* Admin Header - Fixed at top */}
        <AdminHeader />

        {/* Main content area */}
        <div className="flex flex-1 pt-[64px]">
          {/* Main Content Area */}
          <main className="flex-1 p-4 md:p-6 max-w-[1600px] mx-auto w-full">{children}</main>
        </div>
      </div>
    </div>
  )
}

