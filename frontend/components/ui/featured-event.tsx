import * as React from "react"
import { Clock, MapPin } from "lucide-react"

interface FeaturedEventProps {
  imageSrc: string
  day: string
  month: string
  title: string
  description: string
  time: string
  location: string
  registerUrl?: string
}

export function FeaturedEvent({
  imageSrc,
  day,
  month,
  title,
  description,
  time,
  location,
  registerUrl = "#",
}: FeaturedEventProps) {
  return (
    <div className="group relative bg-card rounded-[12px] overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[500px] shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="lg:w-3/5 relative overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          alt={title} 
          src={imageSrc}
        />
        <div className="absolute top-6 left-6 bg-secondary text-primary px-4 py-2 rounded-[12px] font-bold flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest font-body">{month}</span>
          <span className="text-2xl font-heading">{day}</span>
        </div>
      </div>
      <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
        <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-4 font-body">Featured Event</span>
        <h2 className="text-4xl font-heading font-extrabold text-primary mb-6 leading-tight">{title}</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed font-body">{description}</p>
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-3 text-muted-foreground font-body">
            <Clock className="text-primary" size={20} />
            <span className="font-medium">{time}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground font-body">
            <MapPin className="text-primary" size={20} />
            <span className="font-medium">{location}</span>
          </div>
        </div>
        <a href={registerUrl} className="bg-primary text-primary-foreground w-full lg:w-fit px-10 py-4 rounded-[12px] font-bold text-lg hover:bg-primary/90 transition-colors shadow-sm font-body text-center">
          Register Now
        </a>
      </div>
    </div>
  )
}
