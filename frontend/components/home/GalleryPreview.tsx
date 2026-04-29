import * as React from "react"

interface GalleryImage {
  src: string
  alt: string
  className?: string
}

interface GalleryPreviewProps {
  title: string
  description: string
  images: GalleryImage[]
}

export function GalleryPreview({ title, description, images }: GalleryPreviewProps) {
  return (
    <section className="py-24 bg-accent/30">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-primary mb-4 font-heading">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((image, index) => (
            <div key={index} className={image.className || "overflow-hidden rounded-[12px] group"}>
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt={image.alt} 
                src={image.src}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
