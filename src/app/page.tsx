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
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        <About />
        <Work />
        <Hobbies />
        <Skills />
        <Credentials />
      </main>
      <footer>
        <Contact />
      </footer>
    </>
  )
}
