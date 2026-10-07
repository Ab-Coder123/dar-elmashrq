'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@dar-elmashrq/types'
import { useProjectDetail } from '../hooks/useProjectDetail'
import { ProjectDetailHeader } from './ProjectDetailHeader'
import { ProjectDetailHero } from './ProjectDetailHero'
import { ProjectOverview } from './ProjectOverview'
import { ProjectServices } from './ProjectServices'
import { ProjectGallery } from './ProjectGallery'
import { ProjectImageViewer } from './ProjectImageViewer'
import { ProjectInvolvement } from './ProjectInvolvement'
import { RelatedProjects } from './RelatedProjects'
import { ProjectNavigation } from './ProjectNavigation'

interface ProjectDetailOverlayProps {
  project: Project | null
  allProjects?: Project[]
  onClose: () => void
  onSelectProject?: (project: Project) => void
}

// Fallback high-resolution architectural photography mapped by slug/category
const PROJECT_IMAGE_FALLBACKS: Record<string, string[]> = {
  'beverly-al-azeeza-new-facade': [
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
  ],
  'way-care-medical-hospital': [
    'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=85',
  ],
  'grc-factory': [
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
  ],
  'residential-villas-al-qatif': [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
  ],
  'educational-buildings-madinah-public-security': [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
  ],
  'forensic-evidence-building-riyadh': [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  ],
  'awlad-ragab-supermarket-chain': [
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=85',
  ],
  'awlad-ragab-supermarket-chain-21-branches': [
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=85',
  ],
  'qasr-al-husseini-residential-towers': [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  ],
  'al-shorouk-housing-complex': [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  ],
  'al-shorouk-housing-complex-30-towers': [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  ],
  'al-maraga-hospital-reconstruction': [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=85',
  ],
  'villa-al-mishaf-qatar': [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  ],
  'residential-commercial-building-muwazzar': [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
  ],
  'three-villas-al-dakheel-qatar': [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
  ],
  'western-water-pump-station-ras-tanura': [
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
  ],
  default: [
    'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
  ],
}

export function ProjectDetailOverlay({
  project,
  allProjects = [],
  onClose,
  onSelectProject = () => {},
}: ProjectDetailOverlayProps) {
  const overlayContainerRef = useRef<HTMLDivElement>(null)

  const {
    currentIndex,
    totalCount,
    previousProject,
    nextProject,
    relatedProjects,
    lightboxIndex,
    goToPrevious,
    goToNext,
    openLightbox,
    closeLightbox,
    nextLightboxImage,
    prevLightboxImage,
  } = useProjectDetail({
    activeProject: project,
    allProjects,
    onClose,
    onSelectProject,
  })

  // Scroll to top of overlay when project changes
  useEffect(() => {
    if (project && overlayContainerRef.current) {
      overlayContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [project?.id])

  if (!project) return null

  const projectImages =
    project.images && project.images.length > 0
      ? project.images.map((img) => img.url)
      : PROJECT_IMAGE_FALLBACKS[project.slug] || PROJECT_IMAGE_FALLBACKS['default'] || []

  const heroImage = projectImages[0] || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85'

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 bg-[#09182f] text-white flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-project-title"
      >
        {/* Sticky Top Header */}
        <ProjectDetailHeader projectCode={project.id} onClose={onClose} />

        {/* Scrollable Overlay Body */}
        <motion.div
          ref={overlayContainerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-grow overflow-y-auto"
        >
          {/* Hero Section */}
          <ProjectDetailHero project={project} imageUrl={heroImage} />

          {/* Project Narrative & Specifications */}
          <ProjectOverview project={project} />

          {/* Scope of Services */}
          <ProjectServices project={project} />

          {/* High-End Architectural Gallery */}
          {projectImages.length > 1 && (
            <ProjectGallery
              images={projectImages}
              projectName={project.name}
              onOpenLightbox={openLightbox}
            />
          )}

          {/* Organizational Involvement */}
          <ProjectInvolvement />

          {/* Related Projects from Cross-Portfolio */}
          <RelatedProjects
            relatedProjects={relatedProjects}
            onSelectProject={onSelectProject}
          />
        </motion.div>

        {/* Sticky Bottom Navigation Toolbar */}
        {allProjects.length > 1 && (
          <ProjectNavigation
            previousProject={previousProject}
            nextProject={nextProject}
            onPrevious={goToPrevious}
            onNext={goToNext}
            currentIndex={currentIndex}
            totalCount={totalCount}
          />
        )}

        {/* Fullscreen Image Lightbox */}
        <ProjectImageViewer
          isOpen={lightboxIndex !== null}
          images={projectImages}
          currentIndex={lightboxIndex ?? 0}
          projectName={project.name}
          onClose={closeLightbox}
          onNext={nextLightboxImage}
          onPrev={prevLightboxImage}
        />
      </div>
    </AnimatePresence>
  )
}
