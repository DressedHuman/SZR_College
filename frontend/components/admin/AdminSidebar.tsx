"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { removeToken } from "@/lib/auth"
import {
  LayoutDashboard,
  Megaphone,
  GraduationCap,
  LogOut,
  Users,
  FileText,
  X,
  Menu,
  ChevronLeft,
  Image,
  Settings,
  Globe,
} from "lucide-react"

interface AdminSidebarProps {
  userName: string
}

const navLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Manage Notices", href: "/admin/notices", icon: FileText },
  { name: "Manage Students", href: "/admin/students", icon: Users },
  { name: "Manage Teachers", href: "/admin/teachers", icon: Users },
  { name: "Manage Results", href: "/admin/results", icon: GraduationCap },
  { name: "Site Content", href: "/admin/site-content", icon: Globe },
]

export function AdminSidebar({ userName }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleLogout = () => {
    removeToken()
    router.push("/")
    router.refresh()
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 pt-8 pb-6">
        <Link href="/" className="flex items-center gap-2 group">
          <ChevronLeft size={16} className="text-blue-300 group-hover:text-white transition-colors" />
          <span className="text-xs text-blue-300 group-hover:text-white transition-colors font-body">Back to Site</span>
        </Link>
        <div className="mt-6">
          <h2 className="text-lg font-heading font-bold text-white tracking-tight">Admin Panel</h2>
          <p className="text-xs text-blue-300 font-body">SZR College Management</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition-all group",
                isActive
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-blue-200 hover:bg-white/10 hover:text-white"
              )}
            >
              <link.icon
                size={18}
                className={cn(
                  "transition-colors flex-shrink-0",
                  isActive ? "text-white" : "text-blue-300 group-hover:text-white"
                )}
              />
              <span className="font-body">{link.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 pb-6 mt-auto space-y-2">
        <div className="px-4 py-3 bg-white/10 rounded-[12px]">
          <p className="text-sm font-bold text-white font-heading truncate">{userName}</p>
          <p className="text-xs text-blue-300 font-body">Administrator</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium text-blue-200 hover:bg-red-500/20 hover:text-red-300 transition-all w-full group"
        >
          <LogOut size={18} className="text-blue-300 group-hover:text-red-300 transition-colors" />
          <span className="font-body">Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-[60] p-2.5 bg-[#001e40]/90 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[260px] flex-shrink-0 bg-gradient-to-b from-[#001e40] to-[#00132b] border-r border-white/5 h-screen sticky top-0 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 z-[58] w-[280px] h-full bg-gradient-to-b from-[#001e40] to-[#00132b] border-r border-white/5 flex flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
