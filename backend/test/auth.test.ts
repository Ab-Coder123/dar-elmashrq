import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Db } from '../src/infrastructure/database/db'
import { createPgliteDb } from '../src/infrastructure/database/pglite.driver'
import { migrate } from '../src/infrastructure/database/migrate'
import { createApp } from '../src/app'
import { createAdminUsersRepository } from '../src/modules/auth/adminUsers.repository'
import { signJwt } from '../src/shared/auth/jwt'

let db: Db
let appWithAuth: ReturnType<typeof createApp>
let usersRepo: ReturnType<typeof createAdminUsersRepository>

beforeAll(async () => {
  db = await createPgliteDb()
  await migrate(db)
  usersRepo = createAdminUsersRepository(db)

  // Explicitly enable auth enforcement on all admin routes
  appWithAuth = createApp(db, { enableAuth: true })

  // Seed test users: one admin and one editor
  await usersRepo.create({
    email: 'admin@elmashrq.com',
    password: 'DarElmashrqAdmin2026!Secure',
    displayName: 'Primary Administrator',
    role: 'admin',
  })

  await usersRepo.create({
    email: 'editor@elmashrq.com',
    password: 'EditorPassword2026!Secure',
    displayName: 'Content Editor',
    role: 'editor',
  })
}, 60_000)

afterAll(async () => {
  await db.close()
})

