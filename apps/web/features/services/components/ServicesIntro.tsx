'use client'

import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealLine } from '@/components/motion/RevealOnScroll'
import { CheckCircle2 } from 'lucide-react'

export function ServicesIntro() {
  const coreActivities = [
    { title: 'Design', desc: 'Architectural, structural & BIM coordination' },
    { title: 'Construction', desc: 'Civil, mechanical & specialized fit-out execution' },
    { title: 'Project Management', desc: 'Integrated EPC controls & schedule assurance' },
    { title: 'Property Development', desc: 'Strategic real estate investment & assets' },
  ]

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#0b1a37] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-12">
            {/* Left Column — Large Editorial Typography */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>01 // INTEGRATED METHODOLOGY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-slate-950 dark:text-white font-['Montserrat'] leading-tight">
                FROM DESIGN TO EXECUTION
              </h2>
              <p className="font-['Montserrat'] text-base sm:text-lg text-[#ba9563] font-semibold uppercase tracking-wider">
                Comprehensive Built-Environment Contracting
              </p>
            </div>

            {/* Right Column — Narrative & Activity Pillars */}
            <div className="lg:col-span-6 space-y-6">
              <p className="font-['Inter'] text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Dar El Mashrq approaches every development as an integrated built-environment endeavor rather than isolated trade tasks. Our multidisciplinary organization encompasses the full project lifecycle: <strong className="text-slate-950 dark:text-white">Design, Construction, Project Management, and Property Development</strong>.
              </p>
              <p className="font-['Inter'] text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed border-l-2 border-[#ba9563]/60 pl-6 bg-slate-50 dark:bg-[#0f2244]/50 py-2">
                By self-performing heavy civil works, high-voltage electrical distribution, HVAC climate networks, and fire safety systems, we ensure single-point operational accountability and engineering integrity.
              </p>

              {/* 4 Pillars Mini-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {coreActivities.map((act) => (
                  <div
                    key={act.title}
                    className="p-3 bg-slate-50 dark:bg-[#0f2244]/80 border border-slate-200 dark:border-[#434651]/50 relative"
                  >
                    <div className="flex items-center space-x-2 text-xs font-['Montserrat'] font-bold uppercase text-slate-900 dark:text-white mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ba9563] shrink-0" />
                      <span>{act.title}</span>
                    </div>
                    <p className="font-['Inter'] text-[11px] text-slate-500 dark:text-slate-400 pl-5.5">
                      {act.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealLine className="w-full bg-[#ba9563]/30" delay={0.2} />
      </div>
    </section>
  )
}
