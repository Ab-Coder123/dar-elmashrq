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
import {
  heroStaggerVariants,
  fadeUpVariants,
  slideInLeftVariants,
  DURATIONS,
  EASE,
} from '@/lib/motion'

export function HeroSection() {
  const prefersReduced = useReducedMotion()

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
            src={HOME_MEDIA.heroImage}
            alt="Tier-one mega civil infrastructure and skyscraper development site in Riyadh at dusk"
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
            className="inline-flex items-center space-x-3 border border-[#ba9563]/50 bg-[#0b1a37]/85 px-4 py-2 mb-6 md:mb-8 backdrop-blur-md relative shadow-lg"
            variants={slideInLeftVariants}
          >
            <BlueprintCrosshair position="top-left" />
            <span className="w-2 h-2 bg-[#ba9563] rounded-none" />
            <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.2em] text-[#ba9563] font-medium">
              CONTRACTING &amp; REAL ESTATE &bull; ESTABLISHED 1994
            </span>
            <BlueprintCrosshair position="bottom-right" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-['Montserrat'] text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white uppercase font-extrabold tracking-tight leading-[1.05] mb-4 drop-shadow-md"
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
            DAR EL MASHRQ
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-['Montserrat'] text-lg sm:text-2xl text-[#ba9563] font-semibold uppercase tracking-wider mb-6"
            variants={fadeUpVariants}
          >
            Architectural Precision. Sovereign Scale.
          </motion.p>

          {/* Body copy */}
          <motion.p
            className="font-['Inter'] text-base sm:text-lg text-[#c4c6d2] max-w-2xl mb-10 leading-relaxed border-l-2 border-[#ba9563]/60 pl-6 bg-[#0b1a37]/30 backdrop-blur-sm py-1"
            variants={fadeUpVariants}
          >
            Tier-one civil contracting, electro-mechanical prowess, and master-planned structural
            execution across Saudi Arabia, Egypt, and Qatar for three continuous decades.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
            variants={fadeUpVariants}
          >
            <Link
              href="/#projects"
              className="bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 border border-[#ba9563] flex items-center justify-center space-x-3 transition-all duration-200 shadow-lg shadow-[#ba9563]/20 group"
            >
              <span>Explore Projects</span>
              <HardHat className="w-4 h-4 text-[#0b1a37] group-hover:rotate-12 transition-transform duration-200" />
            </Link>

            <Link
              href="/about"
              className="border border-[#8e909c]/60 bg-[#162a4d]/70 hover:border-[#ba9563] hover:text-[#ba9563] text-white font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] px-8 py-4 backdrop-blur-sm transition-all duration-300 text-center flex items-center justify-center space-x-2 group"
            >
              <span>About The Enterprise</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-1 transition-transform duration-200" />
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
