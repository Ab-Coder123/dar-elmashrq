'use client'

import Image from 'next/image'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { motion } from 'framer-motion'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'
import { ShieldCheck, HardHat, FileCheck, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/providers/LanguageProvider'

interface QualitySafetyProps {
  qualityImage: string
}

export function QualitySafety({ qualityImage }: QualitySafetyProps) {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  const protocols = [
    {
      icon: ShieldCheck,
      title: isAr ? 'إدارة ضبط وتوكيد الجودة (QA/QC)' : 'QA/QC MANAGEMENT',
      desc: isAr
        ? 'فحص واعتماد المواد، اختبارات ضغط الأسطوانات الخرسانية، فحص الضغط الهيدروليكي للمواسير، وتوثيق الجودة متعدد المراحل.'
        : 'Systematic material verification, concrete cylinder compression tests, MEP pressure testing, and multi-tier quality sign-offs.',
    },
    {
      icon: HardHat,
      title: isAr ? 'الصحة والسلامة المهنية (HSE)' : 'OCCUPATIONAL HEALTH & SAFETY',
      desc: isAr
        ? 'تفتيش يومي للسلامة الميدانية، بروتوكولات تفادي المخاطر، الالتزام بمهمات الوقاية الشخصية، وورش التوعية الميدانية.'
        : 'Active site safety inspections, zero-harm hazard mitigation protocols, mandatory PPE compliance, and toolbox briefings.',
    },
    {
      icon: FileCheck,
      title: isAr ? 'الامتثال للأكواد الهندسية والنظامية' : 'STATUTORY CODE COMPLIANCE',
      desc: isAr
        ? 'التزام تام بكود البناء المعتمد، واشتراطات الدفاع المدني للوقاية من الحريق، والتراخيص البلدية الرسمية.'
        : 'Strict adherence to national building codes, civil defense fire-prevention protocols, and municipal statutory requirements.',
    },
  ]

  return (
    <section className="py-24 bg-white dark:bg-[#0b1a37] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200 dark:border-[#434651]/50 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span className={isAr ? 'font-arabic tracking-normal' : ''}>
                  {isAr ? '07 // الحوكمة المؤسسية والامتثال' : '07 // CORPORATE GOVERNANCE'}
                </span>
              </div>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                {isAr ? 'ضمان الجودة والسلامة المهنية' : 'QUALITY & SAFETY ASSURANCE'}
              </h2>
            </div>
            <div className={`mt-4 md:mt-0 ${isAr ? 'text-right md:text-left' : 'text-left md:text-right'}`}>
              <span className={`text-xl sm:text-2xl text-[#ba9563] font-bold block ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                {isAr ? 'ميثاق مؤسسي إلزامي' : 'ORGANIZATIONAL MANDATE'}
              </span>
              <span className={`text-xs text-slate-500 dark:text-slate-400 tracking-widest uppercase ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                {isAr ? 'معايير صارمة لا تقبل المساومة' : 'Zero Compromise Standards'}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 2-Column Composition: Narrative + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Narrative & Protocols */}
          <RevealChildren className="lg:col-span-7 space-y-6">
            <h3 className={`text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
              {isAr
                ? 'التزام مؤسسي راسخ بالاستدامة الإنشائية وتوفير بيئات عمل آمنة للمشاريع.'
                : 'An Institutional Commitment to Structural Longevity and Safe Working Environments.'}
            </h3>

            <p className={`text-base text-slate-700 dark:text-slate-300 leading-relaxed ${isAr ? 'font-arabic tracking-normal' : "font-['Inter']"}`}>
              {isAr
                ? 'تحت مظلة إدارة الجودة والسلامة المستقلة في شركة دار المشرق، يخضع كل موقع لإشراف مهندسي سلامة معتمدين ومفتشي ضبط جودة (QA/QC) لضمان مطابقة كافة الأعمال المدنية والكهروميكانيكية والتشطيبات لأعلى المواصفات والمعايير الهندسية.'
                : 'Operating under Dar El Mashrq’s dedicated Quality & Safety Division, every project is supervised by certified safety engineers and QA/QC inspectors to guarantee that all civil, electro-mechanical, and finishing works conform to design specifications.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {protocols.map((proto, idx) => {
                const Icon = proto.icon
                return (
                  <motion.div
                    key={idx}
                    className="p-5 bg-slate-50 dark:bg-[#0f2244]/80 border border-slate-200 dark:border-[#434651]/50 relative"
                    variants={fadeUpVariants}
                  >
                    <div className="w-8 h-8 bg-[#123c82]/10 dark:bg-[#ba9563]/10 border border-[#123c82]/20 dark:border-[#ba9563]/30 flex items-center justify-center text-[#123c82] dark:text-[#ba9563] mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className={`font-bold text-xs uppercase text-slate-900 dark:text-white mb-2 ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                      {proto.title}
                    </h4>
                    <p className={`text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed ${isAr ? 'font-arabic tracking-normal' : "font-['Inter']"}`}>
                      {proto.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </RevealChildren>

          {/* Image */}
          <RevealOnScroll className="lg:col-span-5 relative" variants={scaleInVariants} delay={0.15}>
            <div className="relative aspect-[4/3] sm:aspect-[16/11] border border-slate-300 dark:border-[#434651] shadow-2xl overflow-hidden group">
              <BlueprintCrosshair position={isAr ? 'top-right' : 'top-left'} />
              <BlueprintCrosshair position={isAr ? 'bottom-left' : 'bottom-right'} />
              <Image
                src={qualityImage}
                alt={isAr ? 'فحص الجودة والسلامة في دار المشرق' : 'Dar El Mashrq Quality & Safety Inspection'}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/90 dark:bg-[#0b1a37]/90 backdrop-blur-md border border-[#ba9563]/40">
                <div className={`flex justify-between items-center text-xs text-[#ba9563] uppercase tracking-wider ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                  <span>{isAr ? 'إدارة السلامة والجودة' : 'SAFETY DIVISION'}</span>
                  <span>{isAr ? 'تأسست 1994' : 'EST. 1994'}</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
