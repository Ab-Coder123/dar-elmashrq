import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Db } from '../src/infrastructure/database/db'
import { createPgliteDb } from '../src/infrastructure/database/pglite.driver'
import { migrate } from '../src/infrastructure/database/migrate'
import { createApp } from '../src/app'

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

const sampleAboutPayload = {
  hero: {
    badge: 'ESTABLISHED 1994',
    headline: 'Engineering Excellence & Institutional Integrity',
    tagline: 'Three decades of building monumental infrastructure across Saudi Arabia, Egypt, and Qatar.',
    description: 'Dar ElMashrq Trading & Contracting Company operates as a premier grade-1 general contractor.',
    heroImage: '/images/about/about-hero.jpg',
    status: 'draft' as const,
  },
  vision: {
    visionTitle: 'Our Vision',
    visionDescription: 'Become the destination of choice for clients in KSA, Egypt, and MENA.',
    missionTitle: 'Our Mission',
    missionDescription: 'Deliver turnkey engineering and construction with unmatched precision and speed.',
  },
  history: [
    {
      year: '1994',
      title: 'Company Inception',
      titleAr: 'تأسيس الشركة',
      badge: 'Foundation',
      description: 'Dar ElMashrq was founded with a core focus on civil engineering and contracting.',
      descriptionAr: 'تأسست دار المشرق مع التركيز على الهندسة المدنية والمقاولات.',
      details: ['Initial civil contracting projects', 'First institutional clients'],
    },
    {
      year: '2010',
      title: 'Regional Expansion',
      titleAr: 'التوسع الإقليمي',
      badge: 'Expansion',
      description: 'Expanded commercial retail and residential operations into Saudi Arabia and Qatar.',
      descriptionAr: 'توسيع العمليات التجارية والسكنية إلى المملكة العربية السعودية وقطر.',
      details: ['Supermarket chain branches', 'High-rise residential developments'],
    },
  ],
  capabilities: [
    {
      number: '01',
      title: 'Civil Construction & Finishing',
      titleAr: 'الإنشاءات المدنية والتشطيبات',
      subtitle: 'Heavy structural & luxury interior fitouts',
      description: 'Comprehensive civil construction adhering to international and regional codes.',
      disciplines: ['Reinforced Concrete', 'Structural Steel', 'Luxury Turnkey Finishing'],
      image: '/images/about/capability-civil.jpg',
    },
  ],
  divisions: [
    {
      name: 'Engineering & Construction Division',
      nameAr: 'قطاع الهندسة والإنشاءات',
      lead: 'Chief Technical Officer',
      badge: 'Core Division',
      departments: [
        {
          title: 'Structural Engineering',
          titleAr: 'الهندسة الإنشائية',
          code: 'ENG-STR',
          roles: ['Structural Design', 'Site Supervision', 'Quality Audits'],
        },
      ],
    },
  ],
  credentials: [
    {
      id: 'cred-1',
      name: 'Contractor Classification Grade 1',
      nameAr: 'تصنيف المقاولين - الدرجة الأولى',
      issuingBody: 'Ministry of Municipal & Rural Affairs (KSA)',
      classification: 'Grade 1 General Contracting',
    },
  ],
  status: 'draft' as const,
}

describe('About Us Page API (Phase 04)', () => {
  it('GET /api/v1/about returns 404 when no content is published', async () => {
    const res = await request(app).get('/api/v1/about')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('NotFoundError')
  })

  it('GET /api/v1/admin/about returns 200 with null before initialization', async () => {
    const res = await request(app).get('/api/v1/admin/about')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toBeNull()
  })

  it('PUT /api/v1/admin/about rejects invalid payloads with 422', async () => {
    const res = await request(app)
      .put('/api/v1/admin/about')
      .send({ hero: { badge: '' } }) // missing headline, vision, etc.

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('VALIDATION_ERROR')
  })

  it('PUT /api/v1/admin/about saves valid About payload in draft state', async () => {
    const res = await request(app)
      .put('/api/v1/admin/about')
      .send(sampleAboutPayload)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.status).toBe('draft')
    expect(res.body.data.content.hero.headline).toBe(
      'Engineering Excellence & Institutional Integrity'
    )
    expect(res.body.data.content.history.length).toBe(2)
    expect(res.body.data.content.divisions.length).toBe(1)
  })

  it('GET /api/v1/about still returns 404 while content is draft', async () => {
    const res = await request(app).get('/api/v1/about')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })

  it('GET /api/v1/admin/about retrieves draft content for CMS', async () => {
    const res = await request(app).get('/api/v1/admin/about')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.status).toBe('draft')
    expect(res.body.data.content.vision.visionTitle).toBe('Our Vision')
  })

  it('PATCH /api/v1/admin/about/status rejects invalid status values', async () => {
    const res = await request(app)
      .patch('/api/v1/admin/about/status')
      .send({ status: 'archived' })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
  })

  it('PATCH /api/v1/admin/about/status publishes the About Us page', async () => {
    const res = await request(app)
      .patch('/api/v1/admin/about/status')
      .send({ status: 'published' })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.status).toBe('published')
    expect(res.body.data.publishedAt).not.toBeNull()
  })

  it('GET /api/v1/about returns published content with Cache-Control headers', async () => {
    const res = await request(app).get('/api/v1/about')

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.headers['cache-control']).toContain('public')
    expect(res.headers['cache-control']).toContain('max-age=60')
    expect(res.body.data.content.hero.badge).toBe('ESTABLISHED 1994')
    expect(res.body.data.content.vision.missionTitle).toBe('Our Mission')
    expect(res.body.data.content.capabilities[0].number).toBe('01')
  })

  it('PATCH /api/v1/admin/about/status unpublishes back to draft', async () => {
    const res = await request(app)
      .patch('/api/v1/admin/about/status')
      .send({ status: 'draft' })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.status).toBe('draft')

    const publicRes = await request(app).get('/api/v1/about')
    expect(publicRes.status).toBe(404)
  })
})
