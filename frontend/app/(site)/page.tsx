import { Hero } from "@/components/home/Hero"
import { QuickLinks } from "@/components/home/QuickLinks"
import { NoticesAndMessage } from "@/components/home/NoticesAndMessage"
import { EventsPreview } from "@/components/home/EventsPreview"
import { GalleryPreview } from "@/components/home/GalleryPreview"
import { getNotices, getEvents, getSiteContent, SiteContent } from "@/lib/api"

const DEFAULT_PRINCIPAL_PHOTO = "https://lh3.googleusercontent.com/aida-public/AB6AXuBpoSpoNXmuSafFICYGSA79YIbtjUVXVqxoJooFqpAUSvDWz2ZsUT6H1VZgX9xbIr6b9_rdeWVfjbaBCNO_EeZc5eEiHnp6sZ3r4xpOVBKhL7XJsG3SQV80q0LpA4KTxNwcpIsDO8fmuKhq-1v4swT0nDmDSF2PuSAO9awjFF5420uMN_YznjEdkz-K7L08KvdoeFyejdf1Owz7e2Tzp_MMserhyOq0wODpM5rL7Mbdv0quPD209dKXhvslSPCmarOBlKPh33p2nBA"

export default async function Home() {
  let notices: any[] = [];
  let events: any[] = [];

  let siteContent: SiteContent | null = null;
  try {
    siteContent = await getSiteContent();
  } catch {
    // use hardcoded fallbacks below
  }

  try {
    const [rawNotices, rawEvents] = await Promise.all([
      getNotices(),
      getEvents()
    ]);

    notices = rawNotices.slice(0, 6).map(n => {
      const date = new Date(n.published_at);
      return {
        day: date.getDate().toString().padStart(2, '0'),
        month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
        title: n.title,
        description: n.content.substring(0, 100) + (n.content.length > 100 ? '...' : '')
      };
    });

    events = rawEvents.slice(0, 3).map(e => {
      const date = new Date(e.date);
      return {
        imageSrc: e.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
        dateStr: date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        title: e.title,
        location: e.location || "Main Campus"
      };
    });
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    // Fallback or empty state managed by components
  }

  const principalMessage = {
    imageSrc: siteContent?.principal_photo_url || DEFAULT_PRINCIPAL_PHOTO,
    quote: siteContent?.principal_message ?? "Our mission at SZR College is to nurture curiosity and foster integrity. We don't just teach curricula; we shape the visionary leaders of tomorrow's Bangladesh.",
    name: siteContent?.principal_name ?? "Prof. Dr. Zahirul Haque",
    designation: siteContent?.principal_designation ?? "Principal, SZR College",
  }

  const galleryData = {
    title: "Life at SZR College",
    description: "Explore our vibrant campus, state-of-the-art facilities, and the diverse community that makes us unique.",
    images: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4wmhEPnXcgvLtQ3rc7BgFfSLxpioYlZfdQ_wMEwBmMXG4akhfockDqMadbt3DgCtcw3y6sfmD5SWdYRAdQ6S3ixuZlL-4fod_D7H7UdONoygFqVMNlb-Rd7ZuzQqGR48o3q3aMmm0mQYJcvYKP2PSjMgmU21o3OPvArRRKKCFT1m5_-X3GiY64VbiJMFs0jK6AHvP2xO48qz1oNJDr_ITAhz48SLTowUNXfA8SlIheA_pqQpUPolI2PTnMaXkz7vFb-i33tq-3fk",
        alt: "Large college library",
        className: "row-span-2 col-span-2 overflow-hidden rounded-[12px] group"
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFaj6-4wOP3px3vaW7c2D4ogC_YB0xjez6wEDmlXJpz-1lm7J_rN4-Vr03sSSP7JsJe99DdulYjTjI3d9sn1egpI99kAyKSAHHV2yXctW8bs0qlVaA-SLoF14zICGTP6IMjP7Ewdt3m4X1dcHF6AMtbfeMxesXYs6-2kwLoUIY7RpDNO1d_-XLFP-htbRGHhgpx_PHA5S7R3o5Q0BeZFPpjcwdtRdUGxNoLe87zvB0Y3aRAOXW5WY4bM4tj9igBeJD42Pa74-O44M",
        alt: "Chemistry lab"
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg-s9d-ohh6qdhTPuD8JNduwuic5mZ03joLGoLCEaESE82oB49ZOaUMTznv7t_qFQRyt-RJXXQ_zYiYPvU1F1UXCt4FZet7B-NXkhzfK_wS0kflyLsQVN7CydOYEUZdZnV76zEwEAFK9WKtAS4FNEezr4_XSJ9ZOYIvvTH6H7DFwVJDdnRQLW6Ywom5wJnBIWJh3gC__Hx-U9xHZ3X2MvyqHBplSk2gm84_W2Xyot4nYHJlNKmCmLrj5gCNcewp8tdyqtm7rbfKlM",
        alt: "Students on lawn"
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCUfDjHWIZEy63pAcXu-saWjgyXwK0eiheGYLu1BZj43VZTFxPxYNqlxL-DurnQpGPiKr9eZbKOzLzvV5HdpCeOpQ5eI3CqiHndWpzM5Qezg5TerokRDh545EUjQ1lLMj1AFRumPhnVIPS6RtcwtiUz2_36V4AyI4_2VVC1aa7vyUI2ZSqKH-RJ_vjlMS9DSJaqKvgYIotohqDASb_wQ4RY4MdsR6Sqc8bNd49C_aA33dv-ul5cKhIQl3kvlVsJqBi9mSA4AyzlXQ",
        alt: "Aerial view of campus",
        className: "col-span-2 overflow-hidden rounded-[12px] group"
      }
    ]
  }

  return (
    <>
      <Hero
        heading={siteContent?.hero_heading}
        subtext={siteContent?.hero_subtext}
        address={siteContent?.address}
        imageUrl={siteContent?.hero_image_url}
      />
      <QuickLinks />
      <NoticesAndMessage notices={notices} principalMessage={principalMessage} />
      <EventsPreview events={events} />
      <GalleryPreview {...galleryData} />
    </>
  )
}
