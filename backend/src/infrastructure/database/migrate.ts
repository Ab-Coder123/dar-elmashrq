import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Db } from './db'

export const MIGRATIONS_DIR = path.resolve(__dirname, '../../../migrations')

/** Applies pending *.sql migrations in filename order; each runs in its own transaction. */
export async function migrate(db: Db, dir: string = MIGRATIONS_DIR): Promise<string[]> {
  await db.exec(`
    create table if not exists schema_migrations (
      name text primary key,
      applied_at timestamptz not null default now()
    )`)
  const applied = new Set(
    (await db.query<{ name: string }>('select name from schema_migrations')).rows.map((r) => r.name)
  )
  const files = (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort()
  const ran: string[] = []
  for (const file of files) {
    if (applied.has(file)) continue
    const sql = await readFile(path.join(dir, file), 'utf8')
    await db.transaction(async (tx) => {
      await tx.exec(sql)
      await tx.query('insert into schema_migrations (name) values ($1)', [file])
    })
    ran.push(file)
  }
  return ran
}
