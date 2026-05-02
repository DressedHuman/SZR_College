"use client"

import * as React from "react"
import { getToken } from "@/lib/auth"
import { getTeachers, adminDeleteTeacher } from "@/lib/api"
import type { Teacher } from "@/lib/api"
import { Trash2, Users, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"

export default function AdminTeachersPage() {
  const { showToast } = useToast()
  const [teachers, setTeachers] = React.useState<Teacher[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    loadTeachers()
  }, [])

  async function loadTeachers() {
    try {
      const data = await getTeachers()
      setTeachers(data)
    } catch (err) {
      console.error("Failed to load teachers:", err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this teacher record?")) return
    const token = getToken()
    if (!token) return
    try {
      await adminDeleteTeacher(token, id)
      showToast("Teacher record deleted", "success")
      await loadTeachers()
    } catch (err: any) {
      showToast(err.message || "Failed to delete", "error")
    }
  }

  const filtered = teachers.filter(t =>
    (t.user?.name || "").toLowerCase().includes(search.toLowerCase()) ||
    t.department.toLowerCase().includes(search.toLowerCase()) ||
    t.designation.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Users size={20} className="text-primary" />
          <h1 className="text-2xl font-heading font-bold text-primary">Manage Teachers</h1>
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, department..." className="pl-9" />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-border/30 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground font-body">Loading teachers...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground font-body">{search ? "No matching teachers." : "No teachers registered yet."}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#d5e3ff]">
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Department</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider hidden md:table-cell">Designation</th>
                  <th className="text-right py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body">
                {filtered.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-border/20 last:border-none hover:bg-accent/30 transition-colors">
                    <td className="py-3 px-4 text-primary font-medium">{teacher.user?.name || "—"}</td>
                    <td className="py-3 px-4 text-muted-foreground">{teacher.department}</td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{teacher.designation}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end">
                        <button onClick={() => handleDelete(teacher.id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
