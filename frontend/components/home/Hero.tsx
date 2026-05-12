import * as React from "react"
import Link from "next/link"

const DEFAULT_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuA7GnSWNJx1XM1Fy4i7cZOH2n_i4LQa371egWkJLDuIvCZM-deWkfYzO503QBM-fETs5Ofri4cDS8PxE7xVtXjdslhRQonwIkuJUTbBziuGyIsyMjeqprYqrHM9hhAl4fGRvs-FCS66CRsIexTs20D08-iB75bzkXMH2Xcu1msp88YifZxPNddd_ajfeLaWlZJtnpLbaqtl7cRM6108BwNZFbQ6mE0X-5d4ZK0G10Lvw9z_zAdvwnAjuBwkI3Ip3DjHjixVsZELJsA"

export function Hero({
  heading,
  subtext,
  address,
  imageUrl,
}: {
  heading?: string;
  subtext?: string;
  address?: string;
  imageUrl?: string;
}) {
  return (
    <section className="relative h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          alt="Modern academic building with brick facade and large windows under a clear blue sky, surrounded by green lawns and walkways"
          src={imageUrl || DEFAULT_IMAGE}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary/40 to-transparent bg-black/40"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="max-w-2xl">
          <span className="inline-block text-secondary font-semibold tracking-widest text-sm uppercase mb-4">
            {address ?? "Dimla, Nilphamari, Bangladesh"}
          </span>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tighter font-heading">
            {heading ?? "Shahid Ziaur Rahman College"}
          </h1>
          <p className="text-xl text-[#d5e3ff] mb-10 font-light max-w-lg leading-relaxed font-body">
            {subtext ?? "Empowering Future Leaders through excellence in education, character building, and community service since 1991."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/admission">
              <button className="bg-secondary text-primary px-8 py-4 rounded-[12px] font-bold text-lg hover:bg-secondary/90 transition-colors">
                Apply Now
              </button>
            </Link>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-[12px] font-bold text-lg hover:bg-white/20 transition-colors">
              Explore Programs
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
