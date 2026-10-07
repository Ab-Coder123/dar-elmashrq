import { Layers, CheckCircle2, Wrench, ShieldAlert, Cpu, Wind, Droplets } from 'lucide-react'
import type { Project } from '@dar-elmashrq/types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'

interface ProjectServicesProps {
  project: Project
}

export function ProjectServices({ project }: ProjectServicesProps) {
  const serviceIcons: Record<string, typeof Layers> = {
    'Civil Works': Layers,
    'Finishing': Wrench,
    'Electrical Works': Cpu,
    'Air Conditioning': Wind,
    'Fire Fighting': ShieldAlert,
    'Sanitary Works': Droplets,
  }

  return (
    <section className="relative py-16 md:py-24 border-b border-[#ba9563]/30 bg-[#09182f] text-white">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 border border-[#ba9563]/40 bg-[#0f2244] px-3 py-1 mb-3">
            <span className="w-2 h-2 bg-[#ba9563]" />
            <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
              SCOPE &amp; DISCIPLINES
            </span>
          </div>
          <h2 className="font-['Montserrat'] text-3xl sm:text-4xl text-white uppercase font-extrabold leading-tight">
            SERVICES DELIVERED <br />
            <span className="text-[#ba9563]">ON THIS CONTRACT</span>
          </h2>
          <p className="font-['Inter'] text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
            Directly executed by Dar El Mashrq’s specialized engineering divisions and certified field crews.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.services.map((service, idx) => {
            const IconComponent = serviceIcons[service] || Layers
            return (
              <div
                key={idx}
                className="bg-[#0b1a37] border border-[#ba9563]/30 p-6 relative group hover:border-[#ba9563] transition-colors shadow-sm"
              >
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#ba9563]/20">
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-bold">
                    DISCIPLINE // 0{idx + 1}
                  </span>
                  <IconComponent className="w-5 h-5 text-[#ba9563]" />
                </div>

                <h3 className="font-['Montserrat'] text-lg text-white font-bold uppercase mb-2 group-hover:text-[#ba9563] transition-colors">
                  {service}
                </h3>

                <p className="font-['Inter'] text-xs text-slate-300 leading-relaxed">
                  Full self-performance from initial site layout and structural compliance through final QA/QC commissioning.
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
