'use client'

import { ShieldCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { HOME_CREDENTIALS } from '../data/home.data'
import { CERTIFICATIONS } from '@/config/certifications'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

const CREDENTIALS_AR: Record<string, { cat: string; title: string; desc: string; status: string }> = {
  'iso-9001': {
    cat: 'معايير الجودة العالمية',
    title: 'ISO 9001 : 2015',
    desc: 'نظام إدارة جودة معتمد يغطي دورة العمل الكاملة للمشاريع الهندسية والمدنية والميكانيكية والكهربائية.',
    status: 'معتمد رسمياً',
  },
  'civil-defense': {
    cat: 'التراخيص النظامية',
    title: 'ترخيص الدفاع المدني',
    desc: 'مقاول فئة أولى معتمد لأنظمة إخماد الحرائق، أنظمة السلامة المتطورة والتحكم في الدخان لحماية المنشآت.',
    status: 'سجل نشط',
  },
  'chamber-classification': {
    cat: 'التصنيف السيادي',
    title: 'الغرفة التجارية والتصنيف',
    desc: 'تصنيف مقاولات عامة معتمد لدى الغرف التجارية والهيئات والاتحادات الهندسية الرسمية بدول الخليج ومصر.',
    status: 'تصنيف أ',
  },
}

export function CredentialsSection() {
  const { locale } = useLanguage()

  const sectionSub =
    locale === 'ar'
      ? 'القسم 05 // الامتثال والاعتمادات الرسمية'
      : 'Section 05 // Compliance & Accreditations'

  const sectionTitle =
    locale === 'ar'
      ? 'اعتمادات رسمية. خبرة راسخة. ثقة متبادلة.'
      : 'CERTIFIED. EXPERIENCED. TRUSTED.'

  const sectionDesc =
    locale === 'ar'
      ? 'تراخيص نظامية رسمية، اعتمادات دولية رفيعة، وتصنيفات مقاولات معتمدة لدى الجهات الحكومية والسيادية'
      : 'Official statutory licenses, international accreditations, and tier-one government syndicates'

  const sectionComment =
    locale === 'ar'
      ? 'سجلات نظامية معتمدة وتصنيفات مقاولات فئة أولى في المملكة العربية السعودية ومصر وقطر.'
      : 'Official statutory licenses and high-grade contractor classification records across Saudi Arabia, Egypt, and Qatar.'

  const stripTitle =
    locale === 'ar'
      ? 'سجل التراخيص والامتثال النظامي الرسمي (ملف الشركة ص 60–67)'
      : 'STATUTORY COMPLIANCE & LICENSES REGISTRATION (PDF PAGES 60–67)'

  const stripSubtitle =
    locale === 'ar'
      ? 'جميع التراخيص سارية ومعتمدة • تدقيق 2024'
      : 'ALL ENTITIES ACTIVE • AUDITED 2024'

  return (
    <section className="relative bg-white dark:bg-[#0b1a37] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300" id="credentials">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Headline & Registration */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-slate-200 dark:border-[#434651]/40 pb-6 relative">
            <BlueprintCrosshair position="top-left" />
            <div>
              <span className="font-arabic text-xs uppercase tracking-wider text-[#ba9563] block mb-2 font-bold">
                {sectionSub}
              </span>
              <h2 className="font-arabic text-2xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold tracking-tight leading-snug">
                {sectionTitle}
              </h2>
              <p className="font-arabic text-sm text-slate-600 dark:text-[#c4c6d2] mt-2 font-medium">
                {sectionDesc}
              </p>
            </div>
            <p className="font-arabic text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] max-w-sm mt-4 md:mt-0 font-normal leading-relaxed">
              {sectionComment}
            </p>
          </div>
        </RevealOnScroll>

        {/* 3 Main Highlights Cards */}
        <RevealChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" staggerDelay={0.1}>
          {HOME_CREDENTIALS.map((cred, idx) => {
            const arData = CREDENTIALS_AR[cred.id]
            const category = locale === 'ar' && arData ? arData.cat : cred.category
            const title = locale === 'ar' && arData ? arData.title : cred.title
            const description = locale === 'ar' && arData ? arData.desc : cred.description
            const status = locale === 'ar' && arData ? arData.status : cred.status

            return (
              <motion.div
                key={cred.id}
                className="p-8 border border-slate-200 dark:border-[#ba9563]/30 bg-slate-50 dark:bg-[#0f2244] relative group hover:border-[#ba9563] transition-all duration-300 shadow-md"
                variants={fadeUpVariants}
              >
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                <div className="w-12 h-12 border border-[#ba9563]/50 flex items-center justify-center text-[#ba9563] mb-6 group-hover:bg-[#ba9563] group-hover:text-[#0b1a37] transition-colors">
                  {idx === 0 && <CheckCircle2 className="w-6 h-6" />}
                  {idx === 1 && <ShieldCheck className="w-6 h-6" />}
                  {idx === 2 && <Award className="w-6 h-6" />}
                </div>

                <span className="font-arabic text-[11px] uppercase tracking-wider text-[#ba9563] block mb-2 font-bold">
                  {category}
                </span>

                <h3 className="font-arabic text-xl text-slate-950 dark:text-white font-extrabold mb-3 uppercase leading-snug">
                  {title}
                </h3>

                <p className="font-arabic text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] mb-6 leading-relaxed font-normal">
                  {description}
                </p>

                <div className="border-t border-slate-200 dark:border-[#434651]/40 pt-4 flex items-center justify-between text-slate-500 dark:text-[#8e909c] font-arabic text-[11px]">
                  <span className="font-mono text-[10px]" dir="ltr">{cred.registrationNumber}</span>
                  <span className="text-[#ba9563] font-bold uppercase">{status}</span>
                </div>
              </motion.div>
            )
          })}
        </RevealChildren>

        {/* Official Statutory Registry Tags Strip */}
        <RevealOnScroll delay={0.15}>
          <div className="border border-slate-200 dark:border-[#434651]/40 bg-slate-50/70 dark:bg-[#0f2244]/60 p-6 relative shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-200 dark:border-[#434651]/30">
              <span className="font-arabic text-xs uppercase tracking-wider text-[#ba9563] font-bold flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#ba9563] shrink-0" />
                <span>{stripTitle}</span>
              </span>
              <span className="font-arabic text-[11px] text-slate-500 dark:text-[#8e909c] uppercase tracking-wider font-semibold">
                {stripSubtitle}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CERTIFICATIONS.map((cert) => {
                const name = locale === 'ar' ? (cert.nameAr || cert.name) : cert.name
                return (
                  <div
                    key={cert.id}
                    className="bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#434651]/40 p-3 text-center group hover:border-[#ba9563]/60 transition-colors shadow-sm flex flex-col justify-between"
                  >
                    <span className="font-arabic text-xs text-slate-900 dark:text-white block uppercase font-bold leading-relaxed">
                      {name}
                    </span>
                    <span className="inline-block w-1.5 h-1.5 bg-[#ba9563] mx-auto mt-2" />
                  </div>
                )
              })}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
