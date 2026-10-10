import type { Db } from '../../infrastructure/database/db'
import {
  createServicesRepository,
  type ServiceRecord,
} from './services.repository'
import {
  serviceInputSchema,
  updateServiceSchema,
  patchServiceStatusSchema,
  reorderServicesSchema,
  type ServiceInput,
  type UpdateServiceInput,
  type PatchServiceStatusInput,
  type ReorderServicesInput,
} from './services.schemas'

export interface ServiceDto {
  id: number
  slug: string
  name: string
  nameAr: string | null
  description: string | null
  descriptionAr: string | null
  icon: string | null
  displayOrder: number
  status: 'draft' | 'published'
  imageId: number | null
  imageStorageKey: string | null
  publishedAt: Date | string | null
  createdAt: Date | string
  updatedAt: Date | string
}

function mapToDto(row: ServiceRecord): ServiceDto {
  return {
    id: Number(row.id),
    slug: row.slug,
    name: row.name,
    nameAr: row.name_ar ?? null,
    description: row.description ?? null,
    descriptionAr: row.description_ar ?? null,
    icon: row.icon ?? null,
    displayOrder: row.display_order,
    status: row.status,
    imageId: row.image_id ? Number(row.image_id) : null,
    imageStorageKey: row.image_storage_key ?? null,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function createServicesService(db: Db) {
  const repo = createServicesRepository(db)

  return {
    async getPublicServices(): Promise<ServiceDto[]> {
      const records = await repo.list(true)
      return records.map(mapToDto)
    },

    async getPublicServiceBySlug(slug: string): Promise<ServiceDto> {
      const record = await repo.getBySlug(slug, true)
      return mapToDto(record)
    },

    async getAdminServices(): Promise<ServiceDto[]> {
      const records = await repo.list(false)
      return records.map(mapToDto)
    },

    async getAdminServiceById(id: number): Promise<ServiceDto> {
      const record = await repo.getById(id)
      return mapToDto(record)
    },

    async createService(raw: ServiceInput, _userId?: number): Promise<ServiceDto> {
      const validated = serviceInputSchema.parse(raw)
      const created = await repo.create(validated)
      return mapToDto(created)
    },

    async updateService(
      id: number,
      raw: UpdateServiceInput,
      _userId?: number
    ): Promise<ServiceDto> {
      const validated = updateServiceSchema.parse(raw)
      const updated = await repo.update(id, validated)
      return mapToDto(updated)
    },

    async patchServiceStatus(
      id: number,
      raw: PatchServiceStatusInput,
      _userId?: number
    ): Promise<ServiceDto> {
      const { status } = patchServiceStatusSchema.parse(raw)
      const updated = await repo.setStatus(id, status)
      return mapToDto(updated)
    },

    async reorderServices(raw: ReorderServicesInput): Promise<void> {
      const { items } = reorderServicesSchema.parse(raw)
      await repo.reorder(items)
    },

    async deleteService(id: number, _userId?: number): Promise<void> {
      await repo.remove(id)
    },
  }
}
