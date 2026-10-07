/**
 * Dar El Mashrq — Motion System
 *
 * Centralized animation configuration for the entire website.
 * All durations, easings, and reusable variants live here.
 *
 * Motion philosophy: Architectural · Cinematic · Precise · Elegant · Professional
 * Avoid: bounce, spring, cartoon, excessive parallax, constant floating, glitch, neon.
 */

import type { Variants, Transition } from 'framer-motion'

// ─── Timing Tokens ──────────────────────────────────────────────────────────

export const DURATIONS = {
  /** Button micro-interactions, hover states */
  FAST: 0.2,
  /** Standard UI transitions */
  STANDARD: 0.4,
  /** Section reveals, medium complexity */
  MEDIUM: 0.7,
  /** Cinematic page transitions and hero sequences */
  CINEMATIC: 1.1,
  /** Logo intro sequence total */
  INTRO: 1.5,
} as const

// ─── Easing Curves ───────────────────────────────────────────────────────────

export const EASE = {
  /** Default smooth exit ease */
  out: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
  /** Smooth entry and exit */
  inOut: [0.4, 0.0, 0.2, 1.0] as [number, number, number, number],
  /** Precise architectural entry */
  architectural: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  /** Cinematic slow entry */
  cinematic: [0.16, 1, 0.3, 1] as [number, number, number, number],
} as const

// ─── Shared Transitions ──────────────────────────────────────────────────────

export const transitions = {
  standard: {
    duration: DURATIONS.STANDARD,
    ease: EASE.architectural,
  } satisfies Transition,
  medium: {
    duration: DURATIONS.MEDIUM,
    ease: EASE.architectural,
  } satisfies Transition,
  cinematic: {
    duration: DURATIONS.CINEMATIC,
    ease: EASE.cinematic,
  } satisfies Transition,
  fast: {
    duration: DURATIONS.FAST,
    ease: EASE.out,
  } satisfies Transition,
}

// ─── Reusable Variants ───────────────────────────────────────────────────────

/** Fade + lift from below (primary reveal pattern) */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.MEDIUM,
      ease: EASE.architectural,
    },
  },
}

/** Fade in only — for images and full-bleed backgrounds */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATIONS.CINEMATIC,
      ease: EASE.out,
    },
  },
}

/** Stagger container — wraps staggered children */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

/** Stagger container with longer delay for hero content */
export const heroStaggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

/** Horizontal gold line reveal — left to right */
export const lineRevealVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: DURATIONS.MEDIUM,
      ease: EASE.architectural,
    },
  },
}

/** Vertical line reveal — top to bottom */
export const lineRevealVerticalVariants: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: DURATIONS.CINEMATIC,
      ease: EASE.architectural,
    },
  },
}

/** Clip-path text reveal — mask slides left to right */
export const textRevealVariants: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: DURATIONS.MEDIUM,
      ease: EASE.cinematic,
    },
  },
}

/** Slide in from left */
export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.MEDIUM,
      ease: EASE.architectural,
    },
  },
}

/** Scale in from center — for numbers and stats */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.MEDIUM,
      ease: EASE.cinematic,
    },
  },
}

/** Page transition overlay */
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DURATIONS.STANDARD, ease: EASE.out } },
  exit: { opacity: 0, transition: { duration: DURATIONS.FAST, ease: EASE.inOut } },
}

// ─── Reduced Motion Safe Variants ────────────────────────────────────────────
// These respect the prefers-reduced-motion media query.
// Use these when wrapping with useReducedMotion() from framer-motion.

export const reducedFadeUpVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATIONS.FAST, ease: EASE.out },
  },
}
