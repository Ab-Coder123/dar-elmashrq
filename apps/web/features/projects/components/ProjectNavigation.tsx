'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Project } from '@dar-elmashrq/types'

interface ProjectNavigationProps {
  previousProject: Project | null
  nextProject: Project | null
  onPrevious: () => void
  onNext: () => void
  currentIndex: number
  totalCount: number
}

export function ProjectNavigation({
  previousProject,
  nextProject,
  onPrevious,
  onNext,
  currentIndex,
  totalCount,
}: ProjectNavigationProps) {
  return (
    <nav
      aria-label="Project detail navigation"
      className="sticky bottom-0 z-40 bg-[#09182f]/95 backdrop-blur-md border-t border-[#ba9563]/30 px-4 sm:px-8 py-4 flex items-center justify-between transition-colors shadow-2xl"
    >
      {/* Previous Project Button */}
      {previousProject ? (
        <button
          type="button"
          onClick={onPrevious}
          className="flex items-center space-x-2 text-slate-300 hover:text-[#ba9563] transition-colors group text-left"
        >
          <div className="p-2 border border-[#ba9563]/40 bg-[#0f2244] group-hover:bg-[#ba9563] group-hover:text-[#0b1a37] transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#ba9563] font-bold block">
              PREVIOUS
            </span>
            <span className="font-['Montserrat'] text-xs font-bold uppercase text-white truncate max-w-[180px] block">
              {previousProject.name}
            </span>
          </div>
        </button>
      ) : (
        <div />
      )}

      {/* Center Index Indicator */}
      <div className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.2em] text-[#ba9563] bg-[#0f2244] border border-[#ba9563]/30 px-4 py-1.5 shadow-inner">
        CONTRACT {currentIndex + 1} OF {totalCount}
      </div>

      {/* Next Project Button */}
      {nextProject ? (
        <button
          type="button"
          onClick={onNext}
          className="flex items-center space-x-2 text-slate-300 hover:text-[#ba9563] transition-colors group text-right"
        >
          <div className="hidden sm:block">
            <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#ba9563] font-bold block">
              NEXT
            </span>
            <span className="font-['Montserrat'] text-xs font-bold uppercase text-white truncate max-w-[180px] block">
              {nextProject.name}
            </span>
          </div>
          <div className="p-2 border border-[#ba9563]/40 bg-[#0f2244] group-hover:bg-[#ba9563] group-hover:text-[#0b1a37] transition-colors">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      ) : (
        <div />
      )}
    </nav>
  )
}
