'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, Target, Compass, Award } from 'lucide-react'
import { ABOUT_MEDIA } from '../data/about.data'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, slideInLeftVariants, scaleInVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

const PILLARS = [
  {
    icon: Shield,
    title: 'ENGINEERING PRECISION',
    titleAr: 'دقة هندسية صارمة',
    desc: 'Stringent quality management conforming to ISO 9001:2015 standards across all structural and MEP phases.',
    descAr: 'إدارة جودة صارمة مطابقة لمعايير آيزو 9001:2015 عبر جميع المراحل الإنشائية والكهروميكانيكية.',
  },
  {
    icon: Target,
    title: 'TURNKEY EXECUTION',
    titleAr: 'تنفيذ تسليم مفتاح',
    desc: 'End-to-end self-performance from subterranean excavation to luxury handover with zero compromise.',
    descAr: 'تنفيذ ذاتي متكامل يبدأ من الحفر العميق حتى التسليم النهائي الفاخر بأعلى مستويات الجودة.',
  },
  {
    icon: Compass,
    title: 'REGIONAL EXPANSION',
    titleAr: 'توسع إقليمي راسخ',
    desc: 'Active sovereign hubs across Saudi Arabia, Egypt, and Qatar driving regional real estate transformation.',
    descAr: 'مراكز تشغيلية نشطة وموثقة عبر المملكة ومصر وقطر تقود التحول والتطوير العقاري.',
  },
  {
    icon: Award,
    title: 'STATUTORY COMPLIANCE',
    titleAr: 'امتثال وتراخيص معتمدة',
    desc: 'Fully licensed under Ministry of Commerce, Civil Defense Grade A, and Chamber of Commerce syndicates.',
    descAr: 'تراخيص معتمدة من وزارة التجارة، ودفاع مدني فئة (أ)، وتصنيفات الغرفة التجارية.',
  },
]

