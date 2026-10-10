import { Router } from 'express'
import type { Db } from './infrastructure/database/db'
import { healthRouter } from './modules/health/health.routes'
import { createPublicHomeRouter, createAdminHomeRouter } from './modules/home/home.routes'

export function createAppRouter(db?: Db): Router {
  const router = Router()

  // Module sub-routes
  router.use('/health', healthRouter)
  router.use('/home', createPublicHomeRouter(db))
  router.use('/admin/home', createAdminHomeRouter(db))

  // Future Modules (Phases 04 - 09):
  // router.use('/about', createPublicAboutRouter(db))
  // router.use('/admin/about', createAdminAboutRouter(db))
  // router.use('/services', createServicesRouter(db))
  // router.use('/projects', createProjectsRouter(db))
  // router.use('/media', createMediaRouter(db))
  // router.use('/contact', createContactRouter(db))
  // router.use('/settings', createSettingsRouter(db))
  // router.use('/auth', createAuthRouter(db))

  return router
}

export const appRouter = createAppRouter()
