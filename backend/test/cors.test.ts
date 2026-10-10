import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/app'

describe('CORS and Security Headers', () => {
  const app = createApp()

  it('includes security headers from Helmet', async () => {
    const response = await request(app).get('/health')

    expect(response.headers['x-dns-prefetch-control']).toBe('off')
    expect(response.headers['x-frame-options']).toBe('SAMEORIGIN')
    expect(response.headers['x-content-type-options']).toBe('nosniff')
  })

  it('sets Access-Control-Allow-Origin for allowed origin', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://localhost:3000')

    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000')
    expect(response.headers['access-control-allow-credentials']).toBe('true')
  })
})
