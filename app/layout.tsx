import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import CursorSpotlight from '@/components/CursorSpotlight'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  metadataBase: new URL('https://surajfc.github.io'),
  title: 'Suraj Thapa | Software Engineer',
  description:
    'Portfolio of Suraj Thapa — Software Engineer with 5+ years of full-stack experience in React, TypeScript, Django, and more.',
  icons: { icon: `${BASE}/favicon.ico` },
  openGraph: {
    title: 'Suraj Thapa | Software Engineer',
    description:
      'Software Engineer with 5+ years of full-stack experience in React, TypeScript, Django, NestJS and more.',
    url: 'https://surajfc.github.io/surajPortfolio/',
    siteName: 'Suraj Thapa Portfolio',
    type: 'website',
    images: [
      {
        url: `${BASE}/images/profile.png`,
        width: 800,
        height: 800,
        alt: 'Suraj Thapa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suraj Thapa | Software Engineer',
    description:
      'Software Engineer with 5+ years of full-stack experience in React, TypeScript, Django, NestJS and more.',
    images: [`${BASE}/images/profile.png`],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ScrollProgress />
          <CursorSpotlight />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
