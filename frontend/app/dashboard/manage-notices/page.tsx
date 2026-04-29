"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { getToken } from "@/lib/auth"
import { getNotices, adminCreateNotice, adminUpdateNotice, adminDeleteNotice } from "@/lib/api"
import type { Notice } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2, X, Loader2, Megaphone } from "lucide-react"

export default function ManageNoticesPage() {
  const router = useRouter()
  const [notices, setNotices] = React.useState<Notice[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showForm, setShowForm] = React.useState(false)
  const [editingId, setEditingId] = React.useState<number | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [category, setCategory] = React.useState("General")

  React.useEffect(() => {
    loadNotices()
  }, [])

  async function loadNotices() {
    try {
      const data = await getNotices()
      setNotices(data)
    } catch (err) {
      console.error("Failed to load notices:", err)
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setTitle("")
    setContent("")
    setCategory("General")
    setEditingId(null)
    setShowForm(false)
    setError(null)
  }

  function startEdit(notice: Notice) {
    setTitle(notice.title)
    setContent(notice.content)
    setCategory(notice.category)
    setEditingId(notice.id)
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const token = getToken()
    if (!token) return

    setSubmitting(true)
    setError(null)

    try {
      if (editingId) {
        await adminUpdateNotice(token, editingId, { title, content, category })
      } else {
        await adminCreateNotice(token, { title, content, category })
      }
      resetForm()
      await loadNotices()
    } catch (err: any) {
      setError(err.message || "Failed to save notice")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this notice?")) return
    const token = getToken()
    if (!token) return

    try {
      await adminDeleteNotice(token, id)
      await loadNotices()
    } catch (err: any) {
      alert(err.message || "Failed to delete")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone size={20} className="text-primary" />
          <h1 className="text-2xl font-heading font-bold text-primary">Manage Notices</h1>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus size={16} /> New Notice
          </Button>
        )}
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-border/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-bold text-primary">
              {editingId ? "Edit Notice" : "Create Notice"}
            </h2>
            <button onClick={resetForm} className="text-muted-foreground hover:text-primary">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-primary font-body block mb-1">Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Notice title" />
            </div>
            <div>
              <label className="text-sm font-semibold text-primary font-body block mb-1">Content</label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} required placeholder="Notice content..." rows={4} />
            </div>
            <div>
              <label className="text-sm font-semibold text-primary font-body block mb-1">Category</label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} required placeholder="e.g. Academic, Administrative" />
            </div>
            {error && <p className="text-sm text-destructive font-body">{error}</p>}
            <div className="flex gap-3">
              <Button type="submit" disabled={submitting} className="gap-2">
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {editingId ? "Update" : "Create"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* Notices Table */}
      <div className="bg-white rounded-2xl border border-border/30 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground font-body">Loading notices...</div>
        ) : notices.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground font-body">No notices found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#d5e3ff]">
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Title</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider hidden lg:table-cell">Published</th>
                  <th className="text-right py-3 px-4 font-heading font-bold text-primary text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body">
                {notices.map((notice) => (
                  <tr key={notice.id} className="border-b border-border/20 last:border-none hover:bg-accent/30 transition-colors">
                    <td className="py-3 px-4 text-primary font-medium max-w-[300px]">
                      <p className="truncate">{notice.title}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{notice.content}</p>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="text-xs font-semibold bg-accent px-2 py-1 rounded-md text-muted-foreground">{notice.category}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs hidden lg:table-cell">
                      {new Date(notice.published_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => startEdit(notice)} className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-primary">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDelete(notice.id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive">
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
