import type { Project, ProjectFilters, ProjectSummary } from '@dar-elmashrq/types'
import { filterProjects } from '@dar-elmashrq/utils'
import { getAllProjects, getFeaturedProjects } from '../data/projects.data'
import { publicApiClient } from '@/lib/api'

/**
 * Project Service — the boundary between UI and data.
 * Consumes public REST API (/api/v1/projects) with seamless fallback to static verified assets.
 */

import { getAllProjectsSync } from '../data/projects.data'

const STATIC_PROJECTS_MAP = new Map<string, Project>()
try {
  // Pre-index static projects by slug for instant O(1) fail-safe lookup
  const staticList = getAllProjectsSync()
  for (const sp of staticList) {
    STATIC_PROJECTS_MAP.set(sp.slug, sp)
  }
} catch {
  // Non-blocking in case of async environment
}

function normalizeProject(p: any): Project {
  if (!p) return p
  const fallbackProject = STATIC_PROJECTS_MAP.get(p.slug)
  const apiImages = Array.isArray(p.images) && p.images.length > 0 ? p.images : []
  const resolvedImages = apiImages.length > 0 ? apiImages : (fallbackProject?.images ?? [])

  return {
    ...p,
    id: String(p.id),
    services: Array.isArray(p.services)
      ? p.services.map((s: any) => (typeof s === 'string' ? s : s?.nameAr || s?.name || String(s)))
      : (fallbackProject?.services ?? []),
    images: resolvedImages,
  }
}

export async function getProjects(filters?: ProjectFilters): Promise<ProjectSummary[]> {
  const queryParams = new URLSearchParams()
  if (filters?.country && filters.country !== 'all') queryParams.set('country', filters.country)
  if (filters?.category && filters.category !== 'all') queryParams.set('category', filters.category)
  if (filters?.search) queryParams.set('search', filters.search)

  const queryString = queryParams.toString()
  const endpoint = `/projects${queryString ? `?${queryString}` : ''}`

  const apiProjects = await publicApiClient<any[]>(endpoint)
  if (apiProjects && Array.isArray(apiProjects) && apiProjects.length > 0) {
    return apiProjects.map(normalizeProject)
  }

  // Fallback to static verified PDF projects
  const staticProjects = await getAllProjects()
  if (!filters) return staticProjects
  return filterProjects(staticProjects, filters)
}

export async function getAllProjectDetails(): Promise<Project[]> {
  const apiProjects = await publicApiClient<any[]>('/projects')
  if (apiProjects && Array.isArray(apiProjects) && apiProjects.length > 0) {
    return apiProjects.map(normalizeProject)
  }
  return getAllProjects()
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const apiProject = await publicApiClient<any>(`/projects/${slug}`)
  if (apiProject) return normalizeProject(apiProject)

  const staticProjects = await getAllProjects()
  const found = staticProjects.find((p) => p.slug === slug) ?? null
  return found ? normalizeProject(found) : null
}

export async function getFeatured(): Promise<Project[]> {
  const apiFeatured = await publicApiClient<any[]>('/projects/featured')
  if (apiFeatured && Array.isArray(apiFeatured) && apiFeatured.length > 0) {
    return apiFeatured.map(normalizeProject)
  }
  return getFeaturedProjects()
}

export async function getProjectCountByCountry(): Promise<Record<string, number>> {
  const projects = await getProjects()
  return projects.reduce<Record<string, number>>((acc, project) => {
    const count = acc[project.country]
    acc[project.country] = (count ?? 0) + 1
    return acc
  }, {})
}

