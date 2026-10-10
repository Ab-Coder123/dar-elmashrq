import type { Db } from '../../infrastructure/database/db'
import { mapDbError } from '../../infrastructure/database/mapDbError'
import { NotFoundError } from '../../shared/errors/AppError'
import { serviceInputSchema, type ServiceInput } from '../content/content.schemas'

export interface ServiceRow {
  id: number
  slug: string
  name: string
  name_ar: string | null
  display_order: number
  status: 'draft' | 'published'
  published_at: Date | string | null
}

export function createServicesRepository(db: Db) {
  return {
    async create(raw: ServiceInput): Promise<ServiceRow> {
      const s = serviceInputSchema.parse(raw)
      try {
        const { rows } = await db.query<ServiceRow>(
          `insert into services (slug, name, name_ar, description, description_ar, icon, display_order, status, image_id)
           values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`,
          [s.slug, s.name, s.nameAr ?? null, s.description ?? null, s.descriptionAr ?? null,
           s.icon ?? null, s.displayOrder, s.status, s.imageId ?? null]
        )
        return rows[0]!
      } catch (e) {
        return mapDbError(e, 'Service')
      }
    },
    /** publishedOnly=true is the only mode public endpoints may use. */
    async list(publishedOnly: boolean): Promise<ServiceRow[]> {
      const { rows } = await db.query<ServiceRow>(
        `select * from services ${publishedOnly ? "where status = 'published'" : ''}
         order by display_order, id`
      )
      return rows
    },
    async setStatus(id: number, status: 'draft' | 'published'): Promise<ServiceRow> {
      const { rows } = await db.query<ServiceRow>(
        'update services set status = $2 where id = $1 returning *',
        [id, status]
      )
      if (!rows[0]) throw new NotFoundError('Service not found')
      return rows[0]
    },
    /** Blocked with ConflictError while any project references the service. */
    async remove(id: number): Promise<void> {
      try {
        const res = await db.query('delete from services where id = $1 returning id', [id])
        if (res.rows.length === 0) throw new NotFoundError('Service not found')
      } catch (e) {
        mapDbError(e, 'Service')
      }
    },
  }
}
