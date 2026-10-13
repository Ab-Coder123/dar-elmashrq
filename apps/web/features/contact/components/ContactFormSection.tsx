'use client'

import { useState } from 'react'
import { Send, CheckCircle2, Phone, Mail, MapPin, Clock, Building2 } from 'lucide-react'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { COMPANY_PROFILE } from '@/config/site'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'
import { useLanguage } from '@/providers/LanguageProvider'

export function ContactFormSection() {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    territory: 'Saudi Arabia (Kingdom-wide)',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="relative bg-slate-50 dark:bg-[#0f2244] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Direct Contact Info & Corporate HQ details */}
          <div className="lg:col-span-5 space-y-8">
            <RevealOnScroll variants={fadeUpVariants}>
              <div>
                <div className="inline-flex items-center gap-2 border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] px-3 py-1 mb-4">
                  <span className="w-2 h-2 bg-[#ba9563]" />
                  <span
                    className={
                      isAr
                        ? "font-['Cairo'] text-xs uppercase tracking-normal text-[#ba9563] font-bold"
                        : "font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold"
                    }
                  >
                    {isAr ? 'دليل الاتصال المعتمد' : 'OFFICIAL DIRECTORY'}
                  </span>
                </div>
                <h2
                  className={
                    isAr
                      ? "font-['Cairo'] text-2xl sm:text-3xl lg:text-4xl text-slate-950 dark:text-white font-extrabold mb-4 leading-tight tracking-normal"
                      : "font-['Montserrat'] text-3xl sm:text-4xl text-slate-950 dark:text-white uppercase font-extrabold mb-4 leading-tight"
                  }
                >
                  {isAr ? 'المقر الرئيسي والإدارة العامة' : 'CORPORATE HEADQUARTERS'}
                </h2>
                <p
                  className={
                    isAr
                      ? "font-['Cairo'] text-sm text-slate-600 dark:text-[#c4c6d2] leading-relaxed tracking-normal"
                      : "font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2] leading-relaxed"
                  }
                >
                  {isAr
                    ? 'يتولى مقرنا الرئيسي في الرياض دراسة وتسعير المناقصات، وإدارة تنفيذ المشاريع، واللوجستيات الهندسية على مستوى منطقة الشرق الأوسط.'
                    : 'Our headquarters in Riyadh coordinates tender estimation, project execution management, and technical logistics across the MENA region.'}
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variants={fadeUpVariants} delay={0.1}>
              <div className="space-y-6 bg-white dark:bg-[#0b1a37] border border-[#ba9563]/30 p-6 sm:p-8 relative shadow-md">
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                {/* Address */}
                {/* Main Branch - Dammam */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-100 dark:bg-[#0f2244] border border-[#ba9563]/40 text-[#ba9563] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className={
                        isAr
                          ? "font-['Cairo'] text-xs font-bold text-[#ba9563] mb-1 tracking-normal"
                          : "font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider text-[#ba9563] mb-1"
                      }
                    >
                      {isAr ? 'مركز الشاطئ للأعمال — الدمام' : 'AL-SHATI BUSINESS CENTER — DAMMAM'}
                    </h3>
                    <p
                      className={
                        isAr
                          ? "font-['Cairo'] text-sm text-slate-800 dark:text-slate-200 leading-snug tracking-normal"
                          : "font-['Inter'] text-sm text-slate-800 dark:text-slate-200 leading-snug"
                      }
                    >
                      {isAr
                        ? 'مركز الشاطئ للأعمال، 8110 طريق الأمير محمد بن فهد، حي الشاطئ الشرقي، الدمام، المملكة العربية السعودية'
                        : 'Al-Shati Business Center, 8110 Prince Mohammed Bin Fahd Road, Al-Shati Al-Sharqi, Dammam, Saudi Arabia'}
                    </p>
                  </div>
                </div>

                {/* Corporate HQ - Riyadh */}
                <div className="flex items-start gap-4 border-t border-slate-100 dark:border-[#434651]/30 pt-6">
                  <div className="p-3 bg-slate-100 dark:bg-[#0f2244] border border-[#ba9563]/40 text-[#ba9563] shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className={
                        isAr
                          ? "font-['Cairo'] text-xs font-bold text-[#ba9563] mb-1 tracking-normal"
                          : "font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider text-[#ba9563] mb-1"
                      }
                    >
                      {isAr ? 'المقر الإداري الرئيسي — الرياض' : 'CORPORATE HQ — RIYADH'}
                    </h3>
                    <p
                      className={
                        isAr
                          ? "font-['Cairo'] text-sm text-slate-800 dark:text-slate-200 leading-snug tracking-normal"
                          : "font-['Inter'] text-sm text-slate-800 dark:text-slate-200 leading-snug"
                      }
                    >
                      {isAr
                        ? 'حي العليا، الرياض 12222، المملكة العربية السعودية'
                        : 'Olaya District, Riyadh 12222, Saudi Arabia'}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 border-t border-slate-100 dark:border-[#434651]/30 pt-6">
                  <div className="p-3 bg-slate-100 dark:bg-[#0f2244] border border-[#ba9563]/40 text-[#ba9563] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className={
                        isAr
                          ? "font-['Cairo'] text-xs font-bold text-[#ba9563] mb-1 tracking-normal"
                          : "font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider text-[#ba9563] mb-1"
                      }
                    >
                      {isAr ? 'البريد الإلكتروني المركزي' : 'CENTRAL EMAIL INQUIRIES'}
                    </h3>
                    <a
                      href={`mailto:${COMPANY_PROFILE.email}`}
                      className="font-mono text-sm text-slate-800 dark:text-slate-200 hover:text-[#ba9563] transition-colors"
                    >
                      {COMPANY_PROFILE.email}
                    </a>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-4 border-t border-slate-100 dark:border-[#434651]/30 pt-6">
                  <div className="p-3 bg-slate-100 dark:bg-[#0f2244] border border-[#ba9563]/40 text-[#ba9563] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className={
                        isAr
                          ? "font-['Cairo'] text-xs font-bold text-[#ba9563] mb-1 tracking-normal"
                          : "font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider text-[#ba9563] mb-1"
                      }
                    >
                      {isAr ? 'أرقام الهاتف المباشرة' : 'DIRECT TELEPHONE LINES'}
                    </h3>
                    <div className="flex flex-col space-y-1 font-mono text-sm text-slate-800 dark:text-slate-200" dir="ltr">
                      {COMPANY_PROFILE.phones.map((phone, idx) => (
                        <a key={idx} href={`tel:${phone}`} className="hover:text-[#ba9563] transition-colors">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 border-t border-slate-100 dark:border-[#434651]/30 pt-6">
                  <div className="p-3 bg-slate-100 dark:bg-[#0f2244] border border-[#ba9563]/40 text-[#ba9563] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className={
                        isAr
                          ? "font-['Cairo'] text-xs font-bold text-[#ba9563] mb-1 tracking-normal"
                          : "font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider text-[#ba9563] mb-1"
                      }
                    >
                      {isAr ? 'ساعات العمل الرسمية' : 'BUSINESS HOURS'}
                    </h3>
                    <p
                      className={
                        isAr
                          ? "font-['Cairo'] text-xs text-slate-600 dark:text-[#c4c6d2] tracking-normal"
                          : "font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2]"
                      }
                    >
                      {isAr ? (
                        <>
                          الأحد – الخميس: 08:00 صباحاً – 05:00 مساءً (توقيت مكة)<br />
                          الجمعة – السبت: عطلة أسبوعية
                        </>
                      ) : (
                        <>
                          Sunday – Thursday: 08:00 AM – 05:00 PM (AST)<br />
                          Friday – Saturday: Closed
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Executive Direct Communication Directory */}
                <div className="border-t border-slate-100 dark:border-[#434651]/30 pt-6">
                  <h3
                    className={
                      isAr
                        ? "font-['Cairo'] text-xs font-bold text-[#ba9563] mb-3 tracking-normal"
                        : "font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider text-[#ba9563] mb-3"
                    }
                  >
                    {isAr ? 'التواصل المباشر مع قيادات الشركة' : 'EXECUTIVE LEADERSHIP DIRECTORY'}
                  </h3>
                  <div className="space-y-3">
                    {/* Raafat Hashim - CEO */}
                    <div className="p-3 bg-slate-50 dark:bg-[#0f2244]/60 border border-slate-200 dark:border-[#434651]/40 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                        <span>{isAr ? 'رأفت هاشم' : 'Raafat Hashim'}</span>
                        <span className="text-[#ba9563] text-[10px] uppercase font-semibold">
                          {isAr ? 'الرئيس التنفيذي' : 'CEO'}
                        </span>
                      </div>
                      <div className="mt-1.5 flex flex-col gap-0.5 font-mono text-[11px] text-slate-600 dark:text-[#c4c6d2]">
                        <div className="flex items-center gap-1.5" dir="ltr">
                          <Phone className="w-3 h-3 text-[#ba9563]" />
                          <a href="tel:+966581605812" className="hover:text-[#ba9563]">+966 58 160 5812</a>
                          <span className="text-slate-400">/</span>
                          <a href="tel:+97470555573" className="hover:text-[#ba9563]">+974 70 5555 73</a>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-[#ba9563]" />
                          <a href="mailto:r.hashim@elmashrq.com" className="hover:text-[#ba9563]">r.hashim@elmashrq.com</a>
                        </div>
                      </div>
                    </div>

                    {/* Mohamed El Shenawy - Operations */}
                    <div className="p-3 bg-slate-50 dark:bg-[#0f2244]/60 border border-slate-200 dark:border-[#434651]/40 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                        <span>{isAr ? 'محمد الشناوي' : 'Mohamed El Shenawy'}</span>
                        <span className="text-[#ba9563] text-[10px] uppercase font-semibold">
                          {isAr ? 'مدير العمليات' : 'Operations Dir.'}
                        </span>
                      </div>
                      <div className="mt-1.5 flex flex-col gap-0.5 font-mono text-[11px] text-slate-600 dark:text-[#c4c6d2]">
                        <div className="flex items-center gap-1.5" dir="ltr">
                          <Phone className="w-3 h-3 text-[#ba9563]" />
                          <a href="tel:+966548821738" className="hover:text-[#ba9563]">+966 54 882 1738</a>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-[#ba9563]" />
                          <a href="mailto:m.elshenawy@elmashrq.com" className="hover:text-[#ba9563]">m.elshenawy@elmashrq.com</a>
                        </div>
                      </div>
                    </div>

                    {/* Walid Salem - Business Development */}
                    <div className="p-3 bg-slate-50 dark:bg-[#0f2244]/60 border border-slate-200 dark:border-[#434651]/40 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                        <span>{isAr ? 'وليد سالم' : 'Walid Salem'}</span>
                        <span className="text-[#ba9563] text-[10px] uppercase font-semibold">
                          {isAr ? 'مدير تطوير الأعمال' : 'Business Dev.'}
                        </span>
                      </div>
                      <div className="mt-1.5 flex flex-col gap-0.5 font-mono text-[11px] text-slate-600 dark:text-[#c4c6d2]">
                        <div className="flex items-center gap-1.5" dir="ltr">
                          <Phone className="w-3 h-3 text-[#ba9563]" />
                          <a href="tel:+966547552373" className="hover:text-[#ba9563]">+966 54 755 2373</a>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-[#ba9563]" />
                          <a href="mailto:w.salem@elmashrq.com" className="hover:text-[#ba9563]">w.salem@elmashrq.com</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Contact & Tender Form */}
          <div className="lg:col-span-7">
            <RevealOnScroll variants={scaleInVariants} threshold={0.1}>
              <div className="border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] p-6 sm:p-10 md:p-12 relative shadow-2xl">
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="top-right" />
                <BlueprintCrosshair position="bottom-left" />
                <BlueprintCrosshair position="bottom-right" />

                <h3
                  className={
                    isAr
                      ? "font-['Cairo'] text-2xl sm:text-3xl text-slate-950 dark:text-white font-extrabold mb-2 tracking-normal"
                      : "font-['Montserrat'] text-2xl sm:text-3xl text-slate-950 dark:text-white uppercase font-extrabold mb-2"
                  }
                >
                  {isAr ? 'إرسال طلب استفسار أو مناقصة' : 'TRANSMIT AN INQUIRY'}
                </h3>
                <p
                  className={
                    isAr
                      ? "font-['Cairo'] text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] mb-8 tracking-normal"
                      : "font-['Inter'] text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] mb-8"
                  }
                >
                  {isAr
                    ? 'أدخل بيانات مشروعك أو استفسارك الهندسي أدناه. سيقوم فريق دراسة المشاريع والمناقصات بالرد خلال 24 ساعة عمل.'
                    : 'Fill in your project details or tender inquiry below. Our senior engineering and procurement team will respond within 24 business hours.'}
                </p>

                {submitted ? (
                  <div className="py-16 text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-[#ba9563] mx-auto" />
                    <h3
                      className={
                        isAr
                          ? "font-['Cairo'] text-2xl text-slate-950 dark:text-white font-bold tracking-normal"
                          : "font-['Montserrat'] text-2xl text-slate-950 dark:text-white font-bold uppercase"
                      }
                    >
                      {isAr ? 'تم إرسال الطلب بنجاح' : 'INQUIRY TRANSMITTED SUCCESSFULLY'}
                    </h3>
                    <p
                      className={
                        isAr
                          ? "font-['Cairo'] text-sm text-slate-600 dark:text-[#c4c6d2] max-w-md mx-auto tracking-normal"
                          : "font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2] max-w-md mx-auto"
                      }
                    >
                      {isAr
                        ? 'شكراً لتواصلك مع شركة دار المشرق. تم توجيه رسالتك إلى الإدارة الهندسية والتسعيرية في الرياض للمتابعة الفورية.'
                        : 'Thank you for contacting Dar El Mashrq. Your communication has been routed to our executive engineering desk in Riyadh.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className={
                        isAr
                          ? "mt-6 font-['Cairo'] text-xs text-[#ba9563] border-b border-[#ba9563] pb-1 font-bold hover:text-[#d4b27a] transition-colors tracking-normal"
                          : "mt-6 font-['Space_Grotesk'] text-xs text-[#ba9563] uppercase tracking-wider border-b border-[#ba9563] pb-1 font-semibold hover:text-[#d4b27a] transition-colors"
                      }
                    >
                      {isAr ? 'إرسال رسالة أخرى' : 'Send another message'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          className={
                            isAr
                              ? "block font-['Cairo'] text-xs text-[#ba9563] mb-1.5 font-bold tracking-normal"
                              : "block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold"
                          }
                        >
                          {isAr ? 'الاسم الكامل / اسم الجهة أو الشركة *' : 'Full Name / Organization *'}
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={isAr ? 'مثال: م. عبدالله المنصور' : 'e.g. Eng. Abdullah Al-Mansoor'}
                          className={
                            isAr
                              ? "w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Cairo'] text-xs px-4 py-3 rounded-none outline-none transition-colors tracking-normal"
                              : "w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none transition-colors"
                          }
                        />
                      </div>

                      <div>
                        <label
                          className={
                            isAr
                              ? "block font-['Cairo'] text-xs text-[#ba9563] mb-1.5 font-bold tracking-normal"
                              : "block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold"
                          }
                        >
                          {isAr ? 'البريد الإلكتروني للعمل *' : 'Corporate Email *'}
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-mono text-xs px-4 py-3 rounded-none outline-none transition-colors"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          className={
                            isAr
                              ? "block font-['Cairo'] text-xs text-[#ba9563] mb-1.5 font-bold tracking-normal"
                              : "block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold"
                          }
                        >
                          {isAr ? 'رقم الهاتف / الجوال' : 'Phone Number'}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+966 ..."
                          className="w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-mono text-xs px-4 py-3 rounded-none outline-none transition-colors"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <label
                          className={
                            isAr
                              ? "block font-['Cairo'] text-xs text-[#ba9563] mb-1.5 font-bold tracking-normal"
                              : "block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold"
                          }
                        >
                          {isAr ? 'نطاق المشروع الجغرافي *' : 'Project Territory *'}
                        </label>
                        <select
                          value={formData.territory}
                          onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                          className={
                            isAr
                              ? "w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Cairo'] text-xs px-4 py-3 rounded-none outline-none transition-colors tracking-normal"
                              : "w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none transition-colors"
                          }
                        >
                          <option value="Saudi Arabia (Kingdom-wide)">
                            {isAr ? 'المملكة العربية السعودية (كافة المناطق)' : 'Saudi Arabia (Kingdom-wide)'}
                          </option>
                          <option value="Arab Republic of Egypt">
                            {isAr ? 'جمهورية مصر العربية' : 'Arab Republic of Egypt'}
                          </option>
                          <option value="State of Qatar">
                            {isAr ? 'دولة قطر' : 'State of Qatar'}
                          </option>
                          <option value="Other MENA Region">
                            {isAr ? 'منطقة الشرق الأوسط وشمال أفريقيا' : 'Other MENA Region'}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        className={
                          isAr
                            ? "block font-['Cairo'] text-xs text-[#ba9563] mb-1.5 font-bold tracking-normal"
                            : "block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold"
                        }
                      >
                        {isAr ? 'موضوع الرسالة / نوع الطلب *' : 'Subject / Inquiry Type *'}
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={
                          isAr
                            ? 'مثال: تأهيل مناقصة / طلب أعمال مدنية وإنشائية'
                            : 'e.g. Tender Prequalification / Civil Works Request'
                        }
                        className={
                          isAr
                            ? "w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Cairo'] text-xs px-4 py-3 rounded-none outline-none transition-colors tracking-normal"
                            : "w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none transition-colors"
                        }
                      />
                    </div>

                    <div>
                      <label
                        className={
                          isAr
                            ? "block font-['Cairo'] text-xs text-[#ba9563] mb-1.5 font-bold tracking-normal"
                            : "block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold"
                        }
                      >
                        {isAr ? 'تفاصيل ونطاق المشروع *' : 'Project Details & Scope *'}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={
                          isAr
                            ? 'يرجى توضيح نطاق المشروع، موقعه، الخدمات المطلوبة (أعمال مدنية، كهرباء، تكييف، كهروميكانيك)، والجدول الزمني...'
                            : 'Provide project scope, location, required services (Civil, Electrical, HVAC, MEP), and timeline...'
                        }
                        className={
                          isAr
                            ? "w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Cairo'] text-xs px-4 py-3 rounded-none outline-none resize-none transition-colors tracking-normal"
                            : "w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none resize-none transition-colors"
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      className={
                        isAr
                          ? "w-full bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Cairo'] text-xs sm:text-sm font-bold py-4 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg tracking-normal"
                          : "w-full bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-bold py-4 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                      }
                    >
                      <span>{isAr ? 'إرسال الطلب الرسمي' : 'SUBMIT FORMAL INQUIRY'}</span>
                      <Send className="w-3.5 h-3.5 text-[#0b1a37]" />
                    </button>
                  </form>
                )}
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  )
}

