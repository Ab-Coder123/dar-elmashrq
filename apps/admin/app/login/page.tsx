'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react'
import { loginAdmin } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await loginAdmin(email, password)
      router.push('/')
      router.refresh()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Authentication failed. Please check your credentials.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-sm border border-slate-800 bg-[#0f172a] p-8 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm bg-[#123C82] text-[#BA9563] shadow-inner">
            <Building2 className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white uppercase">
            Dar ElMashrq
          </h2>
          <p className="mt-1 text-xs tracking-widest text-[#BA9563] uppercase">
            Admin CMS Authentication
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 rounded-xs border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold tracking-wide text-slate-300 uppercase"
              >
                Email Address
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@elmashrq.com"
                  className="block w-full rounded-xs border border-slate-700 bg-slate-800/80 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:border-[#BA9563] focus:outline-none focus:ring-1 focus:ring-[#BA9563]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold tracking-wide text-slate-300 uppercase"
              >
                Password
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full rounded-xs border border-slate-700 bg-slate-800/80 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:border-[#BA9563] focus:outline-none focus:ring-1 focus:ring-[#BA9563]"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xs bg-[#123C82] py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-[#1a4e9f] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Sign In to Admin CMS</span>
              )}
            </button>
          </div>
        </form>

        <div className="border-t border-slate-800/80 pt-4 text-center text-[11px] text-slate-500">
          Internal Corporate Access Only • Dar ElMashrq Co.
        </div>
      </div>
    </div>
  )
}
