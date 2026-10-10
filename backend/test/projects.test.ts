import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Db } from '../src/infrastructure/database/db'
import { createPgliteDb } from '../src/infrastructure/database/pglite.driver'
import { migrate } from '../src/infrastructure/database/migrate'
import { createApp } from '../src/app'
import { createServicesRepository } from '../src/modules/services/services.repository'

let db: Db
let app: ReturnType<typeof createApp>
let civilServiceId: number
let createdProjectId: number
let egyptProjectId: number
let qatarProjectId: number

beforeAll(async () => {
  db = await createPgliteDb()
  await migrate(db)
  app = createApp(db)

  // Seed a service to link with projects
  const servicesRepo = createServicesRepository(db)
  const civilService = await servicesRepo.create({
    slug: 'civil-contracting',
    name: 'Civil Contracting & Infrastructure',
    nameAr: 'المقاولات المدنية والبنية التحتية',
    status: 'published',
    displayOrder: 1,
  })
  civilServiceId = civilService.id
}, 60_000)

afterAll(async () => {
  await db.close()
})

describe('Projects API (Phase 06)', () => {
  it('GET /api/v1/projects returns empty paginated list before any project is published', async () => {
    const res = await request(app).get('/api/v1/projects')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.total).toBe(0)
    expect(res.body.items).toEqual([])
    expect(res.headers['cache-control']).toContain('public')
  })

  it('GET /api/v1/admin/projects returns empty list initially', async () => {
    const res = await request(app).get('/api/v1/admin/projects')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.total).toBe(0)
    expect(res.body.items).toEqual([])
  })

  it('POST /api/v1/admin/projects rejects invalid payload with 422', async () => {
    const res = await request(app)
      .post('/api/v1/admin/projects')
      .send({
        slug: 'INVALID SLUG',
        name: '',
        country: 'unknown-country',
        category: 'unknown-category',
      })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('VALIDATION_ERROR')
  })

  it('POST /api/v1/admin/projects creates a draft project with linked services', async () => {
    const res = await request(app)
      .post('/api/v1/admin/projects')
      .send({
        slug: 'beverly-al-azeeza-new-facade',
        name: 'Beverly Al-Azeeza New Facade',
        nameAr: 'بيفرلي الواجهة الجديدة للعزيزة',
        country: 'saudi-arabia',
        location: 'Al-Azeeza, Riyadh',
        locationAr: 'العزيزية، الرياض',
        category: 'commercial',
        year: 2022,
        description: 'Complete exterior facade renovation and structural modernization.',
        descriptionAr: 'تجديد الواجهة الخارجية والتحديث الهيكلي الكامل.',
        scope: 'Civil Works, Structural Glazing, External Architectural Cladding',
        clientName: 'Al-Azeeza Commercial Group',
        isFeatured: true,
        displayOrder: 1,
        status: 'draft',
        serviceIds: [civilServiceId],
      })

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.id).toBeDefined()
    expect(res.body.data.slug).toBe('beverly-al-azeeza-new-facade')
    expect(res.body.data.country).toBe('saudi-arabia')
    expect(res.body.data.status).toBe('draft')
    expect(res.body.data.services.length).toBe(1)
    expect(res.body.data.services[0].id).toBe(civilServiceId)

    createdProjectId = res.body.data.id
  })

  it('POST /api/v1/admin/projects rejects duplicate slug with 409 Conflict', async () => {
    const res = await request(app)
      .post('/api/v1/admin/projects')
      .send({
        slug: 'beverly-al-azeeza-new-facade',
        name: 'Duplicate Project',
        country: 'saudi-arabia',
        category: 'commercial',
      })

    expect(res.status).toBe(409)
    expect(res.body.success).toBe(false)
  })

  it('GET /api/v1/projects excludes draft project', async () => {
    const res = await request(app).get('/api/v1/projects')
    expect(res.status).toBe(200)
    expect(res.body.total).toBe(0)
    expect(res.body.items.length).toBe(0)
  })

  it('GET /api/v1/projects/:slug returns 404 for draft project', async () => {
    const res = await request(app).get('/api/v1/projects/beverly-al-azeeza-new-facade')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })

  it('GET /api/v1/admin/projects returns the draft project with full filters', async () => {
    const res = await request(app).get('/api/v1/admin/projects?status=draft')
    expect(res.status).toBe(200)
    expect(res.body.total).toBe(1)
    expect(res.body.items[0].id).toBe(createdProjectId)
  })

  it('GET /api/v1/admin/projects/:id returns single project details', async () => {
    const res = await request(app).get(`/api/v1/admin/projects/${createdProjectId}`)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe('Beverly Al-Azeeza New Facade')
    expect(res.body.data.year).toBe(2022)
  })

  it('GET /api/v1/admin/projects/99999 returns 404 for non-existent project', async () => {
    const res = await request(app).get('/api/v1/admin/projects/99999')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })

  it('PUT /api/v1/admin/projects/:id updates project fields and relations', async () => {
    const res = await request(app)
      .put(`/api/v1/admin/projects/${createdProjectId}`)
      .send({
        name: 'Beverly Al-Azeeza Landmark Facade',
        year: 2023,
      })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe('Beverly Al-Azeeza Landmark Facade')
    expect(res.body.data.year).toBe(2023)
  })

  it('PATCH /api/v1/admin/projects/:id/status publishes the project', async () => {
    const res = await request(app)
      .patch(`/api/v1/admin/projects/${createdProjectId}/status`)
      .send({ status: 'published' })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.status).toBe('published')
    expect(res.body.data.publishedAt).not.toBeNull()
  })

  it('GET /api/v1/projects returns the published project with Cache-Control headers', async () => {
    const res = await request(app).get('/api/v1/projects')
    expect(res.status).toBe(200)
    expect(res.body.total).toBe(1)
    expect(res.body.items[0].slug).toBe('beverly-al-azeeza-new-facade')
    expect(res.headers['cache-control']).toContain('public')
    expect(res.headers['cache-control']).toContain('max-age=60')
  })

  it('GET /api/v1/projects/:slug returns single published project with linked services', async () => {
    const res = await request(app).get('/api/v1/projects/beverly-al-azeeza-new-facade')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe('Beverly Al-Azeeza Landmark Facade')
    expect(res.body.data.services.length).toBe(1)
    expect(res.body.data.services[0].slug).toBe('civil-contracting')
  })

  it('Verifies country filtering across Saudi Arabia, Egypt, and Qatar', async () => {
    // Create an Egyptian project
    const egRes = await request(app)
      .post('/api/v1/admin/projects')
      .send({
        slug: 'awlad-ragab-supermarket-chain',
        name: 'Awlad Ragab Supermarket Chain',
        nameAr: 'سلسلة سوبر ماركت أولاد رجب',
        country: 'egypt',
        location: 'Cairo, Egypt',
        category: 'commercial',
        isFeatured: true,
        displayOrder: 2,
        status: 'published',
      })
    egyptProjectId = egRes.body.data.id

    // Create a Qatari project
    const qaRes = await request(app)
      .post('/api/v1/admin/projects')
      .send({
        slug: 'villa-al-mishaf-qatar',
        name: 'Private Villa — Al-Mishaf',
        nameAr: 'فيلا المشاف',
        country: 'qatar',
        location: 'Al-Mishaf',
        category: 'residential',
        isFeatured: false,
        displayOrder: 3,
        status: 'published',
      })
    qatarProjectId = qaRes.body.data.id

    // Test Saudi Arabia filter
    const saFilter = await request(app).get('/api/v1/projects?country=saudi-arabia')
    expect(saFilter.status).toBe(200)
    expect(saFilter.body.total).toBe(1)
    expect(saFilter.body.items[0].country).toBe('saudi-arabia')

    // Test Egypt filter
    const egFilter = await request(app).get('/api/v1/projects?country=egypt')
    expect(egFilter.status).toBe(200)
    expect(egFilter.body.total).toBe(1)
    expect(egFilter.body.items[0].country).toBe('egypt')

    // Test Qatar filter
    const qaFilter = await request(app).get('/api/v1/projects?country=qatar')
    expect(qaFilter.status).toBe(200)
    expect(qaFilter.body.total).toBe(1)
    expect(qaFilter.body.items[0].country).toBe('qatar')

    // Test All Countries (no filter)
    const allFilter = await request(app).get('/api/v1/projects')
    expect(allFilter.status).toBe(200)
    expect(allFilter.body.total).toBe(3)
  })

  it('Verifies category and featured filtering', async () => {
    // Category filter
    const residentialFilter = await request(app).get('/api/v1/projects?category=residential')
    expect(residentialFilter.status).toBe(200)
    expect(residentialFilter.body.total).toBe(1)
    expect(residentialFilter.body.items[0].slug).toBe('villa-al-mishaf-qatar')

    // Featured filter endpoint
    const featuredRes = await request(app).get('/api/v1/projects/featured')
    expect(featuredRes.status).toBe(200)
    expect(featuredRes.body.count).toBe(2)
  })

  it('Verifies search querying', async () => {
    const searchRes = await request(app).get('/api/v1/projects?search=Ragab')
    expect(searchRes.status).toBe(200)
    expect(searchRes.body.total).toBe(1)
    expect(searchRes.body.items[0].slug).toBe('awlad-ragab-supermarket-chain')
  })

  it('PUT /api/v1/admin/projects/reorder updates display orders of projects', async () => {
    const reorderRes = await request(app)
      .put('/api/v1/admin/projects/reorder')
      .send({
        items: [
          { id: qatarProjectId, displayOrder: 1 },
          { id: egyptProjectId, displayOrder: 2 },
          { id: createdProjectId, displayOrder: 3 },
        ],
      })

    expect(reorderRes.status).toBe(200)
    expect(reorderRes.body.success).toBe(true)

    // Verify ordering
    const listRes = await request(app).get('/api/v1/projects')
    expect(listRes.body.items[0].id).toBe(qatarProjectId)
    expect(listRes.body.items[1].id).toBe(egyptProjectId)
    expect(listRes.body.items[2].id).toBe(createdProjectId)
  })

  it('DELETE /api/v1/admin/projects/:id successfully removes a project and its associations', async () => {
    const deleteRes = await request(app).delete(`/api/v1/admin/projects/${createdProjectId}`)
    expect(deleteRes.status).toBe(200)
    expect(deleteRes.body.success).toBe(true)

    const checkRes = await request(app).get(`/api/v1/admin/projects/${createdProjectId}`)
    expect(checkRes.status).toBe(404)
  })
})
