'use client'

import Image from 'next/image'
import { ArrowRight, MapPin, Building, Calendar } from 'lucide-react'
import type { Project } from '@dar-elmashrq/types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'

interface RelatedProjectsProps {
  relatedProjects: Project[]
  onSelectProject: (project: Project) => void
}

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

export function RelatedProjects({ relatedProjects, onSelectProject }: RelatedProjectsProps) {
  if (relatedProjects.length === 0) return null

  return (
    <section className="relative py-16 md:py-24 border-b border-[#ba9563]/30 bg-[#0b1a37] text-white">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 border border-[#ba9563]/40 bg-[#0f2244] px-3 py-1 mb-3">
            <span className="w-2 h-2 bg-[#ba9563]" />
            <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
              CROSS-PORTFOLIO
            </span>
          </div>
          <h2 className="font-['Montserrat'] text-2xl sm:text-3xl lg:text-4xl text-white uppercase font-extrabold">
            RELATED CONTRACTS &amp; <span className="text-[#ba9563]">DEVELOPMENTS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProjects.map((relProject) => {
            const relImg =
              relProject.images[0]?.url ||
              PROJECT_IMAGE_FALLBACKS[relProject.slug] ||
              PROJECT_IMAGE_FALLBACKS['default'] ||
              'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85'

            return (
              <div
                key={relProject.id}
                onClick={() => onSelectProject(relProject)}
                className="group border border-[#ba9563]/30 bg-[#09182f] overflow-hidden cursor-pointer hover:border-[#ba9563] transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                  <Image
                    src={relImg}
                    alt={relProject.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#ba9563] text-[#0b1a37] px-2 py-0.5 font-['Space_Grotesk'] text-[9px] font-bold uppercase tracking-wider">
                    {relProject.country.replace('-', ' ').toUpperCase()}
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#ba9563] font-semibold block mb-1">
                      {relProject.category.toUpperCase()}
                    </span>
                    <h3 className="font-['Montserrat'] text-base text-white font-bold uppercase group-hover:text-[#ba9563] transition-colors leading-snug mb-2">
                      {relProject.name}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-[#ba9563]/20 flex items-center justify-between mt-4">
                    <span className="font-['Space_Grotesk'] text-xs text-slate-400">
                      {relProject.location}
                    </span>
                    <span className="font-['Space_Grotesk'] text-xs uppercase tracking-wider text-[#ba9563] font-bold inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
