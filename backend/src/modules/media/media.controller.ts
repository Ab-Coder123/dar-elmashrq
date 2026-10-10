import type { Request, Response, NextFunction } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { getDb } from '../../infrastructure/database'
import { createMediaService } from './media.service'
import { mediaQuerySchema } from './media.schemas'

export function createMediaController(customDb?: Db) {
  const getDatabase = () => customDb ?? getDb()

  return {
    async getPublicMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const query = mediaQuerySchema.parse(req.query)
        const service = createMediaService(getDatabase())
        const data = await service.getPublicMedia(query)

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

    async getPublicMediaById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createMediaService(getDatabase())
        const data = await service.getPublicMediaById(id)

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

    async getAdminMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const query = mediaQuerySchema.parse(req.query)
        const service = createMediaService(getDatabase())
        const data = await service.getAdminMedia(query)

        res.status(200).json({
          success: true,
          ...data,
        })
      } catch (err) {
        next(err)
      }
    },

    async getAdminMediaById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createMediaService(getDatabase())
        const data = await service.getAdminMediaById(id)

        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async createAdminMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createMediaService(getDatabase())
        const data = await service.createMedia(req.body)

        res.status(201).json({
          success: true,
          message: 'Media asset created successfully.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async updateAdminMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createMediaService(getDatabase())
        const data = await service.updateMedia(id, req.body)

        res.status(200).json({
          success: true,
          message: 'Media asset updated successfully.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async deleteAdminMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = Number(req.params.id)
        const service = createMediaService(getDatabase())
        await service.deleteMedia(id)

        res.status(200).json({
          success: true,
          message: 'Media asset deleted successfully.',
        })
      } catch (err) {
        next(err)
      }
    },
  }
}
