import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Db } from '../src/infrastructure/database/db'
import { createPgliteDb } from '../src/infrastructure/database/pglite.driver'
import { migrate } from '../src/infrastructure/database/migrate'
import { createApp } from '../src/app'
import { createProjectsRepository } from '../src/modules/projects/projects.repository'
import { createServicesRepository } from '../src/modules/services/services.repository'

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

const sampleHomePayload = {
  hero: {
    badge: '30+ Years of Construction Excellence',
    headline: 'Building Regional Landmarks with Precision',
    tagline: 'Delivering mega civil, commercial and residential projects across KSA, Egypt, and Qatar.',
    bodyCopy: 'Dar ElMashrq merges international engineering standards with regional execution strength.',
    heroImage: '/images/hero/hero-architectural-overlay.jpg',
    exploreCtaText: 'View Our Projects',
    aboutCtaText: 'About Company',
    status: 'draft' as const,
  },
  stats: [
    { label: 'Years Experience', labelAr: 'سنوات خبرة', value: '30+', description: 'Since 1994' },
    { label: 'Projects Delivered', labelAr: 'مشروع منجز', value: '35+', description: 'Across MENA' },
  ],
  whyPillars: [
    {
      id: 'p-1',
      code: '01',
      title: 'Structural Precision',
      description: 'Zero-compromise engineering quality adhering to international codes.',
      iconName: 'ShieldCheck',
    },
  ],
  services: [
    {
      id: 's-1',
      number: '01',
      specCode: 'SPEC: DM-01',
      title: 'Civil Works & Finishing',
      titleAr: 'الأعمال المدنية والتشطيبات',
      description: 'End-to-end structural concrete and luxury finishing works.',
      iconName: 'Building2',
    },
  ],
  regionalHubs: [
    {
      country: 'saudi-arabia' as const,
      countryName: 'Kingdom of Saudi Arabia',
      countryNameAr: 'المملكة العربية السعودية',
      coordinates: '24.7136° N, 46.6753° E',
      badge: 'Corporate HQ',
      description: 'Primary operations center located in Olaya District, Riyadh.',
      address: 'King Fahd Road, Olaya District, Riyadh',
      phone: '00966581605812',
      classification: 'Grade 1 Contracting',
    },
  ],
  credentials: [
    {
      id: 'c-1',
      category: 'ISO Certification',
      title: 'ISO 9001:2015 Quality Management',
      description: 'Certified operational management and quality assurance.',
      registrationNumber: 'ISO-9001-KSA',
      status: 'Active / Verified',
    },
  ],
  status: 'draft' as const,
}

describe('Home Page API (Phase 03)', () => {
  it('GET /api/v1/home returns 404 when no content is published', async () => {
    const res = await request(app).get('/api/v1/home')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('NotFoundError')
  })

  it('GET /api/v1/admin/home returns 200 with null before initialization', async () => {
    const res = await request(app).get('/api/v1/admin/home')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toBeNull()
  })

  it('PUT /api/v1/admin/home rejects invalid payloads with 422', async () => {
    const res = await request(app)
      .put('/api/v1/admin/home')
      .send({ hero: { badge: '' } }) // missing required headline and fields

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('VALIDATION_ERROR')
  })

  it('PUT /api/v1/admin/home saves valid Home payload in draft state', async () => {
    const res = await request(app)
      .put('/api/v1/admin/home')
      .send(sampleHomePayload)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.status).toBe('draft')
    expect(res.body.data.content.hero.headline).toBe('Building Regional Landmarks with Precision')
  })

  it('GET /api/v1/home still returns 404 while content is draft', async () => {
    const res = await request(app).get('/api/v1/home')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })

  it('PATCH /api/v1/admin/home/status rejects invalid status values', async () => {
    const res = await request(app)
      .patch('/api/v1/admin/home/status')
      .send({ status: 'archived' })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
  })

  it('PATCH /api/v1/admin/home/status publishes the Home page', async () => {
    const res = await request(app)
      .patch('/api/v1/admin/home/status')
      .send({ status: 'published' })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.status).toBe('published')
    expect(res.body.data.publishedAt).not.toBeNull()
  })

  it('GET /api/v1/home returns published content with cache headers and enriched relations', async () => {
    // Seed a featured project and active service
    const projectsRepo = createProjectsRepository(db)
    const servicesRepo = createServicesRepository(db)

    await servicesRepo.create({
      slug: 'civil-contracting',
      name: 'Civil Contracting',
      status: 'published',
      displayOrder: 1,
    })

    await projectsRepo.create({
      slug: 'beverly-al-azeeza-landmark',
      name: 'Beverly Al-Azeeza Landmark',
      country: 'saudi-arabia',
      category: 'commercial',
      isFeatured: true,
      status: 'published',
    })

    const res = await request(app).get('/api/v1/home')

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.headers['cache-control']).toContain('public')
    expect(res.headers['cache-control']).toContain('max-age=60')
    expect(res.body.data.content.hero.headline).toBe('Building Regional Landmarks with Precision')
    expect(res.body.data.featuredProjects.length).toBeGreaterThanOrEqual(1)
    expect(res.body.data.featuredProjects[0].slug).toBe('beverly-al-azeeza-landmark')
    expect(res.body.data.activeServices.length).toBeGreaterThanOrEqual(1)
  })
})
