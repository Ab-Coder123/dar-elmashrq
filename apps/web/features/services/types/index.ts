/**
 * Dar El Mashrq — Services Feature Types
 *
 * Types for technical services, integrated disciplines, and service-project relationships.
 */

export interface TechnicalService {
  id: string
  slug: string
  number: string
  title: string
  titleAr?: string
  shortTitle: string
  shortTitleAr?: string
  category: string
  categoryAr?: string
  specCode: string
  specCodeAr?: string
  description: string
  descriptionAr?: string
  scopeItems: string[]
  scopeItemsAr?: string[]
  standards: string[]
  standardsAr?: string[]
  image: string
  iconName: string
}

export interface IntegratedDiscipline {
  step: string
  title: string
  titleAr?: string
  subtitle: string
  subtitleAr?: string
  description: string
  descriptionAr?: string
  deliverables: string[]
  deliverablesAr?: string[]
  roleInLifecycle: string
  roleInLifecycleAr?: string
}

export interface ServiceProjectRelation {
  serviceId: string
  projectSlug: string
  projectName: string
  projectNameAr?: string
  country: string
  countryAr?: string
  location: string
  locationAr?: string
  image: string
  category: string
  categoryAr?: string
}
