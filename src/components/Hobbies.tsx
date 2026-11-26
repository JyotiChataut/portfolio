import { SectionReveal } from './SectionReveal'

const hobbies = [
  {
    title: 'Crochet',
    description:
      'I weave yarn into fabric the same way I weave code into interfaces. Stitch by stitch, with patience and pattern. Every loop teaches me about structure, tension, and how small decisions shape the whole piece.',
    color: 'bg-brand-green',
  },
  {
    title: 'Painting',
    description:
      'Watercolour and ink let me think about colour, composition, and negative space without a screen. The best layouts I have shipped started as thumbnail sketches on paper.',
    color: 'bg-brand-teal',
  },
  {
    title: 'Art & design research',
    description:
      'I follow design systems thinking, read about typographic history, and study how textile traditions influence digital interfaces. The more I understand craft outside code, the more intentional my work inside it becomes.',
    color: 'bg-brand-teal-mid',
  },
]

export function Hobbies() {
  return (
    <section id="hobbies" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionReveal className="mx-auto max-w-[1280px]">
        <p className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green">Beyond code</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-[-0.5px] text-ink sm:text-5xl">
          Making outside the browser
        </h2>
        <div className="mt-10 grid overflow-hidden rounded-lg border border-hairline bg-canvas lg:grid-cols-5">
          <div className="lg:col-span-2">
            <img
              src="/images/crochet_2.jpg"
              alt="Crochet textile detail showing woven yarn texture"
              className="h-full w-full min-h-[320px] object-cover"
            />
          </div>
          <div className="grid gap-6 p-6 sm:p-8 lg:col-span-3 lg:p-10">
            {hobbies.map((hobby) => (
              <div key={hobby.title}>
                <span className={`mb-4 block h-1 w-full origin-left ${hobby.color} transition-transform duration-500 motion-safe:scale-x-[0.12] motion-safe:hover:scale-x-100`} />
                <h3 className="font-display text-2xl font-medium leading-[1.2] text-ink">
                  {hobby.title}
                </h3>
                <p className="mt-3 text-base leading-[1.55] text-slate">{hobby.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
