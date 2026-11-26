import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Jyoti Chataut | Frontend Developer',
  description: 'Frontend developer portfolio for design-focused web roles.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${euclid.variable} ${sourceCode.variable}`}>
      <body>{children}</body>
    </html>
  )
}
