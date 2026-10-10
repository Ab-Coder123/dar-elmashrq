import { createDefaultDb } from './scriptDb'
import { migrate } from '../src/infrastructure/database/migrate'

async function main(): Promise<void> {
  const db = createDefaultDb()
  try {
    const ran = await migrate(db)
    console.log(ran.length ? `Applied: ${ran.join(', ')}` : 'Database is up to date.')
  } finally {
    await db.close()
  }
}

main().catch((err) => {
  console.error('Migration failed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
