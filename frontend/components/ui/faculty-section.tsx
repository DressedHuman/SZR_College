import * as React from "react"
import { LucideIcon } from "lucide-react"

interface Subject {
  icon: LucideIcon
  name: string
}

interface Facility {
  icon: LucideIcon
  title: string
  description: string
  isDark?: boolean
}

interface FacultySectionProps {
  id: string
  title: string
  subtitle: string
  imageSrc: string
  deanName: string
  deanQuote: string
  subjects: Subject[]
  facilities: Facility[]
  reverse?: boolean
}

export function FacultySection({
  id,
  title,
  subtitle,
  imageSrc,
  deanName,
  deanQuote,
  subjects,
  facilities,
  reverse = false,
}: FacultySectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-8 mb-32" id={id}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className={`lg:col-span-5 relative ${reverse ? "order-1 lg:order-2" : ""}`}>
          <div className="aspect-[4/5] rounded-[12px] overflow-hidden shadow-sm mb-8">
            <img alt={title} className="w-full h-full object-cover" src={imageSrc} />
          </div>
          <div className={`absolute -bottom-6 ${reverse ? "-left-6 md:left-4 bg-primary text-white" : "-right-6 md:right-12 bg-secondary"} p-8 rounded-[12px] shadow-sm max-w-xs`}>
            <h3 className={`font-heading font-bold mb-2 ${reverse ? "text-white" : "text-primary"}`}>Dean of {title.split(" ")[0]}</h3>
            <p className={`text-sm font-medium font-body ${reverse ? "opacity-90" : "text-primary/80"}`}>{deanName}</p>
            <p className={`text-xs mt-2 leading-snug italic font-body ${reverse ? "text-[#ffe088]" : "text-primary/70"}`}>"{deanQuote}"</p>
          </div>
        </div>
        <div className={`lg:col-span-7 ${reverse ? "order-2 lg:order-1" : ""}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-12 bg-secondary"></span>
            <span className="text-sm font-bold uppercase tracking-widest text-secondary font-body">{subtitle}</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-primary mb-8">{title}</h2>
          <div className="space-y-12">
            <div>
              <h4 className="text-sm font-bold text-primary border-b border-border pb-2 mb-4 uppercase tracking-tighter font-body">Available Subjects</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {subjects.map((subject, i) => (
                  <div key={i} className="bg-card p-4 rounded-[12px] shadow-sm flex items-center gap-3">
                    <subject.icon className="text-primary" size={20} />
                    <span className="font-medium text-sm font-body">{subject.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary border-b border-border pb-2 mb-4 uppercase tracking-tighter font-body">Facilities Overview</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {facilities.map((facility, i) => (
                  <div key={i} className={`${facility.isDark ? "bg-[#003366] text-white" : "bg-accent"} p-6 rounded-[12px]`}>
                    <facility.icon className={`${facility.isDark ? "mb-3 block" : "text-primary mb-3 block"}`} size={24} />
                    <h5 className={`font-bold mb-2 font-heading ${facility.isDark ? "" : "text-primary"}`}>{facility.title}</h5>
                    <p className={`text-sm font-body ${facility.isDark ? "opacity-80" : "text-muted-foreground"}`}>{facility.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
