'use client'

import { motion } from 'framer-motion'
import { ABOUT_CREDENTIALS } from '../data/about.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { ShieldCheck } from 'lucide-react'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'

export function CredentialsSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#0b1a37] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200 dark:border-[#434651]/50">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>08 // STATUTORY ACCREDITATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white font-['Montserrat']">
                OFFICIAL COMPLIANCE &amp; LICENSES
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <span className="font-['Montserrat'] text-xl sm:text-2xl text-[#ba9563] font-bold block">
                REGULATORY GOVERNANCE
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-['Space_Grotesk'] tracking-widest uppercase">
                Statutory Classification
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Credentials Grid */}
        <RevealChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {ABOUT_CREDENTIALS.map((cred) => (
            <motion.div
              key={cred.id}
              className="p-6 bg-slate-50 dark:bg-[#0f2244]/80 border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 flex flex-col justify-between relative shadow-sm group"
              variants={fadeUpVariants}
            >
              <BlueprintCrosshair position="top-right" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-[#123c82]/10 dark:bg-[#ba9563]/10 border border-[#123c82]/20 dark:border-[#ba9563]/30 flex items-center justify-center group-hover:bg-[#ba9563] transition-colors">
                    <ShieldCheck className="w-5 h-5 text-[#123c82] dark:text-[#ba9563] group-hover:text-slate-950 transition-colors" />
                  </div>
                  <span className="text-[9px] font-['Space_Grotesk'] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    VERIFIED // OFFICIAL
                  </span>
                </div>

                <h3 className="font-['Montserrat'] font-bold text-sm sm:text-base text-slate-900 dark:text-white uppercase mb-3">
                  {cred.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 font-['Inter'] leading-relaxed mb-4">
                  {cred.issuingBody}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-[#434651]/40">
                <span className="text-[10px] font-['Space_Grotesk'] text-[#123c82] dark:text-[#ba9563] font-semibold block">
                  {cred.classification}
                </span>
              </div>
            </motion.div>
          ))}
        </RevealChildren>
      </div>
    </section>
  )
}
