import type { Request, Response, NextFunction } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { getDb } from '../../infrastructure/database'
import { createSeoService } from './seo.service'

export function createSeoController(customDb?: Db) {
  const getDatabase = () => customDb ?? getDb()

  return {
    async getAllPublicSeo(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createSeoService(getDatabase())
        const data = await service.getAllSeo()

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

    async getPublicSeoByPageKey(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { pageKey } = req.params
        const service = createSeoService(getDatabase())
        const data = await service.getSeoByPageKey(String(pageKey))

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

    async getAdminSeo(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createSeoService(getDatabase())
        const data = await service.getAllSeo()

        res.status(200).json({
          success: true,
          count: data.length,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async updateAdminSeo(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { pageKey } = req.params
        const service = createSeoService(getDatabase())
        const data = await service.upsertSeo(String(pageKey), req.body)

        res.status(200).json({
          success: true,
          message: `SEO metadata for page '${pageKey}' saved successfully.`,
          data,
        })
      } catch (err) {
        next(err)
      }
    },
  }
}
