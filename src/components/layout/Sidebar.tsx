"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, LayoutDashboard, Users, Settings, ArrowUpRight, Receipt, Activity } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { signOut } from "next-auth/react"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const adminNav = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Admin Setup", href: "/dashboard/admin", icon: Settings },
]

const clientNav = [
  { name: "My Portal", href: "/dashboard/client", icon: LayoutDashboard },
  { name: "Billing", href: "/dashboard/client/billing", icon: Receipt },
]

export function Sidebar({ role }: { role: "admin" | "client" }) {
  const pathname = usePathname()
  
  const navItems = role === "admin" ? adminNav : clientNav

  return (
    <aside className="w-72 flex-shrink-0 p-6 flex flex-col min-h-screen">
      <div className="flex items-center gap-3 px-4 mb-12">
        <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center shadow-sm">
          <div className="h-3 w-3 bg-background rounded-sm" />
        </div>
        <span className="font-semibold text-lg tracking-tight">Strata.</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isActive 
                  ? "bg-black/5 dark:bg-white/10 text-foreground font-medium" 
                  : "text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                <span>{item.name}</span>
              </div>
              {isActive && (
                <div className="h-6 w-6 rounded-full bg-white dark:bg-[#FAFAFA] shadow-sm flex items-center justify-center">
                  {/* Fixed text-black so arrow is always visible on the white circle */}
                  <ArrowUpRight size={12} className="text-[#0A0A0A]" />
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-8">
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-muted hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors duration-300"
        >
          <LogOut size={18} strokeWidth={1.5} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
