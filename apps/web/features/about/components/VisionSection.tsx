'use client'

import { motion } from 'framer-motion'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { Quote } from 'lucide-react'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { scaleInVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

export function VisionSection() {
  const { locale } = useLanguage()

  return (
    <section className="py-24 bg-[#0b1a37] text-white border-b border-[#434651]/50 relative overflow-hidden">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
        <div className="w-full max-w-[1440px] mx-auto border-x border-[#ba9563]/40 grid grid-cols-6 md:grid-cols-12 h-full">
          <div className="border-r border-[#ba9563]/20 h-full col-span-2" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-4" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-2" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-arabic font-bold mb-3">
              <span className="w-1.5 h-1.5 bg-[#ba9563]" />
              <span>{locale === 'ar' ? '05 // التوجه الاستراتيجي' : '05 // STRATEGIC DIRECTION'}</span>
              <span className="w-1.5 h-1.5 bg-[#ba9563]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-arabic">
              {locale === 'ar' ? 'رؤيتنا المؤسسية' : 'OUR VISION'}
            </h2>
          </div>
        </RevealOnScroll>

        {/* Vision Statement Box */}
        <RevealOnScroll variants={scaleInVariants} threshold={0.2}>
          <div className="max-w-4xl mx-auto bg-[#0f2244]/80 border border-[#ba9563]/60 p-8 sm:p-14 relative backdrop-blur-md shadow-2xl text-center">
            <BlueprintCrosshair position="top-left" />
            <BlueprintCrosshair position="top-right" />
            <BlueprintCrosshair position="bottom-left" />
            <BlueprintCrosshair position="bottom-right" />

            {/* Large Quote Icon */}
            <div className="w-12 h-12 bg-[#ba9563]/10 border border-[#ba9563]/30 flex items-center justify-center mb-8 mx-auto text-[#ba9563]">
              <Quote className="w-6 h-6" />
            </div>

            {/* Official Vision Statement from PDF */}
            <blockquote className="font-arabic text-xl sm:text-2xl md:text-3xl text-slate-100 text-center font-bold leading-relaxed mb-8 tracking-tight">
              {locale === 'ar' ? (
                <>
                  &ldquo;أن نكون <strong className="text-[#ba9563] font-black">الوجهة المفضلة</strong> لعملائنا في المملكة العربية السعودية ومصر ومنطقة الشرق الأوسط وشمال أفريقيا في تقديم حلول إدارة المشاريع والبرامج، بدمج الأساليب الدولية الحديثة في الصناعة والمعايير مع الأساليب الإقليمية.&rdquo;
                </>
              ) : (
                <>
                  &ldquo;Become the <strong className="text-[#ba9563] font-bold">destination of choice</strong> for our clients in Saudi Arabia, Egypt, and in the MENA region for providing project and program management solutions merging modern international industry techniques and standards with regional approaches.&rdquo;
                </>
              )}
            </blockquote>

            <p className="font-arabic text-sm sm:text-base text-slate-300 text-center max-w-2xl mx-auto leading-relaxed font-normal">
              {locale === 'ar'
                ? 'تحقيق الاستدامة الإنشائية، والانضباط المالي والتشغيلي الصارم، ومنح كل متر مربع نشيده قيمة حقيقية تدوم لأجيال.'
                : 'Delivering structural resilience, disciplined budget adherence, and lasting value across every square meter we build.'}
            </p>

            {/* Official Verification Tag */}
            <div className="mt-10 pt-6 border-t border-[#434651]/50 flex flex-col sm:flex-row justify-between items-center text-xs font-arabic text-slate-400 uppercase tracking-wider gap-2 font-bold">
              <span>{locale === 'ar' ? 'شركة دار المشرق للتجارة والمقاولات' : 'DAR EL MASHRQ TRADING & CONTRACTING CO.'}</span>
              <span className="text-[#ba9563]">{locale === 'ar' ? 'الميثاق المؤسسي الرسمي المعتمد' : 'OFFICIAL CORPORATE CHARTER'}</span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
