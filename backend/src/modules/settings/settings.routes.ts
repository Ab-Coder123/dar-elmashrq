import { Router } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { createSettingsController } from './settings.controller'

export function createPublicSettingsRouter(db?: Db): Router {
  const router = Router()
  const controller = createSettingsController(db)

  router.get('/', controller.getPublicSettings)

  return router
}

export function createAdminSettingsRouter(db?: Db): Router {
  const router = Router()
  const controller = createSettingsController(db)

  router.get('/', controller.getAdminSettings)
  router.put('/', controller.updateAdminSettings)
  router.patch('/status', controller.patchSettingsStatus)

  return router
}
