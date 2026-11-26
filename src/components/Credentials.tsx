import { SectionReveal } from './SectionReveal'

const certifications = [
  {
    title: 'React with Next.js',
    issuer: 'CodeIt',
    href: 'https://www.linkedin.com/in/jyoti-c-5061772a4/overlay/Certifications/1753767136/treasury/?profileId=ACoAAElZ9RYBpHVla6vrzleuU-5LXM9QKIujEE8',
  },
  {
    title: 'Python Fundamentals',
    issuer: 'Great Learning',
    href: 'https://www.linkedin.com/in/jyoti-c-5061772a4/overlay/Certifications/1423960081/treasury/?profileId=ACoAAElZ9RYBpHVla6vrzleuU-5LXM9QKIujEE8',
  },
  {
    title: 'Python with Django Bootcamp',
    issuer: 'Evolve IT Hub',
    href: 'https://ibb.co/yBdTcpd',
  },
  {
    title: 'AI / ML',
    issuer: 'Dakshyalaya training center',
    href: 'https://www.linkedin.com/in/jyoti-c-5061772a4/overlay/Certifications/1513191191/treasury/?profileId=ACoAAElZ9RYBpHVla6vrzleuU-5LXM9QKIujEE8',
  },
  {
    title: 'NCIT Hackfest',
    issuer: 'NCIT',
    href: 'https://ibb.co/StrWdhX',
  },
]

export function Credentials() {
  return (
    <section id="credentials" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionReveal className="mx-auto max-w-[1400px] border border-greige bg-ivory">
        <div className="grid lg:grid-cols-12">
          <div className="border-b border-greige p-6 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-10">
            <h2 className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-deep sm:text-6xl">
              Education and practice
            </h2>
            <div className="mt-8 border-l border-greige pl-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-rust-text">2021 - 2025</p>
              <h3 className="mt-3 font-display text-3xl font-semibold leading-none text-deep">Bachelor of Engineering</h3>
              <p className="mt-3 leading-relaxed text-mocha">Information Technology, Nepal College of Information Technology, Balkumari, Lalitpur.</p>
            </div>
          </div>
          <div className="p-6 sm:p-8 lg:col-span-7 lg:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((certification) => (
                <a
                  key={certification.title}
                  href={certification.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group border border-greige p-5 transition-colors hover:border-rust active:translate-y-px"
                >
                  <p className="font-display text-3xl font-semibold leading-none text-deep group-hover:text-rust">
                    {certification.title}
                  </p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-mocha">{certification.issuer}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
