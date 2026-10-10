import type { Request, Response } from 'express'
import { env } from '../../config/env'

export const getHealthStatus = (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'healthy',
    service: 'Dar ElMashrq Backend API',
    version: '1.0.0',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  })
}
