import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/app'

describe('Health Check Endpoints', () => {
  const app = createApp()

  it('GET /health returns 200 with service information', async () => {
    const response = await request(app).get('/health')

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      status: 'healthy',
      service: 'Dar ElMashrq Backend API',
      version: '1.0.0',
    })
    expect(response.body.timestamp).toBeDefined()
    expect(response.body.uptime).toBeTypeOf('number')
  })

  it('GET /api/v1/health returns 200 via API prefix', async () => {
    const response = await request(app).get('/api/v1/health')

    expect(response.status).toBe(200)
    expect(response.body.status).toBe('healthy')
  })
})
