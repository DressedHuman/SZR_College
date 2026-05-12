"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { getToken, removeToken } from "@/lib/auth"
import { getCurrentUser, User } from "@/lib/api"

export function Navbar({ collegeName }: { collegeName?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [user, setUser] = React.useState<User | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    const token = getToken()
    if (token) {
      getCurrentUser(token)
        .then(setUser)
        .catch(() => setUser(null))
    } else {
      setUser(null)
    }
  }, [pathname])

  const handleLogout = () => {
    removeToken()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Departments", href: "/departments" },
    { name: "Teachers", href: "/teachers" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md shadow-sm">
      <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-xl font-bold tracking-tighter text-primary">
          {collegeName ?? "Shahid Ziaur Rahman College"}
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "font-heading text-sm tracking-tight transition-colors",
                isActive
                  ? "font-bold text-primary border-b-2 border-secondary pb-1"
                  : "font-medium text-muted-foreground hover:text-primary"
              )}
            >
              {link.name}
            </Link>
          )})}
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link href="/admin">
                  <Button variant="outline" className="px-4 py-2 font-semibold text-sm">
                    Admin Panel
                  </Button>
                </Link>
              )}
              <Link href="/dashboard">
                <Button variant="primary" className="px-5 py-2.5 font-semibold">
                  Dashboard
                </Button>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-accent"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="primary" className="px-5 py-2.5 font-semibold">
                Student Portal
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border px-8 py-4 flex flex-col gap-4 shadow-lg absolute w-full left-0 top-[100%]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "font-heading text-sm tracking-tight transition-colors py-2",
                isActive
                  ? "font-bold text-primary border-l-4 border-secondary pl-3 -ml-4"
                  : "font-medium text-muted-foreground hover:text-primary"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          )})}
          <div className="pt-4 border-t border-border space-y-3">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full font-semibold">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full font-semibold">
                    Dashboard
                  </Button>
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left text-sm font-semibold text-destructive py-2 font-body flex items-center gap-2"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full font-semibold">
                  Student Portal
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
