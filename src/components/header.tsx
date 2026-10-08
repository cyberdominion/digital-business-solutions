"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "cn"
import { Menu, X, ArrowRight, Star } from "lucide-react"

interface NavLink {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: "/campaign", label: "The Campaign" },
  { href: "/about", label: "About" },
  { href: "/campaign/how-it-works", label: "How It Works" },
  { href: "/campaign/faq", label: "FAQ" },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-gradient">
          Digital Business Solutions
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="transition-bounce hover:shadow-glow">
            <Link href="/apply">Start Application</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-9 w-9 px-2 hover:bg-muted/50 transition-smooth"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden border-t overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg px-3 transition-smooth"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>{link.label}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
          <div className="pt-2 border-t space-y-2">
            <Link
              href="/login"
              className="block py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg px-3 transition-smooth"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Button asChild className="w-full transition-bounce hover:shadow-glow">
              <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                Start Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
