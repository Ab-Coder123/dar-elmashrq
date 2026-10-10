import express, { type Application } from 'express'
import helmet from 'helmet'
import type { Db } from './infrastructure/database/db'
import { env } from './config/env'
import { corsMiddleware } from './shared/middleware/cors'
import { requestLogger } from './shared/middleware/requestLogger'
import { errorHandler } from './shared/errors/errorHandler'
import { NotFoundError } from './shared/errors/AppError'
import { createAppRouter, type RouterOptions } from './routes'
import { getHealthStatus } from './modules/health/health.controller'

export interface AppOptions extends RouterOptions {}

export function createApp(customDb?: Db, options: AppOptions = {}): Application {
  const app = express()

  // Security Middleware
  app.use(helmet())
  app.use(corsMiddleware)

  // Body Parsing Middleware
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))

  // Logging Middleware
  app.use(requestLogger)

  // Direct Health Check Route (for load balancers, container orchestration)
  app.get('/health', getHealthStatus)

  // API Version 1 Routes
  app.use(env.API_PREFIX, createAppRouter(customDb, options))

  // Fallback 404 Route
  app.use((req, _res, next) => {
    next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`))
  })

  // Centralized Error Handling
  app.use(errorHandler)

  return app
}

