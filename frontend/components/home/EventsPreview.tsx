import * as React from "react"
import { ChevronLeft, ChevronRight, CalendarDays, MapPin } from "lucide-react"

export function EventsPreview() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-black text-primary tracking-tight font-heading">Campus Events</h2>
          <div className="flex gap-2">
            <button className="p-3 bg-accent rounded-full hover:bg-accent/80 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <button className="p-3 bg-accent rounded-full hover:bg-accent/80 transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8">
          <div className="min-w-[350px] bg-card rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img 
              className="h-48 w-full object-cover" 
              alt="Students presenting scientific projects at a college science fair, bright indoor lighting" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxNumfYmRa6U4MZg17Kd044_iBD3TuCh8BQ2FYzDZuRaSPWYsenk-EfdvhqOFOr9X6dhgBfbWwc68jWARV4Rpb-ZWWWx9qOXNAc7Q6bbh33oaDVasg0WUdXHufb9Lo7KYlE-v12hWnSPy1WIZs-bw4tno_iF8F7uknk69AltoP1iqtbvCWPKVC4MhmaEwZXTw4PlmVINu7KBZAouhJYS6RmMyZWd6QE1vuQ4OIEUWoT3kpJn6zlFaOJR83q8-7FJTY6wW5efLapY0"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase mb-3 font-body">
                <CalendarDays size={16} /> Nov 15, 2024
              </div>
              <h4 className="text-xl font-bold text-primary mb-4 font-heading">Annual Science & Tech Fair</h4>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6 font-body">
                <MapPin size={16} /> Main Campus Plaza
              </div>
              <button className="text-primary font-bold hover:underline font-body">Learn More</button>
            </div>
          </div>
          <div className="min-w-[350px] bg-card rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img 
              className="h-48 w-full object-cover" 
              alt="Exciting inter-college football match on a lush green field with cheering spectators in background" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4DGSc0bttIQy0kKA3DCyUssVLl_XLJgJXdwMv0k-LPPbk8VRB_kwE_vyYsdQw5kAGVz11dh3BVMA3NPU2LHKOWergg5ArcWq1l7EiaSMR8dzvIsZ8FxrTFK55pNZfavGzA4YLMlHJtDZclHusxCgdI5m1hiE81DOx6-gKka_ui4Hvg_LTztrH4SloykRu443Z2l7JOml0EpKgcxhsBVWg-qEPZW4XMHz7e_RaVE8_5YBL4GF0suVKSsVSEg8azZSEGYuuU1OXwS4"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase mb-3 font-body">
                <CalendarDays size={16} /> Dec 02, 2024
              </div>
              <h4 className="text-xl font-bold text-primary mb-4 font-heading">Inter-College Sports Week</h4>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6 font-body">
                <MapPin size={16} /> College Sports Complex
              </div>
              <button className="text-primary font-bold hover:underline font-body">Learn More</button>
            </div>
          </div>
          <div className="min-w-[350px] bg-card rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img 
              className="h-48 w-full object-cover" 
              alt="Traditional cultural dance performance on a stage with vibrant colorful lighting" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxVt_DfMrK8pFdqLHgxCWAVaTkhDmES0y-57Tkou3fIxtoGFqeNrasktn7hgZ0vM8wDPqLHUcS8x7Y--NaVhp5FcDoLhYsm1I2DG9USOAiKYUrZWfXqUwVGDs-oGKJ2oemlC3qxXWTcziF6VlY0LGo1ahxmZSsk76fa6cqm9ad22RW5WgMMsnob9RGcItbmYdJ3Xv2OJWThjM2FNG6nKM8w6kbDBuP1vPIZxVH9p8_JuEXgrGlnhK_rfIU1-l-DrFvZqN_-F3OOcs"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase mb-3 font-body">
                <CalendarDays size={16} /> Jan 10, 2025
              </div>
              <h4 className="text-xl font-bold text-primary mb-4 font-heading">Cultural Heritage Festival</h4>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6 font-body">
                <MapPin size={16} /> Central Auditorium
              </div>
              <button className="text-primary font-bold hover:underline font-body">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
