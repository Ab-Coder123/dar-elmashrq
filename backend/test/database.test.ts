import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { ZodError } from 'zod'
import type { Db } from '../src/infrastructure/database/db'
import { createPgliteDb } from '../src/infrastructure/database/pglite.driver'
import { migrate } from '../src/infrastructure/database/migrate'
import { createProjectsRepository } from '../src/modules/projects/projects.repository'
import { createServicesRepository } from '../src/modules/services/services.repository'
import { createMediaRepository } from '../src/modules/media/media.repository'
import { createContentRepository } from '../src/modules/content/content.repository'
import { createAdminUser } from '../src/modules/auth/adminUsers.repository'
import { ConflictError } from '../src/shared/errors/AppError'

let db: Db

beforeAll(async () => {
  db = await createPgliteDb() // isolated in-memory Postgres, never touches a real DB
  await migrate(db)
}, 60_000)
afterAll(async () => {
  await db.close()
})

const project = (over: Record<string, unknown> = {}) => ({
  slug: 'test-project',
  name: 'Test Project',
  country: 'egypt' as const,
  category: 'residential' as const,
  ...over,
})

describe('migrations', () => {
  it('are idempotent and tracked', async () => {
    expect(await migrate(db)).toEqual([])
    const { rows } = await db.query<{ name: string }>('select name from schema_migrations')
    expect(rows.map((r) => r.name)).toContain('001_init.sql')
  })

  it('index every foreign key column', async () => {
    const { rows } = await db.query(`
      select conrelid::regclass::text as table_name, a.attname as fk_column
      from pg_constraint c
      join pg_attribute a on a.attrelid = c.conrelid and a.attnum = any(c.conkey)
      where c.contype = 'f' and not exists (
        select 1 from pg_index i where i.indrelid = c.conrelid and a.attnum = any(i.indkey)
      )`)
    expect(rows).toEqual([])
  })

  it('seeds no company content', async () => {
    for (const t of ['projects', 'services', 'media_assets', 'content_documents']) {
      const { rows } = await db.query<{ n: string }>(`select count(*) as n from ${t}`)
      expect(Number(rows[0]!.n)).toBeGreaterThanOrEqual(0)
    }
  })
})

describe('projects', () => {
  const repo = () => createProjectsRepository(db)

  it('accepts valid data with service + image relations', async () => {
    const svc = await createServicesRepository(db).create({
      slug: 'civil-works', name: 'Civil Works', displayOrder: 1, status: 'published',
    })
    const media = await createMediaRepository(db).create({
      storageKey: 'projects/a.jpg', filename: 'a.jpg', mimeType: 'image/jpeg', sizeBytes: 1000,
      category: 'projects', isPublic: true,
    })
    const p = await repo().create(
      project({ slug: 'rel-project', serviceIds: [svc.id], imageIds: [media.id], coverImageId: media.id })
    )
    expect(p.service_slugs).toEqual(['civil-works'])
    expect(p.image_ids.map(Number)).toEqual([media.id])
    expect(p.status).toBe('draft')
    expect(p.published_at).toBeNull()
  })

  it('rejects invalid data (zod)', async () => {
    await expect(repo().create(project({ slug: 'Bad Slug' }))).rejects.toBeInstanceOf(ZodError)
    await expect(repo().create(project({ country: 'france' }))).rejects.toBeInstanceOf(ZodError)
    await expect(repo().create(project({ year: 1500 }))).rejects.toBeInstanceOf(ZodError)
    await expect(repo().create(project({ unknownField: 1 }))).rejects.toBeInstanceOf(ZodError)
  })

  it('database CHECK constraints reject bad data even bypassing zod', async () => {
    await expect(
      db.query("insert into projects (slug, name, country, category) values ('x1','x','mars','residential')")
    ).rejects.toMatchObject({ code: '23514' })
  })

  it('duplicate slug -> ConflictError', async () => {
    await repo().create(project({ slug: 'dup-slug' }))
    await expect(repo().create(project({ slug: 'dup-slug' }))).rejects.toBeInstanceOf(ConflictError)
  })

  it('unknown service id -> ConflictError and transaction rolls back', async () => {
    await expect(repo().create(project({ slug: 'orphan', serviceIds: [999999] }))).rejects.toBeInstanceOf(
      ConflictError
    )
    const { rows } = await db.query("select 1 from projects where slug = 'orphan'")
    expect(rows).toHaveLength(0)
  })

  it('draft/published workflow and public visibility', async () => {
    const p = await repo().create(project({ slug: 'workflow-sa', country: 'saudi-arabia' }))
    expect((await repo().list({ publishedOnly: true, country: 'saudi-arabia' })).items).toHaveLength(0)
    await expect(repo().findBySlug('workflow-sa', true)).rejects.toThrow('not found')

    const pub = await repo().setStatus(p.id, 'published')
    expect(pub.published_at).not.toBeNull()
    expect((await repo().list({ publishedOnly: true, country: 'saudi-arabia' })).items.map((i) => i.slug)).toEqual([
      'workflow-sa',
    ])

    const draft = await repo().setStatus(p.id, 'draft')
    expect(draft.published_at).toBeNull()
    expect((await repo().list({ publishedOnly: true, country: 'saudi-arabia' })).total).toBe(0)
  })

  it('country filter and pagination', async () => {
    for (const [i, c] of (['qatar', 'qatar', 'egypt'] as const).entries()) {
      await repo().create(project({ slug: `filter-${i}`, country: c, status: 'published', displayOrder: i }))
    }
    const q = await repo().list({ publishedOnly: true, country: 'qatar', pageSize: 1, page: 2 })
    expect(q.total).toBe(2)
    expect(q.items).toHaveLength(1)
    expect(q.items[0]!.country).toBe('qatar')
  })
})

