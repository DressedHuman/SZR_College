import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Shield, Users, FileText, Calendar, BarChart3 } from "lucide-react"

export default async function AdminPage() {
  const user = await getSession()

  if (!user || user.role !== "admin") {
    redirect("/")
  }

  const stats = [
    { label: "Total Students", value: "1,240", icon: Users, color: "bg-blue-500" },
    { label: "Total Teachers", value: "120+", icon: Users, color: "bg-green-500" },
    { label: "Active Notices", value: "12", icon: FileText, color: "bg-amber-500" },
    { label: "Upcoming Events", value: "5", icon: Calendar, color: "bg-purple-500" },
  ]

  return (
    <main className="min-h-screen pt-28 pb-20 px-8 max-w-7xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary p-2 rounded-xl">
            <Shield className="text-primary-foreground" size={24} />
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-primary tracking-tight">
            Admin Panel
          </h1>
        </div>
        <p className="text-muted-foreground font-body">
          Welcome back, <span className="font-bold text-primary">{user.name}</span>. Manage your institution from here.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-2.5 rounded-xl`}>
                <stat.icon className="text-white" size={20} />
              </div>
              <BarChart3 className="text-muted-foreground/30" size={20} />
            </div>
            <p className="text-3xl font-heading font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-xl font-heading font-bold text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Add Notice", href: "#" },
              { label: "Add Teacher", href: "#" },
              { label: "Add Event", href: "#" },
              { label: "View Results", href: "#" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="bg-accent hover:bg-accent/80 rounded-xl p-4 text-center font-semibold text-primary text-sm font-body transition-colors"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-xl font-heading font-bold text-primary mb-4">System Status</h2>
          <div className="space-y-4">
            {[
              { label: "Database", status: "Operational" },
              { label: "API Server", status: "Operational" },
              { label: "File Storage", status: "Operational" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-muted-foreground font-body">{item.label}</span>
                <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
