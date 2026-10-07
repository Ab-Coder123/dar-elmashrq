'use client'

import { Shield, Cpu, Award, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'

export function WhyDarElMashrq() {
  const pillars = [
    {
      Icon: Cpu,
      code: 'PROTOCOL // 01',
      title: 'Engineering Rigor & BIM Precision',
      description:
        'Integrating modern CAD/BIM modeling and structural engineering standards to optimize clash detection, material estimation, and constructability before field execution.',
    },
    {
      Icon: Zap,
      code: 'PROTOCOL // 02',
      title: 'Multi-Disciplinary Turnkey Power',
      description:
        'In-house self-performance across heavy civil, MEP, HVAC, fire fighting, and luxury finishes eliminates subcontractor delays and enforces single-point accountability.',
    },
    {
      Icon: Shield,
      code: 'PROTOCOL // 03',
      title: 'Stringent QA/QC & Life-Safety Codes',
      description:
        'ISO-aligned management protocols paired with Civil Defense pre-qualification ensure structural integrity, fire life-safety, and longevity across all developments.',
    },
    {
      Icon: Award,
      code: 'PROTOCOL // 04',
      title: '30-Year Regional Heritage',
      description:
        'Since 1994, our multi-country licensing and sovereign presence have anchored landmark contracts for ministries, private sector giants, and institutional developers.',
    },
  ]

  return (
    <section className="relative bg-slate-50 dark:bg-[#0f2244] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-slate-200 dark:border-[#434651]/40 pb-8 relative">
            <BlueprintCrosshair position="top-left" />
            <div>
              <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] block mb-2 font-semibold">
                Section 04 // Operational Distinctives
              </span>
              <h2 className="font-['Montserrat'] text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold tracking-tight">
                WHY DAR EL MASHRQ
              </h2>
              <p className="font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2] mt-2">
                Strategic advantages and engineering standards underpinning every contract
              </p>
            </div>
            <p className="font-['Inter'] text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] max-w-md mt-4 md:mt-0">
              A disciplined engineering methodology built on accountability, structural resilience, and three continuous decades of delivery.
            </p>
          </div>
        </RevealOnScroll>

        {/* 4 Pillars Grid */}
        <RevealChildren className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.1}>
          {pillars.map(({ Icon, code, title, description }) => (
            <motion.div
              key={title}
              className="p-8 sm:p-10 border border-slate-200 dark:border-[#ba9563]/30 bg-white dark:bg-[#0b1a37] relative group hover:border-[#ba9563] transition-all duration-300 shadow-md hover:shadow-xl"
              variants={fadeUpVariants}
            >
              <BlueprintCrosshair position="top-left" />
              <BlueprintCrosshair position="bottom-right" />

              <div className="flex items-center justify-between mb-6">
                <div className="p-3 border border-slate-200 dark:border-[#ba9563]/40 bg-slate-50 dark:bg-[#0f2244] text-[#ba9563] group-hover:bg-[#ba9563] group-hover:text-[#0b1a37] transition-colors duration-200">
                  <Icon className="w-6 h-6 text-current" />
                </div>
                <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
                  {code}
                </span>
              </div>

              <h3 className="font-['Montserrat'] text-lg sm:text-xl text-slate-950 dark:text-white font-bold mb-4 uppercase group-hover:text-[#ba9563] transition-colors duration-200">
                {title}
              </h3>

              <p className="font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2] leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </RevealChildren>
      </div>
    </section>
  )
}
