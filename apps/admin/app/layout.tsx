import type { Metadata } from 'next'
import './globals.css'
import { AdminShell } from '@/components/layout/AdminShell'

export const metadata: Metadata = {
  title: {
    default: 'Dar ElMashrq — Admin CMS',
    template: '%s | Dar ElMashrq Admin',
  },
  description: 'Internal content management system — authorized access only.',
  robots: {
    // Admin must NEVER be indexed by search engines.
    index: false,
    follow: false,
    noarchive: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  )
}
