'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ServiceProjectRelation } from '../types'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { RevealOnScroll, RevealChildren } from '@/components/motion/RevealOnScroll'
import { fadeUpVariants } from '@/lib/motion'

interface ServiceProjectShowcaseProps {
  showcases: ServiceProjectRelation[]
}

export function ServiceProjectShowcase({ showcases }: ServiceProjectShowcaseProps) {
  return (
    <section className="py-24 bg-white dark:bg-[#0b1a37] border-b border-slate-200 dark:border-[#434651]/40 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200 dark:border-[#434651]/50">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#ba9563] text-xs uppercase tracking-[0.25em] font-['Space_Grotesk'] font-bold mb-3">
                <span className="w-1.5 h-1.5 bg-[#ba9563]" />
                <span>05 // SERVICES IN PRACTICE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white font-['Montserrat']">
                OUR WORK IN CONTEXT
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <span className="font-['Montserrat'] text-xl sm:text-2xl text-[#ba9563] font-bold block">
                DELIVERED BENCHMARKS
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-['Space_Grotesk'] tracking-widest uppercase">
                Saudi Arabia &bull; Egypt &bull; Qatar
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Projects Grid */}
        <RevealChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" staggerDelay={0.1}>
          {showcases.map((project) => (
            <motion.div
              key={project.projectSlug}
              className="group bg-slate-50 dark:bg-[#0f2244] border border-slate-200 dark:border-[#434651]/60 hover:border-[#ba9563] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
              variants={fadeUpVariants}
            >
              <BlueprintCrosshair position="top-left" />
              <BlueprintCrosshair position="bottom-right" />

              <div>
                {/* Project Image Frame */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={project.image}
                    alt={project.projectName}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Category badge */}
                  <span className="absolute top-3 right-3 text-[9px] font-['Space_Grotesk'] uppercase tracking-wider bg-slate-900/90 text-slate-300 px-2.5 py-1 border border-slate-700">
                    {project.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center space-x-1.5 text-xs font-['Space_Grotesk'] text-[#ba9563] mb-2 font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="font-['Montserrat'] font-bold text-base text-slate-900 dark:text-white uppercase line-clamp-2 mb-2 group-hover:text-[#ba9563] transition-colors">
                    {project.projectName}
                  </h3>
                </div>
              </div>

              <div className="p-5 pt-0 mt-auto">
                <Link
                  href={`/projects/${project.projectSlug}`}
                  className="inline-flex items-center justify-between w-full pt-3 border-t border-slate-200 dark:border-[#434651]/40 text-xs font-['Space_Grotesk'] text-[#123c82] dark:text-[#ba9563] uppercase font-bold tracking-wider hover:underline"
                >
                  <span>View Project Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </RevealChildren>

        {/* Explore All Projects CTA */}
        <RevealOnScroll delay={0.2} className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-white dark:bg-[#0f2244] border border-[#ba9563] text-xs font-['Space_Grotesk'] uppercase tracking-widest text-[#ba9563] hover:bg-[#ba9563] hover:text-[#0b1a37] font-bold transition-all shadow-md group"
          >
            <span>EXPLORE ALL PROJECTS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  )
}
