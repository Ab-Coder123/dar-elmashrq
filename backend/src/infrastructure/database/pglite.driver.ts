import { PGlite } from '@electric-sql/pglite'
import type { Db, QueryResult } from './db'

type Queryable = Pick<PGlite, 'query' | 'exec'>

function wrap(q: Queryable): Pick<Db, 'query' | 'exec'> {
  return {
    async query<T>(sql: string, params?: unknown[]): Promise<QueryResult<T>> {
      const res = await q.query<T>(sql, params)
      return { rows: res.rows }
    },
    async exec(sql: string): Promise<void> {
      await q.exec(sql)
    },
  }
}

/**
 * Test driver: a real Postgres engine (WASM) running in-process and fully isolated
 * from any production database. Used so migrations/constraints are tested for real.
 */
export async function createPgliteDb(): Promise<Db> {
  const pg = new PGlite()
  await pg.waitReady
  return {
    ...wrap(pg),
    async transaction<T>(fn: (tx: Db) => Promise<T>): Promise<T> {
      return pg.transaction(async (t) => {
        const tx: Db = {
          ...wrap(t),
          transaction: (inner) => inner(tx),
          close: async () => undefined,
        }
        return fn(tx)
      })
    },
    close: () => pg.close(),
  }
}
