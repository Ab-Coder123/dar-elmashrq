import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Db } from '../src/infrastructure/database/db'
import { createPgliteDb } from '../src/infrastructure/database/pglite.driver'
import { migrate } from '../src/infrastructure/database/migrate'
import { createApp } from '../src/app'
import { createAdminUsersRepository } from '../src/modules/auth/adminUsers.repository'

let db: Db
let app: ReturnType<typeof createApp>
let usersRepo: ReturnType<typeof createAdminUsersRepository>

beforeAll(async () => {
  db = await createPgliteDb()
  await migrate(db)
  usersRepo = createAdminUsersRepository(db)

  // Explicitly enable route guarding on admin endpoints
  app = createApp(db, { enableAuth: true })

  // Seed default admin user
  await usersRepo.create({
    email: 'admin@elmashrq.com',
    password: 'DarElmashrqAdmin2026!Secure',
    displayName: 'Primary Executive Admin',
    role: 'admin',
  })
}, 60_000)

afterAll(async () => {
  await db.close()
})

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

describe('End-to-End Frontend & CMS Integration (Phase 10)', () => {
  let authToken: string
  let createdProjectId: number
  let createdInquiryId: number

  describe('1. Admin Authentication & Session Handshake', () => {
    it('rejects admin mutations without Bearer token (401 Unauthorized)', async () => {
      const res = await request(app)
        .post('/api/v1/admin/projects')
        .send({
          name: 'Unauthorized Project',
          slug: 'unauthorized-project',
          country: 'saudi-arabia',
          category: 'commercial',
        })

      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
    })

    it('successfully logs in admin and acquires JWT token', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'admin@elmashrq.com',
          password: 'DarElmashrqAdmin2026!Secure',
        })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.token).toBeDefined()
      expect(res.body.data.user.email).toBe('admin@elmashrq.com')
      expect(res.body.data.user.role).toBe('admin')

      authToken = res.body.data.token
    })

    it('verifies active user session via GET /api/v1/auth/me', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${authToken}`)

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.email).toBe('admin@elmashrq.com')
      expect(res.body.data.displayName).toBe('Primary Executive Admin')
    })
  })

  describe('2. CMS Content Authoring & Publishing Workflow', () => {
    it('creates a new draft project via Admin CMS API', async () => {
      const res = await request(app)
        .post('/api/v1/admin/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Kingdom Tower Facade Renovation',
          nameAr: 'تجديد واجهات برج المملكة',
          slug: 'kingdom-tower-facade-renovation',
          country: 'saudi-arabia',
          location: 'Riyadh, Olaya',
          locationAr: 'الرياض، العليا',
          category: 'commercial',
          year: 2025,
          description: 'Turnkey architectural facade development and structural finishing.',
          descriptionAr: 'تطوير وتجديد الواجهات المعمارية والتشطيبات الهيكلية.',
          status: 'draft',
          isFeatured: true,
          displayOrder: 1,
        })

      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data.id).toBeDefined()
      expect(res.body.data.status).toBe('draft')

      createdProjectId = Number(res.body.data.id)
    })

    it('ensures draft project is NOT visible on public /api/v1/projects', async () => {
      const res = await request(app).get('/api/v1/projects')
      expect(res.status).toBe(200)
      expect(res.body.total).toBe(0)
      expect(res.body.items.length).toBe(0)
    })

    it('publishes project via Admin CMS API', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/projects/${createdProjectId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'published' })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.status).toBe('published')
    })

    it('verifies published project is immediately returned in public API listing', async () => {
      const res = await request(app).get('/api/v1/projects?country=saudi-arabia')
      expect(res.status).toBe(200)
      expect(res.body.total).toBe(1)
      expect(res.body.items[0].slug).toBe('kingdom-tower-facade-renovation')
      expect(res.body.items[0].name).toBe('Kingdom Tower Facade Renovation')
    })

    it('fetches single project details via public slug route', async () => {
      const res = await request(app).get('/api/v1/projects/kingdom-tower-facade-renovation')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.location).toBe('Riyadh, Olaya')
    })
  })

  describe('3. Public Contact Form Submission to Admin Inquiries Workflow', () => {
    it('accepts public contact inquiry submission via POST /api/v1/contact/inquiries', async () => {
      const res = await request(app)
        .post('/api/v1/contact/inquiries')
        .send({
          name: 'Eng. Khaled Al-Mansoor',
          email: 'khaled.mansoor@example.sa',
          phone: '+966555123456',
          company: 'Al-Mansoor Construction Group',
          serviceOfInterest: 'Civil Works & Finishing',
          country: 'saudi-arabia',
          message: 'We are requesting a commercial bid and corporate qualification dossier.',
        })

      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data.id).toBeDefined()
      expect(res.body.data.status).toBe('unread')

      createdInquiryId = Number(res.body.data.id)
    })

    it('allows authenticated admin to view received inquiries in Admin CMS', async () => {
      const res = await request(app)
        .get('/api/v1/admin/contact/inquiries')
        .set('Authorization', `Bearer ${authToken}`)

      expect(res.status).toBe(200)
      expect(res.body.total).toBeGreaterThanOrEqual(1)
      expect(res.body.items).toBeDefined()

      const inquiry = res.body.items.find(
        (item: { id: number }) => Number(item.id) === createdInquiryId
      )
      expect(inquiry).toBeDefined()
      expect(inquiry.name).toBe('Eng. Khaled Al-Mansoor')
      expect(inquiry.status).toBe('unread')
    })

    it('allows authenticated admin to update inquiry status to read', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/contact/inquiries/${createdInquiryId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'read' })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.status).toBe('read')
    })
  })

  describe('4. Global Settings & SEO Verification', () => {
    it('updates site settings via Admin CMS API', async () => {
      const res = await request(app)
        .put('/api/v1/admin/settings')
        .set('Authorization', `Bearer ${authToken}`)
        .send(sampleSettingsPayload)

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.content.siteName).toBe('Dar ElMashrq')
    })

    it('publishes site settings via Admin CMS API', async () => {
      const res = await request(app)
        .patch('/api/v1/admin/settings/status')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'published' })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.status).toBe('published')
    })

    it('fetches published settings on public website API', async () => {
      const res = await request(app).get('/api/v1/settings')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.content.siteName).toBe('Dar ElMashrq')
    })

    it('updates and fetches SEO metadata for home page', async () => {
      const putRes = await request(app)
        .put('/api/v1/admin/seo/home')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          pageKey: 'home',
          title: 'Dar ElMashrq — Leading Construction Firm in MENA',
          titleAr: 'دار المشرق — شركة مقاولات وتطوير عقاري رائدة',
          description: 'Official corporate portal of Dar ElMashrq Trading & Contracting Company.',
          descriptionAr: 'البوابة الرسمية لشركة دار المشرق للتجارة والمقاولات.',
        })

      expect(putRes.status).toBe(200)
      expect(putRes.body.success).toBe(true)

      const getRes = await request(app).get('/api/v1/seo/home')
      expect(getRes.status).toBe(200)
      expect(getRes.body.success).toBe(true)
      expect(getRes.body.data.title).toBe('Dar ElMashrq — Leading Construction Firm in MENA')
    })
  })
})
