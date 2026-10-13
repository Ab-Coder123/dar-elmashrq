'use client'

import Image from 'next/image'
import { MapPin, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Project } from '@dar-elmashrq/types'
import { PROJECT_CATEGORIES } from '@dar-elmashrq/types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { useLanguage } from '@/providers/LanguageProvider'

interface ProjectDetailHeroProps {
  project: Project
  imageUrl: string
}

const CATEGORY_LABELS_AR: Record<string, string> = {
  commercial: 'قطاع تجاري وإداري',
  residential: 'مجمعات سكنية فاخرة',
  'government-institutional': 'مشاريع حكومية ومؤسسية',
  healthcare: 'منشآت طبية ومستشفيات',
  infrastructure: 'بنية تحتية ومحطات',
  hospitality: 'ضيافة وفنادق',
}

const COUNTRY_LABELS_AR: Record<string, string> = {
  'saudi-arabia': 'المملكة العربية السعودية',
  egypt: 'جمهورية مصر العربية',
  qatar: 'دولة قطر',
}

export function ProjectDetailHero({ project, imageUrl }: ProjectDetailHeroProps) {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  const displayName = isAr && project.nameAr ? project.nameAr : project.name
  const displaySecondaryName = isAr ? project.name : project.nameAr
  const displayCategory = isAr
    ? CATEGORY_LABELS_AR[project.category] || PROJECT_CATEGORIES[project.category]?.labelAr || project.category
    : project.category.toUpperCase()
  const displayCountry = isAr
    ? COUNTRY_LABELS_AR[project.country] || project.country
    : project.country.replace('-', ' ').toUpperCase()
  const displayLocation = isAr && project.locationAr ? project.locationAr : project.location

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] w-full bg-slate-950 flex flex-col justify-end overflow-hidden border-b border-[#ba9563]/30">
      <BlueprintCrosshair position="top-left" />
      <BlueprintCrosshair position="top-right" />
      <BlueprintCrosshair position="bottom-left" />
      <BlueprintCrosshair position="bottom-right" />

      {/* Hero Media Image */}
      <Image
        src={imageUrl}
        alt={displayName}
        fill
        priority
        className="object-cover object-center transition-transform duration-1000 ease-out"
        sizes="100vw"
      />

      {/* Cinematic Deep Navy Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09182f] via-[#09182f]/60 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(#ba9563_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto pb-12 sm:pb-16 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl"
        >
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={
                isAr
                  ? "bg-[#ba9563] text-[#0b1a37] px-3 py-1 font-['Cairo'] text-xs font-bold shadow-md tracking-normal"
                  : "bg-[#ba9563] text-[#0b1a37] px-3 py-1 font-['Space_Grotesk'] text-[11px] font-extrabold uppercase tracking-[0.2em] shadow-md"
              }
            >
              {displayCategory}
            </span>
            <div
              className={
                isAr
                  ? "bg-[#0f2244]/90 border border-[#ba9563]/40 px-3 py-1 text-slate-200 font-['Cairo'] text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm tracking-normal"
                  : "bg-[#0f2244]/90 border border-[#ba9563]/40 px-3 py-1 text-slate-200 font-['Space_Grotesk'] text-[11px] uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm"
              }
            >
              <MapPin className="w-3.5 h-3.5 text-[#ba9563]" />
              <span>
                {displayLocation}، {displayCountry}
              </span>
            </div>
            {project.year && (
              <div
                className={
                  isAr
                    ? "bg-[#0f2244]/90 border border-[#ba9563]/40 px-3 py-1 text-slate-200 font-['Cairo'] text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm tracking-normal"
                    : "bg-[#0f2244]/90 border border-[#ba9563]/40 px-3 py-1 text-slate-200 font-['Space_Grotesk'] text-[11px] uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm"
                }
              >
                <Calendar className="w-3.5 h-3.5 text-[#ba9563]" />
                <span>{isAr ? `عام ${project.year}` : `YEAR ${project.year}`}</span>
              </div>
            )}
          </div>

          {/* Project Title */}
          <h1
            className={
              isAr
                ? "font-['Cairo'] text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold leading-[1.2] drop-shadow-lg mb-3 tracking-normal"
                : "font-['Montserrat'] text-3xl sm:text-5xl lg:text-7xl text-white font-extrabold uppercase leading-[1.05] tracking-tight drop-shadow-lg mb-3"
            }
          >
            {displayName}
          </h1>

          {/* Secondary Title */}
          {displaySecondaryName && (
            <p
              className={
                isAr
                  ? "font-['Montserrat'] text-base sm:text-xl text-[#d4b27a] font-semibold mb-6"
                  : "font-['Cairo'] text-lg sm:text-2xl text-[#d4b27a] leading-relaxed mb-6 tracking-normal"
              }
            >
              {displaySecondaryName}
            </p>
          )}

          {/* Services summary line */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#ba9563]/30">
            {project.services.map((service, idx) => (
              <span
                key={idx}
                className={
                  isAr
                    ? "font-['Cairo'] text-xs text-slate-300 bg-[#0f2244]/70 border border-[#ba9563]/30 px-2.5 py-1 font-semibold tracking-normal"
                    : "font-['Space_Grotesk'] text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 bg-[#0f2244]/70 border border-[#ba9563]/30 px-2.5 py-1"
                }
              >
                {service}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

