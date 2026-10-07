'use client'

import { useState } from 'react'
import { Send, CheckCircle2, Phone, Mail, Building } from 'lucide-react'
import { motion } from 'framer-motion'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { COMPANY_PROFILE } from '@/config/site'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'

export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    territory: 'Saudi Arabia (Kingdom-wide)',
    scope: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="relative bg-slate-50 dark:bg-[#0f2244] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300" id="contact">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <RevealOnScroll variants={scaleInVariants} threshold={0.1}>
          <div className="border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] p-6 sm:p-10 md:p-14 relative shadow-2xl">
            <BlueprintCrosshair position="top-left" />
            <BlueprintCrosshair position="top-right" />
            <BlueprintCrosshair position="bottom-left" />
            <BlueprintCrosshair position="bottom-right" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Narrative & Contact Coordinates */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center space-x-2 border border-[#ba9563]/40 bg-slate-50 dark:bg-[#0f2244] px-3 py-1 mb-4">
                  <span className="w-2 h-2 bg-[#ba9563]" />
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
                    INITIATE PARTNERSHIP // TENDER INQUIRY
                  </span>
                </div>

                <h2 className="font-['Montserrat'] text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-white uppercase font-extrabold mb-4 leading-tight">
                  LET’S BUILD SOMETHING SIGNIFICANT.
                </h2>

                <p className="font-['Inter'] text-sm sm:text-base text-slate-600 dark:text-[#c4c6d2] mb-8 max-w-xl leading-relaxed">
                  Engage our senior estimating and structural engineering team directly for master plans, tender submissions, and turnkey EPC collaborations across the region.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-200 dark:border-[#434651]/40 pt-6">
                  <div>
                    <span className="font-['Space_Grotesk'] text-[10px] text-[#ba9563] uppercase tracking-wider block mb-1 flex items-center space-x-1.5 font-semibold">
                      <Mail className="w-3.5 h-3.5" />
                      <span>CENTRAL INQUIRIES</span>
                    </span>
                    <a
                      href={`mailto:${COMPANY_PROFILE.email}`}
                      className="font-['Inter'] text-sm text-slate-900 dark:text-white hover:text-[#ba9563] transition-colors"
                    >
                      {COMPANY_PROFILE.email}
                    </a>
                  </div>

                  <div>
                    <span className="font-['Space_Grotesk'] text-[10px] text-[#ba9563] uppercase tracking-wider block mb-1 flex items-center space-x-1.5 font-semibold">
                      <Phone className="w-3.5 h-3.5" />
                      <span>RIYADH HEADQUARTERS</span>
                    </span>
                    <a
                      href={`tel:${COMPANY_PROFILE.phones[0]}`}
                      className="font-['Space_Grotesk'] text-sm text-slate-900 dark:text-white hover:text-[#ba9563] transition-colors"
                    >
                      {COMPANY_PROFILE.phones[0]}
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#434651]/30 flex items-center space-x-2 text-xs text-slate-500 dark:text-[#8e909c] font-['Space_Grotesk']">
                  <Building className="w-3.5 h-3.5 text-[#ba9563]" />
                  <span>{COMPANY_PROFILE.address.district}, {COMPANY_PROFILE.address.city}, {COMPANY_PROFILE.address.country}</span>
                </div>
              </div>

              {/* Right Welded Blueprint Tender Form */}
              <div className="lg:col-span-5 border border-[#ba9563]/30 p-6 md:p-8 bg-slate-50 dark:bg-[#0f2244]/80 relative shadow-lg">
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                {submitted ? (
                  <div className="py-10 text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-[#ba9563] mx-auto" />
                    <h3 className="font-['Montserrat'] text-xl text-slate-950 dark:text-white font-bold uppercase">
                      Dossier Received
                    </h3>
                    <p className="font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2]">
                      Our estimating and executive engineering desk in Riyadh will review your requirements and respond within 24 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 font-['Space_Grotesk'] text-xs text-[#ba9563] uppercase tracking-wider border-b border-[#ba9563] pb-1 font-semibold"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold">
                        Executive / Organization Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Al-Rashid Development"
                        className="w-full bg-white dark:bg-[#0b1a37] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none transition-colors"
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
                        placeholder="executive@company.com"
                        className="w-full bg-white dark:bg-[#0b1a37] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold">
                        Project Territory *
                      </label>
                      <select
                        value={formData.territory}
                        onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                        className="w-full bg-white dark:bg-[#0b1a37] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none transition-colors"
                      >
                        <option value="Saudi Arabia (Kingdom-wide)">Saudi Arabia (Kingdom-wide)</option>
                        <option value="Arab Republic of Egypt">Arab Republic of Egypt</option>
                        <option value="State of Qatar">State of Qatar</option>
                        <option value="Cross-Border / MENA Region">Cross-Border / MENA Region</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-['Space_Grotesk'] text-[11px] uppercase tracking-[0.15em] text-[#ba9563] mb-1.5 font-semibold">
                        Scope &amp; Engineering Requirement *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        placeholder="Outline structural scale, civil disciplines, tender deadlines..."
                        className="w-full bg-white dark:bg-[#0b1a37] border border-slate-300 dark:border-[#434651] focus:border-[#ba9563] focus:ring-0 text-slate-900 dark:text-white font-['Inter'] text-xs px-4 py-3 rounded-none outline-none resize-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-bold py-4 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <span>SUBMIT PRE-QUALIFICATION DOSSIER</span>
                      <Send className="w-3.5 h-3.5 text-[#0b1a37]" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
