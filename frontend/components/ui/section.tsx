import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "muted"
}

export function Section({ className, variant = "default", ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24", // Standard spacing between sections
        variant === "muted" ? "bg-accent" : "bg-background", // Tonal shift instead of borders
        className
      )}
      {...props}
    />
  )
}
