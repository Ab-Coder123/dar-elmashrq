'use client'

import { motion } from 'framer-motion'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

const REGIONS = [
  {
    country: 'Kingdom of Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    hub: 'Eastern Province Hub & Regional HQ',
    hubAr: 'مركز المنطقة الشرقية والمقر الإقليمي',
    address: 'Al-Shati Business Center, 8110 Prince Mohammed Bin Fahd Rd, Al-Shati Al-Sharqi, Dammam, Saudi Arabia',
    addressAr: 'مركز الشاطئ للأعمال، 8110 طريق الأمير محمد بن فهد، حي الشاطئ الشرقي، الدمام، السعودية',
    phone: ['+966 58 160 5812', '+966 54 882 1738', '+966 54 755 2373'],
    email: 'info@elmashrq.com',
    scope: 'General Contracting, EPC Turnkey Projects, Civil Defense Certified, GOSI & Monshaat Compliant',
    scopeAr: 'المقاولات العامة، مشاريع تسليم المفتاح EPC، الدفاع المدني المعتمد، والتأمينات الاجتماعية ومنشآت',
    badge: 'KSA HUB // EASTERN PROVINCE',
    badgeAr: 'المقر الرئيسي // الدمام',
    status: 'ACTIVE CORPORATE HUBS',
    statusAr: 'مراكز تشغيلية نشطة',
  },
  {
    country: 'Arab Republic of Egypt',
    countryAr: 'جمهورية مصر العربية',
    hub: 'Cairo Operations & Project Hub',
    hubAr: 'مركز العمليات والمشروعات — القاهرة',
    address: 'South 90th Street, 5th Settlement, New Cairo, Egypt',
    addressAr: 'شارع التسعين الجنوبي، التجمع الخامس، مصر',
    phone: ['+20 111 62 5555 6'],
    email: 'info@elmashrq.com',
    scope: 'Multi-Tower Housing, Mega Retail Chains, Medical Facilities & Heavy Structural Works',
    scopeAr: 'المجمعات السكنية والأبراج، السلاسل التجارية الكبرى، المرافق الطبية، والأعمال الإنشائية الثقيلة',
    badge: 'EGY HUB // REGIONAL',
    badgeAr: 'المركز الإقليمي // مصر',
    status: 'ACTIVE REGIONAL HUB',
    statusAr: 'مركز تشغيلي نشط',
  },
  {
    country: 'State of Qatar',
    countryAr: 'دولة قطر',
    hub: 'Doha Gulf Contracting Hub',
    hubAr: 'مركز مقاولات الخليج — الدوحة',
    address: 'Doha Metropolitan & Municipal Zones',
    addressAr: 'الدوحة والمناطق البلدية والاستثمارية',
    phone: ['+966 58 160 5812'],
    email: 'info@elmashrq.com',
    scope: 'Residential Complexes, Commercial Developments & Gulf Expansion Initiatives',
    scopeAr: 'المجمعات والفلل السكنية، المنشآت التجارية، ومشاريع التوسع الخليجي',
    badge: 'QAT HUB // EXPANSION',
    badgeAr: 'المركز الخليجي // قطر',
    status: 'ACTIVE GULF HUB',
    statusAr: 'مركز خليجي نشط',
  },
]

export function RegionalPresence() {
  const { locale, isRtl } = useLanguage()

  return (
    <section className="py-24 bg-slate-100/70 dark:bg-[#09182f] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-300 dark:border-[#434651]/50">
            <div>
              <div className="inline-flex items-center gap-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-arabic font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>{locale === 'ar' ? '07 // التواجد الإقليمي والتشغيلي' : '07 // OPERATIONAL FOOTPRINT'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-arabic">
                {locale === 'ar' ? 'الانتشار الإقليمي' : 'REGIONAL PRESENCE'}
              </h2>
            </div>
            <div className={`mt-4 md:mt-0 ${isRtl ? 'md:text-left text-right' : 'text-left md:text-right'}`}>
              <span className="font-arabic text-xl sm:text-2xl text-[#ba9563] font-bold block">
                {locale === 'ar' ? 'المملكة العربية السعودية • مصر • قطر' : 'SAUDI ARABIA • EGYPT • QATAR'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-arabic tracking-widest uppercase">
                {locale === 'ar' ? 'ثلاثة مقرات تشغيلية رسمية' : 'Three Regional Hubs'}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Regional Cards Grid */}
        <RevealChildren className="grid grid-cols-1 lg:grid-cols-3 gap-8" staggerDelay={0.12}>
          {REGIONS.map((region, idx) => {
            const country = locale === 'ar' ? region.countryAr : region.country
            const hub = locale === 'ar' ? region.hubAr : region.hub
            const address = locale === 'ar' ? region.addressAr : region.address
            const scope = locale === 'ar' ? region.scopeAr : region.scope
            const badge = locale === 'ar' ? region.badgeAr : region.badge
            const status = locale === 'ar' ? region.statusAr : region.status

            return (
              <motion.div
                key={idx}
                className="p-8 bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 flex flex-col justify-between relative shadow-md group"
                variants={fadeUpVariants}
              >
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                <div>
                  {/* Badge line */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-[#434651]/40">
                    <span className="text-[10px] font-arabic font-bold text-[#ba9563] uppercase tracking-wider bg-[#ba9563]/10 px-2.5 py-1 border border-[#ba9563]/30">
                      {badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-arabic font-bold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span>{status}</span>
                    </div>
                  </div>

                  {/* Country */}
                  <h3 className="font-arabic font-black text-xl text-slate-900 dark:text-white uppercase mb-2">
                    {country}
                  </h3>

                  <div className="font-arabic text-sm font-bold text-slate-700 dark:text-slate-300 uppercase mb-4">
                    {hub}
                  </div>

                  {/* Scope */}
                  <div className="p-3 bg-slate-50 dark:bg-[#0f2244] border border-slate-200 dark:border-[#434651]/40 mb-6">
                    <span className="text-[10px] font-arabic font-bold text-slate-500 uppercase block mb-1">
                      {locale === 'ar' ? 'نطاق التركيز التشغيلي:' : 'OPERATIONAL FOCUS:'}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-arabic leading-relaxed font-normal">
                      {scope}
                    </p>
                  </div>

                  {/* Contact Points */}
                  <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 font-arabic">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#ba9563] shrink-0 mt-0.5" />
                      <span>{address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#ba9563] shrink-0" />
                      <span dir="ltr">{region.phone.join(' / ')}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#ba9563] shrink-0" />
                      <span>{region.email}</span>
                    </div>
                  </div>
                </div>

                {/* Verified Sovereign Compliance Tag */}
                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-[#434651]/40 flex items-center justify-between text-[10px] font-arabic text-slate-400 font-bold">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ba9563]" />
                    <span>{locale === 'ar' ? 'كيان رسمي معتمد' : 'OFFICIALLY REGISTERED'}</span>
                  </span>
                  <span>{locale === 'ar' ? 'منذ عام 1994' : 'SINCE 1994'}</span>
                </div>
              </motion.div>
            )
          })}
        </RevealChildren>
      </div>
    </section>
  )
}
