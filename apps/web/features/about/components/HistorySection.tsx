'use client'

import { motion } from 'framer-motion'
import { ABOUT_HISTORY } from '../data/about.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { Calendar, CheckCircle2 } from 'lucide-react'
import { RevealOnScroll, RevealChildren, RevealLine } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

export function HistorySection() {
  const { locale, isRtl } = useLanguage()

  return (
    <section className="py-24 bg-slate-100/70 dark:bg-[#09182f] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-300 dark:border-[#434651]/50">
            <div>
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-[#ba9563] text-xs uppercase tracking-[0.25em] font-arabic font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>{locale === 'ar' ? '02 // ثلاثة عقود من الإرث الهندسي' : '02 // THREE DECADES OF HERITAGE'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-arabic">
                {locale === 'ar' ? 'المحطات التاريخية للشركة' : 'COMPANY TIMELINE'}
              </h2>
            </div>
            <div className={`mt-4 md:mt-0 ${isRtl ? 'md:text-left text-right' : 'text-left md:text-right'}`}>
              <motion.span
                className="font-arabic text-xl sm:text-3xl text-[#ba9563] font-black block tracking-tight"
                variants={scaleInVariants}
              >
                {locale === 'ar' ? '1994 — حتى اليوم' : '1994 — PRESENT DAY'}
              </motion.span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-arabic tracking-widest uppercase">
                {locale === 'ar' ? 'سجل حافل بالتميز والتنفيذ' : 'Proven Project Execution'}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Progressive Timeline Datum Line */}
        <div className="mb-8">
          <RevealLine className="w-full bg-[#ba9563]/40" delay={0.2} />
        </div>

        {/* Timeline Grid */}
        <RevealChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative" staggerDelay={0.12}>
          {ABOUT_HISTORY.map((item, idx) => {
            const title = locale === 'ar' && item.titleAr ? item.titleAr : item.title
            const badge = locale === 'ar' && item.badgeAr ? item.badgeAr : item.badge
            const description = locale === 'ar' && item.descriptionAr ? item.descriptionAr : item.description
            const details = locale === 'ar' && item.detailsAr ? item.detailsAr : item.details

            return (
              <motion.div
                key={idx}
                className="relative flex flex-col justify-between p-8 bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 shadow-md group"
                variants={fadeUpVariants}
              >
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                <div>
                  {/* Year & Badge */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-[#434651]/40">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Calendar className="w-4 h-4 text-[#ba9563]" />
                      <span className="font-arabic text-2xl sm:text-3xl font-black text-[#123c82] dark:text-[#ba9563] tracking-tight">
                        {item.year === 'TODAY' && locale === 'ar' ? 'اليوم' : item.year}
                      </span>
                    </div>
                    <span className="font-arabic text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-[#0f2244] px-2.5 py-1 border border-slate-200 dark:border-[#434651]/50 font-bold">
                      {locale === 'ar' ? `المرحلة 0${idx + 1}` : `PHASE 0${idx + 1}`}
                    </span>
                  </div>

                  {/* Badge line */}
                  <div className="font-arabic text-xs font-bold text-[#ba9563] uppercase tracking-wider mb-2">
                    {badge}
                  </div>

                  {/* Title */}
                  <h3 className="font-arabic font-extrabold text-lg text-slate-900 dark:text-white uppercase mb-4 leading-snug">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="font-arabic text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                    {description}
                  </p>
                </div>

                {/* Bullet Details */}
                {details && details.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 dark:border-[#434651]/40 space-y-2">
                    {details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start space-x-2 rtl:space-x-reverse">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ba9563] shrink-0 mt-0.5" />
                        <span className="text-[11px] font-arabic text-slate-600 dark:text-slate-400 leading-tight">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </RevealChildren>
      </div>
    </section>
  )
}
