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

  const response = await fetch(url, {
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
