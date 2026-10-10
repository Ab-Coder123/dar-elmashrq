import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Db } from '../src/infrastructure/database/db'
import { createPgliteDb } from '../src/infrastructure/database/pglite.driver'
import { migrate } from '../src/infrastructure/database/migrate'
import { createApp } from '../src/app'
import { createProjectsRepository } from '../src/modules/projects/projects.repository'

let db: Db
let app: ReturnType<typeof createApp>
let publicMediaId: number
let privateMediaId: number
let unreferencedMediaId: number

beforeAll(async () => {
  db = await createPgliteDb()
  await migrate(db)
  app = createApp(db)
}, 60_000)

afterAll(async () => {
  await db.close()
})

describe('Media Library API (Phase 07)', () => {
  it('GET /api/v1/media returns empty paginated list before any public asset is uploaded', async () => {
    const res = await request(app).get('/api/v1/media')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.total).toBe(0)
    expect(res.body.items).toEqual([])
    expect(res.headers['cache-control']).toContain('public')
  })

  it('GET /api/v1/admin/media returns empty list initially', async () => {
    const res = await request(app).get('/api/v1/admin/media')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.total).toBe(0)
    expect(res.body.items).toEqual([])
  })

  it('POST /api/v1/admin/media rejects invalid MIME types with 422', async () => {
    const res = await request(app)
      .post('/api/v1/admin/media')
      .send({
        storageKey: 'uploads/dangerous-script.exe',
        filename: 'dangerous-script.exe',
        mimeType: 'application/x-msdownload',
        sizeBytes: 1024,
      })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('VALIDATION_ERROR')
  })

  it('POST /api/v1/admin/media rejects path traversal storage keys with 422', async () => {
    const res = await request(app)
      .post('/api/v1/admin/media')
      .send({
        storageKey: '../etc/passwd',
        filename: 'passwd',
        mimeType: 'image/jpeg',
        sizeBytes: 1024,
      })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
  })

  it('POST /api/v1/admin/media rejects oversized files (> 25MB) with 422', async () => {
    const res = await request(app)
      .post('/api/v1/admin/media')
      .send({
        storageKey: 'uploads/huge-video.mp4',
        filename: 'huge-video.mp4',
        mimeType: 'image/jpeg',
        sizeBytes: 30 * 1024 * 1024, // 30MB
      })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
  })

  it('POST /api/v1/admin/media creates a public media asset', async () => {
    const res = await request(app)
      .post('/api/v1/admin/media')
      .send({
        storageKey: 'projects/beverly-facade-main.jpg',
        filename: 'beverly-facade-main.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 2450000,
        width: 1920,
        height: 1080,
        altText: 'Beverly Al-Azeeza Modern Architectural Facade',
        altTextAr: 'واجهة بيفرلي العزيزية المعمارية الحديثة',
        category: 'projects',
        isPublic: true,
      })

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.id).toBeDefined()
    expect(res.body.data.isPublic).toBe(true)
    expect(res.body.data.category).toBe('projects')

    publicMediaId = res.body.data.id
  })

  it('POST /api/v1/admin/media creates a private media asset (sensitive document)', async () => {
    const res = await request(app)
      .post('/api/v1/admin/media')
      .send({
        storageKey: 'certificates/bank-iban-corporate.pdf',
        filename: 'bank-iban-corporate.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 520000,
        category: 'certificates',
        isPublic: false, // private company document
      })

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.isPublic).toBe(false)

    privateMediaId = res.body.data.id
  })

  it('POST /api/v1/admin/media rejects duplicate storageKey with 409 Conflict', async () => {
    const res = await request(app)
      .post('/api/v1/admin/media')
      .send({
        storageKey: 'projects/beverly-facade-main.jpg',
        filename: 'duplicate.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 1024,
      })

    expect(res.status).toBe(409)
    expect(res.body.success).toBe(false)
  })

  it('GET /api/v1/media returns only public media assets and excludes private ones', async () => {
    const res = await request(app).get('/api/v1/media')
    expect(res.status).toBe(200)
    expect(res.body.total).toBe(1)
    expect(res.body.items[0].id).toBe(publicMediaId)
    expect(res.headers['cache-control']).toContain('public')
  })

  it('GET /api/v1/media/:id returns 404 for private media asset', async () => {
    const res = await request(app).get(`/api/v1/media/${privateMediaId}`)
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })

  it('GET /api/v1/media/:id returns public media asset details', async () => {
    const res = await request(app).get(`/api/v1/media/${publicMediaId}`)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.filename).toBe('beverly-facade-main.jpg')
  })

  it('GET /api/v1/admin/media returns both public and private media assets', async () => {
    const res = await request(app).get('/api/v1/admin/media')
    expect(res.status).toBe(200)
    expect(res.body.total).toBe(2)
  })

  it('GET /api/v1/admin/media filters by category and search', async () => {
    const categoryRes = await request(app).get('/api/v1/admin/media?category=certificates')
    expect(categoryRes.status).toBe(200)
    expect(categoryRes.body.total).toBe(1)
    expect(categoryRes.body.items[0].id).toBe(privateMediaId)

    const searchRes = await request(app).get('/api/v1/admin/media?search=beverly')
    expect(searchRes.status).toBe(200)
    expect(searchRes.body.total).toBe(1)
    expect(searchRes.body.items[0].id).toBe(publicMediaId)
  })

  it('PUT /api/v1/admin/media/:id updates media metadata', async () => {
    const res = await request(app)
      .put(`/api/v1/admin/media/${publicMediaId}`)
      .send({
        altText: 'Updated Facade View High Resolution',
      })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.altText).toBe('Updated Facade View High Resolution')
  })

  it('DELETE /api/v1/admin/media/:id is prevented with 409 Conflict when referenced by a project', async () => {
    const projectsRepo = createProjectsRepository(db)
    await projectsRepo.create({
      slug: 'beverly-residence',
      name: 'Beverly Residence',
      country: 'saudi-arabia',
      category: 'residential',
      coverImageId: publicMediaId,
      status: 'published',
    })

    const deleteRes = await request(app).delete(`/api/v1/admin/media/${publicMediaId}`)
    expect(deleteRes.status).toBe(409)
    expect(deleteRes.body.success).toBe(false)
  })

  it('DELETE /api/v1/admin/media/:id successfully removes an unreferenced media asset', async () => {
    // Create an unreferenced asset
    const createRes = await request(app)
      .post('/api/v1/admin/media')
      .send({
        storageKey: 'branding/logo-temp.png',
        filename: 'logo-temp.png',
        mimeType: 'image/png',
        sizeBytes: 45000,
        category: 'branding',
      })
    unreferencedMediaId = createRes.body.data.id

    const deleteRes = await request(app).delete(`/api/v1/admin/media/${unreferencedMediaId}`)
    expect(deleteRes.status).toBe(200)
    expect(deleteRes.body.success).toBe(true)

    const checkRes = await request(app).get(`/api/v1/admin/media/${unreferencedMediaId}`)
    expect(checkRes.status).toBe(404)
  })

  it('GET /api/v1/admin/media/99999 returns 404 for non-existent asset ID', async () => {
    const res = await request(app).get('/api/v1/admin/media/99999')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })
})
