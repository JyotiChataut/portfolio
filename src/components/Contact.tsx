import { SectionReveal } from './SectionReveal'

const links = [
  { label: 'Email', href: 'mailto:chatautjyoti7@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/JyotiChataut' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jyoti-c-5061772a4/' },
]

export function Contact() {
  return (
    <section id="contact" className="bg-brand-teal-deep px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionReveal className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green">Get in touch</p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-[1.1] tracking-[-0.5px] text-on-dark sm:text-5xl">
              Start a thread
            </h2>
            <p className="mt-4 max-w-[42ch] text-lg leading-[1.5] text-on-dark-muted">
              Based in Imadol, Lalitpur. Open to new opportunities across frontend, full-stack, and design-adjacent roles, wherever clean implementation and thoughtful craft matter.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between rounded-full border border-hairline-dark px-6 py-3.5 text-sm font-semibold leading-[1.3] text-on-dark transition-colors hover:border-brand-green hover:text-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
