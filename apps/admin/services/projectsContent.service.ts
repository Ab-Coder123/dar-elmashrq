import type { Project, Country, ProjectCategory } from '@dar-elmashrq/types'
import { getAllProjects } from '../../../apps/web/features/projects/data/projects.data'
import type { AdminProjectFilters, ProjectFormData } from '../types/projects'
import { adminApiClient } from '../lib/api'

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
    const fallbackGetProjects = async () => {
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
    }

    try {
      const queryParams = new URLSearchParams()
      queryParams.set('pageSize', '100')
      if (filters?.country && filters.country !== 'all') queryParams.set('country', filters.country)
      if (filters?.category && filters.category !== 'all') queryParams.set('category', filters.category)
      if (filters?.search) queryParams.set('search', filters.search)

      const qs = queryParams.toString()
      const data = await adminApiClient<{ items: any[] } | any[]>(
        `/admin/projects${qs ? `?${qs}` : ''}`
      )
      const items = Array.isArray(data) ? data : data?.items ?? []
      if (items && items.length > 0) {
        return items.map((p: any, idx: number) => ({
          ...p,
          id: String(p.id),
          order: p.displayOrder ?? p.order ?? idx + 1,
          services: Array.isArray(p.services)
            ? p.services.map((s: any) => (typeof s === 'string' ? s : s?.nameAr || s?.name || String(s)))
            : (p.serviceSlugs || []),
          images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [],
        }))
      }
      return await fallbackGetProjects()
    } catch (err) {
      console.warn('Falling back to local projects in-memory:', err)
      return await fallbackGetProjects()
    }
  },

  async getProjectById(id: string): Promise<Project | null> {
    const fallbackGetById = async () => {
      await initProjectsIfNeeded()
      const project = inMemoryProjects.find((p) => p.id === id || p.slug === id)
      return project ? JSON.parse(JSON.stringify(project)) : null
    }

    try {
      const p = await adminApiClient<any>(`/admin/projects/${id}`)
      if (p) {
        return {
          ...p,
          id: String(p.id),
          order: p.displayOrder ?? p.order ?? 1,
          services: Array.isArray(p.services)
            ? p.services.map((s: any) => (typeof s === 'string' ? s : s?.nameAr || s?.name || String(s)))
            : (p.serviceSlugs || []),
          images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [],
        }
      }
      return await fallbackGetById()
    } catch (err) {
      console.warn('Project fetch fallback:', err)
      return await fallbackGetById()
    }
  },

  async createProject(data: ProjectFormData): Promise<Project> {
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const fallbackCreate = async () => {
      await initProjectsIfNeeded()
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
    }

    try {
      const created = await adminApiClient<any>('/admin/projects', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          slug,
          displayOrder: data.order ?? 1,
          status: 'published',
        }),
      })
      if (created) {
        return {
          ...data,
          ...created,
          id: String(created.id),
          order: created.displayOrder ?? data.order ?? 1,
        }
      }
      return await fallbackCreate()
    } catch (err) {
      console.warn('Backend unavailable, creating in-memory project:', err)
      return await fallbackCreate()
    }
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const payload: Record<string, any> = {
      name: updates.name,
      nameAr: updates.nameAr,
      slug: updates.slug,
      country: updates.country,
      location: updates.location,
      locationAr: updates.locationAr,
      category: updates.category,
      year: updates.year,
      description: updates.description,
      descriptionAr: updates.descriptionAr,
      scope: updates.scope,
      scopeAr: updates.scopeAr,
      clientName: updates.clientName,
      isFeatured: updates.isFeatured,
      displayOrder: updates.order ?? (updates as any).displayOrder,
    }

    for (const key of Object.keys(payload)) {
      if (payload[key] === undefined) delete payload[key]
    }

    const fallbackUpdate = async () => {
      await initProjectsIfNeeded()
      const idx = inMemoryProjects.findIndex((p) => p.id === id || p.slug === id)
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
    }

    try {
      const updated = await adminApiClient<any>(`/admin/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      if (updated) {
        return {
          ...updates,
          ...updated,
          id: String(updated.id || id),
          order: updated.displayOrder ?? updates.order ?? 1,
        } as Project
      }
      return await fallbackUpdate()
    } catch (err) {
      console.warn('Backend unavailable, updating in-memory project:', err)
      return await fallbackUpdate()
    }
  },

  async deleteProject(id: string): Promise<boolean> {
    const fallbackDelete = async () => {
      await initProjectsIfNeeded()
      const initialLen = inMemoryProjects.length
      inMemoryProjects = inMemoryProjects.filter((p) => p.id !== id && p.slug !== id)
      return inMemoryProjects.length < initialLen
    }

    try {
      await adminApiClient(`/admin/projects/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (err) {
      console.warn('Backend unavailable, deleting from in-memory projects:', err)
      return await fallbackDelete()
    }
  },

  async resetToDefault(): Promise<Project[]> {
    const raw = await getAllProjects()
    inMemoryProjects = JSON.parse(JSON.stringify(raw))
    return JSON.parse(JSON.stringify(inMemoryProjects))
  },
}
