import * as React from "react"
import { ChevronRight, Clock, MapPin, ArrowRight, Image as ImageIcon } from "lucide-react"
import { EventCard } from "@/components/ui/event-card"
import { FeaturedEvent } from "@/components/ui/featured-event"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
  const upcomingEvents = [
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiFFOKAmN5zex8EokbbLTzWb9CnBjI9GKDLi6BcpzfSO70U0YGVq8Gdy7F38MS0Rkz31Dl0QZUzbJBMmPp94LMy_6lkSbUePAWG0yEN4eVSUiT0DuSpT_Qdbqr2V42G_dQYMQC1e1ZLXu6f_EpPm-iE4VsixBw34RQDtACabtIbBS4tgKCgvzAAyJZBlbQEUv6wkeC9r7Lr9CxRgUUEcTTmfXQMBNVJ5eHLVckCApp8VHDq6rmIK7MSuIP3bMfbgBh_CnnVvMwUHM",
      dateStr: "Jan 05, 2024",
      title: "Annual Science & Tech Fair 2024",
      location: "Main Campus Plaza"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnOcKy0pI4d4FWgIKrcsVNHf3xBJWch5Xdu_fBcaipnrQ8LwayCf2_cI6L1GjLOxbuAibXqG5GwrnRve29LJ3wgyHB13Rq2h1r2avF08iqPW50laX0JHFBd3d2YjvarOuHODmmilsgZm7bmRZqjltj1ocTlvDexleNG_jjFBJQi_sY-TxfZGiwbOVNf-eFOrv8c9xz7UaWpbsrg0wTxsTRCRW9C3ax8UylzdRX2VcJQr49w3FXplsgkIcnGrKPRlihuMU1lGVkB18",
      dateStr: "Jan 12, 2024",
      title: "Inter-College Football Finals",
      location: "College Stadium"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOewHuCjYvLfsR2fEhJmdyhGp6-FFew0t3rgHwzLm4Vi1ff2Pes9pw8inqt81uuHAXnp4RUZduTBV0GpLgnKEC17Q6wIMcAq9TD5Nmyq4DCGbyEq56xBzdEpB_Rk2_gafPeGF_BQ3xZFHDpjQ5HEmKPTbxFXgXNCPaiSkSj70qLocidr3P2uZ7kR1qY7k0QmYEvHiZgKYucNFBnRBzZ0AE_oGMUE79gM7RWWY0x5u1OPUACMTNN5ONZJ-AAbXUVA5SSQs087nSrZk",
      dateStr: "Feb 14, 2024",
      title: "Basanta Utsav: Spring Festival",
      location: "Central Auditorium"
    }
  ]

  const featuredEventData = {
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_bz5IURQaSirJPvkGiOQmQelZbhVPelQU2rT3PMr3XdpcTQ9wQUiBNC2ftcDxiSTB9OcLY5GXHLUaTTLRZTEObUspd2qVLvex6cwfNKKiEgtsYBlxCsOwGoMf9FxZnUYx67_Ft5sgDHkcqrgFwo1VSot8G76RLRKQMskTUhlv76kkewdtcy15VMfQUiQPg2TKLfJudM2nyfzE4hRfW878Q2WUawRRcwLNZqKw6CZSYS-ymyqrSEEFfoVX3cxvxrkgTA476BhZM8g",
    day: "16",
    month: "Dec",
    title: "Victory Day Celebration: 53rd Bijoy Dibosh",
    description: "Join us for a day of patriotic fervor as we commemorate our national heroes through cultural performances, poetry recitals, and a grand flag-hoisting ceremony.",
    time: "09:00 AM — 04:00 PM",
    location: "Main College Playground",
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
        <FeaturedEvent {...featuredEventData} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, i) => (
            <EventCard key={i} {...event} />
          ))}
        </div>
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzP5H_LdHnpA7DRqJnRlZef6kT2niT5XXKbUk_6PZCeBzhGstpuT-lzXpJH9L2BzHxtQ_QhjzTZjkYG117qmlSWscLsZ2194QoY3V_hxkl-Ud0Yobl8YXywUQiz0GC_JO2GdstuBL9rQNtjmtZ1iqKwjMk2Pd1AS8h0TRiMgGYrk1wqof9SQku98gFZoOuzQOb2dEuKK-LNueCIxLeabMNeqntoYmzBQoEcSEd4EcbzEdr1Nr_1KKefzc8ovXkfHPXT0pCXI9SbLk"
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDh6_N8OcIVATD06RjL1zHq4CN9myKA27Ce7a5Kwq7dXziRGLoMFagTelHxGuSlyOL0YjELfECQ-vZYjFWuGX1M8N6yOduXxF66bqJN3lT9gF6JyWn5Jk6tao4O6kujkTr9guNfoen9KHe1MiC9qmpjPTEqOeZYPPkRCexf16hWwaMNIEbiXB_NLi4fWXQi10FCC4nSB4QQDiEUPi_Ll5YEjvpbuX5oZI9VefCRhWLTaZV4KcaGkm1-8WZPCFQNYZX8yZJgLG_o7w"
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
