import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { getNotices } from "@/lib/api"
import { Megaphone, CalendarDays, GraduationCap, Clock, ArrowRight } from "lucide-react"

export default async function DashboardPage() {
  const user = await getSession()
  if (!user) redirect("/login")

  let notices: any[] = []
  try {
    const raw = await getNotices()
    notices = raw.slice(0, 3)
  } catch (err) {
    console.error("Failed to fetch notices for dashboard:", err)
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-[#001e40] to-[#003366] rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl lg:text-3xl font-heading font-extrabold tracking-tight mb-2">
            {user.name}
          </h1>
          <p className="text-blue-200 font-body text-sm">
            {user.role === "admin"
              ? "System Administrator"
              : user.role === "teacher"
              ? "Faculty Member"
              : "Student Portal"}
          </p>
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 -right-4 w-24 h-24 bg-white/5 rounded-full" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Attendance", value: "94%", color: "bg-green-50 text-green-700 border-green-100" },
          { label: "Credits", value: "104/144", color: "bg-blue-50 text-blue-700 border-blue-100" },
          { label: "Active Notices", value: String(notices.length), color: "bg-amber-50 text-amber-700 border-amber-100" },
          { label: "CGPA", value: "3.72", color: "bg-purple-50 text-purple-700 border-purple-100" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl p-5 border ${stat.color} transition-shadow hover:shadow-sm`}
          >
            <p className="text-2xl font-heading font-bold">{stat.value}</p>
            <p className="text-xs font-body mt-1 opacity-70">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Notices */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-border/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Megaphone size={18} className="text-primary" />
              <h2 className="text-lg font-heading font-bold text-primary">Latest Notices</h2>
            </div>
            <a href="/dashboard/notices" className="text-xs font-bold text-secondary flex items-center gap-1 font-body hover:underline">
              View All <ArrowRight size={12} />
            </a>
          </div>
          <div className="space-y-4">
            {notices.length > 0 ? (
              notices.map((notice, i) => (
                <div key={i} className="p-4 bg-[#f3f4f5] rounded-[12px] hover:bg-[#edeeef] transition-colors">
                  <h3 className="text-sm font-bold text-primary font-heading mb-1">{notice.title}</h3>
                  <p className="text-xs text-muted-foreground font-body line-clamp-2">{notice.content}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground font-body text-center py-8">No notices available.</p>
            )}
          </div>
        </div>

        {/* Today's Routine */}
        <div className="bg-white rounded-2xl p-6 border border-border/30">
          <div className="flex items-center gap-2 mb-6">
            <CalendarDays size={18} className="text-primary" />
            <h2 className="text-lg font-heading font-bold text-primary">Today's Routine</h2>
          </div>
          <div className="space-y-4">
            {[
              { subject: "Advanced Algorithms", teacher: "Dr. M. Rahman", time: "09:00 - 10:30" },
              { subject: "Network Security", teacher: "Prof. Sarah J.", time: "11:00 - 12:30" },
            ].map((cls, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-[#f3f4f5] rounded-[12px]">
                <div className="mt-0.5">
                  <Clock size={14} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-primary font-heading">{cls.subject}</p>
                  <p className="text-xs text-muted-foreground font-body">{cls.teacher}</p>
                </div>
                <span className="text-xs text-muted-foreground font-body whitespace-nowrap">{cls.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white rounded-2xl p-6 border border-border/30">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap size={18} className="text-primary" />
          <h2 className="text-lg font-heading font-bold text-primary">Recent Results</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#d5e3ff] rounded-lg">
                <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider first:rounded-l-lg last:rounded-r-lg">Subject</th>
                <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Grade</th>
                <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Credit</th>
                <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider first:rounded-l-lg last:rounded-r-lg">GPA</th>
              </tr>
            </thead>
            <tbody className="font-body">
              {[
                { subject: "Data Structures", grade: "A+", credit: "3.0", gpa: "4.00" },
                { subject: "Operating Systems", grade: "A", credit: "3.0", gpa: "3.75" },
                { subject: "Database Systems", grade: "A-", credit: "3.0", gpa: "3.50" },
              ].map((result, i) => (
                <tr key={i} className="border-b border-border/20 last:border-none">
                  <td className="py-3 px-4 text-primary font-medium">{result.subject}</td>
                  <td className="py-3 px-4 text-muted-foreground">{result.grade}</td>
                  <td className="py-3 px-4 text-muted-foreground">{result.credit}</td>
                  <td className="py-3 px-4 text-muted-foreground">{result.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
