'use client'

import type { Country, ProjectCategory } from '@dar-elmashrq/types'
import { PROJECT_CATEGORIES } from '@dar-elmashrq/types'
import { Filter, Search, X } from 'lucide-react'
import { useLanguage } from '@/providers/LanguageProvider'

interface ProjectFiltersProps {
  activeCountry: Country | 'all'
  onCountryChange: (country: Country | 'all') => void
  activeCategory: ProjectCategory | 'all'
  onCategoryChange: (category: ProjectCategory | 'all') => void
  searchQuery: string
  onSearchChange: (search: string) => void
  totalCount: number
  filteredCount: number
}

export function ProjectFilters({
  activeCountry,
  onCountryChange,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
}: ProjectFiltersProps) {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  const countryTabs: Array<{ id: Country | 'all'; label: string }> = [
    { id: 'all', label: isAr ? 'كافة المناطق' : 'ALL TERRITORIES' },
    { id: 'saudi-arabia', label: isAr ? 'المملكة العربية السعودية' : 'SAUDI ARABIA' },
    { id: 'egypt', label: isAr ? 'جمهورية مصر العربية' : 'EGYPT' },
    { id: 'qatar', label: isAr ? 'دولة قطر' : 'QATAR' },
  ]

  const categories: Array<{ id: ProjectCategory | 'all'; label: string }> = [
    { id: 'all', label: isAr ? 'كافة القطاعات والتخصصات' : 'All Disciplines / Sectors' },
    { id: 'residential', label: isAr ? 'المشاريع والمجمعات السكنية' : 'Residential Developments' },
    { id: 'commercial', label: isAr ? 'المشاريع التجارية والأسواق' : 'Commercial & Retail' },
    { id: 'healthcare', label: isAr ? 'المستشفيات والرعاية الصحية' : 'Healthcare & Hospitals' },
    { id: 'government-institutional', label: isAr ? 'المشاريع الحكومية والمؤسسية' : 'Government & Institutional' },
    { id: 'infrastructure', label: isAr ? 'البنية التحتية والمشاريع الصناعية' : 'Heavy Infrastructure & Industrial' },
  ]

  return (
    <div className="space-y-6 mb-12">
      {/* Top Bar: Country Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-[#434651]/40 pb-4">
        {/* Country Navigation Tabs */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2">
          {countryTabs.map((tab) => {
            const isActive = activeCountry === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onCountryChange(tab.id)}
                className={`text-xs uppercase transition-all whitespace-nowrap py-2 border-b-2 -mb-[18px] focus:outline-none ${
                  isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk'] tracking-[0.18em]"
                } ${
                  isActive
                    ? 'text-[#ba9563] border-[#ba9563] font-bold'
                    : 'text-slate-600 dark:text-[#c4c6d2] border-transparent hover:text-[#ba9563] font-medium'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-80">
          <Search className={`w-4 h-4 text-[#ba9563] absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 pointer-events-none`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={isAr ? 'ابحث باسم المشروع، المدينة، القطاع...' : 'Search by name, city, discipline...'}
            className={`w-full ${isAr ? 'pr-9 pl-8 font-arabic' : "pl-9 pr-8 font-['Inter']"} py-2 bg-white dark:bg-[#0b1a37] border border-slate-300 dark:border-[#434651] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#8e909c] rounded-none outline-none focus:border-[#ba9563] transition-colors`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className={`absolute ${isAr ? 'left-2.5' : 'right-2.5'} top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Filter Controls: Sector Selector & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Category Pills / Select */}
        <div className="flex items-center gap-3">
          <span className={`text-[10px] uppercase tracking-widest text-[#ba9563] font-semibold flex items-center gap-1.5 ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
            <Filter className="w-3 h-3" />
            <span>{isAr ? 'القطاع:' : 'SECTOR:'}</span>
          </span>
          <select
            value={activeCategory}
            onChange={(e) => onCategoryChange(e.target.value as ProjectCategory | 'all')}
            className={`bg-white dark:bg-[#0b1a37] border border-slate-300 dark:border-[#434651] text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-none outline-none focus:border-[#ba9563] transition-colors ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Live Counter */}
        <div className={`text-xs text-slate-500 dark:text-[#8e909c] uppercase tracking-wider ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
          {isAr ? (
            <>
              عرض <span className="text-[#ba9563] font-bold">{filteredCount}</span> من أصل <span className="font-bold">{totalCount}</span> عقداً مسجلاً
            </>
          ) : (
            <>
              SHOWING <span className="text-[#ba9563] font-bold">{filteredCount}</span> OF <span className="font-bold">{totalCount}</span> INDEXED CONTRACTS
            </>
          )}
        </div>
      </div>
    </div>
  )
}
