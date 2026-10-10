import type { Db } from '../../infrastructure/database/db'
import { mapDbError } from '../../infrastructure/database/mapDbError'
import { NotFoundError } from '../../shared/errors/AppError'
import { projectInputSchema, type ProjectInput } from '../content/content.schemas'

export interface ProjectRow {
  id: number
  slug: string
  name: string
  country: string
  category: string
  status: 'draft' | 'published'
  is_featured: boolean
  display_order: number
  published_at: Date | string | null
  service_slugs: string[]
  image_ids: number[]
}

export interface ListProjectsOptions {
  country?: 'saudi-arabia' | 'egypt' | 'qatar'
  /** Public endpoints must pass true. */
  publishedOnly: boolean
  page?: number
  pageSize?: number
}

const SELECT = `
  select p.*,
    coalesce((select array_agg(s.slug order by s.display_order, s.id)
              from project_services ps join services s on s.id = ps.service_id
              where ps.project_id = p.id), '{}') as service_slugs,
    coalesce((select array_agg(pi.media_id order by pi.sort_order, pi.media_id)
              from project_images pi where pi.project_id = p.id), '{}') as image_ids
  from projects p`

export function createProjectsRepository(db: Db) {
  return {
    async create(raw: ProjectInput): Promise<ProjectRow> {
      const p = projectInputSchema.parse(raw)
      try {
        const id = await db.transaction(async (tx) => {
          const { rows } = await tx.query<{ id: number }>(
            `insert into projects
               (slug, name, name_ar, country, location, location_ar, category, year, description, description_ar,
                scope, scope_ar, source_reference, client_name, is_featured, display_order, status, cover_image_id)
             values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) returning id`,
            [p.slug, p.name, p.nameAr ?? null, p.country, p.location ?? null, p.locationAr ?? null, p.category,
             p.year ?? null, p.description ?? null, p.descriptionAr ?? null, p.scope ?? null, p.scopeAr ?? null,
             p.sourceReference ?? null, p.clientName ?? null, p.isFeatured, p.displayOrder, p.status,
             p.coverImageId ?? null]
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
    async getById(id: number): Promise<ProjectRow> {
      const { rows } = await db.query<ProjectRow>(`${SELECT} where p.id = $1`, [id])
      if (!rows[0]) throw new NotFoundError('Project not found')
      return rows[0]
    },
    async findBySlug(slug: string, publishedOnly: boolean): Promise<ProjectRow> {
      const { rows } = await db.query<ProjectRow>(
        `${SELECT} where p.slug = $1 ${publishedOnly ? "and p.status = 'published'" : ''}`,
        [slug]
      )
      if (!rows[0]) throw new NotFoundError('Project not found')
      return rows[0]
    },
    async list(opts: ListProjectsOptions): Promise<{ items: ProjectRow[]; total: number }> {
      const pageSize = Math.min(Math.max(opts.pageSize ?? 20, 1), 100)
      const offset = (Math.max(opts.page ?? 1, 1) - 1) * pageSize
      const where: string[] = []
      const params: unknown[] = []
      if (opts.publishedOnly) where.push("p.status = 'published'")
      if (opts.country) {
        params.push(opts.country)
        where.push(`p.country = $${params.length}`)
      }
      const clause = where.length ? `where ${where.join(' and ')}` : ''
      const total = Number(
        (await db.query<{ n: string }>(`select count(*) as n from projects p ${clause}`, params)).rows[0]!.n
      )
      const { rows } = await db.query<ProjectRow>(
        `${SELECT} ${clause} order by p.display_order, p.id limit ${pageSize} offset ${offset}`,
        params
      )
      return { items: rows, total }
    },
    async setStatus(id: number, status: 'draft' | 'published'): Promise<ProjectRow> {
      const res = await db.query('update projects set status = $2 where id = $1 returning id', [id, status])
      if (res.rows.length === 0) throw new NotFoundError('Project not found')
      return this.getById(id)
    },
    async remove(id: number): Promise<void> {
      const res = await db.query('delete from projects where id = $1 returning id', [id])
      if (res.rows.length === 0) throw new NotFoundError('Project not found')
    },
  }
}
