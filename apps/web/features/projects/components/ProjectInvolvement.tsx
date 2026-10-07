import { ShieldCheck, HardHat, Compass, FileSpreadsheet, CheckCircle, Scale, Truck } from 'lucide-react'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'

export function ProjectInvolvement() {
  const divisions = [
    {
      role: 'EXECUTIVE PROJECT MANAGEMENT',
      desc: 'Central coordination, baseline milestone tracking, and stakeholder reporting.',
      icon: HardHat,
    },
    {
      role: 'ENGINEERING & BIM DESIGN',
      desc: 'Clash detection, structural calculations, and shop drawing preparation.',
      icon: Compass,
    },
    {
      role: 'FIELD SITE MANAGEMENT',
      desc: 'Full-time licensed resident engineers directing daily civil & MEP execution.',
      icon: CheckCircle,
    },
    {
      role: 'QUALITY ASSURANCE & QA/QC',
      desc: 'Material sampling, pressure testing, and certified structural inspections.',
      icon: ShieldCheck,
    },
    {
      role: 'CONTRACTS & ESTIMATING',
      desc: 'BOQ compliance, variation controls, and procurement governance.',
      icon: Scale,
    },
    {
      role: 'SUPPLY CHAIN & PROCUREMENT',
      desc: 'Direct factory sourcing of raw materials, MEP equipment, and finishing stone.',
      icon: Truck,
    },
  ]

  return (
    <section className="relative py-16 md:py-24 border-b border-[#ba9563]/30 bg-[#09182f] text-white">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 border border-[#ba9563]/40 bg-[#0f2244] px-3 py-1 mb-3">
            <span className="w-2 h-2 bg-[#ba9563]" />
            <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
              ORGANIZATIONAL GOVERNANCE
            </span>
          </div>
          <h2 className="font-['Montserrat'] text-3xl sm:text-4xl text-white uppercase font-extrabold leading-tight">
            PROJECT EXECUTION <br />
            <span className="text-[#ba9563]">ORGANIZATIONAL DIVISIONS</span>
          </h2>
          <p className="font-['Inter'] text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
            Multi-disciplinary departmental functions deployed under single-point corporate accountability.
          </p>
        </div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((div, idx) => {
            const Icon = div.icon
            return (
              <div
                key={idx}
                className="bg-[#0b1a37] border border-[#ba9563]/30 p-6 relative group hover:border-[#ba9563] transition-colors shadow-sm"
              >
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#ba9563]/20">
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-bold">
                    FUNCTION // 0{idx + 1}
                  </span>
                  <Icon className="w-5 h-5 text-[#ba9563]" />
                </div>

                <h3 className="font-['Montserrat'] text-base sm:text-lg text-white font-bold uppercase mb-2 group-hover:text-[#ba9563] transition-colors">
                  {div.role}
                </h3>

                <p className="font-['Inter'] text-xs text-slate-300 leading-relaxed">
                  {div.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
