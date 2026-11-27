import { SectionReveal } from './SectionReveal'

const skillThreads = [
  {
    group: 'Frontend & UI',
    color: 'bg-brand-green',
    lead: 'Client-side architecture & component systems',
    skills: ['TypeScript', 'Next.js 14 / 15', 'React 18 / 19', 'Tailwind CSS', 'Radix UI'],
    tags: ['TanStack Table', 'Design Systems', 'Semantic HTML5'],
  },
  {
    group: 'Motion & Craft',
    color: 'bg-brand-teal-mid',
    lead: 'Choreographed interaction & responsive layouts',
    skills: ['Framer Motion', 'CSS Grid & Flexbox', 'Modal & Lightbox UI', 'Responsive UX', 'Micro-interactions'],
    tags: ['Reel Viewers', 'Hover Polish', 'Fluid Reflow'],
  },
  {
    group: 'Backend & Data',
    color: 'bg-accent-blue',
    lead: 'High-throughput APIs & transaction pipelines',
    skills: ['Fastify 5 & Node.js', 'PostgreSQL', 'Drizzle ORM', 'BullMQ & Redis', 'REST APIs & RBAC'],
    tags: ['Multi-tenant SaaS', 'Ledgers', 'Async Queues'],
  },
  {
    group: 'Engineering & Delivery',
    color: 'bg-accent-purple',
    lead: 'Containerization, SEO & production standards',
    skills: ['Docker & Nginx', 'Git & Version Control', 'Static Site Export', 'SEO & JSON-LD', 'Web Performance'],
    tags: ['Next Export', 'Cache Rules', 'Healthchecks'],
  },
]

export function Skills() {
  return (
    <section id="skills" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionReveal className="mx-auto max-w-[1280px]">
        <p className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green">What I work with</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-[-0.5px] text-ink sm:text-5xl">
          Threads I work with
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-[1.55] text-slate">
          Skills and toolchains forged across real projects — from multi-tenant SaaS and decoupled commerce to handcrafted interactive web experiences.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillThreads.map((thread) => (
            <div
              key={thread.group}
              className="group flex flex-col justify-between rounded-lg border border-hairline bg-canvas p-6 transition-all duration-300 hover:border-hairline-strong hover:shadow-thread sm:p-7"
            >
              <div>
                <span
                  className={`mb-4 block h-1 w-full origin-left ${thread.color} transition-transform duration-500 motion-safe:scale-x-[0.16] motion-safe:group-hover:scale-x-100`}
                />
                <h3 className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green-dark">
                  {thread.group}
                </h3>
                <p className="mt-1.5 text-xs text-slate">{thread.lead}</p>

                <div className="mt-6 space-y-2.5">
                  {thread.skills.map((skill) => (
                    <p
                      key={skill}
                      className="font-display text-xl font-medium leading-[1.2] text-ink transition-colors sm:text-2xl"
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-hairline-soft pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {thread.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-hairline bg-surface-soft px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
