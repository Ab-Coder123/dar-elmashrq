import type { Db } from '../../infrastructure/database/db'
import { mapDbError } from '../../infrastructure/database/mapDbError'
import { NotFoundError } from '../../shared/errors/AppError'
import {
  documentSchemas,
  seoInputSchema,
  type DocumentKey,
  type SeoInput,
} from './content.schemas'

export interface DocumentRow {
  key: DocumentKey
  data: Record<string, unknown>
  status: 'draft' | 'published'
  published_at: Date | string | null
}

export function createContentRepository(db: Db) {
  return {
    /** Validates `data` against the per-key schema, then upserts (data-upsert rule). */
    async saveDocument(
      key: DocumentKey,
      data: unknown,
      status: 'draft' | 'published',
      updatedBy?: number
    ): Promise<DocumentRow> {
      const schema = documentSchemas[key]
      if (!schema) throw new NotFoundError(`Unknown document key: ${String(key)}`)
      const valid = schema.parse(data)
      try {
        const { rows } = await db.query<DocumentRow>(
          `insert into content_documents (key, data, status, updated_by)
           values ($1, $2::jsonb, $3, $4)
           on conflict (key) do update
             set data = excluded.data, status = excluded.status, updated_by = excluded.updated_by
           returning key, data, status, published_at`,
          [key, JSON.stringify(valid), status, updatedBy ?? null]
        )
        return rows[0]!
      } catch (e) {
        return mapDbError(e, 'Document')
      }
    },
    async getDocument(key: DocumentKey, publishedOnly: boolean): Promise<DocumentRow> {
      const { rows } = await db.query<DocumentRow>(
        `select key, data, status, published_at from content_documents
         where key = $1 ${publishedOnly ? "and status = 'published'" : ''}`,
        [key]
      )
      if (!rows[0]) throw new NotFoundError('Document not found')
      return rows[0]
    },
    async saveSeo(raw: SeoInput): Promise<void> {
      const s = seoInputSchema.parse(raw)
      try {
        await db.query(
          `insert into seo_metadata (page_key, title, title_ar, description, description_ar, og_image_id)
           values ($1,$2,$3,$4,$5,$6)
           on conflict (page_key) do update set
             title = excluded.title, title_ar = excluded.title_ar, description = excluded.description,
             description_ar = excluded.description_ar, og_image_id = excluded.og_image_id`,
          [s.pageKey, s.title ?? null, s.titleAr ?? null, s.description ?? null, s.descriptionAr ?? null,
           s.ogImageId ?? null]
        )
      } catch (e) {
        mapDbError(e, 'SEO metadata')
      }
    },
  }
}
