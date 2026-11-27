import type { Metadata, Viewport } from 'next'
import { Poppins, Source_Code_Pro } from 'next/font/google'
import './globals.css'

const euclid = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-euclid',
  display: 'swap',
})

const sourceCode = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-source-code',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jyotichataut.com.np'

export const viewport: Viewport = {
  themeColor: '#001E2B',
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jyoti Chataut — Frontend Developer & UI Engineer',
    template: '%s | Jyoti Chataut',
  },
  description:
    'Frontend developer and UI engineer crafting deliberate, responsive web interfaces and design-conscious products with React, Next.js, TypeScript, and modern styling.',
  applicationName: 'Jyoti Chataut Portfolio',
  authors: [{ name: 'Jyoti Chataut', url: 'https://github.com/JyotiChataut' }],
  creator: 'Jyoti Chataut',
  keywords: [
    'Jyoti Chataut',
    'Frontend Developer',
    'UI Engineer',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Portfolio',
    'Web Developer Nepal',
    'Lalitpur',
    'Kathmandu',
    'Framer Motion',
    'Fastify',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Jyoti Chataut Portfolio',
    title: 'Jyoti Chataut — Frontend Developer & UI Engineer',
    description:
      'Frontend developer and UI engineer crafting deliberate, responsive web interfaces and design-conscious products with React, Next.js, and TypeScript.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jyoti Chataut — Frontend Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jyoti Chataut — Frontend Developer & UI Engineer',
    description:
      'Frontend developer and UI engineer crafting deliberate, responsive web interfaces and design-conscious products with React, Next.js, and TypeScript.',
    images: ['/images/og-image.jpg'],
    creator: '@JyotiChataut',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Jyoti Chataut',
      jobTitle: 'Frontend Developer & UI Engineer',
      description:
        'Frontend developer and UI engineer crafting deliberate, responsive web interfaces and design-conscious products.',
      url: siteUrl,
      sameAs: [
        'https://github.com/JyotiChataut',
        'https://www.linkedin.com/in/jyoti-c-5061772a4/',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lalitpur',
        addressCountry: 'NP',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'NCIT',
      },
      knowsAbout: [
        'Frontend Development',
        'Web Engineering',
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Fastify',
        'Framer Motion',
        'UI/UX Design',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Jyoti Chataut — Portfolio',
      description: 'Portfolio of Jyoti Chataut, Frontend Developer and UI Engineer.',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${euclid.variable} ${sourceCode.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
