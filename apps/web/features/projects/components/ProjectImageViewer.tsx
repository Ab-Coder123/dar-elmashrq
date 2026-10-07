'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'

interface ProjectImageViewerProps {
  isOpen: boolean
  images: string[]
  currentIndex: number
  projectName: string
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function ProjectImageViewer({
  isOpen,
  images,
  currentIndex,
  projectName,
  onClose,
  onNext,
  onPrev,
}: ProjectImageViewerProps) {
  const currentImage = images[currentIndex] || images[0]

  if (!isOpen || images.length === 0 || !currentImage) return null

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="High-resolution image viewer"
      >
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Top bar controls */}
        <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="font-['Space_Grotesk'] text-xs uppercase tracking-[0.2em] text-[#ba9563] font-bold">
            {projectName} // PLATE {currentIndex + 1} OF {images.length}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="p-2 bg-[#0f2244] hover:bg-[#ba9563] text-white hover:text-[#0b1a37] border border-[#ba9563]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 z-10 p-3 bg-[#0f2244]/80 hover:bg-[#ba9563] text-white hover:text-[#0b1a37] border border-[#ba9563]/40 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Image Frame */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center border border-[#ba9563]/30 p-2 bg-[#09182f]"
          onClick={(e) => e.stopPropagation()}
        >
          <BlueprintCrosshair position="top-left" />
          <BlueprintCrosshair position="top-right" />
          <BlueprintCrosshair position="bottom-left" />
          <BlueprintCrosshair position="bottom-right" />

          <div className="relative w-full h-full min-h-[50vh]">
            <Image
              src={currentImage}
              alt={`${projectName} expanded view`}
              fill
              priority
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </motion.div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 z-10 p-3 bg-[#0f2244]/80 hover:bg-[#ba9563] text-white hover:text-[#0b1a37] border border-[#ba9563]/40 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </AnimatePresence>
  )
}
