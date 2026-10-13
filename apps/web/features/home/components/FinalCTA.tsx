'use client'

import { useState } from 'react'
import { Send, CheckCircle2, Phone, Mail, Building } from 'lucide-react'
import { motion } from 'framer-motion'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { COMPANY_PROFILE } from '@/config/site'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

export function FinalCTA() {
  const { locale } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    territory: 'Saudi Arabia (Kingdom-wide)',
    scope: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const badgeText =
    locale === 'ar'
      ? 'بدء الشراكة // استفسارات المناقصات والمشاريع'
      : 'INITIATE PARTNERSHIP // TENDER INQUIRY'

  const mainHeading =
    locale === 'ar'
      ? 'لنقم ببناء صرح هندسي استثنائي معاً.'
      : 'LET’S BUILD SOMETHING SIGNIFICANT.'

  const mainDesc =
    locale === 'ar'
      ? 'تواصل مباشرة مع كبار مهندسي التقدير والتصميم الإنشائي لدينا لمناقشة المخططات الكبرى، ملفات التأهيل، وشراكات تسليم المفتاح EPC عبر المنطقة.'
      : 'Engage our senior estimating and structural engineering team directly for master plans, tender submissions, and turnkey EPC collaborations across the region.'

  const inqLabel = locale === 'ar' ? 'الاستفسارات المركزية' : 'CENTRAL INQUIRIES'
  const hqLabel = locale === 'ar' ? 'المقر الرئيسي بالرياض' : 'RIYADH HEADQUARTERS'

  const addressLine =
    locale === 'ar'
      ? `${COMPANY_PROFILE.address.district}، ${COMPANY_PROFILE.address.city}، المملكة العربية السعودية`
      : `${COMPANY_PROFILE.address.district}, ${COMPANY_PROFILE.address.city}, ${COMPANY_PROFILE.address.country}`

  return (
    <section className="relative bg-slate-50 dark:bg-[#0f2244] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300" id="contact">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <RevealOnScroll variants={scaleInVariants} threshold={0.1}>
          <div className="border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] p-6 sm:p-10 md:p-14 relative shadow-2xl">
            <BlueprintCrosshair position="top-left" />
            <BlueprintCrosshair position="top-right" />
            <BlueprintCrosshair position="bottom-left" />
            <BlueprintCrosshair position="bottom-right" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Narrative & Contact Coordinates */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 border border-[#ba9563]/40 bg-slate-50 dark:bg-[#0f2244] px-3 py-1 mb-4">
                  <span className="w-2 h-2 bg-[#ba9563]" />
                  <span className="font-arabic text-[11px] uppercase tracking-wider text-[#ba9563] font-bold">
                    {badgeText}
                  </span>
                </div>

                <h2 className="font-arabic text-2xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold mb-4 leading-tight">
                  {mainHeading}
                </h2>

                <p className="font-arabic text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] mb-8 max-w-xl leading-relaxed font-normal">
                  {mainDesc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-200 dark:border-[#434651]/40 pt-6">
                  <div>
                    <span className="font-arabic text-[11px] text-[#ba9563] uppercase tracking-wider block mb-1 flex items-center gap-1.5 font-bold">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span>{inqLabel}</span>
                    </span>
                    <a
                      href={`mailto:${COMPANY_PROFILE.email}`}
                      className="font-mono text-xs sm:text-sm text-slate-900 dark:text-white hover:text-[#ba9563] transition-colors"
                      dir="ltr"
                    >
                      {COMPANY_PROFILE.email}
                    </a>
                  </div>

                  <div>
                    <span className="font-arabic text-[11px] text-[#ba9563] uppercase tracking-wider block mb-1 flex items-center gap-1.5 font-bold">
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>{hqLabel}</span>
                    </span>
                    <a
                      href={`tel:${COMPANY_PROFILE.phones[0]}`}
                      className="font-['Space_Grotesk'] text-sm text-slate-900 dark:text-white hover:text-[#ba9563] transition-colors"
                      dir="ltr"
                    >
                      {COMPANY_PROFILE.phones[0]}
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#434651]/30 flex items-center gap-2 text-xs text-slate-500 dark:text-[#8e909c] font-arabic font-medium">
                  <Building className="w-3.5 h-3.5 text-[#ba9563] shrink-0" />
                  <span>{addressLine}</span>
                </div>
              </div>

              {/* Right Welded Blueprint Tender Form */}
              <div className="lg:col-span-5 border border-[#ba9563]/30 p-6 md:p-8 bg-slate-50 dark:bg-[#0f2244]/80 relative shadow-lg">
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                {submitted ? (
                  <div className="py-10 text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-[#ba9563] mx-auto" />
                    <h3 className="font-arabic text-xl text-slate-950 dark:text-white font-extrabold uppercase">
                      {locale === 'ar' ? 'تم استلام طلبكم بنجاح' : 'Dossier Received'}
                    </h3>
                    <p className="font-arabic text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] leading-relaxed">
                      {locale === 'ar'
                        ? 'سيقوم فريق التقديرات والهندسة التنفيذية بمكتب الرياض بمراجعة متطلباتكم والتواصل معكم خلال 24 ساعة عمل.'
                        : 'Our estimating and executive engineering desk in Riyadh will review your requirements and respond within 24 business hours.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 font-arabic text-xs text-[#ba9563] uppercase tracking-wider border-b border-[#ba9563] pb-1 font-bold cursor-pointer"
                    >
                      {locale === 'ar' ? 'إرسال طلب آخر' : 'Submit another inquiry'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block font-arabic text-xs uppercase tracking-wider text-[#ba9563] mb-1.5 font-bold">
                        {locale === 'ar' ? 'اسم المسؤول / الجهة المالكة *' : 'Executive / Organization Name *'}
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={locale === 'ar' ? 'مثال: شركة التطوير العقاري' : 'e.g. Al-Rashid Development'}
                        className="w-full bg-white dark:bg-[#0b1a37] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-arabic text-xs px-4 py-3 rounded-none outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-arabic text-xs uppercase tracking-wider text-[#ba9563] mb-1.5 font-bold">
                        {locale === 'ar' ? 'البريد الإلكتروني الرسمي *' : 'Corporate Email *'}
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="executive@company.com"
                        className="w-full bg-white dark:bg-[#0b1a37] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-mono text-xs px-4 py-3 rounded-none outline-none transition-colors"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block font-arabic text-xs uppercase tracking-wider text-[#ba9563] mb-1.5 font-bold">
                        {locale === 'ar' ? 'نطاق وتواجد المشروع *' : 'Project Territory *'}
                      </label>
                      <select
                        value={formData.territory}
                        onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                        className="w-full bg-white dark:bg-[#0b1a37] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-arabic text-xs px-4 py-3 rounded-none outline-none transition-colors"
                      >
                        <option value="Saudi Arabia (Kingdom-wide)">
                          {locale === 'ar' ? 'المملكة العربية السعودية (كافة المناطق)' : 'Saudi Arabia (Kingdom-wide)'}
                        </option>
                        <option value="Arab Republic of Egypt">
                          {locale === 'ar' ? 'جمهورية مصر العربية' : 'Arab Republic of Egypt'}
                        </option>
                        <option value="State of Qatar">
                          {locale === 'ar' ? 'دولة قطر' : 'State of Qatar'}
                        </option>
                        <option value="Cross-Border / MENA Region">
                          {locale === 'ar' ? 'منطقة الشرق الأوسط وشمال أفريقيا' : 'Cross-Border / MENA Region'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-arabic text-xs uppercase tracking-wider text-[#ba9563] mb-1.5 font-bold">
                        {locale === 'ar' ? 'نطاق الأعمال والمتطلبات الهندسية *' : 'Scope & Engineering Requirement *'}
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        placeholder={
                          locale === 'ar'
                            ? 'حدد الحجم الإنشائي، التخصصات المطلوبة، والجدول الزمني المستهدف...'
                            : 'Outline structural scale, civil disciplines, tender deadlines...'
                        }
                        className="w-full bg-white dark:bg-[#0b1a37] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-arabic text-xs px-4 py-3 rounded-none outline-none resize-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-arabic text-xs sm:text-sm uppercase tracking-wider font-extrabold py-4 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>{locale === 'ar' ? 'إرسال طلب التأهيل والمناقصة' : 'SUBMIT PRE-QUALIFICATION DOSSIER'}</span>
                      <Send className="w-4 h-4 text-[#0b1a37] shrink-0 rtl:rotate-180" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
