import { Router } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { createMediaController } from './media.controller'

export function createPublicMediaRouter(db?: Db): Router {
  const router = Router()
  const controller = createMediaController(db)

  router.get('/', controller.getPublicMedia)
  router.get('/:id', controller.getPublicMediaById)

  return router
}

export function createAdminMediaRouter(db?: Db): Router {
  const router = Router()
  const controller = createMediaController(db)

  router.get('/', controller.getAdminMedia)
  router.post('/', controller.createAdminMedia)
  router.get('/:id', controller.getAdminMediaById)
  router.put('/:id', controller.updateAdminMedia)
  router.delete('/:id', controller.deleteAdminMedia)

  return router
}
