import type { Metadata } from 'next'
import { Montserrat, Inter, Space_Grotesk, IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-label',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Dar El Mashrq | Trading & Contracting Co. Est. 1994',
    template: '%s | Dar El Mashrq',
  },
  description:
    'Dar El Mashrq Trading & Contracting Company — Leading tier-one construction, electro-mechanical and real estate company in Saudi Arabia, Egypt, and Qatar since 1994.',
  keywords: [
    'Dar El Mashrq',
    'Dar ElMashrq',
    'construction company',
    'contracting',
    'real estate',
    'Saudi Arabia',
    'Egypt',
    'Qatar',
    'MENA',
    'دار المشرق',
    'شركة دار المشرق للتجارة والمقاولات',
  ],
  authors: [{ name: 'Dar El Mashrq Trading & Contracting Company' }],
  openGraph: {
    type: 'website',
    siteName: 'Dar El Mashrq',
    locale: 'en_US',
    title: 'Dar El Mashrq | Trading & Contracting Co. Est. 1994',
    description:
      'Tier-one civil contracting, electro-mechanical prowess, and real estate investment across Saudi Arabia, Egypt, and Qatar since 1994.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dar El Mashrq | Trading & Contracting Co.',
    description: 'Tier-one civil, architectural, and electro-mechanical contracting since 1994.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/dar-elmashrq-logo.png',
    shortcut: '/dar-elmashrq-logo.png',
    apple: '/dar-elmashrq-logo.png',
  },
}

import { ThemeProvider } from '@/providers/ThemeProvider'
import { LoadingScreenController } from '@/components/loading/LoadingScreen'
import { PageTransition } from '@/components/transitions/PageTransition'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${spaceGrotesk.variable} ${ibmPlexArabic.variable} scroll-smooth overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('dar-theme') || 'dark';
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-[#0f2244] text-slate-900 dark:text-[#d7e2ff] font-body antialiased selection:bg-[#ba9563]/30 dark:selection:bg-[#5d4117] selection:text-[#ba9563] dark:selection:text-[#ffddb3] transition-colors duration-300 overflow-x-hidden max-w-full relative">
        <ThemeProvider>
          <LoadingScreenController>
            <PageTransition>{children}</PageTransition>
          </LoadingScreenController>
        </ThemeProvider>
      </body>
    </html>
  )
}
