import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { auth } from "@/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const role = session?.user?.role || "client"

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={role as "admin" | "client"} />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto px-12 pb-24">
          <div className="max-w-6xl mx-auto w-full pt-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
