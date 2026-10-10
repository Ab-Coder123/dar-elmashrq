import crypto from 'node:crypto'
import { env } from '../../config/env'
import { UnauthorizedError } from '../errors/AppError'

export interface AuthTokenPayload {
  userId: number
  email: string
  role: 'admin' | 'editor'
  iat?: number
  exp?: number
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) {
    base64 += '='
  }
  return Buffer.from(base64, 'base64').toString('utf8')
}

export function signJwt(payload: Omit<AuthTokenPayload, 'iat' | 'exp'>, expiresInSeconds = env.JWT_EXPIRES_IN_SECONDS): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const now = Math.floor(Date.now() / 1000)
  const fullPayload: AuthTokenPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload))
  const dataToSign = `${encodedHeader}.${encodedPayload}`

  const signature = crypto
    .createHmac('sha256', env.JWT_SECRET)
    .update(dataToSign)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  return `${dataToSign}.${signature}`
}

export function verifyJwt(token: string): AuthTokenPayload {
  if (!token || typeof token !== 'string') {
    throw new UnauthorizedError('Authentication token is missing.')
  }

  const parts = token.split('.')
  if (parts.length !== 3) {
    throw new UnauthorizedError('Invalid authentication token format.')
  }

  const [encodedHeader, encodedPayload, signature] = parts
  const dataToSign = `${encodedHeader}.${encodedPayload}`

  const expectedSignature = crypto
    .createHmac('sha256', env.JWT_SECRET)
    .update(dataToSign)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  const expectedBuffer = Buffer.from(expectedSignature)
  const actualBuffer = Buffer.from(signature!)

  if (
    expectedBuffer.length !== actualBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, actualBuffer)
  ) {
    throw new UnauthorizedError('Invalid authentication token signature.')
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload!)) as AuthTokenPayload
    const now = Math.floor(Date.now() / 1000)

    if (payload.exp && payload.exp < now) {
      throw new UnauthorizedError('Authentication token has expired. Please log in again.')
    }

    return payload
  } catch (err) {
    if (err instanceof UnauthorizedError) throw err
    throw new UnauthorizedError('Invalid authentication token payload.')
  }
}
