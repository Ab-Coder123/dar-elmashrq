'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ABOUT_MEDIA } from '../data/about.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { ArrowRight, Compass } from 'lucide-react'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { scaleInVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

export function AboutCTA() {
  const { locale } = useLanguage()

  return (
    <section className="relative py-28 overflow-hidden bg-[#0b1a37] text-white">
      {/* Background Image with Dark Blue Tint */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ABOUT_MEDIA.ctaImage}
          alt={locale === 'ar' ? 'صرح دار المشرق الإنشائي' : 'Dar El Mashrq Architectural Structure'}
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a37] via-[#0b1a37]/90 to-[#123c82]/70" />
      </div>

      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-15" aria-hidden="true">
        <div className="w-full max-w-[1440px] mx-auto border-x border-[#ba9563]/40 grid grid-cols-4 md:grid-cols-12 h-full">
          <div className="border-r border-[#ba9563]/20 h-full col-span-3" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-6" />
          <div className="border-r border-[#ba9563]/20 h-full col-span-3" />
        </div>
      </div>

      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 text-center">
        <RevealOnScroll variants={scaleInVariants} threshold={0.15}>
          <div className="max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse border border-[#ba9563]/50 bg-[#0b1a37]/90 px-4 py-1.5 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 bg-[#ba9563]" />
              <span className="font-arabic text-xs uppercase tracking-wider text-[#ba9563] font-bold">
                {locale === 'ar' ? 'التعاون الاستراتيجي • تنفيذ مشاريع EPC' : 'COLLABORATION • EPC EXECUTION'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-arabic leading-tight mb-6">
              {locale === 'ar'
                ? 'من الرؤية الاستراتيجية إلى التنفيذ الإنشائي الراسخ'
                : 'FROM STRATEGIC VISION TO STRUCTURAL EXECUTION'}
            </h2>

            <p className="font-arabic text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mb-10 font-normal">
              {locale === 'ar'
                ? 'شارك كياناً هندسياً ومقاولاً عاماً من الفئة الأولى يمتلك أكثر من 30 عاماً من الاستدامة والخبرة الميدانية في المملكة العربية السعودية ومصر وقطر.'
                : 'Partner with a tier-one general contracting and engineering enterprise with over 30 years of proven longevity across Saudi Arabia, Egypt, and Qatar.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/projects"
                className="w-full sm:w-auto px-8 py-4 bg-[#ba9563] hover:bg-[#d4b27a] text-slate-950 text-xs font-arabic uppercase tracking-wider font-extrabold inline-flex items-center justify-center space-x-2 rtl:space-x-reverse transition-colors duration-200 relative group shadow-lg"
              >
                <BlueprintCrosshair position="top-left" />
                <span>{locale === 'ar' ? 'استعرض محفظة مشاريعنا' : 'EXPLORE OUR PORTFOLIO'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform duration-200" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-arabic uppercase tracking-wider font-extrabold inline-flex items-center justify-center space-x-2 rtl:space-x-reverse transition-colors duration-200 backdrop-blur-sm"
              >
                <Compass className="w-4 h-4 text-[#ba9563]" />
                <span>{locale === 'ar' ? 'تواصل مع قيادة الشركة' : 'GET IN TOUCH WITH OUR LEADERSHIP'}</span>
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
