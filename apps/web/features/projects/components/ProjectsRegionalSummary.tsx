import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'
import { Globe2, MapPin, Building2, CheckCircle2 } from 'lucide-react'

export function ProjectsRegionalSummary() {
  const regions = [
    {
      code: 'KSA',
      country: 'Kingdom of Saudi Arabia',
      focus: 'Primary Sovereign Market // Commercial, Healthcare, Institutional & Infrastructure',
      highlights: [
        'Commercial Facades & Developments (Riyadh & Al-Azeeza)',
        'Institutional & Security Training Facilities (Madinah & Riyadh)',
        'Hospital & Medical Center Construction (Way Care)',
        'Heavy Infrastructure & Municipal Utilities (Ras Tanura)',
      ],
    },
    {
      code: 'EGY',
      country: 'Arab Republic of Egypt',
      focus: 'High-Density Residential & Major Retail Contracting',
      highlights: [
        '21+ Retail Chain Branches (Awlad Ragab 2010–2021)',
        '30-Tower Residential Masterplan (Al-Shorouk City)',
        '12-Tower Residential Complex (Qasr Al-Husseini)',
        'Central Hospital Expansion (Al-Maraga, Sohag)',
      ],
    },
    {
      code: 'QAT',
      country: 'State of Qatar',
      focus: 'Gulf Residential & Bespoke Commercial Developments',
      highlights: [
        'Private Luxury Residential Estates (Al-Mishaf)',
        'Commercial & Residential Mixed-Use Assets (Muwazzar)',
        'Multi-Villa Compounds (Al-Dakheel)',
        'Full Turnkey Civil & Architectural Fit-Outs',
      ],
    },
  ]

  return (
    <section className="relative bg-slate-50 dark:bg-[#0f2244] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <RevealOnScroll variants={fadeUpVariants}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] px-3 py-1 mb-4">
              <span className="w-2 h-2 bg-[#ba9563]" />
              <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
                REGIONAL EXECUTION HUBS
              </span>
            </div>
            <h2 className="font-['Montserrat'] text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold mb-4 leading-tight">
              MULTI-COUNTRY DELIVERY POWER
            </h2>
            <p className="font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2]">
              Structured execution capabilities grounded in local regulatory accreditations and established supply chains across the MENA region.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regions.map((reg, idx) => (
            <RevealOnScroll key={reg.code} variants={scaleInVariants} delay={idx * 0.1}>
              <div className="border border-slate-200 dark:border-[#ba9563]/30 bg-white dark:bg-[#0b1a37] p-6 sm:p-8 relative h-full flex flex-col justify-between shadow-sm hover:border-[#ba9563] transition-colors">
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                <div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-[#434651]/40">
                    <span className="font-['Space_Grotesk'] text-sm font-extrabold text-[#ba9563] border border-[#ba9563]/40 px-2.5 py-1">
                      {reg.code}
                    </span>
                    <Globe2 className="w-5 h-5 text-[#ba9563]" />
                  </div>

                  <h3 className="font-['Montserrat'] text-lg sm:text-xl font-bold uppercase text-slate-950 dark:text-white mb-2">
                    {reg.country}
                  </h3>

                  <p className="font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2] mb-6 leading-relaxed">
                    {reg.focus}
                  </p>

                  <div className="space-y-2.5">
                    {reg.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start space-x-2 text-xs font-['Inter'] text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ba9563] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-[#434651]/30 flex items-center justify-between text-[10px] font-['Space_Grotesk'] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  <span>SOVEREIGN LICENSING</span>
                  <span className="text-[#ba9563] font-bold">EST. 1994</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
