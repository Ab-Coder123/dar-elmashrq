import type { Request, Response, NextFunction } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { getDb } from '../../infrastructure/database'
import { createServicesService } from './services.service'

export function createServicesController(customDb?: Db) {
  const getDatabase = () => customDb ?? getDb()

  return {
    async getPublicServices(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createServicesService(getDatabase())
        const data = await service.getPublicServices()

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

    async getPublicServiceBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { slug } = req.params
        const service = createServicesService(getDatabase())
        const data = await service.getPublicServiceBySlug(String(slug))

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

    async getAdminServices(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createServicesService(getDatabase())
        const data = await service.getAdminServices()

        res.status(200).json({
          success: true,
          count: data.length,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async getAdminServiceById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createServicesService(getDatabase())
        const data = await service.getAdminServiceById(id)

        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async createAdminService(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createServicesService(getDatabase())
        const data = await service.createService(req.body)

        res.status(201).json({
          success: true,
          message: 'Service created successfully.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async updateAdminService(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createServicesService(getDatabase())
        const data = await service.updateService(id, req.body)

        res.status(200).json({
          success: true,
          message: 'Service updated successfully.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async patchAdminServiceStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createServicesService(getDatabase())
        const data = await service.patchServiceStatus(id, req.body)

        res.status(200).json({
          success: true,
          message: `Service publication status updated to ${data.status}.`,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async reorderAdminServices(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createServicesService(getDatabase())
        await service.reorderServices(req.body)

        res.status(200).json({
          success: true,
          message: 'Services display order updated successfully.',
        })
      } catch (err) {
        next(err)
      }
    },

    async deleteAdminService(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createServicesService(getDatabase())
        await service.deleteService(id)

        res.status(200).json({
          success: true,
          message: 'Service deleted successfully.',
        })
      } catch (err) {
        next(err)
      }
    },
  }
}
