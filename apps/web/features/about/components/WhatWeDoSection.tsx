'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { WHAT_WE_DO } from '../data/about.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { useLanguage } from '@/providers/LanguageProvider'

export function WhatWeDoSection() {
  const { locale, isRtl } = useLanguage()

  return (
    <section className="py-24 bg-white dark:bg-[#0b1a37] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200 dark:border-[#434651]/50">
            <div>
              <div className="inline-flex items-center gap-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-arabic font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>{locale === 'ar' ? '03 // القدرات والخدمات الرئيسية' : '03 // CORE CAPABILITIES'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-arabic">
                {locale === 'ar' ? 'مجالات عملنا' : 'WHAT WE DO'}
              </h2>
            </div>
            <div className={`mt-4 md:mt-0 ${isRtl ? 'md:text-left text-right' : 'text-left md:text-right'}`}>
              <span className="font-arabic text-xl sm:text-2xl text-[#ba9563] font-bold block">
                {locale === 'ar' ? 'التخصصات الهندسية الشاملة' : 'CORE DISCIPLINES'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-arabic tracking-widest uppercase">
                {locale === 'ar' ? 'تنفيذ متكامل من الفكرة للتسليم' : 'End-to-End Delivery'}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 4 Cards Grid / Stacked Display */}
        <div className="space-y-12">
          {WHAT_WE_DO.map((item, idx) => {
            const isEven = idx % 2 === 1
            const title = locale === 'ar' && item.titleAr ? item.titleAr : item.title
            const subtitle = locale === 'ar' && item.subtitleAr ? item.subtitleAr : item.subtitle
            const description = locale === 'ar' && item.descriptionAr ? item.descriptionAr : item.description
            const disciplines = locale === 'ar' && item.disciplinesAr ? item.disciplinesAr : item.disciplines

            return (
              <RevealOnScroll key={item.number} delay={idx * 0.1}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch p-6 sm:p-10 bg-slate-50 dark:bg-[#0f2244]/70 border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 relative shadow-sm`}
                >
                  <BlueprintCrosshair position="top-left" />
                  <BlueprintCrosshair position="bottom-right" />

                  {/* Text Content */}
                  <div className={`lg:col-span-7 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      {/* Header line: Number + Subtitle */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-arabic text-4xl sm:text-5xl font-black text-[#ba9563]/40 tracking-tighter">
                          {item.number}
                        </span>
                        <span className="font-arabic text-xs uppercase tracking-wider text-[#ba9563] font-bold bg-[#ba9563]/10 px-3 py-1 border border-[#ba9563]/30">
                          {subtitle}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-arabic text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white uppercase mb-4">
                        {title}
                      </h3>

                      {/* Description */}
                      <p className="font-arabic text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                        {description}
                      </p>

                      {/* Disciplines Chips */}
                      <div className="mb-6">
                        <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-arabic font-bold mb-3">
                          {locale === 'ar' ? 'أبرز الكفاءات والتخصصات الفرعية:' : 'Key Competencies & Sub-Disciplines:'}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {disciplines.map((disc, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-center gap-2 text-xs font-arabic text-slate-800 dark:text-slate-200 bg-white dark:bg-[#0b1a37] p-2.5 border border-slate-200 dark:border-[#434651]/50"
                            >
                              <span className="w-1.5 h-1.5 bg-[#ba9563] shrink-0" />
                              <span>{disc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Explore Services Link */}
                    <div className="pt-4 border-t border-slate-200 dark:border-[#434651]/40 flex justify-between items-center">
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-xs uppercase font-arabic font-bold text-[#123c82] dark:text-[#ba9563] hover:underline"
                      >
                        <span>{locale === 'ar' ? 'استكشف التفاصيل والخدمات الفنية' : 'Explore Technical Details'}</span>
                        <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
                      </Link>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-arabic font-semibold">
                        {locale === 'ar' ? `التخصص #${item.number}` : `DISCIPLINE #${item.number}`}
                      </span>
                    </div>
                  </div>

                  {/* Media Column */}
                  <div className={`lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative w-full h-full border border-slate-300 dark:border-[#434651] overflow-hidden group">
                      <Image
                        src={item.image}
                        alt={title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 bg-slate-900/90 text-[10px] font-arabic text-[#ba9563] uppercase tracking-wider border border-[#ba9563]/40 font-bold">
                        {locale === 'ar' ? 'معايير التنفيذ والجودة // ISO 9001' : 'DELIVERY STANDARDS // ISO 9001'}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
