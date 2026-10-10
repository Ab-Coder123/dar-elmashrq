import { env } from './env'

export interface PublicApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export async function publicApiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  try {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${env.API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      },
      next: { revalidate: 60 }, // Next.js ISR cache 60s
    })

    if (!res.ok) {
      return null
    }

    const json = (await res.json()) as PublicApiResponse<T>
    return json.data ?? (json as unknown as T)
  } catch {
    // Graceful fallback to static data if backend is offline or starting
    return null
  }
}
