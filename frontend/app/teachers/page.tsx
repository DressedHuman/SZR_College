import * as React from "react"
import { Search, ChevronDown } from "lucide-react"
import { TeacherCard } from "@/components/ui/teacher-card"
import { getTeachers } from "@/lib/api"

export default async function TeachersPage() {
  let teachers: any[] = [];

  try {
    const rawTeachers = await getTeachers();
    teachers = rawTeachers.map(t => ({
      imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop", // Placeholder for image as API doesn't have it
      department: t.department,
      name: t.user.name,
      designation: t.designation,
      email: t.user.email
    }));
  } catch (error) {
    console.error("Failed to fetch teachers:", error);
  }

  return (
    <>
      {/* Hero / Page Header */}
      <header className="max-w-7xl mx-auto px-8 py-16 md:py-24 mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-secondary font-semibold tracking-widest uppercase text-xs mb-4 block font-body">Academic Excellence</span>
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-primary tracking-tight leading-[1.1]">
              Our Faculty
            </h1>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-xl font-body">
              Guided by some of the most distinguished minds in academia, our faculty members are committed to nurturing intellectual curiosity and professional growth.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-accent p-6 rounded-[12px] text-center min-w-[120px]">
              <span className="block text-3xl font-bold text-primary font-heading">120+</span>
              <span className="text-xs text-muted-foreground font-medium font-body">Educators</span>
            </div>
            <div className="bg-[#d5e3ff] p-6 rounded-[12px] text-center min-w-[120px]">
              <span className="block text-3xl font-bold text-[#1f477b] font-heading">15+</span>
              <span className="text-xs text-[#1f477b] font-medium font-body">Departments</span>
            </div>
          </div>
        </div>
      </header>

      {/* Department Filter Tabs */}
      <section className="sticky top-[72px] z-40 bg-background/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-6 border-b border-border">
            <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap font-body">
              All Faculty
            </button>
            <button className="bg-accent text-muted-foreground hover:bg-accent/80 px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap font-body">
              Science
            </button>
            <button className="bg-accent text-muted-foreground hover:bg-accent/80 px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap font-body">
              Arts
            </button>
            <button className="bg-accent text-muted-foreground hover:bg-accent/80 px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap font-body">
              Commerce
            </button>
            <div className="ml-auto flex items-center bg-accent px-4 py-2 rounded-[12px]">
              <Search className="text-muted-foreground text-sm mr-2" size={16} />
              <input className="bg-transparent border-none focus:ring-0 text-sm p-0 w-48 placeholder:text-muted-foreground/60 font-body outline-none" placeholder="Search by name..." type="text" />
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="max-w-7xl mx-auto px-8 mt-12 mb-20">
        {teachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {teachers.map((teacher, i) => (
              <TeacherCard key={i} {...teacher} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No faculty members found at the moment.</p>
          </div>
        )}

        {/* Pagination/Load More */}
        <div className="mt-20 flex justify-center">
          <button className="bg-accent border border-border text-primary px-8 py-3 rounded-[12px] font-semibold hover:bg-accent/80 transition-all flex items-center font-body">
            Load More Faculty Members
            <ChevronDown className="ml-2" size={16} />
          </button>
        </div>
      </section>

      {/* Signature Component: Information Veil */}
      <section className="mb-32 max-w-7xl mx-auto px-8">
        <div className="relative rounded-2xl overflow-hidden h-[400px] flex items-center justify-center text-center px-6">
          <div className="absolute inset-0 bg-[#003366]">
            <img 
              className="w-full h-full object-cover opacity-30 mix-blend-overlay" 
              alt="Library" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqocvOUMuZ9uxICut0tcfQ-V0EZluWjCnORxnBAVsy3g72G7G2InYcQVrPqj4ab7dp0E-uBUFpgKj5rszbu_xM0ftCJ2G6rkaNicGWhKMugHFwz3cZGJQ0qe3b-GLfe2TvvnGlOEg7dL4ebn904WD9FBr403YvfXQh6QhePrz6a9VqDTlP9TR0f3XFU8fdNXgfNtxg8HrsOmsbCclVSS2mPDXTSQJxTCOrakol4F0jwtfznaiTrekfJ-Erbuw3NFqm6_KP_e7qv7o"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/80 to-primary"></div>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">Join Our Distinguished Team</h2>
            <p className="text-blue-100 text-lg mb-8 opacity-90 leading-relaxed font-body">
              Are you an expert in your field with a passion for teaching? We are always looking for exceptional educators to join our community.
            </p>
            <button className="bg-secondary text-[#745c00] px-8 py-3 rounded-[12px] font-bold hover:shadow-xl transition-all font-body">
              View Career Opportunities
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
