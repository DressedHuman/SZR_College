import * as React from "react"
import { Search, ChevronDown, PlayCircle } from "lucide-react"
import { GalleryGrid } from "@/components/ui/gallery-grid"

export default function GalleryPage() {
  const photos = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6AHkvEEsIc1tKxno8IbJx8M29BfsL0vrfYwoTU6K1ertWl_V3V3tLYTEoTgHMn9xAdXtDE-OgubxeQCF1G0aD0cSiXEUSQ7MCUjzo43CehCrN356G8_76rjn85plH2KSLznXODnEWmZtky7b6jD9lddnKlGXc-GUiJWs9Lv5f5R1n1H7Iu63-PhAqISXVXMVenlHTkgu1tFbmWHgj9cZhPP_d7AIB_W5LgUYNGFkDb2N4PbQeWu-XZbp-4UsxAU5eX5jLAkoTnss",
      title: "Main Administrative Block",
      meta: "Campus Heritage • 2024"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi7HrPmlORk9mB41K0B_C5TUTUsCwz5QOomHxlYPXfHTSrnfDrgyfTcvT20g-2yZqgt0EJcw6DwkHaUZZ4iNfv7QlMuAuEl8bE80FQHyofHmO-oiwfmmj_AaLAbuSX9drO25_VH3OH0MoFzEXYSmeCt1QMC2YWMCoWymHuI7X8Ur_egGaD1vct7GvWE2q_qtOtC07uHXacsrUZD3TBO-ybBQZa9t5rhlkwMl2uc00UXsbTNKGVvmQTuc-nyENnhv2TdnpaecYPg5g",
      title: "Commencement Ceremony",
      meta: "Events • May 2024"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVYHp0yVrmRtg1KDCm_BcigZrGnKOWRosb_J_lT2UthFbVbpMNRpfvYh4yAJt0ZRZrl3vgkRnYPV9nVwgMeM79SpcE02hZ2NVeg9WFsdYGtx9UGlkAnqt6V9lpIsG33enL5DHh5DglM-D8lZCLqwaYU-fOJhN0yZVyPstjc2APoWe0GBwqnF4139JvnK8JAwc9Tm5tSWn76cafOlZFYQ8GjV8oUwJy1KCYLBoxxUF7HvepYC4dZsSQVXBd_kwIgSAYUfvy2VcD4JY",
      title: "Advanced Research Lab",
      meta: "Academic • Jan 2024"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZqt-U5QA48Vjqj2XX0m_hIa2gIPA-eVdTcnXX_KNzXW_ot-q6z5mR7SkXBF7ENgolbFNCgz-hagjxO0jYwv6OuDj1ZkYq3Z2x8cyb90uL0qqAXa3bRgCSx-dERyKTpR7F-hA0-olPKKaidBfSDgXNAXcdNcdA_Oec6qA4HGw2xKlbN8IYGHxjz6fvki9xgL4NDtlYurUdUSPucRLPkHzmdnPOCJaKMbBaPZ49DqBQk0f1RhuEs8_LW2Vbtk-o7-CyOh2BKHxtZzo",
      title: "Annual Sports Meet",
      meta: "Sports • Feb 2024"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdy2cWTcKDFs7WmmG0bRAGw5CNPHs0yk5P4JnA2pnV-4QJKgWGcijMRwDhk05_Vthjy5wkMHRyL5YuzDrlVBihEhNn7uRPAJibWFq7PuHYDLH4LFovMeaHgYy1U81gvIi6KV-05aLTGKP5iO2-PYLBMJL2Fh6MV0bjrJTxZ69Qe3ySiBKYDu-_my7uG9qlWX_Bgb8xLS62yTZS6CD4MNzEMMhjHv-G5718I6ppR_jqXuz4sGDfSVOlKVpD1ThJw-rtd7I1hq2jY4k",
      title: "Central Library",
      meta: "Campus • 2024"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwzzP-Ocide7D0XtWHFZTWVGfQiG9Q4KDMmiXF2Pp6P4Akeu3xi1QHWBNu9uAuLtb60LqH1tj4U5-0EDTetAIjHEoKkIyMsModXI1w9bZ-w2vRnwyBoCb3kZtHUO5ZgbBSMMwcgR8ozjS5uWH5TSfrrV1Yd-JfotcWItcCk5BPmvZzQTVadPj4lCv7ZHkVC8M_6SEtyCR9IoDM8rkjskFfo860Kf_tG9b32ENU2WultKYbL_kOCNeeQrPxtAIml48MMfzvRd3ITr8",
      title: "Cultural Excellence Gala",
      meta: "Events • March 2024"
    }
  ]

  return (
    <>
      {/* Page Header */}
      <section className="px-8 py-16 md:py-24 max-w-7xl mx-auto mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block font-body">Visual Journey</span>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-primary tracking-tight leading-none mb-6">Life at SZR College</h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-body">
              A curated archive of academic excellence, cultural vibrancy, and the enduring spirit of our campus community.
            </p>
          </div>
          <div className="hidden lg:block pb-2">
            <div className="flex items-center gap-2 text-muted-foreground font-medium font-body">
              <span className="w-12 h-[2px] bg-border"></span>
              <span>Est. 1978</span>
            </div>
          </div>
        </div>
      </section>

      {/* Album Categories / Filter */}
      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm px-8 py-6 border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 md:gap-4 items-center overflow-x-auto no-scrollbar">
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold transition-all font-body">All</button>
          <button className="text-muted-foreground hover:bg-accent px-6 py-2.5 rounded-full font-medium transition-all font-body">Campus</button>
          <button className="text-muted-foreground hover:bg-accent px-6 py-2.5 rounded-full font-medium transition-all font-body">Events</button>
          <button className="text-muted-foreground hover:bg-accent px-6 py-2.5 rounded-full font-medium transition-all font-body">Academic</button>
          <button className="text-muted-foreground hover:bg-accent px-6 py-2.5 rounded-full font-medium transition-all font-body">Sports</button>
        </div>
      </section>

      {/* Photo Grid (Masonry) */}
      <section className="px-8 py-12 max-w-7xl mx-auto">
        <GalleryGrid photos={photos} />
        
        <div className="mt-12 text-center">
          <button className="group inline-flex items-center gap-2 font-bold text-primary hover:text-secondary transition-colors font-body">
            Load More Moments
            <ChevronDown className="group-hover:translate-y-1 transition-transform" size={16} />
          </button>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-primary text-white py-24 mt-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-24"></div>
        <div className="px-8 max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#ffe088] font-bold tracking-widest uppercase text-sm mb-4 block font-body">Visual Experience</span>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6 tracking-tight">Campus Tour & Highlights</h2>
              <p className="text-[#d5e3ff] leading-relaxed text-lg mb-8 max-w-lg font-body">
                Immerse yourself in the SZR College experience through our curated video stories. From historic halls to dynamic student life.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 group cursor-pointer bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-colors">
                  <div className="w-16 h-10 bg-secondary rounded flex items-center justify-center text-primary">
                    <PlayCircle size={24} />
                  </div>
                  <div>
                    <p className="font-bold font-body">2024 Welcome Orientation</p>
                    <p className="text-sm text-[#d5e3ff]/60 font-body">Duration: 12:45</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-colors">
                  <div className="w-16 h-10 bg-white/20 rounded flex items-center justify-center">
                    <PlayCircle size={24} />
                  </div>
                  <div>
                    <p className="font-bold font-body">Academic Achievement Awards</p>
                    <p className="text-sm text-[#d5e3ff]/60 font-body">Duration: 08:30</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                className="w-full h-full object-cover" 
                alt="Video thumbnail" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkLalbqnDheRRt-2EHh7mRs9jcxbecI9Yr9FFZvNnDXXvWW-G-KgKUVArcaSf64nVFg93XCEuMK0b3QMzx5JsBCxpVI4n-4PfRWoaRAhhQ8K0fQlXN8q6HziZujWbElo4z9LrB0XOdTXsIswCKOk-2qHvjcwgXlPkA6j5YH4kAyaxDSOzoKNGyS78NqFQHbux77HrX-uoeijMqXQqtOTirgcSUEXCA7S74XlcWlsHgjI-bavG6pNnD4ZOsHlby-9kqRGLRHR6_12Q"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group cursor-pointer">
                <div className="w-20 h-20 bg-secondary text-primary rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <PlayCircle size={40} className="fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
