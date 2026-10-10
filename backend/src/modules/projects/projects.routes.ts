import { Router } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { createProjectsController } from './projects.controller'

export function createPublicProjectsRouter(db?: Db): Router {
  const router = Router()
  const controller = createProjectsController(db)

  router.get('/', controller.getPublicProjects)
  router.get('/featured', controller.getFeaturedProjects)
  router.get('/:slug', controller.getPublicProjectBySlug)

  return router
}

export function createAdminProjectsRouter(db?: Db): Router {
  const router = Router()
  const controller = createProjectsController(db)

  router.get('/', controller.getAdminProjects)
  router.post('/', controller.createAdminProject)
  router.put('/reorder', controller.reorderAdminProjects)
  router.get('/:id', controller.getAdminProjectById)
  router.put('/:id', controller.updateAdminProject)
  router.patch('/:id/status', controller.patchAdminProjectStatus)
  router.delete('/:id', controller.deleteAdminProject)

  return router
}
