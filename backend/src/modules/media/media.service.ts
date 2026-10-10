import type { Db } from '../../infrastructure/database/db'
import { createMediaRepository, type MediaRecord } from './media.repository'
import {
  mediaInputSchema,
  updateMediaSchema,
  type MediaInput,
  type UpdateMediaInput,
  type MediaQueryInput,
} from './media.schemas'

export interface MediaDto {
  id: number
  storageKey: string
  filename: string
  mimeType: string
  sizeBytes: number
  width: number | null
  height: number | null
  altText: string | null
  altTextAr: string | null
  category: string
  isPublic: boolean
  uploadedBy: number | null
  createdAt: Date | string
}

function mapToDto(row: MediaRecord): MediaDto {
  return {
    id: Number(row.id),
    storageKey: row.storage_key,
    filename: row.filename,
    mimeType: row.mime_type,
    sizeBytes: Number(row.size_bytes),
    width: row.width ? Number(row.width) : null,
    height: row.height ? Number(row.height) : null,
    altText: row.alt_text ?? null,
    altTextAr: row.alt_text_ar ?? null,
    category: row.category,
    isPublic: row.is_public,
    uploadedBy: row.uploaded_by ? Number(row.uploaded_by) : null,
    createdAt: row.created_at,
  }
}

export function createMediaService(db: Db) {
  const repo = createMediaRepository(db)

  return {
    async getPublicMedia(query: MediaQueryInput) {
      const result = await repo.list({
        category: query.category,
        search: query.search,
        publicOnly: true,
        page: query.page,
        pageSize: query.pageSize,
      })

      return {
        items: result.items.map(mapToDto),
        total: result.total,
        page: query.page,
        pageSize: query.pageSize,
        totalPages: Math.ceil(result.total / query.pageSize),
      }
    },

    async getPublicMediaById(id: number): Promise<MediaDto> {
      const record = await repo.getById(id, true)
      return mapToDto(record)
    },

    async getAdminMedia(query: MediaQueryInput) {
      const result = await repo.list({
        category: query.category,
        isPublic: query.isPublic,
        search: query.search,
        publicOnly: false,
        page: query.page,
        pageSize: query.pageSize,
      })

      return {
        items: result.items.map(mapToDto),
        total: result.total,
        page: query.page,
        pageSize: query.pageSize,
        totalPages: Math.ceil(result.total / query.pageSize),
      }
    },

    async getAdminMediaById(id: number): Promise<MediaDto> {
      const record = await repo.getById(id, false)
      return mapToDto(record)
    },

    async createMedia(raw: MediaInput, userId?: number): Promise<MediaDto> {
      const validated = mediaInputSchema.parse({
        ...raw,
        uploadedBy: raw.uploadedBy ?? userId,
      })
      const record = await repo.create(validated)
      return mapToDto(record)
    },

    async updateMedia(id: number, raw: UpdateMediaInput, _userId?: number): Promise<MediaDto> {
      const validated = updateMediaSchema.parse(raw)
      const record = await repo.update(id, validated)
      return mapToDto(record)
    },

    async deleteMedia(id: number, _userId?: number): Promise<void> {
      await repo.remove(id)
    },
  }
}
