import * as React from "react"
import { GraduationCap, Flag, Eye, Quote, ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { GoverningBody } from "@/components/ui/governing-body"

export default function AboutPage() {
  const governingBodyMembers = [
    { name: "Ahmed Kamal Pasha", designation: "Chairman", description: "Industrialist & Philanthropist" },
    { name: "Dr. Selina Begum", designation: "Vice Chairman", description: "Retired Professor of Sociology" },
    { name: "M. A. Mannan", designation: "Treasurer", description: "Chartered Accountant" },
    { name: "Dr. Farhana Yasmin", designation: "General Member", description: "Senior Education Consultant" },
  ]

  return (
    <>
      {/* Page Header */}
      <header className="relative px-8 py-24 mb-16 overflow-hidden pt-32">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-6xl md:text-7xl font-heading font-extrabold text-primary leading-tight tracking-tighter mb-4">
            About Our College
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-body leading-relaxed">
            Nurturing excellence and integrity since our inception. Discover the journey of an institution dedicated to shaping the leaders of tomorrow.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none flex items-center justify-center">
          <GraduationCap className="text-primary w-full h-full max-h-[300px]" strokeWidth={1} />
        </div>
      </header>

      {/* History Section */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="inline-block px-4 py-1 rounded-full bg-[#d5e3ff] text-[#001b3c] font-bold text-sm mb-6 font-body">ESTABLISHED 1982</div>
            <h2 className="text-4xl font-heading font-bold text-primary mb-8 tracking-tight">Our Storied Legacy</h2>
            <div className="space-y-6 text-muted-foreground leading-loose text-lg font-body">
              <p>
                Shahid Ziaur Rahman College was founded with a vision to provide accessible, high-quality education to the burgeoning youth population. Named in honor of the late president, the institution has stood as a beacon of intellectual rigor for over four decades.
              </p>
              <p>
                The initial foundation was laid on the principles of community service and academic merit. From a modest beginning with only three departments, the college has expanded into a multi-disciplinary campus that fosters both traditional scholarship and modern technical proficiency.
              </p>
              <p>
                Our historical building, a testament to neoclassical architectural influences in the region, continues to serve as the administrative heart of the campus, reminding every student of the heritage they carry forward.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[12px] overflow-hidden shadow-2xl">
              <img 
                alt="College Heritage Building" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUB17rxKbW1gl_l35JHv5Rxpathmf4LiOlcUI5guZNyFxwL64zl-lOcRUmBnbaXkECQoBWfvpsxwtpB8qeKEclhXXloO77ixX1rJfaenMxDbH0IElJmR1zoD59N7pze8yO8vqGT9uCPAmbxk-bLV4rQA4AAv1lMH74PR0TTOWk-oy7Fze9lqf0BR1366hWORe0E9Kc0rwrOSQKrKT3tjcDP5aMuvyvXSH6ueTGdVBZEh7INFPmLF-E6IP41teogPEYqJjE3vd2pW4"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary p-6 rounded-[12px] shadow-lg">
              <p className="text-primary font-heading font-bold text-2xl">42+ Years</p>
              <p className="text-primary/80 text-sm font-body">Of Academic Success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-accent/50 py-24 mb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-card p-10 rounded-[12px] shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-16 h-16 bg-[#d5e3ff] flex items-center justify-center rounded-[12px] mb-8 group-hover:scale-110 transition-transform">
                <Flag className="text-primary" size={32} />
              </div>
              <h3 className="text-3xl font-heading font-bold text-primary mb-6">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed text-lg font-body">
                To empower students from all backgrounds through innovative teaching, research, and a commitment to social responsibility, preparing them for professional success and ethical leadership in a global society.
              </p>
            </div>
            <div className="bg-card p-10 rounded-[12px] shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-16 h-16 bg-secondary flex items-center justify-center rounded-[12px] mb-8 group-hover:scale-110 transition-transform">
                <Eye className="text-[#745c00]" size={32} />
              </div>
              <h3 className="text-3xl font-heading font-bold text-primary mb-6">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed text-lg font-body">
                To be recognized as a premier center of academic excellence that fosters critical thinking, creativity, and the pursuit of truth, serving as a catalyst for regional development and intellectual progress.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Principal's Message */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="bg-card rounded-[12px] overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch">
          <div className="md:w-1/3 min-h-[400px]">
            <img 
              alt="Prof. Dr. Zahirul Haque" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-RQwn4nAHzv5jSBq5e1yGumIeIbNlqXhbpX8oAxpJoWYHgFoHYQmctyGj2ECIqBVITQZiX47TBJ-iv8PWAM0EF4yZ7QG6uPcICg2eFi2F-IMKyAc5QPld08zVXMKFq2ZpQS9iwnBvpcT5h_mOI5188EWFoIgwArcPI5NrabEoAR-zFXaX0svYIGUZFbraJuwTaz8v3Upc-AhCwcfSMms1uvcrKDSJEPlmHDdVXOL0OBAg6_0ajAO81e2IKC6aQDg4W1fa2uHv1g0"
            />
          </div>
          <div className="md:w-2/3 p-12 lg:p-16 flex flex-col justify-center bg-card">
            <Quote className="text-[#d5e3ff] mb-4 w-16 h-16" />
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">A Message from the Principal</h2>
            <div className="space-y-6 text-muted-foreground text-lg italic leading-relaxed font-body">
              <p>
                "At Shahid Ziaur Rahman College, we believe that education is not just the filling of a pail, but the lighting of a fire. Our focus is to provide an environment where every student feels challenged and supported."
              </p>
              <p>
                "We are committed to nurturing not only academic prowess but also the character and resilience necessary to navigate the complexities of the modern world. I invite you to join our community and embark on a transformative journey."
              </p>
            </div>
            <div className="mt-10">
              <p className="font-heading font-bold text-xl text-primary">Prof. Dr. Zahirul Haque</p>
              <p className="text-muted-foreground font-body">Principal & PhD in Education Policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Governing Body */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-primary mb-4">Governing Body</h2>
          <div className="h-1 w-24 bg-secondary mx-auto rounded-full"></div>
        </div>
        <GoverningBody members={governingBodyMembers} />
      </section>

      {/* Campus Overview */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">Campus Facilities</h2>
            <p className="text-muted-foreground max-w-xl font-body">State-of-the-art infrastructure designed to support a vibrant academic lifestyle and extracurricular exploration.</p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold hover:underline font-body">
            View Interactive Map
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 group relative overflow-hidden rounded-[12px] aspect-[16/9]">
            <img 
              alt="Central Library" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC251LCLcqmL-rKd8ioSfg6dC79WXuJ2nE22jaQs2cktF-EZ1HLWa3TehuXcKUE7ATfsCSd6unT0YENrbtINjbqankz4r_hhDj1lS1lxlFWd85IZtJbQBhGM0iF6EuigYnzl4TJkPeIgJtzmWQkxzS-9vTRGTsdAtmzevvPcVw-OgYTP1h33W8l0M7LbrMVZcENpHBZkI1Ryvwpbvik_c-Dfi7k4fT9M-bKOBcuwWK-dJ6Al1mX1qMF7nllPp02uYiZ1YOGFWZ3F-8"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
              <div>
                <h4 className="text-white font-heading font-bold text-2xl mb-1">Central Library</h4>
                <p className="text-white/80 font-body">Housing over 50,000 volumes and digital journals.</p>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-[12px] aspect-square md:aspect-auto">
            <img 
              alt="Science Labs" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWHIe4M-Ujwlj1XAK4SXKL9znv6hNlFMiEdAxYbakuQI6qnaIG8JGnjY6qFJ9ni1_18OpcG5FWCt2Y9pbKvjpBAb9jb_Z-Z7fkWPo3ELCkRtcmcys_vwd6zYFmWzYWuQPJ3bxu37doAW4BOfeueG70vdNqEm8Immx2yoqilRtfpCS0ecQ7zMqxPZZh_rchAQac4VNyD2lL8J0_aLv5T4_EKtEE1kEzVWVR7dCdOIYlTFp1ZWq8aesbcWAjcl1c9kiLwQxAmxWdefI"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
              <div>
                <h4 className="text-white font-heading font-bold text-2xl mb-1">Advanced Labs</h4>
                <p className="text-white/80 font-body">Specialized facilities for Physics & Chemistry.</p>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-[12px] aspect-square md:aspect-auto">
            <img 
              alt="Sports Complex" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR_7OxDcAKfotoc5mPgOYrjgS6T0EsGOwsjb9rtdjH0Vnh-82GSwcpWA7zBZ6Gu_JGEE9Q39ECfXvUx1KUDp69wkl5JXs73Iq_xyL64g9eP-KuK52GUZTiUk5QHjStyyZFGij2ctSZm1O-DeDT3jDmE-oLE3CX48eME2bYeEaFrYpCqZj8fpXusVs2FNcmEv0OC5TIMrujVBccQD9OOEuR7YtuIy_-hLzsTeI8Euh4yyCFp1pcl4nuTUaJ8XLpHqlNraabY3_BQyQ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
              <div>
                <h4 className="text-white font-heading font-bold text-2xl mb-1">Sports Complex</h4>
                <p className="text-white/80 font-body">Regional standard courts and athletic tracks.</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 group relative overflow-hidden rounded-[12px] aspect-[16/9]">
            <img 
              alt="Student Hub" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrMl26QQGv7DNfOzbngHAfMCfI2BXiF6ppqRLfkjFbSfzmfleGA6AZFxW_hGYHrrFs28lOSRS5yHZLMXKMw6UsQPnwIG0dTT0zWhnS67nUGWkyehn-WXvuLGfb74x61gAMOe0w1NXEopxnLnJJovEVHoD46I6KpjXkPy7AyMct5-t4zdzbNPzuYkxLP5i39GEP_y2MtX3M7hmfOpiIgdfa8Ydr-XAHlNKLmvZRQ5XCvQhAYaMS_bxBEJUAQo_3VJ1nYIbahyHvpBI"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
              <div>
                <h4 className="text-white font-heading font-bold text-2xl mb-1">Student Hub</h4>
                <p className="text-white/80 font-body">A vibrant social space and multi-cuisine cafeteria.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
