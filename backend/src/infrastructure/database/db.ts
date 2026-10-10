export interface QueryResult<T> {
  rows: T[]
}

/**
 * Minimal database contract used by repositories.
 * Implemented by node-postgres (production) and PGlite (tests: real Postgres in-process).
 */
export interface Db {
  query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<QueryResult<T>>
  /** Run multi-statement SQL (migrations). */
  exec(sql: string): Promise<void>
  transaction<T>(fn: (tx: Db) => Promise<T>): Promise<T>
  close(): Promise<void>
}
