"use client"

import * as React from "react"
import { Globe, Image, MessageSquare, Layout, Save, Loader2, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/toast"

interface SiteContentState {
  collegeName: string
  tagline: string
  heroHeading: string
  heroSubtext: string
  principalName: string
  principalDesignation: string
  principalMessage: string
  principalPhotoUrl: string
  collegeLogoUrl: string
  heroImageUrl: string
  contactEmail: string
  contactPhone: string
  address: string
}

const defaultContent: SiteContentState = {
  collegeName: "Shahid Ziaur Rahman College",
  tagline: "Empowering Future Leaders through excellence in education, character building, and community service since 1991.",
  heroHeading: "Shahid Ziaur Rahman College",
  heroSubtext: "Empowering Future Leaders through excellence in education, character building, and community service since 1991.",
  principalName: "Prof. Dr. Zahirul Haque",
  principalDesignation: "Principal, SZR College",
  principalMessage: "Our mission at SZR College is to nurture curiosity and foster integrity. We don't just teach curricula; we shape the visionary leaders of tomorrow's Bangladesh.",
  principalPhotoUrl: "",
  collegeLogoUrl: "",
  heroImageUrl: "",
  contactEmail: "info@szrcollege.edu",
  contactPhone: "+880-1234-567890",
  address: "Dimla, Nilphamari, Bangladesh",
}

export default function SiteContentPage() {
  const { showToast } = useToast()
  const [content, setContent] = React.useState<SiteContentState>(defaultContent)
  const [saving, setSaving] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"general" | "hero" | "principal" | "contact">("general")

  React.useEffect(() => {
    const saved = localStorage.getItem("szr_site_content")
    if (saved) {
      try {
        setContent({ ...defaultContent, ...JSON.parse(saved) })
      } catch { /* use defaults */ }
    }
  }, [])

  function updateField(field: keyof SiteContentState, value: string) {
    setContent(prev => ({ ...prev, [field]: value }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      localStorage.setItem("szr_site_content", JSON.stringify(content))
      showToast("Site content saved successfully", "success")
    } catch (err) {
      showToast("Failed to save content", "error")
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: "general" as const, label: "General", icon: Layout },
    { id: "hero" as const, label: "Hero Section", icon: Image },
    { id: "principal" as const, label: "Principal", icon: MessageSquare },
    { id: "contact" as const, label: "Contact", icon: Globe },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe size={20} className="text-primary" />
          <h1 className="text-2xl font-heading font-bold text-primary">Site Content</h1>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Changes
        </Button>
      </div>

      <p className="text-sm text-muted-foreground font-body">
        Manage your website's public-facing content — from the hero section to the principal's message.
      </p>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-[#f3f4f5] rounded-xl p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${
              activeTab === tab.id
                ? "bg-white text-primary shadow-sm"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <tab.icon size={16} />
            <span className="hidden sm:inline font-body">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="bg-white rounded-2xl p-6 border border-border/30 space-y-5">
          <h2 className="text-lg font-heading font-bold text-primary">General Settings</h2>
          <div>
            <label className="text-sm font-semibold text-primary font-body block mb-1">College Name</label>
            <Input value={content.collegeName} onChange={e => updateField("collegeName", e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-semibold text-primary font-body block mb-1">Tagline</label>
            <Textarea value={content.tagline} onChange={e => updateField("tagline", e.target.value)} rows={2} />
          </div>
          <div>
            <label className="text-sm font-semibold text-primary font-body block mb-1">College Logo URL</label>
            <Input value={content.collegeLogoUrl} onChange={e => updateField("collegeLogoUrl", e.target.value)} placeholder="https://..." />
            <p className="text-xs text-muted-foreground mt-1 font-body">Paste a direct image URL for the college logo</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {activeTab === "hero" && (
        <div className="bg-white rounded-2xl p-6 border border-border/30 space-y-5">
          <h2 className="text-lg font-heading font-bold text-primary">Hero Section</h2>
          <div>
            <label className="text-sm font-semibold text-primary font-body block mb-1">Heading</label>
            <Input value={content.heroHeading} onChange={e => updateField("heroHeading", e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-semibold text-primary font-body block mb-1">Subtext</label>
            <Textarea value={content.heroSubtext} onChange={e => updateField("heroSubtext", e.target.value)} rows={3} />
          </div>
          <div>
            <label className="text-sm font-semibold text-primary font-body block mb-1">Background Image URL</label>
            <Input value={content.heroImageUrl} onChange={e => updateField("heroImageUrl", e.target.value)} placeholder="https://..." />
            <p className="text-xs text-muted-foreground mt-1 font-body">Recommended size: 1920×1080 or larger</p>
          </div>
        </div>
      )}

      {/* Principal Section */}
      {activeTab === "principal" && (
        <div className="bg-white rounded-2xl p-6 border border-border/30 space-y-5">
          <h2 className="text-lg font-heading font-bold text-primary">Principal's Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-primary font-body block mb-1">Name</label>
              <Input value={content.principalName} onChange={e => updateField("principalName", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-semibold text-primary font-body block mb-1">Designation</label>
              <Input value={content.principalDesignation} onChange={e => updateField("principalDesignation", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-primary font-body block mb-1">Message</label>
            <Textarea value={content.principalMessage} onChange={e => updateField("principalMessage", e.target.value)} rows={4} />
          </div>
          <div>
            <label className="text-sm font-semibold text-primary font-body block mb-1">Photo URL</label>
            <Input value={content.principalPhotoUrl} onChange={e => updateField("principalPhotoUrl", e.target.value)} placeholder="https://..." />
          </div>
        </div>
      )}

      {/* Contact */}
      {activeTab === "contact" && (
        <div className="bg-white rounded-2xl p-6 border border-border/30 space-y-5">
          <h2 className="text-lg font-heading font-bold text-primary">Contact Information</h2>
          <div>
            <label className="text-sm font-semibold text-primary font-body block mb-1">Email</label>
            <Input type="email" value={content.contactEmail} onChange={e => updateField("contactEmail", e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-semibold text-primary font-body block mb-1">Phone</label>
            <Input value={content.contactPhone} onChange={e => updateField("contactPhone", e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-semibold text-primary font-body block mb-1">Address</label>
            <Textarea value={content.address} onChange={e => updateField("address", e.target.value)} rows={2} />
          </div>
        </div>
      )}
    </div>
  )
}
