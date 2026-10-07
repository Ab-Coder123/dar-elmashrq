import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Building, Calendar, Layers, ShieldCheck, User, Coins, Send } from 'lucide-react'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { Footer } from '@/components/navigation/Footer'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { getProjectBySlug, getAllProjectDetails } from '@/features/projects/services/project.service'
import { COMPANY_PROFILE } from '@/config/site'

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
    project.images[0]?.url ||
    PROJECT_IMAGE_FALLBACKS[project.slug] ||
    PROJECT_IMAGE_FALLBACKS['default'] ||
    'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f2244] text-slate-900 dark:text-white transition-colors duration-300">
      <TopNavBar />
      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
          {/* Back to archive link */}
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] text-[#ba9563] hover:text-slate-900 dark:hover:text-white transition-colors font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO MASTER PORTFOLIO ARCHIVE</span>
            </Link>
          </div>

          <div className="border border-[#ba9563]/40 bg-white dark:bg-[#0b1a37] relative shadow-2xl overflow-hidden">
            <BlueprintCrosshair position="top-left" />
            <BlueprintCrosshair position="top-right" />
            <BlueprintCrosshair position="bottom-left" />
            <BlueprintCrosshair position="bottom-right" />

            {/* Cinematic Hero Image */}
            <div className="relative h-80 sm:h-96 md:h-[480px] w-full bg-slate-950">
              <Image
                src={imageUrl}
                alt={project.name}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Status Pill */}
              <div className="absolute top-6 left-6 bg-[#ba9563] text-[#0b1a37] px-3.5 py-1.5 font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] font-extrabold shadow-md">
                OFFICIAL CONTRACT RECORD // {project.id.toUpperCase()}
              </div>

              {/* Title & Category */}
              <div className="absolute bottom-8 left-6 sm:left-10 right-6 sm:right-10">
                <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-semibold block mb-2">
                  {project.category.toUpperCase()} // {project.country.replace('-', ' ').toUpperCase()}
                </span>
                <h1 className="font-['Montserrat'] text-3xl sm:text-4xl md:text-6xl text-white font-extrabold uppercase leading-tight drop-shadow-md">
                  {project.name}
                </h1>
                {project.nameAr && (
                  <p className="font-['IBM_Plex_Sans_Arabic'] text-lg text-slate-300 mt-2" dir="rtl">
                    {project.nameAr}
                  </p>
                )}
              </div>
            </div>

            {/* Dossier Body */}
            <div className="p-6 sm:p-10 md:p-14 space-y-10">
              {/* Narrative & Scope */}
              <div>
                <div className="inline-flex items-center space-x-2 text-[#ba9563] mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-semibold">
                    STRUCTURAL &amp; CONTRACTING EXECUTION
                  </span>
                </div>
                <p className="font-['Inter'] text-sm sm:text-base md:text-lg text-slate-700 dark:text-[#c4c6d2] leading-relaxed max-w-4xl">
                  {project.description ||
                    'Delivered under comprehensive engineering governance adhering to regional building codes, municipal standards, and civil defense compliance. Dar El Mashrq managed all primary structural operations, electro-mechanical coordination, and high-tolerance architectural finishing.'}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div>
                <h2 className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-bold mb-6 pb-2 border-b border-slate-200 dark:border-[#434651]/40">
                  TECHNICAL METRICS &amp; SPECIFICATIONS
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-50 dark:bg-[#0f2244] p-5 border border-slate-200 dark:border-[#434651]/50">
                    <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                      LOCATION
                    </span>
                    <div className="font-['Montserrat'] text-sm text-slate-900 dark:text-white font-bold uppercase flex items-center space-x-1.5">
                      <MapPin className="w-4 h-4 text-[#ba9563]" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-[#0f2244] p-5 border border-slate-200 dark:border-[#434651]/50">
                    <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                      SECTOR
                    </span>
                    <div className="font-['Montserrat'] text-sm text-slate-900 dark:text-white font-bold uppercase">
                      {project.category}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-[#0f2244] p-5 border border-slate-200 dark:border-[#434651]/50">
                    <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                      EXECUTION STATUS
                    </span>
                    <div className="font-['Montserrat'] text-sm text-slate-900 dark:text-white font-bold uppercase flex items-center space-x-1.5">
                      <Calendar className="w-4 h-4 text-[#ba9563]" />
                      <span>{project.year ? `DELIVERED ${project.year}` : 'COMPLETED & HANDED OVER'}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-[#0f2244] p-5 border border-slate-200 dark:border-[#434651]/50">
                    <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                      TERRITORY
                    </span>
                    <div className="font-['Montserrat'] text-sm text-slate-900 dark:text-white font-bold uppercase">
                      {project.country.replace('-', ' ')}
                    </div>
                  </div>

                  {project.clientName && (
                    <div className="bg-slate-50 dark:bg-[#0f2244] p-5 border border-slate-200 dark:border-[#434651]/50 sm:col-span-2">
                      <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                        CLIENT / STAKEHOLDER
                      </span>
                      <div className="font-['Montserrat'] text-sm text-slate-900 dark:text-white font-bold uppercase flex items-center space-x-1.5">
                        <User className="w-4 h-4 text-[#ba9563]" />
                        <span>{project.clientName}</span>
                      </div>
                    </div>
                  )}

                  {project.contractValue && (
                    <div className="bg-slate-50 dark:bg-[#0f2244] p-5 border border-slate-200 dark:border-[#434651]/50 sm:col-span-2">
                      <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-wider text-[#ba9563] font-semibold block mb-1">
                        RECORDED CONTRACT VALUE
                      </span>
                      <div className="font-['Space_Grotesk'] text-sm text-slate-900 dark:text-white font-bold uppercase flex items-center space-x-1.5">
                        <Coins className="w-4 h-4 text-[#ba9563]" />
                        <span>{project.contractValue.amount.toLocaleString()} {project.contractValue.currency}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Services & Disciplines */}
              <div>
                <h2 className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-bold mb-4 pb-2 border-b border-slate-200 dark:border-[#434651]/40">
                  SERVICES DELIVERED ON THIS CONTRACT
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {project.services.map((service, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 bg-slate-100 dark:bg-[#0f2244] border border-[#ba9563]/40 px-4 py-2"
                    >
                      <Layers className="w-4 h-4 text-[#ba9563]" />
                      <span className="font-['Space_Grotesk'] text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to action bar */}
              <div className="pt-8 border-t border-slate-200 dark:border-[#434651]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-['Montserrat'] text-xl font-bold uppercase text-slate-950 dark:text-white mb-1">
                    HAVE A SIMILAR DEVELOPMENT REQUIREMENT?
                  </h3>
                  <p className="font-['Inter'] text-xs text-slate-600 dark:text-[#c4c6d2]">
                    Contact our estimating and engineering department for tender pre-qualification and joint execution.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto bg-[#ba9563] hover:bg-[#d4b27a] text-[#0b1a37] font-['Space_Grotesk'] text-xs uppercase tracking-[0.15em] font-bold px-8 py-4 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shrink-0"
                >
                  <span>SUBMIT PROJECT RFP</span>
                  <Send className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
