import { Router } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { createContactController } from './contact.controller'

export function createPublicContactRouter(db?: Db): Router {
  const router = Router()
  const controller = createContactController(db)

  router.get('/', controller.getPublicContact)
  router.post('/inquiries', controller.submitInquiry)

  return router
}

export function createAdminContactRouter(db?: Db): Router {
  const router = Router()
  const controller = createContactController(db)

  router.get('/', controller.getAdminContact)
  router.put('/', controller.updateAdminContact)
  router.patch('/status', controller.patchContactStatus)

  // Inquiries endpoints
  router.get('/inquiries', controller.getAdminInquiries)
  router.get('/inquiries/:id', controller.getAdminInquiryById)
  router.patch('/inquiries/:id/status', controller.patchAdminInquiryStatus)
  router.delete('/inquiries/:id', controller.deleteAdminInquiry)

  return router
}
