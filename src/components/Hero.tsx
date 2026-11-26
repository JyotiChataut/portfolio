'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { WeaveGrid } from './WeaveGrid'

const IMAGE_COUNT = 10

const IMAGE_ALTS = [
  'Colorful yarn craft project',
  'Handmade crochet textile detail',
  'Woven pattern close-up',
  'Textured fabric composition',
  'Artisan craft workspace',
  'Decorative stitch pattern',
  'Fiber art installation',
  'Natural dye color study',
  'Handwoven wall hanging',
  'Crochet garment detail',
]

function shuffledIndices(): number[] {
  const arr = Array.from({ length: IMAGE_COUNT }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function Hero() {
  const [imageOrder, setImageOrder] = useState<number[]>(() => Array.from({ length: IMAGE_COUNT }, (_, i) => i))
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const focusRestoreRef = useRef<HTMLElement | null>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)

  useEffect(() => {
    setImageOrder(shuffledIndices())
  }, [])

  useEffect(() => {
    if (lightboxIndex !== null || paused || reduceMotion) return
    const interval = setInterval(() => {
      setImageOrder(shuffledIndices())
    }, 5000)
    return () => clearInterval(interval)
  }, [lightboxIndex, paused, reduceMotion])

  const openLightbox = useCallback((imgIdx: number, el: HTMLElement) => {
    focusRestoreRef.current = el
    setLightboxIndex(imgIdx)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    requestAnimationFrame(() => focusRestoreRef.current?.focus())
  }, [])

  const prevImage = useCallback(
    () => setLightboxIndex((p) => (p !== null && p > 0 ? p - 1 : p)),
    [],
  )

  const nextImage = useCallback(
    () =>
      setLightboxIndex((p) =>
        p !== null && p < IMAGE_COUNT - 1 ? p + 1 : p,
      ),
    [],
  )

  useEffect(() => {
    if (lightboxIndex === null) return
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevImage()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextImage()
      } else if (e.key === 'Tab') {
        const focusables = lightboxRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled)')
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, closeLightbox, prevImage, nextImage])

  useEffect(() => {
    if (lightboxIndex !== null) {
      requestAnimationFrame(() => lightboxRef.current?.focus())
    }
  }, [lightboxIndex])

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const d = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(d) > 50) d > 0 ? prevImage() : nextImage()
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-brand-teal-deep px-4 pt-16 pb-8 sm:px-6 lg:px-8"
      aria-label="Jyoti Chataut portfolio hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,237,100,0.08),transparent_60%)]" aria-hidden="true" />

      <WeaveGrid
        className="relative mx-auto min-h-[calc(100dvh-6rem)] max-w-[1280px]"
        cellClassName="bg-brand-teal-deep"
        renderCell={(index) => {
          const imgIndex = imageOrder[index]
          if (imgIndex === undefined) return null
          return (
            <motion.button
              key={imgIndex}
              type="button"
              className="group relative h-full w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green focus-visible:outline-offset-[-2px]"
              onClick={(e) => openLightbox(imgIndex, e.currentTarget)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.4 }}
            >
              <div className="absolute inset-3 overflow-hidden rounded-lg">
                <Image
                  src={`/images/${imgIndex + 1}.jpg`}
                  alt={IMAGE_ALTS[imgIndex]}
                  fill
                  className="object-cover object-center transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 4}
                />
              </div>
            </motion.button>
          )
        }}
        feature={
          <div className="flex h-full min-h-[52dvh] flex-col justify-center px-6 py-10 sm:px-10 lg:min-h-0 lg:px-14">
            <p className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green">
              Frontend &amp; design
            </p>
            <h1 className="mt-4 max-w-[10ch] text-5xl font-medium leading-[1.05] tracking-[-1.5px] text-on-dark sm:text-6xl lg:max-w-[13ch] lg:text-7xl">
              Jyoti Chataut
            </h1>
            <p className="mt-6 max-w-[32ch] text-lg leading-[1.5] text-on-dark-muted">
              I weave code the way I crochet: stitch by stitch, with care for how each thread connects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold leading-[1.3] text-on-primary transition-colors hover:bg-brand-green-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
              >
                View work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-hairline-dark px-6 py-2.5 text-sm font-semibold leading-[1.3] text-on-dark transition-colors hover:border-brand-green hover:text-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
              >
                Start a thread
              </a>
            </div>
          </div>
        }
      />

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            ref={lightboxRef}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-6"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            onClick={closeLightbox}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${lightboxIndex + 1} of ${IMAGE_COUNT}`}
          >
            <motion.div
              className="relative flex max-h-[96vh] max-w-[98vw] items-center justify-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={prevImage}
                disabled={lightboxIndex === 0}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-hairline-dark bg-canvas-dark font-mono text-lg text-on-dark transition-colors hover:border-brand-green disabled:cursor-not-allowed disabled:opacity-15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green focus-visible:outline-offset-2"
                aria-label="Previous image"
              >
                &#8592;
              </button>

              <div className="flex items-center justify-center overflow-hidden">
                <img
                  key={lightboxIndex}
                  src={`/images/${lightboxIndex + 1}.jpg`}
                  alt={IMAGE_ALTS[lightboxIndex]}
                  className="max-h-[92vh] max-w-[95vw] rounded-lg object-contain"
                  draggable={false}
                />
              </div>

              <button
                type="button"
                onClick={nextImage}
                disabled={lightboxIndex === IMAGE_COUNT - 1}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-hairline-dark bg-canvas-dark font-mono text-lg text-on-dark transition-colors hover:border-brand-green disabled:cursor-not-allowed disabled:opacity-15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green focus-visible:outline-offset-2"
                aria-label="Next image"
              >
                &#8594;
              </button>

              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-hairline-dark bg-canvas-dark font-mono text-xs text-on-dark transition-colors hover:border-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green focus-visible:outline-offset-2"
                aria-label="Close lightbox"
              >
                &#x2715;
              </button>

              <p className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-canvas-dark px-3 py-1 font-mono text-xs tracking-[0.12em] text-on-dark">
                {lightboxIndex + 1} / {IMAGE_COUNT}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
