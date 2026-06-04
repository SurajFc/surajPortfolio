import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import CursorSpotlight from '@/components/CursorSpotlight'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const SITE_URL = 'https://surajfc.github.io/surajPortfolio'

export const metadata: Metadata = {
  metadataBase: new URL('https://surajfc.github.io'),

  title: {
    default: 'Suraj Thapa | Software Engineer',
    template: '%s | Suraj Thapa',
  },
  description:
    'Portfolio of Suraj Thapa — Software Engineer with 5+ years of full-stack experience in React, TypeScript, Django, NestJS, and more. Available for new opportunities.',

  keywords: [
    'Suraj Thapa',
    'Software Engineer',
    'Full Stack Developer',
    'React Developer',
    'TypeScript',
    'Django',
    'NestJS',
    'Portfolio',
    'Frontend Developer',
    'Backend Developer',
    'React Native',
    'GraphQL',
    'Node.js',
  ],

  authors: [{ name: 'Suraj Thapa', url: SITE_URL }],
  creator: 'Suraj Thapa',
  publisher: 'Suraj Thapa',

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

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: `${BASE}/favicon.ico`,
    shortcut: `${BASE}/favicon.ico`,
  },

  openGraph: {
    title: 'Suraj Thapa | Software Engineer',
    description:
      'Software Engineer with 5+ years of full-stack experience in React, TypeScript, Django, NestJS and more. Available for new opportunities.',
    url: SITE_URL,
    siteName: 'Suraj Thapa Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${BASE}/images/profile.png`,
        width: 800,
        height: 800,
        alt: 'Suraj Thapa — Software Engineer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Suraj Thapa | Software Engineer',
    description:
      'Software Engineer with 5+ years of full-stack experience in React, TypeScript, Django, NestJS and more.',
    creator: '@surajfc',
    images: [`${BASE}/images/profile.png`],
  },

  category: 'technology',
}

// JSON-LD structured data — helps Google understand the page as a Person entity
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Suraj Thapa',
  url: SITE_URL,
  jobTitle: 'Software Engineer',
  description:
    'Software Engineer with 5+ years of full-stack experience in React, TypeScript, Django, and NestJS.',
  sameAs: [
    'https://github.com/SurajFc',
    'https://www.linkedin.com/in/suraj4/',
    'https://stackoverflow.com/users/12359814/surajfc',
  ],
  knowsAbout: [
    'JavaScript', 'TypeScript', 'React', 'React Native',
    'Django', 'NestJS', 'Node.js', 'GraphQL',
    'PostgreSQL', 'MongoDB', 'AWS',
  ],
  email: 'mailto:surajthapafc@gmail.com',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
