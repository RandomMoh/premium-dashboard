"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("admin@example.com")
  const [password, setPassword] = useState("admin")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    
    if (res?.ok) {
      router.push("/dashboard")
      router.refresh()
    } else {
      setIsLoading(false)
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <div className="absolute top-8 right-8 z-50">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md double-bezel-outer animate-in fade-in zoom-in-95 duration-700">
        <div className="double-bezel-inner p-10">
          <div className="text-center mb-8">
            <div className="h-10 w-10 bg-foreground rounded-full mx-auto mb-6 flex items-center justify-center shadow-md">
              <div className="h-4 w-4 bg-background rounded-full" />
            </div>
            <h1 className="text-2xl font-medium tracking-tight mb-2 text-foreground">Sign in to Strata</h1>
            <p className="text-sm text-muted">Welcome back. Please enter your details.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-border bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 transition-all shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-border bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 transition-all shadow-sm"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-11 bg-foreground text-background rounded-xl font-medium hover:scale-[0.98] transition-transform flex items-center justify-center mt-2 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted leading-relaxed">
              Template Demo Access:<br/>
              Admin: <strong>admin@example.com</strong> / <strong>admin</strong><br/>
              Client: <strong>client@example.com</strong> / <strong>client</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
