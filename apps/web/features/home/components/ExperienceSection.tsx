'use client'

import { motion } from 'framer-motion'
import { HOME_STATS } from '../data/home.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import type { Variants } from 'framer-motion'
import { scaleInVariants, EASE, DURATIONS } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'
import type { HomeStat } from '../types'

const statVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE.architectural },
  },
}

export interface ExperienceSectionProps {
  stats?: HomeStat[]
}

const STAT_DESCRIPTIONS_AR: Record<string, string> = {
  '1994': 'أكثر من 30 عاماً من العمل المتواصل في المقاولات العامة والإنشاءات الهندسية الدقيقة.',
  '3': 'مكاتب وفروع تشغيلية مرخصة ومعتمدة رسمياً في السعودية ومصر وقطر.',
  '30+': 'عقود متتالية من تنفيذ المشاريع التجارية والمؤسسية والبنية التحتية الاستراتيجية.',
  '100+': 'سجل عريض من المشاريع المنفذة وفق معايير تسليم المفتاح للقطاعين الحكومي والخاص.',
}

export function ExperienceSection({ stats = HOME_STATS }: ExperienceSectionProps = {}) {
  const { locale } = useLanguage()
  const displayStats = Array.isArray(stats) && stats.length > 0 ? stats : HOME_STATS

  const sectionSub =
    locale === 'ar'
      ? 'المؤشرات // بيانات الأداء المؤسسي وسجل الإنجاز'
      : 'METRICS // SOVEREIGN PERFORMANCE DATA'

  return (
    <section className="relative bg-slate-50 dark:bg-[#0f2244] py-16 md:py-24 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-3 h-3 bg-[#ba9563] shrink-0" />
            <span className="font-arabic text-xs uppercase tracking-wider text-[#ba9563] font-bold">
              {sectionSub}
            </span>
            <div className="flex-grow h-[1px] bg-[#ba9563]/30" />
          </div>
        </RevealOnScroll>

        {/* 4-Card Welded Architectural Metric Matrix */}
        <RevealChildren
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#ba9563]/30 relative bg-white dark:bg-[#0b1a37]/50 shadow-md"
          staggerDelay={0.1}
        >
          <BlueprintCrosshair position="top-left" />
          <BlueprintCrosshair position="top-right" />
          <BlueprintCrosshair position="bottom-left" />
          <BlueprintCrosshair position="bottom-right" />

          {displayStats.map((stat, idx) => {
            const isLast = idx === displayStats.length - 1
            const label = locale === 'ar' ? (stat.labelAr || stat.label) : stat.label
            const desc = locale === 'ar' ? (STAT_DESCRIPTIONS_AR[stat.value] || stat.description) : stat.description

            return (
              <motion.div
                key={stat.label}
                className={`p-8 sm:p-10 border-b lg:border-b-0 ${
                  !isLast ? 'sm:border-r rtl:sm:border-r-0 rtl:sm:border-l' : ''
                } border-slate-200 dark:border-[#ba9563]/20 relative group hover:bg-slate-50 dark:hover:bg-[#162a4d]/60 transition-colors duration-300`}
                variants={statVariants}
              >
                <span className="font-arabic text-xs uppercase tracking-wider text-[#ba9563] block mb-3 font-bold">
                  {label}
                </span>

                {/* Large stat number — scale in */}
                <motion.div
                  className="font-['Montserrat'] text-4xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-white font-extrabold mb-3 tracking-tight"
                  variants={scaleInVariants}
                >
                  {stat.value}
                </motion.div>

                {/* Gold accent line that expands on group hover */}
                <div className="w-12 h-[2px] bg-[#ba9563] mb-4 group-hover:w-20 transition-all duration-400" />

                <p className="font-arabic text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] leading-relaxed font-normal">
                  {desc}
                </p>
              </motion.div>
            )
          })}
        </RevealChildren>
      </div>
    </section>
  )
}
