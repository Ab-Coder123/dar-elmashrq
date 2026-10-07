'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  X,
  MapPin,
  Building,
  Calendar,
  Layers,
  FileCheck,
  Send,
  ExternalLink,
  ShieldCheck,
  User,
  Coins,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@dar-elmashrq/types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'

interface ProjectDetailOverlayProps {
  project: Project | null
  onClose: () => void
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

export function ProjectDetailOverlay({ project, onClose }: ProjectDetailOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const imageUrl: string =
    project.images[0]?.url ||
    PROJECT_IMAGE_FALLBACKS[project.slug] ||
    PROJECT_IMAGE_FALLBACKS['default'] ||
    'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85'

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto backdrop-blur-md bg-slate-950/80"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Backdrop click handler */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-4xl bg-white dark:bg-[#0b1a37] border border-[#ba9563]/50 shadow-2xl z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          <BlueprintCrosshair position="top-left" />
          <BlueprintCrosshair position="top-right" />
          <BlueprintCrosshair position="bottom-left" />
          <BlueprintCrosshair position="bottom-right" />

          {/* Modal Header Media Bar */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-950 shrink-0">
            <Image
              src={imageUrl}
              alt={project.name}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project dossier"
              className="absolute top-4 right-4 bg-black/60 hover:bg-[#ba9563] text-white hover:text-[#0b1a37] p-2 border border-white/20 hover:border-[#ba9563] transition-all duration-200 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Status Flag */}
            <div className="absolute top-4 left-4 bg-[#ba9563] text-[#0b1a37] px-3 py-1 font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] font-extrabold shadow-md">
              OFFICIAL ARCHIVE DOSSIER // {project.id.toUpperCase()}
            </div>

            {/* Overlay Title */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-semibold block mb-1">
                {project.category.toUpperCase()} // {project.country.replace('-', ' ').toUpperCase()}
              </span>
              <h2
                id="modal-project-title"
                className="font-['Montserrat'] text-2xl sm:text-3xl md:text-4xl text-white font-extrabold uppercase leading-tight drop-shadow-md"
              >
                {project.name}
              </h2>
              {project.nameAr && (
                <p className="font-['IBM_Plex_Sans_Arabic'] text-sm text-slate-300 mt-1" dir="rtl">
                  {project.nameAr}
                </p>
              )}
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-8">
            {/* Description & Overview */}
            <div>
              <div className="inline-flex items-center space-x-2 text-[#ba9563] mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-semibold">
                  ENGINEERING VERIFICATION
                </span>
              </div>
              <p className="font-['Inter'] text-sm sm:text-base text-slate-700 dark:text-[#c4c6d2] leading-relaxed">
                {project.description ||
                  'Delivered under full engineering supervision adhering to regional specifications and international building codes. All civil structures, electro-mechanical networks, and architectural fit-outs were executed directly by Dar El Mashrq teams.'}
              </p>
            </div>

            {/* Technical Specification Matrix */}
            <div>
              <h3 className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-bold mb-4 pb-2 border-b border-slate-200 dark:border-[#434651]/40">
                TECHNICAL DATA SPECIFICATIONS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 dark:bg-[#0f2244] p-4 border border-slate-200 dark:border-[#434651]/50">
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                    TERRITORY &amp; LOCATION
                  </span>
                  <div className="font-['Montserrat'] text-xs sm:text-sm text-slate-900 dark:text-white font-bold uppercase flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ba9563]" />
                    <span>{project.location}, {project.country.replace('-', ' ')}</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-[#0f2244] p-4 border border-slate-200 dark:border-[#434651]/50">
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                    SECTOR CLASSIFICATION
                  </span>
                  <div className="font-['Montserrat'] text-xs sm:text-sm text-slate-900 dark:text-white font-bold uppercase">
                    {project.category}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-[#0f2244] p-4 border border-slate-200 dark:border-[#434651]/50">
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                    EXECUTION TIMELINE / YEAR
                  </span>
                  <div className="font-['Montserrat'] text-xs sm:text-sm text-slate-900 dark:text-white font-bold uppercase flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#ba9563]" />
                    <span>{project.year ? `COMPLETED ${project.year}` : 'DELIVERED'}</span>
                  </div>
                </div>

                {project.clientName && (
                  <div className="bg-slate-50 dark:bg-[#0f2244] p-4 border border-slate-200 dark:border-[#434651]/50 sm:col-span-2 md:col-span-1">
                    <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                      CLIENT / STAKEHOLDER
                    </span>
                    <div className="font-['Montserrat'] text-xs sm:text-sm text-slate-900 dark:text-white font-bold uppercase flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-[#ba9563]" />
                      <span className="truncate">{project.clientName}</span>
                    </div>
                  </div>
                )}

                {project.contractValue && (
                  <div className="bg-slate-50 dark:bg-[#0f2244] p-4 border border-slate-200 dark:border-[#434651]/50">
                    <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                      CONTRACT VALUE
                    </span>
                    <div className="font-['Space_Grotesk'] text-xs sm:text-sm text-slate-900 dark:text-white font-bold uppercase flex items-center space-x-1.5">
                      <Coins className="w-3.5 h-3.5 text-[#ba9563]" />
                      <span>{project.contractValue.amount.toLocaleString()} {project.contractValue.currency}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scope of Services */}
            <div>
              <h3 className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-bold mb-4 pb-2 border-b border-slate-200 dark:border-[#434651]/40">
                SERVICES &amp; DISCIPLINES DELIVERED
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 bg-slate-100 dark:bg-[#0f2244] border border-[#ba9563]/40 px-3 py-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#ba9563]" />
                    <span className="font-['Space_Grotesk'] text-xs uppercase tracking-wider text-slate-900 dark:text-white font-semibold">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-6 border-t border-slate-200 dark:border-[#434651]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/contact"
                onClick={onClose}
                className="w-full sm:w-auto bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-bold px-8 py-4 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>INITIATE SIMILAR TENDER INQUIRY</span>
                <Send className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="font-['Space_Grotesk'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                CLOSE DOSSIER [ESC]
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
