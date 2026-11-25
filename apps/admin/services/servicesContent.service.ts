import type { AdminServiceItem, ServicesContentState } from '../types/services'
import { SERVICES } from '../../../apps/web/config/services'
import { adminApiClient } from '../lib/api'

export const INITIAL_SERVICES: AdminServiceItem[] = SERVICES.map((s) => ({
  ...s,
  status: 'published',
  specCode: `SPEC: DM-${s.order.toString().padStart(2, '0')}`,
  disciplines: ['Engineering Standard', 'QA/QC Compliance', 'Regional Execution'],
}))

let inMemoryServices: AdminServiceItem[] = [...INITIAL_SERVICES]

export interface IServicesAdapter {
  getServices(): Promise<AdminServiceItem[]>
  getServiceById(id: string): Promise<AdminServiceItem | null>
  createService(service: Omit<AdminServiceItem, 'id'>): Promise<AdminServiceItem>
  updateService(id: string, updates: Partial<AdminServiceItem>): Promise<AdminServiceItem>
  deleteService(id: string): Promise<boolean>
  resetToDefault(): Promise<AdminServiceItem[]>
}

export const mockServicesAdapter: IServicesAdapter = {
  async getServices(): Promise<AdminServiceItem[]> {
    try {
      const data = await adminApiClient<any[]>('/admin/services')
      const items = Array.isArray(data) ? data : (data as any)?.data
      if (items && Array.isArray(items) && items.length > 0) {
        return items.map((s: any, idx: number) => ({
          id: String(s.id),
          slug: s.slug,
          name: s.name,
          nameAr: s.nameAr || '',
          description: s.description || '',
          descriptionAr: s.descriptionAr || '',
          icon: s.icon || 'Briefcase',
          order: s.displayOrder ?? s.order ?? idx + 1,
          status: s.status || 'published',
          specCode: s.specCode || `SPEC: DM-${String(s.displayOrder ?? s.order ?? idx + 1).padStart(2, '0')}`,
          disciplines: s.disciplines || ['Engineering Standard', 'QA/QC Compliance', 'Regional Execution'],
        }))
      }
      return JSON.parse(JSON.stringify(inMemoryServices))
    } catch (err) {
      console.warn('Falling back to in-memory services:', err)
      return JSON.parse(JSON.stringify(inMemoryServices))
    }
  },

  async getServiceById(id: string): Promise<AdminServiceItem | null> {
    try {
      const s = await adminApiClient<any>(`/admin/services/${id}`)
      if (s) {
        return {
          id: String(s.id),
          slug: s.slug,
          name: s.name,
          nameAr: s.nameAr || '',
          description: s.description || '',
          descriptionAr: s.descriptionAr || '',
          icon: s.icon || 'Briefcase',
          order: s.displayOrder ?? s.order ?? 1,
          status: s.status || 'published',
          specCode: s.specCode || `SPEC: DM-${String(s.displayOrder ?? 1).padStart(2, '0')}`,
          disciplines: s.disciplines || ['Engineering Standard', 'QA/QC Compliance', 'Regional Execution'],
        }
      }
      const item = inMemoryServices.find((s) => s.id === id || s.slug === id)
      return item ? JSON.parse(JSON.stringify(item)) : null
    } catch (err) {
      console.warn('Service fetch fallback:', err)
      const item = inMemoryServices.find((s) => s.id === id || s.slug === id)
      return item ? JSON.parse(JSON.stringify(item)) : null
    }
  },

  async createService(serviceData: Omit<AdminServiceItem, 'id'>): Promise<AdminServiceItem> {
    const slug = serviceData.slug || serviceData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const fallbackCreate = () => {
      const newService: AdminServiceItem = {
        ...serviceData,
        id: serviceData.slug || `service-${Date.now()}`,
      }
      inMemoryServices.push(newService)
      return JSON.parse(JSON.stringify(newService))
    }

    try {
      const created = await adminApiClient<any>('/admin/services', {
        method: 'POST',
        body: JSON.stringify({
          name: serviceData.name,
          nameAr: serviceData.nameAr,
          slug,
          description: serviceData.description,
          descriptionAr: serviceData.descriptionAr,
          icon: serviceData.icon,
          displayOrder: serviceData.order ?? 1,
          status: serviceData.status || 'published',
        }),
      })
      if (created) {
        return {
          ...serviceData,
          id: String(created.id),
          order: created.displayOrder ?? serviceData.order ?? 1,
        }
      }
      return fallbackCreate()
    } catch (err) {
      console.warn('Backend unavailable, creating in-memory service:', err)
      return fallbackCreate()
    }
  },

  async updateService(id: string, updates: Partial<AdminServiceItem>): Promise<AdminServiceItem> {
    const payload: Record<string, any> = {
      name: updates.name,
      nameAr: updates.nameAr,
      slug: updates.slug,
      description: updates.description,
      descriptionAr: updates.descriptionAr,
      icon: updates.icon,
      displayOrder: updates.order ?? (updates as any).displayOrder,
      status: updates.status,
    }

    for (const key of Object.keys(payload)) {
      if (payload[key] === undefined) delete payload[key]
    }

    const fallbackUpdate = () => {
      const idx = inMemoryServices.findIndex((s) => s.id === id || s.slug === id)
      if (idx === -1) {
        throw new Error(`Service with id ${id} not found`)
      }
      const current = inMemoryServices[idx]!
      const updatedItem: AdminServiceItem = {
        ...current,
        ...updates,
        status: updates.status ?? current.status,
        id: current.id,
        slug: updates.slug ?? current.slug,
        name: updates.name ?? current.name,
        order: updates.order ?? current.order,
      }
      inMemoryServices[idx] = updatedItem
      return JSON.parse(JSON.stringify(updatedItem))
    }

    try {
      const updated = await adminApiClient<any>(`/admin/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      if (updated) {
        return {
          id: String(updated.id || id),
          slug: updated.slug || updates.slug || '',
          name: updated.name || updates.name || '',
          nameAr: updated.nameAr || updates.nameAr,
          description: updated.description || updates.description,
          descriptionAr: updated.descriptionAr || updates.descriptionAr,
          icon: updated.icon || updates.icon,
          order: updated.displayOrder ?? updates.order ?? 1,
          status: updated.status || updates.status || 'published',
          specCode: updates.specCode || `SPEC: DM-${String(updated.displayOrder ?? updates.order ?? 1).padStart(2, '0')}`,
        }
      }
      return fallbackUpdate()
    } catch (err) {
      console.warn('Backend unavailable, updating in-memory service:', err)
      return fallbackUpdate()
    }
  },

  async deleteService(id: string): Promise<boolean> {
    try {
      await adminApiClient(`/admin/services/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (err) {
      console.warn('Backend unavailable, deleting from in-memory services:', err)
      const initialLen = inMemoryServices.length
      inMemoryServices = inMemoryServices.filter((s) => s.id !== id && s.slug !== id)
      return inMemoryServices.length < initialLen
    }
  },

  async resetToDefault(): Promise<AdminServiceItem[]> {
    inMemoryServices = JSON.parse(JSON.stringify(INITIAL_SERVICES))
    return JSON.parse(JSON.stringify(inMemoryServices))
  },
}
