import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /**
   * Enable React strict mode for development.
   * Catches potential issues early — always keep this on.
   */
  reactStrictMode: true,
  distDir: '../../.next',

  /**
   * Image domains — configured when real project images are available.
   * The company will need a CDN or media storage solution (Phase 03).
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'contribution.usercontent.google.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  /**
   * Public environment variables.
   * Server-only secrets must NEVER appear here.
   * Use lib/env.ts for all env access — not raw process.env.
   */
  env: {
    NEXT_PUBLIC_SITE_URL: process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.elmashrq.com',
    NEXT_PUBLIC_SITE_NAME: process.env['NEXT_PUBLIC_SITE_NAME'] ?? 'Dar ElMashrq',
  },
}

export default nextConfig
