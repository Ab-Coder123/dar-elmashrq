'use client'

import { motion } from 'framer-motion'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { Quote } from 'lucide-react'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { scaleInVariants } from '@/lib/motion'

export function VisionSection() {
  return (
    <section className="py-24 bg-[#0b1a37] text-white border-b border-[#434651]/50 relative overflow-hidden">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
        <div className="w-full max-w-[1440px] mx-auto border-x border-[#ba9563]/40 grid grid-cols-6 md:grid-cols-12 h-full">
          <div className="border-r border-[#ba9563]/20 h-full col-span-2" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-4" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-2" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold mb-3">
              <span className="w-1.5 h-1.5 bg-[#ba9563]" />
              <span>05 // STRATEGIC DIRECTION</span>
              <span className="w-1.5 h-1.5 bg-[#ba9563]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-['Montserrat']">
              OUR VISION
            </h2>
          </div>
        </RevealOnScroll>

        {/* Vision Statement Box */}
        <RevealOnScroll variants={scaleInVariants} threshold={0.2}>
          <div className="max-w-4xl mx-auto bg-[#0f2244]/80 border border-[#ba9563]/60 p-8 sm:p-14 relative backdrop-blur-md shadow-2xl">
            <BlueprintCrosshair position="top-left" />
            <BlueprintCrosshair position="top-right" />
            <BlueprintCrosshair position="bottom-left" />
            <BlueprintCrosshair position="bottom-right" />

            {/* Large Quote Icon */}
            <div className="w-12 h-12 bg-[#ba9563]/10 border border-[#ba9563]/30 flex items-center justify-center mb-8 mx-auto text-[#ba9563]">
              <Quote className="w-6 h-6" />
            </div>

            {/* English Statement */}
            <blockquote className="font-['Montserrat'] text-xl sm:text-2xl md:text-3xl text-slate-100 text-center font-medium leading-relaxed mb-8 tracking-tight">
              &ldquo;Become the <strong className="text-[#ba9563] font-bold">destination of choice</strong> for our clients in Saudi Arabia, Egypt, and in the MENA region for providing project and program management solutions merging modern international industry techniques and standards with regional approaches.&rdquo;
            </blockquote>

            <p className="font-['Inter'] text-sm sm:text-base text-slate-300 text-center max-w-2xl mx-auto leading-relaxed">
              Delivering structural resilience, disciplined budget adherence, and lasting value across every square meter we build.
            </p>

            {/* Official Verification Tag */}
            <div className="mt-10 pt-6 border-t border-[#434651]/50 flex flex-col sm:flex-row justify-between items-center text-xs font-['Space_Grotesk'] text-slate-400 uppercase tracking-widest gap-2">
              <span>DAR EL MASHRQ TRADING &amp; CONTRACTING CO.</span>
              <span className="text-[#ba9563]">OFFICIAL CORPORATE CHARTER</span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
