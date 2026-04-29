import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { EventCard } from "@/components/ui/event-card"
import { SectionHeader } from "@/components/ui/section-header"

interface Event {
  imageSrc: string
  dateStr: string
  title: string
  location: string
}

interface EventsPreviewProps {
  events: Event[]
}

export function EventsPreview({ events }: EventsPreviewProps) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeader 
          title="Campus Events" 
          action={
            <div className="flex gap-2">
              <button className="p-3 bg-accent rounded-full hover:bg-accent/80 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button className="p-3 bg-accent rounded-full hover:bg-accent/80 transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          } 
          className="mb-12"
        />
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8">
          {events.map((event, i) => (
            <EventCard key={i} {...event} />
          ))}
        </div>
      </div>
    </section>
  )
}
