import type { Request, Response, NextFunction } from 'express'
import type { Db } from '../../infrastructure/database/db'
import { getDb } from '../../infrastructure/database'
import { createAuthService } from './auth.service'
import { UnauthorizedError } from '../../shared/errors/AppError'

export function createAuthController(customDb?: Db) {
  const getDatabase = () => customDb ?? getDb()

  return {
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const service = createAuthService(getDatabase())
        const data = await service.login(req.body)

        res.status(200).json({
          success: true,
          message: 'Authentication successful.',
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        if (!req.user) {
          throw new UnauthorizedError('Authentication required.')
        }

        const service = createAuthService(getDatabase())
        const data = await service.getCurrentUser(req.user.userId)

        res.status(200).json({
          success: true,
          data,
        })
      } catch (err) {
        next(err)
      }
    },

    async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        if (!req.user) {
          throw new UnauthorizedError('Authentication required.')
        }

        const service = createAuthService(getDatabase())
        const data = await service.changePassword(req.user.userId, req.body)

        res.status(200).json({
          success: true,
          message: data.message,
        })
      } catch (err) {
        next(err)
      }
    },

    async logout(_req: Request, res: Response): Promise<void> {
      res.status(200).json({
        success: true,
        message: 'Logged out successfully.',
      })
    },
  }
}
