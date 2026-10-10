import { Router } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { createServicesController } from './services.controller'

export function createPublicServicesRouter(db?: Db): Router {
  const router = Router()
  const controller = createServicesController(db)

  router.get('/', controller.getPublicServices)
  router.get('/:slug', controller.getPublicServiceBySlug)

  return router
}

export function createAdminServicesRouter(db?: Db): Router {
  const router = Router()
  const controller = createServicesController(db)

  router.get('/', controller.getAdminServices)
  router.post('/', controller.createAdminService)
  router.put('/reorder', controller.reorderAdminServices)
  router.get('/:id', controller.getAdminServiceById)
  router.put('/:id', controller.updateAdminService)
  router.patch('/:id/status', controller.patchAdminServiceStatus)
  router.delete('/:id', controller.deleteAdminService)

  return router
}
