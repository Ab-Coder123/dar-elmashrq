'use client'

import Image from 'next/image'
import { ArrowRight, MapPin, Building, Calendar, Layers } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Project } from '@dar-elmashrq/types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { fadeUpVariants } from '@/lib/motion'

interface ProjectCardProps {
  project: Project
  onOpenDossier: (project: Project) => void
  isPriority?: boolean
}

// Fallback high-resolution architectural photography mapped by slug/category
const PROJECT_IMAGE_FALLBACKS: Record<string, string> = {
  'beverly-al-azeeza-new-facade':
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
  'way-care-medical-hospital':
    'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=85',
  'grc-factory':
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85',
  'residential-villas-al-qatif':
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  'educational-buildings-madinah-public-security':
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  'forensic-evidence-building-riyadh':
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
  'awlad-ragab-supermarket-chain':
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=85',
  'awlad-ragab-supermarket-chain-21-branches':
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=85',
  'qasr-al-husseini-residential-towers':
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
  'al-shorouk-housing-complex':
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
  'al-shorouk-housing-complex-30-towers':
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
  'al-maraga-hospital-reconstruction':
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85',
  'villa-al-mishaf-qatar':
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
  'residential-commercial-building-muwazzar':
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
  'three-villas-al-dakheel-qatar':
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
  'western-water-pump-station-ras-tanura':
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85',
  default:
    'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85',
}

export function ProjectCard({ project, onOpenDossier, isPriority = false }: ProjectCardProps) {
  const imageUrl: string =
    project.images[0]?.url ||
    PROJECT_IMAGE_FALLBACKS[project.slug] ||
    PROJECT_IMAGE_FALLBACKS['default'] ||
    'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85'

  const countryLabels: Record<string, string> = {
    'saudi-arabia': 'KSA',
    egypt: 'EGY',
    qatar: 'QAT',
  }

  return (
    <motion.div
      variants={fadeUpVariants}
      className="group relative border border-slate-200 dark:border-[#ba9563]/30 bg-white dark:bg-[#0b1a37] overflow-hidden flex flex-col justify-between hover:border-[#ba9563] transition-all duration-300 shadow-md hover:shadow-2xl"
    >
      <BlueprintCrosshair position="top-left" />
      <BlueprintCrosshair position="bottom-right" />

      {/* Card Header Media */}
      <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden bg-slate-950">
        <Image
          src={imageUrl}
          alt={project.name}
          fill
          priority={isPriority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 dark:from-[#0b1a37] via-black/20 to-transparent" />
        
        {/* Subtle hover accent overlay */}
        <div className="absolute inset-0 bg-[#ba9563]/0 group-hover:bg-[#ba9563]/10 transition-colors duration-500" />

        {/* Top Badges */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          {/* Location Badge */}
          <div className="bg-white/95 dark:bg-[#0b1a37]/90 px-2.5 py-1 border border-[#ba9563]/40 font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.15em] text-[#ba9563] flex items-center space-x-1.5 backdrop-blur-sm font-semibold shadow-sm">
            <MapPin className="w-3 h-3 text-[#ba9563]" />
            <span>{project.location}</span>
          </div>

          {/* Country Code Pill */}
          <div className="bg-[#ba9563] text-[#0b1a37] px-2 py-0.5 font-['Space_Grotesk'] text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
            {countryLabels[project.country] || project.country}
          </div>
        </div>

        {/* Category Label at bottom of image */}
        <div className="absolute bottom-3 left-4 right-4 z-10">
          <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold block">
            {project.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Card Body Information */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow border-t border-slate-200 dark:border-[#ba9563]/20">
        <div>
          {/* Project Title */}
          <h3 className="font-['Montserrat'] text-lg sm:text-xl text-slate-950 dark:text-white font-bold mb-2 group-hover:text-[#ba9563] transition-colors duration-300 uppercase leading-snug">
            {project.name}
          </h3>

          {/* Arabic Name if present */}
          {project.nameAr && (
            <p className="font-['IBM_Plex_Sans_Arabic'] text-xs text-slate-500 dark:text-[#8e909c] mb-3 leading-relaxed" dir="rtl">
              {project.nameAr}
            </p>
          )}

          {/* Services Scope Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.services.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="font-['Space_Grotesk'] text-[9px] uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-[#0f2244] border border-slate-200 dark:border-[#434651]/50 text-slate-700 dark:text-slate-300 font-medium"
              >
                {service}
              </span>
            ))}
          </div>

          {/* Description Snippet */}
          <p className="font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2] line-clamp-2 leading-relaxed mb-4">
            {project.description ||
              'Civil construction, precision electro-mechanical contracting, and high-tolerance finishes executed to exact engineering codes.'}
          </p>
        </div>

        {/* Card Footer: Metadata & Trigger */}
        <div className="pt-4 border-t border-slate-200 dark:border-[#434651]/40 flex items-center justify-between mt-auto">
          <div className="font-['Space_Grotesk'] text-[11px] text-slate-500 dark:text-[#8e909c] flex items-center space-x-1.5">
            {project.year ? (
              <>
                <Calendar className="w-3.5 h-3.5 text-[#ba9563]" />
                <span>{project.year}</span>
              </>
            ) : (
              <>
                <Building className="w-3.5 h-3.5 text-[#ba9563]" />
                <span className="uppercase">{project.country.replace('-', ' ')}</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => onOpenDossier(project)}
            aria-label={`Inspect specification dossier for ${project.name}`}
            className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] text-[#ba9563] hover:text-[#123c82] dark:hover:text-white inline-flex items-center space-x-1.5 transition-all font-bold group/btn focus:outline-none focus:ring-1 focus:ring-[#ba9563]"
          >
            <span>Dossier</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
