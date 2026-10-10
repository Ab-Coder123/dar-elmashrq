import type { Db } from '../../infrastructure/database/db'
import { mapDbError } from '../../infrastructure/database/mapDbError'
import { NotFoundError } from '../../shared/errors/AppError'
import { mediaInputSchema, type MediaInput } from '../content/content.schemas'

export interface MediaRow {
  id: number
  storage_key: string
  filename: string
  mime_type: string
  size_bytes: string
  is_public: boolean
  category: string
  alt_text: string | null
}

export function createMediaRepository(db: Db) {
  return {
    async create(raw: MediaInput): Promise<MediaRow> {
      const m = mediaInputSchema.parse(raw)
      try {
        const { rows } = await db.query<MediaRow>(
          `insert into media_assets
             (storage_key, filename, mime_type, size_bytes, width, height, alt_text, alt_text_ar, category, is_public, uploaded_by)
           values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *`,
          [m.storageKey, m.filename, m.mimeType, m.sizeBytes, m.width ?? null, m.height ?? null,
           m.altText ?? null, m.altTextAr ?? null, m.category, m.isPublic, m.uploadedBy ?? null]
        )
        return rows[0]!
      } catch (e) {
        return mapDbError(e, 'Media asset')
      }
    },
    async getById(id: number): Promise<MediaRow> {
      const { rows } = await db.query<MediaRow>('select * from media_assets where id = $1', [id])
      if (!rows[0]) throw new NotFoundError('Media asset not found')
      return rows[0]
    },
    /** Fails with ConflictError while the asset is still referenced (FK restrict). */
    async remove(id: number): Promise<void> {
      try {
        const res = await db.query('delete from media_assets where id = $1 returning id', [id])
        if (res.rows.length === 0) throw new NotFoundError('Media asset not found')
      } catch (e) {
        mapDbError(e, 'Media asset')
      }
    },
  }
}
