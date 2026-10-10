import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { AppError } from './AppError'
import { env } from '../../config/env'

export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError | ZodError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  // Handle Zod Schema Validation Errors
  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request payload',
        details: err.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      },
    })
    return
  }

  // Handle Known Operational Application Errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.constructor.name,
        message: err.message,
        ...(err.details ? { details: err.details } : {}),
      },
    })
    return
  }

  // Handle Unexpected Server Errors
  if (!env.isTest) {
    console.error('💥 Unhandled Exception:', err)
  }

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: env.isProduction ? 'An unexpected error occurred.' : err.message,
      ...(env.isProduction ? {} : { stack: err.stack }),
    },
  })
}
