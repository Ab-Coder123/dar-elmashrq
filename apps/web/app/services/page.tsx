import type { Metadata } from 'next'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { Footer } from '@/components/navigation/Footer'
import {
  getTechnicalServices,
  getServiceProjectShowcases,
  getServicesMedia,
  ServicesHero,
  ServicesIntro,
  ServicesExplorer,
  IntegratedExecution,
  DesignConstructionManagement,
  ServiceProjectShowcase,
  RegionalCapability,
  QualitySafety,
  ServicesCTA,
} from '@/features/services'

export const metadata: Metadata = {
  title: 'Services & Capabilities | Dar El Mashrq Trading & Contracting',
  description:
    'Comprehensive contracting and engineering services by Dar El Mashrq: Civil Works & Finishing, Electrical Works, Air Conditioning, Fire Fighting, and Sanitary Works across Saudi Arabia, Egypt, and Qatar.',
  openGraph: {
    title: 'Services & Capabilities | Dar El Mashrq',
    description:
      'Turnkey civil engineering, electro-mechanical prowess, and real estate development execution since 1994.',
  },
}

export default async function ServicesPage() {
  const [technicalServices, projectShowcases, media] = await Promise.all([
    getTechnicalServices(),
    getServiceProjectShowcases(),
    getServicesMedia(),
  ])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f2244] text-slate-900 dark:text-[#d7e2ff] font-body transition-colors duration-300 overflow-x-hidden">
      {/* Shared Navigation */}
      <TopNavBar />

      <main>
        {/* 1. Services Hero */}
        <ServicesHero heroImage={media.heroImage} />

        {/* 2. Services Introduction */}
        <ServicesIntro />

        {/* 3. Core Technical Services Explorer */}
        <ServicesExplorer services={technicalServices} />

        {/* 4. Integrated Lifecycle Execution (Design -> Construction -> PM -> Development) */}
        <IntegratedExecution />

        {/* 5. The Core Triad (Design, Construction, Management) */}
        <DesignConstructionManagement />

        {/* 6. Services In Practice (Project Relation Showcase) */}
        <ServiceProjectShowcase showcases={projectShowcases} />

        {/* 7. Regional Capability (KSA, Egypt, Qatar) */}
        <RegionalCapability />

        {/* 8. Quality & Safety Governance */}
        <QualitySafety qualityImage={media.qualityImage} />

        {/* 9. Final Tender & Inquiries CTA */}
        <ServicesCTA ctaImage={media.ctaImage} />
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  )
}
