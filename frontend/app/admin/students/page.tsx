"use client"

import * as React from "react"
import { getToken } from "@/lib/auth"
import { adminGetStudents, adminDeleteStudent } from "@/lib/api"
import type { StudentProfile } from "@/lib/api"
import { Trash2, Users, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"

export default function AdminStudentsPage() {
  const { showToast } = useToast()
  const [students, setStudents] = React.useState<StudentProfile[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    loadStudents()
  }, [])

  async function loadStudents() {
    const token = getToken()
    if (!token) return
    try {
      const data = await adminGetStudents(token)
      setStudents(data)
    } catch (err) {
      console.error("Failed to load students:", err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this student record?")) return
    const token = getToken()
    if (!token) return
    try {
      await adminDeleteStudent(token, id)
      showToast("Student record deleted", "success")
      await loadStudents()
    } catch (err: any) {
      showToast(err.message || "Failed to delete", "error")
    }
  }

  const filtered = students.filter(s =>
    s.roll.toLowerCase().includes(search.toLowerCase()) ||
    s.department.toLowerCase().includes(search.toLowerCase()) ||
    s.registration_no.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Users size={20} className="text-primary" />
          <h1 className="text-2xl font-heading font-bold text-primary">Manage Students</h1>
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by roll, department..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border/30 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground font-body">Loading students...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground font-body">
            {search ? "No matching students." : "No students registered yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#d5e3ff]">
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Roll</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider hidden sm:table-cell">Registration</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Department</th>
                  <th className="text-right py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body">
                {filtered.map((student) => (
                  <tr key={student.id} className="border-b border-border/20 last:border-none hover:bg-accent/30 transition-colors">
                    <td className="py-3 px-4 text-primary font-medium">{student.roll}</td>
                    <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{student.registration_no}</td>
                    <td className="py-3 px-4 text-muted-foreground">{student.department}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end">
                        <button onClick={() => handleDelete(student.id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive">
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
