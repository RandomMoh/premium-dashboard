"use client"

import { Bell, Search } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Header() {
  return (
    <header className="h-20 w-full flex items-center justify-between px-8 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="h-10 w-full rounded-full bg-black/5 dark:bg-white/5 border-none pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-black/10 dark:focus:ring-white/20 transition-all placeholder:text-muted"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="h-8 w-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-muted hover:text-foreground transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500 border-2 border-background"></span>
        </button>
        <div className="h-9 w-9 rounded-full overflow-hidden border border-border shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.pravatar.cc/150?u=strata" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  )
}
