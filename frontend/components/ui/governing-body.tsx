import * as React from "react"

interface Member {
  name: string
  designation: string
  description: string
}

interface GoverningBodyProps {
  members: Member[]
}

export function GoverningBody({ members }: GoverningBodyProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {members.map((member, i) => (
        <div key={i} className="bg-card p-8 rounded-[12px] text-center hover:bg-background transition-colors border border-border shadow-sm">
          <h4 className="font-heading font-bold text-lg text-primary mb-1">{member.name}</h4>
          <p className="text-secondary font-bold text-sm mb-4 font-body">{member.designation}</p>
          <p className="text-muted-foreground text-sm font-body">{member.description}</p>
        </div>
      ))}
    </div>
  )
}
