'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

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
  const menuRef = useRef<HTMLUListElement>(null)

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

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      requestAnimationFrame(() => menuRef.current?.querySelector('a')?.focus())
    }
  }, [menuOpen])

  const navLink = (link: { id: string; label: string }, onClick?: () => void, layoutId = 'nav-underline') => (
    <li key={link.id} className="relative">
      <a
        href={`#${link.id}`}
        onClick={onClick}
        className={`block px-3 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green ${
          active === link.id ? 'font-semibold text-brand-green-dark' : 'font-medium text-slate hover:text-ink'
        }`}
      >
        {link.label}
      </a>
      {active === link.id ? (
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brand-green"
          layoutId={layoutId}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      ) : null}
    </li>
  )

  return (
    <>
      <motion.nav
        className={`fixed top-0 right-0 left-0 z-50 border-b transition-colors ${
          scrolled ? 'border-hairline bg-canvas' : 'border-hairline bg-canvas'
        }`}
        initial={reduceMotion ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="flex items-center gap-2 font-display text-xl font-medium tracking-[-0.02em] text-ink">
            <span className="h-4 w-4 rounded-full bg-brand-green" aria-hidden="true" />
            Jyoti Chataut
          </span>

          <div className="flex items-center gap-4">
            <ul className="hidden gap-1 md:flex">
              {links.map((link) => navLink(link, undefined, 'nav-underline-desktop'))}
            </ul>

            <button
              type="button"
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green focus-visible:outline-offset-2"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={`block h-0.5 w-5 bg-ink transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            className="fixed inset-x-0 top-16 z-40 border-b border-hairline bg-canvas md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <ul ref={menuRef} className="mx-auto max-w-[1280px] divide-y divide-hairline px-4 py-2">
              {links.map((link) => navLink(link, () => setMenuOpen(false), 'nav-underline-mobile'))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
