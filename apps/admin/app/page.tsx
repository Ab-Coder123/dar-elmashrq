import React from 'react'
import Link from 'next/link'
import {
  FolderGit2,
  Briefcase,
  Image as ImageIcon,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
  FileCheck,
  ShieldAlert,
} from 'lucide-react'
import { ADMIN_NAV_ITEMS } from '@/config/navigation'

export default function DashboardOverviewPage() {
  const stats = [
    {
      title: 'Total Projects',
      value: '29',
      subtitle: 'Across SA, Egypt, Qatar',
      icon: FolderGit2,
      trend: '+100% verified from PDF',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Services Active',
      value: '8',
      subtitle: 'Core engineering disciplines',
      icon: Briefcase,
      trend: 'Corporate profile specs',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      title: 'Media Assets',
      value: '35+',
      subtitle: 'Project photos & logos',
      icon: ImageIcon,
      trend: 'Image adapters ready',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Foundation Status',
      value: 'Phase 01',
      subtitle: 'Layout & routing ready',
      icon: FileCheck,
      trend: 'Ready for Phase 02',
      color: 'text-[#123C82]',
      bg: 'bg-[#123C82]/10',
    },
  ]

  const quickNav = ADMIN_NAV_ITEMS.filter((item) => item.href !== '/')

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-block rounded-xs bg-[#123C82]/10 px-2.5 py-1 text-xs font-semibold text-[#123C82]">
              Dar ElMashrq Trading &amp; Contracting
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              Admin Content Management System
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Manage corporate portfolio content, projects, services, regional offices, and media assets.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xs border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Phase 01 Foundation Active</span>
          </div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="rounded-sm border border-slate-200 bg-white p-5 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {stat.title}
                </span>
                <div className={`rounded-sm p-2 ${stat.bg} ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-900">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-slate-500">{stat.subtitle}</div>
              <div className="mt-3 flex items-center gap-1 border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-400">
                <TrendingUp className="h-3 w-3 text-[#BA9563]" />
                <span>{stat.trend}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Content Management Quick Navigation */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Content Sections Overview
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickNav.map((nav) => {
            const Icon = nav.icon
            return (
              <Link
                key={nav.href}
                href={nav.href}
                className="group flex flex-col justify-between rounded-sm border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:border-[#123C82]/30 hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-slate-50 text-slate-700 group-hover:bg-[#123C82] group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-[#123C82] transition-colors" />
                  </div>
                  <h4 className="mt-3 text-base font-bold text-slate-900 group-hover:text-[#123C82] transition-colors">
                    {nav.title}
                  </h4>
                  <div className="text-xs font-medium text-slate-400">{nav.titleAr}</div>
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                    {nav.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#BA9563]">
                  <span>Open Section</span>
                  <span>→</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
