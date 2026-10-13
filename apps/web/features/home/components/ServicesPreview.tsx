'use client'

import Link from 'next/link'
import {
  Building2,
  Zap,
  Wind,
  Flame,
  Droplets,
  HardHat,
  ClipboardCheck,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { HOME_SERVICES } from '../data/home.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, EASE } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5 text-[#ba9563]" />,
  Zap: <Zap className="w-5 h-5 text-[#ba9563]" />,
  Wind: <Wind className="w-5 h-5 text-[#ba9563]" />,
  Flame: <Flame className="w-5 h-5 text-[#ba9563]" />,
  Droplets: <Droplets className="w-5 h-5 text-[#ba9563]" />,
  HardHat: <HardHat className="w-5 h-5 text-[#ba9563]" />,
  ClipboardCheck: <ClipboardCheck className="w-5 h-5 text-[#ba9563]" />,
  Layers: <Layers className="w-5 h-5 text-[#ba9563]" />,
}

const SERVICE_DESCRIPTIONS_AR: Record<string, string> = {
  'civil-works-finishing':
    'تنفيذ الهياكل الخرسانية المسلحة، الأسقف مسبقة الإجهاد، الواجهات المعمارية الفاخرة، والتشطيبات الداخلية التجارية بأعلى معايير الإتقان.',
  'electrical-works':
    'محطات وشبكات التوزيع للجهد المتوسط والمنخفض، أنظمة التحكم الآلي وإدارة المباني SCADA، والبنية التحتية الكهربائية الذكية.',
  'air-conditioning':
    'أنظمة التبريد المركزي ومحطات التكييف، وحدات VRF المتطورة، وتصميم وتنفيذ شبكات مجاري الهواء المخصصة للمشاريع الكبرى.',
  'fire-fighting':
    'شبكات إطفاء متوافقة مع كود الدفاع المدني وNFPA، أنظمة الغمر والإخماد بالغاز FM-200، ومضخات الضغط العالي مع شبكات إنذار مبكر.',
  'sanitary-works':
    'شبكات المياه والصرف الصحي البلدية المتكاملة، محطات المعالجة وتصريف مياه السيول، والشبكات الهيدروليكية الداخلية للمباني.',
  'construction':
    'البنية التحتية الثقيلة، الأعمال الترابية، شبكات الطرق والجسور، وتجهيز وتطوير المواقع الإنشائية الكبرى وفق المعايير العالمية.',
  'project-management':
    'إدارة المشاريع المتكاملة بنظام EPC، الجدولة الزمنية بـ Primavera P6، الهندسة القيمة، وإدارة الجودة وضبط السلامة الموقعية.',
  'property-development':
    'اختيار واستحواذ الأراضي الاستراتيجية، دراسات الجدوى الاقتصادية، التطوير الإنشائي المتكامل، وتسليم الأصول الاستثمارية الجاهزة.',
}

/** Service card — individual animated item */
const serviceCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE.architectural },
  },
}

