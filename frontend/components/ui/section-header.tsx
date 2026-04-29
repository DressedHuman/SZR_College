import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  action?: React.ReactNode
}

export function SectionHeader({ title, action, className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("flex justify-between items-end mb-8", className)} {...props}>
      <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tight font-heading">
        {title}
      </h2>
      {action && <div>{action}</div>}
    </div>
  )
}
