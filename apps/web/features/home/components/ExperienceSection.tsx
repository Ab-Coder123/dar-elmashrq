'use client'

import { motion } from 'framer-motion'
import { HOME_STATS } from '../data/home.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import type { Variants } from 'framer-motion'
import { scaleInVariants, EASE, DURATIONS } from '@/lib/motion'

const statVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE.architectural },
  },
}

export function ExperienceSection() {
  return (
    <section className="relative bg-slate-50 dark:bg-[#0f2244] py-16 md:py-24 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex items-center space-x-4 mb-8">
            <span className="w-3 h-3 bg-[#ba9563]" />
            <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
              METRICS // SOVEREIGN PERFORMANCE DATA
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

          {HOME_STATS.map((stat, idx) => {
            const isLast = idx === HOME_STATS.length - 1

            return (
              <motion.div
                key={stat.label}
                className={`p-8 sm:p-10 border-b lg:border-b-0 ${
                  !isLast ? 'sm:border-r' : ''
                } border-slate-200 dark:border-[#ba9563]/20 relative group hover:bg-slate-50 dark:hover:bg-[#162a4d]/60 transition-colors duration-300`}
                variants={statVariants}
              >
                <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.2em] text-[#ba9563] block mb-3 font-semibold">
                  {stat.label}
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

                <p className="font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2] leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            )
          })}
        </RevealChildren>
      </div>
    </section>
  )
}
