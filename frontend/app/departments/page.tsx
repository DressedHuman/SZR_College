import * as React from "react"
import { FlaskConical, Palette, Landmark, Microscope, TestTube, Calculator, Zap, Monitor, BookOpen, History, Languages, Users, Gavel, Library, Theater, Building, Briefcase, TrendingUp, BarChart, ShoppingCart, PieChart, BriefcaseBusiness, Lightbulb } from "lucide-react"
import { FacultySection } from "@/components/ui/faculty-section"

export default function DepartmentsPage() {
  const scienceFaculty = {
    id: "science",
    title: "Science Faculty",
    subtitle: "Discovery & Innovation",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzhbl9oa-NMEL5GJYO9KqOtRxHdIIs18o5pEmk08iONInbGgU32AFvJinb8yFB-3xVlGifSjx7SOUnCo6B1XKmo2VYMKgeEvkYCFxdHeQEzwQAehyvkyJ8BZA30DBNZdYrNg01D-L_QC1_5GVMWu1Vzv8L8uvbgDkrZ_XA4CaiMMFwmfb0JwLELYXDYpZy-BdXgtsE9elvR8_972okNzj1akyTPKBv9D7fEq1ZtZkkMFZDVy-bIy7BBcLZKv_gBi1tZP3xCzqyAac",
    deanName: "Prof. Dr. Ahmed Al-Amin",
    deanQuote: "Empowering the next generation of innovators through rigorous empirical research.",
    subjects: [
      { icon: Microscope, name: "Biology" },
      { icon: TestTube, name: "Chemistry" },
      { icon: Calculator, name: "Mathematics" },
      { icon: Zap, name: "Physics" },
      { icon: Monitor, name: "ICT" },
    ],
    facilities: [
      { icon: Monitor, title: "Computational Center", description: "Equipped with 50+ high-performance workstations for data science and algorithmic research.", isDark: true },
      { icon: TestTube, title: "Central Wet Lab", description: "Advanced chemical and biological testing environment with industrial-grade safety protocols." },
    ],
  }

  const artsFaculty = {
    id: "arts",
    title: "Arts Faculty",
    subtitle: "Culture & Humanities",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIjB9QjwGt-UMXVbuGCHc4w8ckLnm44HMrbOl7UX4_sxxfttGkLlWzDz-od_-1QpNfiq5JLLPZWQayp_0daptQzCebWhm3hxbWrZzGLl1j8pl4i0M9jdeW1n5cUhVqPhBnlNCt-jMWzAGR0TNgiRdaKkAXYutgnC2DJZiOga_0lBtKIaTM7ONC2ciU99Jj06WOZxl7ivgYk7OnC5s9j2GAW0Ljoc53bhZE2xpjqVd8MwhYMdUrUau1SonAy-0K5djfyhlAhJb9Xbw",
    deanName: "Prof. Syeda Jahanara",
    deanQuote: "Nurturing the soul through literature and critical social analysis.",
    subjects: [
      { icon: BookOpen, name: "Literature" },
      { icon: History, name: "History" },
      { icon: Languages, name: "Bengali" },
      { icon: Users, name: "Sociology" },
      { icon: Gavel, name: "Civics" },
    ],
    facilities: [
      { icon: Library, title: "Central Archive", description: "Access to over 15,000 physical volumes and a vast digital humanities database." },
      { icon: Theater, title: "Cultural Hub", description: "A dedicated space for debate, theatrical performance, and artistic expression.", isDark: false },
    ],
    reverse: true,
  }

  const commerceFaculty = {
    id: "commerce",
    title: "Commerce Faculty",
    subtitle: "Leadership & Finance",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgzWfQlv6w-MvrtoyllLS4S5XFh6nd5LxUfIbbpW8cMnoe76nGmK43_ezFjJY2AKQmdBqVMzsX4K2Ew6Zbxqt-vec3Aiaf9rEN5b1O19rQlv11edvKwF2GYa9qAdh4H67Tq8BG8NSNaM6pRy0bTfvMj2Wa-PjkkeBZB4BKffBSyl3bCiQFnmmkG5SFKJba0LGm_ZX1dcYshyM1sHdPSJz-57SSXBUj5iVEiivSrrLMn1YM6rKnybh5xEFjIg7pHFM6RilRAefbo4Y",
    deanName: "Prof. Mamunur Rashid",
    deanQuote: "Bridging the gap between academic theory and global market dynamics.",
    subjects: [
      { icon: Building, name: "Accounting" },
      { icon: TrendingUp, name: "Management" },
      { icon: BarChart, name: "Finance" },
      { icon: ShoppingCart, name: "Marketing" },
      { icon: PieChart, name: "Statistics" },
    ],
    facilities: [
      { icon: BriefcaseBusiness, title: "Business Simulation Lab", description: "Real-world stock market monitoring and business case-study workspace." },
      { icon: Lightbulb, title: "Entrepreneurship Hub", description: "Incubation space for student-led startups and professional networking events.", isDark: true },
    ],
  }

  return (
    <>
      {/* Page Header */}
      <header className="px-8 py-16 md:py-24 max-w-7xl mx-auto mt-20">
        <div className="max-w-4xl">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-primary tracking-tight leading-none mb-6">
            Academic <br/><span className="text-secondary">Departments</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light leading-relaxed font-body">
            A legacy of academic excellence across diverse disciplines. Our departments are structured to foster critical thinking, research, and professional development in a modern learning environment.
          </p>
        </div>
      </header>

      {/* Department Navigation Shell */}
      <section className="bg-accent/50 py-4 mb-16">
        <div className="max-w-7xl mx-auto px-8 flex gap-8 overflow-x-auto no-scrollbar py-2">
          <a className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-card rounded-[12px] shadow-sm border-b-2 border-primary" href="#science">
            <FlaskConical className="text-primary" size={20} />
            <span className="font-bold text-primary font-body">Science Faculty</span>
          </a>
          <a className="flex items-center gap-2 whitespace-nowrap px-4 py-2 hover:bg-card transition-all rounded-[12px]" href="#arts">
            <Palette className="text-muted-foreground" size={20} />
            <span className="font-medium text-muted-foreground font-body">Arts Faculty</span>
          </a>
          <a className="flex items-center gap-2 whitespace-nowrap px-4 py-2 hover:bg-card transition-all rounded-[12px]" href="#commerce">
            <Landmark className="text-muted-foreground" size={20} />
            <span className="font-medium text-muted-foreground font-body">Commerce Faculty</span>
          </a>
        </div>
      </section>

      <FacultySection {...scienceFaculty} />
      <FacultySection {...artsFaculty} />
      <FacultySection {...commerceFaculty} />
    </>
  )
}
