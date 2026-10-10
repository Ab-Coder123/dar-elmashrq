import type { Project, ProjectFilters, ProjectSummary } from '@dar-elmashrq/types'
import { filterProjects } from '@dar-elmashrq/utils'
import { getAllProjects, getFeaturedProjects } from '../data/projects.data'
import { publicApiClient } from '@/lib/api'

/**
 * Project Service — the boundary between UI and data.
 * Consumes public REST API (/api/v1/projects) with seamless fallback to static verified assets.
 */

export async function getProjects(filters?: ProjectFilters): Promise<ProjectSummary[]> {
  const queryParams = new URLSearchParams()
  if (filters?.country && filters.country !== 'all') queryParams.set('country', filters.country)
  if (filters?.category && filters.category !== 'all') queryParams.set('category', filters.category)
  if (filters?.search) queryParams.set('search', filters.search)

  const queryString = queryParams.toString()
  const endpoint = `/projects${queryString ? `?${queryString}` : ''}`

  const apiProjects = await publicApiClient<ProjectSummary[]>(endpoint)
  if (apiProjects && Array.isArray(apiProjects) && apiProjects.length > 0) {
    return apiProjects
  }

  // Fallback to static verified PDF projects
  const staticProjects = await getAllProjects()
  if (!filters) return staticProjects
  return filterProjects(staticProjects, filters)
}

export async function getAllProjectDetails(): Promise<Project[]> {
  const apiProjects = await publicApiClient<Project[]>('/projects')
  if (apiProjects && Array.isArray(apiProjects) && apiProjects.length > 0) {
    return apiProjects
  }
  return getAllProjects()
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const apiProject = await publicApiClient<Project>(`/projects/${slug}`)
  if (apiProject) return apiProject

  const staticProjects = await getAllProjects()
  return staticProjects.find((p) => p.slug === slug) ?? null
}

export async function getFeatured(): Promise<Project[]> {
  const apiFeatured = await publicApiClient<Project[]>('/projects/featured')
  if (apiFeatured && Array.isArray(apiFeatured) && apiFeatured.length > 0) {
    return apiFeatured
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

