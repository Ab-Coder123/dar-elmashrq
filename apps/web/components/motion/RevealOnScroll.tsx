'use client'

/**
 * RevealOnScroll — Scroll-triggered reveal wrapper.
 *
 * Wraps children in a motion container that animates in when
 * the element enters the viewport via IntersectionObserver.
 *
 * Respects prefers-reduced-motion.
 */

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUpVariants, reducedFadeUpVariants, staggerContainerVariants } from '@/lib/motion'
import type { Variants } from 'framer-motion'
import { cn } from '@dar-elmashrq/utils'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  /** Custom variants — defaults to fadeUp */
  variants?: Variants
  /** Delay in seconds before the animation starts */
  delay?: number
  /** Fraction of the element that must be visible to trigger (0–1) */
  threshold?: number
  /** Only animate once */
  once?: boolean
  /** Use stagger container for direct children */
  stagger?: boolean
  /** As which HTML element to render */
  as?: keyof React.JSX.IntrinsicElements
}

export function RevealOnScroll({
  children,
  className,
  variants,
  delay = 0,
  threshold = 0.15,
  once = true,
  stagger = false,
  as = 'div',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const prefersReducedMotion = useReducedMotion()

  const resolvedVariants = prefersReducedMotion
    ? reducedFadeUpVariants
    : (variants ?? (stagger ? staggerContainerVariants : fadeUpVariants))

  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      variants={resolvedVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionComponent>
  )
}

/**
 * RevealLine — Animated horizontal gold accent line.
 * Width expands from 0 to full when in view.
 */
export function RevealLine({
  className,
  delay = 0,
}: {
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn('h-[1px] bg-[#BA9563]', className)}
      initial={{ scaleX: 0, originX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay }
      }
    />
  )
}

/**
 * RevealChildren — Stagger container for child reveals.
 * Children should use fadeUpVariants or similar.
 */
export function RevealChildren({
  children,
  className,
  delay = 0,
  staggerDelay = 0.12,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants: Variants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}
