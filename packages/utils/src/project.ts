import type { Project, ProjectFilters, ProjectSummary } from '@dar-elmashrq/types'

/**
 * Filter projects by country, category, and/or search term.
 *
 * Pure function — no side effects, no data fetching.
 * Lives here (utils) not in the UI — filtering logic is domain logic.
 * Used by the Projects feature service; UI does NOT call this directly.
 */
export function filterProjects(
  projects: ProjectSummary[],
  filters: ProjectFilters
): ProjectSummary[] {
  return projects.filter((project) => {
    if (filters.country && filters.country !== 'all') {
      if (project.country !== filters.country) return false
    }

    if (filters.category && filters.category !== 'all') {
      if (project.category !== filters.category) return false
    }

    if (filters.search) {
      const search = filters.search.toLowerCase()
      const matchesName =
        project.name.toLowerCase().includes(search) ||
        (project.nameAr?.toLowerCase().includes(search) ?? false)
      const matchesLocation = project.location.toLowerCase().includes(search)
      if (!matchesName && !matchesLocation) return false
    }

    return true
  })
}

/**
 * Returns the cover image URL for a project.
 * Falls back to the first image if no cover is explicitly set.
 */
export function getProjectCoverImage(project: Pick<Project, 'images'>): string | null {
  const cover = project.images.find((img) => img.isCover)
  const first = project.images[0]
  return cover?.url ?? first?.url ?? null
}

/**
 * Generates the URL path for a project detail page.
 */
export function getProjectPath(slug: string): string {
  return `/projects/${slug}`
}
