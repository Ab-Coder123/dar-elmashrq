'use client'

import Link from 'next/link'
import {
  Building2,
  Zap,
  Wind,
  Flame,
  Droplets,
  HardHat,
  ClipboardCheck,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { HOME_SERVICES } from '../data/home.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, EASE } from '@/lib/motion'

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5 text-[#ba9563]" />,
  Zap: <Zap className="w-5 h-5 text-[#ba9563]" />,
  Wind: <Wind className="w-5 h-5 text-[#ba9563]" />,
  Flame: <Flame className="w-5 h-5 text-[#ba9563]" />,
  Droplets: <Droplets className="w-5 h-5 text-[#ba9563]" />,
  HardHat: <HardHat className="w-5 h-5 text-[#ba9563]" />,
  ClipboardCheck: <ClipboardCheck className="w-5 h-5 text-[#ba9563]" />,
  Layers: <Layers className="w-5 h-5 text-[#ba9563]" />,
}

/** Service card — individual animated item */
const serviceCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE.architectural },
  },
}

export function ServicesPreview() {
  return (
    <section
      className="relative bg-white dark:bg-[#0b1a37] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300"
      id="capabilities"
    >
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Section Marker */}
        <RevealOnScroll>
          <div className="flex items-center space-x-4 mb-4">
            <span className="w-3 h-3 bg-[#ba9563]" />
            <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
              ENGINEERING DISCIPLINES // SPECS 01 &ndash; 08
            </span>
            <div className="flex-grow h-[1px] bg-[#ba9563]/30" />
          </div>
        </RevealOnScroll>

        {/* Section Title */}
        <RevealOnScroll delay={0.1}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
            <div>
              <h2 className="font-['Montserrat'] text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold tracking-tight">
                OUR CAPABILITIES &amp; SERVICES
              </h2>
              <p className="font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2] mt-2">
                Comprehensive turnkey contracting, multidisciplinary engineering, and facility
                delivery
              </p>
            </div>
            <p className="font-['Inter'] text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] max-w-lg mt-4 lg:mt-0 border-l-2 border-[#ba9563]/50 pl-6">
              Every division operates under rigorous international management systems, utilizing
              specialized engineering personnel, heavy machinery, and BIM integration.
            </p>
          </div>
        </RevealOnScroll>

        {/* 8-Card Welded Blueprint Matrix */}
        <RevealChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200 dark:border-[#ba9563]/30 relative bg-slate-50/50 dark:bg-[#0f2244]/40 shadow-sm"
          staggerDelay={0.08}
        >
          <BlueprintCrosshair position="top-left" />
          <BlueprintCrosshair position="top-right" />
          <BlueprintCrosshair position="bottom-left" />
          <BlueprintCrosshair position="bottom-right" />

          {HOME_SERVICES.map((service) => (
            <motion.div
              key={service.id}
              className="p-8 border-r border-b border-slate-200 dark:border-[#ba9563]/30 relative group bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-[#162a4d]/80 transition-all duration-300 flex flex-col justify-between cursor-default"
              variants={serviceCardVariants}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-['Space_Grotesk'] text-lg text-[#ba9563] font-bold">
                    {service.number}.
                  </span>
                  <div className="p-2 border border-slate-200 dark:border-[#ba9563]/30 bg-slate-50 dark:bg-[#0b1a37] group-hover:border-[#ba9563] transition-colors duration-300">
                    {iconMap[service.iconName] ?? <Building2 className="w-5 h-5 text-[#ba9563]" />}
                  </div>
                </div>

                {/* Gold accent line that expands on hover */}
                <div className="h-[1px] bg-[#ba9563] mb-4 transition-all duration-500 w-0 group-hover:w-full origin-left" />

                <h3 className="font-['Montserrat'] text-base sm:text-lg text-slate-900 dark:text-white font-bold mb-3 group-hover:text-[#ba9563] transition-colors duration-300 uppercase leading-snug">
                  {service.title}
                </h3>

                <p className="font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-[#434651]/40 flex items-center justify-between text-[#ba9563]">
                <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.15em] font-semibold">
                  {service.specCode}
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 opacity-60 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </RevealChildren>

        {/* Action Button */}
        <RevealOnScroll className="mt-12 text-center" delay={0.15} variants={fadeUpVariants}>
          <Link
            href="/services"
            className="inline-flex items-center space-x-3 border border-[#ba9563]/70 bg-white dark:bg-[#0f2244] px-8 py-4 font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] text-[#ba9563] hover:bg-[#ba9563] hover:text-[#0b1a37] font-bold transition-all duration-300 shadow-md group"
          >
            <span>View All Detailed Engineering Specifications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  )
}
