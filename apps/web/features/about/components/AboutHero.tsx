'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { ABOUT_MEDIA } from '../data/about.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { heroStaggerVariants, fadeUpVariants, slideInLeftVariants, DURATIONS, EASE } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

export interface AboutHeroProps {
  hero?: {
    badge?: string
    badgeAr?: string
    headline?: string
    headlineAr?: string
    tagline?: string
    taglineAr?: string
    description?: string
    descriptionAr?: string
    heroImage?: string
  }
}

export function AboutHero({ hero }: AboutHeroProps = {}) {
  const prefersReduced = useReducedMotion()
  const { locale, isRtl } = useLanguage()

  const heroImage = hero?.heroImage || ABOUT_MEDIA.heroImage

  const badge =
    locale === 'ar'
      ? hero?.badgeAr || 'تأسست عام 1994 • المملكة • مصر • قطر'
      : hero?.badge || 'ESTABLISHED 1994 • KSA • EGY • QAT'

  const headline =
    locale === 'ar'
      ? hero?.headlineAr || 'عن دار المشرق'
      : hero?.headline || 'ABOUT US'

  const tagline =
    locale === 'ar'
      ? hero?.taglineAr || 'بناء هادف ورؤية هندسية راسخة للأجيال.'
      : hero?.tagline || 'Building With Purpose. Engineering With Longevity.'

  const description =
    locale === 'ar'
      ? hero?.descriptionAr ||
        'ثلاثة عقود متتالية من التميز في المقاولات العامة والهندسة المدنية والحلول الكهروميكانيكية المتكاملة والاستثمار العقاري عبر المملكة العربية السعودية وجمهورية مصر العربية ودولة قطر.'
      : hero?.description ||
        'Three continuous decades of tier-one civil engineering, electro-mechanical execution, and real estate development across Saudi Arabia, Egypt, and Qatar.'

  return (
    <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center pt-28 pb-16 overflow-hidden border-b border-slate-200 dark:border-[#434651]/60 transition-colors duration-300">
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
            alt={headline}
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
          className="max-w-3xl"
          variants={heroStaggerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb Navigation */}
          <motion.nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-arabic uppercase tracking-wider mb-6 text-[#ba9563] font-bold"
            variants={fadeUpVariants}
          >
            <Link href="/" className="hover:text-white transition-colors">
              {locale === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#ba9563]/60 rtl:rotate-180" />
            <span className="text-white font-extrabold">{locale === 'ar' ? 'عن الشركة' : 'About Us'}</span>
          </motion.nav>

          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-3 rtl:space-x-reverse border border-[#ba9563]/50 bg-[#0b1a37]/85 px-4 py-2 mb-6 backdrop-blur-md relative shadow-lg"
            variants={slideInLeftVariants}
          >
            <BlueprintCrosshair position="top-left" />
            <span className="w-2 h-2 bg-[#ba9563] rounded-none shrink-0" />
            <span className="font-arabic text-xs uppercase tracking-wider text-[#ba9563] font-bold">
              {badge}
            </span>
            <BlueprintCrosshair position="bottom-right" />
          </motion.div>

          <motion.h1
            className="font-arabic text-4xl sm:text-6xl lg:text-7xl text-white uppercase font-extrabold tracking-tight leading-[1.1] mb-4 drop-shadow-md"
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
            {headline}
          </motion.h1>

          <motion.p
            className="font-arabic text-lg sm:text-2xl text-[#ba9563] font-bold uppercase tracking-wider mb-6 leading-relaxed"
            variants={fadeUpVariants}
          >
            {tagline}
          </motion.p>

          <motion.p
            className="font-arabic text-sm sm:text-base text-slate-200 dark:text-[#c4c6d2] max-w-2xl leading-relaxed border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#ba9563] pl-6 rtl:pl-0 rtl:pr-6 bg-[#0b1a37]/40 backdrop-blur-sm py-1.5 font-normal"
            variants={fadeUpVariants}
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