export function ServicesPreview() {
  const { locale } = useLanguage()

  const marker =
    locale === 'ar'
      ? 'التخصصات الهندسية // المواصفات الفنية 01 – 08'
      : 'ENGINEERING DISCIPLINES // SPECS 01 – 08'

  const heading =
    locale === 'ar'
      ? 'خدماتنا وقدراتنا الهندسية'
      : 'OUR CAPABILITIES & SERVICES'

  const subHeading =
    locale === 'ar'
      ? 'حلول المقاولات العامة المتكاملة، الهندسة متعددة التخصصات، وإنجاز المشاريع بتسليم المفتاح'
      : 'Comprehensive turnkey contracting, multidisciplinary engineering, and facility delivery'

  const narrative =
    locale === 'ar'
      ? 'يعمل كل قطاع في دار المشرق تحت مظلة أنظمة إدارة دولية صارمة، بكوادر هندسية متخصصة ومعدات ثقيلة مع دمج نمذجة معلومات البناء BIM.'
      : 'Every division operates under rigorous international management systems, utilizing specialized engineering personnel, heavy machinery, and BIM integration.'

  const ctaBtn =
    locale === 'ar'
      ? 'استعرض كافة المواصفات الهندسية التفصيلية'
      : 'View All Detailed Engineering Specifications'

  return (
    <section
      className="relative bg-white dark:bg-[#0b1a37] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300"
      id="capabilities"
    >
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Section Marker */}
        <RevealOnScroll>
          <div className="flex items-center gap-4 mb-4">
            <span className="w-3 h-3 bg-[#ba9563] shrink-0" />
            <span className="font-arabic text-xs uppercase tracking-wider text-[#ba9563] font-bold">
              {marker}
            </span>
            <div className="flex-grow h-[1px] bg-[#ba9563]/30" />
          </div>
        </RevealOnScroll>

        {/* Section Title */}
        <RevealOnScroll delay={0.1}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
            <div>
              <h2 className="font-arabic text-2xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold tracking-tight leading-snug">
                {heading}
              </h2>
              <p className="font-arabic text-sm text-slate-600 dark:text-[#c4c6d2] mt-2 font-medium">
                {subHeading}
              </p>
            </div>
            <p className="font-arabic text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] max-w-lg mt-4 lg:mt-0 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#ba9563]/50 pl-6 rtl:pl-0 rtl:pr-6 font-normal leading-relaxed">
              {narrative}
            </p>
          </div>
        </RevealOnScroll>

        {/* 8-Card Welded Blueprint Matrix */}
        <RevealChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l rtl:border-l-0 rtl:border-r border-slate-200 dark:border-[#ba9563]/30 relative bg-slate-50/50 dark:bg-[#0f2244]/40 shadow-sm"
          staggerDelay={0.08}
        >
          <BlueprintCrosshair position="top-left" />
          <BlueprintCrosshair position="top-right" />
          <BlueprintCrosshair position="bottom-left" />
          <BlueprintCrosshair position="bottom-right" />

          {HOME_SERVICES.map((service) => {
            const title = locale === 'ar' ? (service.titleAr || service.title) : service.title
            const description = locale === 'ar' ? (SERVICE_DESCRIPTIONS_AR[service.id] || service.description) : service.description

            return (
              <motion.div
                key={service.id}
                className="p-8 border-r rtl:border-r-0 rtl:border-l border-b border-slate-200 dark:border-[#ba9563]/30 relative group bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-[#162a4d]/80 transition-all duration-300 flex flex-col justify-between cursor-default"
                variants={serviceCardVariants}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-['Space_Grotesk'] text-lg text-[#ba9563] font-bold">
                      {service.number}.
                    </span>
                    <div className="p-2 border border-slate-200 dark:border-[#ba9563]/30 bg-slate-50 dark:bg-[#0b1a37] group-hover:border-[#ba9563] transition-colors duration-300">
                      {iconMap[service.iconName] ?? <Building2 className="w-5 h-5 text-[#ba9563]" />}
                    </div>
                  </div>

                  {/* Gold accent line that expands on hover */}
                  <div className="h-[1px] bg-[#ba9563] mb-4 transition-all duration-500 w-0 group-hover:w-full origin-left rtl:origin-right" />

                  <h3 className="font-arabic text-base sm:text-lg text-slate-900 dark:text-white font-bold mb-3 group-hover:text-[#ba9563] transition-colors duration-300 uppercase leading-snug">
                    {title}
                  </h3>

                  <p className="font-arabic text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] leading-relaxed mb-6 font-normal">
                    {description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-[#434651]/40 flex items-center justify-between text-[#ba9563]">
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.15em] font-semibold">
                    {service.specCode}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform duration-200 opacity-60 group-hover:opacity-100" />
                </div>
              </motion.div>
            )
          })}
        </RevealChildren>

        {/* Action Button */}
        <RevealOnScroll className="mt-12 text-center" delay={0.15} variants={fadeUpVariants}>
          <Link
            href="/services"
            className="inline-flex items-center gap-3 border border-[#ba9563]/70 bg-white dark:bg-[#0f2244] px-8 py-4 font-arabic text-xs sm:text-sm uppercase tracking-wider text-[#ba9563] hover:bg-[#ba9563] hover:text-[#0b1a37] font-bold transition-all duration-300 shadow-md group"
          >
            <span>{ctaBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform duration-200 shrink-0" />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  )
}
