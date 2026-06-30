"use client"

import { useState } from "react"
import { Save, ShieldCheck } from "lucide-react"

export default function AdminSetupPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  
  const [formData, setFormData] = useState({
    companyName: "Strata Enterprise",
    supportEmail: "support@strata.com",
    requireTwoFactor: true,
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }, 1000)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      
      {showToast && (
        <div className="fixed top-8 right-8 z-50 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-800 dark:text-green-400 px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg animate-in slide-in-from-top-4 duration-300">
          <ShieldCheck size={18} className="text-green-600 dark:text-green-400" />
          <span className="font-medium text-sm">Settings saved successfully</span>
        </div>
      )}

      <div>
        <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 mb-4">
          Admin Access Only
        </div>
        <h2 className="text-4xl font-medium tracking-tight">System Setup</h2>
        <p className="text-muted mt-2 max-w-xl text-sm leading-relaxed">
          These settings affect all clients on the platform. Any changes made here are global and take effect immediately.
        </p>
      </div>

      <div className="double-bezel-outer max-w-2xl">
        <form onSubmit={handleSave} className="double-bezel-inner bg-transparent p-8">
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Global Company Name</label>
              <input 
                type="text" 
                value={formData.companyName}
                onChange={e => setFormData({...formData, companyName: e.target.value})}
                className="w-full h-11 px-4 rounded-xl border border-border bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Support Contact Email</label>
              <input 
                type="email" 
                value={formData.supportEmail}
                onChange={e => setFormData({...formData, supportEmail: e.target.value})}
                className="w-full h-11 px-4 rounded-xl border border-border bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 transition-all shadow-sm"
              />
            </div>

            <div className="pt-4 border-t border-border">
              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <h4 className="font-medium text-sm text-foreground">Enforce 2FA</h4>
                  <p className="text-xs text-muted mt-1">Require all clients to use two-factor authentication</p>
                </div>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={formData.requireTwoFactor}
                    onChange={e => setFormData({...formData, requireTwoFactor: e.target.checked})}
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${formData.requireTwoFactor ? 'bg-foreground' : 'bg-border'}`}></div>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-background transition-transform ${formData.requireTwoFactor ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </div>
              </label>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-border flex justify-end">
            <button 
              type="submit" 
              disabled={isSaving}
              className="h-10 px-6 bg-foreground text-background rounded-full font-medium hover:scale-[0.98] transition-transform flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
