'use client'

import { motion } from 'framer-motion'
import { ORGANIZATIONAL_DIVISIONS } from '../data/about.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { UserCheck, Layers, GitFork } from 'lucide-react'
import { RevealOnScroll, RevealChildren, RevealLine } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'

export function OrganizationalStructure() {
  return (
    <section className="py-24 bg-white dark:bg-[#0b1a37] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200 dark:border-[#434651]/50">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>06 // GOVERNANCE &amp; HIERARCHY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white font-['Montserrat']">
                ORGANIZATIONAL STRUCTURE
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <span className="font-['Montserrat'] text-xl sm:text-2xl text-[#ba9563] font-bold block">
                OPERATIONAL GOVERNANCE
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-['Space_Grotesk'] tracking-widest uppercase">
                Corporate Hierarchy
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Executive Tier Card */}
        <RevealOnScroll variants={scaleInVariants} threshold={0.2}>
          <div className="max-w-2xl mx-auto mb-16 relative">
            <div className="p-8 bg-slate-50 dark:bg-[#0f2244] border-2 border-[#123c82] dark:border-[#ba9563] text-center relative shadow-xl">
              <BlueprintCrosshair position="top-left" />
              <BlueprintCrosshair position="bottom-right" />
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#123c82] dark:bg-[#ba9563] text-white dark:text-slate-950 text-[10px] font-['Space_Grotesk'] uppercase font-bold tracking-widest mb-3">
                <UserCheck className="w-3.5 h-3.5" />
                <span>EXECUTIVE BOARD &amp; LEADERSHIP</span>
              </div>
              <h3 className="font-['Montserrat'] text-2xl font-extrabold text-slate-900 dark:text-white uppercase">
                Chairman &amp; Chief Executive Officer
              </h3>
              <p className="font-['Inter'] text-xs text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
                Strategic oversight, regional expansion governance, and executive capital allocation across all operating territories.
              </p>
            </div>

            {/* Central Stem line down */}
            <div className="w-[2px] h-10 bg-[#ba9563] mx-auto hidden lg:block" />
            <div className="w-12 h-6 border-b-2 border-x-2 border-[#ba9563] mx-auto hidden lg:block" />
          </div>
        </RevealOnScroll>

        {/* 3 Main Operating Divisions */}
        <RevealChildren className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative" staggerDelay={0.12}>
          {ORGANIZATIONAL_DIVISIONS.map((division, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-50 dark:bg-[#0f2244]/80 border border-slate-200 dark:border-[#434651]/60 p-6 sm:p-8 flex flex-col justify-between relative shadow-sm hover:border-[#ba9563] transition-colors duration-300"
              variants={fadeUpVariants}
            >
              <BlueprintCrosshair position="top-left" />
              <BlueprintCrosshair position="bottom-right" />

              <div>
                {/* Division Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-[#434651]/50">
                  <span className="text-[10px] font-['Space_Grotesk'] font-bold text-[#ba9563] uppercase tracking-wider bg-[#ba9563]/10 px-2.5 py-1 border border-[#ba9563]/30">
                    {division.badge}
                  </span>
                  <GitFork className="w-4 h-4 text-slate-400" />
                </div>

                {/* Division Name */}
                <h3 className="font-['Montserrat'] font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white uppercase mb-2">
                  {division.name}
                </h3>

                <div className="text-xs font-['Space_Grotesk'] text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-6 pb-4 border-b border-slate-200 dark:border-[#434651]/40">
                  <span className="text-slate-400 dark:text-slate-500">DIVISION LEAD:</span> {division.lead}
                </div>

                {/* Departments List */}
                <div className="space-y-4">
                  {division.departments.map((dept, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-4 bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#434651]/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-['Montserrat'] font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase">
                          {dept.title}
                        </h4>
                        <span className="font-['Space_Grotesk'] text-[9px] font-bold text-[#123c82] dark:text-[#ba9563] bg-slate-100 dark:bg-[#0f2244] px-1.5 py-0.5 border border-slate-200 dark:border-[#434651]/40">
                          {dept.code}
                        </span>
                      </div>
                      {/* Roles */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {dept.roles.map((role, rIdx) => (
                          <span
                            key={rIdx}
                            className="text-[10px] font-['Inter'] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#0f2244] px-2 py-0.5 border border-slate-200 dark:border-[#434651]/30"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer tag */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#434651]/40 flex items-center justify-between text-[10px] font-['Space_Grotesk'] text-slate-400 uppercase">
                <span className="inline-flex items-center space-x-1">
                  <Layers className="w-3 h-3 text-[#ba9563]" />
                  <span>{division.departments.length} DEPARTMENTS</span>
                </span>
                <span>INTEGRATED WORKFLOW</span>
              </div>
            </motion.div>
          ))}
        </RevealChildren>
      </div>
    </section>
  )
}
