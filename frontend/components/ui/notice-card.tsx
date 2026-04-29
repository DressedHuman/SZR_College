import * as React from "react"

interface NoticeCardProps {
  day: string
  month: string
  title: string
  description: string
}

export function NoticeCard({ day, month, title, description }: NoticeCardProps) {
  return (
    <div className="p-6 bg-accent rounded-[12px] flex gap-6 items-start hover:bg-accent/80 transition-colors cursor-pointer">
      <div className="text-center px-4 py-2 bg-primary rounded-lg text-primary-foreground shrink-0">
        <span className="block text-lg font-bold font-heading">{day}</span>
        <span className="text-xs uppercase font-body">{month}</span>
      </div>
      <div>
        <h4 className="font-bold text-primary leading-tight mb-1 font-heading">{title}</h4>
        <p className="text-sm text-muted-foreground font-body">{description}</p>
      </div>
    </div>
  )
}
