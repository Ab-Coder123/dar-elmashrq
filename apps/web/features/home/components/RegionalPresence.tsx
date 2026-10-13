'use client'

import { MapPin, Phone, Building, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { REGIONAL_HUBS } from '../data/home.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

const REGIONAL_HUB_AR: Record<string, { badge: string; desc: string; address: string; classif: string }> = {
  'saudi-arabia': {
    badge: 'المقر الرئيسي العام',
    desc: 'القيادة التشغيلية المركزية لإدارة المشاريع السيادية والإنشائية الكبرى في منطقة الرياض والمنطقة الشرقية والغربية.',
    address: 'حي العليا، الرياض، المملكة العربية السعودية',
    classif: 'تصنيف فئة أولى معتمد',
  },
  'egypt': {
    badge: 'مركز العمليات التاريخي',
    desc: 'القاعدة الهندسية الأولى للشركة وسجل حافل بأكثر من عقدين من المشاريع السكنية والتجارية وسلاسل الهايبر ماركت الكبرى.',
    address: 'القاهرة، جمهورية مصر العربية',
    classif: 'سجل مقاولات وطني معتمد',
  },
  'qatar': {
    badge: 'المكتب التشغيلي بالدوحة',
    desc: 'تنفيذ المجمعات السكنية الراقية، الفيلات الفاخرة، والمشاريع التجارية متعددة الاستخدامات في العاصمة القطرية.',
    address: 'الدوحة، دولة قطر',
    classif: 'رخصة مقاولات وتشييد',
  },
}

export function RegionalPresence() {
  const { locale } = useLanguage()

  const sectionSub =
    locale === 'ar'
      ? 'القسم 03 // الامتداد الجغرافي الإقليمي'
      : 'Section 03 // Geographic Sovereignty'

  const sectionTitle =
    locale === 'ar'
      ? 'التواجد الإقليمي'
      : 'REGIONAL PRESENCE'

  const hubsSummary =
    locale === 'ar'
      ? 'الرياض • القاهرة • الدوحة'
      : 'RIYADH • CAIRO • DOHA'

  return (
    <section className="relative bg-white dark:bg-[#0f2244] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300" id="presence">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Section Title & Coordinates Header */}
        <RevealOnScroll>
          <div className="mb-14">
            <span className="font-arabic text-xs uppercase tracking-wider text-[#ba9563] block mb-2 font-bold">
              {sectionSub}
            </span>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-slate-200 dark:border-[#434651]/40 pb-6">
              <h2 className="font-arabic text-2xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold tracking-tight leading-snug">
                {sectionTitle}
              </h2>
              <span className="font-arabic text-xs sm:text-sm text-[#ba9563] uppercase tracking-wider mt-2 md:mt-0 font-bold">
                {hubsSummary}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Welded Architectural Monoliths Connected Horizontally */}
        <RevealChildren className="grid grid-cols-1 lg:grid-cols-3 border border-slate-200 dark:border-[#ba9563]/30 relative bg-slate-50 dark:bg-[#0b1a37] shadow-md" staggerDelay={0.12}>
          <BlueprintCrosshair position="top-left" />
          <BlueprintCrosshair position="top-right" />
          <BlueprintCrosshair position="bottom-left" />
          <BlueprintCrosshair position="bottom-right" />

          {REGIONAL_HUBS.map((hub, idx) => {
            const isMiddle = idx === 1
            const arData = REGIONAL_HUB_AR[hub.country]
            const countryName = locale === 'ar' ? hub.countryNameAr : hub.countryName
            const badge = locale === 'ar' && arData ? arData.badge : hub.badge
            const desc = locale === 'ar' && arData ? arData.desc : hub.description
            const address = locale === 'ar' && arData ? arData.address : hub.address
            const classification = locale === 'ar' && arData ? arData.classif : hub.classification

            return (
              <motion.div
                key={hub.country}
                className={`p-8 sm:p-10 border-b lg:border-b-0 ${
                  isMiddle ? 'lg:border-x rtl:lg:border-x' : ''
                } border-slate-200 dark:border-[#ba9563]/30 relative flex flex-col justify-between group bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-[#162a4d]/70 transition-colors duration-200`}
                variants={fadeUpVariants}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-arabic text-[11px] uppercase tracking-wider text-[#ba9563] border border-[#ba9563]/40 px-3 py-1 bg-slate-50 dark:bg-[#0f2244] font-bold">
                      {badge}
                    </span>
                    <span className="font-['Space_Grotesk'] text-[10px] text-slate-500 dark:text-[#8e909c] font-mono" dir="ltr">
                      {hub.coordinates}
                    </span>
                  </div>

                  <h3 className="font-arabic text-xl sm:text-2xl text-slate-950 dark:text-white uppercase font-extrabold mb-3">
                    {countryName}
                  </h3>

                  <p className="font-arabic text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] leading-relaxed mb-6 font-normal">
                    {desc}
                  </p>

                  <div className="space-y-3 font-arabic text-xs text-slate-600 dark:text-[#c4c6d2] border-t border-slate-200 dark:border-[#434651]/40 pt-4 font-medium">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#ba9563] shrink-0 mt-0.5" />
                      <span>{address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#ba9563] shrink-0" />
                      <span className="font-['Space_Grotesk'] text-[#ba9563] font-semibold" dir="ltr">{hub.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-[#ba9563]/20 flex items-center justify-between text-[#ba9563]">
                  <span className="font-arabic text-[11px] uppercase tracking-wider font-bold">
                    {classification}
                  </span>
                  {idx === 0 && <Building className="w-4 h-4" />}
                  {idx === 1 && <Globe className="w-4 h-4" />}
                  {idx === 2 && <Building className="w-4 h-4" />}
                </div>
              </motion.div>
            )
          })}
        </RevealChildren>
      </div>
    </section>
  )
}
