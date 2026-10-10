import type { Request, Response, NextFunction } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { getDb } from '../../infrastructure/database'
import { createHomeService } from './home.service'
import { patchHomeStatusSchema } from './home.schemas'

export function createHomeController(customDb?: Db) {
  const getDatabase = () => customDb ?? getDb()

  return {
    async getPublicHome(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const homeService = createHomeService(getDatabase())
        const data = await homeService.getPublicHomeContent()

        // Cache header for public distribution (CDN & client caching)
        res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600')
        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async getAdminHome(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const homeService = createHomeService(getDatabase())
        const data = await homeService.getAdminHomeContent()
        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async updateAdminHome(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const homeService = createHomeService(getDatabase())
        const data = await homeService.updateAdminHomeContent(req.body)
        res.status(200).json({
          success: true,
          message: 'Home page content updated successfully.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async patchHomeStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { status } = patchHomeStatusSchema.parse(req.body)
        const homeService = createHomeService(getDatabase())
        const data = await homeService.setHomeStatus(status)
        res.status(200).json({
          success: true,
          message: `Home page publication status set to ${status}.`,
          data,
        })
      } catch (err) {
        next(err)
      }
    },
  }
}
