'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { scaleInVariants } from '@/lib/motion'
import { ArrowRight, Send } from 'lucide-react'

interface ServicesCTAProps {
  ctaImage: string
}

export function ServicesCTA({ ctaImage }: ServicesCTAProps) {
  return (
    <section className="relative py-28 overflow-hidden bg-[#0b1a37] text-white">
      {/* Background Image with Dark Blue Tint */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ctaImage}
          alt="Dar El Mashrq Engineering & Construction Execution"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a37] via-[#0b1a37]/90 to-[#123c82]/70" />
      </div>

      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-15" aria-hidden="true">
        <div className="w-full max-w-[1440px] mx-auto border-x border-[#ba9563]/40 grid grid-cols-4 md:grid-cols-12 h-full">
          <div className="border-r border-[#ba9563]/20 h-full col-span-3" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-6" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-3" />
        </div>
      </div>

      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 text-center">
        <RevealOnScroll variants={scaleInVariants} threshold={0.15}>
          <div className="max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 border border-[#ba9563]/50 bg-[#0b1a37]/90 px-4 py-1.5 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 bg-[#ba9563]" />
              <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-medium">
                TENDER PRE-QUALIFICATION &bull; EPC PROPOSALS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-['Montserrat'] leading-tight mb-6">
              ENGAGE OUR ENGINEERING DESK
            </h2>

            <p className="font-['Inter'] text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mb-10">
              Submit your project scope, tender parameters, or engineering inquiries directly to our central estimating team in Riyadh.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-[#ba9563] hover:bg-[#d4b27a] text-slate-950 text-xs font-['Space_Grotesk'] uppercase tracking-widest font-bold inline-flex items-center justify-center space-x-2 transition-colors duration-200 relative group shadow-lg"
              >
                <BlueprintCrosshair position="top-left" />
                <span>SUBMIT TENDER INQUIRY</span>
                <Send className="w-4 h-4 text-slate-950" />
              </Link>

              <Link
                href="/projects"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-['Space_Grotesk'] uppercase tracking-widest font-bold inline-flex items-center justify-center space-x-2 transition-colors duration-200 backdrop-blur-sm"
              >
                <span>EXPLORE DELIVERED WORKS</span>
                <ArrowRight className="w-4 h-4 text-[#ba9563]" />
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
