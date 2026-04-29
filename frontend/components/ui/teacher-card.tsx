import * as React from "react"
import { Mail, Phone } from "lucide-react"

interface TeacherCardProps {
  imageSrc: string
  name: string
  designation: string
  department: string
  email?: string
  phone?: string
}

export function TeacherCard({ imageSrc, name, designation, department, email, phone }: TeacherCardProps) {
  return (
    <div className="bg-card rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="h-64 overflow-hidden relative bg-accent">
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={name} 
          src={imageSrc}
        />
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary font-body">
          {department}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-xl font-bold text-primary mb-1 font-heading">{name}</h4>
        <p className="text-secondary font-bold text-sm uppercase mb-4 font-body">{designation}</p>
        
        <div className="mt-auto pt-4 border-t border-border space-y-2">
          {email && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-body">
              <Mail size={14} className="text-primary" />
              <a href={`mailto:${email}`} className="hover:underline hover:text-primary transition-colors">{email}</a>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-body">
              <Phone size={14} className="text-primary" />
              <a href={`tel:${phone}`} className="hover:underline hover:text-primary transition-colors">{phone}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
