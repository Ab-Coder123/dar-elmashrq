import Link from 'next/link'
import Image from 'next/image'
import { Building2, Compass, ShieldCheck, Ruler } from 'lucide-react'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { COMPANY_PROFILE } from '@/config/site'

export function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-[#0b1a37] border-t border-slate-200 dark:border-[#434651]/40 text-slate-800 dark:text-[#d7e2ff] relative transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto pt-16 md:pt-24 pb-12 relative">
        <BlueprintCrosshair position="top-left" />
        <BlueprintCrosshair position="top-right" />

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-slate-300/60 dark:border-[#434651]/40">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="relative h-12 w-48 mb-4">
              <Image
                src="/dar-elmashrq-logo.png"
                alt="DAR EL MASHRQ Logo"
                fill
                sizes="192px"
                className="object-contain drop-shadow"
              />
            </div>
            <p className="font-['Space_Grotesk'] text-xs text-[#ba9563] uppercase tracking-[0.2em] mb-4 font-semibold">
              DAR EL MASHRQ • TRADING &amp; CONTRACTING CO. • EST. 1994
            </p>
            <p className="font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2] max-w-sm leading-relaxed mb-6">
              A tier-one civil, architectural, and electro-mechanical engineering powerhouse.
              Delivering sovereign value and structural excellence across the GCC and North Africa.
            </p>

            <div className="flex items-center space-x-4 text-[#ba9563]">
              <Ruler className="w-5 h-5" />
              <Compass className="w-5 h-5" />
              <ShieldCheck className="w-5 h-5" />
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          {/* Regional Bureaus */}
          <div>
            <h4 className="font-['Montserrat'] text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-l-2 border-[#ba9563] pl-3">
              Regional Bureaus
            </h4>
            <ul className="space-y-3 font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-[#c4c6d2]">
              <li>
                <Link href="/#presence" className="hover:text-[#ba9563] transition-colors block">
                  Olaya Head Office, Riyadh
                </Link>
              </li>
              <li>
                <Link href="/#presence" className="hover:text-[#ba9563] transition-colors block">
                  Doha Operational Hub
                </Link>
              </li>
              <li>
                <Link href="/#presence" className="hover:text-[#ba9563] transition-colors block">
                  Cairo Regional Bureau
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <h4 className="font-['Montserrat'] text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-l-2 border-[#ba9563] pl-3">
              Compliance
            </h4>
            <ul className="space-y-3 font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-[#c4c6d2]">
              <li>
                <Link href="/#credentials" className="hover:text-[#ba9563] transition-colors block">
                  Engineering Standards
                </Link>
              </li>
              <li>
                <Link href="/#credentials" className="hover:text-[#ba9563] transition-colors block">
                  Pre-Qualification Dossier
                </Link>
              </li>
              <li>
                <Link href="/#credentials" className="hover:text-[#ba9563] transition-colors block">
                  Statutory Licenses
                </Link>
              </li>
              <li>
                <Link href="/#credentials" className="hover:text-[#ba9563] transition-colors block">
                  Monshaat Accreditation
                </Link>
              </li>
            </ul>
          </div>

          {/* Headquarters Info */}
          <div>
            <h4 className="font-['Montserrat'] text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-l-2 border-[#ba9563] pl-3">
              Headquarters
            </h4>
            <p className="font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2] leading-relaxed mb-4">
              {COMPANY_PROFILE.address.district}, {COMPANY_PROFILE.address.city}
              <br />
              {COMPANY_PROFILE.address.country}
              <br />
              <span className="text-[#ba9563] font-['Space_Grotesk'] mt-1 inline-block font-semibold">
                {COMPANY_PROFILE.phones[0]}
              </span>
            </p>
            <div className="border border-[#ba9563]/40 bg-white/50 dark:bg-transparent p-2 text-center text-[#ba9563] font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.15em] font-semibold">
              DRAWN BLUEPRINT APPROVED
            </div>
          </div>
        </div>

        {/* Copyright & Technical CAD Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 dark:text-[#8e909c] text-[11px] font-['Space_Grotesk'] tracking-[0.15em]">
          <div>
            &copy; 1994&ndash;2024 DAR EL MASHRQ TRADING &amp; CONTRACTING CO. ALL RIGHTS RESERVED.
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4 text-[#ba9563]">
            <span className="uppercase font-semibold">ENGINEERED CAD STANDARD</span>
            <span>//</span>
            <span className="uppercase font-semibold">TIER-ONE ACCREDITED</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
