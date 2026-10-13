'use client'

import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/motion'
import { MapPin, Building, Globe, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/providers/LanguageProvider'

export function RegionalCapability() {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  const hubs = [
    {
      country: isAr ? 'المملكة العربية السعودية' : 'SAUDI ARABIA',
      badge: isAr ? 'المقر الرئيسي للمجموعة // الرياض' : 'MAIN CORPORATE HQ // RIYADH',
      scope: isAr ? 'مقاولات عامة ومشاريع EPC كبرى' : 'General Contracting & Commercial EPC',
      desc: isAr
        ? 'تنفيذ مشاريع حكومية وتجارية وطبية متكاملة تسليم مفتاح في الرياض، المنطقة الشرقية، والمدينة المنورة.'
        : 'Executing turnkey government, commercial, and medical developments across Riyadh, Eastern Province, Madinah, and Western regions.',
      capabilities: isAr
        ? ['أعمال معتمدة بالدفاع المدني (فئة أولى)', 'بنية تحتية وكهروميكانيكا تسليم مفتاح', 'هندسة واجهات معمارية للمباني الفاخرة']
        : ['Civil Defense Grade-A Works', 'Turnkey MEP & Infrastructure', 'Corporate Facade Engineering'],
      icon: Building,
    },
    {
      country: isAr ? 'جمهورية مصر العربية' : 'EGYPT',
      badge: isAr ? 'العمليات الإقليمية // القاهرة' : 'REGIONAL OPERATIONS // CAIRO',
      scope: isAr ? 'مجمعات سكنية وسلاسل تجارية كبرى' : 'Multi-Tower Housing & Commercial Chains',
      desc: isAr
        ? 'أكثر من عقد من الإنجازات في السلاسل التجارية الكبرى (أكثر من 21 فرعاً) والأبراج السكنية الضخمة (أكثر من 30 برجاً).'
        : 'Over a decade of landmark commercial retail networks (21+ branches) and high-density residential towers (30+ towers).',
      capabilities: isAr
        ? ['مجمعات ومجموعات إسكان ضخمة', 'سلاسل تجهيز وتشطيب الفروع التجارية', 'توسعات وتجهيز المستشفيات المركزية']
        : ['Mass Housing Complexes', 'Commercial Fit-Out Chains', 'Central Hospital Expansions'],
      icon: Globe,
    },
    {
      country: isAr ? 'دولة قطر' : 'QATAR',
      badge: isAr ? 'مقاولات الخليج // الدوحة' : 'GULF CONTRACTING // DOHA',
      scope: isAr ? 'مجمعات سكنية ومبانٍ تجارية' : 'Residential Complexes & Commercial Hubs',
      desc: isAr
        ? 'تطوير المجمعات السكنية الفاخرة، والمنشآت التجارية، والأعمال الإنشائية عالية الدقة وفق أعلى الاشتراطات البلدية.'
        : 'Developing private luxury compounds, commercial facilities, and high-spec structural works across municipal zones.',
      capabilities: isAr
        ? ['مجمعات وفلل سكنية فائقة الفخامة', 'أعمال إنشائية وهياكل تجارية', 'تشطيبات نهائية معمارية متكاملة']
        : ['High-Spec Residential Compounds', 'Commercial Structural Works', 'Turnkey Luxury Finishes'],
      icon: Building,
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
                  {isAr ? '06 // الانتشار والقدرة الإقليمية' : '06 // REGIONAL CAPABILITY'}
                </span>
              </div>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                {isAr ? 'نطاق تشغيلي متكامل في 3 دول' : 'TRI-STATE OPERATIONAL REACH'}
              </h2>
            </div>
            <div className={`mt-4 md:mt-0 ${isAr ? 'text-right md:text-left' : 'text-left md:text-right'}`}>
              <span className={`text-xl sm:text-2xl text-[#ba9563] font-bold block ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                {isAr ? 'السعودية • مصر • قطر' : 'KSA • EGY • QAT'}
              </span>
              <span className={`text-xs text-slate-500 dark:text-slate-400 tracking-widest uppercase ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                {isAr ? 'تنفيذ مباشر وتراخيص معتمدة' : 'Licensed Direct Execution'}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Regional Cards */}
        <RevealChildren className="grid grid-cols-1 lg:grid-cols-3 gap-8" staggerDelay={0.12}>
          {hubs.map((hub, idx) => {
            const Icon = hub.icon
            return (
              <motion.div
                key={idx}
                className="p-8 bg-white dark:bg-[#0b1a37] border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 flex flex-col justify-between relative shadow-md group"
                variants={fadeUpVariants}
              >
                <BlueprintCrosshair position={isAr ? 'top-right' : 'top-left'} />
                <BlueprintCrosshair position={isAr ? 'bottom-left' : 'bottom-right'} />

                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-slate-100 dark:border-[#434651]/40 border-b">
                    <span className={`text-[10px] font-bold text-[#ba9563] uppercase tracking-wider bg-[#ba9563]/10 px-2.5 py-1 border border-[#ba9563]/30 ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                      {hub.badge}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#ba9563] transition-colors" />
                  </div>

                  <h3 className={`text-2xl font-black text-slate-900 dark:text-white uppercase mb-2 ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                    {hub.country}
                  </h3>

                  <div className={`text-xs font-bold text-[#ba9563] uppercase mb-4 ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                    {hub.scope}
                  </div>

                  <p className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 ${isAr ? 'font-arabic tracking-normal' : "font-['Inter']"}`}>
                    {hub.desc}
                  </p>
                </div>

                {/* Capabilities */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#434651]/40 space-y-2">
                  {hub.capabilities.map((cap, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ba9563] shrink-0 mt-0.5" />
                      <span className={isAr ? 'font-arabic tracking-normal' : ''}>{cap}</span>
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
