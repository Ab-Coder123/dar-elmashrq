'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Building, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Project, Country } from '@dar-elmashrq/types'
import { PROJECT_CATEGORIES } from '@dar-elmashrq/types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

interface FeaturedProjectsProps {
  initialProjects: Project[]
}

// Curated ultra high-fidelity architectural photography mapped to projects
const PROJECT_IMAGE_FALLBACKS: Record<string, string> = {
  'beverly-al-azeeza-new-facade':
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
  'way-care-medical-hospital':
    'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=85',
  'awlad-ragab-supermarket-chain-21-branches':
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=85',
  'qasr-al-husseini-residential-towers':
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
  'al-shorouk-housing-complex-30-towers':
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  'villa-al-mishaf-qatar':
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
  'western-water-pump-station-ras-tanura':
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85',
  default:
    'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85',
}

export function FeaturedProjects({ initialProjects }: FeaturedProjectsProps) {
  const { locale } = useLanguage()
  const [selectedCountry, setSelectedCountry] = useState<Country | 'all'>('all')

  const filterTabs: Array<{ id: Country | 'all'; label: string }> = [
    { id: 'all', label: locale === 'ar' ? 'جميع المناطق' : 'ALL REGIONS' },
    { id: 'saudi-arabia', label: locale === 'ar' ? 'المملكة العربية السعودية' : 'SAUDI ARABIA' },
    { id: 'egypt', label: locale === 'ar' ? 'جمهورية مصر العربية' : 'EGYPT' },
    { id: 'qatar', label: locale === 'ar' ? 'دولة قطر' : 'QATAR' },
  ]

  const sectionSub =
    locale === 'ar'
      ? 'القسم 02 // المحفظة الإنشائية والمعمارية'
      : 'Section 02 // Structural Portfolio'

  const sectionTitle =
    locale === 'ar'
      ? 'مختارات من مشاريعنا البارزة'
      : 'SELECTED PROJECTS'

  const sectionDesc =
    locale === 'ar'
      ? 'أبرز الإنجازات الإنشائية والمعالم المعمارية الكبرى المنفذة بدقة وإتقان عبر مسيرة دار المشرق'
      : 'Curated benchmark developments and contracting milestones delivered by Dar El Mashrq'

  const dossierBtn = locale === 'ar' ? 'عرض الملف الفني' : 'View Dossier'
  const allProjectsBtn =
    locale === 'ar'
      ? 'استعرض أرشيف المشاريع الكامل في الخليج ومصر'
      : 'Explore Complete Project Archive Across GCC & Egypt'

  const filtered =
    selectedCountry === 'all'
      ? initialProjects.filter((p) => p.isFeatured).slice(0, 4)
      : initialProjects.filter((p) => p.country === selectedCountry).slice(0, 4)

  return (
    <section className="relative bg-slate-50 dark:bg-[#0b1a37] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300" id="projects">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Section Title & Datum Filter Line */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4">
            <div>
              <span className="font-arabic text-xs uppercase tracking-wider text-[#ba9563] block mb-2 font-bold">
                {sectionSub}
              </span>
              <h2 className="font-arabic text-2xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold tracking-tight leading-snug">
                {sectionTitle}
              </h2>
              <p className="font-arabic text-sm text-slate-600 dark:text-[#c4c6d2] mt-2 font-medium">
                {sectionDesc}
              </p>
            </div>

            {/* Datum Architectural Filter Line */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-6 md:mt-0 border-b border-slate-300 dark:border-[#434651]/40 pb-2">
              {filterTabs.map((tab) => {
                const isActive = selectedCountry === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCountry(tab.id)}
                    className={`font-arabic text-xs uppercase tracking-wider transition-all duration-200 pb-2 -mb-[10px] cursor-pointer ${
                      isActive
                        ? 'text-[#ba9563] border-b-2 border-[#ba9563] font-bold'
                        : 'text-slate-600 dark:text-[#c4c6d2] hover:text-[#ba9563] font-medium'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </RevealOnScroll>

        {/* Welded Separator Bar */}
        <div className="h-[1px] w-full bg-[#ba9563]/30 mb-12 relative flex items-center justify-between">
          <BlueprintCrosshair position="top-left" className="-left-2 -top-2" />
          <BlueprintCrosshair position="top-right" className="-right-2 -top-2" />
        </div>

        {/* Projects Grid with staggered reveals */}
        <RevealChildren
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          staggerDelay={0.12}
        >
          {filtered.map((project) => {
            const imageUrl: string =
              project.images?.[0]?.url ??
              PROJECT_IMAGE_FALLBACKS[project.slug] ??
              PROJECT_IMAGE_FALLBACKS['default'] ??
              'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85'

            const title = locale === 'ar' ? (project.nameAr || project.name) : project.name
            const description = locale === 'ar' ? (project.descriptionAr || project.description) : project.description
            const location = locale === 'ar' ? (project.locationAr || project.location) : project.location
            const categoryLabel = locale === 'ar' ? (PROJECT_CATEGORIES[project.category]?.labelAr || project.category) : project.category

            return (
              <motion.div
                key={project.id}
                className="group relative border border-slate-200 dark:border-[#ba9563]/30 bg-white dark:bg-[#0f2244] overflow-hidden flex flex-col justify-between hover:border-[#ba9563] transition-all duration-300 shadow-md hover:shadow-xl"
                variants={fadeUpVariants}
              >
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                {/* Project Image Frame */}
                <div className="relative h-72 sm:h-84 md:h-96 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0f2244] via-transparent to-transparent" />
                  {/* Gold overlay on hover */}
                  <div className="absolute inset-0 bg-[#ba9563]/0 group-hover:bg-[#ba9563]/10 transition-colors duration-500" />

                  {/* Location Badge */}
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-white/95 dark:bg-[#0b1a37]/90 px-3 py-1.5 border border-[#ba9563]/40 font-arabic text-[11px] uppercase tracking-wider text-[#ba9563] flex items-center space-x-1.5 rtl:space-x-reverse backdrop-blur-sm shadow-sm font-bold">
                    <MapPin className="w-3 h-3 text-[#ba9563] shrink-0" />
                    <span>{location}</span>
                  </div>

                  {/* Category / Status */}
                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-white/95 dark:bg-[#0b1a37]/90 px-3 py-1.5 font-arabic text-[11px] uppercase tracking-wider text-slate-800 dark:text-[#c4c6d2] border border-slate-200 dark:border-[#434651]/40 backdrop-blur-sm font-semibold">
                    {categoryLabel}
                  </div>

                  {/* Project title overlay on hover — slides up */}
                  <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[0.25,0.46,0.45,0.94]">
                    <div className="h-[1px] bg-[#ba9563] w-0 group-hover:w-full transition-all duration-500 delay-100 mb-2" />
                  </div>
                </div>

                {/* Project Metadata Body */}
                <div className="p-6 sm:p-8 border-t border-slate-200 dark:border-[#ba9563]/20 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="font-arabic text-[11px] uppercase tracking-wider text-[#ba9563] block mb-2 font-bold">
                      {project.services.slice(0, 2).join(' • ') || (locale === 'ar' ? 'أعمال مدنية وكهروميكانيكية' : 'CIVIL & MEP WORKS')}
                    </span>

                    <h3 className="font-arabic text-lg sm:text-xl text-slate-950 dark:text-white font-extrabold mb-3 group-hover:text-[#ba9563] transition-colors duration-300 uppercase leading-snug">
                      {title}
                    </h3>

                    <p className="font-arabic text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] mb-6 line-clamp-2 leading-relaxed font-normal">
                      {description ||
                        (locale === 'ar'
                          ? 'تنفيذ إنشائي وهندسي متكامل، أعمال خرسانية وتشطيبات عالية الجودة.'
                          : 'Full-scale civil engineering, structural execution, and high-tolerance finishing.')}
                    </p>
                  </div>

                  {/* Bottom Dossier Action */}
                  <div className="flex items-center justify-between border-t border-slate-200 dark:border-[#434651]/40 pt-4 mt-auto">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-arabic text-slate-500 dark:text-[#8e909c] uppercase font-semibold">
                      {project.year ? (
                        <>
                          <Calendar className="w-3.5 h-3.5 text-[#ba9563] shrink-0" />
                          <span>{locale === 'ar' ? `عام ${project.year}` : `YEAR ${project.year}`}</span>
                        </>
                      ) : (
                        <>
                          <Building className="w-3.5 h-3.5 text-[#ba9563] shrink-0" />
                          <span className="uppercase">{project.country.replace('-', ' ')}</span>
                        </>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="font-arabic text-xs sm:text-sm uppercase tracking-wider text-[#ba9563] hover:text-[#123c82] dark:hover:text-white inline-flex items-center space-x-1.5 rtl:space-x-reverse transition-all font-bold group/link"
                    >
                      <span>{dossierBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 rtl:rotate-180 transition-transform duration-200 shrink-0" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </RevealChildren>

        {/* Link to all projects */}
        <RevealOnScroll className="mt-14 text-center" variants={fadeUpVariants} delay={0.1}>
          <Link
            href="/projects"
            className="inline-flex items-center space-x-3 rtl:space-x-reverse border border-[#ba9563]/70 bg-white dark:bg-[#0f2244] px-8 py-4 font-arabic text-xs sm:text-sm uppercase tracking-wider text-[#ba9563] hover:bg-[#ba9563] hover:text-[#0b1a37] font-bold transition-all duration-300 shadow-md group"
          >
            <span>{allProjectsBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform duration-200 shrink-0" />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  )
}
