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

function normalizeTechnicalService(s: any, index: number): TechnicalService {
  const fallback =
    TECHNICAL_SERVICES.find((ts) => ts.slug === s.slug || ts.id === s.id) ||
    TECHNICAL_SERVICES[index % TECHNICAL_SERVICES.length]!
  return {
    id: String(s.id || fallback.id),
    slug: s.slug || fallback.slug,
    number: s.number || fallback.number || `0${index + 1}`,
    title: s.name || s.title || fallback.title,
    titleAr: s.nameAr || s.titleAr || fallback.titleAr,
    shortTitle: s.shortTitle || s.name || fallback.shortTitle,
    shortTitleAr: s.shortTitleAr || s.nameAr || fallback.shortTitleAr,
    category: s.category || fallback.category,
    categoryAr: s.categoryAr || fallback.categoryAr,
    specCode: s.specCode || fallback.specCode,
    specCodeAr: s.specCodeAr || fallback.specCodeAr,
    description: s.description || fallback.description,
    descriptionAr: s.descriptionAr || fallback.descriptionAr,
    scopeItems: Array.isArray(s.scopeItems) && s.scopeItems.length > 0 ? s.scopeItems : fallback.scopeItems,
    scopeItemsAr: Array.isArray(s.scopeItemsAr) && s.scopeItemsAr.length > 0 ? s.scopeItemsAr : fallback.scopeItemsAr,
    standards: Array.isArray(s.standards) && s.standards.length > 0 ? s.standards : fallback.standards,
    standardsAr: Array.isArray(s.standardsAr) && s.standardsAr.length > 0 ? s.standardsAr : fallback.standardsAr,
    image: s.image || fallback.image,
    iconName: s.icon || s.iconName || fallback.iconName,
  }
}

export async function getTechnicalServices(): Promise<TechnicalService[]> {
  const apiServices = await publicApiClient<any[]>('/services')
  if (apiServices && Array.isArray(apiServices) && apiServices.length > 0) {
    return apiServices.map(normalizeTechnicalService)
  }
  return TECHNICAL_SERVICES
}

export async function getTechnicalServiceBySlug(slug: string): Promise<TechnicalService | null> {
  const apiService = await publicApiClient<any>(`/services/${slug}`)
  if (apiService) return normalizeTechnicalService(apiService, 0)

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
