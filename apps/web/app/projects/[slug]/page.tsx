import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { Footer } from '@/components/navigation/Footer'
import { getProjectBySlug, getAllProjectDetails } from '@/features/projects/services/project.service'
import { ProjectDetailClientView } from '@/features/projects/components/ProjectDetailClientView'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjectDetails()
  return projects.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found | Dar El Mashrq',
    }
  }

  return {
    title: `${project.name} | Project Dossier | Dar El Mashrq`,
    description:
      project.description ||
      `Technical specifications and contracting scope for ${project.name} in ${project.location}, ${project.country}.`,
  }
}

const PROJECT_IMAGE_FALLBACKS: Record<string, string> = {
  'beverly-al-azeeza-new-facade':
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
  'way-care-medical-hospital':
    'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=85',
  'grc-factory':
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85',
  'residential-villas-al-qatif':
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  'educational-buildings-madinah-public-security':
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  'forensic-evidence-building-riyadh':
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
  'awlad-ragab-supermarket-chain':
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=85',
  'awlad-ragab-supermarket-chain-21-branches':
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=85',
  'qasr-al-husseini-residential-towers':
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
  'al-shorouk-housing-complex':
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
  'al-shorouk-housing-complex-30-towers':
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
  'al-maraga-hospital-reconstruction':
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85',
  'villa-al-mishaf-qatar':
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
  'residential-commercial-building-muwazzar':
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
  'three-villas-al-dakheel-qatar':
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
  'western-water-pump-station-ras-tanura':
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85',
  default:
    'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85',
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const imageUrl: string =
    project.images?.[0]?.url ||
    PROJECT_IMAGE_FALLBACKS[project.slug] ||
    PROJECT_IMAGE_FALLBACKS['default'] ||
    'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f2244] text-slate-900 dark:text-white transition-colors duration-300">
      <TopNavBar />
      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <ProjectDetailClientView project={project} imageUrl={imageUrl} />
      </main>
      <Footer />
    </div>
  )
}

