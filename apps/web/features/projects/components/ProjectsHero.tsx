'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2, Globe2, ShieldCheck, Award } from 'lucide-react'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { heroStaggerVariants, fadeUpVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

import Image from 'next/image'

export function ProjectsHero() {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  const kpis = [
    {
      label: isAr ? 'مشروعاً منجزاً' : 'DELIVERED DEVELOPMENTS',
      value: '35+',
      icon: Building2,
    },
    {
      label: isAr ? 'أسواق إقليمية' : 'SOVEREIGN MARKETS',
      value: '03',
      icon: Globe2,
    },
    {
      label: isAr ? 'إرث في المقاولات' : 'INDUSTRY HERITAGE',
      value: isAr ? '30+ سنة' : '30+ YRS',
      icon: Award,
    },
    {
      label: isAr ? 'شهادات واعتمادات' : 'OFFICIAL ACCREDITATIONS',
      value: '07',
      icon: ShieldCheck,
    },
  ]

  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#ba9563]/30 overflow-hidden">
      {/* Background Image with Deep Navy Atmospheric Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/projects/al-smaeel-tower/cover.jpg"
          alt={isAr ? 'مشاريع وسجل مقاولات دار المشرق' : 'Dar El Mashrq Project Portfolio'}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Deep Navy Linear Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09182f]/95 via-[#0f2244]/85 to-[#123c82]/50" />
        {/* Radial Dark Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,14,38,0.75)_100%)]" />
      </div>

      {/* Architectural blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ba9563_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-10" />
      
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto relative z-10">
        <RevealOnScroll variants={heroStaggerVariants} threshold={0.1}>
          <div className={`relative ${isAr ? 'border-r-2 pr-6 sm:pr-10' : 'border-l-2 pl-6 sm:pl-10'} border-[#ba9563]`}>
            <BlueprintCrosshair position={isAr ? 'top-left' : 'top-right'} />
            <BlueprintCrosshair position={isAr ? 'bottom-left' : 'bottom-right'} />

            {/* Breadcrumb */}
            <div className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#ba9563] mb-4 font-semibold ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
              <Link href="/" className="hover:underline">
                {isAr ? 'الرئيسية' : 'HOME'}
              </Link>
              <span>/</span>
              <span>{isAr ? 'سجل المشاريع المعتمدة' : 'PROJECT PORTFOLIO'}</span>
            </div>

            {/* Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.05] text-white mb-6 ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
              {isAr ? (
                <>
                  دقة هندسية راسخة &amp; <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ba9563] via-[#d4b27a] to-[#ba9563]">
                    تاريخ عريق في المقاولات
                  </span>
                </>
              ) : (
                <>
                  STRUCTURAL RIGOR &amp; <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ba9563] via-[#d4b27a] to-[#ba9563]">
                    CONTRACTING HERITAGE
                  </span>
                </>
              )}
            </h1>

            <p className={`text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed mb-10 ${isAr ? 'font-arabic tracking-normal' : "font-['Inter']"}`}>
              {isAr
                ? 'أرشيف موثق لأعمال الهندسة المدنية، والمقاولات الكهروميكانيكية، والأبراج السكنية ومجمعات الإسكان، والمراكز الحكومية والبنية التحتية المنفذة في المملكة العربية السعودية، وجمهورية مصر العربية، ودولة قطر منذ عام 1994.'
                : 'An exhaustive archive of civil engineering, electro-mechanical contracting, high-density residential towers, institutional complexes, and infrastructure delivered across the Kingdom of Saudi Arabia, the Arab Republic of Egypt, and the State of Qatar since 1994.'}
            </p>

            {/* Datum KPI strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-[#ba9563]/30 pt-8 mt-8">
              {kpis.map((kpi, idx) => {
                const Icon = kpi.icon
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-[#ba9563]">
                      <Icon className="w-4 h-4" />
                      <span className={`text-[10px] uppercase tracking-[0.15em] font-semibold text-[#ba9563] ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                        {kpi.label}
                      </span>
                    </div>
                    <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight text-white ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                      {kpi.value}
                    </div>
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
