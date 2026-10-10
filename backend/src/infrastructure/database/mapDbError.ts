import { BadRequestError, ConflictError, AppError } from '../../shared/errors/AppError'

interface PgErrorLike {
  code?: string
  constraint?: string
  detail?: string
}

/** Translates Postgres constraint violations into typed HTTP-safe errors. */
export function mapDbError(err: unknown, what: string): never {
  if (err instanceof AppError) throw err
  const e = err as PgErrorLike
  switch (e?.code) {
    case '23505':
      throw new ConflictError(`${what} already exists`, { constraint: e.constraint })
    case '23503':
    case '23001':
      throw new ConflictError(`${what} is referenced by, or references, another record`, {
        constraint: e.constraint,
      })
    case '23514':
    case '23502':
      throw new BadRequestError(`${what} violates a data constraint`, { constraint: e.constraint })
    default:
      throw err
  }
}
