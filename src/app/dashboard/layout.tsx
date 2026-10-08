import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  FolderOpen,
  Users,
  MessageSquare,
  Headphones,
  Settings,
  Menu,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Application", href: "/dashboard/application", icon: FileText },
  { name: "Payment", href: "/dashboard/payment", icon: CreditCard },
  { name: "Onboarding", href: "/dashboard/onboarding", icon: FolderOpen },
  { name: "Assets", href: "/dashboard/onboarding/assets", icon: FolderOpen },
  { name: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Support", href: "/dashboard/support", icon: Headphones },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link href="/dashboard" className="font-bold text-xl">
            DBI
          </Link>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex w-64 flex-col border-r bg-muted/30">
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t p-4">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <ChevronDown className="mr-2 h-4 w-4" />
              Account
            </Button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
