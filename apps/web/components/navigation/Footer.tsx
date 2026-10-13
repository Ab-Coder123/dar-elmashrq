'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Building2, Compass, ShieldCheck, Ruler } from 'lucide-react'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { COMPANY_PROFILE } from '@/config/site'
import { useLanguage } from '@/providers/LanguageProvider'

export function Footer() {
  const { locale, isRtl } = useLanguage()

  const brandDesc =
    locale === 'ar'
      ? 'صرح رائد في الهندسة المدنية والمعمارية والحلول الكهروميكانيكية المتكاملة. نقدم معايير سيادية وتميزاً إنشائياً في دول مجلس التعاون وشمال أفريقيا منذ 1994.'
      : 'A tier-one civil, architectural, and electro-mechanical engineering powerhouse. Delivering sovereign value and structural excellence across the GCC and North Africa.'

  const regionalTitle = locale === 'ar' ? 'المكاتب والفروع الإقليمية' : 'Regional Bureaus'
  const officeDammam = locale === 'ar' ? 'مركز الشاطئ للأعمال، الدمام' : 'Al-Shati Business Center, Dammam'
  const officeCairo = locale === 'ar' ? 'شارع التسعين الجنوبي، التجمع الخامس، مصر' : 'South 90th St, New Cairo'
  const officeDoha = locale === 'ar' ? 'مركز العمليات، الدوحة' : 'Doha Operational Hub'

  const complianceTitle = locale === 'ar' ? 'المعايير والاعتمادات' : 'Compliance'
  const stdEng = locale === 'ar' ? 'المعايير الهندسية والمواصفات' : 'Engineering Standards'
  const stdDossier = locale === 'ar' ? 'ملف التأهيل الفني والسابقة' : 'Pre-Qualification Dossier'
  const stdLicenses = locale === 'ar' ? 'التراخيص والسجلات الرسمية' : 'Statutory Licenses'
  const stdMonshaat = locale === 'ar' ? 'اعتماد منشآت والمقاولين' : 'Monshaat Accreditation'

  const hqTitle = locale === 'ar' ? 'المقر الرئيسي' : 'Headquarters'
  const addressText =
    locale === 'ar'
      ? `${COMPANY_PROFILE.address.district}، ${COMPANY_PROFILE.address.city}، ${COMPANY_PROFILE.address.country === 'Saudi Arabia' ? 'المملكة العربية السعودية' : COMPANY_PROFILE.address.country}`
      : `${COMPANY_PROFILE.address.district}, ${COMPANY_PROFILE.address.city}, ${COMPANY_PROFILE.address.country}`

  const approvedStamp = locale === 'ar' ? 'مخطط هندسي معتمد رسمياً' : 'DRAWN BLUEPRINT APPROVED'

  const copyrightText =
    locale === 'ar'
      ? '© 1994–2024 شركة دار المشرق للتجارة والمقاولات. جميع الحقوق محفوظة.'
      : '© 1994–2024 DAR EL MASHRQ TRADING & CONTRACTING CO. ALL RIGHTS RESERVED.'

  const engineeredCad = locale === 'ar' ? 'معيار هندسي معتمد' : 'ENGINEERED CAD STANDARD'
  const tierOne = locale === 'ar' ? 'تصنيف مقاولات فئة أولى' : 'TIER-ONE ACCREDITED'

  return (
    <footer className="bg-slate-100 dark:bg-[#0b1a37] border-t border-slate-200 dark:border-[#434651]/40 text-slate-800 dark:text-[#d7e2ff] relative transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto pt-16 md:pt-24 pb-12 relative">
        <BlueprintCrosshair position="top-left" />
        <BlueprintCrosshair position="top-right" />

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-slate-300/60 dark:border-[#434651]/40">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="relative h-12 w-48 mb-4">
              <Image
                src="/dar-elmashrq-logo.png"
                alt="DAR EL MASHRQ Logo"
                fill
                sizes="192px"
                className="object-contain drop-shadow"
              />
            </div>
            <p className="font-arabic text-xs text-[#ba9563] uppercase tracking-wider mb-4 font-bold">
              {locale === 'ar' ? 'شركة دار المشرق للتجارة والمقاولات • تأسست 1994' : 'DAR EL MASHRQ • TRADING & CONTRACTING CO. • EST. 1994'}
            </p>
            <p className="font-arabic text-sm text-slate-600 dark:text-[#c4c6d2] max-w-sm leading-relaxed mb-6 font-normal">
              {brandDesc}
            </p>

            <div className="flex items-center gap-4 text-[#ba9563]">
              <Ruler className="w-5 h-5" />
              <Compass className="w-5 h-5" />
              <ShieldCheck className="w-5 h-5" />
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          {/* Regional Bureaus */}
          <div>
            <h4 className="font-arabic text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#ba9563] pl-3 rtl:pl-0 rtl:pr-3">
              {regionalTitle}
            </h4>
            <ul className="space-y-3 font-arabic text-xs tracking-wide text-slate-600 dark:text-[#c4c6d2] font-medium">
              <li>
                <Link href="/contact" className="hover:text-[#ba9563] transition-colors block">
                  {officeDammam}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#ba9563] transition-colors block">
                  {officeCairo}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#ba9563] transition-colors block">
                  {officeDoha}
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <h4 className="font-arabic text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#ba9563] pl-3 rtl:pl-0 rtl:pr-3">
              {complianceTitle}
            </h4>
            <ul className="space-y-3 font-arabic text-xs tracking-wide text-slate-600 dark:text-[#c4c6d2] font-medium">
              <li>
                <Link href="/#credentials" className="hover:text-[#ba9563] transition-colors block">
                  {stdEng}
                </Link>
              </li>
              <li>
                <Link href="/#credentials" className="hover:text-[#ba9563] transition-colors block">
                  {stdDossier}
                </Link>
              </li>
              <li>
                <Link href="/#credentials" className="hover:text-[#ba9563] transition-colors block">
                  {stdLicenses}
                </Link>
              </li>
              <li>
                <Link href="/#credentials" className="hover:text-[#ba9563] transition-colors block">
                  {stdMonshaat}
                </Link>
              </li>
            </ul>
          </div>

          {/* Headquarters Info */}
          <div>
            <h4 className="font-arabic text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#ba9563] pl-3 rtl:pl-0 rtl:pr-3">
              {hqTitle}
            </h4>
            <p className="font-arabic text-xs text-slate-600 dark:text-[#c4c6d2] leading-relaxed mb-4">
              {addressText}
              <br />
              <span className="text-[#ba9563] font-['Space_Grotesk'] mt-1 inline-block font-semibold" dir="ltr">
                {COMPANY_PROFILE.phones[0]}
              </span>
            </p>
            <div className="border border-[#ba9563]/40 bg-white/50 dark:bg-transparent p-2 text-center text-[#ba9563] font-arabic text-[11px] uppercase tracking-wider font-bold">
              {approvedStamp}
            </div>
          </div>
        </div>

        {/* Copyright & Technical CAD Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 dark:text-[#8e909c] text-xs font-arabic tracking-wide gap-3">
          <div>
            {copyrightText}
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4 text-[#ba9563]">
            <span className="uppercase font-bold">{engineeredCad}</span>
            <span>//</span>
            <span className="uppercase font-bold">{tierOne}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
