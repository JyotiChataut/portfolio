'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import type { Project } from '@/data/projects'

type ProjectPatchProps = {
  project: Project
  index: number
}

export function ProjectPatch({ project, index }: ProjectPatchProps) {
  const [open, setOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const leftHeavy = index % 2 === 0

  const gallery = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [{ src: project.image, label: project.title }]

  const currentImage = gallery[activeImageIndex] || gallery[0]

  return (
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
        <div className="relative aspect-[16/10] w-full max-h-[380px] sm:max-h-[420px]">
          <Image
            key={currentImage.src}
            src={currentImage.src}
            alt={`${project.title} - ${currentImage.label}`}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-top transition-opacity duration-300"
          />
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
  )
}
