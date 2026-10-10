import type { Db } from '../../infrastructure/database/db'
import { mapDbError } from '../../infrastructure/database/mapDbError'
import { NotFoundError } from '../../shared/errors/AppError'
import {
  serviceInputSchema,
  updateServiceSchema,
  type ServiceInput,
  type UpdateServiceInput,
} from './services.schemas'

export interface ServiceRecord {
  id: number
  slug: string
  name: string
  name_ar: string | null
  description: string | null
  description_ar: string | null
  icon: string | null
  display_order: number
  status: 'draft' | 'published'
  image_id: number | null
  image_storage_key?: string | null
  published_at: Date | string | null
  created_at: Date | string
  updated_at: Date | string
}

export function createServicesRepository(db: Db) {
  return {
    async create(raw: ServiceInput): Promise<ServiceRecord> {
      const s = serviceInputSchema.parse(raw)
      try {
        const { rows } = await db.query<ServiceRecord>(
          `insert into services (
            slug, name, name_ar, description, description_ar, icon, display_order, status, image_id
          ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          returning id, slug, name, name_ar, description, description_ar, icon, display_order, status, image_id, published_at, created_at, updated_at`,
          [
            s.slug,
            s.name,
            s.nameAr ?? null,
            s.description ?? null,
            s.descriptionAr ?? null,
            s.icon ?? null,
            s.displayOrder,
            s.status,
            s.imageId ?? null,
          ]
        )
        return rows[0]!
      } catch (e) {
        return mapDbError(e, 'Service')
      }
    },

    /**
     * List services.
     * publishedOnly=true is used by public endpoints.
     */
    async list(publishedOnly: boolean): Promise<ServiceRecord[]> {
      const { rows } = await db.query<ServiceRecord>(
        `select s.id, s.slug, s.name, s.name_ar, s.description, s.description_ar,
                s.icon, s.display_order, s.status, s.image_id, s.published_at,
                s.created_at, s.updated_at, m.storage_key as image_storage_key
         from services s
         left join media_assets m on s.image_id = m.id
         ${publishedOnly ? "where s.status = 'published'" : ''}
         order by s.display_order asc, s.id asc`
      )
      return rows
    },

    async getById(id: number): Promise<ServiceRecord> {
      const { rows } = await db.query<ServiceRecord>(
        `select s.id, s.slug, s.name, s.name_ar, s.description, s.description_ar,
                s.icon, s.display_order, s.status, s.image_id, s.published_at,
                s.created_at, s.updated_at, m.storage_key as image_storage_key
         from services s
         left join media_assets m on s.image_id = m.id
         where s.id = $1`,
        [id]
      )
      if (!rows[0]) throw new NotFoundError(`Service with ID ${id} not found`)
      return rows[0]
    },

    async getBySlug(slug: string, publishedOnly = true): Promise<ServiceRecord> {
      const { rows } = await db.query<ServiceRecord>(
        `select s.id, s.slug, s.name, s.name_ar, s.description, s.description_ar,
                s.icon, s.display_order, s.status, s.image_id, s.published_at,
                s.created_at, s.updated_at, m.storage_key as image_storage_key
         from services s
         left join media_assets m on s.image_id = m.id
         where s.slug = $1 ${publishedOnly ? "and s.status = 'published'" : ''}`,
        [slug]
      )
      if (!rows[0]) throw new NotFoundError(`Service with slug '${slug}' not found`)
      return rows[0]
    },

    async update(id: number, raw: UpdateServiceInput): Promise<ServiceRecord> {
      const s = updateServiceSchema.parse(raw)
      const existing = await this.getById(id)

      const updatedSlug = s.slug ?? existing.slug
      const updatedName = s.name ?? existing.name
      const updatedNameAr = s.nameAr !== undefined ? s.nameAr : existing.name_ar
      const updatedDesc = s.description !== undefined ? s.description : existing.description
      const updatedDescAr = s.descriptionAr !== undefined ? s.descriptionAr : existing.description_ar
      const updatedIcon = s.icon !== undefined ? s.icon : existing.icon
      const updatedOrder = s.displayOrder !== undefined ? s.displayOrder : existing.display_order
      const updatedStatus = s.status ?? existing.status
      const updatedImageId = s.imageId !== undefined ? s.imageId : existing.image_id

      try {
        const { rows } = await db.query<ServiceRecord>(
          `update services
           set slug = $2, name = $3, name_ar = $4, description = $5,
               description_ar = $6, icon = $7, display_order = $8,
               status = $9, image_id = $10
           where id = $1
           returning id, slug, name, name_ar, description, description_ar, icon, display_order, status, image_id, published_at, created_at, updated_at`,
          [
            id,
            updatedSlug,
            updatedName,
            updatedNameAr,
            updatedDesc,
            updatedDescAr,
            updatedIcon,
            updatedOrder,
            updatedStatus,
            updatedImageId,
          ]
        )
        if (!rows[0]) throw new NotFoundError(`Service with ID ${id} not found`)
        return rows[0]
      } catch (e) {
        return mapDbError(e, 'Service')
      }
    },

    async setStatus(id: number, status: 'draft' | 'published'): Promise<ServiceRecord> {
      const { rows } = await db.query<ServiceRecord>(
        `update services
         set status = $2
         where id = $1
         returning id, slug, name, name_ar, description, description_ar, icon, display_order, status, image_id, published_at, created_at, updated_at`,
        [id, status]
      )
      if (!rows[0]) throw new NotFoundError(`Service with ID ${id} not found`)
      return rows[0]
    },

    async reorder(items: Array<{ id: number; displayOrder: number }>): Promise<void> {
      await db.transaction(async (tx) => {
        for (const item of items) {
          await tx.query('update services set display_order = $2 where id = $1', [
            item.id,
            item.displayOrder,
          ])
        }
      })
    },

    /** Blocked with ConflictError while any project references the service. */
    async remove(id: number): Promise<void> {
      try {
        const res = await db.query('delete from services where id = $1 returning id', [id])
        if (res.rows.length === 0) throw new NotFoundError(`Service with ID ${id} not found`)
      } catch (e) {
        mapDbError(e, 'Service')
      }
    },
  }
}
