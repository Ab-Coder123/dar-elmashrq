'use client'

import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/motion'
import { PenTool, HardHat, BarChart3, CheckCircle2 } from 'lucide-react'

export function DesignConstructionManagement() {
  const triad = [
    {
      icon: PenTool,
      title: 'DESIGN',
      badge: 'PHASE A // CONCEPTION',
      heading: 'Engineering Thinking & Structural Modeling',
      desc: 'Translating strategic architectural intent into fully coordinated structural, MEP, and life-safety BIM models to identify clashes and optimize costs before physical mobilization.',
      points: ['Full BIM / CAD Coordination', 'Structural Load Modeling', 'Value Engineering & Bill of Quantities'],
    },
    {
      icon: HardHat,
      title: 'CONSTRUCTION',
      badge: 'PHASE B // PHYSICAL EXECUTION',
      heading: 'Turnkey Ground & Superstructure Execution',
      desc: 'Executing reinforced concrete frames, deep foundation works, heavy civil installations, and luxury finishing with specialized in-house crews adhering to strict safety codes.',
      points: ['Subterranean Excavation & Piling', 'Superstructure Cast-in-Place Concrete', 'High-Spec Turnkey Interior Finishing'],
    },
    {
      icon: BarChart3,
      title: 'PROJECT MANAGEMENT',
      badge: 'PHASE C // PROGRAM CONTROL',
      heading: 'Comprehensive EPC Oversight & Quality Assurance',
      desc: 'Merging modern international industry techniques and standards with regional approaches to manage milestones, supply chains, QA/QC testing, and scheduled client handover.',
      points: ['Primavera P6 Milestone Controls', 'Rigorous QA/QC Testing Protocols', 'Turnkey Facility Commissioning & Handover'],
    },
  ]

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#09182f] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-300 dark:border-[#434651]/50">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>04 // THE CORE TRIAD</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white font-['Montserrat']">
                DESIGN &bull; CONSTRUCTION &bull; MANAGEMENT
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <span className="font-['Montserrat'] text-xl sm:text-2xl text-[#ba9563] font-bold block">
                UNIFIED DELIVERY MODEL
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-['Space_Grotesk'] tracking-widest uppercase">
                Single-Point Responsibility
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Columns Triad Display */}
        <RevealChildren className="grid grid-cols-1 lg:grid-cols-3 gap-8" staggerDelay={0.12}>
          {triad.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                className="p-8 bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 flex flex-col justify-between relative shadow-md group"
                variants={fadeUpVariants}
              >
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                <div>
                  {/* Badge & Icon Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-[#434651]/40">
                    <span className="text-[10px] font-['Space_Grotesk'] font-bold text-[#ba9563] uppercase tracking-wider bg-[#ba9563]/10 px-2.5 py-1 border border-[#ba9563]/30">
                      {item.badge}
                    </span>
                    <div className="w-10 h-10 bg-[#123c82]/10 dark:bg-[#ba9563]/10 border border-[#123c82]/20 dark:border-[#ba9563]/30 flex items-center justify-center text-[#123c82] dark:text-[#ba9563] group-hover:bg-[#ba9563] group-hover:text-slate-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Montserrat'] text-2xl font-black text-slate-900 dark:text-white uppercase mb-2">
                    {item.title}
                  </h3>

                  <h4 className="font-['Montserrat'] text-sm font-bold text-[#ba9563] uppercase mb-4 leading-snug">
                    {item.heading}
                  </h4>

                  <p className="font-['Inter'] text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Bullets */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#434651]/40 space-y-2">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ba9563] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </RevealChildren>
      </div>
    </section>
  )
}
