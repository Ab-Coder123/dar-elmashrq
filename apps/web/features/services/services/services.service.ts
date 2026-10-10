import type { TechnicalService, IntegratedDiscipline, ServiceProjectRelation } from '../types'
import {
  TECHNICAL_SERVICES,
  INTEGRATED_DISCIPLINES,
  SERVICE_PROJECT_SHOWCASES,
  SERVICES_MEDIA,
} from '../data/services.data'

import { publicApiClient } from '@/lib/api'

/**
 * Services Service — Data Access Boundary
 * Consumes public REST API (/api/v1/services) with seamless fallback.
 */

export async function getTechnicalServices(): Promise<TechnicalService[]> {
  const apiServices = await publicApiClient<TechnicalService[]>('/services')
  if (apiServices && Array.isArray(apiServices) && apiServices.length > 0) {
    return apiServices
  }
  return TECHNICAL_SERVICES
}

export async function getTechnicalServiceBySlug(slug: string): Promise<TechnicalService | null> {
  const apiService = await publicApiClient<TechnicalService>(`/services/${slug}`)
  if (apiService) return apiService

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
