import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Suraj Thapa | Software Engineer',
  description: 'Portfolio of Suraj Thapa — Software Engineer with 4+ years of full-stack experience.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#050816] text-slate-100 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}
