'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, MapPin, ArrowUpRight, ArrowUpLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ServiceProjectRelation } from '../types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

interface ServiceProjectShowcaseProps {
  showcases: ServiceProjectRelation[]
}

export function ServiceProjectShowcase({ showcases }: ServiceProjectShowcaseProps) {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  return (
    <section className="py-24 bg-white dark:bg-[#0b1a37] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200 dark:border-[#434651]/50 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span className={isAr ? 'font-arabic tracking-normal' : ''}>
                  {isAr ? '05 // خدماتنا في الميدان' : '05 // SERVICES IN PRACTICE'}
                </span>
              </div>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                {isAr ? 'مشاريعنا على أرض الواقع' : 'OUR WORK IN CONTEXT'}
              </h2>
            </div>
            <div className={`mt-4 md:mt-0 ${isAr ? 'text-right md:text-left' : 'text-left md:text-right'}`}>
              <span className={`text-xl sm:text-2xl text-[#ba9563] font-bold block ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                {isAr ? 'شواهد إنجاز واقعية' : 'DELIVERED BENCHMARKS'}
              </span>
              <span className={`text-xs text-slate-500 dark:text-slate-400 tracking-widest uppercase ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                {isAr ? 'المملكة العربية السعودية • مصر • قطر' : 'Saudi Arabia • Egypt • Qatar'}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Projects Grid */}
        <RevealChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" staggerDelay={0.1}>
          {showcases.map((project) => {
            const pName = isAr && project.projectNameAr ? project.projectNameAr : project.projectName
            const pCategory = isAr && project.categoryAr ? project.categoryAr : project.category
            const pLocation = isAr && project.locationAr ? project.locationAr : project.location

            return (
              <motion.div
                key={project.projectSlug}
                className="group bg-slate-50 dark:bg-[#0f2244] border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
                variants={fadeUpVariants}
              >
                <BlueprintCrosshair position={isAr ? 'top-right' : 'top-left'} />
                <BlueprintCrosshair position={isAr ? 'bottom-left' : 'bottom-right'} />

                <div>
                  {/* Project Image Frame */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={project.image}
                      alt={pName}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Category badge */}
                    <span className={`absolute top-3 ${isAr ? 'left-3' : 'right-3'} text-[9px] uppercase tracking-wider bg-slate-900/90 text-slate-300 px-2.5 py-1 border border-slate-700 ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                      {pCategory}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className={`flex items-center gap-1.5 text-xs text-[#ba9563] mb-2 font-semibold ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{pLocation}</span>
                    </div>

                    <h3 className={`font-bold text-base text-slate-900 dark:text-white uppercase line-clamp-2 mb-2 group-hover:text-[#ba9563] transition-colors ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                      {pName}
                    </h3>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-auto">
                  <Link
                    href={`/projects/${project.projectSlug}`}
                    className={`inline-flex items-center justify-between w-full pt-3 border-t border-slate-200 dark:border-[#434651]/40 text-xs text-[#123c82] dark:text-[#ba9563] uppercase font-bold tracking-wider hover:underline ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}
                  >
                    <span>{isAr ? 'عرض ملف المشروع' : 'View Project Dossier'}</span>
                    {isAr ? <ArrowUpLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </RevealChildren>

        {/* Explore All Projects CTA */}
        <RevealOnScroll delay={0.2} className="text-center">
          <Link
            href="/projects"
            className={`inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-[#0f2244] border border-[#ba9563] text-xs uppercase tracking-widest text-[#ba9563] hover:bg-[#ba9563] hover:text-[#0b1a37] font-bold transition-all shadow-md group ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}
          >
            <span>{isAr ? 'استكشف كافة المشاريع' : 'EXPLORE ALL PROJECTS'}</span>
            {isAr ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  )
}
