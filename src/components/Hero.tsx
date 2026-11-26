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
  const reduceMotion = useReducedMotion()
  const focusRestoreRef = useRef<HTMLElement | null>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)

  useEffect(() => {
    setImageOrder(shuffledIndices())
  }, [])

  useEffect(() => {
    if (lightboxIndex !== null) return
    const interval = setInterval(() => {
      setImageOrder(shuffledIndices())
    }, 5000)
    return () => clearInterval(interval)
  }, [lightboxIndex])

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
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') { e.preventDefault(); prevImage() }
      if (e.key === 'ArrowRight') { e.preventDefault(); nextImage() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
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
      className="relative min-h-[100dvh] overflow-hidden px-4 pt-16 pb-4 sm:px-6 lg:px-8"
      aria-label="Jyoti Chataut portfolio hero"
    >
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <img src="/images/crochet_1.jpg" alt="" className="h-full w-full object-cover opacity-60" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/70 via-cream/30 to-transparent" aria-hidden="true" />

      <WeaveGrid
        className="relative mx-auto min-h-[calc(100dvh-5rem)] max-w-[1400px] bg-ivory/90 shadow-thread backdrop-blur-[2px] sm:min-h-[calc(100dvh-6rem)] lg:min-h-[calc(100dvh-6rem)]"
        cellClassName="bg-ivory/40"
        renderCell={(index) => {
          const imgIndex = imageOrder[index]
          if (imgIndex === undefined) return null
          return (
            <motion.button
              key={imgIndex}
              type="button"
              className="group relative h-full w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust focus-visible:outline-offset-[-2px]"
              onClick={(e) => openLightbox(imgIndex, e.currentTarget)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.4 }}
            >
              <div className="absolute inset-4 overflow-hidden">
                <Image
                  src={`/images/${imgIndex + 1}.jpg`}
                  alt={IMAGE_ALTS[imgIndex]}
                  fill
                  className="object-cover object-center transition-all duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            </motion.button>
          )
        }}
        feature={
          <div className="flex h-full min-h-[48dvh] flex-col justify-center px-6 py-10 sm:px-10 lg:min-h-0 lg:px-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-rust-text">
              Frontend & design
            </p>
            <h1 className="mt-4 max-w-[9ch] font-display text-6xl font-semibold leading-[0.9] tracking-[-0.04em] text-deep sm:text-7xl lg:max-w-[11ch] lg:text-8xl">
              Jyoti Chataut
            </h1>
            <p className="mt-6 max-w-[28ch] font-body text-lg leading-relaxed text-mocha sm:text-xl">
              I care about the space between the pixels.
            </p>
          </div>
        }
      />

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            ref={lightboxRef}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-deep/85 p-4 backdrop-blur-sm sm:p-6"
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
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-ivory/20 bg-deep/50 font-mono text-lg text-ivory opacity-80 transition-all hover:bg-rust/70 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-15"
                aria-label="Previous image"
              >
                &#8592;
              </button>

              <div className="flex items-center justify-center overflow-hidden bg-deep/10">
                <img
                  key={lightboxIndex}
                  src={`/images/${lightboxIndex + 1}.jpg`}
                  alt={IMAGE_ALTS[lightboxIndex]}
                  className="max-h-[92vh] max-w-[95vw] object-contain"
                  draggable={false}
                />
              </div>

              <button
                type="button"
                onClick={nextImage}
                disabled={lightboxIndex === IMAGE_COUNT - 1}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-ivory/20 bg-deep/50 font-mono text-lg text-ivory opacity-80 transition-all hover:bg-rust/70 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-15"
                aria-label="Next image"
              >
                &#8594;
              </button>

              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center border border-ivory/20 bg-deep/50 font-mono text-xs text-ivory opacity-80 transition-all hover:bg-rust/70 hover:opacity-100"
                aria-label="Close lightbox"
              >
                &#x2715;
              </button>

              <p className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap bg-deep/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ivory">
                {lightboxIndex + 1} / {IMAGE_COUNT}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
