'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const links = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = links.map((link) => document.getElementById(link.id)).filter(Boolean) as HTMLElement[]
      let current = links[0].id
      for (const section of sections) {
        if (section.offsetTop - 120 <= window.scrollY) {
          current = section.id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 640) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navLink = (link: { id: string; label: string }, onClick?: () => void) => (
    <li key={link.id} className="relative">
      <a
        href={`#${link.id}`}
        onClick={onClick}
        className={`block px-3 py-1.5 font-body text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust ${
          active === link.id ? 'text-rust-text font-medium' : 'text-deep/60 hover:text-deep'
        }`}
      >
        {link.label}
      </a>
      {active === link.id ? (
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-px bg-rust"
          layoutId="nav-underline"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      ) : null}
    </li>
  )

  return (
    <>
      <motion.nav
        className={`fixed top-0 right-0 left-0 z-50 border-b py-3 backdrop-blur-md transition-colors ${
          scrolled ? 'border-greige bg-cream/90' : 'border-transparent bg-cream/0'
        }`}
        initial={reduceMotion ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="font-display text-xl font-semibold tracking-[-0.02em] text-deep">
            Jyoti Chataut
          </span>

          <ul className="hidden gap-1 sm:flex lg:gap-2">
            {links.map((link) => navLink(link))}
          </ul>

          <button
            type="button"
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] sm:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust focus-visible:outline-offset-2"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block h-px w-5 bg-deep transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`block h-px w-5 bg-deep transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px w-5 bg-deep transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-x-0 top-[49px] z-40 border-b border-greige bg-cream/95 backdrop-blur-md sm:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <ul className="mx-auto max-w-[1400px] divide-y divide-greige/40 px-4 py-2">
              {links.map((link) => navLink(link, () => setMenuOpen(false)))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
