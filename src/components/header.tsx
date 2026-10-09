"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "cn"
import { Menu, X, ArrowRight, LogOut, User, ChevronDown } from "lucide-react"

interface NavLink {
  href: string
  label: string
}

interface User {
  name?: string | null
  email: string
  image?: string | null
}

interface HeaderProps {
  user?: User | null
  onSignOut?: () => void
}

const navLinks: NavLink[] = [
  { href: "/campaign", label: "The Campaign" },
  { href: "/about", label: "About" },
  { href: "/campaign/how-it-works", label: "How It Works" },
  { href: "/campaign/faq", label: "FAQ" },
]

export function Header({ user, onSignOut }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false)
      }
    }

    if (isMobileMenuOpen || isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen, isProfileOpen])

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev)
  const toggleProfile = () => setIsProfileOpen((prev) => !prev)

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "U"

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gradient">
          <Image src="/logo.png" alt="Logo" width={55} height={55} />
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
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <div className="relative" ref={profileRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-muted/50 transition-smooth"
                  onClick={toggleProfile}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{initials}</span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{user.name ?? "Account"}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border/50 rounded-lg shadow-strong py-2 z-50 animation-fade-in">
                    <div className="px-4 py-2 border-b border-border/50">
                      <p className="text-sm font-medium">{user.name ?? "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      Settings
                    </Link>
                    <hr className="my-2 border-border/50" />
                    <button
                      onClick={() => {
                        onSignOut?.()
                        setIsProfileOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-destructive hover:bg-muted/50 transition-smooth"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="lg" className="transition-bounce hover:shadow-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3">
                <Link href="/apply">Start Application</Link>
              </Button>
            </>
          )}
        </nav>

        <div className="md:hidden">
          <Button
            ref={toggleRef}
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
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
        ref={menuRef}
        className={cn(
          "md:hidden border-t overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-6 py-4 space-y-3">
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
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg px-3 transition-smooth"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg px-3 transition-smooth"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    onSignOut?.()
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left py-3 text-sm text-destructive hover:bg-muted/50 rounded-lg px-3 transition-smooth"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg px-3 transition-smooth"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Button asChild size="lg" className="w-full transition-bounce hover:shadow-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3">
                  <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                    Start Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