export function CompanyIntroduction() {
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
                <span>{locale === 'ar' ? '01 // نبذة عن الشركة' : '01 // CORPORATE PROFILE'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-arabic">
                {locale === 'ar' ? 'من نحن' : 'WHO WE ARE'}
              </h2>
            </div>
            <div className={`mt-4 md:mt-0 ${isRtl ? 'md:text-left text-right' : 'text-left md:text-right'}`}>
              <span className="font-arabic text-xl sm:text-2xl text-[#ba9563] font-bold block">
                {locale === 'ar' ? 'ثلاثة عقود من التميز الهندسي' : 'THREE DECADES OF EXCELLENCE'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-arabic tracking-widest uppercase">
                {locale === 'ar' ? 'شركة دار المشرق للتجارة والمقاولات' : 'Trading & Contracting Company'}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Grid: Narrative + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Narrative Text */}
          <RevealChildren className="lg:col-span-7 space-y-6">
            <motion.h3
              className="text-2xl sm:text-3xl font-extrabold font-arabic text-slate-900 dark:text-white leading-tight"
              variants={slideInLeftVariants}
            >
              {locale === 'ar'
                ? 'إرث عريق من التميز الهندسي والبناء المستدام الممتد منذ عام 1994.'
                : 'A Legacy of Engineering Excellence and Structural Longevity Since 1994.'}
            </motion.h3>

            <motion.p
              className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-arabic"
              variants={fadeUpVariants}
            >
              {locale === 'ar' ? (
                <>
                  تأسست <strong className="text-[#123c82] dark:text-[#ba9563] font-bold">شركة دار المشرق للتجارة والمقاولات</strong> في عام 1994 ككيان رائد في المقاولات العامة والتطوير العقاري. وعلى مدار أكثر من 30 عاماً من النمو الراسخ، شيدنا مشاريع أيقونية ومعالم إنشائية بارزة في المملكة العربية السعودية وجمهورية مصر العربية ودولة قطر.
                </>
              ) : (
                <>
                  <strong className="text-[#123c82] dark:text-[#ba9563] font-semibold">Dar El Mashrq Trading &amp; Contracting Company</strong> was founded in 1994 as a multidisciplinary contracting and real estate development entity. Over three decades of consistent growth, we have built landmark assets across Saudi Arabia, Egypt, and Qatar.
                </>
              )}
            </motion.p>

            <motion.p
              className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-arabic"
              variants={fadeUpVariants}
            >
              {locale === 'ar'
                ? 'تتكامل قدراتنا الفنية لتشمل التصميم المعماري الإبداعي، والإنشاءات الهيكلية الثقيلة، والأنظمة الكهروميكانيكية المتخصصة (MEP)، وشبكات التكييف والتهوية، ومنظومات السلامة ومكافحة الحريق، وإدارة دورة حياة الاستثمار العقاري.'
                : 'Our multidisciplinary capabilities integrate architectural concept engineering, heavy structural construction, specialized electro-mechanical (MEP) installations, HVAC systems, fire life safety infrastructure, and property investment lifecycle management.'}
            </motion.p>

            <motion.div
              className="p-6 bg-slate-50 dark:bg-[#0f2244]/60 border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#ba9563] space-y-2 mt-4"
              variants={fadeUpVariants}
            >
              <p className="font-arabic text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                {locale === 'ar'
                  ? 'من خلال قدراتنا على التنفيذ الذاتي المباشر، وبروتوكولات الجودة المعتمدة QA/QC، والتصنيفات الرسمية من الفئة الأولى، ننفذ المشاريع الحكومية والتجارية والسكنية الكبرى وفق أعلى معايير الدقة والالتزام الصارم بالجداول الزمنية.'
                  : 'Operating with direct self-performance capabilities, certified QA/QC protocols, and Grade-A statutory licensing, we execute complex government, commercial, and residential projects on schedule and with uncompromising quality standards.'}
              </p>
            </motion.div>
          </RevealChildren>

          {/* Architectural Image */}
          <RevealOnScroll className="lg:col-span-5 relative" variants={scaleInVariants} delay={0.15}>
            <div className="relative aspect-[4/3] sm:aspect-[16/11] border border-slate-300 dark:border-[#434651] shadow-2xl overflow-hidden group">
              <BlueprintCrosshair position="top-left" />
              <BlueprintCrosshair position="bottom-right" />
              <Image
                src={ABOUT_MEDIA.introImage}
                alt={locale === 'ar' ? 'تنفيذ مشاريع دار المشرق الهندسية' : 'Dar El Mashrq Engineering Project Execution'}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Image Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/90 dark:bg-[#0b1a37]/90 backdrop-blur-md border border-[#ba9563]/40">
                <div className="flex justify-between items-center text-xs font-arabic text-[#ba9563] uppercase tracking-wider font-bold">
                  <span>{locale === 'ar' ? 'تأسست 1994' : 'EST. 1994'}</span>
                  <span>{locale === 'ar' ? 'الرياض • القاهرة • الدوحة' : 'RIYADH • CAIRO • DOHA'}</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* 4 Pillars Grid */}
        <RevealChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={idx}
                className="relative p-6 sm:p-8 bg-slate-50 dark:bg-[#0f2244]/80 border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 group"
                variants={fadeUpVariants}
              >
                <BlueprintCrosshair position="top-right" />
                <div className="w-12 h-12 bg-[#123c82]/10 dark:bg-[#ba9563]/10 border border-[#123c82]/20 dark:border-[#ba9563]/30 flex items-center justify-center mb-6 group-hover:bg-[#ba9563] group-hover:text-slate-950 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#123c82] dark:text-[#ba9563] group-hover:text-slate-950 transition-colors" />
                </div>
                <h4 className="font-arabic font-extrabold text-base sm:text-lg text-slate-900 dark:text-white uppercase mb-3 tracking-tight">
                  {locale === 'ar' ? pillar.titleAr : pillar.title}
                </h4>
                <p className="font-arabic text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {locale === 'ar' ? pillar.descAr : pillar.desc}
                </p>
              </motion.div>
            )
          })}
        </RevealChildren>
      </div>
    </section>
  )
}
