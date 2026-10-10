import type { Db } from '../../infrastructure/database/db'
import { mapDbError } from '../../infrastructure/database/mapDbError'
import { NotFoundError } from '../../shared/errors/AppError'
import {
  mediaInputSchema,
  updateMediaSchema,
  type MediaInput,
  type UpdateMediaInput,
} from './media.schemas'

export interface MediaRecord {
  id: number
  storage_key: string
  filename: string
  mime_type: string
  size_bytes: string | number
  width: number | null
  height: number | null
  alt_text: string | null
  alt_text_ar: string | null
  category: string
  is_public: boolean
  uploaded_by: number | null
  created_at: Date | string
}

export interface ListMediaOptions {
  category?: string
  isPublic?: boolean
  search?: string
  publicOnly?: boolean
  page?: number
  pageSize?: number
}

export function createMediaRepository(db: Db) {
  return {
    async create(raw: MediaInput): Promise<MediaRecord> {
      const m = mediaInputSchema.parse(raw)
      try {
        const { rows } = await db.query<MediaRecord>(
          `insert into media_assets
             (storage_key, filename, mime_type, size_bytes, width, height, alt_text, alt_text_ar, category, is_public, uploaded_by)
           values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
           returning *`,
          [
            m.storageKey,
            m.filename,
            m.mimeType,
            m.sizeBytes,
            m.width ?? null,
            m.height ?? null,
            m.altText ?? null,
            m.altTextAr ?? null,
            m.category,
            m.isPublic,
            m.uploadedBy ?? null,
          ]
        )
        return rows[0]!
      } catch (e) {
        return mapDbError(e, 'Media asset')
      }
    },

    async getById(id: number, publicOnly = false): Promise<MediaRecord> {
      const { rows } = await db.query<MediaRecord>(
        `select * from media_assets where id = $1 ${publicOnly ? 'and is_public = true' : ''}`,
        [id]
      )
      if (!rows[0]) throw new NotFoundError(`Media asset with ID ${id} not found`)
      return rows[0]
    },

    async findByStorageKey(key: string, publicOnly = false): Promise<MediaRecord> {
      const { rows } = await db.query<MediaRecord>(
        `select * from media_assets where storage_key = $1 ${publicOnly ? 'and is_public = true' : ''}`,
        [key]
      )
      if (!rows[0]) throw new NotFoundError(`Media asset with key '${key}' not found`)
      return rows[0]
    },

    async list(opts: ListMediaOptions): Promise<{ items: MediaRecord[]; total: number }> {
      const pageSize = Math.min(Math.max(opts.pageSize ?? 20, 1), 100)
      const offset = (Math.max(opts.page ?? 1, 1) - 1) * pageSize
      const where: string[] = []
      const params: unknown[] = []

      if (opts.publicOnly) {
        where.push('is_public = true')
      } else if (opts.isPublic !== undefined) {
        params.push(opts.isPublic)
        where.push(`is_public = $${params.length}`)
      }

      if (opts.category) {
        params.push(opts.category)
        where.push(`category = $${params.length}`)
      }

      if (opts.search) {
        params.push(`%${opts.search}%`)
        where.push(`(filename ilike $${params.length} or storage_key ilike $${params.length} or coalesce(alt_text, '') ilike $${params.length})`)
      }

      const clause = where.length ? `where ${where.join(' and ')}` : ''
      const countRes = await db.query<{ n: string }>(
        `select count(*) as n from media_assets ${clause}`,
        params
      )
      const total = Number(countRes.rows[0]?.n ?? 0)

      const { rows } = await db.query<MediaRecord>(
        `select * from media_assets ${clause} order by created_at desc, id desc limit ${pageSize} offset ${offset}`,
        params
      )

      return { items: rows, total }
    },

    async update(id: number, raw: UpdateMediaInput): Promise<MediaRecord> {
      const m = updateMediaSchema.parse(raw)
      const existing = await this.getById(id, false)

      const updatedFilename = m.filename ?? existing.filename
      const updatedAltText = m.altText !== undefined ? m.altText : existing.alt_text
      const updatedAltTextAr = m.altTextAr !== undefined ? m.altTextAr : existing.alt_text_ar
      const updatedCategory = m.category ?? existing.category
      const updatedIsPublic = m.isPublic !== undefined ? m.isPublic : existing.is_public

      try {
        const { rows } = await db.query<MediaRecord>(
          `update media_assets
           set filename = $2, alt_text = $3, alt_text_ar = $4, category = $5, is_public = $6
           where id = $1
           returning *`,
          [id, updatedFilename, updatedAltText, updatedAltTextAr, updatedCategory, updatedIsPublic]
        )
        if (!rows[0]) throw new NotFoundError(`Media asset with ID ${id} not found`)
        return rows[0]
      } catch (e) {
        return mapDbError(e, 'Media asset')
      }
    },

    /** Fails with ConflictError while the asset is still referenced by any project or service (FK restrict). */
    async remove(id: number): Promise<void> {
      try {
        const res = await db.query('delete from media_assets where id = $1 returning id', [id])
        if (res.rows.length === 0) throw new NotFoundError(`Media asset with ID ${id} not found`)
      } catch (e) {
        mapDbError(e, 'Media asset')
      }
    },
  }
}
