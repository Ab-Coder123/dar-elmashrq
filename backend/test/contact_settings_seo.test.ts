import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Db } from '../src/infrastructure/database/db'
import { createPgliteDb } from '../src/infrastructure/database/pglite.driver'
import { migrate } from '../src/infrastructure/database/migrate'
import { createApp } from '../src/app'

let db: Db
let app: ReturnType<typeof createApp>
let createdInquiryId: number

beforeAll(async () => {
  db = await createPgliteDb()
  await migrate(db)
  app = createApp(db)
}, 60_000)

afterAll(async () => {
  await db.close()
})

const sampleContactPayload = {
  hero: {
    badge: 'GET IN TOUCH',
    headline: 'Connect with Dar ElMashrq Regional Offices',
    tagline: 'Direct channels across Saudi Arabia, Egypt, and Qatar.',
    description: 'Our engineering and executive teams are ready to discuss your development requirements.',
  },
  offices: [
    {
      id: 'off-ksa',
      country: 'saudi-arabia' as const,
      countryName: 'Kingdom of Saudi Arabia',
      countryNameAr: 'المملكة العربية السعودية',
      city: 'Riyadh',
      district: 'Olaya District',
      address: 'King Fahd Road, Olaya, Riyadh',
      addressAr: 'طريق الملك فهد، حي العليا، الرياض',
      phone: '+966 58 160 5812',
      email: 'ksa@elmashrq.com',
      coordinates: '24.7136, 46.6753',
      isHQ: true,
    },
    {
      id: 'off-eg',
      country: 'egypt' as const,
      countryName: 'Egypt',
      countryNameAr: 'جمهورية مصر العربية',
      city: 'Cairo',
      district: 'New Cairo',
      address: 'Sector 1, New Cairo, Egypt',
      phone: '+20 10 000 0000',
      email: 'egypt@elmashrq.com',
      coordinates: '30.0444, 31.2357',
      isHQ: false,
    },
  ],
  generalEmail: 'info@elmashrq.com',
  supportEmail: 'support@elmashrq.com',
  phones: ['+966 58 160 5812', '+966 54 505 1136'],
  workingHours: 'Sunday – Thursday: 8:00 AM – 5:00 PM (AST)',
  workingHoursAr: 'الأحد – الخميس: 8:00 صباحاً – 5:00 مساءً',
  status: 'draft' as const,
}

const sampleSettingsPayload = {
  siteName: 'Dar ElMashrq',
  siteNameAr: 'دار المشرق للتجارة والمقاولات',
  tagline: 'Leading General Contracting & Real Estate in MENA',
  taglineAr: 'رواد المقاولات العامة والتطوير العقاري',
  foundedYear: 1994,
  officialEmail: 'info@elmashrq.com',
  phones: ['+966 58 160 5812'],
  socialLinks: {
    linkedin: 'https://linkedin.com/company/dar-elmashrq',
    twitter: 'https://twitter.com/dar_elmashrq',
  },
  headerNavigation: [
    { label: 'Home', labelAr: 'الرئيسية', href: '/' },
    { label: 'About', labelAr: 'عن الشركة', href: '/about' },
    { label: 'Services', labelAr: 'خدماتنا', href: '/services' },
    { label: 'Projects', labelAr: 'مشاريعنا', href: '/projects' },
    { label: 'Contact', labelAr: 'تواصل معنا', href: '/contact' },
  ],
  footer: {
    copyrightText: '© 2026 Dar ElMashrq Trading & Contracting Company. All rights reserved.',
    copyrightTextAr: '© 2026 شركة دار المشرق للتجارة والمقاولات. جميع الحقوق محفوظة.',
    commercialRegistrationKSA: 'CR-1010000000',
    taxNumber: 'TAX-300000000000003',
  },
  maintenanceMode: false,
  status: 'draft' as const,
}