describe('Authentication & Authorization API (Phase 09)', () => {
  let adminToken: string
  let editorToken: string

  describe('POST /api/v1/auth/login', () => {
    it('rejects missing credentials with 422 VALIDATION_ERROR', async () => {
      const res = await request(appWithAuth)
        .post('/api/v1/auth/login')
        .send({ email: 'admin@elmashrq.com' }) // missing password

      expect(res.status).toBe(422)
      expect(res.body.success).toBe(false)
      expect(res.body.error.code).toBe('VALIDATION_ERROR')
    })

    it('rejects unregistered email with 401 UnauthorizedError', async () => {
      const res = await request(appWithAuth)
        .post('/api/v1/auth/login')
        .send({
          email: 'unknown@elmashrq.com',
          password: 'DarElmashrqAdmin2026!Secure',
        })

      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
      expect(res.body.error.message).toBe('Invalid email or password.')
    })

    it('rejects incorrect password with 401 UnauthorizedError', async () => {
      const res = await request(appWithAuth)
        .post('/api/v1/auth/login')
        .send({
          email: 'admin@elmashrq.com',
          password: 'WrongPassword123!',
        })

      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
      expect(res.body.error.message).toBe('Invalid email or password.')
    })

    it('successfully logs in with valid admin credentials', async () => {
      const res = await request(appWithAuth)
        .post('/api/v1/auth/login')
        .send({
          email: 'admin@elmashrq.com',
          password: 'DarElmashrqAdmin2026!Secure',
        })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.token).toBeDefined()
      expect(typeof res.body.data.token).toBe('string')
      expect(res.body.data.user.email).toBe('admin@elmashrq.com')
      expect(res.body.data.user.role).toBe('admin')
      expect(res.body.data.user.displayName).toBe('Primary Administrator')
      // Ensure password_hash is never exposed
      expect(res.body.data.user.password_hash).toBeUndefined()

      adminToken = res.body.data.token
    })

    it('successfully logs in with valid editor credentials', async () => {
      const res = await request(appWithAuth)
        .post('/api/v1/auth/login')
        .send({
          email: 'editor@elmashrq.com',
          password: 'EditorPassword2026!Secure',
        })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.user.role).toBe('editor')

      editorToken = res.body.data.token
    })
  })

  describe('GET /api/v1/auth/me', () => {
    it('rejects unauthenticated requests with 401', async () => {
      const res = await request(appWithAuth).get('/api/v1/auth/me')

      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
    })

    it('rejects invalid or tampered bearer tokens with 401', async () => {
      const res = await request(appWithAuth)
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer invalid.tampered.token')

      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
    })

    it('returns current admin user profile with valid token', async () => {
      const res = await request(appWithAuth)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.email).toBe('admin@elmashrq.com')
      expect(res.body.data.role).toBe('admin')
      expect(res.body.data.displayName).toBe('Primary Administrator')
    })
  })

  describe('POST /api/v1/auth/change-password', () => {
    it('rejects passwords shorter than 12 characters with 422', async () => {
      const res = await request(appWithAuth)
        .post('/api/v1/auth/change-password')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          currentPassword: 'DarElmashrqAdmin2026!Secure',
          newPassword: 'short',
        })

      expect(res.status).toBe(422)
      expect(res.body.success).toBe(false)
      expect(res.body.error.code).toBe('VALIDATION_ERROR')
    })

    it('rejects incorrect current password with 400', async () => {
      const res = await request(appWithAuth)
        .post('/api/v1/auth/change-password')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          currentPassword: 'WrongCurrentPassword!',
          newPassword: 'BrandNewSecurePassword2026!',
        })

      expect(res.status).toBe(400)
      expect(res.body.success).toBe(false)
      expect(res.body.error.message).toBe('Current password is incorrect.')
    })

    it('successfully updates password and verifies new credential works', async () => {
      const changeRes = await request(appWithAuth)
        .post('/api/v1/auth/change-password')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          currentPassword: 'DarElmashrqAdmin2026!Secure',
          newPassword: 'BrandNewSecurePassword2026!',
        })

      expect(changeRes.status).toBe(200)
      expect(changeRes.body.success).toBe(true)

      // Old password should now fail
      const oldLoginRes = await request(appWithAuth)
        .post('/api/v1/auth/login')
        .send({
          email: 'admin@elmashrq.com',
          password: 'DarElmashrqAdmin2026!Secure',
        })

      expect(oldLoginRes.status).toBe(401)

      // New password should succeed
      const newLoginRes = await request(appWithAuth)
        .post('/api/v1/auth/login')
        .send({
          email: 'admin@elmashrq.com',
          password: 'BrandNewSecurePassword2026!',
        })

      expect(newLoginRes.status).toBe(200)
      expect(newLoginRes.body.success).toBe(true)
      adminToken = newLoginRes.body.data.token
    })
  })

  describe('POST /api/v1/auth/logout', () => {
    it('returns 200 OK on logout', async () => {
      const res = await request(appWithAuth).post('/api/v1/auth/logout')

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })
  })

  describe('Route Protection on Admin Endpoints', () => {
    it('blocks unauthenticated GET /api/v1/admin/home with 401', async () => {
      const res = await request(appWithAuth).get('/api/v1/admin/home')
      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
    })

    it('blocks unauthenticated GET /api/v1/admin/projects with 401', async () => {
      const res = await request(appWithAuth).get('/api/v1/admin/projects')
      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
    })

    it('blocks unauthenticated GET /api/v1/admin/services with 401', async () => {
      const res = await request(appWithAuth).get('/api/v1/admin/services')
      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
    })

    it('blocks unauthenticated GET /api/v1/admin/media with 401', async () => {
      const res = await request(appWithAuth).get('/api/v1/admin/media')
      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
    })

    it('blocks unauthenticated GET /api/v1/admin/contact with 401', async () => {
      const res = await request(appWithAuth).get('/api/v1/admin/contact')
      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
    })

    it('blocks unauthenticated GET /api/v1/admin/settings with 401', async () => {
      const res = await request(appWithAuth).get('/api/v1/admin/settings')
      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
    })

    it('blocks unauthenticated GET /api/v1/admin/seo/home with 401', async () => {
      const res = await request(appWithAuth).get('/api/v1/admin/seo/home')
      expect(res.status).toBe(401)
      expect(res.body.success).toBe(false)
    })

    it('allows access to admin endpoints with valid Bearer token', async () => {
      const homeRes = await request(appWithAuth)
        .get('/api/v1/admin/home')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(homeRes.status).toBe(200)
      expect(homeRes.body.success).toBe(true)

      const projectsRes = await request(appWithAuth)
        .get('/api/v1/admin/projects')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(projectsRes.status).toBe(200)
      expect(projectsRes.body.success).toBe(true)
    })

    it('allows public endpoints without any token', async () => {
      const servicesRes = await request(appWithAuth).get('/api/v1/services')
      expect(servicesRes.status).toBe(200)
      expect(servicesRes.body.success).toBe(true)

      const projectsRes = await request(appWithAuth).get('/api/v1/projects')
      expect(projectsRes.status).toBe(200)
      expect(projectsRes.body.success).toBe(true)
    })
  })
})
