import morgan from 'morgan'
import { env } from '../../config/env'

export const requestLogger = env.isTest
  ? (_req: unknown, _res: unknown, next: () => void) => next()
  : morgan(env.isProduction ? 'combined' : 'dev')