describe('Contact, Settings & SEO APIs (Phase 08)', () => {
  // ---------------------------------------------------- Contact Endpoints
  it('GET /api/v1/contact returns 404 before publishing', async () => {
    const res = await request(app).get('/api/v1/contact')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })

  it('PUT /api/v1/admin/contact rejects invalid payload with 422', async () => {
    const res = await request(app)
      .put('/api/v1/admin/contact')
      .send({ hero: { badge: '' } })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
  })

  it('PUT /api/v1/admin/contact saves valid contact content as draft', async () => {
    const res = await request(app)
      .put('/api/v1/admin/contact')
      .send(sampleContactPayload)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.status).toBe('draft')
    expect(res.body.data.content.offices.length).toBe(2)
  })

  it('PATCH /api/v1/admin/contact/status publishes the contact page', async () => {
    const res = await request(app)
      .patch('/api/v1/admin/contact/status')
      .send({ status: 'published' })

    expect(res.status).toBe(200)
    expect(res.body.data.status).toBe('published')
  })

  it('GET /api/v1/contact returns published content with Cache-Control', async () => {
    const res = await request(app).get('/api/v1/contact')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.headers['cache-control']).toContain('public')
    expect(res.body.data.content.generalEmail).toBe('info@elmashrq.com')
  })

  // ---------------------------------------------------- Contact Inquiries
  it('POST /api/v1/contact/inquiries rejects invalid email or message with 422', async () => {
    const res = await request(app)
      .post('/api/v1/contact/inquiries')
      .send({
        name: 'A',
        email: 'invalid-email',
        message: 'hi',
      })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
  })

  it('POST /api/v1/contact/inquiries submits a customer message successfully', async () => {
    const res = await request(app)
      .post('/api/v1/contact/inquiries')
      .send({
        name: 'Fahad Al-Otaibi',
        email: 'fahad@example.com',
        phone: '+966500000000',
        company: 'Al-Otaibi Developments',
        serviceOfInterest: 'Civil Works & Finishing',
        country: 'saudi-arabia',
        message: 'We are interested in contracting for our upcoming commercial tower in Riyadh.',
      })

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.id).toBeDefined()
    expect(res.body.data.status).toBe('unread')

    createdInquiryId = res.body.data.id
  })

  it('GET /api/v1/admin/contact/inquiries lists customer messages for admin', async () => {
    const res = await request(app).get('/api/v1/admin/contact/inquiries')
    expect(res.status).toBe(200)
    expect(res.body.total).toBeGreaterThanOrEqual(1)
    expect(res.body.items[0].email).toBe('fahad@example.com')
  })

  it('PATCH /api/v1/admin/contact/inquiries/:id/status updates status to read', async () => {
    const res = await request(app)
      .patch(`/api/v1/admin/contact/inquiries/${createdInquiryId}/status`)
      .send({ status: 'read' })

    expect(res.status).toBe(200)
    expect(res.body.data.status).toBe('read')
  })

  it('DELETE /api/v1/admin/contact/inquiries/:id deletes inquiry', async () => {
    const res = await request(app).delete(
      `/api/v1/admin/contact/inquiries/${createdInquiryId}`
    )
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })

  // ---------------------------------------------------- Global Settings
  it('GET /api/v1/settings returns 404 before publishing', async () => {
    const res = await request(app).get('/api/v1/settings')
    expect(res.status).toBe(404)
  })

  it('PUT /api/v1/admin/settings saves site settings in draft state', async () => {
    const res = await request(app)
      .put('/api/v1/admin/settings')
      .send(sampleSettingsPayload)

    expect(res.status).toBe(200)
    expect(res.body.data.content.siteName).toBe('Dar ElMashrq')
  })

  it('PATCH /api/v1/admin/settings/status publishes site settings', async () => {
    const res = await request(app)
      .patch('/api/v1/admin/settings/status')
      .send({ status: 'published' })

    expect(res.status).toBe(200)
    expect(res.body.data.status).toBe('published')
  })

  it('GET /api/v1/settings returns published settings with Cache-Control', async () => {
    const res = await request(app).get('/api/v1/settings')
    expect(res.status).toBe(200)
    expect(res.headers['cache-control']).toContain('public')
    expect(res.body.data.content.foundedYear).toBe(1994)
  })

  // ---------------------------------------------------- SEO Metadata
  it('GET /api/v1/seo/home returns 404 before creation', async () => {
    const res = await request(app).get('/api/v1/seo/home')
    expect(res.status).toBe(404)
  })

  it('PUT /api/v1/admin/seo/:pageKey upserts SEO metadata', async () => {
    const res = await request(app)
      .put('/api/v1/admin/seo/home')
      .send({
        title: 'Dar ElMashrq — Leading Construction & Contracting',
        titleAr: 'دار المشرق — رواد المقاولات والإنشاءات',
        description:
          'Dar ElMashrq Trading & Contracting Company — Premier Grade 1 contractor operating across KSA, Egypt, and Qatar since 1994.',
      })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.pageKey).toBe('home')
  })

  it('GET /api/v1/seo/home returns SEO metadata with Cache-Control', async () => {
    const res = await request(app).get('/api/v1/seo/home')
    expect(res.status).toBe(200)
    expect(res.headers['cache-control']).toContain('public')
    expect(res.body.data.title).toContain('Dar ElMashrq')
  })

  it('GET /api/v1/seo lists all pages metadata', async () => {
    const res = await request(app).get('/api/v1/seo')
    expect(res.status).toBe(200)
    expect(res.body.count).toBeGreaterThanOrEqual(1)
  })
})
