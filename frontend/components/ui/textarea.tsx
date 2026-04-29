import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-[12px] border-0 border-b-2 border-transparent bg-input px-4 py-4 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:bg-card focus-visible:border-b-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-b-destructive md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
