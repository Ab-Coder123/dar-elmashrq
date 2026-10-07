'use client'

/**
 * LoadingScreen — Architectural full-screen loading experience.
 *
 * Sequence (Total duration: 1.5s):
 *   0.0s  → Deep Navy viewport (#0b1a37 / #123C82) with subtle blueprint grid
 *   0.2s  → Gold architectural lines expand
 *   0.35s → Logo smoothly reveals & scales
 *   0.7s  → Wordmark subtitle reveals
 *   1.0s  → Coordinates & Est. 1994 tag
 *   1.5s  → Smooth curtain exit transition revealing the hero
 *
 * Respects prefers-reduced-motion and session storage.
 */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) {
      onComplete()
      return
    }

    // Auto complete after 1.5 seconds
    const timer = setTimeout(() => {
      onComplete()
    }, 1500)

    return () => clearTimeout(timer)
  }, [prefersReduced, onComplete])

  if (prefersReduced) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0b1a37] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: '-100%',
        transition: {
          duration: 0.5,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      {/* Blueprint drafting grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(186,149,99,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(186,149,99,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Decorative Corner Crosshairs */}
      <Crosshair className="top-6 left-6" />
      <Crosshair className="top-6 right-6 rotate-90" />
      <Crosshair className="bottom-6 left-6 -rotate-90" />
      <Crosshair className="bottom-6 right-6 rotate-180" />

      {/* Main Center Stage */}
      <div className="relative flex flex-col items-center justify-center px-6">
        {/* Top Gold Datum Line */}
        <motion.div
          className="h-[1px] bg-[#BA9563] mb-6"
          style={{ width: '180px' }}
          initial={{ scaleX: 0, originX: 0.5 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-hidden="true"
        />

        {/* Logo Container */}
        <motion.div
          className="relative w-56 sm:w-72 h-16 sm:h-20"
          initial={{ opacity: 0, scale: 0.94, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/Dar-elmashrq-logo.png"
            alt="Dar El Mashrq"
            fill
            priority
            sizes="300px"
            className="object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Bottom Gold Datum Line */}
        <motion.div
          className="h-[1px] bg-[#BA9563] mt-6 mb-4"
          style={{ width: '180px' }}
          initial={{ scaleX: 0, originX: 0.5 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-hidden="true"
        />

        {/* Wordmark Subtitle */}
        <motion.p
          className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#BA9563] font-semibold text-center"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Trading &amp; Contracting
        </motion.p>
      </div>

      {/* Bottom Datum Anchor */}
      <motion.p
        className="absolute bottom-8 font-['Space_Grotesk'] text-[9px] uppercase tracking-[0.35em] text-[#BA9563]/60 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.0 }}
        aria-hidden="true"
      >
        EST. 1994 &bull; KSA &bull; EGY &bull; QAT
      </motion.p>
    </motion.div>
  )
}

function Crosshair({ className }: { className: string }) {
  return (
    <div className={`absolute w-4 h-4 ${className} pointer-events-none opacity-40`} aria-hidden="true">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#BA9563]" />
      <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#BA9563]" />
    </div>
  )
}

// ─── LoadingScreenController ──────────────────────────────────────────────────

export function LoadingScreenController({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const hasVisited = sessionStorage.getItem('dar-visited')
      if (!hasVisited) {
        setShowLoader(true)
      }
    } catch {
      // In case of restricted environment, default to skipping
      setShowLoader(false)
    }
  }, [])

  const handleComplete = () => {
    try {
      sessionStorage.setItem('dar-visited', '1')
    } catch {
      // ignore
    }
    setShowLoader(false)
  }

  // Prevent flash before mounted
  if (!mounted) {
    return <div className="opacity-0">{children}</div>
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <LoadingScreen key="site-loader" onComplete={handleComplete} />
        )}
      </AnimatePresence>

      <div className="min-h-screen w-full overflow-x-hidden">
        {children}
      </div>
    </>
  )
}
