import { Hero } from "@/components/home/Hero"
import { QuickLinks } from "@/components/home/QuickLinks"
import { NoticesAndMessage } from "@/components/home/NoticesAndMessage"
import { EventsPreview } from "@/components/home/EventsPreview"
import { GalleryPreview } from "@/components/home/GalleryPreview"

export default function Home() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <NoticesAndMessage />
      <EventsPreview />
      <GalleryPreview />
    </>
  )
}
