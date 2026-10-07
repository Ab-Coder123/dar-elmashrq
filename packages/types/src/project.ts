import type { Country } from './common'

/**
 * Project categories derived from Dar ElMashrq's actual portfolio.
 * Source: Analyzed from the 68-page corporate PDF.
 */
export type ProjectCategory =
  | 'residential'
  | 'commercial'
  | 'government-institutional'
  | 'healthcare'
  | 'infrastructure'
  | 'hospitality'

export const PROJECT_CATEGORIES: Record<
  ProjectCategory,
  { label: string; labelAr: string }
> = {
  residential: { label: 'Residential', labelAr: 'سكني' },
  commercial: { label: 'Commercial', labelAr: 'تجاري' },
  'government-institutional': {
    label: 'Government & Institutional',
    labelAr: 'حكومي ومؤسسي',
  },
  healthcare: { label: 'Healthcare', labelAr: 'رعاية صحية' },
  infrastructure: { label: 'Infrastructure', labelAr: 'بنية تحتية' },
  hospitality: { label: 'Hospitality & F&B', labelAr: 'ضيافة وأغذية ومشروبات' },
}

/**
 * A single project image.
 */
export interface ProjectImage {
  id: string
  url: string
  alt: string
  altAr?: string
  width?: number
  height?: number
  /** Whether this is the primary cover image shown in cards. */
  isCover: boolean
  order: number
}

/**
 * Core Project domain model.
 *
 * UI components consume this interface — they do NOT depend on the data source.
 * When the backend API is ready, only the service layer changes.
 * This interface stays stable.
 */
export interface Project {
  id: string
  /** URL-safe identifier used in routing: /projects/[slug] */
  slug: string
  /** Project name in English */
  name: string
  /** Project name in Arabic */
  nameAr?: string
  /** Country of the project */
  country: Country
  /** City or region */
  location: string
  locationAr?: string
  /** Project category */
  category: ProjectCategory
  /** Year of completion or execution period */
  year?: number
  /** Brief description in English */
  description?: string
  /** Brief description in Arabic */
  descriptionAr?: string
  /** Detailed scope of work */
  scope?: string
  scopeAr?: string
  /** Services delivered on this project */
  services: string[]
  /** Project images */
  images: ProjectImage[]
  /**
   * Contract value — optional.
   * Some clients restrict public disclosure.
   * From PDF: Egypt projects have EGP values.
   */
  contractValue?: {
    amount: number
    currency: string
  }
  /** Client name — optional. Qatar projects named clients in PDF. */
  clientName?: string
  clientNameAr?: string
  /** Whether the project is featured on the homepage */
  isFeatured: boolean
  /** Display order within category/country grouping */
  order: number
}

/**
 * Lightweight project summary for listing pages and cards.
 * Avoids over-fetching full project data when only card info is needed.
 */
export type ProjectSummary = Pick<
  Project,
  | 'id'
  | 'slug'
  | 'name'
  | 'nameAr'
  | 'country'
  | 'location'
  | 'category'
  | 'year'
  | 'isFeatured'
  | 'images'
>

/**
 * Filter parameters for the Projects listing page.
 * 'all' is the neutral/unfiltered state.
 */
export interface ProjectFilters {
  country?: Country | 'all'
  category?: ProjectCategory | 'all'
  search?: string
}
