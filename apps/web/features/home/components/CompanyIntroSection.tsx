'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { HOME_MEDIA } from '../data/home.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren, RevealLine } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, slideInLeftVariants, scaleInVariants } from '@/lib/motion'

export function CompanyIntroSection() {
  const pillars = [
    { title: 'Architectural & Engineering Design', code: 'DISCIPLINE A' },
    { title: 'Turnkey Construction & Civil Works', code: 'DISCIPLINE B' },
    { title: 'EPC & Strategic Project Management', code: 'DISCIPLINE C' },
    { title: 'Property Development & Asset Investment', code: 'DISCIPLINE D' },
  ]

  return (
    <section
      className="relative bg-white dark:bg-[#0b1a37] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300"
      id="about"
    >
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-slate-200 dark:border-[#434651]/40 pb-8 relative">
            <BlueprintCrosshair position="top-left" />
            <div>
              <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] block mb-2 font-medium">
                Section 01 // Historical Foundation &amp; Identity
              </span>
              <h2 className="font-['Montserrat'] text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold tracking-tight">
                BUILDING WITH AUTHORITY SINCE 1994
              </h2>
            </div>
            <p className="font-['Inter'] text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] max-w-md mt-4 md:mt-0 leading-relaxed">
              Engineered stability backed by three decades of heavy civil execution,
              electro-mechanical intelligence, and sovereign partnerships across the Middle East.
            </p>
          </div>
        </RevealOnScroll>

        {/* Editorial 2-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative Column */}
          <RevealChildren className="lg:col-span-6 space-y-6">
            <motion.div className="border-l-2 border-[#ba9563] pl-6" variants={slideInLeftVariants}>
              <span className="font-['Space_Grotesk'] text-xs text-[#ba9563] uppercase tracking-[0.2em] block mb-1 font-semibold">
                CORPORATE PROFILE
              </span>
              <h3 className="font-['Montserrat'] text-xl sm:text-2xl text-slate-900 dark:text-white font-bold uppercase leading-snug">
                Dar El Mashrq is a premier construction and real estate investment institution
                operating across primary regional economies.
              </h3>
            </motion.div>

            <motion.p
              className="font-['Inter'] text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] leading-relaxed"
              variants={fadeUpVariants}
            >
              Founded in 1994, the enterprise is classified among the leading contracting names in
              the private and sovereign sectors in Egypt, Qatar, and the Kingdom of Saudi Arabia.
              Adhering to the highest international engineering codes, Dar El Mashrq delivers
              professional, fit-for-purpose project execution with uncompromising longevity.
            </motion.p>

            {/* Core Capability Pillars */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-[#434651]/30"
              variants={fadeUpVariants}
            >
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="border border-slate-200 dark:border-[#434651]/50 bg-slate-50 dark:bg-[#162a4d]/60 p-4 relative group hover:border-[#ba9563]/60 transition-colors shadow-sm"
                >
                  <span className="font-['Space_Grotesk'] text-[10px] text-[#ba9563] uppercase tracking-[0.15em] block mb-1 font-semibold">
                    {pillar.code}
                  </span>
                  <p className="font-['Montserrat'] text-xs text-slate-900 dark:text-white font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ba9563] shrink-0" />
                    <span>{pillar.title}</span>
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div className="pt-4" variants={fadeUpVariants}>
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] text-[#ba9563] hover:text-[#123c82] dark:hover:text-white transition-colors group font-bold"
              >
                <span className="border-b border-[#ba9563] pb-1 group-hover:border-[#123c82] dark:group-hover:border-white">
                  Read Full Company Dossier
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </RevealChildren>

          {/* Right Architectural Supporting Image */}
          <RevealOnScroll className="lg:col-span-6" variants={scaleInVariants} delay={0.15}>
            <div className="border border-[#ba9563]/40 p-2 sm:p-3 bg-slate-100 dark:bg-[#0f2244] relative shadow-lg">
              <BlueprintCrosshair position="top-left" />
              <BlueprintCrosshair position="top-right" />
              <BlueprintCrosshair position="bottom-left" />
              <BlueprintCrosshair position="bottom-right" />

              <div className="relative h-80 sm:h-[420px] w-full overflow-hidden">
                <Image
                  src={HOME_MEDIA.introImage}
                  alt="High-precision civil and structural engineering execution by Dar El Mashrq"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 dark:from-[#0b1a37] via-transparent to-transparent opacity-80" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 left-4 right-4 bg-white/95 dark:bg-[#0b1a37]/90 border border-[#ba9563]/40 p-4 backdrop-blur-sm flex items-center justify-between shadow-md">
                  <div>
                    <span className="font-['Space_Grotesk'] text-[10px] text-[#ba9563] uppercase tracking-[0.2em] block font-semibold">
                      HERITAGE ARCHIVE // 1994&ndash;2024
                    </span>
                    <span className="font-['Montserrat'] text-xs text-slate-950 dark:text-white font-bold uppercase">
                      30 Years of Structural Integrity
                    </span>
                  </div>
                  <span className="font-['Space_Grotesk'] text-[11px] text-slate-600 dark:text-[#c4c6d2] uppercase border-l border-slate-300 dark:border-[#434651] pl-3 hidden sm:inline-block font-medium">
                    KSA &bull; EGY &bull; QAT
                  </span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Gold reveal line below */}
          <div className="lg:col-span-12">
            <RevealLine className="w-24" delay={0.2} />
          </div>
        </div>
      </div>
    </section>
  )
}
