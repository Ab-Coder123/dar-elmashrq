'use client'

import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'
import { Globe2, MapPin, Building2, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/providers/LanguageProvider'

export function ProjectsRegionalSummary() {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  const regions = [
    {
      code: isAr ? 'السعودية' : 'KSA',
      country: isAr ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia',
      focus: isAr
        ? 'السوق الرئيسي // تجاري، صحي، مؤسسي وبنية تحتية'
        : 'Primary Sovereign Market // Commercial, Healthcare, Institutional & Infrastructure',
      highlights: isAr
        ? [
            'تطوير الواجهات والمشاريع التجارية (الرياض والعزيزة)',
            'المنشآت التدريبية والأمنية المؤسسية (المدينة المنورة والرياض)',
            'إنشاء المستشفيات والمراكز الطبية المتخصصة (مستشفى وي كير)',
            'البنية التحتية والمرافق البلدية الكبرى (رأس تنورة)',
          ]
        : [
            'Commercial Facades & Developments (Riyadh & Al-Azeeza)',
            'Institutional & Security Training Facilities (Madinah & Riyadh)',
            'Hospital & Medical Center Construction (Way Care)',
            'Heavy Infrastructure & Municipal Utilities (Ras Tanura)',
          ],
    },
    {
      code: isAr ? 'مصر' : 'EGY',
      country: isAr ? 'جمهورية مصر العربية' : 'Arab Republic of Egypt',
      focus: isAr
        ? 'مجمعات سكنية كبرى ومقاولات السلاسل التجارية'
        : 'High-Density Residential & Major Retail Contracting',
      highlights: isAr
        ? [
            'أكثر من 21 فرعاً لسلاسل التجزئة الكبرى (أولاد رجب 2010–2021)',
            'المخطط السكني العام لـ 30 عمارة (مدينة الشروق)',
            'مجمع عمارات قصر الحسيني (12 عمارة سكنية)',
            'توسعة وإعادة بناء مستشفى المراغة المركزي (سوهاج)',
          ]
        : [
            '21+ Retail Chain Branches (Awlad Ragab 2010–2021)',
            '30-Tower Residential Masterplan (Al-Shorouk City)',
            '12-Tower Residential Complex (Qasr Al-Husseini)',
            'Central Hospital Expansion (Al-Maraga, Sohag)',
          ],
    },
    {
      code: isAr ? 'قطر' : 'QAT',
      country: isAr ? 'دولة قطر' : 'State of Qatar',
      focus: isAr
        ? 'مشاريع سكنية خليجية وتطوير تجاري فاخر'
        : 'Gulf Residential & Bespoke Commercial Developments',
      highlights: isAr
        ? [
            'قصور وفلل سكنية فاخرة (منطقة المشاف)',
            'مبانٍ سكنية وتجارية متعددة الاستخدامات (موازار)',
            'مجمعات فلل متكاملة (منطقة الدخيل)',
            'تنفيذ كامل تسليم مفتاح للأعمال المدنية والتشطيبات',
          ]
        : [
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
            <div className="inline-flex items-center gap-2 border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] px-3 py-1 mb-4">
              <span className="w-2 h-2 bg-[#ba9563]" />
              <span className={`text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                {isAr ? 'مراكز التنفيذ الإقليمية' : 'REGIONAL EXECUTION HUBS'}
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold mb-4 leading-tight ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
              {isAr ? 'قدرة تنفيذية متكاملة عبر الدول' : 'MULTI-COUNTRY DELIVERY POWER'}
            </h2>
            <p className={`text-sm text-slate-600 dark:text-[#c4c6d2] ${isAr ? 'font-arabic tracking-normal' : "font-['Inter']"}`}>
              {isAr
                ? 'إمكانيات تنفيذ هيكلية وميدانية مدعومة بالاعتمادات النظامية وسلاسل الإمداد المتطورة في منطقة الشرق الأوسط.'
                : 'Structured execution capabilities grounded in local regulatory accreditations and established supply chains across the MENA region.'}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regions.map((reg, idx) => (
            <RevealOnScroll key={reg.code} variants={scaleInVariants} delay={idx * 0.1}>
              <div className="border border-slate-200 dark:border-[#ba9563]/30 bg-white dark:bg-[#0b1a37] p-6 sm:p-8 relative h-full flex flex-col justify-between shadow-sm hover:border-[#ba9563] transition-colors">
                <BlueprintCrosshair position={isAr ? 'top-right' : 'top-left'} />
                <BlueprintCrosshair position={isAr ? 'bottom-left' : 'bottom-right'} />

                <div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-[#434651]/40">
                    <span className={`text-sm font-extrabold text-[#ba9563] border border-[#ba9563]/40 px-2.5 py-1 ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                      {reg.code}
                    </span>
                    <Globe2 className="w-5 h-5 text-[#ba9563]" />
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold uppercase text-slate-950 dark:text-white mb-2 ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                    {reg.country}
                  </h3>

                  <p className={`text-xs text-slate-600 dark:text-[#c4c6d2] mb-6 leading-relaxed ${isAr ? 'font-arabic tracking-normal' : "font-['Inter']"}`}>
                    {reg.focus}
                  </p>

                  <div className="space-y-2.5">
                    {reg.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ba9563] shrink-0 mt-0.5" />
                        <span className={isAr ? 'font-arabic tracking-normal' : "font-['Inter']"}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`mt-8 pt-4 border-t border-slate-100 dark:border-[#434651]/30 flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                  <span>{isAr ? 'تراخيص نظامية معتمدة' : 'SOVEREIGN LICENSING'}</span>
                  <span className="text-[#ba9563] font-bold">{isAr ? 'تأسست 1994' : 'EST. 1994'}</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
