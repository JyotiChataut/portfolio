import { SectionReveal } from './SectionReveal'

const certifications = [
  {
    title: 'React with Next.js',
    issuer: 'CodeIt',
    href: 'https://www.linkedin.com/in/jyoti-c-5061772a4/overlay/Certifications/1753767136/treasury/?profileId=ACoAAElZ9RYBpHVla6vrzleuU-5LXM9QKIujEE8',
    color: 'bg-accent-blue',
  },
  {
    title: 'Python Fundamentals',
    issuer: 'Great Learning',
    href: 'https://www.linkedin.com/in/jyoti-c-5061772a4/overlay/Certifications/1423960081/treasury/?profileId=ACoAAElZ9RYBpHVla6vrzleuU-5LXM9QKIujEE8',
    color: 'bg-accent-orange',
  },
  {
    title: 'Python with Django Bootcamp',
    issuer: 'Evolve IT Hub',
    href: 'https://ibb.co/yBdTcpd',
    color: 'bg-accent-purple',
  },
  {
    title: 'AI / ML',
    issuer: 'Dakshyalaya training center',
    href: 'https://www.linkedin.com/in/jyoti-c-5061772a4/overlay/Certifications/1513191191/treasury/?profileId=ACoAAElZ9RYBpHVla6vrzleuU-5LXM9QKIujEE8',
    color: 'bg-accent-pink',
  },
  {
    title: 'NCIT Hackfest',
    issuer: 'NCIT',
    href: 'https://ibb.co/StrWdhX',
    color: 'bg-brand-green',
  },
]

export function Credentials() {
  return (
    <section id="credentials" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionReveal className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 rounded-lg border border-hairline bg-canvas p-8 sm:p-10 lg:grid-cols-12 lg:p-14">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green">Learning</p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-[1.1] tracking-[-0.5px] text-ink sm:text-5xl">
              Education and practice
            </h2>
            <div className="mt-8 border-l border-hairline-strong pl-5">
              <p className="text-[11px] font-semibold uppercase tracking-[1px] text-brand-green-dark">2021 - 2025</p>
              <h3 className="mt-3 font-display text-2xl font-medium leading-[1.2] text-ink">Bachelor of Engineering</h3>
              <p className="mt-3 text-base leading-[1.55] text-slate">Information Technology, Nepal College of Information Technology, Balkumari, Lalitpur.</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((certification) => (
                <a
                  key={certification.title}
                  href={certification.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg border border-hairline bg-canvas p-5 transition-colors hover:border-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
                >
                  <span className={`inline-block h-2 w-2 rounded-full ${certification.color}`} aria-hidden="true" />
                  <p className="mt-3 font-display text-2xl font-medium leading-[1.2] text-ink">
                    {certification.title}
                  </p>
                  <p className="mt-2 text-sm leading-[1.5] text-slate">{certification.issuer}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
