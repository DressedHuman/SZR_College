import * as React from "react"
import { GraduationCap, BarChart, CalendarDays, FileText } from "lucide-react"

export function QuickLinks() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <a className="group p-8 bg-card rounded-[12px] shadow-sm hover:shadow-xl transition-all duration-300" href="#">
            <GraduationCap className="text-primary mb-4 block group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-xl font-bold text-primary mb-2 font-heading">Admission</h3>
            <p className="text-muted-foreground text-sm font-body">Join our community for the upcoming 2024-25 academic session.</p>
          </a>
          <a className="group p-8 bg-card rounded-[12px] shadow-sm hover:shadow-xl transition-all duration-300" href="#">
            <BarChart className="text-primary mb-4 block group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-xl font-bold text-primary mb-2 font-heading">Results</h3>
            <p className="text-muted-foreground text-sm font-body">Check board and internal examination results instantly.</p>
          </a>
          <a className="group p-8 bg-card rounded-[12px] shadow-sm hover:shadow-xl transition-all duration-300" href="#">
            <CalendarDays className="text-primary mb-4 block group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-xl font-bold text-primary mb-2 font-heading">Class Routine</h3>
            <p className="text-muted-foreground text-sm font-body">Stay updated with current schedules for all departments.</p>
          </a>
          <a className="group p-8 bg-card rounded-[12px] shadow-sm hover:shadow-xl transition-all duration-300" href="#">
            <FileText className="text-primary mb-4 block group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-xl font-bold text-primary mb-2 font-heading">Syllabus</h3>
            <p className="text-muted-foreground text-sm font-body">Download updated course curricula and academic materials.</p>
          </a>
        </div>
      </div>
    </section>
  )
}
