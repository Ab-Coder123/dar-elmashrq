'use client'

import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

export function ProjectsIntro() {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  return (
    <section className="relative bg-white dark:bg-[#0b1a37] py-16 md:py-24 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <RevealOnScroll variants={fadeUpVariants}>
          <div className="border border-[#ba9563]/30 bg-slate-50 dark:bg-[#0f2244] p-8 sm:p-12 md:p-14 relative shadow-sm">
            <BlueprintCrosshair position={isAr ? 'top-right' : 'top-left'} />
            <BlueprintCrosshair position={isAr ? 'bottom-left' : 'bottom-right'} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Heading & Discipline Badge */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] px-3 py-1 mb-4">
                  <span className="w-2 h-2 bg-[#ba9563]" />
                  <span className={`text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold ${isAr ? 'font-arabic tracking-normal' : "font-['Space_Grotesk']"}`}>
                    {isAr ? 'معايير المحفظة // تميز وتخصص قطاعي' : 'PORTFOLIO CRITERIA // SECTOR MASTERY'}
                  </span>
                </div>

                <h2 className={`text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold leading-tight ${isAr ? 'font-arabic tracking-normal' : "font-['Montserrat']"}`}>
                  {isAr ? (
                    <>
                      هندسة مصممة للتوسع، <br />
                      <span className="text-[#ba9563]">وبناء يدوم لعقود</span>
                    </>
                  ) : (
                    <>
                      ENGINEERED FOR SCALE, <br />
                      <span className="text-[#ba9563]">BUILT FOR ENDURANCE</span>
                    </>
                  )}
                </h2>
              </div>

              {/* Right Column: Editorial Body */}
              <div className={`lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] leading-relaxed border-t lg:border-t-0 ${isAr ? 'lg:border-r lg:pr-10 font-arabic tracking-normal' : "lg:border-l lg:pl-10 font-['Inter']"} border-slate-200 dark:border-[#434651]/40 pt-6 lg:pt-0`}>
                <p>
                  {isAr
                    ? 'يعكس كل مشروع في هذا السجل معاييرنا الصارمة في التنفيذ الميداني الذاتي المباشر. من مجمعات الإسكان الكبرى المكونة من 30 عمارة إلى المنشآت الأمنية والسيادية في المدينة المنورة والواجهات التجارية الفاخرة بالرياض، توازن دار المشرق بين دقة الهندسة الإنشائية والمسؤولية الكاملة من نقطة واحدة.'
                    : 'Every contract in this index reflects our rigorous standards of self-performed execution. From 30-tower residential master developments in New Cairo to sovereign security facilities in Madinah and bespoke commercial facades across Riyadh, Dar El Mashrq balances structural engineering precision with single-point accountability.'}
                </p>
                <p className={`text-xs sm:text-sm text-slate-500 dark:text-[#8e909c] uppercase tracking-wider ${isAr ? 'font-arabic tracking-normal text-xs' : "font-['Space_Grotesk']"}`}>
                  {isAr
                    ? 'التخصصات المطبقة: الهياكل المدنية // الكهروميكانيكا والتكييف // السلامة ومكافحة الحريق // البنية التحتية الكبرى // التشطيبات المعمارية الفاخرة'
                    : 'DISCIPLINES APPLIED: CIVIL STRUCTURES // MEP & HVAC // FIRE LIFE-SAFETY // HEAVY INFRASTRUCTURE // ARCHITECTURAL FINISHES'}
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
