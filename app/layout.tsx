import type { Metadata } from 'next'
import { Noto_Sans_JP, Cormorant_Garamond, Cinzel } from 'next/font/google'
import './globals.css'
import Navigation from './_components/Navigation'

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Alte Menu',
  description: 'ホールスタッフのためのコース解説・教育支援ツール',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${cormorant.variable} ${cinzel.variable} h-full`}
    >
      <body className="min-h-full bg-gold-50 text-crimson-900 font-sans pb-16">
        {children}
        <Navigation />
      </body>
    </html>
  )
}
