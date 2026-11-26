import { SectionReveal } from './SectionReveal'

const skillThreads = [
  { group: 'Build', skills: ['JavaScript', 'React.js', 'Next.js', 'HTML / CSS'], weight: 'font-semibold' },
  { group: 'Design', skills: ['Responsive layout', 'Grid systems', 'Hover states', 'Transitions'], weight: 'font-medium' },
  { group: 'Workflow', skills: ['Git / GitHub', 'REST APIs', 'SQL / NoSQL', 'Research'], weight: 'font-normal' },
]

export function Skills() {
  return (
    <section id="skills" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionReveal className="mx-auto max-w-[1280px]">
        <p className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green">What I work with</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-[-0.5px] text-ink sm:text-5xl">
          Threads I work with
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {skillThreads.map((thread) => (
            <div key={thread.group} className="rounded-lg border border-hairline bg-canvas p-6 sm:p-8">
              <h3 className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green-dark">{thread.group}</h3>
              <div className="mt-6 space-y-3">
                {thread.skills.map((skill) => (
                  <p key={skill} className={`font-display text-2xl leading-[1.2] text-ink sm:text-3xl ${thread.weight}`}>
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
