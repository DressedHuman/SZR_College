import * as React from "react"
import { Quote } from "lucide-react"

export function NoticesAndMessage() {
  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Recent Notices */}
        <div className="lg:col-span-5 space-y-8">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl font-black text-primary tracking-tight font-heading">Recent Notices</h2>
            <a className="text-primary font-bold text-sm underline underline-offset-4 font-body" href="#">View Archive</a>
          </div>
          <div className="space-y-4">
            <div className="p-6 bg-accent rounded-[12px] flex gap-6 items-start hover:bg-accent/80 transition-colors">
              <div className="text-center px-4 py-2 bg-primary rounded-lg text-primary-foreground">
                <span className="block text-lg font-bold font-heading">12</span>
                <span className="text-xs uppercase font-body">OCT</span>
              </div>
              <div>
                <h4 className="font-bold text-primary leading-tight mb-1 font-heading">Final Examination Schedule for Honors 4th Year</h4>
                <p className="text-sm text-muted-foreground font-body">Detailed timeline for the upcoming final assessments...</p>
              </div>
            </div>
            <div className="p-6 bg-accent rounded-[12px] flex gap-6 items-start hover:bg-accent/80 transition-colors">
              <div className="text-center px-4 py-2 bg-primary rounded-lg text-primary-foreground">
                <span className="block text-lg font-bold font-heading">08</span>
                <span className="text-xs uppercase font-body">OCT</span>
              </div>
              <div>
                <h4 className="font-bold text-primary leading-tight mb-1 font-heading">Holiday Notice for Durga Puja & Lakshmi Puja</h4>
                <p className="text-sm text-muted-foreground font-body">The college will remain closed from Oct 20th to Oct 28th...</p>
              </div>
            </div>
            <div className="p-6 bg-accent rounded-[12px] flex gap-6 items-start hover:bg-accent/80 transition-colors">
              <div className="text-center px-4 py-2 bg-primary rounded-lg text-primary-foreground">
                <span className="block text-lg font-bold font-heading">05</span>
                <span className="text-xs uppercase font-body">OCT</span>
              </div>
              <div>
                <h4 className="font-bold text-primary leading-tight mb-1 font-heading">Orientation for HSC 1st Year Students</h4>
                <p className="text-sm text-muted-foreground font-body">Welcome ceremony at the central auditorium starting 10:00 AM...</p>
              </div>
            </div>
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
