import { Router } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { createSeoController } from './seo.controller'

export function createPublicSeoRouter(db?: Db): Router {
  const router = Router()
  const controller = createSeoController(db)

  router.get('/', controller.getAllPublicSeo)
  router.get('/:pageKey', controller.getPublicSeoByPageKey)

  return router
}

export function createAdminSeoRouter(db?: Db): Router {
  const router = Router()
  const controller = createSeoController(db)

  router.get('/', controller.getAdminSeo)
  router.put('/:pageKey', controller.updateAdminSeo)

  return router
}
