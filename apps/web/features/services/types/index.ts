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
  shortTitle: string
  category: string
  specCode: string
  description: string
  scopeItems: string[]
  standards: string[]
  image: string
  iconName: string
}

export interface IntegratedDiscipline {
  step: string
  title: string
  subtitle: string
  description: string
  deliverables: string[]
  roleInLifecycle: string
}

export interface ServiceProjectRelation {
  serviceId: string
  projectSlug: string
  projectName: string
  country: string
  location: string
  image: string
  category: string
}
