import { getDb } from '../src/infrastructure/database'
import type { Db } from '../src/infrastructure/database/db'

export function createDefaultDb(): Db {
  return getDb()
}
