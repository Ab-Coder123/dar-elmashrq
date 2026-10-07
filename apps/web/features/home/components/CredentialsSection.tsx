'use client'

import { ShieldCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { HOME_CREDENTIALS } from '../data/home.data'
import { CERTIFICATIONS } from '@/config/certifications'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'

export function CredentialsSection() {
  return (
    <section className="relative bg-white dark:bg-[#0b1a37] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300" id="credentials">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Headline & Registration */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-slate-200 dark:border-[#434651]/40 pb-6 relative">
            <BlueprintCrosshair position="top-left" />
            <div>
              <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] block mb-2 font-semibold">
                Section 05 // Compliance &amp; Accreditations
              </span>
              <h2 className="font-['Montserrat'] text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold tracking-tight">
                CERTIFIED. EXPERIENCED. TRUSTED.
              </h2>
              <p className="font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2] mt-2">
                Official statutory licenses, international accreditations, and tier-one government syndicates
              </p>
            </div>
            <p className="font-['Inter'] text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] max-w-sm mt-4 md:mt-0">
              Official statutory licenses and high-grade contractor classification records across Saudi Arabia, Egypt, and Qatar.
            </p>
          </div>
        </RevealOnScroll>

        {/* 3 Main Highlights Cards */}
        <RevealChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" staggerDelay={0.1}>
          {HOME_CREDENTIALS.map((cred, idx) => (
            <motion.div
              key={cred.id}
              className="p-8 border border-slate-200 dark:border-[#ba9563]/30 bg-slate-50 dark:bg-[#0f2244] relative group hover:border-[#ba9563] transition-all duration-300 shadow-md"
              variants={fadeUpVariants}
            >
              <BlueprintCrosshair position="top-left" />
              <BlueprintCrosshair position="bottom-right" />

              <div className="w-12 h-12 border border-[#ba9563]/50 flex items-center justify-center text-[#ba9563] mb-6 group-hover:bg-[#ba9563] group-hover:text-[#0b1a37] transition-colors">
                {idx === 0 && <CheckCircle2 className="w-6 h-6" />}
                {idx === 1 && <ShieldCheck className="w-6 h-6" />}
                {idx === 2 && <Award className="w-6 h-6" />}
              </div>

              <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] block mb-2 font-semibold">
                {cred.category}
              </span>

              <h3 className="font-['Montserrat'] text-xl text-slate-950 dark:text-white font-bold mb-3 uppercase">
                {cred.title}
              </h3>

              <p className="font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2] mb-6 leading-relaxed">
                {cred.description}
              </p>

              <div className="border-t border-slate-200 dark:border-[#434651]/40 pt-4 flex items-center justify-between text-slate-500 dark:text-[#8e909c] font-['Space_Grotesk'] text-[10px]">
                <span>{cred.registrationNumber}</span>
                <span className="text-[#ba9563] font-bold uppercase">{cred.status}</span>
              </div>
            </motion.div>
          ))}
        </RevealChildren>

        {/* Official Statutory Registry Tags Strip */}
        <RevealOnScroll delay={0.15}>
          <div className="border border-slate-200 dark:border-[#434651]/40 bg-slate-50/70 dark:bg-[#0f2244]/60 p-6 relative shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-200 dark:border-[#434651]/30">
              <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] text-[#ba9563] font-semibold flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-[#ba9563]" />
                <span>STATUTORY COMPLIANCE &amp; LICENSES REGISTRATION (PDF PAGES 60&ndash;67)</span>
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] text-slate-500 dark:text-[#8e909c] uppercase tracking-wider font-medium">
                ALL ENTITIES ACTIVE &bull; AUDITED 2024
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#434651]/40 p-3 text-center group hover:border-[#ba9563]/60 transition-colors shadow-sm flex flex-col justify-between"
                >
                  <span className="font-['Space_Grotesk'] text-[10px] text-slate-900 dark:text-white block uppercase font-medium">
                    {cert.name}
                  </span>
                  <span className="inline-block w-1.5 h-1.5 bg-[#ba9563] mx-auto mt-2" />
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
