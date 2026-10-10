import type { Db } from '../../infrastructure/database/db'
import { createContentRepository } from '../content/content.repository'
import { createProjectsRepository } from '../projects/projects.repository'
import { createServicesRepository } from '../services/services.repository'
import {
  homeContentSchema,
  type HomeContentInput,
  type HomeContentOutput,
} from './home.schemas'
import { NotFoundError } from '../../shared/errors/AppError'

export function createHomeService(db: Db) {
  const contentRepo = createContentRepository(db)
  const projectsRepo = createProjectsRepository(db)
  const servicesRepo = createServicesRepository(db)

  return {
    /**
     * Public Home Page query:
     * - Returns only if status is 'published'
     * - Enriches with active featured projects and published services
     */
    async getPublicHomeContent(): Promise<{
      content: HomeContentOutput
      featuredProjects: unknown[]
      activeServices: unknown[]
      publishedAt: Date | string | null
    }> {
      const doc = await contentRepo.getDocument('home', true)
      if (!doc || doc.status !== 'published') {
        throw new NotFoundError('Home page content has not been published yet.')
      }

      const parsedContent = homeContentSchema.parse(doc.data)

      // Fetch active featured projects for homepage showcase
      const { items: featuredProjects } = await projectsRepo.list({
        publishedOnly: true,
        pageSize: 6,
      })

      // Fetch published services
      const activeServices = await servicesRepo.list(true)

      return {
        content: parsedContent,
        featuredProjects: featuredProjects.filter((p) => p.is_featured),
        activeServices,
        publishedAt: doc.published_at,
      }
    },

    /**
     * Admin Home Page query:
     * - Returns draft or published document
     */
    async getAdminHomeContent() {
      try {
        const doc = await contentRepo.getDocument('home', false)
        return {
          key: doc.key,
          content: homeContentSchema.parse(doc.data),
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
     * Admin Home Page mutation:
     * - Validates payload against homeContentSchema
     * - Saves into content_documents table
     */
    async updateAdminHomeContent(
      rawInput: HomeContentInput,
      userId?: number
    ) {
      const validated = homeContentSchema.parse(rawInput)
      const doc = await contentRepo.saveDocument(
        'home',
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
     * Change publication status of the Home page
     */
    async setHomeStatus(status: 'draft' | 'published', userId?: number) {
      const existing = await contentRepo.getDocument('home', false)
      const doc = await contentRepo.saveDocument(
        'home',
        existing.data,
        status,
        userId
      )
      return {
        key: doc.key,
        content: homeContentSchema.parse(doc.data),
        status: doc.status,
        publishedAt: doc.published_at,
      }
    },
  }
}
