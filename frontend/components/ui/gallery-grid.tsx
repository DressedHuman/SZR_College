import * as React from "react"

interface Photo {
  src: string
  title: string
  meta: string
}

interface GalleryGridProps {
  photos: Photo[]
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {photos.map((photo, i) => (
        <div key={i} className="break-inside-avoid group relative overflow-hidden rounded-[12px] bg-card">
          <img 
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
            alt={photo.title} 
            src={photo.src}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 className="text-white font-heading font-bold text-lg">{photo.title}</h3>
            <p className="text-white/80 text-sm font-body">{photo.meta}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
