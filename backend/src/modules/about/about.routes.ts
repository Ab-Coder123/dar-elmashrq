import { Router } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { createAboutController } from './about.controller'

export function createPublicAboutRouter(db?: Db): Router {
  const router = Router()
  const controller = createAboutController(db)

  router.get('/', controller.getPublicAbout)

  return router
}

export function createAdminAboutRouter(db?: Db): Router {
  const router = Router()
  const controller = createAboutController(db)

  router.get('/', controller.getAdminAbout)
  router.put('/', controller.updateAdminAbout)
  router.patch('/status', controller.patchAboutStatus)

  return router
}
