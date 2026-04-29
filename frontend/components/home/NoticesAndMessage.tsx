import * as React from "react"
import { Quote } from "lucide-react"
import { NoticeCard } from "@/components/ui/notice-card"
import { SectionHeader } from "@/components/ui/section-header"

interface Notice {
  day: string
  month: string
  title: string
  description: string
}

interface PrincipalMessage {
  imageSrc: string
  quote: string
  name: string
  designation: string
}

interface NoticesAndMessageProps {
  notices: Notice[]
  principalMessage: PrincipalMessage
}

export function NoticesAndMessage({ notices, principalMessage }: NoticesAndMessageProps) {
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
                alt={principalMessage.name} 
                src={principalMessage.imageSrc}
              />
            </div>
            <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <Quote className="text-secondary text-5xl mb-6 w-12 h-12" />
              <p className="text-lg italic font-light leading-relaxed mb-8 font-body">
                "{principalMessage.quote}"
              </p>
              <div>
                <h4 className="text-xl font-bold text-white font-heading">{principalMessage.name}</h4>
                <p className="text-[#d5e3ff] text-sm uppercase tracking-widest font-body">{principalMessage.designation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
