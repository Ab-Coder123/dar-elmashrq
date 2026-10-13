'use client'

import { X, Shield } from 'lucide-react'
import { useLanguage } from '@/providers/LanguageProvider'

interface ProjectDetailHeaderProps {
  projectCode: string
  onClose: () => void
}

export function ProjectDetailHeader({ projectCode, onClose }: ProjectDetailHeaderProps) {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  return (
    <header className="sticky top-0 z-40 bg-[#09182f]/95 backdrop-blur-md border-b border-[#ba9563]/30 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors">
      {/* Brand & Project Indicator */}
      <div className="flex items-center gap-3">
        <span
          className={
            isAr
              ? "font-['Cairo'] text-xs font-bold text-[#ba9563] tracking-normal"
              : "font-['Space_Grotesk'] text-xs uppercase tracking-[0.25em] text-[#ba9563] font-bold"
          }
        >
          {isAr ? 'دار المشرق للتجارة والمقاولات' : 'DAR EL MASHRQ'}
        </span>
        <span className="text-[#ba9563]/40">/</span>
        <span
          className={
            isAr
              ? "font-['Cairo'] text-[11px] font-bold text-slate-300 bg-[#0f2244] border border-[#ba9563]/30 px-2.5 py-0.5 tracking-normal"
              : "font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-slate-300 font-semibold bg-[#0f2244] border border-[#ba9563]/30 px-2.5 py-0.5"
          }
        >
          {isAr ? `ملف المشروع // ${projectCode.toUpperCase()}` : `DOSSIER // ${projectCode.toUpperCase()}`}
        </span>
      </div>

      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label={isAr ? 'إغلاق ملف المشروع' : 'Close project detail overlay'}
        className={
          isAr
            ? "inline-flex items-center gap-2 bg-transparent hover:bg-[#ba9563] text-slate-200 hover:text-[#0b1a37] border border-slate-700 hover:border-[#ba9563] px-3.5 py-1.5 font-['Cairo'] text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#ba9563] tracking-normal"
            : "inline-flex items-center gap-2 bg-transparent hover:bg-[#ba9563] text-slate-200 hover:text-[#0b1a37] border border-slate-700 hover:border-[#ba9563] px-3.5 py-1.5 font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] font-bold transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#ba9563]"
        }
      >
        <span>{isAr ? 'إغلاق' : 'CLOSE'}</span>
        <X className="w-4 h-4" />
      </button>
    </header>
  )
}

