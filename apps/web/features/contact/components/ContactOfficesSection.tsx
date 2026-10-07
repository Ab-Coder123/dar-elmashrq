import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants, scaleInVariants } from '@/lib/motion'
import { getOffices } from '../services/contact.service'
import { Building2, MapPin, Mail, Phone } from 'lucide-react'

export async function ContactOfficesSection() {
  const offices = await getOffices()

  return (
    <section className="relative bg-white dark:bg-[#0b1a37] py-20 md:py-28 border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        <RevealOnScroll variants={fadeUpVariants}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 border border-[#ba9563]/40 bg-slate-50 dark:bg-[#0f2244] px-3 py-1 mb-4">
              <span className="w-2 h-2 bg-[#ba9563]" />
              <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
                REGIONAL FOOTPRINT
              </span>
            </div>
            <h2 className="font-['Montserrat'] text-3xl sm:text-4xl text-slate-950 dark:text-white uppercase font-extrabold mb-4 leading-tight">
              REGIONAL EXECUTIVE OFFICES
            </h2>
            <p className="font-['Inter'] text-sm text-slate-600 dark:text-[#c4c6d2]">
              Dar El Mashrq maintains physical administrative presence and registered corporate operational hubs across three key Middle Eastern markets.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((office, idx) => (
            <RevealOnScroll key={office.id} variants={scaleInVariants} delay={idx * 0.1}>
              <div className="border border-slate-200 dark:border-[#434651]/50 bg-slate-50 dark:bg-[#0f2244] p-6 sm:p-8 relative h-full flex flex-col justify-between hover:border-[#ba9563]/60 transition-colors shadow-sm">
                <BlueprintCrosshair position="top-left" />
                <BlueprintCrosshair position="bottom-right" />

                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-[#434651]/40">
                    <div className="flex items-center space-x-3">
                      <span className="font-['Space_Grotesk'] text-xs text-[#ba9563] font-bold border border-[#ba9563]/40 px-2 py-0.5">
                        {office.countryCode}
                      </span>
                      <h3 className="font-['Montserrat'] text-xl font-bold uppercase text-slate-950 dark:text-white">
                        {office.city}
                      </h3>
                    </div>
                    <Building2 className="w-5 h-5 text-[#ba9563]" />
                  </div>

                  <p className="font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider text-[#ba9563] mb-4">
                    {office.role}
                  </p>

                  <div className="space-y-3 font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2]">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-[#ba9563] shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>

                    {office.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-[#ba9563] shrink-0" />
                        <a href={`tel:${office.phone}`} className="hover:text-[#ba9563] font-['Space_Grotesk']">
                          {office.phone}
                        </a>
                      </div>
                    )}

                    {office.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-[#ba9563] shrink-0" />
                        <a href={`mailto:${office.email}`} className="hover:text-[#ba9563]">
                          {office.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-[#434651]/30 flex items-center justify-between text-[10px] font-['Space_Grotesk'] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  <span>CONFIRMED HUB</span>
                  <span className="text-[#ba9563] font-semibold">{office.country}</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
