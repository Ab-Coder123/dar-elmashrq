import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Db } from '../src/infrastructure/database/db'
import { createPgliteDb } from '../src/infrastructure/database/pglite.driver'
import { migrate } from '../src/infrastructure/database/migrate'
import { createApp } from '../src/app'
import { createProjectsRepository } from '../src/modules/projects/projects.repository'

let db: Db
let app: ReturnType<typeof createApp>

beforeAll(async () => {
  db = await createPgliteDb()
  await migrate(db)
  app = createApp(db)
}, 60_000)

afterAll(async () => {
  await db.close()
})

describe('Services API (Phase 05)', () => {
  let createdServiceId: number
  let secondServiceId: number

  it('GET /api/v1/services returns empty list before any service is published', async () => {
    const res = await request(app).get('/api/v1/services')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.count).toBe(0)
    expect(res.body.data).toEqual([])
  })

  it('GET /api/v1/admin/services returns empty list initially', async () => {
    const res = await request(app).get('/api/v1/admin/services')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.count).toBe(0)
    expect(res.body.data).toEqual([])
  })

  it('POST /api/v1/admin/services rejects invalid payload with 422', async () => {
    const res = await request(app)
      .post('/api/v1/admin/services')
      .send({ slug: 'INVALID SLUG WITH SPACES', name: '' })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('VALIDATION_ERROR')
  })

  it('POST /api/v1/admin/services creates a draft service', async () => {
    const res = await request(app)
      .post('/api/v1/admin/services')
      .send({
        slug: 'civil-works-finishing',
        name: 'Civil Works & Finishing',
        nameAr: 'أعمال مدنية والتشطيبات',
        description: 'Complete civil construction and luxury finishing works.',
        descriptionAr: 'أعمال البناء المدني والتشطيبات عالية الجودة.',
        icon: 'Building2',
        displayOrder: 1,
        status: 'draft',
      })

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.id).toBeDefined()
    expect(res.body.data.slug).toBe('civil-works-finishing')
    expect(res.body.data.status).toBe('draft')

    createdServiceId = res.body.data.id
  })

  it('POST /api/v1/admin/services rejects duplicate slug with 409', async () => {
    const res = await request(app)
      .post('/api/v1/admin/services')
      .send({
        slug: 'civil-works-finishing',
        name: 'Duplicate Civil Works',
      })

    expect(res.status).toBe(409)
    expect(res.body.success).toBe(false)
  })

  it('GET /api/v1/services still returns empty because created service is draft', async () => {
    const res = await request(app).get('/api/v1/services')
    expect(res.status).toBe(200)
    expect(res.body.count).toBe(0)
  })

  it('GET /api/v1/services/:slug returns 404 for draft service', async () => {
    const res = await request(app).get('/api/v1/services/civil-works-finishing')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })

  it('GET /api/v1/admin/services returns the created draft service', async () => {
    const res = await request(app).get('/api/v1/admin/services')
    expect(res.status).toBe(200)
    expect(res.body.count).toBe(1)
    expect(res.body.data[0].id).toBe(createdServiceId)
  })

  it('GET /api/v1/admin/services/:id returns service details', async () => {
    const res = await request(app).get(`/api/v1/admin/services/${createdServiceId}`)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe('Civil Works & Finishing')
  })

  it('GET /api/v1/admin/services/99999 returns 404 for non-existent service ID', async () => {
    const res = await request(app).get('/api/v1/admin/services/99999')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })

  it('PUT /api/v1/admin/services/:id updates service information', async () => {
    const res = await request(app)
      .put(`/api/v1/admin/services/${createdServiceId}`)
      .send({
        name: 'Civil Works & Premium Finishing',
        displayOrder: 2,
      })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe('Civil Works & Premium Finishing')
    expect(res.body.data.displayOrder).toBe(2)
  })

  it('PATCH /api/v1/admin/services/:id/status publishes the service', async () => {
    const res = await request(app)
      .patch(`/api/v1/admin/services/${createdServiceId}/status`)
      .send({ status: 'published' })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.status).toBe('published')
    expect(res.body.data.publishedAt).not.toBeNull()
  })

  it('GET /api/v1/services returns the published service with Cache-Control headers', async () => {
    const res = await request(app).get('/api/v1/services')
    expect(res.status).toBe(200)
    expect(res.body.count).toBe(1)
    expect(res.headers['cache-control']).toContain('public')
    expect(res.headers['cache-control']).toContain('max-age=60')
    expect(res.body.data[0].slug).toBe('civil-works-finishing')
  })

  it('GET /api/v1/services/:slug returns single published service', async () => {
    const res = await request(app).get('/api/v1/services/civil-works-finishing')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe('Civil Works & Premium Finishing')
  })

  it('PUT /api/v1/admin/services/reorder updates order of multiple services', async () => {
    // Create second service
    const createRes = await request(app)
      .post('/api/v1/admin/services')
      .send({
        slug: 'electrical-works',
        name: 'Electrical Works',
        displayOrder: 1,
        status: 'published',
      })
    secondServiceId = createRes.body.data.id

    const reorderRes = await request(app)
      .put('/api/v1/admin/services/reorder')
      .send({
        items: [
          { id: createdServiceId, displayOrder: 1 },
          { id: secondServiceId, displayOrder: 2 },
        ],
      })

    expect(reorderRes.status).toBe(200)
    expect(reorderRes.body.success).toBe(true)

    // Verify ordering in public endpoint
    const listRes = await request(app).get('/api/v1/services')
    expect(listRes.status).toBe(200)
    expect(listRes.body.count).toBe(2)
    expect(listRes.body.data[0].id).toBe(createdServiceId)
    expect(listRes.body.data[1].id).toBe(secondServiceId)
  })

  it('DELETE /api/v1/admin/services/:id prevents deletion when referenced by a project', async () => {
    const projectsRepo = createProjectsRepository(db)
    await projectsRepo.create({
      slug: 'landmark-tower',
      name: 'Landmark Tower',
      country: 'saudi-arabia',
      category: 'commercial',
      serviceIds: [createdServiceId],
      status: 'published',
    })

    const deleteRes = await request(app).delete(`/api/v1/admin/services/${createdServiceId}`)
    expect(deleteRes.status).toBe(409)
    expect(deleteRes.body.success).toBe(false)
  })

  it('DELETE /api/v1/admin/services/:id successfully removes an unreferenced service', async () => {
    const deleteRes = await request(app).delete(`/api/v1/admin/services/${secondServiceId}`)
    expect(deleteRes.status).toBe(200)
    expect(deleteRes.body.success).toBe(true)

    const checkRes = await request(app).get(`/api/v1/admin/services/${secondServiceId}`)
    expect(checkRes.status).toBe(404)
  })
})
