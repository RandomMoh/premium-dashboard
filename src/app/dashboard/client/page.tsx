"use client"

import { Activity, CreditCard, Package } from "lucide-react"

export default function ClientPortal() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      <div>
        <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
          Client Portal
        </div>
        <h2 className="text-4xl font-medium tracking-tight">Welcome back, Acme.</h2>
        <p className="text-muted mt-2 text-sm">Here is a summary of your active services and current usage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="double-bezel-outer">
          <div className="double-bezel-inner bg-transparent p-6 flex flex-col justify-between h-40">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted">Active Plan</h3>
              <Package size={16} className="text-foreground" />
            </div>
            <div>
              <p className="text-2xl font-medium">Enterprise</p>
              <p className="text-xs text-muted mt-1">Renews in 14 days</p>
            </div>
          </div>
        </div>

        <div className="double-bezel-outer">
          <div className="double-bezel-inner bg-transparent p-6 flex flex-col justify-between h-40">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted">Usage Limit</h3>
              <Activity size={16} className="text-foreground" />
            </div>
            <div>
              <p className="text-2xl font-medium">84%</p>
              <div className="w-full bg-border h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-foreground h-full rounded-full w-[84%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="double-bezel-outer">
          <div className="double-bezel-inner bg-transparent p-6 flex flex-col justify-between h-40">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted">Last Invoice</h3>
              <CreditCard size={16} className="text-foreground" />
            </div>
            <div>
              <p className="text-2xl font-medium">$1,250</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">Paid • Oct 1st</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 double-bezel-outer">
        <div className="double-bezel-inner bg-transparent p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
          <div className="h-12 w-12 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center mb-4">
            <Activity size={20} className="text-muted" />
          </div>
          <h3 className="font-medium text-lg text-foreground mb-2">No active alerts</h3>
          <p className="text-muted text-sm max-w-sm">
            Your systems are operating perfectly. Any notifications regarding your infrastructure will appear here.
          </p>
        </div>
      </div>
    </div>
  )
}
