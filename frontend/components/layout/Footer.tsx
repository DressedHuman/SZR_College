import * as React from "react"
import Link from "next/link"
import { Globe, Users, MessageSquare, MapPin, Phone, Mail } from "lucide-react"

export function Footer({
  collegeName,
  address,
  contactPhone,
  contactEmail,
}: {
  collegeName?: string;
  address?: string;
  contactPhone?: string;
  contactEmail?: string;
}) {
  return (
    <footer className="bg-accent/50 w-full rounded-t-[1.5rem] mt-12 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 md:px-12 pb-16 max-w-7xl mx-auto w-full">
        {/* Column 1 */}
        <div className="space-y-6">
          <div className="text-lg font-black text-primary">
            {collegeName ?? "Shahid Ziaur Rahman College"}
          </div>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            A premier educational institution in Dimla, Nilphamari, dedicated to academic brilliance and holistic student development.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <Globe size={18} />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <Users size={18} />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <MessageSquare size={18} />
            </Link>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-bold text-primary mb-6 uppercase text-xs tracking-widest">Resources</h4>
          <ul className="space-y-4 text-sm font-body">
            <li><Link href="#" className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline">Academic Calendar</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline">Class Routine</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline">Student Handbook</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline">Exam Results</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-bold text-primary mb-6 uppercase text-xs tracking-widest">Navigation</h4>
          <ul className="space-y-4 text-sm font-body">
            <li><Link href="#" className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline">Faculty Directory</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline">Campus Map</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline">Alumni Network</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline">Careers</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="font-bold text-primary mb-6 uppercase text-xs tracking-widest">Contact Info</h4>
          <ul className="space-y-4 text-sm font-body">
            <li className="flex gap-3 text-muted-foreground">
              <MapPin className="text-primary" size={18} />
              <span>{address ?? "Dimla, Nilphamari, Bangladesh"}</span>
            </li>
            <li className="flex gap-3 text-muted-foreground">
              <Phone className="text-primary" size={18} />
              <span>{contactPhone ?? "+880 1234 567890"}</span>
            </li>
            <li className="flex gap-3 text-muted-foreground">
              <Mail className="text-primary" size={18} />
              <span>{contactEmail ?? "info@szrcollege.edu.bd"}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 py-8 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground font-body text-xs">
          <div>© 2024 {collegeName ?? "Shahid Ziaur Rahman College"}. All Rights Reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
