import { describe, it, expect } from 'vitest'
import request from 'supertest'
import express from 'express'
import { createApp } from '../src/app'
import { BadRequestError, ValidationError } from '../src/shared/errors/AppError'
import { errorHandler } from '../src/shared/errors/errorHandler'

describe('Error Handling Middleware', () => {
  it('returns 404 for unknown route', async () => {
    const app = createApp()
    const response = await request(app).get('/api/v1/unknown-endpoint-xyz')

    expect(response.status).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.error.code).toBe('NotFoundError')
    expect(response.body.error.message).toContain('Cannot GET /api/v1/unknown-endpoint-xyz')
  })

  it('handles custom AppError correctly', async () => {
    const app = express()
    app.use(express.json())
    app.get('/test-error', () => {
      throw new BadRequestError('Custom bad request', { field: 'email' })
    })
    app.use(errorHandler)

    const response = await request(app).get('/test-error')

    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.error.code).toBe('BadRequestError')
    expect(response.body.error.message).toBe('Custom bad request')
    expect(response.body.error.details).toEqual({ field: 'email' })
  })

  it('handles ValidationError with 422 status', async () => {
    const app = express()
    app.use(express.json())
    app.get('/test-validation', () => {
      throw new ValidationError('Validation failed for input')
    })
    app.use(errorHandler)

    const response = await request(app).get('/test-validation')

    expect(response.status).toBe(422)
    expect(response.body.success).toBe(false)
    expect(response.body.error.code).toBe('ValidationError')
  })
})
