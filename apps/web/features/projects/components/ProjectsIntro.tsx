import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'

export function ProjectsIntro() {
  return (
    <section className="relative bg-white dark:bg-[#0b1a37] py-16 md:py-24 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <RevealOnScroll variants={fadeUpVariants}>
          <div className="border border-[#ba9563]/30 bg-slate-50 dark:bg-[#0f2244] p-8 sm:p-12 md:p-14 relative shadow-sm">
            <BlueprintCrosshair position="top-left" />
            <BlueprintCrosshair position="bottom-right" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Heading & Discipline Badge */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center space-x-2 border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] px-3 py-1 mb-4">
                  <span className="w-2 h-2 bg-[#ba9563]" />
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
                    PORTFOLIO CRITERIA // SECTOR MASTERY
                  </span>
                </div>

                <h2 className="font-['Montserrat'] text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold leading-tight">
                  ENGINEERED FOR SCALE, <br />
                  <span className="text-[#ba9563]">BUILT FOR ENDURANCE</span>
                </h2>
              </div>

              {/* Right Column: Editorial Body */}
              <div className="lg:col-span-7 space-y-4 font-['Inter'] text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] leading-relaxed border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-[#434651]/40 pt-6 lg:pt-0 lg:pl-10">
                <p>
                  Every contract in this index reflects our rigorous standards of self-performed execution. From 30-tower residential master developments in New Cairo to sovereign security facilities in Madinah and bespoke commercial facades across Riyadh, Dar El Mashrq balances structural engineering precision with single-point accountability.
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8e909c] font-['Space_Grotesk'] uppercase tracking-wider">
                  DISCIPLINES APPLIED: CIVIL STRUCTURES // MEP &amp; HVAC // FIRE LIFE-SAFETY // HEAVY INFRASTRUCTURE // ARCHITECTURAL FINISHES
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
