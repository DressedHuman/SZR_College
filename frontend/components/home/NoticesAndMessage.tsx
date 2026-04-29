import * as React from "react"
import { Quote } from "lucide-react"
import { NoticeCard } from "@/components/ui/notice-card"
import { SectionHeader } from "@/components/ui/section-header"

export function NoticesAndMessage() {
  const notices = [
    { day: "12", month: "OCT", title: "Final Examination Schedule for Honors 4th Year", description: "Detailed timeline for the upcoming final assessments..." },
    { day: "08", month: "OCT", title: "Holiday Notice for Durga Puja & Lakshmi Puja", description: "The college will remain closed from Oct 20th to Oct 28th..." },
    { day: "05", month: "OCT", title: "Orientation for HSC 1st Year Students", description: "Welcome ceremony at the central auditorium starting 10:00 AM..." },
  ]

  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Recent Notices */}
        <div className="lg:col-span-5 space-y-8">
          <SectionHeader 
            title="Recent Notices" 
            action={<a className="text-primary font-bold text-sm underline underline-offset-4 font-body" href="#">View Archive</a>} 
            className="mb-0" // override mb-8
          />
          <div className="space-y-4">
            {notices.map((notice, i) => (
              <NoticeCard key={i} {...notice} />
            ))}
          </div>
        </div>
        
        {/* Principal's Message */}
        <div className="lg:col-span-7">
          <div className="relative bg-[#003366] text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full">
            <div className="md:w-1/2 h-80 md:h-full overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                alt="Professional portrait of a mature academic leader in a suit, smiling warmly in a bright office setting" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpoSpoNXmuSafFICYGSA79YIbtjUVXVqxoJooFqpAUSvDWz2ZsUT6H1VZgX9xbIr6b9_rdeWVfjbaBCNO_EeZc5eEiHnp6sZ3r4xpOVBKhL7XJsG3SQV80q0LpA4KTxNwcpIsDO8fmuKhq-1v4swT0nDmDSF2PuSAO9awjFF5420uMN_YznjEdkz-K7L08KvdoeFyejdf1Owz7e2Tzp_MMserhyOq0wODpM5rL7Mbdv0quPD209dKXhvslSPCmarOBlKPh33p2nBA"
              />
            </div>
            <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <Quote className="text-secondary text-5xl mb-6 w-12 h-12" />
              <p className="text-lg italic font-light leading-relaxed mb-8 font-body">
                "Our mission at SZR College is to nurture curiosity and foster integrity. We don't just teach curricula; we shape the visionary leaders of tomorrow's Bangladesh."
              </p>
              <div>
                <h4 className="text-xl font-bold text-white font-heading">Prof. Dr. Zahirul Haque</h4>
                <p className="text-[#d5e3ff] text-sm uppercase tracking-widest font-body">Principal, SZR College</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
