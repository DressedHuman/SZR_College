import * as React from "react"
import { CalendarDays, MapPin } from "lucide-react"

interface EventCardProps {
  imageSrc: string
  dateStr: string
  title: string
  location: string
}

export function EventCard({ imageSrc, dateStr, title, location }: EventCardProps) {
  return (
    <div className="min-w-[350px] bg-card rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <img 
        className="h-48 w-full object-cover" 
        alt={title} 
        src={imageSrc}
      />
      <div className="p-6">
        <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase mb-3 font-body">
          <CalendarDays size={16} /> {dateStr}
        </div>
        <h4 className="text-xl font-bold text-primary mb-4 font-heading">{title}</h4>
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6 font-body">
          <MapPin size={16} /> {location}
        </div>
        <button className="text-primary font-bold hover:underline font-body">Learn More</button>
      </div>
    </div>
  )
}
