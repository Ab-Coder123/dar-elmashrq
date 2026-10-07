/**
 * Centralized environment variable access.
 *
 * WHY THIS FILE EXISTS:
 * - Prevents raw `process.env` access scattered across components
 * - Makes env dependencies explicit and auditable
 * - Easy to find and validate what the app needs
 * - Server-only variables are clearly separated from public ones
 *
 * RULE: All `process.env` references go through this file.
 * Components NEVER access process.env directly.
 */
export const env = {
  /** Public — safe to expose to the browser */
  SITE_URL: process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.elmashrq.com',
  SITE_NAME: process.env['NEXT_PUBLIC_SITE_NAME'] ?? 'Dar ElMashrq',

  IS_PRODUCTION: process.env['NODE_ENV'] === 'production',
  IS_DEVELOPMENT: process.env['NODE_ENV'] === 'development',

  /**
   * Server-only — never exposed to client.
   * Uncomment when backend is introduced (Phase 03).
   */
  // API_URL: process.env['API_URL'],
  // API_SECRET_KEY: process.env['API_SECRET_KEY'],
} as const
