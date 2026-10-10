import bcrypt from 'bcryptjs'
import type { Db } from '../../infrastructure/database/db'
import { mapDbError } from '../../infrastructure/database/mapDbError'
import { adminUserInputSchema, type AdminUserInput } from '../content/content.schemas'

export interface AdminUserRow {
  id: number
  email: string
  role: 'admin' | 'editor'
  is_active: boolean
  display_name: string | null
}

const BCRYPT_COST = 12

/** Validates input, hashes the password, and inserts. The hash is never returned. */
export async function createAdminUser(db: Db, raw: AdminUserInput): Promise<AdminUserRow> {
  const u = adminUserInputSchema.parse(raw)
  const hash = await bcrypt.hash(u.password, BCRYPT_COST)
  try {
    const { rows } = await db.query<AdminUserRow>(
      `insert into admin_users (email, password_hash, display_name, role)
       values ($1,$2,$3,$4) returning id, email, role, is_active, display_name`,
      [u.email, hash, u.displayName ?? null, u.role]
    )
    return rows[0]!
  } catch (e) {
    return mapDbError(e, 'Admin user')
  }
}
