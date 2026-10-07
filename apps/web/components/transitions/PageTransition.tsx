'use client'

/**
 * PageTransition — Lightweight page transition overlay.
 *
 * Shows a subtle dark navy overlay between route changes.
 * Duration: 300–500ms — not a full loading screen.
 *
 * Uses AnimatePresence + usePathname for App Router compatibility.
 */

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0.0, 0.2, 1.0] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
