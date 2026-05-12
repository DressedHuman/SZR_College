import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteContent, SiteContent } from "@/lib/api";

const fallbackContent: SiteContent = {
  college_name: "Shahid Ziaur Rahman College",
  tagline: "A premier educational institution in Dimla, Nilphamari, dedicated to academic brilliance and holistic student development.",
  hero_heading: "Shahid Ziaur Rahman College",
  hero_subtext: "Empowering Future Leaders through excellence in education, character building, and community service since 1991.",
  hero_image_url: "",
  college_logo_url: "",
  principal_name: "Prof. Dr. Zahirul Haque",
  principal_designation: "Principal, SZR College",
  principal_message: "Our mission at SZR College is to nurture curiosity and foster integrity.",
  principal_photo_url: "",
  contact_email: "info@szrcollege.edu",
  contact_phone: "+880-1234-567890",
  address: "Dimla, Nilphamari, Bangladesh",
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let siteContent = fallbackContent;
  try {
    siteContent = await getSiteContent();
  } catch {
    // use fallback
  }

  return (
    <>
      <Navbar collegeName={siteContent.college_name} />
      <main className="flex-1">
        {children}
      </main>
      <Footer
        collegeName={siteContent.college_name}
        address={siteContent.address}
        contactPhone={siteContent.contact_phone}
        contactEmail={siteContent.contact_email}
      />
    </>
  );
}
