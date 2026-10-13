'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, MapPin, Building, Calendar, Layers, ShieldCheck, User, Coins, Send } from 'lucide-react'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { useLanguage } from '@/providers/LanguageProvider'
import type { Project } from '@dar-elmashrq/types'
import { PROJECT_CATEGORIES } from '@dar-elmashrq/types'

interface ProjectDetailClientViewProps {
  project: Project
  imageUrl: string
}

const CATEGORY_TRANSLATIONS: Record<string, { ar: string; en: string }> = {
  commercial: { ar: 'قطاع تجاري وإداري', en: 'COMMERCIAL' },
  residential: { ar: 'مجمعات سكنية فاخرة', en: 'RESIDENTIAL' },
  'government-institutional': { ar: 'مشاريع حكومية ومؤسسية', en: 'GOVERNMENT & INSTITUTIONAL' },
  healthcare: { ar: 'منشآت طبية ومستشفيات', en: 'HEALTHCARE' },
  infrastructure: { ar: 'بنية تحتية ومحطات', en: 'INFRASTRUCTURE' },
  hospitality: { ar: 'ضيافة وفنادق', en: 'HOSPITALITY' },
}

const COUNTRY_TRANSLATIONS: Record<string, { ar: string; en: string }> = {
  'saudi-arabia': { ar: 'المملكة العربية السعودية', en: 'SAUDI ARABIA' },
  egypt: { ar: 'جمهورية مصر العربية', en: 'EGYPT' },
  qatar: { ar: 'دولة قطر', en: 'QATAR' },
}

