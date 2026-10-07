'use client'

import { useState } from 'react'
import { Send, CheckCircle2, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { COMPANY_PROFILE } from '@/config/site'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'

export function ContactFormSection() {
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
                <div className="inline-flex items-center space-x-2 border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] px-3 py-1 mb-4">
                  <span className="w-2 h-2 bg-[#ba9563]" />
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
                    OFFICIAL DIRECTORY
                  </span>
                </div>
                <h2 className="font-['Montserrat'] text-3xl sm:text-4xl text-slate-950 dark:text-white uppercase font-extrabold mb-4 leading-tight">
                  CORPORATE HEADQUARTERS
                </h2>
                <p className="font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2] leading-relaxed">
                  Our headquarters in Riyadh coordinates tender estimation, project execution management, and technical logistics across the MENA region.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variants={fadeUpVariants} delay={0.1}>
              <div className="space-y-6 bg-white dark:bg-[#0b1a37] border border-[#ba9563]/30 p-6 sm:p-8 relative shadow-md">
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-slate-100 dark:bg-[#0f2244] border border-[#ba9563]/40 text-[#ba9563] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider text-[#ba9563] mb-1">
                      RIYADH HQ ADDRESS
                    </h3>
                    <p className="font-['Inter'] text-sm text-slate-800 dark:text-slate-200 leading-snug">
                      {COMPANY_PROFILE.address.district}, {COMPANY_PROFILE.address.city}, {COMPANY_PROFILE.address.country}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 border-t border-slate-100 dark:border-[#434651]/30 pt-6">
                  <div className="p-3 bg-slate-100 dark:bg-[#0f2244] border border-[#ba9563]/40 text-[#ba9563] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider text-[#ba9563] mb-1">
                      CENTRAL EMAIL INQUIRIES
                    </h3>
                    <a
                      href={`mailto:${COMPANY_PROFILE.email}`}
                      className="font-['Inter'] text-sm text-slate-800 dark:text-slate-200 hover:text-[#ba9563] transition-colors"
                    >
                      {COMPANY_PROFILE.email}
                    </a>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start space-x-4 border-t border-slate-100 dark:border-[#434651]/30 pt-6">
                  <div className="p-3 bg-slate-100 dark:bg-[#0f2244] border border-[#ba9563]/40 text-[#ba9563] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider text-[#ba9563] mb-1">
                      DIRECT TELEPHONE LINES
                    </h3>
                    <div className="flex flex-col space-y-1 font-['Space_Grotesk'] text-sm text-slate-800 dark:text-slate-200">
                      {COMPANY_PROFILE.phones.map((phone, idx) => (
                        <a key={idx} href={`tel:${phone}`} className="hover:text-[#ba9563] transition-colors">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4 border-t border-slate-100 dark:border-[#434651]/30 pt-6">
                  <div className="p-3 bg-slate-100 dark:bg-[#0f2244] border border-[#ba9563]/40 text-[#ba9563] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider text-[#ba9563] mb-1">
                      BUSINESS HOURS
                    </h3>
                    <p className="font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2]">
                      Sunday – Thursday: 08:00 AM – 05:00 PM (AST)<br />
                      Friday – Saturday: Closed
                    </p>
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

                <h3 className="font-['Montserrat'] text-2xl sm:text-3xl text-slate-950 dark:text-white uppercase font-extrabold mb-2">
                  TRANSMIT AN INQUIRY
                </h3>
                <p className="font-['Inter'] text-xs sm:text-sm text-slate-600 dark:text-[#c4c6d2] mb-8">
                  Fill in your project details or tender inquiry below. Our senior engineering and procurement team will respond within 24 business hours.
                </p>

                {submitted ? (
                  <div className="py-16 text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-[#ba9563] mx-auto" />
                    <h3 className="font-['Montserrat'] text-2xl text-slate-950 dark:text-white font-bold uppercase">
                      INQUIRY TRANSMITTED SUCCESSFULLY
                    </h3>
                    <p className="font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2] max-w-md mx-auto">
                      Thank you for contacting Dar El Mashrq. Your communication has been routed to our executive engineering desk in Riyadh.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 font-['Space_Grotesk'] text-xs text-[#ba9563] uppercase tracking-wider border-b border-[#ba9563] pb-1 font-semibold hover:text-[#d4b27a] transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold">
                          Full Name / Organization *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Eng. Abdullah Al-Mansoor"
                          className="w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold">
                          Corporate Email *
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+966 ..."
                          className="w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold">
                          Project Territory *
                        </label>
                        <select
                          value={formData.territory}
                          onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none transition-colors"
                        >
                          <option value="Saudi Arabia (Kingdom-wide)">Saudi Arabia (Kingdom-wide)</option>
                          <option value="Arab Republic of Egypt">Arab Republic of Egypt</option>
                          <option value="State of Qatar">State of Qatar</option>
                          <option value="Other MENA Region">Other MENA Region</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold">
                        Subject / Inquiry Type *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Tender Prequalification / Civil Works Request"
                        className="w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold">
                        Project Details &amp; Scope *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Provide project scope, location, required services (Civil, Electrical, HVAC, MEP), and timeline..."
                        className="w-full bg-slate-50 dark:bg-[#0f2244] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none resize-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-bold py-4 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <span>SUBMIT FORMAL INQUIRY</span>
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
