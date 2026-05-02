"use client"

import * as React from "react"
import { getToken } from "@/lib/auth"
import { adminGetStudents, adminDeleteStudent, adminCreateStudent, adminUpdateStudent } from "@/lib/api"
import type { StudentProfile } from "@/lib/api"
import { Trash2, Users, Search, Plus, Edit2, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"

export default function AdminStudentsPage() {
  const { showToast } = useToast()
  const [students, setStudents] = React.useState<StudentProfile[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [editingStudent, setEditingStudent] = React.useState<StudentProfile | null>(null)
  const [formLoading, setFormLoading] = React.useState(false)
  
  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    roll: "",
    registration_no: "",
    department: ""
  })

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

  function handleOpenCreate() {
    setEditingStudent(null)
    setFormData({
      name: "",
      email: "",
      password: "",
      roll: "",
      registration_no: "",
      department: ""
    })
    setIsModalOpen(true)
  }

  function handleOpenEdit(student: StudentProfile) {
    setEditingStudent(student)
    setFormData({
      name: student.user?.name || "",
      email: student.user?.email || "",
      password: "", // Don't show password
      roll: student.roll,
      registration_no: student.registration_no,
      department: student.department
    })
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const token = getToken()
    if (!token) return

    setFormLoading(true)
    try {
      if (editingStudent) {
        // Only update student profile fields for now in this view
        // The backend PUT /students/{id} currently expects StudentCreate (roll, reg, dept, user_id)
        await adminUpdateStudent(token, editingStudent.id, {
          roll: formData.roll,
          registration_no: formData.registration_no,
          department: formData.department,
          user_id: editingStudent.user_id
        })
        showToast("Student record updated", "success")
      } else {
        await adminCreateStudent(token, formData)
        showToast("Student created successfully", "success")
      }
      setIsModalOpen(false)
      await loadStudents()
    } catch (err: any) {
      showToast(err.message || "Failed to save", "error")
    } finally {
      setFormLoading(false)
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
    s.registration_no.toLowerCase().includes(search.toLowerCase()) ||
    (s.user?.name || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-primary">Manage Students</h1>
            <p className="text-sm text-muted-foreground font-body">Add and update student profiles</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
              className="pl-9 bg-white border-border/40 focus:border-primary/40"
            />
          </div>
          <Button onClick={handleOpenCreate} className="gap-2">
            <Plus size={18} />
            <span>Add Student</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border/30 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-4 text-muted-foreground font-body">
            <Loader2 size={32} className="animate-spin text-primary" />
            <p>Loading student database...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground font-body">
            {search ? "No matching students." : "No students registered yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-accent/50 border-b border-border/20">
                  <th className="text-left py-4 px-6 font-heading font-bold text-primary text-xs uppercase tracking-wider">Name & Roll</th>
                  <th className="text-left py-4 px-6 font-heading font-bold text-primary text-xs uppercase tracking-wider hidden sm:table-cell">Registration</th>
                  <th className="text-left py-4 px-6 font-heading font-bold text-primary text-xs uppercase tracking-wider">Department</th>
                  <th className="text-right py-4 px-6 font-heading font-bold text-primary text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body">
                {filtered.map((student) => (
                  <tr key={student.id} className="border-b border-border/20 last:border-none hover:bg-accent/30 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-primary font-bold text-base">{student.user?.name || "No Name"}</span>
                        <span className="text-xs text-muted-foreground">Roll: {student.roll}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground hidden sm:table-cell font-medium">
                      {student.registration_no}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-primary/5 text-primary rounded-md text-xs font-semibold">
                        {student.department}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenEdit(student)} 
                          className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-muted-foreground hover:text-primary"
                          title="Edit Student"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(student.id)} 
                          className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive"
                          title="Delete Student"
                        >
                          <Trash2 size={16} />
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

      <Dialog 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingStudent ? "Edit Student Profile" : "Add New Student"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {!editingStudent && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Full Name</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Email Address</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Password</label>
                <Input
                  required
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Set account password"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Roll Number</label>
              <Input
                required
                value={formData.roll}
                onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                placeholder="e.g. 123456"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Registration No</label>
              <Input
                required
                value={formData.registration_no}
                onChange={(e) => setFormData({ ...formData, registration_no: e.target.value })}
                placeholder="e.g. REG-789"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Department</label>
            <Input
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="e.g. Science, Commerce, Arts"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={formLoading} className="min-w-[100px]">
              {formLoading ? <Loader2 size={18} className="animate-spin" /> : editingStudent ? "Save Changes" : "Create Student"}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}
