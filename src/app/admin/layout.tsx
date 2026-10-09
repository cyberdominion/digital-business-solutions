"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { AIAdminAssistant } from "@/components/ai-admin-assistant"
import { cn } from "cn"
import { useState, useEffect, useRef } from "react"
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  FolderOpen,
  Users,
  BarChart3,
  Globe,
  Settings,
  Shield,
  Menu,
  X,
  Bot,
  Sparkles,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Applications", href: "/admin/applications", icon: FileText },
  { name: "Businesses", href: "/admin/businesses", icon: Users },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Onboarding", href: "/admin/onboarding", icon: FolderOpen },
  { name: "Referrals", href: "/admin/referrals", icon: Users },
  { name: "Campaign", href: "/admin/campaign", icon: BarChart3 },
  { name: "Domains", href: "/admin/domains", icon: Globe },
  { name: "Modules", href: "/admin/modules", icon: Settings },
  { name: "Tasks", href: "/admin/tasks", icon: FileText },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Audit Logs", href: "/admin/audit-logs", icon: Shield },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

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
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              ref={toggleRef}
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <Link href="/admin" className="flex items-center gap-3 font-bold text-xl text-gradient">
              <Image src="/logo.png" alt="Logo" width={28} height={28} className="rounded" />
              DBI Admin
            </Link>
          </div>
          <nav className="flex items-center gap-2">
            <AIAdminAssistant />
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </header>

      <div
        ref={menuRef}
        className={cn(
          "md:hidden border-t overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg px-3 transition-smooth"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="h-4 w-4 text-primary" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex w-64 flex-col border-r bg-gradient-to-b from-muted/30 via-background to-muted/30">
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent-purple/10 hover:text-foreground transition-smooth"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      <WhatsAppButton />
    </div>
  )
}
