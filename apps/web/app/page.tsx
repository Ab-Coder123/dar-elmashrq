import { TopNavBar } from '@/components/navigation/TopNavBar'
import { Footer } from '@/components/navigation/Footer'
import {
  HeroSection,
  CompanyIntroSection,
  ExperienceSection,
  ServicesPreview,
  FeaturedProjects,
  RegionalPresence,
  VisionSection,
  WhyDarElMashrq,
  CredentialsSection,
  FinalCTA,
} from '@/features/home'
import { getAllProjects } from '@/features/projects/data/projects.data'

/**
 * Home Page — Server Component by default.
 *
 * Implements Phase 02: Public Corporate Home Page for Dar El Mashrq Trading & Contracting Company.
 * Adheres strictly to the architectural contract established in Phase 01:
 * - Feature-oriented modularity (`features/home/`)
 * - Strict Data Boundary (projects consumed via project service/data contract)
 * - Pure Server Component rendering for SEO & fast First Contentful Paint
 */
export default async function HomePage() {
  const initialProjects = await getAllProjects()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f2244] text-[#191c1d] dark:text-[#d7e2ff] flex flex-col selection:bg-[#ba9563]/30 dark:selection:bg-[#5d4117] selection:text-[#ba9563] dark:selection:text-[#ffddb3] transition-colors duration-300">
      {/* 1. Global Navigation Bar */}
      <TopNavBar />

      {/* 2. Main Page Content Structure */}
      <main id="main-content" className="flex-grow">
        {/* Section 01 — Full-Screen Cinematic Hero */}
        <HeroSection />

        {/* Section 02 — Company Introduction (Est. 1994) */}
        <CompanyIntroSection />

        {/* Section 03 — Experience & Performance Metrics */}
        <ExperienceSection />

        {/* Section 04 — Engineering Disciplines & Services Preview */}
        <ServicesPreview />

        {/* Section 05 — Selected Featured Projects Showcase */}
        <FeaturedProjects initialProjects={initialProjects} />

        {/* Section 06 — Regional Presence (KSA • Egypt • Qatar) */}
        <RegionalPresence />

        {/* Section 07 — Corporate Vision Statement */}
        <VisionSection />

        {/* Section 08 — Why Dar El Mashrq (Operational Distinctives) */}
        <WhyDarElMashrq />

        {/* Section 09 — Corporate Credentials & Compliance */}
        <CredentialsSection />

        {/* Section 10 — Final Pre-Qualification Tender CTA */}
        <FinalCTA />
      </main>

      {/* 3. Global Footer */}
      <Footer />
    </div>
  )
}
