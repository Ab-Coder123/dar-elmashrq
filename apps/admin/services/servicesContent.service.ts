import type { AdminServiceItem, ServicesContentState } from '../types/services'
import { SERVICES } from '../../../apps/web/config/services'

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
    return JSON.parse(JSON.stringify(inMemoryServices))
  },

  async getServiceById(id: string): Promise<AdminServiceItem | null> {
    const item = inMemoryServices.find((s) => s.id === id)
    return item ? JSON.parse(JSON.stringify(item)) : null
  },

  async createService(serviceData: Omit<AdminServiceItem, 'id'>): Promise<AdminServiceItem> {
    const newService: AdminServiceItem = {
      ...serviceData,
      id: serviceData.slug || `service-${Date.now()}`,
    }
    inMemoryServices.push(newService)
    return JSON.parse(JSON.stringify(newService))
  },

  async updateService(id: string, updates: Partial<AdminServiceItem>): Promise<AdminServiceItem> {
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
    const initialLen = inMemoryServices.length
    inMemoryServices = inMemoryServices.filter((s) => s.id !== id)
    return inMemoryServices.length < initialLen
  },

  async resetToDefault(): Promise<AdminServiceItem[]> {
    inMemoryServices = JSON.parse(JSON.stringify(INITIAL_SERVICES))
    return JSON.parse(JSON.stringify(inMemoryServices))
  },
}
