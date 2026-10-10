import { Router } from 'express'
import type { Db } from './infrastructure/database/db'
import { healthRouter } from './modules/health/health.routes'
import { createAuthRouter } from './modules/auth/auth.routes'
import { createPublicHomeRouter, createAdminHomeRouter } from './modules/home/home.routes'
import { createPublicAboutRouter, createAdminAboutRouter } from './modules/about/about.routes'
import { createPublicServicesRouter, createAdminServicesRouter } from './modules/services/services.routes'
import { createPublicProjectsRouter, createAdminProjectsRouter } from './modules/projects/projects.routes'
import { createPublicMediaRouter, createAdminMediaRouter } from './modules/media/media.routes'
import { createPublicContactRouter, createAdminContactRouter } from './modules/contact/contact.routes'
import { createPublicSettingsRouter, createAdminSettingsRouter } from './modules/settings/settings.routes'
import { createPublicSeoRouter, createAdminSeoRouter } from './modules/seo/seo.routes'
import { requireAuth } from './shared/middleware/authGuard'

export interface RouterOptions {
  enableAuth?: boolean
}

export function createAppRouter(db?: Db, options: RouterOptions = {}): Router {
  const router = Router()
  const enableAuth = options.enableAuth ?? (process.env.NODE_ENV !== 'test')
  const adminGuard = enableAuth
    ? requireAuth
    : ((_req: unknown, _res: unknown, next: () => void) => next())

  // Module sub-routes
  router.use('/health', healthRouter)
  router.use('/auth', createAuthRouter(db))

  router.use('/home', createPublicHomeRouter(db))
  router.use('/admin/home', adminGuard, createAdminHomeRouter(db))

  router.use('/about', createPublicAboutRouter(db))
  router.use('/admin/about', adminGuard, createAdminAboutRouter(db))

  router.use('/services', createPublicServicesRouter(db))
  router.use('/admin/services', adminGuard, createAdminServicesRouter(db))

  router.use('/projects', createPublicProjectsRouter(db))
  router.use('/admin/projects', adminGuard, createAdminProjectsRouter(db))

  router.use('/media', createPublicMediaRouter(db))
  router.use('/admin/media', adminGuard, createAdminMediaRouter(db))

  router.use('/contact', createPublicContactRouter(db))
  router.use('/admin/contact', adminGuard, createAdminContactRouter(db))

  router.use('/settings', createPublicSettingsRouter(db))
  router.use('/admin/settings', adminGuard, createAdminSettingsRouter(db))

  router.use('/seo', createPublicSeoRouter(db))
  router.use('/admin/seo', adminGuard, createAdminSeoRouter(db))

  return router
}

export const appRouter = createAppRouter()

