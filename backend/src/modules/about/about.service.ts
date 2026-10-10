import type { Db } from '../../infrastructure/database/db'
import { createContentRepository } from '../content/content.repository'
import {
  aboutContentSchema,
  type AboutContentInput,
  type AboutContentOutput,
} from './about.schemas'
import { NotFoundError } from '../../shared/errors/AppError'

export function createAboutService(db: Db) {
  const contentRepo = createContentRepository(db)

  return {
    /**
     * Public About Page query:
     * - Returns only if status is 'published'
     */
    async getPublicAboutContent(): Promise<{
      content: AboutContentOutput
      publishedAt: Date | string | null
    }> {
      const doc = await contentRepo.getDocument('about', true)
      if (!doc || doc.status !== 'published') {
        throw new NotFoundError('About Us page content has not been published yet.')
      }

      const parsedContent = aboutContentSchema.parse(doc.data)

      return {
        content: parsedContent,
        publishedAt: doc.published_at,
      }
    },

    /**
     * Admin About Page query:
     * - Returns draft or published document
     */
    async getAdminAboutContent() {
      try {
        const doc = await contentRepo.getDocument('about', false)
        return {
          key: doc.key,
          content: aboutContentSchema.parse(doc.data),
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

    /**
     * Admin About Page mutation:
     * - Validates payload against aboutContentSchema
     * - Saves into content_documents table
     */
    async updateAdminAboutContent(
      rawInput: AboutContentInput,
      userId?: number
    ) {
      const validated = aboutContentSchema.parse(rawInput)
      const doc = await contentRepo.saveDocument(
        'about',
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

    /**
     * Change publication status of the About Us page
     */
    async setAboutStatus(status: 'draft' | 'published', userId?: number) {
      const existing = await contentRepo.getDocument('about', false)
      const doc = await contentRepo.saveDocument(
        'about',
        existing.data,
        status,
        userId
      )
      return {
        key: doc.key,
        content: aboutContentSchema.parse(doc.data),
        status: doc.status,
        publishedAt: doc.published_at,
      }
    },
  }
}
