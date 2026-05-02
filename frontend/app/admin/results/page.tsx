"use client"

import * as React from "react"
import { getToken } from "@/lib/auth"
import { adminGetStudents, adminGetResults, adminCreateResult, adminDeleteResult } from "@/lib/api"
import type { StudentProfile, Result } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GraduationCap, Plus, Trash2, X, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/toast"

export default function AdminResultsPage() {
  const { showToast } = useToast()
  const [students, setStudents] = React.useState<StudentProfile[]>([])
  const [results, setResults] = React.useState<Result[]>([])
  const [selectedRoll, setSelectedRoll] = React.useState("")
  const [selectedStudentId, setSelectedStudentId] = React.useState<number | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [showForm, setShowForm] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [subject, setSubject] = React.useState("")
  const [marks, setMarks] = React.useState("")
  const [examType, setExamType] = React.useState("Midterm")

  React.useEffect(() => { loadStudents() }, [])

  async function loadStudents() {
    const token = getToken()
    if (!token) return
    try {
      const data = await adminGetStudents(token)
      setStudents(data)
    } catch (err) {
      console.error("Failed to load students:", err)
    }
  }

  async function loadResults(roll: string) {
    const token = getToken()
    if (!token || !roll) return
    setLoading(true)
    setResults([])
    try {
      const data = await adminGetResults(token, roll)
      setResults(data)
    } catch (err) {
      console.error("Failed to load results:", err)
    } finally {
      setLoading(false)
    }
  }

  function handleStudentSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const roll = e.target.value
    setSelectedRoll(roll)
    const student = students.find(s => s.roll === roll)
    setSelectedStudentId(student?.id || null)
    if (roll) loadResults(roll)
    else setResults([])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedStudentId) return
    const token = getToken()
    if (!token) return
    setSubmitting(true)
    setError(null)
    try {
      await adminCreateResult(token, { student_id: selectedStudentId, subject, marks: parseFloat(marks), exam_type: examType })
      showToast("Result added successfully", "success")
      setSubject(""); setMarks(""); setExamType("Midterm"); setShowForm(false)
      await loadResults(selectedRoll)
    } catch (err: any) {
      setError(err.message || "Failed to add result")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this result?")) return
    const token = getToken()
    if (!token) return
    try {
      await adminDeleteResult(token, id)
      showToast("Result deleted", "success")
      await loadResults(selectedRoll)
    } catch (err: any) {
      showToast(err.message || "Failed to delete", "error")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <GraduationCap size={20} className="text-primary" />
        <h1 className="text-2xl font-heading font-bold text-primary">Manage Results</h1>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border/30">
        <label className="text-sm font-semibold text-primary font-body block mb-2">Select Student</label>
        <select value={selectedRoll} onChange={handleStudentSelect} className="w-full sm:w-80 bg-[#e1e3e4] text-primary font-body text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors">
          <option value="">-- Select a student --</option>
          {students.map(s => (<option key={s.id} value={s.roll}>{s.roll} — {s.department}</option>))}
        </select>
      </div>

      {selectedRoll && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-body">
              Showing results for <span className="font-bold text-primary">{selectedRoll}</span>
            </p>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} className="gap-2"><Plus size={16} /> Add Result</Button>
            )}
          </div>

          {showForm && (
            <div className="bg-white rounded-2xl p-6 border border-border/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-heading font-bold text-primary">Add Result</h2>
                <button onClick={() => { setShowForm(false); setError(null) }} className="text-muted-foreground hover:text-primary"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-primary font-body block mb-1">Subject</label>
                  <Input value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="e.g. Data Structures" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-primary font-body block mb-1">Marks</label>
                  <Input type="number" min="0" max="100" step="0.1" value={marks} onChange={(e) => setMarks(e.target.value)} required placeholder="0-100" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-primary font-body block mb-1">Exam Type</label>
                  <Input value={examType} onChange={(e) => setExamType(e.target.value)} required placeholder="e.g. Final" />
                </div>
                <div className="sm:col-span-3 flex gap-3">
                  {error && <p className="text-sm text-destructive font-body self-center">{error}</p>}
                  <div className="ml-auto flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                    <Button type="submit" disabled={submitting} className="gap-2">{submitting && <Loader2 size={16} className="animate-spin" />} Save</Button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-border/30 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-muted-foreground font-body">Loading results...</div>
            ) : results.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground font-body">No results found for this student.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#d5e3ff]">
                      <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Subject</th>
                      <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Marks</th>
                      <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider hidden sm:table-cell">Exam</th>
                      <th className="text-right py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="font-body">
                    {results.map((result) => (
                      <tr key={result.id} className="border-b border-border/20 last:border-none hover:bg-accent/30 transition-colors">
                        <td className="py-3 px-4 text-primary font-medium">{result.subject}</td>
                        <td className="py-3 px-4 text-muted-foreground">{result.marks}</td>
                        <td className="py-3 px-4 text-muted-foreground capitalize hidden sm:table-cell">{result.exam_type}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end">
                            <button onClick={() => handleDelete(result.id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