describe('services & media referential safety', () => {
  it('cannot delete a service referenced by a project', async () => {
    const svc = await createServicesRepository(db).create({ slug: 'ref-svc', name: 'Ref' })
    await createProjectsRepository(db).create(project({ slug: 'uses-svc', serviceIds: [svc.id] }))
    await expect(createServicesRepository(db).remove(svc.id)).rejects.toBeInstanceOf(ConflictError)
  })

  it('cannot delete media referenced by a project; unreferenced can be deleted', async () => {
    const media = createMediaRepository(db)
    const used = await media.create({ storageKey: 'projects/used.png', filename: 'u.png', mimeType: 'image/png', sizeBytes: 5 })
    await createProjectsRepository(db).create(project({ slug: 'uses-media', imageIds: [used.id] }))
    await expect(media.remove(used.id)).rejects.toBeInstanceOf(ConflictError)

    const free = await media.create({ storageKey: 'projects/free.png', filename: 'f.png', mimeType: 'image/png', sizeBytes: 5 })
    await expect(media.remove(free.id)).resolves.toBeUndefined()
  })

  it('media is private by default and validates type/size/key', async () => {
    const media = createMediaRepository(db)
    const m = await media.create({ storageKey: 'certificates/c.pdf', filename: 'c.pdf', mimeType: 'application/pdf', sizeBytes: 10 })
    expect(m.is_public).toBe(false)
    await expect(media.create({ storageKey: 'x/y.exe', filename: 'y.exe', mimeType: 'application/x-msdownload' as never, sizeBytes: 1 })).rejects.toBeInstanceOf(ZodError)
    await expect(media.create({ storageKey: 'x/big.jpg', filename: 'b.jpg', mimeType: 'image/jpeg', sizeBytes: 26 * 1024 * 1024 })).rejects.toBeInstanceOf(ZodError)
    await expect(media.create({ storageKey: '../etc/passwd', filename: 'p', mimeType: 'image/png', sizeBytes: 1 })).rejects.toBeInstanceOf(ZodError)
  })

  it('services: published-only listing is ordered', async () => {
    const repo = createServicesRepository(db)
    await repo.create({ slug: 'svc-b', name: 'B', displayOrder: 20, status: 'published' })
    await repo.create({ slug: 'svc-a', name: 'A', displayOrder: 10, status: 'published' })
    await repo.create({ slug: 'svc-hidden', name: 'H', displayOrder: 1 })
    const slugs = (await repo.list(true)).map((s) => s.slug)
    expect(slugs).not.toContain('svc-hidden')
    expect(slugs.indexOf('svc-a')).toBeLessThan(slugs.indexOf('svc-b'))
  })
})

describe('content documents & SEO', () => {
  const repo = () => createContentRepository(db)
  const contact = {
    website: 'https://example.com',
    email: 'info@example.com',
    phones: ['+966500000000'],
    address: { country: 'Saudi Arabia', city: 'Riyadh' },
  }

  it('validates contact and upserts', async () => {
    await expect(repo().saveDocument('contact', { ...contact, email: 'nope' }, 'draft')).rejects.toBeInstanceOf(ZodError)
    await expect(repo().saveDocument('contact', { ...contact, phones: ['abc'] }, 'draft')).rejects.toBeInstanceOf(ZodError)
    await repo().saveDocument('contact', contact, 'draft')
    const second = await repo().saveDocument('contact', { ...contact, email: 'new@example.com' }, 'published')
    expect(second.data.email).toBe('new@example.com')
    expect((await repo().getDocument('contact', true)).status).toBe('published')
  })

  it('draft documents are not visible publicly', async () => {
    await repo().saveDocument('home', { hero: { title: 'x' } }, 'draft')
    await expect(repo().getDocument('home', true)).rejects.toThrow('not found')
    expect((await repo().getDocument('home', false)).status).toBe('draft')
  })

  it('SEO limits are enforced by zod and by the database', async () => {
    await repo().saveSeo({ pageKey: 'home', title: 'Dar ElMashrq' })
    await expect(repo().saveSeo({ pageKey: 'home', title: 'x'.repeat(71) })).rejects.toBeInstanceOf(ZodError)
    await expect(
      db.query("insert into seo_metadata (page_key, title) values ('long', $1)", ['x'.repeat(71)])
    ).rejects.toMatchObject({ code: '23514' })
  })
})

describe('admin users', () => {
  it('hashes passwords, lowercases email, rejects weak passwords and duplicates', async () => {
    const u = await createAdminUser(db, { email: 'Admin@Example.com', password: 'a-long-secure-pass', role: 'admin' })
    expect(u.email).toBe('admin@example.com')
    expect(u).not.toHaveProperty('password_hash')
    const { rows } = await db.query<{ password_hash: string }>('select password_hash from admin_users where id = $1', [u.id])
    expect(rows[0]!.password_hash).toMatch(/^\$2[aby]\$12\$/)
    expect(rows[0]!.password_hash).not.toContain('a-long-secure-pass')

    await expect(createAdminUser(db, { email: 'w@example.com', password: 'short', role: 'editor' })).rejects.toBeInstanceOf(ZodError)
    await expect(createAdminUser(db, { email: 'ADMIN@example.com', password: 'another-long-pass', role: 'editor' })).rejects.toBeInstanceOf(ConflictError)
  })

  it('db rejects non-lowercase email and invalid role', async () => {
    await expect(db.query("insert into admin_users (email, password_hash) values ('Up@x.com','h')")).rejects.toMatchObject({ code: '23514' })
    await expect(db.query("insert into admin_users (email, password_hash, role) values ('r@x.com','h','root')")).rejects.toMatchObject({ code: '23514' })
  })
})

