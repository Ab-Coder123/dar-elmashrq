import type { Db } from '../../infrastructure/database/db'
import { createSeoRepository, type SeoRecord } from './seo.repository'
import { type SeoMetadataInput } from './seo.schemas'

export interface SeoDto {
  pageKey: string
  title: string | null
  titleAr: string | null
  description: string | null
  descriptionAr: string | null
  ogImageId: number | null
  ogImageStorageKey: string | null
  updatedAt: Date | string
}

function mapToDto(row: SeoRecord): SeoDto {
  return {
    pageKey: row.page_key,
    title: row.title ?? null,
    titleAr: row.title_ar ?? null,
    description: row.description ?? null,
    descriptionAr: row.description_ar ?? null,
    ogImageId: row.og_image_id ? Number(row.og_image_id) : null,
    ogImageStorageKey: row.og_image_storage_key ?? null,
    updatedAt: row.updated_at,
  }
}

export function createSeoService(db: Db) {
  const repo = createSeoRepository(db)

  return {
    async getSeoByPageKey(pageKey: string): Promise<SeoDto> {
      const record = await repo.getByPageKey(pageKey)
      return mapToDto(record)
    },

    async getAllSeo(): Promise<SeoDto[]> {
      const records = await repo.list()
      return records.map(mapToDto)
    },

    async upsertSeo(pageKey: string, rawInput: SeoMetadataInput): Promise<SeoDto> {
      const record = await repo.upsert(pageKey, rawInput)
      return mapToDto(record)
    },
  }
}
