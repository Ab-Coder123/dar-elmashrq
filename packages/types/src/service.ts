/**
 * A company service offering.
 * Source: Dar ElMashrq corporate PDF (Pages 4 and 7).
 */
export interface Service {
  id: string
  slug: string
  name: string
  nameAr?: string
  description?: string
  descriptionAr?: string
  /** Optional icon identifier (Lucide React icon name) */
  icon?: string
  order: number
}
