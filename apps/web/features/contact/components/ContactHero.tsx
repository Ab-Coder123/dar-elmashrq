'use client'

import { motion } from 'framer-motion'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { heroStaggerVariants, fadeUpVariants } from '@/lib/motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'

export function ContactHero() {
  const { language } = useLanguage()
  const isAr = language === 'ar'

  return (
    <section className="relative min-h-[50vh] sm:min-h-[58vh] flex items-center bg-[#09182f] text-white pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#ba9563]/30 overflow-hidden">
      {/* Background Image with Deep Navy Atmospheric Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/projects/beverly-al-azeeza-new-facade/cover.jpg"
          alt={isAr ? 'تواصل مع دار المشرق' : 'Contact Dar El Mashrq'}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Deep Navy Linear Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09182f]/95 via-[#0f2244]/85 to-[#123c82]/50" />
        {/* Radial Dark Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,14,38,0.75)_100%)]" />
      </div>

      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ba9563_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-10" 
      />

      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto relative z-10">
        <RevealOnScroll variants={heroStaggerVariants} threshold={0.1}>
          <div className={isAr ? 'relative border-r-2 border-[#ba9563] pr-6 sm:pr-10' : 'relative border-l-2 border-[#ba9563] pl-6 sm:pl-10'}>
            <BlueprintCrosshair position={isAr ? 'top-left' : 'top-right'} />
            <BlueprintCrosshair position={isAr ? 'bottom-left' : 'bottom-right'} />

            {/* Breadcrumb */}
            <div
              className={
                isAr
                  ? "flex items-center gap-2 font-['Cairo'] text-xs uppercase tracking-normal text-[#ba9563] mb-4 font-bold"
                  : "flex items-center gap-2 font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] mb-4 font-semibold"
              }
            >
              <Link href="/" className="hover:underline">
                {isAr ? 'الرئيسية' : 'HOME'}
              </Link>
              <span>/</span>
              <span>{isAr ? 'تواصل معنا' : 'CONTACT US'}</span>
            </div>

            {/* Main Title */}
            <h1
              className={
                isAr
                  ? "font-['Cairo'] text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-normal leading-tight text-white mb-6"
                  : "font-['Montserrat'] text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase leading-tight text-white mb-6"
              }
            >
              {isAr ? (
                <>
                  تواصل مع <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ba9563] via-[#d4b27a] to-[#ba9563]">
                    الإدارة الهندسية والتسعير
                  </span>
                </>
              ) : (
                <>
                  ENGAGE OUR <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ba9563] via-[#d4b27a] to-[#ba9563]">
                    ENGINEERING DESK
                  </span>
                </>
              )}
            </h1>

            <p
              className={
                isAr
                  ? "font-['Cairo'] text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed tracking-normal"
                  : "font-['Inter'] text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed"
              }
            >
              {isAr
                ? 'قنوات تواصل مباشرة للاستفسارات عن المشاريع، ودعوات المناقصات، وملفات التأهيل المسبق، والشراكات الاستثمارية في المملكة العربية السعودية، ومصر، وقطر.'
                : 'Direct channels for project inquiries, tender invitations, pre-qualification submissions, and corporate partnerships across Saudi Arabia, Egypt, and Qatar.'}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

