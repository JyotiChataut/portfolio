import { SectionReveal } from './SectionReveal'

const links = [
  { label: 'Email', href: 'mailto:chatautjyoti7@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/JyotiChataut' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jyoti-c-5061772a4/' },
]

export function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionReveal className="mx-auto max-w-[1400px] border border-greige bg-deep text-ivory">
        <div className="grid lg:grid-cols-12">
          <div className="border-b border-ivory/20 p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r lg:p-10">
            <h2 className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] sm:text-6xl">
              Start a thread
            </h2>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-ivory/80">
              Based in Imadol, Lalitpur. I am open to frontend roles where design detail and clean implementation both matter.
            </p>
          </div>
          <div className="p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <div className="grid gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center justify-between border border-ivory/35 px-5 py-4 font-mono text-sm uppercase tracking-[0.16em] text-ivory transition-colors hover:border-gold hover:text-gold active:translate-y-px"
                >
                  {link.label}
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                    -&gt;
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
