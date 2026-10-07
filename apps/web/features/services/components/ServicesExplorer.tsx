'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Zap, Wind, Flame, Droplets, CheckCircle2, ArrowRight } from 'lucide-react'
import type { TechnicalService } from '../types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

interface ServicesExplorerProps {
  services: TechnicalService[]
}

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Wind: <Wind className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Droplets: <Droplets className="w-5 h-5" />,
}

export function ServicesExplorer({ services }: ServicesExplorerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const activeService = services[selectedIndex] ?? services[0]

  if (!activeService || services.length === 0) {
    return null
  }

  return (
    <section
      id="core-services"
      className="py-24 md:py-32 bg-slate-50 dark:bg-[#09182f] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-300 dark:border-[#434651]/50">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>02 // OFFICIAL TECHNICAL DISCIPLINES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white font-['Montserrat']">
                CORE TECHNICAL SERVICES
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <span className="font-['Montserrat'] text-xl sm:text-2xl text-[#ba9563] font-bold block">
                5 SPECIALIZED DISCIPLINES
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-['Space_Grotesk'] tracking-widest uppercase">
                Turnkey Field Self-Performance
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Interactive Desktop Split-Layout (lg and above) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Service Selector List */}
          <div className="col-span-5 flex flex-col justify-between space-y-3">
            {services.map((service, index) => {
              const isActive = index === selectedIndex
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left p-6 border transition-all duration-300 relative group cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-[#0b1a37] border-[#ba9563] shadow-lg shadow-[#ba9563]/10 scale-[1.01]'
                      : 'bg-white/60 dark:bg-[#0b1a37]/50 border-slate-200 dark:border-[#434651]/40 opacity-70 hover:opacity-100 hover:border-[#ba9563]/60'
                  }`}
                >
                  {isActive && (
                    <>
                      <BlueprintCrosshair position="top-left" />
                      <BlueprintCrosshair position="bottom-right" />
                      {/* Active gold left indicator bar */}
                      <div className="absolute left-0 inset-y-0 w-1 bg-[#ba9563]" />
                    </>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span
                        className={`font-['Montserrat'] text-2xl font-black transition-colors ${
                          isActive ? 'text-[#ba9563]' : 'text-slate-400 dark:text-slate-600'
                        }`}
                      >
                        {service.number}
                      </span>
                      <div>
                        <span className="text-[10px] font-['Space_Grotesk'] uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                          {service.specCode}
                        </span>
                        <h3
                          className={`font-['Montserrat'] text-base font-bold uppercase transition-colors ${
                            isActive ? 'text-slate-950 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`p-2.5 border transition-colors ${
                        isActive
                          ? 'border-[#ba9563] bg-[#ba9563] text-[#0b1a37]'
                          : 'border-slate-200 dark:border-[#434651]/50 text-slate-500 dark:text-[#ba9563]'
                      }`}
                    >
                      {iconMap[service.iconName] ?? <Building2 className="w-5 h-5" />}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Column: Visual & Architectural Spec Stage */}
          <div className="col-span-7 relative min-h-[580px] bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#ba9563]/40 p-8 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden">
            <BlueprintCrosshair position="top-left" />
            <BlueprintCrosshair position="bottom-right" />

            {/* Background Image Stage with smooth AnimatePresence */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden border border-slate-200 dark:border-[#434651]/60 mb-6 bg-slate-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                  
                  {/* Badge on image */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="bg-slate-900/90 px-3 py-1.5 border border-[#ba9563]/50 backdrop-blur-sm">
                      <span className="font-['Space_Grotesk'] text-[10px] text-[#ba9563] uppercase tracking-[0.2em] font-semibold">
                        {activeService.category}
                      </span>
                    </div>
                    <span className="font-['Montserrat'] text-xs text-white font-bold tracking-wider">
                      SPECIFICATION {activeService.number} / 05
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dynamic Content Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-6 flex-grow flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-['Montserrat'] text-2xl font-extrabold uppercase text-slate-950 dark:text-white mb-3">
                    {activeService.title}
                  </h4>
                  <p className="font-['Inter'] text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {activeService.description}
                  </p>

                  {/* Scope Items Matrix */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-['Space_Grotesk'] text-[#ba9563] uppercase tracking-wider font-semibold block">
                      Core Scope of Work:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeService.scopeItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-2 text-xs font-['Inter'] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#0f2244] p-2.5 border border-slate-200 dark:border-[#434651]/40"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ba9563] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Standards & Compliance Strip */}
                <div className="pt-4 border-t border-slate-200 dark:border-[#434651]/50 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-['Space_Grotesk'] text-[10px] text-slate-400 dark:text-slate-500 uppercase">
                      STANDARDS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeService.standards.map((std, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-['Space_Grotesk'] text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#0f2244] px-2 py-0.5 border border-slate-200 dark:border-[#434651]/40"
                        >
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="font-['Space_Grotesk'] text-[11px] text-[#ba9563] font-bold uppercase tracking-wider">
                    CERTIFIED DISCIPLINE
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Vertical Stack Display (< lg) */}
        <div className="lg:hidden space-y-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#ba9563]/40 p-6 shadow-md relative"
            >
              <BlueprintCrosshair position="top-left" />
              <BlueprintCrosshair position="bottom-right" />

              {/* Service Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-[#434651]/50">
                <div className="flex items-center space-x-3">
                  <span className="font-['Montserrat'] text-2xl font-black text-[#ba9563]">
                    {service.number}
                  </span>
                  <div>
                    <span className="text-[10px] font-['Space_Grotesk'] uppercase text-slate-500 block">
                      {service.specCode}
                    </span>
                    <h3 className="font-['Montserrat'] text-base font-bold uppercase text-slate-900 dark:text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="p-2 bg-[#ba9563]/10 text-[#ba9563] border border-[#ba9563]/30">
                  {iconMap[service.iconName] ?? <Building2 className="w-5 h-5" />}
                </div>
              </div>

              {/* Image Frame */}
              <div className="relative h-52 w-full overflow-hidden mb-5 border border-slate-200 dark:border-[#434651]/50 bg-slate-950">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-['Space_Grotesk'] text-[#ba9563] uppercase bg-slate-900/90 px-2.5 py-1 border border-[#ba9563]/30">
                  {service.category}
                </span>
              </div>

              {/* Description */}
              <p className="font-['Inter'] text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Scope Checklist */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-[#434651]/40">
                {service.scopeItems.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-[11px] text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ba9563] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
