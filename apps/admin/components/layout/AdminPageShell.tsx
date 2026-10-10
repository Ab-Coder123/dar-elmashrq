import React from 'react'
import Link from 'next/link'
import { ArrowRight, AlertCircle, LucideIcon } from 'lucide-react'

interface AdminPageShellProps {
  title: string
  titleAr: string
  description: string
  icon: LucideIcon
  badge?: string
  sections?: {
    name: string
    nameAr: string
    description: string
    fieldsCount?: number
  }[]
  actionLabel?: string
  actionHref?: string
}

export function AdminPageShell({
  title,
  titleAr,
  description,
  icon: Icon,
  badge,
  sections,
}: AdminPageShellProps) {
  return (
    <div className="space-y-6">
      {/* Page Overview Card */}
      <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#123C82]/10 text-[#123C82]">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                <span className="text-sm font-medium text-slate-400">({titleAr})</span>
                {badge && (
                  <span className="rounded-xs bg-[#BA9563]/20 px-2 py-0.5 text-xs font-semibold text-[#8b6531]">
                    {badge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xs border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs text-amber-800">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
            <span>Phase 01 Shell • Ready for Phase 02 Form Editors</span>
          </div>
        </div>
      </div>

      {/* Verified Content Sections Grid */}
      {sections && sections.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Supported Website Sections &amp; Data Models
            </h3>
            <span className="text-xs text-slate-400">
              {sections.length} Managed Sections
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((sec, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-sm border border-slate-200 bg-white p-5 shadow-2xs transition-shadow hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#123C82]">
                      Section {idx + 1}
                    </span>
                    {sec.fieldsCount && (
                      <span className="text-[11px] text-slate-400">
                        {sec.fieldsCount} Fields
                      </span>
                    )}
                  </div>
                  <h4 className="mt-1.5 text-base font-bold text-slate-900">
                    {sec.name}
                  </h4>
                  <div className="text-xs font-medium text-slate-400">
                    {sec.nameAr}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {sec.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Schema verified</span>
                  <span className="font-semibold text-[#BA9563]">Phase 02 Target</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
