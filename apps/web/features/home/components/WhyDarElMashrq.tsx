'use client'

import { Shield, Cpu, Award, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

import type { WhyPillar } from '../types'
import { WHY_PILLARS } from '../data/home.data'

const iconMap: Record<string, typeof Cpu> = {
  Cpu,
  Zap,
  Shield,
  Award,
}

const WHY_PILLARS_AR: Record<string, { code: string; title: string; desc: string }> = {
  'PROTOCOL // 01': {
    code: 'البروتوكول // 01',
    title: 'الدقة الهندسية ونمذجة البناء BIM',
    desc: 'دمج تقنيات نمذجة معلومات البناء BIM وأنظمة CAD المتطورة لكشف التعارضات وضبط الكميات والمطابقة الإنشائية قبل بدء التنفيذ الميداني.',
  },
  'PROTOCOL // 02': {
    code: 'البروتوكول // 02',
    title: 'قدرة متكاملة وتسليم المفتاح',
    desc: 'تنفيذ ذاتي لجميع الأعمال المدنية والكهروميكانيكية والتكييف وإطفاء الحريق والتشطيبات الفاخرة، مما يمنع تأخير المقاولين ويضمن جهة مسؤولة واحدة.',
  },
  'PROTOCOL // 03': {
    code: 'البروتوكول // 03',
    title: 'معايير الجودة والسلامة الصارمة QA/QC',
    desc: 'بروتوكولات إدارة جودة متوافقة مع ISO واعتمادات رسمية من الدفاع المدني لضمان السلامة الإنشائية ومقاومة الحريق واستدامة الأصول.',
  },
  'PROTOCOL // 04': {
    code: 'البروتوكول // 04',
    title: 'إرث إقليمي عريق ممتد لـ 30 عاماً',
    desc: 'منذ عام 1994، شكلت تراخيصنا المتعددة وتواجدنا الإقليمي الركيزة لتنفيذ كبرى المشاريع للوزارات والجهات السيادية وكبار المطورين العقاريين.',
  },
}

export interface WhyDarElMashrqProps {
  pillars?: WhyPillar[]
}

export function WhyDarElMashrq({ pillars = WHY_PILLARS }: WhyDarElMashrqProps = {}) {
  const { locale } = useLanguage()
  const displayPillars = Array.isArray(pillars) && pillars.length > 0 ? pillars : WHY_PILLARS

  const sectionSub =
    locale === 'ar'
      ? 'القسم 04 // المزايا التشغيلية والتنافسية'
      : 'Section 04 // Operational Distinctives'

  const sectionTitle =
    locale === 'ar'
      ? 'لماذا دار المشرق'
      : 'WHY DAR EL MASHRQ'

  const sectionTagline =
    locale === 'ar'
      ? 'المعايير الهندسية والمزايا الاستراتيجية التي نلتزم بها في كل مشروع'
      : 'Strategic advantages and engineering standards underpinning every contract'

  const sectionDesc =
    locale === 'ar'
      ? 'منهجية هندسية منضبطة تقوم على الشفافية التامة، المتانة الإنشائية، وثلاثة عقود متتالية من الوفاء بالعهود والتسليم في الموعد.'
      : 'A disciplined engineering methodology built on accountability, structural resilience, and three continuous decades of delivery.'

  return (
    <section className="relative bg-slate-50 dark:bg-[#0f2244] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-slate-200 dark:border-[#434651]/40 pb-8 relative">
            <BlueprintCrosshair position="top-left" />
            <div>
              <span className="font-arabic text-xs uppercase tracking-wider text-[#ba9563] block mb-2 font-bold">
                {sectionSub}
              </span>
              <h2 className="font-arabic text-2xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold tracking-tight leading-snug">
                {sectionTitle}
              </h2>
              <p className="font-arabic text-sm text-slate-600 dark:text-[#c4c6d2] mt-2 font-medium">
                {sectionTagline}
              </p>
            </div>
            <p className="font-arabic text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] max-w-md mt-4 md:mt-0 font-normal leading-relaxed">
              {sectionDesc}
            </p>
          </div>
        </RevealOnScroll>

        {/* 4 Pillars Grid */}
        <RevealChildren className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.1}>
          {displayPillars.map((pillar) => {
            const IconComponent = iconMap[pillar.iconName] || Cpu
            const arInfo = WHY_PILLARS_AR[pillar.code]
            const code = locale === 'ar' && arInfo ? arInfo.code : pillar.code
            const title = locale === 'ar' && arInfo ? arInfo.title : pillar.title
            const description = locale === 'ar' && arInfo ? arInfo.desc : pillar.description

            return (
              <motion.div
                key={pillar.title}
                className="p-8 sm:p-10 border border-slate-200 dark:border-[#ba9563]/30 bg-white dark:bg-[#0b1a37] relative group hover:border-[#ba9563] transition-all duration-300 shadow-md hover:shadow-xl"
                variants={fadeUpVariants}
              >
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 border border-slate-200 dark:border-[#ba9563]/40 bg-slate-50 dark:bg-[#0f2244] text-[#ba9563] group-hover:bg-[#ba9563] group-hover:text-[#0b1a37] transition-colors duration-200">
                    <IconComponent className="w-6 h-6 text-current" />
                  </div>
                  <span className="font-arabic text-[11px] uppercase tracking-wider text-[#ba9563] font-bold">
                    {code}
                  </span>
                </div>

                <h3 className="font-arabic text-lg sm:text-xl text-slate-950 dark:text-white font-extrabold mb-4 uppercase group-hover:text-[#ba9563] transition-colors duration-200 leading-snug">
                  {title}
                </h3>

                <p className="font-arabic text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] leading-relaxed font-normal">
                  {description}
                </p>
              </motion.div>
            )
          })}
        </RevealChildren>
      </div>
    </section>
  )
}
