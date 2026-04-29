import { Hero } from "@/components/home/Hero"
import { QuickLinks } from "@/components/home/QuickLinks"
import { NoticesAndMessage } from "@/components/home/NoticesAndMessage"
import { EventsPreview } from "@/components/home/EventsPreview"
import { GalleryPreview } from "@/components/home/GalleryPreview"

export default function Home() {
  const notices = [
    { day: "12", month: "OCT", title: "Final Examination Schedule for Honors 4th Year", description: "Detailed timeline for the upcoming final assessments..." },
    { day: "08", month: "OCT", title: "Holiday Notice for Durga Puja & Lakshmi Puja", description: "The college will remain closed from Oct 20th to Oct 28th..." },
    { day: "05", month: "OCT", title: "Orientation for HSC 1st Year Students", description: "Welcome ceremony at the central auditorium starting 10:00 AM..." },
  ]

  const principalMessage = {
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpoSpoNXmuSafFICYGSA79YIbtjUVXVqxoJooFqpAUSvDWz2ZsUT6H1VZgX9xbIr6b9_rdeWVfjbaBCNO_EeZc5eEiHnp6sZ3r4xpOVBKhL7XJsG3SQV80q0LpA4KTxNwcpIsDO8fmuKhq-1v4swT0nDmDSF2PuSAO9awjFF5420uMN_YznjEdkz-K7L08KvdoeFyejdf1Owz7e2Tzp_MMserhyOq0wODpM5rL7Mbdv0quPD209dKXhvslSPCmarOBlKPh33p2nBA",
    quote: "Our mission at SZR College is to nurture curiosity and foster integrity. We don't just teach curricula; we shape the visionary leaders of tomorrow's Bangladesh.",
    name: "Prof. Dr. Zahirul Haque",
    designation: "Principal, SZR College"
  }

  const events = [
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxNumfYmRa6U4MZg17Kd044_iBD3TuCh8BQ2FYzDZuRaSPWYsenk-EfdvhqOFOr9X6dhgBfbWwc68jWARV4Rpb-ZWWWx9qOXNAc7Q6bbh33oaDVasg0WUdXHufb9Lo7KYlE-v12hWnSPy1WIZs-bw4tno_iF8F7uknk69AltoP1iqtbvCWPKVC4MhmaEwZXTw4PlmVINu7KBZAouhJYS6RmMyZWd6QE1vuQ4OIEUWoT3kpJn6zlFaOJR83q8-7FJTY6wW5efLapY0",
      dateStr: "Nov 15, 2024",
      title: "Annual Science & Tech Fair",
      location: "Main Campus Plaza"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4DGSc0bttIQy0kKA3DCyUssVLl_XLJgJXdwMv0k-LPPbk8VRB_kwE_vyYsdQw5kAGVz11dh3BVMA3NPU2LHKOWergg5ArcWq1l7EiaSMR8dzvIsZ8FxrTFK55pNZfavGzA4YLMlHJtDZclHusxCgdI5m1hiE81DOx6-gKka_ui4Hvg_LTztrH4SloykRu443Z2l7JOml0EpKgcxhsBVWg-qEPZW4XMHz7e_RaVE8_5YBL4GF0suVKSsVSEg8azZSEGYuuU1OXwS4",
      dateStr: "Dec 02, 2024",
      title: "Inter-College Sports Week",
      location: "College Sports Complex"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxVt_DfMrK8pFdqLHgxCWAVaTkhDmES0y-57Tkou3fIxtoGFqeNrasktn7hgZ0vM8wDPqLHUcS8x7Y--NaVhp5FcDoLhYsm1I2DG9USOAiKYUrZWfXqUwVGDs-oGKJ2oemlC3qxXWTcziF6VlY0LGo1ahxmZSsk76fa6cqm9ad22RW5WgMMsnob9RGcItbmYdJ3Xv2OJWThjM2FNG6nKM8w6kbDBuP1vPIZxVH9p8_JuEXgrGlnhK_rfIU1-l-DrFvZqN_-F3OOcs",
      dateStr: "Jan 10, 2025",
      title: "Cultural Heritage Festival",
      location: "Central Auditorium"
    }
  ]

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
      <Hero />
      <QuickLinks />
      <NoticesAndMessage notices={notices} principalMessage={principalMessage} />
      <EventsPreview events={events} />
      <GalleryPreview {...galleryData} />
    </>
  )
}
