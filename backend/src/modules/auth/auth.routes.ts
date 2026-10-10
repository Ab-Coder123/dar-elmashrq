import { Router } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { createAuthController } from './auth.controller'
import { requireAuth } from '../../shared/middleware/authGuard'

export function createAuthRouter(db?: Db): Router {
  const router = Router()
  const controller = createAuthController(db)

  router.post('/login', controller.login)
  router.get('/me', requireAuth, controller.getCurrentUser)
  router.post('/change-password', requireAuth, controller.changePassword)
  router.post('/logout', controller.logout)

  return router
}
