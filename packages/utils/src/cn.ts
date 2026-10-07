import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names safely, resolving conflicts.
 * Standard shadcn/ui utility — used everywhere in the UI layer.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
