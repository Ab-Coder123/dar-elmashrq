import Link from 'next/link'
import { ArrowRight, Send, Mail, Phone, Building2 } from 'lucide-react'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { scaleInVariants } from '@/lib/motion'
import { COMPANY_PROFILE } from '@/config/site'

export function ProjectsCTA() {
  return (
    <section className="relative bg-white dark:bg-[#0b1a37] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <RevealOnScroll variants={scaleInVariants} threshold={0.1}>
          <div className="border border-[#ba9563]/40 bg-slate-50 dark:bg-[#0f2244] p-8 sm:p-12 md:p-16 relative shadow-xl">
            <BlueprintCrosshair position="top-left" />
            <BlueprintCrosshair position="top-right" />
            <BlueprintCrosshair position="bottom-left" />
            <BlueprintCrosshair position="bottom-right" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center space-x-2 border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] px-3 py-1 mb-4">
                  <span className="w-2 h-2 bg-[#ba9563]" />
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
                    EPC TENDER PROCUREMENT
                  </span>
                </div>

                <h2 className="font-['Montserrat'] text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold mb-4 leading-tight">
                  REQUIRE TURNKEY CONTRACTING <br />
                  <span className="text-[#ba9563]">FOR YOUR NEXT CAPITAL PROJECT?</span>
                </h2>

                <p className="font-['Inter'] text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] max-w-2xl leading-relaxed mb-8">
                  Connect with our executive estimating department and senior structural engineers in Riyadh for RFP reviews, BOQ validations, and turnkey EPC collaborations.
                </p>

                <div className="flex flex-wrap gap-6 text-xs font-['Space_Grotesk'] text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-[#ba9563]" />
                    <a href={`mailto:${COMPANY_PROFILE.email}`} className="hover:text-[#ba9563]">
                      {COMPANY_PROFILE.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-[#ba9563]" />
                    <a href={`tel:${COMPANY_PROFILE.phones[0]}`} className="hover:text-[#ba9563]">
                      {COMPANY_PROFILE.phones[0]}
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col space-y-4">
                <Link
                  href="/contact"
                  className="w-full bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-bold py-4 px-6 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg group text-center"
                >
                  <span>SUBMIT TENDER DOSSIER</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                <Link
                  href="/services"
                  className="w-full border border-slate-300 dark:border-[#434651] hover:border-[#ba9563] bg-white dark:bg-[#0b1a37] text-slate-900 dark:text-white font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-semibold py-4 px-6 transition-all duration-200 flex items-center justify-center space-x-2 text-center"
                >
                  <span>REVIEW TECHNICAL CAPABILITIES</span>
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
