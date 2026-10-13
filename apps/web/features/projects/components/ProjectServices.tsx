'use client'

import { Layers, CheckCircle2, Wrench, ShieldAlert, Cpu, Wind, Droplets } from 'lucide-react'
import type { Project } from '@dar-elmashrq/types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { useLanguage } from '@/providers/LanguageProvider'

interface ProjectServicesProps {
  project: Project
}

export function ProjectServices({ project }: ProjectServicesProps) {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  const serviceIcons: Record<string, typeof Layers> = {
    'Civil Works': Layers,
    Finishing: Wrench,
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
          <div className="inline-flex items-center gap-2 border border-[#ba9563]/40 bg-[#0f2244] px-3 py-1 mb-3">
            <span className="w-2 h-2 bg-[#ba9563]" />
            <span
              className={
                isAr
                  ? "font-['Cairo'] text-xs uppercase text-[#ba9563] font-bold tracking-normal"
                  : "font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold"
              }
            >
              {isAr ? 'نطاق وتخصصات العمل' : 'SCOPE & DISCIPLINES'}
            </span>
          </div>
          <h2
            className={
              isAr
                ? "font-['Cairo'] text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold leading-tight tracking-normal"
                : "font-['Montserrat'] text-3xl sm:text-4xl text-white uppercase font-extrabold leading-tight"
            }
          >
            {isAr ? (
              <>
                الخدمات الهندسية المنفذة <br />
                <span className="text-[#ba9563]">في هذا العقد الإنشائي</span>
              </>
            ) : (
              <>
                SERVICES DELIVERED <br />
                <span className="text-[#ba9563]">ON THIS CONTRACT</span>
              </>
            )}
          </h2>
          <p
            className={
              isAr
                ? "font-['Cairo'] text-xs sm:text-sm text-slate-300 mt-2 max-w-xl tracking-normal"
                : "font-['Inter'] text-xs sm:text-sm text-slate-300 mt-2 max-w-xl"
            }
          >
            {isAr
              ? 'تم تنفيذها مباشرة عبر الفرق الهندسية المتخصصة لشركة دار المشرق وطواقم العمل الميدانية المعتمدة.'
              : 'Directly executed by Dar El Mashrq’s specialized engineering divisions and certified field crews.'}
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
                  <span
                    className={
                      isAr
                        ? "font-['Cairo'] text-xs text-[#ba9563] font-bold tracking-normal"
                        : "font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-bold"
                    }
                  >
                    {isAr ? `البند التخصصي // 0${idx + 1}` : `DISCIPLINE // 0${idx + 1}`}
                  </span>
                  <IconComponent className="w-5 h-5 text-[#ba9563]" />
                </div>

                <h3
                  className={
                    isAr
                      ? "font-['Cairo'] text-base sm:text-lg text-white font-bold mb-2 group-hover:text-[#ba9563] transition-colors tracking-normal"
                      : "font-['Montserrat'] text-lg text-white font-bold uppercase mb-2 group-hover:text-[#ba9563] transition-colors"
                  }
                >
                  {service}
                </h3>

                <p
                  className={
                    isAr
                      ? "font-['Cairo'] text-xs text-slate-300 leading-relaxed tracking-normal"
                      : "font-['Inter'] text-xs text-slate-300 leading-relaxed"
                  }
                >
                  {isAr
                    ? 'تنفيذ ذاتي متكامل يشمل التخطيط المساحي، ومطابقة الكود الإنشائي، حتى الفحص وتسليم الجودة QA/QC.'
                    : 'Full self-performance from initial site layout and structural compliance through final QA/QC commissioning.'}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

