import type { Metadata } from 'next'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { Footer } from '@/components/navigation/Footer'
import {
  AboutHero,
  CompanyIntroduction,
  HistorySection,
  WhatWeDoSection,
  TechnicalCapabilities,
  VisionSection,
  OrganizationalStructure,
  RegionalPresence,
  CredentialsSection,
  AboutCTA,
} from '@/features/about'

export const metadata: Metadata = {
  title: 'About Us — Three Decades of Engineering Longevity',
  description:
    'Learn about Dar El Mashrq Trading & Contracting Company: Established in 1994, delivering turnkey engineering, construction, project management, and property development across Saudi Arabia, Egypt, and Qatar.',
  openGraph: {
    title: 'About Dar El Mashrq | 30+ Years of Engineering Excellence',
    description:
      'Established in 1994, Dar El Mashrq is a tier-one contracting and property development firm operating in KSA, Egypt, and Qatar.',
  },
}

/**
 * About Us Page — Server Component by default.
 *
 * Implements Phase 03: Public Corporate About Us Experience.
 * Strict architectural adherence:
 * - Feature modularity (`features/about/`)
 * - Official company source facts (1994, KSA/EGY/QAT, ISO 9001, Verified Org Hierarchy)
 * - Complete dual light & dark mode support
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f2244] text-[#191c1d] dark:text-[#d7e2ff] flex flex-col selection:bg-[#ba9563]/30 dark:selection:bg-[#5d4117] selection:text-[#ba9563] dark:selection:text-[#ffddb3] transition-colors duration-300">
      {/* 1. Global Navigation Bar */}
      <TopNavBar />

      {/* 2. Main About Experience */}
      <main id="main-content" className="flex-grow">
        {/* Section 00 — Atmospheric Cinematic Hero & Breadcrumbs */}
        <AboutHero />

        {/* Section 01 — Corporate Profile & 4 Pillars */}
        <CompanyIntroduction />

        {/* Section 02 — Timeline & Heritage (1994 to Today) */}
        <HistorySection />

        {/* Section 03 — Core Capabilities (Design, Construction, PM, Property Dev) */}
        <WhatWeDoSection />

        {/* Section 04 — Technical Engineering Disciplines */}
        <TechnicalCapabilities />

        {/* Section 05 — Corporate Vision Statement */}
        <VisionSection />

        {/* Section 06 — Organizational Governance & Executive Hierarchy */}
        <OrganizationalStructure />

        {/* Section 07 — Regional Operational Presence (KSA • Egypt • Qatar) */}
        <RegionalPresence />

        {/* Section 08 — Statutory Compliance & Accreditations */}
        <CredentialsSection />

        {/* Section 09 — Final Strategic Collaboration CTA */}
        <AboutCTA />
      </main>

      {/* 3. Global Footer */}
      <Footer />
    </div>
  )
}
