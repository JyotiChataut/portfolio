import { SectionReveal } from './SectionReveal'

export function About() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionReveal className="mx-auto grid max-w-[1400px] border border-greige bg-ivory lg:grid-cols-12">
        <div className="border-b border-greige p-6 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-10">
          <h2 className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-deep sm:text-6xl">
            About the maker
          </h2>
        </div>
        <div className="p-6 sm:p-8 lg:col-span-8 lg:p-10">
          <div className="max-w-[64ch] space-y-5 text-lg leading-relaxed text-mocha">
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
