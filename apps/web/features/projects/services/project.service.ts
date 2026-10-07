import type { Project, ProjectFilters, ProjectSummary } from '@dar-elmashrq/types'
import { filterProjects } from '@dar-elmashrq/utils'
import { getAllProjects, getFeaturedProjects } from '../data/projects.data'

/**
 * Project Service — the boundary between UI and data.
 *
 * ═══════════════════════════════════════════════════════════════
 * ARCHITECTURE CONTRACT
 * ═══════════════════════════════════════════════════════════════
 *
 * UI components call THIS file. Never the data layer directly.
 *
 * This is the integration point. When the backend API is ready (Phase 03):
 *   - Replace the function bodies below with API calls
 *   - Zero UI changes required
 *   - The function signatures stay the same
 * ═══════════════════════════════════════════════════════════════
 */

/**
 * Get all projects, optionally filtered.
 */
export async function getProjects(filters?: ProjectFilters): Promise<ProjectSummary[]> {
  const projects = await getAllProjects()
  if (!filters) return projects
  return filterProjects(projects, filters)
}

/**
 * Get full project details for all projects.
 */
export async function getAllProjectDetails(): Promise<Project[]> {
  return getAllProjects()
}

/**
 * Get a single project by its URL slug.
 * Returns null if not found — caller handles the 404.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllProjects()
  return projects.find((p) => p.slug === slug) ?? null
}

/**
 * Get featured projects for the homepage and project highlights.
 */
export async function getFeatured(): Promise<Project[]> {
  return getFeaturedProjects()
}

/**
 * Get project count by country — for the stats display.
 */
export async function getProjectCountByCountry(): Promise<Record<string, number>> {
  const projects = await getAllProjects()
  return projects.reduce<Record<string, number>>((acc, project) => {
    const count = acc[project.country]
    acc[project.country] = (count ?? 0) + 1
    return acc
  }, {})
}
