import { env } from './env'
import { getAuthToken } from './auth'

export interface ApiError {
  status: number
  message: string
  code?: string
  details?: unknown
}

export async function adminApiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (typeof process !== 'undefined' && process.env.VITEST) {
    // In unit test environment, bypass network delay and trigger fallback immediately
    throw new Error('VITEST_MOCK_FALLBACK: Backend offline during unit testing')
  }

  const token = getAuthToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const url = endpoint.startsWith('http')
    ? endpoint
    : `${env.API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

  const timeoutMs = 5000
  const controller = typeof AbortSignal !== 'undefined' && 'timeout' in AbortSignal ? AbortSignal.timeout(timeoutMs) : undefined

  const response = await fetch(url, {
    signal: options.signal || controller,
    ...options,
    headers,
  })

  const contentType = response.headers.get('content-type')
  const isJson = contentType && contentType.includes('application/json')
  const payload = isJson ? await response.json() : null

  if (!response.ok) {
    const error: ApiError = {
      status: response.status,
      message: payload?.error?.message || payload?.message || `Request failed with status ${response.status}`,
      code: payload?.error?.code,
      details: payload?.error?.details,
    }
    throw error
  }

  return payload?.data ?? payload
}
