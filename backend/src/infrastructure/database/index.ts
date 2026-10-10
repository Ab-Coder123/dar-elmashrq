import { env } from '../../config/env'
import { AppError } from '../../shared/errors/AppError'
import type { Db } from './db'
import { createPgDb } from './pg.driver'

let instance: Db | undefined

/** Lazily creates the shared production DB. Fails with a clear message if DATABASE_URL is missing. */
export function getDb(): Db {
  if (instance) return instance
  if (!env.DATABASE_URL) {
    throw new AppError('DATABASE_URL is not configured. See backend/.env.example.', 500, false)
  }
  instance = createPgDb({ connectionString: env.DATABASE_URL, ssl: env.DATABASE_SSL })
  return instance
}

/** Connectivity check used at startup / health. */
export async function checkDbConnection(db: Db): Promise<boolean> {
  try {
    await db.query('select 1')
    return true
  } catch {
    return false
  }
}
