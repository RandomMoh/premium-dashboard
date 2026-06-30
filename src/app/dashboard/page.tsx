"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 550 },
  { name: 'Apr', value: 450 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 650 },
  { name: 'Jul', value: 800 },
]

export default function DashboardOverview() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure theme is loaded before rendering chart colors
  useEffect(() => {
    setMounted(true)
  }, [])

  const strokeColor = mounted && resolvedTheme === "dark" ? "#FAFAFA" : "#111111"
  const gridColor = mounted && resolvedTheme === "dark" ? "#2A2A2A" : "#EAEAEA"
  const textColor = mounted && resolvedTheme === "dark" ? "#A1A1AA" : "#888888"

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-black/5 dark:bg-white/10 text-muted mb-4">
          Live Analytics
        </div>
        <h2 className="text-4xl font-medium tracking-tight">Overview</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 double-bezel-outer">
          <div className="double-bezel-inner p-8 h-96 flex flex-col bg-transparent">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-sm font-medium text-muted">Total Revenue</h3>
                <p className="text-3xl font-medium mt-1">$124,500</p>
              </div>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-full text-sm font-medium">
                <ArrowUpRight size={16} />
                <span>+12.5%</span>
              </div>
            </div>
            <div className="flex-1 w-full min-h-0">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--card)', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
                      cursor={{ stroke: gridColor, strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={strokeColor} 
                      strokeWidth={2} 
                      dot={false}
                      activeDot={{ r: 6, fill: strokeColor, stroke: resolvedTheme === 'dark' ? '#0A0A0A' : '#fff', strokeWidth: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="double-bezel-outer flex-1">
            <div className="double-bezel-inner p-6 h-full flex flex-col justify-between bg-transparent">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted">Active Users</h3>
                <div className="h-8 w-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center">
                  <Activity size={14} className="text-foreground" />
                </div>
              </div>
              <div>
                <p className="text-4xl font-medium">8,249</p>
                <div className="flex items-center gap-1 text-red-500 dark:text-red-400 mt-2 text-sm font-medium">
                  <ArrowDownRight size={14} />
                  <span>-2.4% this week</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="double-bezel-outer flex-1">
            <div className="double-bezel-inner p-6 h-full flex flex-col justify-between bg-transparent">
              <h3 className="text-sm font-medium text-muted">Conversion Rate</h3>
              <div>
                <p className="text-4xl font-medium text-foreground">4.2%</p>
                <p className="text-sm text-muted mt-2">Consistent with last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
