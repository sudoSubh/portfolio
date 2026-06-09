import Hero from "@/components/hero"
import Experience from "@/components/Experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Certifications from "@/components/certifications"
import Contact from "@/components/contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl space-y-20 py-10">
      <Hero />
      <Skills />
       <Projects/>
      <Experience />
      <Certifications />
       <Contact />
       <Footer />
    </div>
  )
}
