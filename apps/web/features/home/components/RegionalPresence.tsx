'use client'

import { MapPin, Phone, Building, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { REGIONAL_HUBS } from '../data/home.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'

export function RegionalPresence() {
  return (
    <section className="relative bg-white dark:bg-[#0f2244] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300" id="presence">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Section Title & Coordinates Header */}
        <RevealOnScroll>
          <div className="mb-14">
            <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] block mb-2 font-semibold">
              Section 03 // Geographic Sovereignty
            </span>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-slate-200 dark:border-[#434651]/40 pb-6">
              <h2 className="font-['Montserrat'] text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold tracking-tight">
                REGIONAL PRESENCE
              </h2>
              <span className="font-['Space_Grotesk'] text-xs sm:text-sm text-[#ba9563] uppercase tracking-[0.2em] mt-2 md:mt-0 font-semibold">
                RIYADH &bull; CAIRO &bull; DOHA
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Welded Architectural Monoliths Connected Horizontally */}
        <RevealChildren className="grid grid-cols-1 lg:grid-cols-3 border border-slate-200 dark:border-[#ba9563]/30 relative bg-slate-50 dark:bg-[#0b1a37] shadow-md" staggerDelay={0.12}>
          <BlueprintCrosshair position="top-left" />
          <BlueprintCrosshair position="top-right" />
          <BlueprintCrosshair position="bottom-left" />
          <BlueprintCrosshair position="bottom-right" />

          {REGIONAL_HUBS.map((hub, idx) => {
            const isMiddle = idx === 1

            return (
              <motion.div
                key={hub.country}
                className={`p-8 sm:p-10 border-b lg:border-b-0 ${
                  isMiddle ? 'lg:border-x' : ''
                } border-slate-200 dark:border-[#ba9563]/30 relative flex flex-col justify-between group bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-[#162a4d]/70 transition-colors duration-200`}
                variants={fadeUpVariants}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] border border-[#ba9563]/40 px-3 py-1 bg-slate-50 dark:bg-[#0f2244] font-semibold">
                      {hub.badge}
                    </span>
                    <span className="font-['Space_Grotesk'] text-[10px] text-slate-500 dark:text-[#8e909c] font-mono">
                      {hub.coordinates}
                    </span>
                  </div>

                  <h3 className="font-['Montserrat'] text-xl sm:text-2xl text-slate-950 dark:text-white uppercase font-bold mb-3">
                    {hub.countryName}
                  </h3>

                  <p className="font-['Inter'] text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] leading-relaxed mb-6">
                    {hub.description}
                  </p>

                  <div className="space-y-3 font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2] border-t border-slate-200 dark:border-[#434651]/40 pt-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-[#ba9563] shrink-0 mt-0.5" />
                      <span>{hub.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-[#ba9563] shrink-0" />
                      <span className="font-['Space_Grotesk'] text-[#ba9563] font-semibold">{hub.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-[#ba9563]/20 flex items-center justify-between text-[#ba9563]">
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.15em] font-semibold">
                    {hub.classification}
                  </span>
                  {idx === 0 && <Building className="w-4 h-4" />}
                  {idx === 1 && <Globe className="w-4 h-4" />}
                  {idx === 2 && <Building className="w-4 h-4" />}
                </div>
              </motion.div>
            )
          })}
        </RevealChildren>
      </div>
    </section>
  )
}
