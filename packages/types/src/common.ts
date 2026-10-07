/**
 * Supported countries for Dar ElMashrq operations.
 * Source: Corporate PDF (confirmed — Saudi Arabia, Egypt, Qatar).
 */
export type Country = 'saudi-arabia' | 'egypt' | 'qatar'

export const COUNTRIES: Record<Country, { label: string; labelAr: string; code: string }> = {
  'saudi-arabia': {
    label: 'Saudi Arabia',
    labelAr: 'المملكة العربية السعودية',
    code: 'SA',
  },
  egypt: { label: 'Egypt', labelAr: 'مصر', code: 'EG' },
  qatar: { label: 'Qatar', labelAr: 'قطر', code: 'QA' },
}

/**
 * Supported locales. English and Arabic are both primary (from PDF).
 */
export type Locale = 'en' | 'ar'

/**
 * Generic paginated response wrapper — for future API integration.
 * UI components should work with this shape now so no refactor is needed later.
 */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

/**
 * Result type — avoids throwing for expected failures.
 * Prefer over try/catch for domain-level operations.
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }
