import type { Db } from '../../infrastructure/database/db'
import { createContentRepository } from '../content/content.repository'
import {
  siteSettingsSchema,
  type SiteSettingsInput,
  type SiteSettingsOutput,
} from './settings.schemas'
import { NotFoundError } from '../../shared/errors/AppError'

export function createSettingsService(db: Db) {
  const contentRepo = createContentRepository(db)

  return {
    async getPublicSettings(): Promise<{
      content: SiteSettingsOutput
      publishedAt: Date | string | null
    }> {
      const doc = await contentRepo.getDocument('settings', true)
      if (!doc || doc.status !== 'published') {
        throw new NotFoundError('Global site settings have not been published yet.')
      }

      const parsedContent = siteSettingsSchema.parse(doc.data)
      return {
        content: parsedContent,
        publishedAt: doc.published_at,
      }
    },

    async getAdminSettings() {
      try {
        const doc = await contentRepo.getDocument('settings', false)
        return {
          key: doc.key,
          content: siteSettingsSchema.parse(doc.data),
          status: doc.status,
          publishedAt: doc.published_at,
        }
      } catch (err) {
        if (err instanceof NotFoundError) {
          return null
        }
        throw err
      }
    },

    async updateAdminSettings(rawInput: SiteSettingsInput, userId?: number) {
      const validated = siteSettingsSchema.parse(rawInput)
      const doc = await contentRepo.saveDocument(
        'settings',
        validated,
        validated.status,
        userId
      )
      return {
        key: doc.key,
        content: validated,
        status: doc.status,
        publishedAt: doc.published_at,
      }
    },

    async setSettingsStatus(status: 'draft' | 'published', userId?: number) {
      const existing = await contentRepo.getDocument('settings', false)
      const doc = await contentRepo.saveDocument(
        'settings',
        existing.data,
        status,
        userId
      )
      return {
        key: doc.key,
        content: siteSettingsSchema.parse(doc.data),
        status: doc.status,
        publishedAt: doc.published_at,
      }
    },
  }
}
