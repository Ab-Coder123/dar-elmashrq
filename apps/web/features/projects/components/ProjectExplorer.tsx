'use client'

import { useState, useMemo } from 'react'
import type { Country, Project, ProjectCategory } from '@dar-elmashrq/types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'
import { ProjectFilters } from './ProjectFilters'
import { ProjectGrid } from './ProjectGrid'
import { ProjectDetailOverlay } from './ProjectDetailOverlay'
import { FeaturedProjectSpotlight } from './FeaturedProjectSpotlight'

interface ProjectExplorerProps {
  initialProjects: Project[]
}

export function ProjectExplorer({ initialProjects }: ProjectExplorerProps) {
  const [activeCountry, setActiveCountry] = useState<Country | 'all'>('all')
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const featuredBenchmark = useMemo(() => {
    return initialProjects.find((p) => p.isFeatured) || initialProjects[0]
  }, [initialProjects])

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Country Filter
      if (activeCountry !== 'all' && project.country !== activeCountry) {
        return false
      }

      // Category Filter
      if (activeCategory !== 'all' && project.category !== activeCategory) {
        return false
      }

      // Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchesName =
          project.name.toLowerCase().includes(query) ||
          (project.nameAr?.toLowerCase().includes(query) ?? false)
        const matchesLocation = project.location.toLowerCase().includes(query)
        const matchesServices = project.services.some((s) => s.toLowerCase().includes(query))
        const matchesCategory = project.category.toLowerCase().includes(query)

        if (!matchesName && !matchesLocation && !matchesServices && !matchesCategory) {
          return false
        }
      }

      return true
    })
  }, [initialProjects, activeCountry, activeCategory, searchQuery])

  const handleResetFilters = () => {
    setActiveCountry('all')
    setActiveCategory('all')
    setSearchQuery('')
  }

  return (
    <>
      {/* Flagship Benchmark Spotlight */}
      {featuredBenchmark && (
        <FeaturedProjectSpotlight
          project={featuredBenchmark}
          onOpenDossier={(p) => setSelectedProject(p)}
        />
      )}

      <section className="relative bg-white dark:bg-[#09182f] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300" id="archive">
        <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
          {/* Section Header */}
          <RevealOnScroll variants={fadeUpVariants}>
            <div className="mb-10">
              <div className="inline-flex items-center space-x-2 border border-[#ba9563]/40 bg-slate-50 dark:bg-[#0f2244] px-3 py-1 mb-3">
                <span className="w-2 h-2 bg-[#ba9563]" />
                <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
                  INDEX &amp; REGISTER
                </span>
              </div>
              <h2 className="font-['Montserrat'] text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold tracking-tight">
                MASTER CONTRACT ARCHIVE
              </h2>
              <p className="font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2] mt-2 max-w-2xl">
                Filter our active and historical contracting dossier by sovereign market, structural discipline, or keyword search.
              </p>
            </div>
          </RevealOnScroll>

          {/* Blueprint Datum Line */}
          <div className="h-[1px] w-full bg-[#ba9563]/30 mb-8 relative flex items-center justify-between">
            <BlueprintCrosshair position="top-left" className="-left-2 -top-2" />
            <BlueprintCrosshair position="top-right" className="-right-2 -top-2" />
          </div>

          {/* Interactive Filter Bar */}
          <ProjectFilters
            activeCountry={activeCountry}
            onCountryChange={setActiveCountry}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalCount={initialProjects.length}
            filteredCount={filteredProjects.length}
          />

          {/* Projects Grid */}
          <ProjectGrid
            projects={filteredProjects}
            onOpenDossier={(project) => setSelectedProject(project)}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Detail Overlay / Modal */}
        <ProjectDetailOverlay
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </section>
    </>
  )
}
