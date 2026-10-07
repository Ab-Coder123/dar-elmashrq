'use client'

import { motion } from 'framer-motion'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { heroStaggerVariants, fadeUpVariants } from '@/lib/motion'
import Link from 'next/link'

export function ContactHero() {
  return (
    <section className="relative bg-[#09182f] text-white pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#ba9563]/30 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ba9563_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" 
      />

      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto relative z-10">
        <RevealOnScroll variants={heroStaggerVariants} threshold={0.1}>
          <div className="relative border-l-2 border-[#ba9563] pl-6 sm:pl-10">
            <BlueprintCrosshair position="top-right" />
            <BlueprintCrosshair position="bottom-right" />

            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] mb-4 font-semibold">
              <Link href="/" className="hover:underline">HOME</Link>
              <span>/</span>
              <span>CONTACT US</span>
            </div>

            {/* Main Title */}
            <h1 className="font-['Montserrat'] text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase leading-tight text-white mb-6">
              ENGAGE OUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ba9563] via-[#d4b27a] to-[#ba9563]">
                ENGINEERING DESK
              </span>
            </h1>

            <p className="font-['Inter'] text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              Direct channels for project inquiries, tender invitations, pre-qualification submissions, and corporate partnerships across Saudi Arabia, Egypt, and Qatar.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
