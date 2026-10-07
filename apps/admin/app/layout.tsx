import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dar ElMashrq — Admin',
  description: 'Internal content management system — authorized access only.',
  robots: {
    // Admin must NEVER be indexed by search engines.
    index: false,
    follow: false,
    noarchive: true,
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/*
         * Authentication boundary — Phase 03 implementation.
         *
         * When implementing auth:
         * 1. Add middleware.ts at apps/admin/middleware.ts
         * 2. Protect all /dashboard/* routes
         * 3. Never share auth state with apps/web
         * 4. JWT validation happens server-side only
         *
         * This layout intentionally has no UI — it is a Phase 01 boundary.
         */}
        {children}
      </body>
    </html>
  )
}
