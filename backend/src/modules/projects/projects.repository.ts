import type { Db } from '../../infrastructure/database/db'
import { mapDbError } from '../../infrastructure/database/mapDbError'
import { NotFoundError } from '../../shared/errors/AppError'
import {
  projectInputSchema,
  updateProjectSchema,
  type ProjectInput,
  type UpdateProjectInput,
} from './projects.schemas'

export interface ProjectLinkedService {
  id: number
  slug: string
  name: string
  nameAr: string | null
  icon: string | null
}

export interface ProjectLinkedImage {
  mediaId: number
  storageKey: string
  filename: string
  sortOrder: number
}

export interface ProjectRecord {
  id: number
  slug: string
  name: string
  name_ar: string | null
  country: 'saudi-arabia' | 'egypt' | 'qatar'
  location: string | null
  location_ar: string | null
  category: string
  year: number | null
  description: string | null
  description_ar: string | null
  scope: string | null
  scope_ar: string | null
  source_reference: string | null
  client_name: string | null
  is_featured: boolean
  display_order: number
  status: 'draft' | 'published'
  cover_image_id: number | null
  cover_image_storage_key: string | null
  published_at: Date | string | null
  created_at: Date | string
  updated_at: Date | string
  service_slugs: string[]
  image_ids: number[]
  services: ProjectLinkedService[] | string
  gallery_images: ProjectLinkedImage[] | string
}

export interface ListProjectsOptions {
  country?: 'saudi-arabia' | 'egypt' | 'qatar'
  category?: string
  isFeatured?: boolean
  search?: string
  status?: 'draft' | 'published'
  publishedOnly: boolean
  page?: number
  pageSize?: number
}

const SELECT = `
  select p.*,
    m.storage_key as cover_image_storage_key,
    coalesce(
      (select json_agg(json_build_object(
        'id', s.id,
        'slug', s.slug,
        'name', s.name,
        'nameAr', s.name_ar,
        'icon', s.icon
      ) order by s.display_order, s.id)
      from project_services ps
      join services s on s.id = ps.service_id
      where ps.project_id = p.id),
      '[]'::json
    ) as services,
    coalesce(
      (select json_agg(json_build_object(
        'mediaId', pi.media_id,
        'storageKey', img.storage_key,
        'filename', img.filename,
        'sortOrder', pi.sort_order
      ) order by pi.sort_order, pi.media_id)
      from project_images pi
      join media_assets img on img.id = pi.media_id
      where pi.project_id = p.id),
      '[]'::json
    ) as gallery_images,
    coalesce((select array_agg(s.slug order by s.display_order, s.id)
              from project_services ps join services s on s.id = ps.service_id
              where ps.project_id = p.id), '{}') as service_slugs,
    coalesce((select array_agg(pi.media_id order by pi.sort_order, pi.media_id)
              from project_images pi where pi.project_id = p.id), '{}') as image_ids
  from projects p
  left join media_assets m on p.cover_image_id = m.id`

