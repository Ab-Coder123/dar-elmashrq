'use client'

import type { Country, ProjectCategory } from '@dar-elmashrq/types'
import { PROJECT_CATEGORIES } from '@dar-elmashrq/types'
import { Filter, Search, X } from 'lucide-react'

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
  const countryTabs: Array<{ id: Country | 'all'; label: string }> = [
    { id: 'all', label: 'ALL TERRITORIES' },
    { id: 'saudi-arabia', label: 'SAUDI ARABIA' },
    { id: 'egypt', label: 'EGYPT' },
    { id: 'qatar', label: 'QATAR' },
  ]

  const categories: Array<{ id: ProjectCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Disciplines / Sectors' },
    { id: 'residential', label: 'Residential Developments' },
    { id: 'commercial', label: 'Commercial & Retail' },
    { id: 'healthcare', label: 'Healthcare & Hospitals' },
    { id: 'government-institutional', label: 'Government & Institutional' },
    { id: 'infrastructure', label: 'Heavy Infrastructure & Industrial' },
  ]

  return (
    <div className="space-y-6 mb-12">
      {/* Top Bar: Country Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-[#434651]/40 pb-4">
        {/* Country Navigation Tabs */}
        <div className="flex items-center space-x-2 sm:space-x-6 overflow-x-auto no-scrollbar py-2">
          {countryTabs.map((tab) => {
            const isActive = activeCountry === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onCountryChange(tab.id)}
                className={`font-['Space_Grotesk'] text-xs uppercase tracking-[0.18em] transition-all whitespace-nowrap py-2 border-b-2 -mb-[18px] focus:outline-none ${
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
          <Search className="w-4 h-4 text-[#ba9563] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, city, discipline..."
            className="w-full pl-9 pr-8 py-2 bg-white dark:bg-[#0b1a37] border border-slate-300 dark:border-[#434651] text-xs font-['Inter'] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#8e909c] rounded-none outline-none focus:border-[#ba9563] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Filter Controls: Sector Selector & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Category Pills / Select */}
        <div className="flex items-center space-x-3">
          <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#ba9563] font-semibold flex items-center space-x-1.5">
            <Filter className="w-3 h-3" />
            <span>SECTOR:</span>
          </span>
          <select
            value={activeCategory}
            onChange={(e) => onCategoryChange(e.target.value as ProjectCategory | 'all')}
            className="bg-white dark:bg-[#0b1a37] border border-slate-300 dark:border-[#434651] text-xs font-['Space_Grotesk'] uppercase tracking-wider text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-none outline-none focus:border-[#ba9563] transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Live Counter */}
        <div className="font-['Space_Grotesk'] text-xs text-slate-500 dark:text-[#8e909c] uppercase tracking-wider">
          SHOWING <span className="text-[#ba9563] font-bold">{filteredCount}</span> OF <span className="font-bold">{totalCount}</span> INDEXED CONTRACTS
        </div>
      </div>
    </div>
  )
}
