'use client'

import Link from 'next/link'
import Image from 'next/image'
import { HardHat, ArrowRight, ChevronRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { heroStaggerVariants, fadeUpVariants, slideInLeftVariants, DURATIONS, EASE } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

interface ServicesHeroProps {
  heroImage: string
}

export function ServicesHero({ heroImage }: ServicesHeroProps) {
  const prefersReduced = useReducedMotion()
  const { locale, isRtl } = useLanguage()

  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center pt-28 pb-20 overflow-hidden border-b border-slate-200 dark:border-[#434651]/60 transition-colors duration-300">
      {/* Background Image with Deep Navy Atmospheric Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={prefersReduced ? false : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: DURATIONS.INTRO, ease: EASE.cinematic }}
        >
          <Image
            src={heroImage}
            alt={locale === 'ar' ? 'خدمات دار المشرق الهندسية والمقاولات' : 'Dar El Mashrq Engineering & Multidisciplinary Construction'}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        {/* Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-[#123c82]/50 dark:from-[#0b1a37] dark:via-[#0f2244]/90 dark:to-[#123c82]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,14,38,0.7)_100%)]" />
      </div>

      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20" aria-hidden="true">
        <div className="w-full max-w-[1440px] mx-auto border-x border-[#ba9563]/40 grid grid-cols-4 md:grid-cols-12 h-full">
          <div className="border-r border-[#ba9563]/20 h-full col-span-1" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-2 hidden md:block" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-3 hidden md:block" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <motion.div
          className="max-w-4xl"
          variants={heroStaggerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb Navigation */}
          <motion.nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-arabic uppercase tracking-wider mb-6 text-[#ba9563] font-bold"
            variants={fadeUpVariants}
          >
            <Link href="/" className="hover:text-white transition-colors">
              {locale === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#ba9563]/60 rtl:rotate-180" />
            <span className="text-white font-extrabold">{locale === 'ar' ? 'خدماتنا' : 'Services'}</span>
          </motion.nav>

          {/* Architectural Badge */}
          <motion.div
            className="inline-flex items-center gap-3 border border-[#ba9563]/50 bg-[#0b1a37]/85 px-4 py-2 mb-6 backdrop-blur-md relative shadow-lg"
            variants={slideInLeftVariants}
          >
            <BlueprintCrosshair position="top-left" />
            <span className="w-2 h-2 bg-[#ba9563] rounded-none shrink-0" />
            <span className="font-arabic text-[11px] uppercase tracking-wider text-[#ba9563] font-bold">
              {locale === 'ar' ? 'خدماتنا التخصصية • قدرات مشاريع EPC' : 'OUR TECHNICAL SERVICES • EPC CAPABILITIES'}
            </span>
            <BlueprintCrosshair position="bottom-right" />
          </motion.div>

          {/* Monumental Headline */}
          <motion.h1
            className="font-arabic text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white uppercase font-black tracking-tight leading-[1.05] mb-4 drop-shadow-md"
            variants={
              prefersReduced
                ? fadeUpVariants
                : {
                    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
                    visible: {
                      clipPath: 'inset(0 0% 0 0)',
                      opacity: 1,
                      transition: {
                        duration: DURATIONS.CINEMATIC,
                        ease: EASE.cinematic,
                      },
                    },
                  }
            }
          >
            {locale === 'ar' ? 'هندسة وتشييد البيئة العمرانية' : 'ENGINEERING THE BUILT ENVIRONMENT'}
          </motion.h1>

          <motion.p
            className="font-arabic text-lg sm:text-2xl text-[#ba9563] font-bold uppercase tracking-wide mb-6 leading-relaxed"
            variants={fadeUpVariants}
          >
            {locale === 'ar'
              ? 'ريادة في المقاولات المدنية، والأنظمة الكهروميكانيكية، وإدارة المشاريع بنظام تسليم المفتاح.'
              : 'Turnkey Civil, Electro-Mechanical & Project Management Excellence.'}
          </motion.p>

          <motion.p
            className="font-arabic text-sm sm:text-base text-slate-200 dark:text-[#c4c6d2] max-w-2xl mb-10 leading-relaxed border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#ba9563] pl-6 rtl:pl-0 rtl:pr-6 bg-[#0b1a37]/40 backdrop-blur-sm py-1.5 font-normal"
            variants={fadeUpVariants}
          >
            {locale === 'ar'
              ? 'تنفيذ متكامل متعدد التخصصات يشمل الإنشاءات المدنية، شبكات الطاقة الكهربائية، أنظمة التكييف والتهوية، وبنية السلامة ومكافحة الحريق على مدى ثلاثة عقود في السعودية ومصر وقطر.'
              : 'Delivering multidisciplinary contracting across civil works, electrical power, HVAC systems, and life-safety infrastructure for three decades across Saudi Arabia, Egypt, and Qatar.'}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
            variants={fadeUpVariants}
          >
            <Link
              href="#core-services"
              className="bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-arabic text-xs font-black uppercase tracking-wider px-8 py-4 border border-[#ba9563] flex items-center justify-center gap-3 transition-all duration-200 shadow-lg shadow-[#ba9563]/20 group"
            >
              <span>{locale === 'ar' ? 'استكشف خدماتنا الهندسية' : 'EXPLORE SERVICES'}</span>
              <HardHat className="w-4 h-4 text-[#0b1a37] group-hover:rotate-12 transition-transform duration-200 shrink-0" />
            </Link>

            <Link
              href="/projects"
              className="border border-[#8e909c]/60 bg-[#162a4d]/70 hover:border-[#ba9563] hover:text-[#ba9563] text-white font-arabic text-xs font-bold uppercase tracking-wider px-8 py-4 backdrop-blur-sm transition-all duration-200 text-center flex items-center justify-center gap-2 group"
            >
              <span>{locale === 'ar' ? 'استعرض محفظة المشاريع' : 'VIEW PROJECTS'}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform duration-200 shrink-0" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Datum line */}
      <div
        className="absolute bottom-0 inset-x-0 h-[1px] bg-[#ba9563]/30 flex items-center justify-between px-4 sm:px-12 z-20"
        aria-hidden="true"
      >
        <BlueprintCrosshair position="top-left" className="-left-2 -top-2" />
        <div className="bg-[#0b1a37] px-4 py-1 text-[9px] font-arabic tracking-wider text-[#ba9563] border-x border-[#ba9563]/30 uppercase font-bold">
          {locale === 'ar' ? 'المواصفات الهندسية // قدرات تنفيذية متكاملة' : 'SPECIFICATION // FULL-DISCIPLINE CAPABILITIES'}
        </div>
        <BlueprintCrosshair position="top-right" className="-right-2 -top-2" />
      </div>
    </section>
  )
}
