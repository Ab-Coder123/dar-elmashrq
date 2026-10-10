import type { Project, Country, ProjectCategory } from '@dar-elmashrq/types'
import { getAllProjects } from '../../../apps/web/features/projects/data/projects.data'
import type { AdminProjectFilters, ProjectFormData } from '../types/projects'

let inMemoryProjects: Project[] = []

async function initProjectsIfNeeded() {
  if (inMemoryProjects.length === 0) {
    const raw = await getAllProjects()
    inMemoryProjects = JSON.parse(JSON.stringify(raw))
  }
}

export interface IAdminProjectsAdapter {
  getProjects(filters?: AdminProjectFilters): Promise<Project[]>
  getProjectById(id: string): Promise<Project | null>
  createProject(data: ProjectFormData): Promise<Project>
  updateProject(id: string, updates: Partial<Project>): Promise<Project>
  deleteProject(id: string): Promise<boolean>
  resetToDefault(): Promise<Project[]>
}

export const mockAdminProjectsAdapter: IAdminProjectsAdapter = {
  async getProjects(filters?: AdminProjectFilters): Promise<Project[]> {
    await initProjectsIfNeeded()
    let result = [...inMemoryProjects]

    if (filters) {
      if (filters.country && filters.country !== 'all') {
        result = result.filter((p) => p.country === filters.country)
      }
      if (filters.category && filters.category !== 'all') {
        result = result.filter((p) => p.category === filters.category)
      }
      if (filters.search) {
        const query = filters.search.toLowerCase()
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            (p.nameAr && p.nameAr.toLowerCase().includes(query)) ||
            p.location.toLowerCase().includes(query)
        )
      }
    }

    return JSON.parse(JSON.stringify(result))
  },

  async getProjectById(id: string): Promise<Project | null> {
    await initProjectsIfNeeded()
    const project = inMemoryProjects.find((p) => p.id === id || p.slug === id)
    return project ? JSON.parse(JSON.stringify(project)) : null
  },

  async createProject(data: ProjectFormData): Promise<Project> {
    await initProjectsIfNeeded()
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const newProject: Project = {
      ...data,
      id: data.id || `proj-${Date.now()}`,
      slug,
      images: data.images || [],
      services: data.services || [],
      isFeatured: data.isFeatured ?? false,
      order: data.order ?? inMemoryProjects.length + 1,
    }
    inMemoryProjects.unshift(newProject)
    return JSON.parse(JSON.stringify(newProject))
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    await initProjectsIfNeeded()
    const idx = inMemoryProjects.findIndex((p) => p.id === id)
    if (idx === -1) {
      throw new Error(`Project with id ${id} not found`)
    }
    const current = inMemoryProjects[idx]!
    const updated: Project = {
      ...current,
      ...updates,
      id: current.id,
      slug: updates.slug ?? current.slug,
      name: updates.name ?? current.name,
      country: updates.country ?? current.country,
      location: updates.location ?? current.location,
      category: updates.category ?? current.category,
      services: updates.services ?? current.services,
      images: updates.images ?? current.images,
      isFeatured: updates.isFeatured ?? current.isFeatured,
      order: updates.order ?? current.order,
    }
    inMemoryProjects[idx] = updated
    return JSON.parse(JSON.stringify(updated))
  },

  async deleteProject(id: string): Promise<boolean> {
    await initProjectsIfNeeded()
    const initialLen = inMemoryProjects.length
    inMemoryProjects = inMemoryProjects.filter((p) => p.id !== id)
    return inMemoryProjects.length < initialLen
  },

  async resetToDefault(): Promise<Project[]> {
    const raw = await getAllProjects()
    inMemoryProjects = JSON.parse(JSON.stringify(raw))
    return JSON.parse(JSON.stringify(inMemoryProjects))
  },
}
