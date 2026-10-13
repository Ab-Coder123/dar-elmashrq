'use client'

import { ShieldCheck, MapPin, Building, Calendar, User, Coins } from 'lucide-react'
import type { Project } from '@dar-elmashrq/types'
import { PROJECT_CATEGORIES } from '@dar-elmashrq/types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { useLanguage } from '@/providers/LanguageProvider'

interface ProjectOverviewProps {
  project: Project
}

const CATEGORY_LABELS_AR: Record<string, string> = {
  commercial: 'قطاع تجاري وإداري',
  residential: 'مجمعات سكنية فاخرة',
  'government-institutional': 'مشاريع حكومية ومؤسسية',
  healthcare: 'منشآت طبية ومستشفيات',
  infrastructure: 'بنية تحتية ومحطات',
  hospitality: 'ضيافة وفنادق',
}

const COUNTRY_LABELS_AR: Record<string, string> = {
  'saudi-arabia': 'المملكة العربية السعودية',
  egypt: 'جمهورية مصر العربية',
  qatar: 'دولة قطر',
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  const displayCategory = isAr
    ? CATEGORY_LABELS_AR[project.category] || PROJECT_CATEGORIES[project.category]?.labelAr || project.category
    : project.category.toUpperCase()
  const displayCountry = isAr
    ? COUNTRY_LABELS_AR[project.country] || project.country
    : project.country.replace('-', ' ').toUpperCase()
  const displayLocation = isAr && project.locationAr ? project.locationAr : project.location

  return (
    <section className="relative py-16 md:py-24 border-b border-[#ba9563]/30 bg-[#0b1a37] text-white">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Heading & Datum Badge */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-2 border border-[#ba9563]/40 bg-[#0f2244] px-3 py-1">
              <span className="w-2 h-2 bg-[#ba9563]" />
              <span
                className={
                  isAr
                    ? "font-['Cairo'] text-xs uppercase text-[#ba9563] font-bold tracking-normal"
                    : "font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold"
                }
              >
                {isAr ? 'الملف التنفيذي المعتمد' : 'EXECUTIVE DOSSIER'}
              </span>
            </div>

            <h2
              className={
                isAr
                  ? "font-['Cairo'] text-2xl sm:text-3xl text-white font-extrabold leading-tight tracking-normal"
                  : "font-['Montserrat'] text-3xl sm:text-4xl text-white uppercase font-extrabold leading-tight"
              }
            >
              {isAr ? (
                <>
                  نظرة عامة على <br />
                  <span className="text-[#ba9563]">تفاصيل المشروع والتعاقد</span>
                </>
              ) : (
                <>
                  PROJECT <br />
                  <span className="text-[#ba9563]">OVERVIEW</span>
                </>
              )}
            </h2>

            <p
              className={
                isAr
                  ? "font-['Cairo'] text-xs sm:text-sm text-slate-300 leading-relaxed tracking-normal"
                  : "font-['Inter'] text-xs sm:text-sm text-slate-300 leading-relaxed"
              }
            >
              {isAr
                ? 'سجل تعاقدي رسمي موثق وفقاً لمعايير الحوكمة لشركة دار المشرق وتراخيص المقاولات المصنفة.'
                : 'Official contracting record verified under Dar El Mashrq governance standards and sovereign operational licensing.'}
            </p>
          </div>

          {/* Right Column: Narrative & Technical Metrics */}
          <div className="lg:col-span-8 space-y-8">
            {/* Narrative text */}
            <div className={isAr ? 'border-r-2 border-[#ba9563] pr-6 space-y-4' : 'border-l-2 border-[#ba9563] pl-6 space-y-4'}>
              <p
                className={
                  isAr
                    ? "font-['Cairo'] text-sm sm:text-base text-slate-200 leading-relaxed tracking-normal"
                    : "font-['Inter'] text-sm sm:text-base text-slate-200 leading-relaxed"
                }
              >
                {(isAr && project.descriptionAr) ||
                  project.description ||
                  (isAr
                    ? 'تم تنفيذ المشروع بموجب إشراف هندسي شامل ملتزم بأكواد البناء الإقليمية ومعايير الدفاع المدني والهيئات البلدية. قادت دار المشرق كافة العمليات الإنشائية، والتنسيق الكهروميكانيكي، والتشطيبات المعمارية الدقيقة.'
                    : 'Delivered under comprehensive engineering supervision adhering to regional building codes, municipal standards, and civil defense compliance. Dar El Mashrq managed all primary structural operations, electro-mechanical coordination, and high-tolerance architectural finishing.')}
              </p>
              {!isAr && project.descriptionAr && (
                <p className="font-['Cairo'] text-sm text-[#d4b27a] leading-relaxed pt-2 border-t border-[#ba9563]/20" dir="rtl">
                  {project.descriptionAr}
                </p>
              )}
            </div>

            {/* Structured Specifications Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-[#ba9563]/20">
              <div className="bg-[#0f2244] p-4 border border-[#ba9563]/30 relative">
                <BlueprintCrosshair position="top-left" />
                <span
                  className={
                    isAr
                      ? "font-['Cairo'] text-xs text-[#ba9563] font-bold block mb-1 tracking-normal"
                      : "font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1"
                  }
                >
                  {isAr ? 'الموقع الجغرافي والإقليم' : 'LOCATION & REGION'}
                </span>
                <div
                  className={
                    isAr
                      ? "font-['Cairo'] text-xs sm:text-sm text-white font-bold flex items-center gap-1.5 tracking-normal"
                      : "font-['Montserrat'] text-xs sm:text-sm text-white font-bold uppercase flex items-center gap-1.5"
                  }
                >
                  <MapPin className="w-3.5 h-3.5 text-[#ba9563]" />
                  <span>
                    {displayLocation}، {displayCountry}
                  </span>
                </div>
              </div>

              <div className="bg-[#0f2244] p-4 border border-[#ba9563]/30 relative">
                <BlueprintCrosshair position="top-left" />
                <span
                  className={
                    isAr
                      ? "font-['Cairo'] text-xs text-[#ba9563] font-bold block mb-1 tracking-normal"
                      : "font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1"
                  }
                >
                  {isAr ? 'قطاع المشروع' : 'SECTOR DISCIPLINE'}
                </span>
                <div
                  className={
                    isAr
                      ? "font-['Cairo'] text-xs sm:text-sm text-white font-bold tracking-normal"
                      : "font-['Montserrat'] text-xs sm:text-sm text-white font-bold uppercase"
                  }
                >
                  {displayCategory}
                </div>
              </div>

              <div className="bg-[#0f2244] p-4 border border-[#ba9563]/30 relative">
                <BlueprintCrosshair position="top-left" />
                <span
                  className={
                    isAr
                      ? "font-['Cairo'] text-xs text-[#ba9563] font-bold block mb-1 tracking-normal"
                      : "font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1"
                  }
                >
                  {isAr ? 'حالة التعاقد' : 'CONTRACT STATUS'}
                </span>
                <div
                  className={
                    isAr
                      ? "font-['Cairo'] text-xs sm:text-sm text-white font-bold flex items-center gap-1.5 tracking-normal"
                      : "font-['Montserrat'] text-xs sm:text-sm text-white font-bold uppercase flex items-center gap-1.5"
                  }
                >
                  <Calendar className="w-3.5 h-3.5 text-[#ba9563]" />
                  <span>
                    {project.year
                      ? isAr
                        ? `تم التسليم عام ${project.year}`
                        : `DELIVERED ${project.year}`
                      : isAr
                        ? 'مكتمل ومُسلَّم'
                        : 'COMPLETED & COMMISSIONED'}
                  </span>
                </div>
              </div>

              {project.clientName && (
                <div className="bg-[#0f2244] p-4 border border-[#ba9563]/30 relative sm:col-span-2 md:col-span-2">
                  <BlueprintCrosshair position="top-left" />
                  <span
                    className={
                      isAr
                        ? "font-['Cairo'] text-xs text-[#ba9563] font-bold block mb-1 tracking-normal"
                        : "font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1"
                    }
                  >
                    {isAr ? 'الجهة المالكة / العميل' : 'CLIENT / DEVELOPER ENTITY'}
                  </span>
                  <div
                    className={
                      isAr
                        ? "font-['Cairo'] text-xs sm:text-sm text-white font-bold flex items-center gap-1.5 tracking-normal"
                        : "font-['Montserrat'] text-xs sm:text-sm text-white font-bold uppercase flex items-center gap-1.5"
                    }
                  >
                    <User className="w-3.5 h-3.5 text-[#ba9563]" />
                    <span>{isAr && project.clientNameAr ? project.clientNameAr : project.clientName}</span>
                  </div>
                </div>
              )}

              {project.contractValue && (
                <div className="bg-[#0f2244] p-4 border border-[#ba9563]/30 relative sm:col-span-2 md:col-span-1">
                  <BlueprintCrosshair position="top-left" />
                  <span
                    className={
                      isAr
                        ? "font-['Cairo'] text-xs text-[#ba9563] font-bold block mb-1 tracking-normal"
                        : "font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1"
                    }
                  >
                    {isAr ? 'القيمة التعاقدية المعلنة' : 'DISCLOSED CONTRACT VALUE'}
                  </span>
                  <div className="font-mono text-xs sm:text-sm text-[#ba9563] font-bold uppercase flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5" />
                    <span>
                      {project.contractValue.amount.toLocaleString()}{' '}
                      {isAr && project.contractValue.currency === 'EGP'
                        ? 'جنيه'
                        : isAr && project.contractValue.currency === 'SAR'
                          ? 'ريال'
                          : project.contractValue.currency}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