export function createProjectsRepository(db: Db) {
  return {
    async create(raw: ProjectInput): Promise<ProjectRecord> {
      const p = projectInputSchema.parse(raw)
      try {
        const id = await db.transaction(async (tx) => {
          const { rows } = await tx.query<{ id: number }>(
            `insert into projects
               (slug, name, name_ar, country, location, location_ar, category, year, description, description_ar,
                scope, scope_ar, source_reference, client_name, is_featured, display_order, status, cover_image_id)
             values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) returning id`,
            [
              p.slug,
              p.name,
              p.nameAr ?? null,
              p.country,
              p.location ?? null,
              p.locationAr ?? null,
              p.category,
              p.year ?? null,
              p.description ?? null,
              p.descriptionAr ?? null,
              p.scope ?? null,
              p.scopeAr ?? null,
              p.sourceReference ?? null,
              p.clientName ?? null,
              p.isFeatured,
              p.displayOrder,
              p.status,
              p.coverImageId ?? null,
            ]
          )
          const projectId = rows[0]!.id

          if (p.serviceIds.length > 0) {
            await tx.query(
              'insert into project_services (project_id, service_id) select $1, unnest($2::bigint[])',
              [projectId, p.serviceIds]
            )
          }

          if (p.imageIds.length > 0) {
            await tx.query(
              `insert into project_images (project_id, media_id, sort_order)
               select $1, m, o - 1 from unnest($2::bigint[]) with ordinality as t(m, o)`,
              [projectId, p.imageIds]
            )
          }

          return projectId
        })
        return await this.getById(id)
      } catch (e) {
        return mapDbError(e, 'Project')
      }
    },

    async getById(id: number): Promise<ProjectRecord> {
      const { rows } = await db.query<ProjectRecord>(`${SELECT} where p.id = $1`, [id])
      if (!rows[0]) throw new NotFoundError(`Project with ID ${id} not found`)
      return rows[0]
    },

    async findBySlug(slug: string, publishedOnly: boolean): Promise<ProjectRecord> {
      const { rows } = await db.query<ProjectRecord>(
        `${SELECT} where p.slug = $1 ${publishedOnly ? "and p.status = 'published'" : ''}`,
        [slug]
      )
      if (!rows[0]) throw new NotFoundError(`Project with slug '${slug}' not found`)
      return rows[0]
    },

    async list(opts: ListProjectsOptions): Promise<{ items: ProjectRecord[]; total: number }> {
      const pageSize = Math.min(Math.max(opts.pageSize ?? 20, 1), 100)
      const offset = (Math.max(opts.page ?? 1, 1) - 1) * pageSize
      const where: string[] = []
      const params: unknown[] = []

      if (opts.publishedOnly) {
        where.push("p.status = 'published'")
      } else if (opts.status) {
        params.push(opts.status)
        where.push(`p.status = $${params.length}`)
      }

      if (opts.country) {
        params.push(opts.country)
        where.push(`p.country = $${params.length}`)
      }

      if (opts.category) {
        params.push(opts.category)
        where.push(`p.category = $${params.length}`)
      }

      if (opts.isFeatured !== undefined) {
        params.push(opts.isFeatured)
        where.push(`p.is_featured = $${params.length}`)
      }

      if (opts.search) {
        params.push(`%${opts.search}%`)
        where.push(`(p.name ilike $${params.length} or coalesce(p.name_ar, '') ilike $${params.length} or coalesce(p.location, '') ilike $${params.length})`)
      }

      const clause = where.length ? `where ${where.join(' and ')}` : ''
      const countRes = await db.query<{ n: string }>(
        `select count(*) as n from projects p ${clause}`,
        params
      )
      const total = Number(countRes.rows[0]?.n ?? 0)

      const { rows } = await db.query<ProjectRecord>(
        `${SELECT} ${clause} order by p.display_order asc, p.id asc limit ${pageSize} offset ${offset}`,
        params
      )

      return { items: rows, total }
    },

    async update(id: number, raw: UpdateProjectInput): Promise<ProjectRecord> {
      const p = updateProjectSchema.parse(raw)
      const existing = await this.getById(id)

      const updatedSlug = p.slug ?? existing.slug
      const updatedName = p.name ?? existing.name
      const updatedNameAr = p.nameAr !== undefined ? p.nameAr : existing.name_ar
      const updatedCountry = p.country ?? existing.country
      const updatedLocation = p.location !== undefined ? p.location : existing.location
      const updatedLocationAr = p.locationAr !== undefined ? p.locationAr : existing.location_ar
      const updatedCategory = p.category ?? existing.category
      const updatedYear = p.year !== undefined ? p.year : existing.year
      const updatedDesc = p.description !== undefined ? p.description : existing.description
      const updatedDescAr = p.descriptionAr !== undefined ? p.descriptionAr : existing.description_ar
      const updatedScope = p.scope !== undefined ? p.scope : existing.scope
      const updatedScopeAr = p.scopeAr !== undefined ? p.scopeAr : existing.scope_ar
      const updatedSourceRef = p.sourceReference !== undefined ? p.sourceReference : existing.source_reference
      const updatedClientName = p.clientName !== undefined ? p.clientName : existing.client_name
      const updatedFeatured = p.isFeatured !== undefined ? p.isFeatured : existing.is_featured
      const updatedOrder = p.displayOrder !== undefined ? p.displayOrder : existing.display_order
      const updatedStatus = p.status ?? existing.status
      const updatedCoverImageId = p.coverImageId !== undefined ? p.coverImageId : existing.cover_image_id

      try {
        await db.transaction(async (tx) => {
          const { rows } = await tx.query<{ id: number }>(
            `update projects
             set slug = $2, name = $3, name_ar = $4, country = $5, location = $6, location_ar = $7,
                 category = $8, year = $9, description = $10, description_ar = $11, scope = $12,
                 scope_ar = $13, source_reference = $14, client_name = $15, is_featured = $16,
                 display_order = $17, status = $18, cover_image_id = $19
             where id = $1
             returning id`,
            [
              id,
              updatedSlug,
              updatedName,
              updatedNameAr,
              updatedCountry,
              updatedLocation,
              updatedLocationAr,
              updatedCategory,
              updatedYear,
              updatedDesc,
              updatedDescAr,
              updatedScope,
              updatedScopeAr,
              updatedSourceRef,
              updatedClientName,
              updatedFeatured,
              updatedOrder,
              updatedStatus,
              updatedCoverImageId,
            ]
          )

          if (!rows[0]) throw new NotFoundError(`Project with ID ${id} not found`)

          if (p.serviceIds !== undefined) {
            await tx.query('delete from project_services where project_id = $1', [id])
            if (p.serviceIds.length > 0) {
              await tx.query(
                'insert into project_services (project_id, service_id) select $1, unnest($2::bigint[])',
                [id, p.serviceIds]
              )
            }
          }

          if (p.imageIds !== undefined) {
            await tx.query('delete from project_images where project_id = $1', [id])
            if (p.imageIds.length > 0) {
              await tx.query(
                `insert into project_images (project_id, media_id, sort_order)
                 select $1, m, o - 1 from unnest($2::bigint[]) with ordinality as t(m, o)`,
                [id, p.imageIds]
              )
            }
          }
        })

        return await this.getById(id)
      } catch (e) {
        return mapDbError(e, 'Project')
      }
    },

    async setStatus(id: number, status: 'draft' | 'published'): Promise<ProjectRecord> {
      const res = await db.query(
        'update projects set status = $2 where id = $1 returning id',
        [id, status]
      )
      if (res.rows.length === 0) throw new NotFoundError(`Project with ID ${id} not found`)
      return this.getById(id)
    },

    async reorder(items: Array<{ id: number; displayOrder: number }>): Promise<void> {
      await db.transaction(async (tx) => {
        for (const item of items) {
          await tx.query('update projects set display_order = $2 where id = $1', [
            item.id,
            item.displayOrder,
          ])
        }
      })
    },

    async remove(id: number): Promise<void> {
      try {
        const res = await db.query('delete from projects where id = $1 returning id', [id])
        if (res.rows.length === 0) throw new NotFoundError(`Project with ID ${id} not found`)
      } catch (e) {
        mapDbError(e, 'Project')
      }
    },
  }
}
