/**
 * Safe first-admin creation. Credentials come from env vars at run time only —
 * nothing is hardcoded or committed:
 *
 *   ADMIN_EMAIL=you@company.com ADMIN_PASSWORD='<12+ chars>' pnpm --filter @dar-elmashrq/backend admin:create
 */
import { createDefaultDb } from './scriptDb'
import { createAdminUser } from '../src/modules/auth/adminUsers.repository'

async function main(): Promise<void> {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables.')
  }
  const db = createDefaultDb()
  try {
    const existing = await db.query<{ n: string }>("select count(*) as n from admin_users where role = 'admin'")
    if (Number(existing.rows[0]?.n) > 0 && process.env.ALLOW_ADDITIONAL_ADMIN !== 'true') {
      throw new Error('An admin already exists. Set ALLOW_ADDITIONAL_ADMIN=true to add another.')
    }
    const user = await createAdminUser(db, { email, password, role: 'admin' })
    console.log(`Admin created: ${user.email} (id ${user.id})`)
  } finally {
    await db.close()
  }
}

main().catch((err) => {
  console.error('Create admin failed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
