'use client'

/**
 * HeroSection — Animated Home Hero
 *
 * Motion sequence (after loading screen exits):
 *   1. Background image subtle scale 1.05 → 1.0 (cinematic pull-back)
 *   2. Badge label slides in from left
 *   3. Headline reveals line by line (clip-path mask)
 *   4. Tagline fades up
 *   5. Body copy fades up
 *   6. CTA buttons reveal last
 *
 * Respects prefers-reduced-motion.
 */

import Link from 'next/link'
import Image from 'next/image'
import { HardHat, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { HOME_MEDIA } from '../data/home.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { useLanguage } from '@/providers/LanguageProvider'
import {
  heroStaggerVariants,
  fadeUpVariants,
  slideInLeftVariants,
  DURATIONS,
  EASE,
} from '@/lib/motion'

export interface HeroSectionProps {
  hero?: {
    badge?: string
    badgeAr?: string
    headline?: string
    headlineAr?: string
    tagline?: string
    taglineAr?: string
    bodyCopy?: string
    bodyCopyAr?: string
    heroImage?: string
    exploreCtaText?: string
    exploreCtaTextAr?: string
    aboutCtaText?: string
    aboutCtaTextAr?: string
  }
}

export function HeroSection({ hero }: HeroSectionProps = {}) {
  const prefersReduced = useReducedMotion()
  const { locale, isRtl } = useLanguage()

  const heroImage = hero?.heroImage || HOME_MEDIA.heroImage

  const badge =
    locale === 'ar'
      ? hero?.badgeAr || 'مقاولات عامة وتطوير عقاري • تأسست 1994'
      : hero?.badge || 'CONTRACTING & REAL ESTATE • ESTABLISHED 1994'

  const headline =
    locale === 'ar'
      ? hero?.headlineAr || 'دار المشرق'
      : hero?.headline || 'DAR EL MASHRQ'

  const tagline =
    locale === 'ar'
      ? hero?.taglineAr || 'دقة معمارية. صدارة هندسية بمقاييس سيادية.'
      : hero?.tagline || 'Architectural Precision. Sovereign Scale.'

  const bodyCopy =
    locale === 'ar'
      ? hero?.bodyCopyAr ||
        'تنفيذ إنشائي وهندسي رفيع المستوى، كفاءة كهروميكانيكية متقدمة، وإدارة متكاملة للمشاريع الكبرى في المملكة العربية السعودية ومصر وقطر لثلاثة عقود متتالية.'
      : hero?.bodyCopy ||
        'Tier-one civil contracting, electro-mechanical prowess, and master-planned structural execution across Saudi Arabia, Egypt, and Qatar for three continuous decades.'

  const exploreCtaText =
    locale === 'ar'
      ? hero?.exploreCtaTextAr || 'استكشف المشاريع'
      : hero?.exploreCtaText || 'Explore Projects'

  const aboutCtaText =
    locale === 'ar'
      ? hero?.aboutCtaTextAr || 'عن المجموعة'
      : hero?.aboutCtaText || 'About The Enterprise'

  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-center pt-24 pb-16 overflow-hidden border-b border-[#434651]/60">
      {/* Background Image with cinematic scale-in */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={prefersReduced ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{
            duration: DURATIONS.INTRO + 0.5,
            ease: EASE.cinematic,
          }}
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
        {/* Deep Navy Linear Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a37] via-[#0f2244]/90 to-[#123c82]/45" />
        {/* Radial Dark Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,14,38,0.7)_100%)]" />
      </div>

      {/* Blueprint Drafting Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20" aria-hidden="true">
        <div className="w-full h-full max-w-[1440px] mx-auto border-x border-[#ba9563]/40 grid grid-cols-4 md:grid-cols-12">
          <div className="border-r border-[#ba9563]/20 h-full col-span-1" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-2 hidden md:block" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-3 hidden md:block" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-3 hidden md:block" />
        </div>
      </div>

      {/* Main Content Container — staggered reveal */}
      <div className="relative z-20 w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <motion.div
          className="max-w-4xl"
          variants={heroStaggerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-3 border border-[#ba9563]/50 bg-[#0b1a37]/85 px-4 py-2 mb-6 md:mb-8 backdrop-blur-md relative shadow-lg"
            variants={slideInLeftVariants}
          >
            <BlueprintCrosshair position="top-left" />
            <span className="w-2 h-2 bg-[#ba9563] rounded-none" />
            <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.2em] text-[#ba9563] font-medium">
              {badge}
            </span>
            <BlueprintCrosshair position="bottom-right" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-arabic font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white uppercase tracking-tight leading-[1.1] mb-4 drop-shadow-md"
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

          {/* Tagline */}
          <motion.p
            className="font-arabic text-lg sm:text-2xl text-[#ba9563] font-bold uppercase tracking-wider mb-6 leading-relaxed"
            variants={fadeUpVariants}
          >
            {tagline}
          </motion.p>

          {/* Body copy */}
          <motion.p
            className="font-arabic text-base sm:text-lg text-[#c4c6d2] max-w-2xl mb-10 leading-relaxed border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#ba9563]/60 pl-6 rtl:pl-0 rtl:pr-6 bg-[#0b1a37]/30 backdrop-blur-sm py-1 font-normal"
            variants={fadeUpVariants}
          >
            {bodyCopy}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
            variants={fadeUpVariants}
          >
            <Link
              href="/#projects"
              className="bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-arabic text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 border border-[#ba9563] flex items-center justify-center gap-3 transition-all duration-200 shadow-lg shadow-[#ba9563]/20 group"
            >
              <span>{exploreCtaText}</span>
              <HardHat className="w-4 h-4 text-[#0b1a37] group-hover:rotate-12 transition-transform duration-200 shrink-0" />
            </Link>

            <Link
              href="/about"
              className="border border-[#8e909c]/60 bg-[#162a4d]/70 hover:border-[#ba9563] hover:text-[#ba9563] text-white font-arabic text-xs sm:text-sm uppercase tracking-wider px-8 py-4 backdrop-blur-sm transition-all duration-300 text-center flex items-center justify-center gap-2 group font-semibold"
            >
              <span>{aboutCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform duration-200 shrink-0" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Welded Anchor Datum Line */}
      <div
        className="absolute bottom-10 inset-x-0 h-[1px] bg-[#ba9563]/30 flex items-center justify-between px-4 sm:px-12 z-20"
        aria-hidden="true"
      >
        <BlueprintCrosshair position="top-left" className="-left-2 -top-2" />
        <div className="bg-[#0b1a37] px-4 py-1 text-[9px] font-['Space_Grotesk'] tracking-[0.3em] text-[#ba9563] border-x border-[#ba9563]/30 uppercase">
          REGISTRATION: DRAWN DATUM LINE 01 // 1994&ndash;2024
        </div>
        <BlueprintCrosshair position="top-right" className="-right-2 -top-2" />
      </div>
    </section>
  )
}
