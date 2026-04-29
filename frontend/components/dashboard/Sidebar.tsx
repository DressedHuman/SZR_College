"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { removeToken } from "@/lib/auth"
import {
  LayoutDashboard,
  User,
  Megaphone,
  CalendarDays,
  GraduationCap,
  Settings,
  LogOut,
  Users,
  FileText,
  X,
  Menu,
  ChevronLeft,
} from "lucide-react"

interface SidebarProps {
  userRole: "admin" | "teacher" | "student"
  userName: string
}

const studentLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Academic Profile", href: "/dashboard/profile", icon: User },
  { name: "Notices", href: "/dashboard/notices", icon: Megaphone },
  { name: "Routine", href: "/dashboard/routine", icon: CalendarDays },
  { name: "Results", href: "/dashboard/results", icon: GraduationCap },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

const adminLinks = [
  { name: "Manage Users", href: "/dashboard/users", icon: Users },
  { name: "Manage Notices", href: "/dashboard/manage-notices", icon: FileText },
]

export function Sidebar({ userRole, userName }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleLogout = () => {
    removeToken()
    router.push("/")
    router.refresh()
  }

  const links = userRole === "admin"
    ? [...studentLinks.slice(0, 1), ...adminLinks, ...studentLinks.slice(1)]
    : studentLinks

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 pt-8 pb-6">
        <Link href="/" className="flex items-center gap-2 group">
          <ChevronLeft size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors font-body">Back to Site</span>
        </Link>
        <div className="mt-6">
          <h2 className="text-lg font-heading font-bold text-primary tracking-tight">SZRC Portal</h2>
          <p className="text-xs text-muted-foreground font-body">Academic Management</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition-all group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-primary"
              )}
            >
              <link.icon
                size={18}
                className={cn(
                  "transition-colors flex-shrink-0",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                )}
              />
              <span className="font-body">{link.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 pb-6 mt-auto space-y-2">
        <div className="px-4 py-3 bg-accent/60 rounded-[12px]">
          <p className="text-sm font-bold text-primary font-heading truncate">{userName}</p>
          <p className="text-xs text-muted-foreground font-body capitalize">{userRole}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all w-full group"
        >
          <LogOut size={18} className="text-muted-foreground group-hover:text-destructive transition-colors" />
          <span className="font-body">Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-[60] p-2.5 bg-background/90 backdrop-blur-sm border border-border rounded-xl shadow-sm"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[55]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[260px] flex-shrink-0 bg-[#f3f4f5] border-r border-border/40 h-screen sticky top-0 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 z-[58] w-[280px] h-full bg-[#f3f4f5] border-r border-border/40 flex flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
