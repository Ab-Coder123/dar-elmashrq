import { ShieldCheck, MapPin, Building, Calendar, User, Coins } from 'lucide-react'
import type { Project } from '@dar-elmashrq/types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'

interface ProjectOverviewProps {
  project: Project
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <section className="relative py-16 md:py-24 border-b border-[#ba9563]/30 bg-[#0b1a37] text-white">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Heading & Datum Badge */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center space-x-2 border border-[#ba9563]/40 bg-[#0f2244] px-3 py-1">
              <span className="w-2 h-2 bg-[#ba9563]" />
              <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
                EXECUTIVE DOSSIER
              </span>
            </div>

            <h2 className="font-['Montserrat'] text-3xl sm:text-4xl text-white uppercase font-extrabold leading-tight">
              PROJECT <br />
              <span className="text-[#ba9563]">OVERVIEW</span>
            </h2>

            <p className="font-['Inter'] text-xs sm:text-sm text-slate-300 leading-relaxed">
              Official contracting record verified under Dar El Mashrq governance standards and sovereign operational licensing.
            </p>
          </div>

          {/* Right Column: Narrative & Technical Metrics */}
          <div className="lg:col-span-8 space-y-8">
            {/* Narrative text */}
            <div className="border-l-2 border-[#ba9563] pl-6 space-y-4">
              <p className="font-['Inter'] text-sm sm:text-base text-slate-200 leading-relaxed">
                {project.description ||
                  'Delivered under comprehensive engineering supervision adhering to regional building codes, municipal standards, and civil defense compliance. Dar El Mashrq managed all primary structural operations, electro-mechanical coordination, and high-tolerance architectural finishing.'}
              </p>
              {project.descriptionAr && (
                <p className="font-['IBM_Plex_Sans_Arabic'] text-sm text-[#d4b27a] leading-relaxed pt-2 border-t border-[#ba9563]/20" dir="rtl">
                  {project.descriptionAr}
                </p>
              )}
            </div>

            {/* Structured Specifications Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-[#ba9563]/20">
              <div className="bg-[#0f2244] p-4 border border-[#ba9563]/30 relative">
                <BlueprintCrosshair position="top-left" />
                <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                  LOCATION &amp; REGION
                </span>
                <div className="font-['Montserrat'] text-xs sm:text-sm text-white font-bold uppercase flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ba9563]" />
                  <span>{project.location}, {project.country.replace('-', ' ')}</span>
                </div>
              </div>

              <div className="bg-[#0f2244] p-4 border border-[#ba9563]/30 relative">
                <BlueprintCrosshair position="top-left" />
                <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                  SECTOR DISCIPLINE
                </span>
                <div className="font-['Montserrat'] text-xs sm:text-sm text-white font-bold uppercase">
                  {project.category}
                </div>
              </div>

              <div className="bg-[#0f2244] p-4 border border-[#ba9563]/30 relative">
                <BlueprintCrosshair position="top-left" />
                <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                  CONTRACT STATUS
                </span>
                <div className="font-['Montserrat'] text-xs sm:text-sm text-white font-bold uppercase flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#ba9563]" />
                  <span>{project.year ? `DELIVERED ${project.year}` : 'COMPLETED & COMMISSIONED'}</span>
                </div>
              </div>

              {project.clientName && (
                <div className="bg-[#0f2244] p-4 border border-[#ba9563]/30 relative sm:col-span-2 md:col-span-2">
                  <BlueprintCrosshair position="top-left" />
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                    CLIENT / DEVELOPER ENTITY
                  </span>
                  <div className="font-['Montserrat'] text-xs sm:text-sm text-white font-bold uppercase flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-[#ba9563]" />
                    <span>{project.clientName}</span>
                  </div>
                </div>
              )}

              {project.contractValue && (
                <div className="bg-[#0f2244] p-4 border border-[#ba9563]/30 relative sm:col-span-2 md:col-span-1">
                  <BlueprintCrosshair position="top-left" />
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                    DISCLOSED CONTRACT VALUE
                  </span>
                  <div className="font-['Space_Grotesk'] text-xs sm:text-sm text-[#ba9563] font-bold uppercase flex items-center space-x-1.5">
                    <Coins className="w-3.5 h-3.5" />
                    <span>{project.contractValue.amount.toLocaleString()} {project.contractValue.currency}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
