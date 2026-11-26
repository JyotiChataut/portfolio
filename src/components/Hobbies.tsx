import { SectionReveal } from './SectionReveal'

const hobbies = [
  {
    title: 'Crochet',
    description:
      'I weave yarn into fabric the same way I weave code into interfaces. Stitch by stitch, with patience and pattern. Every loop teaches me about structure, tension, and how small decisions shape the whole piece.',
    color: 'bg-rust',
  },
  {
    title: 'Painting',
    description:
      'Watercolour and ink let me think about colour, composition, and negative space without a screen. The best layouts I have shipped started as thumbnail sketches on paper.',
    color: 'bg-deep',
  },
  {
    title: 'Art & design research',
    description:
      'I follow design systems thinking, read about typographic history, and study how textile traditions influence digital interfaces. The more I understand craft outside code, the more intentional my work inside it becomes.',
    color: 'bg-greige',
  },
]

export function Hobbies() {
  return (
    <section id="hobbies" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionReveal className="mx-auto max-w-[1400px]">
        <h2 className="max-w-3xl font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-deep sm:text-6xl">
          Making outside the browser
        </h2>
        <div className="mt-10 grid overflow-hidden border border-greige bg-ivory lg:grid-cols-5">
          <div className="lg:col-span-2">
            <img
              src="/images/crochet_2.jpg"
              alt="Crochet textile detail showing woven yarn texture"
              className="h-full w-full min-h-[320px] object-cover"
            />
          </div>
          <div className="grid gap-6 p-6 sm:p-8 lg:col-span-3 lg:p-10">
            {hobbies.map((hobby) => (
              <div key={hobby.title} className="group">
                <span className={`mb-4 block h-1 w-12 ${hobby.color} transition-all duration-500 group-hover:w-full`} />
                <h3 className="font-display text-3xl font-semibold leading-none tracking-[-0.02em] text-deep">
                  {hobby.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-mocha">{hobby.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
