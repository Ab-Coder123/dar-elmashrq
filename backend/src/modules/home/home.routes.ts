import { Router } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { createHomeController } from './home.controller'

export function createPublicHomeRouter(db?: Db): Router {
  const router = Router()
  const controller = createHomeController(db)

  router.get('/', controller.getPublicHome)

  return router
}

export function createAdminHomeRouter(db?: Db): Router {
  const router = Router()
  const controller = createHomeController(db)

  router.get('/', controller.getAdminHome)
  router.put('/', controller.updateAdminHome)
  router.patch('/status', controller.patchHomeStatus)

  return router
}
