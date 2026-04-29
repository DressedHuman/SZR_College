import * as React from "react"
import { ChevronRight, Search, FileText, Calendar } from "lucide-react"
import { getNotices } from "@/lib/api"
import { NoticeCard } from "@/components/ui/notice-card"

export default async function NoticesPage() {
  let notices: any[] = [];
  try {
    const rawNotices = await getNotices();
    notices = rawNotices.map(n => {
      const date = new Date(n.published_at);
      return {
        day: date.getDate().toString().padStart(2, '0'),
        month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
        title: n.title,
        description: n.content
      };
    });
  } catch (error) {
    console.error("Failed to fetch notices:", error);
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-8 max-w-7xl mx-auto">
      <header className="mb-12">
        <nav className="flex items-center gap-2 text-muted-foreground text-sm mb-6 font-body">
          <span className="hover:text-primary cursor-pointer">Home</span>
          <ChevronRight size={14} />
          <span className="font-semibold text-primary">Notice Board</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-primary tracking-tight mb-4">Notice Board</h1>
            <p className="text-muted-foreground text-lg max-w-xl font-body">Stay updated with the latest announcements, academic schedules, and college news.</p>
          </div>
          <div className="flex items-center bg-accent px-4 py-3 rounded-[12px] w-full md:w-80">
            <Search className="text-muted-foreground mr-3" size={18} />
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-muted-foreground/60 font-body outline-none" 
              placeholder="Search notices..." 
              type="text" 
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {notices.length > 0 ? (
            notices.map((notice, i) => (
              <NoticeCard key={i} {...notice} />
            ))
          ) : (
            <div className="bg-accent/30 rounded-2xl p-12 text-center border-2 border-dashed border-border">
              <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
              <h3 className="text-xl font-bold text-primary mb-2">No Notices Found</h3>
              <p className="text-muted-foreground">Check back later for new updates.</p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-primary text-primary-foreground p-8 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Exam Routine</h3>
              <p className="text-blue-100/80 mb-6">Download the latest examination routines for all departments.</p>
              <button className="bg-secondary text-primary px-6 py-3 rounded-xl font-bold w-full hover:shadow-lg transition-all">
                Download Routine
              </button>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Calendar size={120} />
            </div>
          </div>

          <div className="bg-accent p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-primary mb-6">Categories</h3>
            <div className="space-y-3">
              {['Academic', 'Administrative', 'Admissions', 'Events', 'Results'].map(cat => (
                <div key={cat} className="flex justify-between items-center group cursor-pointer">
                  <span className="text-muted-foreground group-hover:text-primary transition-colors font-body">{cat}</span>
                  <div className="h-6 w-6 bg-background rounded-md flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    0
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
