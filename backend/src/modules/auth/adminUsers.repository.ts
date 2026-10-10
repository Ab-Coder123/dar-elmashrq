import bcrypt from 'bcryptjs'
import type { Db } from '../../infrastructure/database/db'
import { mapDbError } from '../../infrastructure/database/mapDbError'
import { NotFoundError } from '../../shared/errors/AppError'
import { adminUserInputSchema, type AdminUserInput } from '../content/content.schemas'

export interface AdminUserRecord {
  id: number
  email: string
  role: 'admin' | 'editor'
  is_active: boolean
  display_name: string | null
  password_hash?: string
  created_at: Date | string
  updated_at: Date | string
}

const BCRYPT_COST = 12

export function createAdminUsersRepository(db: Db) {
  return {
    async create(raw: AdminUserInput): Promise<AdminUserRecord> {
      const u = adminUserInputSchema.parse(raw)
      const hash = await bcrypt.hash(u.password, BCRYPT_COST)
      try {
        const { rows } = await db.query<AdminUserRecord>(
          `insert into admin_users (email, password_hash, display_name, role)
           values ($1, $2, $3, $4)
           returning id, email, role, is_active, display_name, created_at, updated_at`,
          [u.email, hash, u.displayName ?? null, u.role]
        )
        return rows[0]!
      } catch (e) {
        return mapDbError(e, 'Admin user')
      }
    },

    async findByEmail(email: string): Promise<AdminUserRecord | null> {
      const { rows } = await db.query<AdminUserRecord>(
        `select id, email, password_hash, role, is_active, display_name, created_at, updated_at
         from admin_users
         where email = $1`,
        [email.trim().toLowerCase()]
      )
      return rows[0] ?? null
    },

    async findById(id: number): Promise<AdminUserRecord> {
      const { rows } = await db.query<AdminUserRecord>(
        `select id, email, role, is_active, display_name, created_at, updated_at
         from admin_users
         where id = $1`,
        [id]
      )
      if (!rows[0]) throw new NotFoundError(`Admin user with ID ${id} not found`)
      return rows[0]
    },

    async updatePassword(id: number, newPassword: string): Promise<void> {
      const hash = await bcrypt.hash(newPassword, BCRYPT_COST)
      const res = await db.query(
        `update admin_users set password_hash = $2 where id = $1 returning id`,
        [id, hash]
      )
      if (res.rows.length === 0) throw new NotFoundError(`Admin user with ID ${id} not found`)
    },

    async list(): Promise<AdminUserRecord[]> {
      const { rows } = await db.query<AdminUserRecord>(
        `select id, email, role, is_active, display_name, created_at, updated_at
         from admin_users
         order by id asc`
      )
      return rows
    },
  }
}

/** Standalone helper for seeds/scripts (preserves legacy helper). */
export async function createAdminUser(db: Db, raw: AdminUserInput): Promise<AdminUserRecord> {
  const repo = createAdminUsersRepository(db)
  return repo.create(raw)
}
