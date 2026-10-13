'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Building2, Zap, Wind, Flame, Compass, ArrowRight } from 'lucide-react'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

const DISCIPLINES = [
  {
    icon: Building2,
    number: '01',
    title: 'Civil & Finishing',
    titleAr: 'الأعمال المدنية والتشطيبات',
    desc: 'Deep foundations, reinforced concrete superstructures, architectural exterior cladding, and high-spec luxury interior fit-outs.',
    descAr: 'الأساسات العميقة، الهياكل الخرسانية المسلحة، الكسوات الخارجية المعمارية، وأعمال التشطيبات الداخلية الفاخرة.',
  },
  {
    icon: Zap,
    number: '02',
    title: 'Electrical Systems',
    titleAr: 'الأنظمة والشبكات الكهربائية',
    desc: 'Medium/low voltage distribution networks, emergency backup transformers, BMS building automation, and low current systems.',
    descAr: 'شبكات التوزيع للجهد المتوسط والمنخفض، محولات الطوارئ الاحتياطية، أنظمة التحكم الذكي BMS، وشبكات التيار الخفيف.',
  },
  {
    icon: Wind,
    number: '03',
    title: 'HVAC & Climate Control',
    titleAr: 'التكييف والتحكم المناخي HVAC',
    desc: 'Chilled water plants, DX/VRF systems, industrial ventilation, smoke extraction ducting, and acoustic isolation design.',
    descAr: 'محطات المياه المثلجة Chilled Water، منظومات DX/VRF، التهوية الصناعية، مجاري سحب الدخان، والعزل الصوتي المتطور.',
  },
  {
    icon: Flame,
    number: '04',
    title: 'Fire Life Safety & Plumbing',
    titleAr: 'مكافحة الحريق والصحية',
    desc: 'Civil Defense certified automatic sprinkler networks, FM200 suppression, high-pressure booster stations, and sanitary piping.',
    descAr: 'شبكات الرش الآلي المعتمدة من الدفاع المدني، غازات الإخماد FM200، محطات الرفع الهيدروليكي، والتمديدات الصحية المتكاملة.',
  },
  {
    icon: Compass,
    number: '05',
    title: 'Engineering & BIM',
    titleAr: 'الهندسة ونمذجة BIM',
    desc: 'Full Revit/Navisworks clash detection, Primavera P6 baseline scheduling, structural calculations, and shop drawings.',
    descAr: 'كشف التعارضات التام عبر Revit وNavisworks، الجدولة عبر Primavera P6، الحسابات الإنشائية، والمخططات التنفيذية.',
  },
]

export function TechnicalCapabilities() {
  const { locale, isRtl } = useLanguage()

  return (
    <section className="py-24 bg-slate-100/70 dark:bg-[#09182f] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-300 dark:border-[#434651]/50">
            <div>
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-[#ba9563] text-xs uppercase tracking-[0.25em] font-arabic font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>{locale === 'ar' ? '04 // التخصصات الفنية والهندسية' : '04 // TECHNICAL DISCIPLINES'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-arabic">
                {locale === 'ar' ? 'قدرات هندسية متخصصة' : 'SPECIALIZED CAPABILITIES'}
              </h2>
            </div>
            <div className={`mt-4 md:mt-0 ${isRtl ? 'md:text-left text-right' : 'text-left md:text-right'}`}>
              <span className="font-arabic text-xl sm:text-2xl text-[#ba9563] font-bold block">
                {locale === 'ar' ? 'تكامل هندسي متعدد التخصصات' : 'MULTIDISCIPLINARY ENGINEERING'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-arabic tracking-widest uppercase">
                {locale === 'ar' ? 'مدني • كهرباء • تكييف • مكافحة حريق' : 'Civil • Electrical • HVAC • Safety'}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Disciplines 5-column / responsive grid */}
        <RevealChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12" staggerDelay={0.08}>
          {DISCIPLINES.map((disc, idx) => {
            const Icon = disc.icon
            const title = locale === 'ar' ? disc.titleAr : disc.title
            const desc = locale === 'ar' ? disc.descAr : disc.desc

            return (
              <motion.div
                key={idx}
                className="p-6 bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 flex flex-col justify-between relative group shadow-sm"
                variants={fadeUpVariants}
              >
                <BlueprintCrosshair position="top-right" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 bg-[#123c82]/10 dark:bg-[#ba9563]/10 border border-[#123c82]/20 dark:border-[#ba9563]/30 flex items-center justify-center group-hover:bg-[#ba9563] transition-colors">
                      <Icon className="w-5 h-5 text-[#123c82] dark:text-[#ba9563] group-hover:text-slate-950 transition-colors" />
                    </div>
                    <span className="font-arabic text-xs font-bold text-slate-400 dark:text-slate-500">
                      {disc.number}
                    </span>
                  </div>

                  <h3 className="font-arabic font-extrabold text-base text-slate-900 dark:text-white uppercase mb-3 leading-snug">
                    {title}
                  </h3>
                  <p className="font-arabic text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#434651]/40 text-[10px] font-arabic text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">
                  {locale === 'ar' ? 'تنفيذ هندسي معتمد' : 'CERTIFIED EXECUTION'}
                </div>
              </motion.div>
            )
          })}
        </RevealChildren>

        {/* Bottom Banner linking to full Services */}
        <RevealOnScroll delay={0.15}>
          <div className="p-8 bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#434651]/60 flex flex-col sm:flex-row items-center justify-between gap-6 relative shadow-md">
            <BlueprintCrosshair position="bottom-left" />
            <div className={`space-y-1 ${isRtl ? 'sm:text-right text-center' : 'sm:text-left text-center'}`}>
              <h4 className="font-arabic font-extrabold text-base sm:text-lg text-slate-900 dark:text-white uppercase">
                {locale === 'ar'
                  ? 'هل تحتاج إلى مواصفات فنية وجداول كميات هندسية متكاملة؟'
                  : 'Need comprehensive technical specifications for our services?'}
              </h4>
              <p className="font-arabic text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal">
                {locale === 'ar'
                  ? 'استكشف نطاقات الأعمال التفصيلية، ومعدات التشغيل، والمسارات الهندسية في صفحة خدماتنا الشاملة.'
                  : 'Explore detailed scopes, equipment schedules, and engineering workflows on our dedicated Services page.'}
              </p>
            </div>
            <Link
              href="/services"
              className="shrink-0 inline-flex items-center space-x-2 rtl:space-x-reverse px-6 py-3.5 bg-[#123c82] hover:bg-[#0d2e6a] text-white text-xs uppercase font-arabic font-bold tracking-wider border border-[#123c82] transition-colors"
            >
              <span>{locale === 'ar' ? 'استعراض كافة الخدمات' : 'VIEW ALL SERVICES'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
