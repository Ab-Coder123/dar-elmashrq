'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { WHAT_WE_DO } from '../data/about.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'

export function WhatWeDoSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#0b1a37] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200 dark:border-[#434651]/50">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>03 // CORE CAPABILITIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white font-['Montserrat']">
                WHAT WE DO
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <span className="font-['Montserrat'] text-xl sm:text-2xl text-[#ba9563] font-bold block">
                CORE DISCIPLINES
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-['Space_Grotesk'] tracking-widest uppercase">
                End-to-End Delivery
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 4 Cards Grid / Stacked Display */}
        <div className="space-y-12">
          {WHAT_WE_DO.map((item, idx) => {
            const isEven = idx % 2 === 1
            return (
              <RevealOnScroll key={item.number} delay={idx * 0.1}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch p-6 sm:p-10 bg-slate-50 dark:bg-[#0f2244]/70 border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 relative shadow-sm ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <BlueprintCrosshair position="top-left" />
                  <BlueprintCrosshair position="bottom-right" />

                  {/* Text Content */}
                  <div className={`lg:col-span-7 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      {/* Header line: Number + Subtitle */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-['Montserrat'] text-4xl sm:text-5xl font-black text-[#ba9563]/40 tracking-tighter">
                          {item.number}
                        </span>
                        <span className="font-['Space_Grotesk'] text-xs uppercase tracking-widest text-[#ba9563] font-semibold bg-[#ba9563]/10 px-3 py-1 border border-[#ba9563]/30">
                          {item.subtitle}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-['Montserrat'] text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white uppercase mb-4">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="font-['Inter'] text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Disciplines Chips */}
                      <div className="mb-6">
                        <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-['Space_Grotesk'] font-semibold mb-3">
                          Key Competencies &amp; Sub-Disciplines:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.disciplines.map((disc, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-center space-x-2 text-xs font-['Inter'] text-slate-800 dark:text-slate-200 bg-white dark:bg-[#0b1a37] p-2.5 border border-slate-200 dark:border-[#434651]/50"
                            >
                              <span className="w-1.5 h-1.5 bg-[#ba9563] shrink-0" />
                              <span>{disc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Explore Services Link */}
                    <div className="pt-4 border-t border-slate-200 dark:border-[#434651]/40 flex justify-between items-center">
                      <Link
                        href="/services"
                        className="inline-flex items-center space-x-2 text-xs uppercase font-['Space_Grotesk'] font-bold text-[#123c82] dark:text-[#ba9563] hover:underline"
                      >
                        <span>Explore Technical Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-['Space_Grotesk']">
                        DISCIPLINE #{item.number}
                      </span>
                    </div>
                  </div>

                  {/* Media Column */}
                  <div className={`lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative w-full h-full border border-slate-300 dark:border-[#434651] overflow-hidden group">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 px-3 py-1 bg-slate-900/90 text-[10px] font-['Space_Grotesk'] text-[#ba9563] uppercase tracking-wider border border-[#ba9563]/40">
                        DELIVERY STANDARDS // ISO 9001
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
