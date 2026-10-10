'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Building2,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { ADMIN_NAV_ITEMS } from '@/config/navigation'

interface AdminShellProps {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const currentItem = ADMIN_NAV_ITEMS.find((item) => {
    if (item.href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(item.href)
  }) ?? {
    title: 'Not Found',
    titleAr: 'غير موجود',
    description: 'Page not found or invalid route',
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          data-testid="mobile-overlay"
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Desktop & Mobile Drawer */}
      <aside
        data-testid="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#0f172a] text-slate-200 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800/80 px-6">
          <Link
            href="/"
            className="flex items-center gap-3 font-semibold tracking-wide text-white transition-opacity hover:opacity-90"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#123C82] text-[#BA9563] shadow-inner">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base font-bold uppercase tracking-wider text-white">
                Dar ElMashrq
              </div>
              <div className="text-xs tracking-widest text-[#BA9563]">
                ADMIN CMS
              </div>
            </div>
          </Link>
          <button
            type="button"
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close sidebar"
            data-testid="close-mobile-menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className="flex-1 space-y-1.5 overflow-y-auto px-4 py-6"
          aria-label="Admin Navigation"
        >
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Content Management
          </div>
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`nav-link-${item.href.replace('/', '') || 'dashboard'}`}
                className={`group flex items-center justify-between rounded-sm px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#123C82] text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive
                        ? 'text-[#BA9563]'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <span
                    className={`rounded-xs px-1.5 py-0.5 text-[10px] font-semibold tracking-wider ${
                      isActive
                        ? 'bg-[#BA9563] text-[#0f172a]'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer info in sidebar */}
        <div className="border-t border-slate-800/80 p-4">
          <div className="flex items-center gap-3 rounded-sm bg-slate-900/80 p-3">
            <ShieldCheck className="h-5 w-5 text-[#BA9563]" />
            <div className="text-xs">
              <div className="font-semibold text-slate-200">Phase 01: Foundation</div>
              <div className="text-[11px] text-slate-400">Mock Data Mode</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open sidebar"
              data-testid="open-mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Breadcrumbs & Active Title */}
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>CMS</span>
                <ChevronRight className="h-3 w-3" />
                <span className="font-medium text-slate-700">
                  {currentItem.title}
                </span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {currentItem.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900"
            >
              <span>View Public Website</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
