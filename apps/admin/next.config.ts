import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Admin runs on port 3001, isolated from the public website (port 3000)
}

export default nextConfig
