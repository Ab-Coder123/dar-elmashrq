import type { TechnicalService, IntegratedDiscipline, ServiceProjectRelation } from '../types'
import {
  TECHNICAL_SERVICES,
  INTEGRATED_DISCIPLINES,
  SERVICE_PROJECT_SHOWCASES,
  SERVICES_MEDIA,
} from '../data/services.data'

/**
 * Services Service — Data Access Boundary
 *
 * UI components call this service, NOT the static data files directly.
 * Ready for future backend/CMS drop-in replacement.
 */

export async function getTechnicalServices(): Promise<TechnicalService[]> {
  return TECHNICAL_SERVICES
}

export async function getTechnicalServiceBySlug(slug: string): Promise<TechnicalService | null> {
  const service = TECHNICAL_SERVICES.find((s) => s.slug === slug)
  return service ?? null
}

export async function getIntegratedDisciplines(): Promise<IntegratedDiscipline[]> {
  return INTEGRATED_DISCIPLINES
}

export async function getServiceProjectShowcases(): Promise<ServiceProjectRelation[]> {
  return SERVICE_PROJECT_SHOWCASES
}

export async function getServicesMedia() {
  return SERVICES_MEDIA
}
