import { SectionReveal } from './SectionReveal'

const skillThreads = [
  { group: 'Build', skills: ['JavaScript', 'React.js', 'Next.js', 'HTML / CSS'], weight: 'font-semibold' },
  { group: 'Design', skills: ['Responsive layout', 'Grid systems', 'Hover states', 'Transitions'], weight: 'font-medium' },
  { group: 'Workflow', skills: ['Git / GitHub', 'REST APIs', 'SQL / NoSQL', 'Research'], weight: 'font-normal' },
]

export function Skills() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionReveal className="mx-auto max-w-[1400px]">
        <h2 className="max-w-2xl font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-deep sm:text-6xl">
          Threads I work with
        </h2>
        <div className="mt-10 grid border border-greige bg-ivory lg:grid-cols-3">
          {skillThreads.map((thread, index) => (
            <div key={thread.group} className="border-b border-greige p-6 sm:p-8 lg:border-b-0 lg:border-r last:lg:border-r-0">
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px flex-1 bg-greige" />
                <span
                  className={`h-4 w-24 ${index === 0 ? 'bg-deep' : index === 1 ? 'bg-rust' : 'bg-greige'}`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-mono text-sm uppercase tracking-[0.16em] text-rust-text">{thread.group}</h3>
              <div className="mt-6 space-y-3">
                {thread.skills.map((skill) => (
                  <p key={skill} className={`font-display text-3xl leading-none text-deep sm:text-4xl ${thread.weight}`}>
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
