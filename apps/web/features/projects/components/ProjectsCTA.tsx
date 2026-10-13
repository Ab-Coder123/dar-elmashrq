import Link from 'next/link'
import { ArrowRight, ArrowLeft, Send, Mail, Phone, Building2 } from 'lucide-react'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { scaleInVariants } from '@/lib/motion'
import { COMPANY_PROFILE } from '@/config/site'
import { useLanguage } from '@/providers/LanguageProvider'

export function ProjectsCTA() {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  return (
    <section className="relative bg-white dark:bg-[#0b1a37] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <RevealOnScroll variants={scaleInVariants} threshold={0.1}>
          <div className="border border-[#ba9563]/40 bg-slate-50 dark:bg-[#0f2244] p-8 sm:p-12 md:p-16 relative shadow-xl">
            <BlueprintCrosshair position="top-left" />
            <BlueprintCrosshair position="top-right" />
            <BlueprintCrosshair position="bottom-left" />
            <BlueprintCrosshair position="bottom-right" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] px-3 py-1 mb-4">
                  <span className="w-2 h-2 bg-[#ba9563]" />
                  <span
                    className={
                      isAr
                        ? "font-['Cairo'] text-xs uppercase tracking-normal text-[#ba9563] font-bold"
                        : "font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold"
                    }
                  >
                    {isAr ? 'طرح وترسية مناقصات المشاريع وعقود EPC' : 'EPC TENDER PROCUREMENT'}
                  </span>
                </div>

                <h2
                  className={
                    isAr
                      ? "font-['Cairo'] text-2xl sm:text-3xl lg:text-4xl text-slate-950 dark:text-white font-extrabold mb-4 leading-tight tracking-normal"
                      : "font-['Montserrat'] text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold mb-4 leading-tight"
                  }
                >
                  {isAr ? (
                    <>
                      هل تحتاج إلى مقاولات تسليم مفتاح <br />
                      <span className="text-[#ba9563]">لمشروعك الإنشائي والاستثماري القادم؟</span>
                    </>
                  ) : (
                    <>
                      REQUIRE TURNKEY CONTRACTING <br />
                      <span className="text-[#ba9563]">FOR YOUR NEXT CAPITAL PROJECT?</span>
                    </>
                  )}
                </h2>

                <p
                  className={
                    isAr
                      ? "font-['Cairo'] text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] max-w-2xl leading-relaxed mb-8 tracking-normal"
                      : "font-['Inter'] text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] max-w-2xl leading-relaxed mb-8"
                  }
                >
                  {isAr
                    ? 'تواصل مع إدارة حساب الكميات والتسعير وكبار المهندسين الإنشائيين في الرياض لمراجعة كراسات الشروط، وتدقيق جداول الكميات، وبحث التعاقد المشترك بنظام تسليم المفتاح EPC.'
                    : 'Connect with our executive estimating department and senior structural engineers in Riyadh for RFP reviews, BOQ validations, and turnkey EPC collaborations.'}
                </p>

                <div
                  className={
                    isAr
                      ? "flex flex-wrap gap-6 text-xs sm:text-sm font-['Cairo'] text-slate-700 dark:text-slate-300 tracking-normal"
                      : "flex flex-wrap gap-6 text-xs font-['Space_Grotesk'] text-slate-700 dark:text-slate-300"
                  }
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#ba9563]" />
                    <a href={`mailto:${COMPANY_PROFILE.email}`} className="hover:text-[#ba9563] font-mono">
                      {COMPANY_PROFILE.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#ba9563]" />
                    <a href={`tel:${COMPANY_PROFILE.phones[0]}`} className="hover:text-[#ba9563] font-mono" dir="ltr">
                      {COMPANY_PROFILE.phones[0]}
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col space-y-4">
                <Link
                  href="/contact"
                  className={
                    isAr
                      ? "w-full bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Cairo'] text-xs sm:text-sm tracking-normal font-bold py-4 px-6 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg group text-center"
                      : "w-full bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-bold py-4 px-6 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg group text-center"
                  }
                >
                  <span>{isAr ? 'تقديم كراسة المناقصة // طلب عرض سعر' : 'SUBMIT TENDER DOSSIER'}</span>
                  {isAr ? (
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  )}
                </Link>

                <Link
                  href="/services"
                  className={
                    isAr
                      ? "w-full border border-slate-300 dark:border-[#434651] hover:border-[#ba9563] bg-white dark:bg-[#0b1a37] text-slate-900 dark:text-white font-['Cairo'] text-xs sm:text-sm tracking-normal font-bold py-4 px-6 transition-all duration-200 flex items-center justify-center gap-2 text-center"
                      : "w-full border border-slate-300 dark:border-[#434651] hover:border-[#ba9563] bg-white dark:bg-[#0b1a37] text-slate-900 dark:text-white font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-semibold py-4 px-6 transition-all duration-200 flex items-center justify-center gap-2 text-center"
                  }
                >
                  <span>{isAr ? 'استعراض الإمكانيات والخدمات الهندسية' : 'REVIEW TECHNICAL CAPABILITIES'}</span>
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

