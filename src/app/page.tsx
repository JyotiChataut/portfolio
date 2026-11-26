import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Credentials } from '@/components/Credentials'
import { Hero } from '@/components/Hero'
import { Hobbies } from '@/components/Hobbies'
import { Navbar } from '@/components/Navbar'
import { Skills } from '@/components/Skills'
import { Work } from '@/components/Work'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Hobbies />
      <Skills />
      <Credentials />
      <Contact />
    </main>
  )
}
