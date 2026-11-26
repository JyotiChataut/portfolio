'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import type { Project } from '@/data/projects'

type ProjectPatchProps = {
  project: Project
  index: number
}

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green'

export function ProjectPatch({ project, index }: ProjectPatchProps) {
  const [open, setOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const leftHeavy = index % 2 === 0

  const gallery = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [{ src: project.image, label: project.title }]

  const currentImage = gallery[activeImageIndex] || gallery[0]

  const nextImage = useCallback(() => setActiveImageIndex((prev) => (prev + 1) % gallery.length), [gallery.length])
  const prevImage = useCallback(() => setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length), [gallery.length])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
      } else if (e.key === 'ArrowRight') {
        nextImage()
      } else if (e.key === 'ArrowLeft') {
        prevImage()
      }
    }
    if (lightboxOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, nextImage, prevImage])

  return (
    <>
      <motion.article
        className={`grid overflow-hidden rounded-lg border border-hairline bg-canvas shadow-elev-2 lg:grid-cols-12 ${
          leftHeavy ? '' : 'lg:[&>div:first-child]:order-2'
        }`}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        layout
      >
        <div className={`${leftHeavy ? 'lg:col-span-7' : 'lg:col-span-5'} flex flex-col justify-between overflow-hidden border-b border-hairline bg-surface lg:border-b-0 lg:border-r`}>
          <div className="relative aspect-[16/10] w-full min-h-[300px] sm:min-h-[380px] lg:min-h-[440px]">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className={`group absolute inset-0 block h-full w-full cursor-zoom-in ${focusRing} focus-visible:outline-offset-[-2px]`}
              aria-label={`Enlarge image for ${project.title}`}
            >
              <Image
                key={currentImage.src}
                src={currentImage.src}
                alt={`${project.title} - ${currentImage.label}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top transition-opacity duration-500 motion-safe:group-hover:opacity-95"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-hairline bg-canvas px-3 py-1 text-xs font-medium text-ink shadow-sm opacity-90 transition-opacity group-hover:opacity-100">
                <svg className="h-3.5 w-3.5 text-brand-green-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                <span>Click to view</span>
              </div>
            </button>

            {gallery.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-hairline bg-canvas p-2 text-ink shadow-sm transition-colors hover:border-brand-green hover:text-brand-green-dark opacity-80 hover:opacity-100 ${focusRing}`}
                  aria-label="Previous image"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-hairline bg-canvas p-2 text-ink shadow-sm transition-colors hover:border-brand-green hover:text-brand-green-dark opacity-80 hover:opacity-100 ${focusRing}`}
                  aria-label="Next image"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            ) : null}
          </div>

          {gallery.length > 1 ? (
            <div className="flex flex-wrap items-center gap-2 border-t border-hairline bg-canvas px-4 py-2.5">
              <span className="mr-1 text-xs font-medium text-slate">
                Views:
              </span>
              {gallery.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${focusRing} ${
                    activeImageIndex === i
                      ? 'border-brand-green bg-brand-green-soft text-brand-green-dark'
                      : 'border-hairline bg-canvas text-slate hover:border-hairline-strong'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className={`${leftHeavy ? 'lg:col-span-5' : 'lg:col-span-7'} flex flex-col justify-between p-6 sm:p-8 lg:p-10`}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green">Patch 0{index + 1}</p>
            <h3 className="mt-4 font-display text-2xl font-medium leading-[1.2] text-ink sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-5 max-w-[48ch] text-base leading-[1.55] text-slate">{project.description}</p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-sm leading-6 text-slate">{project.tags.join(' / ')}</p>
            <div className="flex flex-wrap gap-3">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold leading-[1.3] text-on-primary transition-colors hover:bg-brand-green-mid ${focusRing}`}
                >
                  Live site
                </a>
              ) : null}
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className={`rounded-full border border-hairline-strong px-5 py-2.5 text-sm font-semibold leading-[1.3] text-ink transition-colors hover:border-brand-green hover:text-brand-green-dark ${focusRing}`}
              >
                Repo
              </a>
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className={`rounded-full border border-hairline-strong px-5 py-2.5 text-sm font-semibold leading-[1.3] text-ink transition-colors hover:border-brand-green hover:text-brand-green-dark ${focusRing}`}
                aria-expanded={open}
              >
                {open ? 'Close weave' : 'Unfold case'}
              </button>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                key="case-study"
                className="mt-8 overflow-hidden border-t border-hairline pt-6"
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <dl className="grid gap-5 text-sm leading-[1.5] text-slate sm:grid-cols-3">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green-dark">Problem</dt>
                    <dd className="mt-2">{project.caseStudy.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green-dark">Approach</dt>
                    <dd className="mt-2">{project.caseStudy.approach}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green-dark">Outcome</dt>
                    <dd className="mt-2">{project.caseStudy.outcome}</dd>
                  </div>
                </dl>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.article>

      <AnimatePresence>
        {lightboxOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-6 lg:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} image gallery`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-[96vw] overflow-hidden rounded-lg border border-hairline-dark bg-canvas-dark p-2 shadow-elev-4"
            >
              <div className="flex items-center justify-between border-b border-hairline-dark px-4 py-2 text-on-dark">
                <p className="text-sm font-medium text-on-dark">
                  {project.title}: <span className="text-brand-green">{currentImage.label}</span>
                  {gallery.length > 1 ? (
                    <span className="ml-2 text-on-dark-muted">
                      ({activeImageIndex + 1}/{gallery.length})
                    </span>
                  ) : null}
                </p>
                <div className="flex items-center gap-2">
                  {gallery.length > 1 ? (
                    <div className="mr-2 hidden items-center gap-1 text-xs text-on-dark-muted sm:flex">
                      <span>Use ← → keys</span>
                    </div>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(false)}
                    className={`rounded-full border border-hairline-dark px-3 py-1 text-xs font-semibold text-on-dark transition-colors hover:border-brand-green hover:text-brand-green ${focusRing}`}
                  >
                    Esc / Close
                  </button>
                </div>
              </div>
              <div className="relative mt-2 flex max-h-[82vh] items-center justify-center overflow-auto">
                <Image
                  src={currentImage.src}
                  alt={`${project.title} - ${currentImage.label}`}
                  width={1920}
                  height={1080}
                  className="max-h-[82vh] w-auto rounded-md object-contain"
                  priority
                />

                {gallery.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                      className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-hairline-dark bg-canvas-dark p-3 text-on-dark transition-colors hover:border-brand-green hover:text-brand-green ${focusRing}`}
                      aria-label="Previous image"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                      className={`absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-hairline-dark bg-canvas-dark p-3 text-on-dark transition-colors hover:border-brand-green hover:text-brand-green ${focusRing}`}
                      aria-label="Next image"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
