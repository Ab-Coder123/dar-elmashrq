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
      const data = await adminApiClient<AdminServiceItem[]>('/admin/services')
      if (data && Array.isArray(data) && data.length > 0) {
        return data
      }
    } catch {
      // Fallback to local
    }
    return JSON.parse(JSON.stringify(inMemoryServices))
  },

  async getServiceById(id: string): Promise<AdminServiceItem | null> {
    try {
      const service = await adminApiClient<AdminServiceItem>(`/admin/services/${id}`)
      if (service) return service
    } catch {
      // Fallback
    }
    const item = inMemoryServices.find((s) => s.id === id)
    return item ? JSON.parse(JSON.stringify(item)) : null
  },

  async createService(serviceData: Omit<AdminServiceItem, 'id'>): Promise<AdminServiceItem> {
    try {
      const slug = serviceData.slug || serviceData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const created = await adminApiClient<AdminServiceItem>('/admin/services', {
        method: 'POST',
        body: JSON.stringify({
          ...serviceData,
          slug,
          status: 'published',
        }),
      })
      if (created) return created
    } catch {
      // Fallback
    }

    const newService: AdminServiceItem = {
      ...serviceData,
      id: serviceData.slug || `service-${Date.now()}`,
    }
    inMemoryServices.push(newService)
    return JSON.parse(JSON.stringify(newService))
  },

  async updateService(id: string, updates: Partial<AdminServiceItem>): Promise<AdminServiceItem> {
    try {
      const updated = await adminApiClient<AdminServiceItem>(`/admin/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      if (updated) return updated
    } catch {
      // Fallback
    }

    const idx = inMemoryServices.findIndex((s) => s.id === id)
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
  },

  async deleteService(id: string): Promise<boolean> {
    try {
      await adminApiClient(`/admin/services/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch {
      // Fallback
    }

    const initialLen = inMemoryServices.length
    inMemoryServices = inMemoryServices.filter((s) => s.id !== id)
    return inMemoryServices.length < initialLen
  },

  async resetToDefault(): Promise<AdminServiceItem[]> {
    inMemoryServices = JSON.parse(JSON.stringify(INITIAL_SERVICES))
    return JSON.parse(JSON.stringify(inMemoryServices))
  },
}
