'use client'

import { motion } from 'framer-motion'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { MapPin, Phone, Mail, Globe, CheckCircle2 } from 'lucide-react'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'

const REGIONS = [
  {
    country: 'Kingdom of Saudi Arabia',
    hub: 'Riyadh Corporate Headquarters',
    address: 'Olaya District, Riyadh, Saudi Arabia',
    phone: ['+966 58 160 5812', '+966 54 505 1136'],
    email: 'info@elmashrq.com',
    scope: 'General Contracting, EPC Turnkey Projects, Civil Defense Certified, GOSI & Monshaat Compliant',
    badge: 'KSA HUB // MAIN HQ',
    status: 'ACTIVE CORPORATE HQ',
  },
  {
    country: 'Arab Republic of Egypt',
    hub: 'Cairo Operations & Project Hub',
    address: 'Greater Cairo Metropolitan Operations',
    phone: ['+966 58 160 5812'],
    email: 'info@elmashrq.com',
    scope: 'Multi-Tower Housing, Mega Retail Chains, Medical Facilities & Heavy Structural Works',
    badge: 'EGY HUB // REGIONAL',
    status: 'ACTIVE REGIONAL HUB',
  },
  {
    country: 'State of Qatar',
    hub: 'Doha Gulf Contracting Hub',
    address: 'Doha Metropolitan & Municipal Zones',
    phone: ['+966 58 160 5812'],
    email: 'info@elmashrq.com',
    scope: 'Residential Complexes, Commercial Developments & Gulf Expansion Initiatives',
    badge: 'QAT HUB // EXPANSION',
    status: 'ACTIVE GULF HUB',
  },
]

export function RegionalPresence() {
  return (
    <section className="py-24 bg-slate-100/70 dark:bg-[#09182f] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-300 dark:border-[#434651]/50">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>07 // OPERATIONAL FOOTPRINT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white font-['Montserrat']">
                REGIONAL PRESENCE
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <span className="font-['Montserrat'] text-xl sm:text-2xl text-[#ba9563] font-bold block">
                SAUDI ARABIA &bull; EGYPT &bull; QATAR
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-['Space_Grotesk'] tracking-widest uppercase">
                Three Regional Hubs
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Regional Cards Grid */}
        <RevealChildren className="grid grid-cols-1 lg:grid-cols-3 gap-8" staggerDelay={0.12}>
          {REGIONS.map((region, idx) => (
            <motion.div
              key={idx}
              className="p-8 bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 flex flex-col justify-between relative shadow-md group"
              variants={fadeUpVariants}
            >
              <BlueprintCrosshair position="top-left" />
              <BlueprintCrosshair position="bottom-right" />

              <div>
                {/* Badge line */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-[#434651]/40">
                  <span className="text-[10px] font-['Space_Grotesk'] font-bold text-[#ba9563] uppercase tracking-wider bg-[#ba9563]/10 px-2.5 py-1 border border-[#ba9563]/30">
                    {region.badge}
                  </span>
                  <div className="flex items-center space-x-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-['Space_Grotesk'] font-semibold">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span>{region.status}</span>
                  </div>
                </div>

                {/* Country */}
                <h3 className="font-['Montserrat'] font-extrabold text-xl text-slate-900 dark:text-white uppercase mb-2">
                  {region.country}
                </h3>

                <div className="font-['Montserrat'] text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase mb-4">
                  {region.hub}
                </div>

                {/* Scope */}
                <div className="p-3 bg-slate-50 dark:bg-[#0f2244] border border-slate-200 dark:border-[#434651]/40 mb-6">
                  <span className="text-[10px] font-['Space_Grotesk'] text-slate-500 uppercase block mb-1">
                    OPERATIONAL FOCUS:
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-['Inter'] leading-relaxed">
                    {region.scope}
                  </p>
                </div>

                {/* Contact Points */}
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-start space-x-2.5">
                    <MapPin className="w-4 h-4 text-[#ba9563] shrink-0 mt-0.5" />
                    <span>{region.address}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Phone className="w-4 h-4 text-[#ba9563] shrink-0" />
                    <span>{region.phone.join(' / ')}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Mail className="w-4 h-4 text-[#ba9563] shrink-0" />
                    <span>{region.email}</span>
                  </div>
                </div>
              </div>

              {/* Verified Sovereign Compliance Tag */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-[#434651]/40 flex items-center justify-between text-[10px] font-['Space_Grotesk'] text-slate-400">
                <span className="inline-flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ba9563]" />
                  <span>OFFICIALLY REGISTERED</span>
                </span>
                <span>SINCE 1994</span>
              </div>
            </motion.div>
          ))}
        </RevealChildren>
      </div>
    </section>
  )
}
