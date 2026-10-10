import { Router } from 'express'
import type { Db } from './infrastructure/database/db'
import { healthRouter } from './modules/health/health.routes'
import { createPublicHomeRouter, createAdminHomeRouter } from './modules/home/home.routes'
import { createPublicAboutRouter, createAdminAboutRouter } from './modules/about/about.routes'
import { createPublicServicesRouter, createAdminServicesRouter } from './modules/services/services.routes'
import { createPublicProjectsRouter, createAdminProjectsRouter } from './modules/projects/projects.routes'
import { createPublicMediaRouter, createAdminMediaRouter } from './modules/media/media.routes'

export function createAppRouter(db?: Db): Router {
  const router = Router()

  // Module sub-routes
  router.use('/health', healthRouter)
  router.use('/home', createPublicHomeRouter(db))
  router.use('/admin/home', createAdminHomeRouter(db))
  router.use('/about', createPublicAboutRouter(db))
  router.use('/admin/about', createAdminAboutRouter(db))
  router.use('/services', createPublicServicesRouter(db))
  router.use('/admin/services', createAdminServicesRouter(db))
  router.use('/projects', createPublicProjectsRouter(db))
  router.use('/admin/projects', createAdminProjectsRouter(db))
  router.use('/media', createPublicMediaRouter(db))
  router.use('/admin/media', createAdminMediaRouter(db))

  // Future Modules (Phases 08 - 09):
  // router.use('/contact', createContactRouter(db))
  // router.use('/settings', createSettingsRouter(db))
  // router.use('/auth', createAuthRouter(db))

  return router
}

export const appRouter = createAppRouter()
