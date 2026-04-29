import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { EventCard } from "@/components/ui/event-card"
import { SectionHeader } from "@/components/ui/section-header"

export function EventsPreview() {
  const events = [
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxNumfYmRa6U4MZg17Kd044_iBD3TuCh8BQ2FYzDZuRaSPWYsenk-EfdvhqOFOr9X6dhgBfbWwc68jWARV4Rpb-ZWWWx9qOXNAc7Q6bbh33oaDVasg0WUdXHufb9Lo7KYlE-v12hWnSPy1WIZs-bw4tno_iF8F7uknk69AltoP1iqtbvCWPKVC4MhmaEwZXTw4PlmVINu7KBZAouhJYS6RmMyZWd6QE1vuQ4OIEUWoT3kpJn6zlFaOJR83q8-7FJTY6wW5efLapY0",
      dateStr: "Nov 15, 2024",
      title: "Annual Science & Tech Fair",
      location: "Main Campus Plaza"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4DGSc0bttIQy0kKA3DCyUssVLl_XLJgJXdwMv0k-LPPbk8VRB_kwE_vyYsdQw5kAGVz11dh3BVMA3NPU2LHKOWergg5ArcWq1l7EiaSMR8dzvIsZ8FxrTFK55pNZfavGzA4YLMlHJtDZclHusxCgdI5m1hiE81DOx6-gKka_ui4Hvg_LTztrH4SloykRu443Z2l7JOml0EpKgcxhsBVWg-qEPZW4XMHz7e_RaVE8_5YBL4GF0suVKSsVSEg8azZSEGYuuU1OXwS4",
      dateStr: "Dec 02, 2024",
      title: "Inter-College Sports Week",
      location: "College Sports Complex"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxVt_DfMrK8pFdqLHgxCWAVaTkhDmES0y-57Tkou3fIxtoGFqeNrasktn7hgZ0vM8wDPqLHUcS8x7Y--NaVhp5FcDoLhYsm1I2DG9USOAiKYUrZWfXqUwVGDs-oGKJ2oemlC3qxXWTcziF6VlY0LGo1ahxmZSsk76fa6cqm9ad22RW5WgMMsnob9RGcItbmYdJ3Xv2OJWThjM2FNG6nKM8w6kbDBuP1vPIZxVH9p8_JuEXgrGlnhK_rfIU1-l-DrFvZqN_-F3OOcs",
      dateStr: "Jan 10, 2025",
      title: "Cultural Heritage Festival",
      location: "Central Auditorium"
    }
  ]

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
