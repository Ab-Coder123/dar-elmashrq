'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'

interface ProjectGalleryProps {
  images: string[]
  projectName: string
  onOpenLightbox: (index: number) => void
}

export function ProjectGallery({ images, projectName, onOpenLightbox }: ProjectGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (images.length === 0) return null

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -400 : 400
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative py-16 md:py-24 border-b border-[#ba9563]/30 bg-[#0b1a37] text-white">
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto">
        {/* Gallery Header & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#ba9563]/30 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 border border-[#ba9563]/40 bg-[#0f2244] px-3 py-1 mb-3">
              <Camera className="w-3.5 h-3.5 text-[#ba9563]" />
              <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] font-semibold">
                ARCHITECTURAL ARCHIVE
              </span>
            </div>
            <h2 className="font-['Montserrat'] text-2xl sm:text-3xl lg:text-4xl text-white uppercase font-extrabold">
              FIELD PHOTOGRAPHY &amp; <span className="text-[#ba9563]">EXECUTION</span>
            </h2>
          </div>

          {/* Previous / Next Arrow Controls */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Previous gallery image"
              className="p-3 bg-[#0f2244] hover:bg-[#ba9563] text-slate-200 hover:text-[#0b1a37] border border-[#ba9563]/40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Next gallery image"
              className="p-3 bg-[#0f2244] hover:bg-[#ba9563] text-slate-200 hover:text-[#0b1a37] border border-[#ba9563]/40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Image Container */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory"
        >
          {images.map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => onOpenLightbox(idx)}
              className="group relative h-72 sm:h-84 md:h-96 min-w-[300px] sm:min-w-[420px] md:min-w-[500px] bg-slate-950 border border-[#ba9563]/30 overflow-hidden cursor-pointer snap-start shrink-0 hover:border-[#ba9563] transition-all shadow-md"
            >
              <BlueprintCrosshair position="top-left" />
              <BlueprintCrosshair position="bottom-right" />

              <Image
                src={imgUrl}
                alt={`${projectName} photography ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 80vw, 500px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Hover Zoom Prompt */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="bg-[#ba9563] text-[#0b1a37] p-3 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              {/* Plate Counter */}
              <div className="absolute bottom-4 left-4 font-['Space_Grotesk'] text-xs font-bold text-white uppercase tracking-widest bg-black/60 px-2.5 py-1 border border-white/20">
                PLATE 0{idx + 1} // 0{images.length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
