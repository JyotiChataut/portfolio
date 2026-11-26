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
  const reduceMotion = useReducedMotion()
  const leftHeavy = index % 2 === 0

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
      <div className={`${leftHeavy ? 'lg:col-span-7' : 'lg:col-span-5'} border-b border-greige lg:border-b-0 lg:border-r`}>
        <Image
          src={project.image}
          alt={`${project.title} project screenshot`}
          width={1200}
          height={800}
          className="h-full min-h-[260px] w-full object-cover"
        />
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
