'use client'

import { motion } from 'framer-motion'
import { COMPANY_PROFILE } from '@/config/site'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

export function VisionSection() {
  const { locale } = useLanguage()

  const mandateLabel =
    locale === 'ar'
      ? 'الميثاق والهدف المؤسسي // الرؤية المستقبلية'
      : 'OUR CORPORATE MANDATE // THE VISION'

  const visionText =
    locale === 'ar'
      ? COMPANY_PROFILE.visionAr ||
        'أن نكون الوجهة المفضلة لعملائنا في المملكة العربية السعودية ومصر ومنطقة الشرق الأوسط وشمال أفريقيا في تقديم حلول إدارة المشاريع والبرامج، بدمج الأساليب الدولية الحديثة في الصناعة والمعايير مع الأساليب الإقليمية.'
      : COMPANY_PROFILE.vision

  const visionComment =
    locale === 'ar'
      ? 'منذ انطلاقتنا في عام 1994، تلتزم دار المشرق بدمج أحدث الممارسات الهندسية العالمية مع عمق الخبرة الميدانية الإقليمية، لإنشاء بنية تحتية وصروح معمارية تدوم لأجيال.'
      : 'From our founding in 1994, Dar El Mashrq has merged modern international engineering practices with deep regional execution expertise, building foundational infrastructure designed for lasting longevity.'

  const govTitle = locale === 'ar' ? 'الإدارة التنفيذية العليا' : 'EXECUTIVE GOVERNANCE'
  const companyTitle =
    locale === 'ar'
      ? 'شركة دار المشرق للتجارة والمقاولات'
      : 'DAR EL MASHRQ TRADING & CONTRACTING CO.'

  return (
    <section className="relative bg-slate-100 dark:bg-[#0b1a37] py-24 md:py-32 border-b border-slate-200 dark:border-[#434651]/40 overflow-hidden transition-colors duration-300">
      {/* Blueprint Grid Drafting Lines Background */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(186,149,99,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(186,149,99,0.2) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <RevealOnScroll variants={scaleInVariants} threshold={0.2}>
          <div className="max-w-4xl mx-auto border border-[#ba9563]/50 p-8 sm:p-12 md:p-16 bg-white/90 dark:bg-[#0f2244]/85 backdrop-blur-md relative shadow-2xl">
            <BlueprintCrosshair position="top-left" />
            <BlueprintCrosshair position="top-right" />
            <BlueprintCrosshair position="bottom-left" />
            <BlueprintCrosshair position="bottom-right" />

            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <span className="w-2.5 h-2.5 bg-[#ba9563] shrink-0" />
              <span className="font-arabic text-xs uppercase tracking-wider text-[#ba9563] font-bold">
                {mandateLabel}
              </span>
            </div>

            {/* Vision Statement (Official text from PDF page 6) */}
            <blockquote className="font-arabic text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight text-slate-950 dark:text-white leading-relaxed mb-8">
              &ldquo;{visionText}&rdquo;
            </blockquote>

            <p className="font-arabic text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] leading-relaxed mb-8 border-l rtl:border-l-0 rtl:border-r border-[#ba9563]/40 pl-6 rtl:pl-0 rtl:pr-6 font-normal">
              {visionComment}
            </p>

            {/* Signature / Governance Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-[#434651]/40">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-10 h-10 border border-[#ba9563] flex items-center justify-center font-arabic text-sm font-bold text-[#ba9563] bg-slate-50 dark:bg-[#0b1a37]">
                  {locale === 'ar' ? 'دم' : 'DM'}
                </div>
                <div>
                  <span className="font-arabic text-xs text-slate-900 dark:text-white block font-bold uppercase">
                    {govTitle}
                  </span>
                  <span className="font-arabic text-[11px] text-slate-500 dark:text-[#8e909c] uppercase tracking-wide font-medium">
                    {companyTitle}
                  </span>
                </div>
              </div>

              <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold" dir="ltr">
                EST. 1994 &bull; KSA &bull; EGY &bull; QAT
              </span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
