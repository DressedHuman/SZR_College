"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const navLinks = [
    { name: "Home", href: "/", active: true },
    { name: "About", href: "/about" },
    { name: "Academic", href: "/academic" },
    { name: "Admissions", href: "/admissions" },
    { name: "Notice", href: "/notice" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md shadow-sm">
      <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-xl font-bold tracking-tighter text-primary">
          Shahid Ziaur Rahman College
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "font-heading text-sm tracking-tight transition-colors",
                link.active
                  ? "font-bold text-primary border-b-2 border-secondary pb-1"
                  : "font-medium text-muted-foreground hover:text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex">
          <Button variant="primary" className="px-5 py-2.5 font-semibold">
            Student Portal
          </Button>
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "font-heading text-sm tracking-tight transition-colors py-2",
                link.active
                  ? "font-bold text-primary border-l-4 border-secondary pl-3 -ml-4"
                  : "font-medium text-muted-foreground hover:text-primary"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border">
            <Button variant="primary" className="w-full font-semibold">
              Student Portal
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
