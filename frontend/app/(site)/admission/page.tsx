"use client"

import * as React from "react"
import { applyAdmission } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, GraduationCap, Send, CheckCircle } from "lucide-react"

export default function AdmissionPage() {
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    previous_school: "",
    marks_obtained: "",
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await applyAdmission({
        ...formData,
        marks_obtained: parseFloat(formData.marks_obtained),
      })
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-xl border border-border/20 animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h1 className="text-3xl font-heading font-extrabold text-primary mb-4">Application Submitted!</h1>
          <p className="text-muted-foreground font-body mb-8">
            Thank you for applying to SZR College. Your application has been received and is currently being processed. We will contact you soon.
          </p>
          <Button onClick={() => window.location.href = "/"} className="w-full h-12 rounded-xl text-base font-bold">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="pt-32 pb-24 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <GraduationCap size={14} /> Admission Open
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-primary tracking-tight mb-4">
            Apply for Admission
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto">
            Start your journey with us. Fill out the form below and our team will get in touch with you.
          </p>
        </div>

        <div className="bg-white rounded-[32px] p-8 lg:p-12 shadow-xl border border-border/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary font-heading">First Name</label>
                <Input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="h-12 bg-[#f3f4f5] border-transparent focus:bg-white focus:border-primary transition-all rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary font-heading">Last Name</label>
                <Input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="h-12 bg-[#f3f4f5] border-transparent focus:bg-white focus:border-primary transition-all rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary font-heading">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="h-12 bg-[#f3f4f5] border-transparent focus:bg-white focus:border-primary transition-all rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary font-heading">Phone Number</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+880 1XXX XXXXXX"
                  required
                  className="h-12 bg-[#f3f4f5] border-transparent focus:bg-white focus:border-primary transition-all rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary font-heading">Previous School/College</label>
              <Input
                name="previous_school"
                value={formData.previous_school}
                onChange={handleChange}
                placeholder="Name of your last institution"
                required
                className="h-12 bg-[#f3f4f5] border-transparent focus:bg-white focus:border-primary transition-all rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary font-heading">Marks/GPA Obtained</label>
              <Input
                type="number"
                step="0.01"
                name="marks_obtained"
                value={formData.marks_obtained}
                onChange={handleChange}
                placeholder="e.g. 5.00"
                required
                className="h-12 bg-[#f3f4f5] border-transparent focus:bg-white focus:border-primary transition-all rounded-xl"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-body border border-red-100">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Application
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
