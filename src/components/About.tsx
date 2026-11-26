import { SectionReveal } from './SectionReveal'

export function About() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionReveal className="mx-auto grid max-w-[1280px] gap-10 rounded-lg border border-hairline bg-canvas p-8 sm:p-10 lg:grid-cols-12 lg:p-14">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green">Who I am</p>
          <h2 className="mt-3 font-display text-4xl font-medium leading-[1.1] tracking-[-0.5px] text-ink sm:text-5xl">
            About the maker
          </h2>
        </div>
        <div className="lg:col-span-8">
          <div className="max-w-[64ch] space-y-5 text-base leading-[1.55] text-slate">
            <p>
              I am an Information Technology Engineering graduate from NCIT who thinks about interfaces the same way I think about crochet. Stitch by stitch, row by row, with attention to how each thread connects to the next.
            </p>
            <p>
              I enjoy shaping layouts where readability, rhythm, and small interaction details make information easier to use. My projects span travel, recipe, and personal publishing interfaces built with responsive web practices.
            </p>
            <p>
              Outside the code, my blog Chrochet and this portfolio share the same making mindset: careful structure, visible craft, and attention to how pieces come together.
            </p>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
