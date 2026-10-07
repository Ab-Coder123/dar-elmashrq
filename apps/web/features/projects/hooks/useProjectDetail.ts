'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Project } from '@dar-elmashrq/types'

interface UseProjectDetailProps {
  activeProject: Project | null
  allProjects: Project[]
  onClose: () => void
  onSelectProject: (project: Project) => void
}

export function useProjectDetail({
  activeProject,
  allProjects,
  onClose,
  onSelectProject,
}: UseProjectDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Find index in allProjects list
  const currentIndex = useMemo(() => {
    if (!activeProject) return -1
    return allProjects.findIndex((p) => p.id === activeProject.id)
  }, [activeProject, allProjects])

  // Previous and Next Projects in cyclic list
  const previousProject = useMemo(() => {
    if (currentIndex === -1 || allProjects.length <= 1) return null
    const prevIdx = (currentIndex - 1 + allProjects.length) % allProjects.length
    return allProjects[prevIdx] ?? null
  }, [currentIndex, allProjects])

  const nextProject = useMemo(() => {
    if (currentIndex === -1 || allProjects.length <= 1) return null
    const nextIdx = (currentIndex + 1) % allProjects.length
    return allProjects[nextIdx] ?? null
  }, [currentIndex, allProjects])

  // Compute 2-4 related projects matching same country or same category
  const relatedProjects = useMemo(() => {
    if (!activeProject) return []
    const sameCategory = allProjects.filter(
      (p) => p.id !== activeProject.id && p.category === activeProject.category
    )
    const sameCountry = allProjects.filter(
      (p) =>
        p.id !== activeProject.id &&
        p.country === activeProject.country &&
        !sameCategory.some((sc) => sc.id === p.id)
    )
    const combined = [...sameCategory, ...sameCountry]
    return combined.slice(0, 3)
  }, [activeProject, allProjects])

  // Project Gallery images list
  const galleryImages = useMemo(() => {
    if (!activeProject) return []
    if (activeProject.images && activeProject.images.length > 0) {
      return activeProject.images.map((img) => img.url)
    }
    return []
  }, [activeProject])

  // Navigate projects
  const goToPrevious = useCallback(() => {
    if (previousProject) {
      onSelectProject(previousProject)
      setLightboxIndex(null)
    }
  }, [previousProject, onSelectProject])

  const goToNext = useCallback(() => {
    if (nextProject) {
      onSelectProject(nextProject)
      setLightboxIndex(null)
    }
  }, [nextProject, onSelectProject])

  // Lightbox handlers
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const nextLightboxImage = useCallback(() => {
    if (lightboxIndex === null || galleryImages.length === 0) return
    setLightboxIndex((prev) => ((prev ?? 0) + 1) % galleryImages.length)
  }, [lightboxIndex, galleryImages.length])

  const prevLightboxImage = useCallback(() => {
    if (lightboxIndex === null || galleryImages.length === 0) return
    setLightboxIndex((prev) => ((prev ?? 0) - 1 + galleryImages.length) % galleryImages.length)
  }, [lightboxIndex, galleryImages.length])

  // Body scroll locking
  useEffect(() => {
    if (activeProject) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = originalStyle
      }
    }
    return undefined
  }, [activeProject])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeProject) return

      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          closeLightbox()
        } else {
          onClose()
        }
      } else if (e.key === 'ArrowRight') {
        if (lightboxIndex !== null) {
          nextLightboxImage()
        } else if (nextProject) {
          goToNext()
        }
      } else if (e.key === 'ArrowLeft') {
        if (lightboxIndex !== null) {
          prevLightboxImage()
        } else if (previousProject) {
          goToPrevious()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    activeProject,
    lightboxIndex,
    closeLightbox,
    onClose,
    nextLightboxImage,
    prevLightboxImage,
    nextProject,
    previousProject,
    goToNext,
    goToPrevious,
  ])

  return {
    currentIndex,
    totalCount: allProjects.length,
    previousProject,
    nextProject,
    relatedProjects,
    galleryImages,
    lightboxIndex,
    goToPrevious,
    goToNext,
    openLightbox,
    closeLightbox,
    nextLightboxImage,
    prevLightboxImage,
  }
}
