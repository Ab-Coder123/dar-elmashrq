'use client'

import { motion } from 'framer-motion'
import { INTEGRATED_DISCIPLINES } from '../data/services.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'
import { ArrowRight, ArrowLeft, Layers } from 'lucide-react'
import { useLanguage } from '@/providers/LanguageProvider'

export function IntegratedExecution() {
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
                  {isAr ? '03 // قدرات تنفيذية شاملة' : '03 // END-TO-END CAPABILITY'}
                </span>
              </div>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                {isAr ? 'دورة التنفيذ الإنشائي المتكاملة' : 'INTEGRATED LIFECYCLE EXECUTION'}
              </h2>
            </div>
            <div className={`mt-4 md:mt-0 ${isAr ? 'text-right md:text-left' : 'text-left md:text-right'}`}>
              <span className={`text-xl sm:text-2xl text-[#ba9563] font-bold block ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                {isAr ? 'تصميم • بناء • إدارة • تطوير' : 'DESIGN • BUILD • MANAGE • DEVELOP'}
              </span>
              <span className={`text-xs text-slate-500 dark:text-slate-400 tracking-widest uppercase ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                {isAr ? 'بيئة بناء هندسية متزامنة ومتوافقة' : 'Synchronized Built Environment'}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 4-Step Architectural Sequential Flow */}
        <RevealChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative" staggerDelay={0.1}>
          {INTEGRATED_DISCIPLINES.map((discipline, idx) => {
            const isLast = idx === INTEGRATED_DISCIPLINES.length - 1
            const dTitle = isAr && discipline.titleAr ? discipline.titleAr : discipline.title
            const dSubtitle = isAr && discipline.subtitleAr ? discipline.subtitleAr : discipline.subtitle
            const dDesc = isAr && discipline.descriptionAr ? discipline.descriptionAr : discipline.description
            const dDeliverables = isAr && discipline.deliverablesAr ? discipline.deliverablesAr : discipline.deliverables

            return (
              <motion.div
                key={discipline.step}
                className="p-8 bg-slate-50 dark:bg-[#0f2244]/80 border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 relative flex flex-col justify-between group shadow-sm"
                variants={fadeUpVariants}
              >
                <BlueprintCrosshair position={isAr ? 'top-left' : 'top-right'} />
                
                <div>
                  {/* Step & Arrow */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-[#434651]/50">
                    <span className="font-['Montserrat'] text-3xl font-black text-[#123c82] dark:text-[#ba9563]">
                      {discipline.step}
                    </span>
                    {!isLast && (
                      isAr ? (
                        <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#ba9563] group-hover:-translate-x-1 transition-all" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#ba9563] group-hover:translate-x-1 transition-all" />
                      )
                    )}
                    {isLast && (
                      <Layers className="w-4 h-4 text-[#ba9563]" />
                    )}
                  </div>

                  <span className={`text-[10px] text-[#ba9563] uppercase tracking-wider font-semibold block mb-1 ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                    {dSubtitle}
                  </span>

                  <h3 className={`text-xl font-extrabold uppercase text-slate-900 dark:text-white mb-4 ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                    {dTitle}
                  </h3>

                  <p className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 ${isAr ? 'font-arabic tracking-normal' : "font-['Inter']"}`}>
                    {dDesc}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-4 border-t border-slate-200 dark:border-[#434651]/40 space-y-1.5">
                  <span className={`text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1 ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                    {isAr ? 'المخرجات الأساسية:' : 'Core Deliverables:'}
                  </span>
                  {dDeliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 bg-[#ba9563] shrink-0" />
                      <span className={isAr ? 'font-arabic tracking-normal' : ''}>{del}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </RevealChildren>
      </div>
    </section>
  )
}
