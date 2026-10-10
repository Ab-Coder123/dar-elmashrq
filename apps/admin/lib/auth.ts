import { env } from './env'

const TOKEN_KEY = 'dar_elmashrq_admin_token'

export interface AdminUser {
  id: number
  email: string
  displayName: string | null
  role: 'admin' | 'editor'
  isActive?: boolean
  createdAt?: string
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    // ignore
  }
}

export function clearAuthToken(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    // ignore
  }
}

export async function loginAdmin(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
  const res = await fetch(`${env.API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error?.message || json.message || 'Authentication failed.')
  }

  setAuthToken(json.data.token)
  return json.data
}

export async function fetchCurrentAdminUser(): Promise<AdminUser | null> {
  const token = getAuthToken()
  if (!token) return null

  try {
    const res = await fetch(`${env.API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      if (res.status === 401) {
        clearAuthToken()
      }
      return null
    }

    const json = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
}

export async function logoutAdmin(): Promise<void> {
  const token = getAuthToken()
  if (token) {
    try {
      await fetch(`${env.API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch {
      // ignore
    }
  }
  clearAuthToken()
}
