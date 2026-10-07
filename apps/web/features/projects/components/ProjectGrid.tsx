'use client'

import type { Project } from '@dar-elmashrq/types'
import { ProjectCard } from './ProjectCard'
import { RevealChildren } from '@/components/motion/RevealOnScroll'
import { RotateCcw, SearchX } from 'lucide-react'

interface ProjectGridProps {
  projects: Project[]
  onOpenDossier: (project: Project) => void
  onResetFilters: () => void
}

export function ProjectGrid({ projects, onOpenDossier, onResetFilters }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-slate-300 dark:border-[#434651] bg-slate-50 dark:bg-[#0f2244]/50 p-8 sm:p-12">
        <SearchX className="w-12 h-12 text-[#ba9563] mx-auto mb-4" />
        <h3 className="font-['Montserrat'] text-xl sm:text-2xl text-slate-950 dark:text-white uppercase font-bold mb-2">
          NO INDEXED PROJECTS MATCH CRITERIA
        </h3>
        <p className="font-['Inter'] text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] max-w-md mx-auto mb-6">
          Adjust your country or sector filters, or reset the search query to explore the complete Dar El Mashrq archive.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center space-x-2 bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-bold px-6 py-3 transition-colors shadow-md"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET ALL FILTERS</span>
        </button>
      </div>
    )
  }

  return (
    <RevealChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.08}>
      {projects.map((project, idx) => (
        <ProjectCard
          key={project.id}
          project={project}
          onOpenDossier={onOpenDossier}
          isPriority={idx < 3}
        />
      ))}
    </RevealChildren>
  )
}
