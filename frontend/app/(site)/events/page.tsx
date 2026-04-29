import * as React from "react"
import { ChevronRight, Clock, MapPin, ArrowRight, Image as ImageIcon } from "lucide-react"
import { EventCard } from "@/components/ui/event-card"
import { FeaturedEvent } from "@/components/ui/featured-event"
import { Button } from "@/components/ui/button"
import { getEvents } from "@/lib/api"

export default async function EventsPage() {
  let events: any[] = [];
  let featuredEvent: any = null;

  try {
    const rawEvents = await getEvents();
    events = rawEvents.map(e => {
      const date = new Date(e.date);
      return {
        imageSrc: e.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
        dateStr: date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        title: e.title,
        location: e.location || "Main Campus"
      };
    });

    if (rawEvents.length > 0) {
      const first = rawEvents[0];
      const date = new Date(first.date);
      featuredEvent = {
        imageSrc: first.image_url || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
        day: date.getDate().toString().padStart(2, '0'),
        month: date.toLocaleString('default', { month: 'short' }),
        title: first.title,
        description: first.description,
        time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        location: first.location || "Main College Playground",
      };
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return (
    <>
      {/* Page Header */}
      <header className="px-8 lg:px-24 py-12 pr-8 mt-20 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-muted-foreground text-sm mb-6 font-body">
          <span className="hover:text-primary cursor-pointer">Home</span>
          <ChevronRight size={14} />
          <span className="font-semibold text-primary">Events</span>
        </nav>
        <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-primary tracking-tight leading-none mb-4">Campus Events</h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed font-body">Experience the vibrant pulse of college life through academic excellence, cultural diversity, and competitive sports. Join us in shaping tomorrow's leaders.</p>
      </header>

      {/* Filter Bar */}
      <section className="px-8 lg:px-24 mb-12 max-w-7xl mx-auto">
        <div className="bg-accent/50 rounded-[12px] p-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex p-1 bg-background rounded-lg w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2 bg-card text-primary font-semibold rounded-md shadow-sm font-body">All Events</button>
            <button className="flex-1 md:flex-none px-6 py-2 text-muted-foreground hover:text-primary font-medium font-body">Academic</button>
            <button className="flex-1 md:flex-none px-6 py-2 text-muted-foreground hover:text-primary font-medium font-body">Cultural</button>
            <button className="flex-1 md:flex-none px-6 py-2 text-muted-foreground hover:text-primary font-medium font-body">Sports</button>
          </div>
          <div className="flex items-center gap-2 bg-background rounded-lg p-1 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md font-body">Upcoming</button>
            <button className="flex-1 md:flex-none px-6 py-2 text-muted-foreground hover:text-primary font-medium font-body">Past</button>
          </div>
        </div>
      </section>

      {/* Upcoming Featured Event */}
      <section className="px-8 lg:px-24 mb-20 max-w-7xl mx-auto">
        {featuredEvent ? (
          <FeaturedEvent {...featuredEvent} />
        ) : (
          <div className="bg-accent rounded-2xl h-80 flex items-center justify-center">
            <p className="text-muted-foreground">No featured events at the moment.</p>
          </div>
        )}
      </section>

      {/* Event Grid */}
      <section className="px-8 lg:px-24 mb-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h3 className="text-3xl font-heading font-bold text-primary">More Upcoming</h3>
          <div className="h-px flex-grow mx-8 bg-border opacity-50 hidden md:block"></div>
          <a className="text-secondary font-bold flex items-center gap-2 hover:gap-4 transition-all font-body" href="#">
            View Calendar <ArrowRight size={16} />
          </a>
        </div>
        
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <EventCard key={i} {...event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Stay tuned for more upcoming events!</p>
          </div>
        )}
      </section>

      {/* Past Events Section */}
      <section className="bg-accent py-20">
        <div className="px-8 lg:px-24 max-w-7xl mx-auto">
          <div className="mb-12">
            <h3 className="text-2xl font-heading font-bold text-primary">Recently Concluded</h3>
            <p className="text-muted-foreground font-body">Moments that became memories.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 group hover:bg-background transition-colors border border-transparent hover:border-border">
              <div className="w-full md:w-32 h-20 rounded bg-accent grayscale group-hover:grayscale-0 overflow-hidden transition-all">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Debate" 
                  src="https://images.unsplash.com/photo-1524178232363-1fb28f74b671?q=80&w=2070&auto=format&fit=crop"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-accent text-muted-foreground rounded font-body">Nov 20, 2023</span>
                  <span className="text-xs text-destructive font-medium uppercase font-body">Closed</span>
                </div>
                <h4 className="text-lg font-bold text-primary font-heading">Inter-Departmental Debate Championship</h4>
              </div>
              <button className="text-primary font-semibold flex items-center gap-2 font-body hover:underline">
                View Gallery <ImageIcon size={16} />
              </button>
            </div>
            
            <div className="bg-card rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 group hover:bg-background transition-colors border border-transparent hover:border-border">
              <div className="w-full md:w-32 h-20 rounded bg-accent grayscale group-hover:grayscale-0 overflow-hidden transition-all">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Orientation" 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-accent text-muted-foreground rounded font-body">Oct 15, 2023</span>
                  <span className="text-xs text-destructive font-medium uppercase font-body">Closed</span>
                </div>
                <h4 className="text-lg font-bold text-primary font-heading">Freshers' Orientation 2023</h4>
              </div>
              <button className="text-primary font-semibold flex items-center gap-2 font-body hover:underline">
                View Gallery <ImageIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
