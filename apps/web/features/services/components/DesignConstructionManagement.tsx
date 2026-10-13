'use client'

import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/motion'
import { PenTool, HardHat, BarChart3, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/providers/LanguageProvider'

export function DesignConstructionManagement() {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  const triad = [
    {
      icon: PenTool,
      title: isAr ? 'التصميم الهندسي' : 'DESIGN',
      badge: isAr ? 'المرحلة أ // المفهوم والنمذجة' : 'PHASE A // CONCEPTION',
      heading: isAr ? 'التفكير الهندسي ونمذجة المنشآت المتطورة' : 'Engineering Thinking & Structural Modeling',
      desc: isAr
        ? 'ترجمة الرؤى المعمارية إلى نماذج BIM هيكلية وكهروميكانيكية متكاملة تكشف التعارضات وتحقق وفراً اقتصادياً فائقاً قبل البدء الميداني.'
        : 'Translating strategic architectural intent into fully coordinated structural, MEP, and life-safety BIM models to identify clashes and optimize costs before physical mobilization.',
      points: isAr
        ? ['تنسيق BIM / CAD كامل وثلاثي الأبعاد', 'نمذجة الأحمال الإنشائية والمعمارية', 'الهندسة القيمية وجداول الكميات الدقيقة']
        : ['Full BIM / CAD Coordination', 'Structural Load Modeling', 'Value Engineering & Bill of Quantities'],
    },
    {
      icon: HardHat,
      title: isAr ? 'الإنشاء والتنفيذ' : 'CONSTRUCTION',
      badge: isAr ? 'المرحلة ب // التنفيذ الميداني' : 'PHASE B // PHYSICAL EXECUTION',
      heading: isAr ? 'تنفيذ الهياكل الخرسانية والتشطيبات المتكاملة' : 'Turnkey Ground & Superstructure Execution',
      desc: isAr
        ? 'تنفيذ الهياكل الخرسانية المسلحة، الأساسات العميقة، الأعمال المدنية الكبرى، والتشطيبات الفاخرة بأطقم فنية متخصصة ومعدات ذاتية.'
        : 'Executing reinforced concrete frames, deep foundation works, heavy civil installations, and luxury finishing with specialized in-house crews adhering to strict safety codes.',
      points: isAr
        ? ['الحفر العميق ودق الخوازيق والأساسات', 'الهياكل الخرسانية المسلحة المصبوبة بالموقع', 'تشطيبات داخلية ومعمارية فائقة الدقة تسليم مفتاح']
        : ['Subterranean Excavation & Piling', 'Superstructure Cast-in-Place Concrete', 'High-Spec Turnkey Interior Finishing'],
    },
    {
      icon: BarChart3,
      title: isAr ? 'إدارة المشاريع' : 'PROJECT MANAGEMENT',
      badge: isAr ? 'المرحلة ج // التحكم والرقابة' : 'PHASE C // PROGRAM CONTROL',
      heading: isAr ? 'إشراف هندسي EPC متكامل وضمان الجودة الصارم' : 'Comprehensive EPC Oversight & Quality Assurance',
      desc: isAr
        ? 'دمج المعايير والتقنيات الدولية الحديثة مع الرؤية الإقليمية للتحكم بالجدول الزمني، وسلاسل الإمداد، واختبارات الجودة وتسليم المنشأة.'
        : 'Merging modern international industry techniques and standards with regional approaches to manage milestones, supply chains, QA/QC testing, and scheduled client handover.',
      points: isAr
        ? ['إدارة الجداول الزمنية عبر Primavera P6', 'بروتوكولات فحص ومطابقة QA/QC الصارمة', 'فحص وتشغيل الأنظمة وتسليم المشاريع المكتملة']
        : ['Primavera P6 Milestone Controls', 'Rigorous QA/QC Testing Protocols', 'Turnkey Facility Commissioning & Handover'],
    },
  ]

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#09182f] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-300 dark:border-[#434651]/50 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span className={isAr ? 'font-arabic tracking-normal' : ''}>
                  {isAr ? '04 // الثلاثية الهندسية المركزية' : '04 // THE CORE TRIAD'}
                </span>
              </div>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                {isAr ? 'التصميم • الإنشاء • الإدارة' : 'DESIGN • CONSTRUCTION • MANAGEMENT'}
              </h2>
            </div>
            <div className={`mt-4 md:mt-0 ${isAr ? 'text-right md:text-left' : 'text-left md:text-right'}`}>
              <span className={`text-xl sm:text-2xl text-[#ba9563] font-bold block ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                {isAr ? 'نموذج تسليم موحد' : 'UNIFIED DELIVERY MODEL'}
              </span>
              <span className={`text-xs text-slate-500 dark:text-slate-400 tracking-widest uppercase ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                {isAr ? 'مسؤولية تعاقدية وهندسية شاملة من نقطة واحدة' : 'Single-Point Responsibility'}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Columns Triad Display */}
        <RevealChildren className="grid grid-cols-1 lg:grid-cols-3 gap-8" staggerDelay={0.12}>
          {triad.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                className="p-8 bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 flex flex-col justify-between relative shadow-md group"
                variants={fadeUpVariants}
              >
                <BlueprintCrosshair position={isAr ? 'top-right' : 'top-left'} />
                <BlueprintCrosshair position={isAr ? 'bottom-left' : 'bottom-right'} />

                <div>
                  {/* Badge & Icon Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-slate-100 dark:border-[#434651]/40 border-b">
                    <span className={`text-[10px] font-bold text-[#ba9563] uppercase tracking-wider bg-[#ba9563]/10 px-2.5 py-1 border border-[#ba9563]/30 ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                      {item.badge}
                    </span>
                    <div className="w-10 h-10 bg-[#123c82]/10 dark:bg-[#ba9563]/10 border border-[#123c82]/20 dark:border-[#ba9563]/30 flex items-center justify-center text-[#123c82] dark:text-[#ba9563] group-hover:bg-[#ba9563] group-hover:text-slate-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-black text-slate-900 dark:text-white uppercase mb-2 ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                    {item.title}
                  </h3>

                  <h4 className={`text-sm font-bold text-[#ba9563] uppercase mb-4 leading-snug ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                    {item.heading}
                  </h4>

                  <p className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 ${isAr ? 'font-arabic tracking-normal' : "font-['Inter']"}`}>
                    {item.desc}
                  </p>
                </div>

                {/* Bullets */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#434651]/40 space-y-2">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ba9563] shrink-0 mt-0.5" />
                      <span className={isAr ? 'font-arabic tracking-normal' : ''}>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </RevealChildren>
      </div>
    </section>
  )
}
