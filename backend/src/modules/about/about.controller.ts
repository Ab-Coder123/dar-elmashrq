import type { Request, Response, NextFunction } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { getDb } from '../../infrastructure/database'
import { createAboutService } from './about.service'
import { patchAboutStatusSchema } from './about.schemas'

export function createAboutController(customDb?: Db) {
  const getDatabase = () => customDb ?? getDb()

  return {
    async getPublicAbout(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const aboutService = createAboutService(getDatabase())
        const data = await aboutService.getPublicAboutContent()

        // Cache header for public distribution
        res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600')
        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async getAdminAbout(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const aboutService = createAboutService(getDatabase())
        const data = await aboutService.getAdminAboutContent()
        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async updateAdminAbout(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const aboutService = createAboutService(getDatabase())
        const data = await aboutService.updateAdminAboutContent(req.body)
        res.status(200).json({
          success: true,
          message: 'About Us page content updated successfully.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async patchAboutStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { status } = patchAboutStatusSchema.parse(req.body)
        const aboutService = createAboutService(getDatabase())
        const data = await aboutService.setAboutStatus(status)
        res.status(200).json({
          success: true,
          message: `About Us page publication status set to ${status}.`,
          data,
        })
      } catch (err) {
        next(err)
      }
    },
  }
}
