import type { Request, Response, NextFunction } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { getDb } from '../../infrastructure/database'
import { createProjectsService } from './projects.service'
import { projectQuerySchema } from './projects.schemas'

export function createProjectsController(customDb?: Db) {
  const getDatabase = () => customDb ?? getDb()

  return {
    async getPublicProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const query = projectQuerySchema.parse(req.query)
        const service = createProjectsService(getDatabase())
        const data = await service.getPublicProjects(query)

        res.setHeader(
          'Cache-Control',
          'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
        )
        res.status(200).json({
          success: true,
          ...data,
        })
      } catch (err) {
        next(err)
      }
    },

    async getFeaturedProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createProjectsService(getDatabase())
        const data = await service.getFeaturedProjects()

        res.setHeader(
          'Cache-Control',
          'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
        )
        res.status(200).json({
          success: true,
          count: data.length,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async getPublicProjectBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { slug } = req.params
        const service = createProjectsService(getDatabase())
        const data = await service.getPublicProjectBySlug(String(slug))

        res.setHeader(
          'Cache-Control',
          'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
        )
        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async getAdminProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const query = projectQuerySchema.parse(req.query)
        const service = createProjectsService(getDatabase())
        const data = await service.getAdminProjects(query)

        res.status(200).json({
          success: true,
          ...data,
        })
      } catch (err) {
        next(err)
      }
    },

    async getAdminProjectById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createProjectsService(getDatabase())
        const data = await service.getAdminProjectById(id)

        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async createAdminProject(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createProjectsService(getDatabase())
        const data = await service.createProject(req.body)

        res.status(201).json({
          success: true,
          message: 'Project created successfully.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async updateAdminProject(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createProjectsService(getDatabase())
        const data = await service.updateProject(id, req.body)

        res.status(200).json({
          success: true,
          message: 'Project updated successfully.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async patchAdminProjectStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createProjectsService(getDatabase())
        const data = await service.patchProjectStatus(id, req.body)

        res.status(200).json({
          success: true,
          message: `Project publication status updated to ${data.status}.`,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async reorderAdminProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createProjectsService(getDatabase())
        await service.reorderProjects(req.body)

        res.status(200).json({
          success: true,
          message: 'Projects display order updated successfully.',
        })
      } catch (err) {
        next(err)
      }
    },

    async deleteAdminProject(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createProjectsService(getDatabase())
        await service.deleteProject(id)

        res.status(200).json({
          success: true,
          message: 'Project deleted successfully.',
        })
      } catch (err) {
        next(err)
      }
    },
  }
}
