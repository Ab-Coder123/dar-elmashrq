import type { Metadata } from 'next'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { Footer } from '@/components/navigation/Footer'
import {
  ProjectsHero,
  ProjectsIntro,
  ProjectExplorer,
  ProjectsRegionalSummary,
  ProjectsCTA,
} from '@/features/projects'
import { getAllProjectDetails } from '@/features/projects/services/project.service'

export const metadata: Metadata = {
  title: 'Project Portfolio | Dar El Mashrq Trading & Contracting',
  description:
    'Explore the comprehensive contracting and civil engineering project portfolio of Dar El Mashrq across Saudi Arabia, Egypt, and Qatar since 1994. Commercial, residential, hospital, and infrastructure developments.',
}

export default async function ProjectsPage() {
  const allProjects = await getAllProjectDetails()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f2244] text-slate-900 dark:text-white transition-colors duration-300">
      <TopNavBar />
      <main>
        {/* Cinematic Projects Hero */}
        <ProjectsHero />

        {/* Editorial Intro & Sector Criteria */}
        <ProjectsIntro />

        {/* Interactive Master Contract Archive + Flagship Spotlight + Live Filtering & Specification Dossiers */}
        <ProjectExplorer initialProjects={allProjects} />

        {/* Multi-Country Regional Hubs */}
        <ProjectsRegionalSummary />

        {/* Turnkey Tender CTA */}
        <ProjectsCTA />
      </main>
      <Footer />
    </div>
  )
}
