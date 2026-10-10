import { Pool, type PoolClient } from 'pg'
import type { Db, QueryResult } from './db'

function wrapClient(client: Pick<PoolClient, 'query'>, nested: boolean): Omit<Db, 'close' | 'transaction'> {
  return {
    async query<T>(sql: string, params?: unknown[]): Promise<QueryResult<T>> {
      const res = await client.query(sql, params)
      return { rows: res.rows as T[] }
    },
    async exec(sql: string): Promise<void> {
      await client.query(sql)
    },
  }
  void nested
}

export interface PgOptions {
  connectionString: string
  max?: number
  ssl?: boolean
}

/** Production driver. Pool size is bounded (conn-limits) with idle + statement timeouts. */
export function createPgDb(opts: PgOptions): Db {
  const pool = new Pool({
    connectionString: opts.connectionString,
    max: opts.max ?? 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
    statement_timeout: 15_000,
    ssl: opts.ssl ? { rejectUnauthorized: false } : undefined,
  })

  const db: Db = {
    ...wrapClient(pool, false),
    async transaction<T>(fn: (tx: Db) => Promise<T>): Promise<T> {
      const client = await pool.connect()
      try {
        await client.query('begin')
        const tx: Db = {
          ...wrapClient(client, true),
          transaction: (inner) => inner(tx), // already inside a transaction
          close: async () => undefined,
        }
        const result = await fn(tx)
        await client.query('commit')
        return result
      } catch (err) {
        await client.query('rollback')
        throw err
      } finally {
        client.release()
      }
    },
    close: () => pool.end(),
  }
  return db
}
