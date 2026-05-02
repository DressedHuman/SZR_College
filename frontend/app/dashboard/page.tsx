import { getSession, getSessionToken } from "@/lib/session"
import { redirect } from "next/navigation"
import { getNotices, getMyStudentProfile, getMyResults, getTeachers, adminGetStudents } from "@/lib/api"
import type { StudentProfile, Result, Notice, Teacher } from "@/lib/api"
import { Megaphone, CalendarDays, GraduationCap, Clock, ArrowRight, User, BookOpen, Shield, Users, FileText } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const user = await getSession()
  if (!user) redirect("/login")

  const token = await getSessionToken()

  let notices: Notice[] = []
  let studentProfile: StudentProfile | null = null
  let results: Result[] = []
  let allStudents: StudentProfile[] = []
  let allTeachers: Teacher[] = []

  try {
    notices = await getNotices()
  } catch (err) {
    console.error("Failed to fetch notices:", err)
  }

  if (token && user.role === "admin") {
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

  if (token && user.role === "student") {
    try {
      studentProfile = await getMyStudentProfile(token)
    } catch (err) {
      console.error("Failed to fetch student profile:", err)
    }

    try {
      results = await getMyResults(token)
    } catch (err) {
      console.error("Failed to fetch results:", err)
    }
  }

  // Convert marks to letter grade for display
  function getGrade(marks: number) {
    if (marks >= 80) return "A+"
    if (marks >= 75) return "A"
    if (marks >= 70) return "A-"
    if (marks >= 65) return "B+"
    if (marks >= 60) return "B"
    if (marks >= 55) return "B-"
    if (marks >= 50) return "C+"
    if (marks >= 45) return "C"
    if (marks >= 40) return "D"
    return "F"
  }

  function getGPA(marks: number) {
    if (marks >= 80) return "4.00"
    if (marks >= 75) return "3.75"
    if (marks >= 70) return "3.50"
    if (marks >= 65) return "3.25"
    if (marks >= 60) return "3.00"
    if (marks >= 55) return "2.75"
    if (marks >= 50) return "2.50"
    if (marks >= 45) return "2.25"
    if (marks >= 40) return "2.00"
    return "0.00"
  }

  const avgGPA = results.length > 0
    ? (results.reduce((sum, r) => sum + parseFloat(getGPA(r.marks)), 0) / results.length).toFixed(2)
    : "—"

  if (user.role === "admin") {
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
                { label: "Manage Notices", href: "/dashboard/manage-notices", icon: FileText },
                { label: "Manage Students", href: "/dashboard/manage-students", icon: Users },
                { label: "Manage Teachers", href: "/dashboard/manage-teachers", icon: Users },
                { label: "Manage Results", href: "/dashboard/manage-results", icon: GraduationCap },
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
              <Link href="/dashboard/manage-notices" className="text-xs font-bold text-secondary flex items-center gap-1 font-body hover:underline">
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

  return (
    <div className="space-y-8">
      {/* Welcome Banner with Profile Summary */}
      <div className="bg-gradient-to-br from-[#001e40] to-[#003366] rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-heading font-extrabold tracking-tight mb-1">
              {user.name}
            </h1>
            {studentProfile ? (
              <div className="space-y-1">
                <p className="text-blue-200 font-body text-sm">{studentProfile.department}</p>
                <div className="flex flex-wrap gap-4 mt-3">
                  <span className="text-xs bg-white/10 px-3 py-1.5 rounded-lg font-body">
                    Roll: {studentProfile.roll}
                  </span>
                  <span className="text-xs bg-white/10 px-3 py-1.5 rounded-lg font-body">
                    Reg: {studentProfile.registration_no}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-blue-200 font-body text-sm">
                {user.role === "teacher" ? "Faculty Member" : "Student Portal"}
              </p>
            )}
          </div>

          {/* Quick Stats in Banner */}
          {user.role === "student" && (
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 text-center min-w-[80px]">
                <p className="text-2xl font-heading font-bold">{avgGPA}</p>
                <p className="text-[10px] text-blue-200 font-body uppercase tracking-wider">CGPA</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 text-center min-w-[80px]">
                <p className="text-2xl font-heading font-bold">{results.length}</p>
                <p className="text-[10px] text-blue-200 font-body uppercase tracking-wider">Subjects</p>
              </div>
            </div>
          )}
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 -right-4 w-24 h-24 bg-white/5 rounded-full" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl p-5 border bg-green-50 text-green-700 border-green-100 transition-shadow hover:shadow-sm">
          <p className="text-2xl font-heading font-bold">94%</p>
          <p className="text-xs font-body mt-1 opacity-70">Attendance</p>
        </div>
        <div className="rounded-2xl p-5 border bg-blue-50 text-blue-700 border-blue-100 transition-shadow hover:shadow-sm">
          <p className="text-2xl font-heading font-bold">{results.length > 0 ? `${results.length * 3}` : "—"}</p>
          <p className="text-xs font-body mt-1 opacity-70">Credits Earned</p>
        </div>
        <div className="rounded-2xl p-5 border bg-amber-50 text-amber-700 border-amber-100 transition-shadow hover:shadow-sm">
          <p className="text-2xl font-heading font-bold">{notices.length}</p>
          <p className="text-xs font-body mt-1 opacity-70">Active Notices</p>
        </div>
        <div className="rounded-2xl p-5 border bg-purple-50 text-purple-700 border-purple-100 transition-shadow hover:shadow-sm">
          <p className="text-2xl font-heading font-bold">{avgGPA}</p>
          <p className="text-xs font-body mt-1 opacity-70">CGPA</p>
        </div>
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
              notices.slice(0, 5).map((notice, i) => {
                const date = new Date(notice.published_at)
                return (
                  <div key={notice.id || i} className="p-4 bg-[#f3f4f5] rounded-[12px] hover:bg-[#edeeef] transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-primary font-heading mb-1">{notice.title}</h3>
                        <p className="text-xs text-muted-foreground font-body line-clamp-2">{notice.content}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-body whitespace-nowrap bg-white px-2 py-1 rounded-md flex-shrink-0">
                        {date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-10">
                <Megaphone className="mx-auto text-muted-foreground/30 mb-3" size={32} />
                <p className="text-sm text-muted-foreground font-body">No notices available.</p>
              </div>
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
              { subject: "Advanced Algorithms", teacher: "Dr. M. Rahman", time: "09:00 – 10:30" },
              { subject: "Network Security", teacher: "Prof. Sarah J.", time: "11:00 – 12:30" },
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <GraduationCap size={18} className="text-primary" />
            <h2 className="text-lg font-heading font-bold text-primary">Recent Results</h2>
          </div>
          {results.length > 0 && (
            <a href="/dashboard/results" className="text-xs font-bold text-secondary flex items-center gap-1 font-body hover:underline">
              View All <ArrowRight size={12} />
            </a>
          )}
        </div>

        {results.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#d5e3ff]">
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider first:rounded-l-lg">Subject</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Marks</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Grade</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Exam</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider last:rounded-r-lg">GPA</th>
                </tr>
              </thead>
              <tbody className="font-body">
                {results.slice(0, 5).map((result) => (
                  <tr key={result.id} className="border-b border-border/20 last:border-none">
                    <td className="py-3 px-4 text-primary font-medium">{result.subject}</td>
                    <td className="py-3 px-4 text-muted-foreground">{result.marks}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        result.marks >= 80 ? "bg-green-100 text-green-700" :
                        result.marks >= 60 ? "bg-blue-100 text-blue-700" :
                        result.marks >= 40 ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {getGrade(result.marks)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground capitalize">{result.exam_type}</td>
                    <td className="py-3 px-4 text-muted-foreground font-medium">{getGPA(result.marks)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10">
            <BookOpen className="mx-auto text-muted-foreground/30 mb-3" size={32} />
            <p className="text-sm text-muted-foreground font-body">No results published yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
