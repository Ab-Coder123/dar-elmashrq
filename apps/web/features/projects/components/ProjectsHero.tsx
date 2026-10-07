'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2, Globe2, ShieldCheck, Award } from 'lucide-react'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { heroStaggerVariants, fadeUpVariants } from '@/lib/motion'

export function ProjectsHero() {
  const kpis = [
    { label: 'DELIVERED DEVELOPMENTS', value: '35+', icon: Building2 },
    { label: 'SOVEREIGN MARKETS', value: '03', icon: Globe2 },
    { label: 'INDUSTRY HERITAGE', value: '30+ YRS', icon: Award },
    { label: 'OFFICIAL ACCREDITATIONS', value: '07', icon: ShieldCheck },
  ]

  return (
    <section className="relative bg-[#09182f] text-white pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#ba9563]/30 overflow-hidden">
      {/* Architectural blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ba9563_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto relative z-10">
        <RevealOnScroll variants={heroStaggerVariants} threshold={0.1}>
          <div className="relative border-l-2 border-[#ba9563] pl-6 sm:pl-10">
            <BlueprintCrosshair position="top-right" />
            <BlueprintCrosshair position="bottom-right" />

            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] mb-4 font-semibold">
              <Link href="/" className="hover:underline">
                HOME
              </Link>
              <span>/</span>
              <span>PROJECT PORTFOLIO</span>
            </div>

            {/* Headline */}
            <h1 className="font-['Montserrat'] text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.05] text-white mb-6">
              STRUCTURAL RIGOR &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ba9563] via-[#d4b27a] to-[#ba9563]">
                CONTRACTING HERITAGE
              </span>
            </h1>

            <p className="font-['Inter'] text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed mb-10">
              An exhaustive archive of civil engineering, electro-mechanical contracting, high-density residential towers, institutional complexes, and infrastructure delivered across the Kingdom of Saudi Arabia, the Arab Republic of Egypt, and the State of Qatar since 1994.
            </p>

            {/* Datum KPI strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-[#ba9563]/30 pt-8 mt-8">
              {kpis.map((kpi, idx) => {
                const Icon = kpi.icon
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center space-x-2 text-[#ba9563]">
                      <Icon className="w-4 h-4" />
                      <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.15em] font-semibold text-[#ba9563]">
                        {kpi.label}
                      </span>
                    </div>
                    <div className="font-['Montserrat'] text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {kpi.value}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
