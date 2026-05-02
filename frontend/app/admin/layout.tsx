import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { DashboardProviders } from "@/components/dashboard/Providers"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  console.log("Admin Layout Check - Role:", user.role);

  if (String(user.role).toLowerCase() !== "admin") {
    console.log("Not an admin, redirecting to dashboard...");
    redirect("/dashboard")
  }

  return (
    <DashboardProviders>
      <div className="flex min-h-screen bg-[#f0f2f5]">
        <AdminSidebar userName={user.name} />
        <div className="flex-1 flex flex-col min-h-screen lg:min-w-0">
          {/* Top Bar */}
          <header className="h-16 bg-white/80 backdrop-blur-md border-b border-border/30 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="lg:hidden w-10" />
            <div className="hidden lg:block">
              <p className="text-sm text-muted-foreground font-body">
                Admin Panel — <span className="font-semibold text-primary">{user.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#001e40] to-[#003366] flex items-center justify-center text-white text-sm font-bold font-heading">
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
