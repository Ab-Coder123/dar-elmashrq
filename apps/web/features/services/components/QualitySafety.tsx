'use client'

import Image from 'next/image'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { motion } from 'framer-motion'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'
import { ShieldCheck, HardHat, FileCheck, CheckCircle2 } from 'lucide-react'

interface QualitySafetyProps {
  qualityImage: string
}

export function QualitySafety({ qualityImage }: QualitySafetyProps) {
  const protocols = [
    {
      icon: ShieldCheck,
      title: 'QA/QC MANAGEMENT',
      desc: 'Systematic material verification, concrete cylinder compression tests, MEP pressure testing, and multi-tier quality sign-offs.',
    },
    {
      icon: HardHat,
      title: 'OCCUPATIONAL HEALTH & SAFETY',
      desc: 'Active site safety inspections, zero-harm hazard mitigation protocols, mandatory PPE compliance, and toolbox briefings.',
    },
    {
      icon: FileCheck,
      title: 'STATUTORY CODE COMPLIANCE',
      desc: 'Strict adherence to national building codes, civil defense fire-prevention protocols, and municipal statutory requirements.',
    },
  ]

  return (
    <section className="py-24 bg-white dark:bg-[#0b1a37] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200 dark:border-[#434651]/50">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>07 // CORPORATE GOVERNANCE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white font-['Montserrat']">
                QUALITY &amp; SAFETY ASSURANCE
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <span className="font-['Montserrat'] text-xl sm:text-2xl text-[#ba9563] font-bold block">
                ORGANIZATIONAL MANDATE
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-['Space_Grotesk'] tracking-widest uppercase">
                Zero Compromise Standards
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 2-Column Composition: Narrative + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Narrative & Protocols */}
          <RevealChildren className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] text-slate-900 dark:text-white leading-tight">
              An Institutional Commitment to Structural Longevity and Safe Working Environments.
            </h3>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-['Inter']">
              Operating under Dar El Mashrq’s dedicated Quality &amp; Safety Division, every project is supervised by certified safety engineers and QA/QC inspectors to guarantee that all civil, electro-mechanical, and finishing works conform to design specifications.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {protocols.map((proto, idx) => {
                const Icon = proto.icon
                return (
                  <motion.div
                    key={idx}
                    className="p-5 bg-slate-50 dark:bg-[#0f2244]/80 border border-slate-200 dark:border-[#434651]/50 relative"
                    variants={fadeUpVariants}
                  >
                    <div className="w-8 h-8 bg-[#123c82]/10 dark:bg-[#ba9563]/10 border border-[#123c82]/20 dark:border-[#ba9563]/30 flex items-center justify-center text-[#123c82] dark:text-[#ba9563] mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-['Montserrat'] font-bold text-xs uppercase text-slate-900 dark:text-white mb-2">
                      {proto.title}
                    </h4>
                    <p className="font-['Inter'] text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {proto.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </RevealChildren>

          {/* Image */}
          <RevealOnScroll className="lg:col-span-5 relative" variants={scaleInVariants} delay={0.15}>
            <div className="relative aspect-[4/3] sm:aspect-[16/11] border border-slate-300 dark:border-[#434651] shadow-2xl overflow-hidden group">
              <BlueprintCrosshair position="top-left" />
              <BlueprintCrosshair position="bottom-right" />
              <Image
                src={qualityImage}
                alt="Dar El Mashrq Quality & Safety Inspection"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/90 dark:bg-[#0b1a37]/90 backdrop-blur-md border border-[#ba9563]/40">
                <div className="flex justify-between items-center text-xs font-['Space_Grotesk'] text-[#ba9563] uppercase tracking-wider">
                  <span>SAFETY DIVISION</span>
                  <span>EST. 1994</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
