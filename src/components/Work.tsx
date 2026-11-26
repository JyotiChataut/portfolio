import { ProjectPatch } from './ProjectPatch'
import { projects } from '@/data/projects'

export function Work() {
  return (
    <section id="work" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green">Selected work</p>
          <h2 className="mt-3 font-display text-4xl font-medium leading-[1.1] tracking-[-0.5px] text-ink sm:text-5xl">
            Project patches in the weave
          </h2>
          <p className="mt-4 max-w-[58ch] text-lg leading-[1.5] text-slate">
            Each project is a patch: a piece of the weave with its own texture, thread, and story.
          </p>
        </div>
        <div className="grid gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectPatch key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
