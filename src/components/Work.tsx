import { ProjectPatch } from './ProjectPatch'
import { projects } from '@/data/projects'

export function Work() {
  return (
    <section id="work" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 max-w-3xl">
          <h2 className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-deep sm:text-6xl">
            Project patches in the weave
          </h2>
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-mocha">
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
