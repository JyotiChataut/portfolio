'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { Project } from '@/data/projects'

type ProjectPatchProps = {
  project: Project
  index: number
}

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

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

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
  }, [lightboxOpen, gallery.length])

  return (
    <>
      <motion.article
        className={`grid overflow-hidden border border-greige bg-ivory shadow-thread lg:grid-cols-12 ${
          leftHeavy ? '' : 'lg:[&>div:first-child]:order-2'
        }`}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        layout
      >
        <div className={`${leftHeavy ? 'lg:col-span-7' : 'lg:col-span-5'} flex flex-col justify-between overflow-hidden border-b border-greige bg-greige/10 lg:border-b-0 lg:border-r`}>
          <div
            onClick={() => setLightboxOpen(true)}
            className="group relative aspect-[16/10] w-full min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] cursor-zoom-in"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setLightboxOpen(true)
              }
            }}
            aria-label={`Enlarge image for ${project.title}`}
          >
            <Image
              key={currentImage.src}
              src={currentImage.src}
              alt={`${project.title} - ${currentImage.label}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-sm border border-greige/60 bg-ivory/90 px-2.5 py-1 text-[11px] font-mono tracking-wider text-deep shadow-sm opacity-90 transition-opacity group-hover:opacity-100">
              <svg className="h-3.5 w-3.5 text-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
              <span>Click to view</span>
            </div>

            {gallery.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-greige/60 bg-ivory/90 p-2 text-deep shadow-sm transition hover:border-rust hover:text-rust opacity-80 hover:opacity-100"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-greige/60 bg-ivory/90 p-2 text-deep shadow-sm transition hover:border-rust hover:text-rust opacity-80 hover:opacity-100"
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
            <div className="flex flex-wrap items-center gap-2 border-t border-greige bg-ivory/80 px-4 py-2.5">
              <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mocha/60">
                Views:
              </span>
              {gallery.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  className={`border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                    activeImageIndex === i
                      ? 'border-rust bg-rust/10 font-medium text-rust'
                      : 'border-greige bg-ivory text-mocha hover:border-mocha/50'
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
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rust-text">Patch 0{index + 1}</p>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="group mt-5 block text-left"
            aria-expanded={open}
          >
            <span className="block font-display text-4xl font-semibold leading-none tracking-[-0.03em] text-deep sm:text-5xl">
              {project.title}
            </span>
            <motion.span
              className="mt-3 block h-px origin-left bg-rust"
              initial={false}
              animate={{ scaleX: open ? 1 : 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-mocha">{project.description}</p>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-mono text-xs leading-6 text-mocha/60">{project.tags.join(' / ')}</p>
          <div className="flex flex-wrap gap-3">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="w-fit border border-deep px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-deep transition-colors hover:border-rust hover:text-rust active:translate-y-px"
              >
                Live site
              </a>
            ) : null}
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="w-fit border border-deep px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-deep transition-colors hover:border-rust hover:text-rust active:translate-y-px"
            >
              Repo
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="w-fit border border-deep px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-deep transition-colors hover:border-rust hover:text-rust active:translate-y-px"
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
              className="mt-8 overflow-hidden border-t border-greige pt-6"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <dl className="grid gap-5 text-sm leading-relaxed text-mocha sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-rust-text">Problem</dt>
                  <dd className="mt-2">{project.caseStudy.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-rust-text">Approach</dt>
                  <dd className="mt-2">{project.caseStudy.approach}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-rust-text">Outcome</dt>
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
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-deep/90 p-4 backdrop-blur-sm sm:p-6 lg:p-10"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-[96vw] overflow-hidden rounded-sm border border-greige/40 bg-deep p-2 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-greige/20 px-4 py-2 text-ivory">
                <p className="font-mono text-xs uppercase tracking-wider text-ivory/80">
                  {project.title} &mdash; <span className="text-rust">{currentImage.label}</span>
                  {gallery.length > 1 ? (
                    <span className="ml-2 text-ivory/40">
                      ({activeImageIndex + 1}/{gallery.length})
                    </span>
                  ) : null}
                </p>
                <div className="flex items-center gap-2">
                  {gallery.length > 1 ? (
                    <div className="mr-2 hidden items-center gap-1 font-mono text-[10px] text-ivory/60 sm:flex">
                      <span>Use ← → keys</span>
                    </div>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(false)}
                    className="rounded-sm border border-greige/40 px-2 py-0.5 font-mono text-xs uppercase text-ivory hover:border-rust hover:text-rust"
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
                  className="max-h-[82vh] w-auto object-contain"
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-greige/40 bg-deep/80 p-3 text-ivory transition hover:border-rust hover:text-rust"
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
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-greige/40 bg-deep/80 p-3 text-ivory transition hover:border-rust hover:text-rust"
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
