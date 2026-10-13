'use client'

import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'
import { Building2, MapPin, Mail, Phone } from 'lucide-react'
import { useLanguage } from '@/providers/LanguageProvider'
import type { RegionalOffice } from '../types'

interface ContactOfficesSectionProps {
  offices?: RegionalOffice[]
}

const DEFAULT_OFFICES: RegionalOffice[] = [
  {
    id: 'dammam-branch',
    city: 'Dammam',
    cityAr: 'الدمام',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    countryCode: 'SA',
    role: 'Eastern Province Hub — Business Center',
    roleAr: 'فرع المنطقة الشرقية — مركز الشاطئ للأعمال',
    address: 'Al-Shati Business Center, 8110 Prince Mohammed Bin Fahd Road, Al-Shati Al-Sharqi, Dammam, Saudi Arabia',
    addressAr: 'مركز الشاطئ للأعمال، 8110 طريق الأمير محمد بن فهد، حي الشاطئ الشرقي، الدمام، المملكة العربية السعودية',
    phone: '+966 58 160 5812',
    email: 'info@elmashrq.com',
  },
  {
    id: 'riyadh-hq',
    city: 'Riyadh',
    cityAr: 'الرياض',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    countryCode: 'SA',
    role: 'Headquarters',
    roleAr: 'المقر الرئيسي والإدارة العامة',
    address: 'Olaya District, Riyadh 12222, Saudi Arabia',
    addressAr: 'حي العليا، الرياض 12222، المملكة العربية السعودية',
    phone: '+966 58 160 5812',
    email: 'info@elmashrq.com',
  },
  {
    id: 'doha-gulf',
    city: 'Doha',
    cityAr: 'الدوحة',
    country: 'Qatar',
    countryAr: 'دولة قطر',
    countryCode: 'QA',
    role: 'Regional Office — Gulf',
    roleAr: 'المكتب الإقليمي — الخليج العربي',
    address: 'Doha, State of Qatar',
    addressAr: 'الدوحة، دولة قطر',
    phone: '+974 70 5555 73',
    email: 'r.hashim@elmashrq.com',
  },
  {
    id: 'cairo-regional',
    city: 'Cairo',
    cityAr: 'القاهرة',
    country: 'Egypt',
    countryAr: 'جمهورية مصر العربية',
    countryCode: 'EG',
    role: 'Regional Office — Egypt',
    roleAr: 'المكتب الإقليمي — جمهورية مصر العربية',
    address: 'Cairo, Arab Republic of Egypt',
    addressAr: 'القاهرة، جمهورية مصر العربية',
    email: 'info@elmashrq.com',
  },
]

export function ContactOfficesSection({ offices = DEFAULT_OFFICES }: ContactOfficesSectionProps) {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  return (
    <section className="relative bg-white dark:bg-[#0b1a37] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <RevealOnScroll variants={fadeUpVariants}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 border border-[#ba9563]/40 bg-slate-50 dark:bg-[#0f2244] px-3 py-1 mb-4">
              <span className="w-2 h-2 bg-[#ba9563]" />
              <span
                className={
                  isAr
                    ? "font-['Cairo'] text-xs uppercase tracking-normal text-[#ba9563] font-bold"
                    : "font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold"
                }
              >
                {isAr ? 'الانتشار الإقليمي والفروع' : 'REGIONAL FOOTPRINT'}
              </span>
            </div>
            <h2
              className={
                isAr
                  ? "font-['Cairo'] text-2xl sm:text-3xl lg:text-4xl text-slate-950 dark:text-white font-extrabold mb-4 leading-tight tracking-normal"
                  : "font-['Montserrat'] text-3xl sm:text-4xl text-slate-950 dark:text-white uppercase font-extrabold mb-4 leading-tight"
              }
            >
              {isAr ? 'المكاتب والمقرات التنفيذية الإقليمية' : 'REGIONAL EXECUTIVE OFFICES'}
            </h2>
            <p
              className={
                isAr
                  ? "font-['Cairo'] text-sm text-slate-600 dark:text-[#c4c6d2] tracking-normal"
                  : "font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2]"
              }
            >
              {isAr
                ? 'تحتفظ شركة دار المشرق بحضور إداري وتشغيلي رسمي ومراكز عمليات مسجلة عبر ثلاثة أسواق رئيسية في الشرق الأوسط.'
                : 'Dar El Mashrq maintains physical administrative presence and registered corporate operational hubs across three key Middle Eastern markets.'}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((office, idx) => (
            <RevealOnScroll key={office.id} variants={scaleInVariants} delay={idx * 0.1}>
              <div className="border border-slate-200 dark:border-[#434651]/50 bg-slate-50 dark:bg-[#0f2244] p-6 sm:p-8 relative h-full flex flex-col justify-between hover:border-[#ba9563]/60 transition-colors shadow-sm">
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-[#434651]/40">
                    <div className="flex items-center gap-3">
                      <span className="font-['Space_Grotesk'] text-xs text-[#ba9563] font-bold border border-[#ba9563]/40 px-2 py-0.5">
                        {office.countryCode}
                      </span>
                      <h3
                        className={
                          isAr
                            ? "font-['Cairo'] text-lg sm:text-xl font-bold text-slate-950 dark:text-white tracking-normal"
                            : "font-['Montserrat'] text-xl font-bold uppercase text-slate-950 dark:text-white"
                        }
                      >
                        {isAr && office.cityAr ? office.cityAr : office.city}
                      </h3>
                    </div>
                    <Building2 className="w-5 h-5 text-[#ba9563]" />
                  </div>

                  <p
                    className={
                      isAr
                        ? "font-['Cairo'] text-xs font-bold text-[#ba9563] mb-4 tracking-normal"
                        : "font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider text-[#ba9563] mb-4"
                    }
                  >
                    {isAr && office.roleAr ? office.roleAr : office.role}
                  </p>

                  <div
                    className={
                      isAr
                        ? "space-y-3 font-['Cairo'] text-xs text-slate-600 dark:text-[#c4c6d2] tracking-normal"
                        : "space-y-3 font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2]"
                    }
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#ba9563] shrink-0 mt-0.5" />
                      <span>{isAr && office.addressAr ? office.addressAr : office.address}</span>
                    </div>

                    {office.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#ba9563] shrink-0" />
                        <a href={`tel:${office.phone}`} className="hover:text-[#ba9563] font-mono" dir="ltr">
                          {office.phone}
                        </a>
                      </div>
                    )}

                    {office.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#ba9563] shrink-0" />
                        <a href={`mailto:${office.email}`} className="hover:text-[#ba9563] font-mono">
                          {office.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={
                    isAr
                      ? "mt-8 pt-4 border-t border-slate-200 dark:border-[#434651]/30 flex items-center justify-between text-xs font-['Cairo'] text-slate-400 dark:text-slate-500 tracking-normal"
                      : "mt-8 pt-4 border-t border-slate-200 dark:border-[#434651]/30 flex items-center justify-between text-[10px] font-['Space_Grotesk'] text-slate-400 dark:text-slate-500 uppercase tracking-widest"
                  }
                >
                  <span>{isAr ? 'مركز معتمد رسمياً' : 'CONFIRMED HUB'}</span>
                  <span className="text-[#ba9563] font-bold">
                    {isAr && office.countryAr ? office.countryAr : office.country}
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

