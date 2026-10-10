import type { Db } from '../../infrastructure/database/db'
import { mapDbError } from '../../infrastructure/database/mapDbError'
import { NotFoundError } from '../../shared/errors/AppError'
import {
  seoPageKeySchema,
  seoMetadataInputSchema,
  type SeoMetadataInput,
} from './seo.schemas'

export interface SeoRecord {
  page_key: string
  title: string | null
  title_ar: string | null
  description: string | null
  description_ar: string | null
  og_image_id: number | null
  og_image_storage_key?: string | null
  updated_at: Date | string
}

export function createSeoRepository(db: Db) {
  return {
    async upsert(pageKey: string, raw: SeoMetadataInput): Promise<SeoRecord> {
      const validKey = seoPageKeySchema.parse(pageKey)
      const input = seoMetadataInputSchema.parse(raw)

      try {
        const { rows } = await db.query<SeoRecord>(
          `insert into seo_metadata (page_key, title, title_ar, description, description_ar, og_image_id)
           values ($1, $2, $3, $4, $5, $6)
           on conflict (page_key) do update
           set title = excluded.title,
               title_ar = excluded.title_ar,
               description = excluded.description,
               description_ar = excluded.description_ar,
               og_image_id = excluded.og_image_id
           returning *`,
          [
            validKey,
            input.title ?? null,
            input.titleAr ?? null,
            input.description ?? null,
            input.descriptionAr ?? null,
            input.ogImageId ?? null,
          ]
        )
        return rows[0]!
      } catch (e) {
        return mapDbError(e, 'SEO metadata')
      }
    },

    async getByPageKey(pageKey: string): Promise<SeoRecord> {
      const validKey = seoPageKeySchema.parse(pageKey)
      const { rows } = await db.query<SeoRecord>(
        `select s.*, m.storage_key as og_image_storage_key
         from seo_metadata s
         left join media_assets m on s.og_image_id = m.id
         where s.page_key = $1`,
        [validKey]
      )
      if (!rows[0]) throw new NotFoundError(`SEO metadata for page '${pageKey}' not found`)
      return rows[0]
    },

    async list(): Promise<SeoRecord[]> {
      const { rows } = await db.query<SeoRecord>(
        `select s.*, m.storage_key as og_image_storage_key
         from seo_metadata s
         left join media_assets m on s.og_image_id = m.id
         order by s.page_key asc`
      )
      return rows
    },
  }
}
