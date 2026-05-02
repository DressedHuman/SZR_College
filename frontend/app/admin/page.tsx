import { getSession, getSessionToken } from "@/lib/session"
import { redirect } from "next/navigation"
import { getNotices, getTeachers, adminGetStudents } from "@/lib/api"
import type { StudentProfile, Notice, Teacher } from "@/lib/api"
import { Shield, Users, FileText, GraduationCap, Megaphone, ArrowRight, Globe } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const user = await getSession()
  if (!user || user.role !== "admin") redirect("/login")

  const token = await getSessionToken()

  let notices: Notice[] = []
  let allStudents: StudentProfile[] = []
  let allTeachers: Teacher[] = []

  try {
    notices = await getNotices()
  } catch (err) {
    console.error("Failed to fetch notices:", err)
  }

  if (token) {
    try {
      allStudents = await adminGetStudents(token)
    } catch (err) {
      console.error("Failed to fetch students:", err)
    }
    try {
      allTeachers = await getTeachers()
    } catch (err) {
      console.error("Failed to fetch teachers:", err)
    }
  }

  return (
    <div className="space-y-8">
      {/* Admin Banner */}
      <div className="bg-gradient-to-br from-[#001e40] to-[#003366] rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Shield size={24} className="text-blue-200" />
            <h1 className="text-2xl lg:text-3xl font-heading font-extrabold tracking-tight">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-blue-200 font-body text-sm">
            Welcome back, <span className="font-semibold text-white">{user.name}</span>. Manage your institution from here.
          </p>
        </div>
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 -right-4 w-24 h-24 bg-white/5 rounded-full" />
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl p-5 border bg-blue-50 text-blue-700 border-blue-100 transition-shadow hover:shadow-sm">
          <p className="text-2xl font-heading font-bold">{allStudents.length}</p>
          <p className="text-xs font-body mt-1 opacity-70">Total Students</p>
        </div>
        <div className="rounded-2xl p-5 border bg-green-50 text-green-700 border-green-100 transition-shadow hover:shadow-sm">
          <p className="text-2xl font-heading font-bold">{allTeachers.length}</p>
          <p className="text-xs font-body mt-1 opacity-70">Total Teachers</p>
        </div>
        <div className="rounded-2xl p-5 border bg-amber-50 text-amber-700 border-amber-100 transition-shadow hover:shadow-sm">
          <p className="text-2xl font-heading font-bold">{notices.length}</p>
          <p className="text-xs font-body mt-1 opacity-70">Active Notices</p>
        </div>
        <div className="rounded-2xl p-5 border bg-purple-50 text-purple-700 border-purple-100 transition-shadow hover:shadow-sm">
          <p className="text-2xl font-heading font-bold">{allStudents.length + allTeachers.length}</p>
          <p className="text-xs font-body mt-1 opacity-70">Total Users</p>
        </div>
      </div>

      {/* Quick Actions + Recent Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-border/30">
          <h2 className="text-lg font-heading font-bold text-primary mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Manage Notices", href: "/admin/notices", icon: FileText },
              { label: "Manage Students", href: "/admin/students", icon: Users },
              { label: "Manage Teachers", href: "/admin/teachers", icon: Users },
              { label: "Manage Results", href: "/admin/results", icon: GraduationCap },
              { label: "Site Content", href: "/admin/site-content", icon: Globe },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 bg-[#f3f4f5] hover:bg-[#edeeef] rounded-[12px] p-4 transition-colors group"
              >
                <action.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-semibold text-primary font-body">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border/30">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Megaphone size={18} className="text-primary" />
              <h2 className="text-lg font-heading font-bold text-primary">Recent Notices</h2>
            </div>
            <Link href="/admin/notices" className="text-xs font-bold text-secondary flex items-center gap-1 font-body hover:underline">
              Manage <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {notices.length > 0 ? (
              notices.slice(0, 3).map((notice, i) => (
                <div key={notice.id || i} className="p-3 bg-[#f3f4f5] rounded-[12px]">
                  <p className="text-sm font-bold text-primary font-heading truncate">{notice.title}</p>
                  <p className="text-xs text-muted-foreground font-body truncate">{notice.content}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground font-body text-center py-6">No notices yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-2xl p-6 border border-border/30">
        <h2 className="text-lg font-heading font-bold text-primary mb-5">System Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Database", status: "Operational" },
            { label: "API Server", status: "Operational" },
            { label: "File Storage", status: "Operational" },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center p-4 bg-[#f3f4f5] rounded-[12px]">
              <span className="text-sm text-muted-foreground font-body">{item.label}</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
