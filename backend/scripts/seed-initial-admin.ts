import bcrypt from 'bcryptjs'
import { createDefaultDb } from './scriptDb'

const BCRYPT_COST = 12

async function main(): Promise<void> {
  const email = (process.env.ADMIN_EMAIL || 'elmashrq5555@gmail.com').trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD || 'Mgc$5555'
  const displayName = 'Dar ElMashrq Admin'
  const role = 'admin'

  const db = createDefaultDb()
  try {
    const hash = await bcrypt.hash(password, BCRYPT_COST)
    const existing = await db.query<{ id: string }>(
      'select id from admin_users where email = $1',
      [email]
    )

    if (existing.rows.length > 0) {
      await db.query(
        'update admin_users set password_hash = $1, display_name = $2, role = $3, is_active = true where email = $4',
        [hash, displayName, role, email]
      )
      console.log(`✅ Updated existing admin user: ${email}`)
    } else {
      const res = await db.query<{ id: string }>(
        `insert into admin_users (email, password_hash, display_name, role, is_active)
         values ($1, $2, $3, $4, true)
         returning id`,
        [email, hash, displayName, role]
      )
      console.log(`✅ Created new admin user: ${email} (id ${res.rows[0]?.id})`)
    }
  } finally {
    await db.close()
  }
}

main().catch((err) => {
  console.error('❌ Failed to seed admin user:', err instanceof Error ? err.message : err)
  process.exit(1)
})