export function ProjectDetailClientView({ project, imageUrl }: ProjectDetailClientViewProps) {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  const countryInfo = COUNTRY_TRANSLATIONS[project.country] || {
    ar: project.country,
    en: project.country.replace('-', ' ').toUpperCase(),
  }

  const categoryInfo = CATEGORY_TRANSLATIONS[project.category] || {
    ar: PROJECT_CATEGORIES[project.category]?.labelAr || project.category,
    en: PROJECT_CATEGORIES[project.category]?.label || project.category.toUpperCase(),
  }

  const displayName = isAr && project.nameAr ? project.nameAr : project.name
  const displaySecondaryName = isAr ? project.name : project.nameAr
  const displayLocation = isAr && project.locationAr ? project.locationAr : project.location
  const displayCountry = isAr ? countryInfo.ar : countryInfo.en
  const displayCategory = isAr ? categoryInfo.ar : categoryInfo.en
  const displayDescription = isAr && project.descriptionAr ? project.descriptionAr : project.description

  return (
    <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
      {/* Back to archive link */}
      <div className="mb-8">
        <Link
          href="/projects"
          className={
            isAr
              ? "inline-flex items-center gap-2 font-['Cairo'] text-xs sm:text-sm text-[#ba9563] hover:text-slate-900 dark:hover:text-white transition-colors font-bold tracking-normal"
              : "inline-flex items-center gap-2 font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] text-[#ba9563] hover:text-slate-900 dark:hover:text-white transition-colors font-bold"
          }
        >
          {isAr ? (
            <>
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى أرشيف المشاريع وسجل التعاقدات الرئيسي</span>
            </>
          ) : (
            <>
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO MASTER PORTFOLIO ARCHIVE</span>
            </>
          )}
        </Link>
      </div>

      <div className="border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] relative shadow-2xl overflow-hidden">
        <BlueprintCrosshair position="top-left" />
        <BlueprintCrosshair position="top-right" />
        <BlueprintCrosshair position="bottom-left" />
        <BlueprintCrosshair position="bottom-right" />

        {/* Cinematic Hero Image */}
        <div className="relative h-80 sm:h-96 md:h-[480px] w-full bg-slate-950">
          <Image
            src={imageUrl}
            alt={displayName}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Status Pill */}
          <div
            className={
              isAr
                ? "absolute top-6 right-6 bg-[#ba9563] text-[#0b1a37] px-3.5 py-1.5 font-['Cairo'] text-xs font-extrabold shadow-md tracking-normal"
                : "absolute top-6 left-6 bg-[#ba9563] text-[#0b1a37] px-3.5 py-1.5 font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] font-extrabold shadow-md"
            }
          >
            {isAr
              ? `سجل تعاقدي رسمي // كود المشروع: ${String(project.id).toUpperCase()}`
              : `OFFICIAL CONTRACT RECORD // ${String(project.id).toUpperCase()}`}
          </div>

          {/* Title & Category */}
          <div
            className={
              isAr
                ? "absolute bottom-8 right-6 sm:right-10 left-6 sm:left-10 text-right"
                : "absolute bottom-8 left-6 sm:left-10 right-6 sm:right-10 text-left"
            }
          >
            <span
              className={
                isAr
                  ? "font-['Cairo'] text-xs text-[#ba9563] font-bold block mb-2 tracking-normal"
                  : "font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-semibold block mb-2"
              }
            >
              {displayCategory} // {displayCountry}
            </span>
            <h1
              className={
                isAr
                  ? "font-['Cairo'] text-2xl sm:text-4xl md:text-5xl text-white font-extrabold leading-tight drop-shadow-md tracking-normal"
                  : "font-['Montserrat'] text-3xl sm:text-4xl md:text-6xl text-white font-extrabold uppercase leading-tight drop-shadow-md"
              }
            >
              {displayName}
            </h1>
            {displaySecondaryName && (
              <p
                className={
                  isAr
                    ? "font-['Montserrat'] text-sm sm:text-base text-slate-300 mt-2 font-semibold"
                    : "font-['Cairo'] text-lg text-slate-300 mt-2 tracking-normal"
                }
              >
                {displaySecondaryName}
              </p>
            )}
          </div>
        </div>

        {/* Dossier Body */}
        <div className="p-6 sm:p-10 md:p-14 space-y-10">
          {/* Narrative & Scope */}
          <div>
            <div className="inline-flex items-center gap-2 text-[#ba9563] mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span
                className={
                  isAr
                    ? "font-['Cairo'] text-xs text-[#ba9563] font-bold tracking-normal"
                    : "font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-semibold"
                }
              >
                {isAr ? 'حوكمة التنفيذ الإنشائي والتعاقدي' : 'STRUCTURAL & CONTRACTING EXECUTION'}
              </span>
            </div>
            <p
              className={
                isAr
                  ? "font-['Cairo'] text-sm sm:text-base md:text-lg text-slate-700 dark:text-[#c4c6d2] leading-relaxed max-w-4xl tracking-normal"
                  : "font-['Inter'] text-sm sm:text-base md:text-lg text-slate-700 dark:text-[#c4c6d2] leading-relaxed max-w-4xl"
              }
            >
              {displayDescription ||
                (isAr
                  ? 'تم تنفيذ المشروع بموجب حوكمة هندسية دقيقة متوافقة مع الكود الإنشائي المعتمد، ومتطلبات الدفاع المدني، واللوائح البلدية في المنطقة. تولت دار المشرق إدارة العمليات الهيكلية والأعمال الكهروميكانيكية والتشطيبات المعمارية الدقيقة.'
                  : 'Delivered under comprehensive engineering governance adhering to regional building codes, municipal standards, and civil defense compliance. Dar El Mashrq managed all primary structural operations, electro-mechanical coordination, and high-tolerance architectural finishing.')}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h2
              className={
                isAr
                  ? "font-['Cairo'] text-xs uppercase text-[#ba9563] font-bold mb-6 pb-2 border-b border-slate-200 dark:border-[#434651]/40 tracking-normal"
                  : "font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-bold mb-6 pb-2 border-b border-slate-200 dark:border-[#434651]/40"
              }
            >
              {isAr ? 'المواصفات الفنية والمؤشرات الهندسية' : 'TECHNICAL METRICS & SPECIFICATIONS'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Location */}
              <div className="bg-slate-50 dark:bg-[#0f2244] p-5 border border-slate-200 dark:border-[#434651]/50">
                <span
                  className={
                    isAr
                      ? "font-['Cairo'] text-xs text-[#ba9563] font-bold block mb-1 tracking-normal"
                      : "font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1"
                  }
                >
                  {isAr ? 'الموقع الجغرافي' : 'LOCATION'}
                </span>
                <div
                  className={
                    isAr
                      ? "font-['Cairo'] text-sm text-slate-900 dark:text-white font-bold flex items-center gap-1.5 tracking-normal"
                      : "font-['Montserrat'] text-sm text-slate-900 dark:text-white font-bold uppercase flex items-center gap-1.5"
                  }
                >
                  <MapPin className="w-4 h-4 text-[#ba9563]" />
                  <span>{displayLocation}</span>
                </div>
              </div>

              {/* Sector */}
              <div className="bg-slate-50 dark:bg-[#0f2244] p-5 border border-slate-200 dark:border-[#434651]/50">
                <span
                  className={
                    isAr
                      ? "font-['Cairo'] text-xs text-[#ba9563] font-bold block mb-1 tracking-normal"
                      : "font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1"
                  }
                >
                  {isAr ? 'تصنيف القطاع' : 'SECTOR'}
                </span>
                <div
                  className={
                    isAr
                      ? "font-['Cairo'] text-sm text-slate-900 dark:text-white font-bold tracking-normal"
                      : "font-['Montserrat'] text-sm text-slate-900 dark:text-white font-bold uppercase"
                  }
                >
                  {displayCategory}
                </div>
              </div>

              {/* Status */}
              <div className="bg-slate-50 dark:bg-[#0f2244] p-5 border border-slate-200 dark:border-[#434651]/50">
                <span
                  className={
                    isAr
                      ? "font-['Cairo'] text-xs text-[#ba9563] font-bold block mb-1 tracking-normal"
                      : "font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1"
                  }
                >
                  {isAr ? 'حالة التعاقد والتسليم' : 'EXECUTION STATUS'}
                </span>
                <div
                  className={
                    isAr
                      ? "font-['Cairo'] text-sm text-slate-900 dark:text-white font-bold flex items-center gap-1.5 tracking-normal"
                      : "font-['Montserrat'] text-sm text-slate-900 dark:text-white font-bold uppercase flex items-center gap-1.5"
                  }
                >
                  <Calendar className="w-4 h-4 text-[#ba9563]" />
                  <span>
                    {project.year
                      ? isAr
                        ? `تم الإنجاز والتسليم في عام ${project.year}`
                        : `DELIVERED ${project.year}`
                      : isAr
                        ? 'مكتمل ومُسلَّم بالكامل'
                        : 'COMPLETED & HANDED OVER'}
                  </span>
                </div>
              </div>

              {/* Territory */}
              <div className="bg-slate-50 dark:bg-[#0f2244] p-5 border border-slate-200 dark:border-[#434651]/50">
                <span
                  className={
                    isAr
                      ? "font-['Cairo'] text-xs text-[#ba9563] font-bold block mb-1 tracking-normal"
                      : "font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1"
                  }
                >
                  {isAr ? 'الدولة / الإقليم' : 'TERRITORY'}
                </span>
                <div
                  className={
                    isAr
                      ? "font-['Cairo'] text-sm text-slate-900 dark:text-white font-bold tracking-normal"
                      : "font-['Montserrat'] text-sm text-slate-900 dark:text-white font-bold uppercase"
                  }
                >
                  {displayCountry}
                </div>
              </div>

              {/* Client */}
              {project.clientName && (
                <div className="bg-slate-50 dark:bg-[#0f2244] p-5 border border-slate-200 dark:border-[#434651]/50 sm:col-span-2">
                  <span
                    className={
                      isAr
                        ? "font-['Cairo'] text-xs text-[#ba9563] font-bold block mb-1 tracking-normal"
                        : "font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1"
                    }
                  >
                    {isAr ? 'العميل / الجهة المالكة' : 'CLIENT / STAKEHOLDER'}
                  </span>
                  <div
                    className={
                      isAr
                        ? "font-['Cairo'] text-sm text-slate-900 dark:text-white font-bold flex items-center gap-1.5 tracking-normal"
                        : "font-['Montserrat'] text-sm text-slate-900 dark:text-white font-bold uppercase flex items-center gap-1.5"
                    }
                  >
                    <User className="w-4 h-4 text-[#ba9563]" />
                    <span>{isAr && project.clientNameAr ? project.clientNameAr : project.clientName}</span>
                  </div>
                </div>
              )}

              {/* Contract Value */}
              {project.contractValue && (
                <div className="bg-slate-50 dark:bg-[#0f2244] p-5 border border-slate-200 dark:border-[#434651]/50 sm:col-span-2">
                  <span
                    className={
                      isAr
                        ? "font-['Cairo'] text-xs text-[#ba9563] font-bold block mb-1 tracking-normal"
                        : "font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1"
                    }
                  >
                    {isAr ? 'القيمة التعاقدية المسجلة' : 'RECORDED CONTRACT VALUE'}
                  </span>
                  <div className="font-mono text-sm text-slate-900 dark:text-white font-bold flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-[#ba9563]" />
                    <span>
                      {project.contractValue.amount.toLocaleString()}{' '}
                      {isAr && project.contractValue.currency === 'EGP'
                        ? 'جنيه مصري'
                        : isAr && project.contractValue.currency === 'SAR'
                          ? 'ريال سعودي'
                          : project.contractValue.currency}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Services & Disciplines */}
          <div>
            <h2
              className={
                isAr
                  ? "font-['Cairo'] text-xs uppercase text-[#ba9563] font-bold mb-4 pb-2 border-b border-slate-200 dark:border-[#434651]/40 tracking-normal"
                  : "font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-bold mb-4 pb-2 border-b border-slate-200 dark:border-[#434651]/40"
              }
            >
              {isAr ? 'الأعمال والخدمات المنفذة ضمن نطاق العقد' : 'SERVICES DELIVERED ON THIS CONTRACT'}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-slate-100 dark:bg-[#0f2244] border border-[#ba9563]/40 px-4 py-2"
                >
                  <Layers className="w-4 h-4 text-[#ba9563]" />
                  <span
                    className={
                      isAr
                        ? "font-['Cairo'] text-xs text-slate-900 dark:text-white font-bold tracking-normal"
                        : "font-['Space_Grotesk'] text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold"
                    }
                  >
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action bar */}
          <div className="pt-8 border-t border-slate-200 dark:border-[#434651]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className={
                  isAr
                    ? "font-['Cairo'] text-lg sm:text-xl font-bold text-slate-950 dark:text-white mb-1 tracking-normal"
                    : "font-['Montserrat'] text-xl font-bold uppercase text-slate-950 dark:text-white mb-1"
                }
              >
                {isAr ? 'هل لديك متطلبات تطوير أو مشروع إنشائي مماثل؟' : 'HAVE A SIMILAR DEVELOPMENT REQUIREMENT?'}
              </h3>
              <p
                className={
                  isAr
                    ? "font-['Cairo'] text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] tracking-normal"
                    : "font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2]"
                }
              >
                {isAr
                  ? 'تواصل مع إدارتنا الفنية والتسعيرية للتأهيل المسبق للمناقصات والبدء في الإجراءات التعاقدية.'
                  : 'Contact our estimating and engineering department for tender pre-qualification and joint execution.'}
              </p>
            </div>

            <Link
              href="/contact"
              className={
                isAr
                  ? "w-full sm:w-auto bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Cairo'] text-xs sm:text-sm font-bold px-8 py-4 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shrink-0 tracking-normal"
                  : "w-full sm:w-auto bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-bold px-8 py-4 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shrink-0"
              }
            >
              <span>{isAr ? 'تقديم طلب عرض سعر // مناقصة' : 'SUBMIT PROJECT RFP'}</span>
              <Send className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
