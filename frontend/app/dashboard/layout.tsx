import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { DashboardProviders } from "@/components/dashboard/Providers"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardProviders>
      <div className="flex min-h-screen bg-[#f8f9fa]">
        <Sidebar userRole={user.role} userName={user.name} />
        <div className="flex-1 flex flex-col min-h-screen lg:min-w-0">
          {/* Top Bar */}
          <header className="h-16 bg-white/80 backdrop-blur-md border-b border-border/30 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="lg:hidden w-10" /> {/* Spacer for mobile menu toggle */}
            <div className="hidden lg:block">
              <p className="text-sm text-muted-foreground font-body">
                Welcome back, <span className="font-semibold text-primary">{user.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold font-heading">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </DashboardProviders>
  )
}
