'use client'

import Image from 'next/image'
import { ArrowRight, MapPin, Building, Calendar, Layers, ShieldCheck } from 'lucide-react'
import type { Project } from '@dar-elmashrq/types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { scaleInVariants } from '@/lib/motion'

interface FeaturedProjectSpotlightProps {
  project?: Project | null
  onOpenDossier: (project: Project) => void
}

export function FeaturedProjectSpotlight({ project, onOpenDossier }: FeaturedProjectSpotlightProps) {
  if (!project) return null

  const imageUrl =
    project.images[0]?.url ||
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85'

  return (
    <section className="relative bg-slate-50 dark:bg-[#0f2244] py-16 md:py-24 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <RevealOnScroll variants={scaleInVariants} threshold={0.1}>
          <div className="border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] relative overflow-hidden shadow-2xl">
            <BlueprintCrosshair position="top-left" />
            <BlueprintCrosshair position="top-right" />
            <BlueprintCrosshair position="bottom-left" />
            <BlueprintCrosshair position="bottom-right" />

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Image Container with overlay */}
              <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px] bg-slate-950 overflow-hidden group">
                <Image
                  src={imageUrl}
                  alt={project.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-[#ba9563]/0 group-hover:bg-[#ba9563]/10 transition-colors duration-500" />

                {/* Corner Flag */}
                <div className="absolute top-6 left-6 bg-[#ba9563] text-[#0b1a37] px-3.5 py-1.5 font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.2em] font-bold shadow-md">
                  FLAGSHIP BENCHMARK
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] block mb-1 font-semibold">
                    {project.category.toUpperCase()} // {project.location}
                  </span>
                  <h3 className="font-['Montserrat'] text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold uppercase leading-tight drop-shadow-md">
                    {project.name}
                  </h3>
                </div>
              </div>

              {/* Right Column: Specification Dossier */}
              <div className="lg:col-span-5 p-8 sm:p-10 md:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-[#434651]/40 bg-white dark:bg-[#0b1a37]">
                <div>
                  <div className="inline-flex items-center space-x-2 text-[#ba9563] mb-4">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-semibold">
                      VERIFIED CONTRACT DOSSIER
                    </span>
                  </div>

                  <h4 className="font-['Montserrat'] text-xl sm:text-2xl text-slate-950 dark:text-white uppercase font-bold mb-4">
                    EXECUTIVE TECHNICAL SCOPE
                  </h4>

                  <p className="font-['Inter'] text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] mb-6 leading-relaxed">
                    {project.description ||
                      'Comprehensive engineering execution covering civil structures, electro-mechanical installations, and specialized finishing works delivered to international quality standards.'}
                  </p>

                  {/* Spec Grid */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-200 dark:border-[#434651]/40 py-5 my-6">
                    <div>
                      <span className="font-['Space_Grotesk'] text-[10px] text-[#ba9563] uppercase tracking-wider block mb-1 font-semibold">
                        TERRITORY
                      </span>
                      <div className="font-['Montserrat'] text-xs sm:text-sm text-slate-900 dark:text-white font-bold uppercase flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#ba9563]" />
                        <span>{project.country.replace('-', ' ')}</span>
                      </div>
                    </div>

                    <div>
                      <span className="font-['Space_Grotesk'] text-[10px] text-[#ba9563] uppercase tracking-wider block mb-1 font-semibold">
                        LOCATION
                      </span>
                      <div className="font-['Montserrat'] text-xs sm:text-sm text-slate-900 dark:text-white font-bold uppercase">
                        {project.location}
                      </div>
                    </div>

                    <div>
                      <span className="font-['Space_Grotesk'] text-[10px] text-[#ba9563] uppercase tracking-wider block mb-1 font-semibold">
                        SERVICES DELIVERED
                      </span>
                      <div className="font-['Inter'] text-xs text-slate-800 dark:text-slate-200 font-medium">
                        {project.services.slice(0, 2).join(' • ')}
                      </div>
                    </div>

                    <div>
                      <span className="font-['Space_Grotesk'] text-[10px] text-[#ba9563] uppercase tracking-wider block mb-1 font-semibold">
                        SECTOR
                      </span>
                      <div className="font-['Montserrat'] text-xs sm:text-sm text-slate-900 dark:text-white font-bold uppercase">
                        {project.category}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenDossier(project)}
                  className="w-full bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-bold py-4 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg group mt-4"
                >
                  <span>INSPECT FULL SPECIFICATION DOSSIER</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
