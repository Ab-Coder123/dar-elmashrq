import bcrypt from 'bcryptjs'
import { createDefaultDb } from './scriptDb'
import { SERVICES } from '../../apps/web/config/services'
import { getAllProjects } from '../../apps/web/features/projects/data/projects.data'

const BCRYPT_COST = 12

async function main(): Promise<void> {
  const db = createDefaultDb()
  console.log('🚀 Starting complete database seed to Supabase PostgreSQL...')

  try {
    // 1. Seed Admin User
    const email = 'elmashrq5555@gmail.com'
    const password = 'Mgc$5555'
    const displayName = 'Dar ElMashrq Admin'
    const role = 'admin'
    const hash = await bcrypt.hash(password, BCRYPT_COST)

    const existingAdmin = await db.query<{ id: string }>(
      'select id from admin_users where email = $1',
      [email]
    )
    if (existingAdmin.rows.length > 0) {
      await db.query(
        'update admin_users set password_hash = $1, display_name = $2, role = $3, is_active = true where email = $4',
        [hash, displayName, role, email]
      )
      console.log(`✅ Admin user updated: ${email}`)
    } else {
      await db.query(
        `insert into admin_users (email, password_hash, display_name, role, is_active)
         values ($1, $2, $3, $4, true)`,
        [email, hash, displayName, role]
      )
      console.log(`✅ Admin user seeded: ${email}`)
    }

    // 2. Seed Services
    console.log('🔄 Seeding services...')
    for (const s of SERVICES) {
      const existing = await db.query<{ id: string }>(
        'select id from services where slug = $1',
        [s.slug]
      )
      if (existing.rows.length === 0) {
        await db.query(
          `insert into services (slug, name, name_ar, description, description_ar, icon, display_order, status)
           values ($1, $2, $3, $4, $5, $6, $7, 'published')`,
          [s.slug, s.name, s.nameAr || s.name, s.description || '', s.descriptionAr || '', s.icon || 'Building2', s.order]
        )
      } else {
        await db.query(
          `update services set name = $1, name_ar = $2, description = $3, description_ar = $4, icon = $5, display_order = $6, status = 'published'
           where slug = $7`,
          [s.name, s.nameAr || s.name, s.description || '', s.descriptionAr || '', s.icon || 'Building2', s.order, s.slug]
        )
      }
    }
    console.log(`✅ Seeded ${SERVICES.length} services.`)

    // 3. Seed Projects
    console.log('🔄 Seeding projects...')
    const projects = await getAllProjects()
    for (const p of projects) {
      const existing = await db.query<{ id: string }>(
        'select id from projects where slug = $1',
        [p.slug]
      )

      let projectId: string
      if (existing.rows.length === 0) {
        const res = await db.query<{ id: string }>(
          `insert into projects (slug, name, name_ar, country, location, location_ar, category, year, description, description_ar, scope, scope_ar, client_name, is_featured, display_order, status)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 'published')
           returning id`,
          [
            p.slug,
            p.name,
            p.nameAr || p.name,
            p.country,
            p.location,
            p.locationAr || p.location,
            p.category,
            p.year || 2024,
            p.description || '',
            p.descriptionAr || '',
            p.scope || '',
            p.scopeAr || '',
            p.clientName || null,
            p.isFeatured,
            p.order,
          ]
        )
        projectId = res.rows[0].id
      } else {
        projectId = existing.rows[0].id
        await db.query(
          `update projects set
             name = $1, name_ar = $2, country = $3, location = $4, location_ar = $5,
             category = $6, year = $7, description = $8, description_ar = $9,
             scope = $10, scope_ar = $11, client_name = $12,
             is_featured = $13, display_order = $14, status = 'published'
           where id = $15`,
          [
            p.name,
            p.nameAr || p.name,
            p.country,
            p.location,
            p.locationAr || p.location,
            p.category,
            p.year || 2024,
            p.description || '',
            p.descriptionAr || '',
            p.scope || '',
            p.scopeAr || '',
            p.clientName || null,
            p.isFeatured,
            p.order,
            projectId,
          ]
        )
      }

      // Link services
      if (p.services && p.services.length > 0) {
        await db.query('delete from project_services where project_id = $1', [projectId])
        for (const sName of p.services) {
          const sRow = await db.query<{ id: string }>(
            'select id from services where name ILIKE $1 or name_ar ILIKE $1 limit 1',
            [`%${sName}%`]
          )
          if (sRow.rows.length > 0) {
            await db.query(
              'insert into project_services (project_id, service_id) values ($1, $2) on conflict do nothing',
              [projectId, sRow.rows[0].id]
            )
          }
        }
      }
    }
    console.log(`✅ Seeded ${projects.length} projects.`)

    // 4. Seed Content Documents (Home, About, Contact, Settings)
    console.log('🔄 Seeding content documents...')
    const documents = [
      {
        key: 'home',
        status: 'published',
        data: {
          hero: {
            badge: 'DAR EL MASHRQ // EST. 1994',
            headline: 'SHAPING MONUMENTAL HORIZONS',
            tagline: 'Engineering Excellence Across Saudi Arabia, Egypt & Qatar',
            description: 'Three decades of multidisciplinary engineering, heavy civil infrastructure, and ultra-prime developments defining sovereign landmarks across the MENA region.',
            heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=2400&q=90',
            status: 'published',
          },
          stats: [
            { id: '1', value: '30+', labelEn: 'Years of Experience', labelAr: 'عاماً من الخبرة والريادة' },
            { id: '2', value: '35+', labelEn: 'Executed Projects', labelAr: 'مشروعاً هندسياً منجزاً' },
            { id: '3', value: '3', labelEn: 'Sovereign Markets', labelAr: 'أسواق إقليمية رئيسية' },
            { id: '4', value: '100%', labelEn: 'On-Time Handover', labelAr: 'التزام بالمواعيد والمواصفات' },
          ],
        },
      },
      {
        key: 'about',
        status: 'published',
        data: {
          hero: {
            badge: 'ENTERPRISE PROFILE // ESTABLISHED 1994',
            headline: 'AUTHORITY, RIGOR & HERITAGE',
            tagline: 'Engineering the Built Environment Across Three Sovereign Markets',
            description: 'Dar El Mashrq is a premier construction and real estate investment institution operating across primary regional economies in Saudi Arabia, Egypt, and Qatar for three continuous decades.',
            heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=90',
            status: 'published',
          },
          vision: {
            visionTitle: 'Our Strategic Vision',
            visionDescription: 'To become the destination of choice for our clients in Saudi Arabia, Egypt, and the MENA region for providing project and program management solutions merging modern international industry techniques and standards with regional approaches.',
            missionTitle: 'Our Engineering Mission',
            missionDescription: 'Delivering uncompromising structural longevity, technical precision, and full-spectrum EPC execution while fostering sovereign development across the Middle East.',
          },
        },
      },
      {
        key: 'contact',
        status: 'published',
        data: {
          hero: {
            badge: 'CONNECT // REGIONAL NETWORK',
            headline: 'DIRECT ENGAGEMENT & PROJECT INQUIRIES',
            tagline: 'Strategic Presence Across Saudi Arabia, Egypt & Qatar',
            description: 'Connect directly with our engineering leadership and regional project offices.',
          },
          offices: [
            {
              id: 'off-01',
              country: 'saudi-arabia',
              countryName: 'Riyadh Headquarters',
              countryNameAr: 'المقر الرئيسي - الرياض',
              city: 'Riyadh',
              district: 'Olaya District',
              address: 'King Fahd Road, Olaya District, Riyadh, Kingdom of Saudi Arabia',
              addressAr: 'طريق الملك فهد، حي العليا، الرياض، المملكة العربية السعودية',
              phone: '00966581605812',
              email: 'info@elmashrq.com',
              coordinates: '',
              isHQ: true,
            },
            {
              id: 'off-02',
              country: 'egypt',
              countryName: 'Cairo Regional Office',
              countryNameAr: 'المكتب الإقليمي - القاهرة',
              city: 'Cairo',
              district: 'New Cairo',
              address: 'Fifth Settlement, Business District, Cairo, Egypt',
              addressAr: 'التجمع الخامس، الحي التجاري، القاهرة، مصر',
              phone: '00201000000000',
              email: 'egypt@elmashrq.com',
              coordinates: '',
              isHQ: false,
            },
            {
              id: 'off-03',
              country: 'qatar',
              countryName: 'Doha Regional Office',
              countryNameAr: 'المكتب الإقليمي - الدوحة',
              city: 'Doha',
              district: 'West Bay',
              address: 'West Bay Commercial District, Doha, Qatar',
              addressAr: 'منطقة أبراج الدفنة، الدوحة، قطر',
              phone: '0097440000000',
              email: 'qatar@elmashrq.com',
              coordinates: '',
              isHQ: false,
            },
          ],
          generalEmail: 'info@elmashrq.com',
          supportEmail: 'inquiries@elmashrq.com',
          phones: ['00966581605812', '00966545051136'],
          workingHours: 'Sun - Thu: 8:00 AM - 5:00 PM',
          workingHoursAr: 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً',
          status: 'published',
        },
      },
      {
        key: 'settings',
        status: 'published',
        data: {
          siteName: 'Dar ElMashrq Trading & Contracting Company',
          siteNameAr: 'شركة دار المشرق للتجارة والمقاولات',
          tagline: 'Leading Construction & Engineering Solutions Since 1994',
          taglineAr: 'حلول البناء والمقاولات الرائدة منذ عام 1994',
          foundedYear: 1994,
          officialEmail: 'info@elmashrq.com',
          phones: ['00966581605812', '00966545051136'],
          socialLinks: {
            linkedin: 'https://linkedin.com/company/dar-elmashrq',
            twitter: 'https://twitter.com/darelmashrq',
            instagram: 'https://instagram.com/darelmashrq',
          },
          headerNavigation: [
            { label: 'Home', labelAr: 'الرئيسية', href: '/', external: false },
            { label: 'About', labelAr: 'عن الشركة', href: '/about', external: false },
            { label: 'Services', labelAr: 'خدماتنا', href: '/services', external: false },
            { label: 'Projects', labelAr: 'المشاريع', href: '/projects', external: false },
            { label: 'Contact', labelAr: 'تواصل معنا', href: '/contact', external: false },
          ],
          footer: {
            copyrightText: '© 1994-2026 Dar ElMashrq Trading & Contracting. All Rights Reserved.',
            copyrightTextAr: '© 1994-2026 شركة دار المشرق للتجارة والمقاولات. جميع الحقوق محفوظة.',
            commercialRegistrationKSA: '1010199401',
            commercialRegistrationEG: '2020199402',
            taxNumber: '300099400010003',
          },
          maintenanceMode: false,
          status: 'published',
        },
      },
    ]

    for (const doc of documents) {
      const existing = await db.query<{ key: string }>(
        'select key from content_documents where key = $1',
        [doc.key]
      )
      if (existing.rows.length === 0) {
        await db.query(
          `insert into content_documents (key, status, data)
           values ($1, $2, $3)`,
          [doc.key, doc.status, JSON.stringify(doc.data)]
        )
      } else {
        await db.query(
          `update content_documents set status = $1, data = $2, updated_at = now()
           where key = $3`,
          [doc.status, JSON.stringify(doc.data), doc.key]
        )
      }
    }
    console.log(`✅ Seeded ${documents.length} content documents.`)

    console.log('🎉 Full database seeding completed successfully!')
  } finally {
    await db.close()
  }
}

main().catch((err) => {
  console.error('❌ Database seed failed:', err)
  process.exit(1)
})
