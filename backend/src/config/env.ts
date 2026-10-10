import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PREFIX: z.string().default('/api/v1'),
  CORS_ORIGIN: z.string().default('http://localhost:3000,http://localhost:3001'),
  DATABASE_URL: z
    .string()
    .url()
    .refine((v) => /^postgres(ql)?:\/\//.test(v), 'DATABASE_URL must be a postgres:// URL')
    .optional(),
  DATABASE_SSL: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
  JWT_SECRET: z.string().min(16).default('dar-elmashrq-super-secret-jwt-key-2026!'),
  JWT_EXPIRES_IN_SECONDS: z.coerce.number().int().default(86400),
})

const parseEnv = () => {
  const result = envSchema.safeParse(process.env)
  if (!result.success) {
    console.error('❌ Invalid environment variables:', JSON.stringify(result.error.format(), null, 2))
    throw new Error('Invalid environment configuration.')
  }
  return {
    ...result.data,
    corsOrigins: result.data.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
    isProduction: result.data.NODE_ENV === 'production',
    isTest: result.data.NODE_ENV === 'test',
    isDevelopment: result.data.NODE_ENV === 'development',
  }
}

export const env = parseEnv()
