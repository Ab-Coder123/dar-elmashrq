import type { Request, Response, NextFunction } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { getDb } from '../../infrastructure/database'
import { createSettingsService } from './settings.service'
import { patchSettingsStatusSchema } from './settings.schemas'

export function createSettingsController(customDb?: Db) {
  const getDatabase = () => customDb ?? getDb()

  return {
    async getPublicSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createSettingsService(getDatabase())
        const data = await service.getPublicSettings()

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

    async getAdminSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createSettingsService(getDatabase())
        const data = await service.getAdminSettings()
        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async updateAdminSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createSettingsService(getDatabase())
        const data = await service.updateAdminSettings(req.body)
        res.status(200).json({
          success: true,
          message: 'Global site settings updated successfully.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async patchSettingsStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { status } = patchSettingsStatusSchema.parse(req.body)
        const service = createSettingsService(getDatabase())
        const data = await service.setSettingsStatus(status)
        res.status(200).json({
          success: true,
          message: `Site settings publication status set to ${status}.`,
          data,
        })
      } catch (err) {
        next(err)
      }
    },
  }
}
