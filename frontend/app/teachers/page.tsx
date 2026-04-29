import * as React from "react"
import { Search, ChevronDown } from "lucide-react"
import { TeacherCard } from "@/components/ui/teacher-card"

export default function TeachersPage() {
  const teachers = [
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB11fQG4qVa0ssOWPUtzPP4fD1O7qWIIp-2uC0HzzKEWNziZbnR8l9zRqlGJYMfjdizyAx8KHKuXXFrSuDf4SLPtiCldD42ige9o4GjOj-b74FT0SeDUJ2BiJnD7YtFertNyBD4HiV3dGlWmZwGGD2U0Heu8FdRpQ4_Tn7PvQqwfO6oSoVYRbU-kWws17F_kVq5bPaONOlgU5aBkK9s0HX0wmTQBb8zRv4nrtyQ3Z-I9cZv7CH6eyRiH7stgvnPI2WbGd9gC-e5sTU",
      department: "Department of Physics",
      name: "Dr. Ahmed Zubayer",
      designation: "Head of Department & Professor"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOe1jtuDb766Qy_VHhFtGhUUpKCDUVjeq0pssAclCQgaxSU0qahg1fsSxbqH37mdmfogOsDeQrtaDqkdKcKlthMf2mbv5zRirYMhP_Lz6vGu414WqF6lfJfXGhEUmTQWtxyJk_xW-N8P1xboHNOGCx6A4BCmlWzUo3zNJVPzi4v74iXk1dBxQx4Sk1IM0vc5jIFYZCUT6YNcfAPSJP70gEi7KOTT216XiV1Q21J2LjIZ7Mdo3KRozZAALIOJ1FO-9EX83V7TzhIh4",
      department: "Department of English",
      name: "Prof. Nusrat Jahan",
      designation: "Associate Professor"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSGvHEROkvoHIg3O2DJsvSOgmO5z90Y_7LE3XH2GIVe_8NbJdmyoZzk1qFKv47zCSvsfY1fjmALOCt6_yP6JACWvDLQ9Mtz0tRDFhOeyQ7N3KxsdxDcrM5fyMMnbzKQZolvOZAPtE6b7Pzo-sUMn3q2pQuh1j-pWVX_MQ-I667Vi1pung8h5RFn3yyMvqd5OGcTuquCGHN0JjLZqbzvFdM0iBJ9-17zQsOqp2G3M1YLhYofazW3ZeSptuA4RnqVk7QhuBlHFaUfB8",
      department: "Department of Biology",
      name: "Dr. Mahfuzur Rahman",
      designation: "Senior Lecturer"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfm_utVtQU_yFnvx0Dt_K7MbFqkJcrDN2wNjGgC9yMKdeiZAVqCQoH6HGEpX_tWay1Lo-7asOQO8b6RsebHW-iRucOTN28Qr_jIWF9hiSrL0do_8y4vDazo2BddBgJqp9qx6kmGEKMaxXNYlWXz7gObRwwmDitnbfirR8zM576qSWfqrCFW3xETXK3Qh5hrqzrMt5AxN4gpkZPQOs3laZIaNRFcHygqN9T7le9eFOS9bM8fX4Qk5gaaRHVcMLQa3egyi-346ERNFQ",
      department: "Department of Chemistry",
      name: "Prof. Zakir Hossain",
      designation: "Professor"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8q53273v1MgV_Vxtbz7J5X0TxBLeJi4FSHPxWW1vJXEtyYenzc03FTi-WcF2WHB2I4KBPApfPRMhRia4JXxkcDaNiE7kjQc0Qx-yfSF8_viMAaZPwvdbNQStw_jHz3az8GAPYp09Epbi2AamviJkCbHjohRHQYDjF4U8Z0ZUh_F4D-M0qJWoF_y9ILQsyw2vmrxjC7xuT0ElaVWP--x98o4obA2kOl4OlJka-HIeaxHDx5YV7Baoj_UDjXWjdyQIN2yIllxGVsIo",
      department: "Department of History",
      name: "Dr. Sarah Perveen",
      designation: "Associate Professor"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuaJyzSk9waXCk5OQ5e8_fJIQf7L5wl6T-cRMqi4IboUSVOtx1IIx7OAWiYm_QapW10j-Io6W7FMet4ItqYK9ZEu9-llQXV-_ZQYqHG5UxPY82Nc_eghxBkiCjpJBbsebp6hWYJIPE1Y1J2ojeYXa1EPLMrYUKKnPL8c-kxP32B6Jf876M_RyzEiSd7bQXwZFqXwt89wbFII16FaYgUgeQOayYKp-yKogxDfzjEbK51kMZhkzn7seMbIedJvTk-GC-uDPCW_z8sZU",
      department: "Department of Mathematics",
      name: "Mr. Kamrul Hassan",
      designation: "Lecturer"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvzZgd_qJH9YNGTCX0ipMVaeR3TCDE-CXKU8k7Lpzz_Y_uiFfIxSbD4vZCN9vyLniCdFOyi2d7ZduRPA0HOVw4qebRaWoB79amw2U283ZCDixNLvJTt9uBXR6ZjYk3C86PtnOqHgNxCenEsKcwUf5JdegR3tCk5G4UNaAwRseaSbuEGMr1CcjXpb6N94nVMwarysOzXA4Pa-c8J_qAuwX_t8YJZzbISzZQIpGB_dETAP8Fk7Rfh8BkOaBA_atzn-KTbYF8gyPQDUU",
      department: "Department of Economics",
      name: "Prof. Farhana Haque",
      designation: "Senior Professor"
    },
    {
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ7JHjAKxoVI0wv4OE0JCx5fNSmJZHREn2iiMDu4owvZsNJp3TEJa5RDtdxzeCV5qEhn9r6d4ufhFk1cdtwLhZF6_3_O_9PFxjOopCpvvijYJV5XfgC-6mZVrnFCCD4gmJ9SbAG_54tRIJ881Bw5X48I9ZFe2s8Q1foJ7DOlEp_Ilgeg12vjfXNr9HyI1Y_hx5Fw8i--bdGIrLFeDKNUNLrpSzv6tQNDmSdtdap0dQ8aaSjFONy13WtNdjTuzHnqUlEvFOwGoSbcg",
      department: "Department of Commerce",
      name: "Mr. Shafiqul Islam",
      designation: "Head of Commerce"
    }
  ]

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {teachers.map((teacher, i) => (
            <TeacherCard key={i} {...teacher} />
          ))}
        </div>

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
