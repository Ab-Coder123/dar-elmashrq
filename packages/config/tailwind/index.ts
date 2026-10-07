import type { Config } from 'tailwindcss'

/**
 * Dar ElMashrq Design Tokens
 *
 * Colors verified programmatically from the company's corporate PDF (68 pages).
 * Extracted via PyMuPDF — these are CONFIRMED brand colors, not guesses.
 *
 * Font note: AudiType (from PDF) is Audi AG proprietary — NOT licensed for web.
 * Using Barlow Condensed (Latin) + IBM Plex Arabic as web-safe alternatives.
 * See: docs/architecture/typography.md
 */
export const darElMashrqTheme = {
  colors: {
    /** Primary brand color — Deep Navy. Confirmed HEX from PDF extraction. */
    navy: {
      DEFAULT: '#123C82',
      dark: '#0D2E6A',
      light: '#1A4E9F',
      tint: '#F4F6FA',
    },
    /** Premium accent — Warm Gold/Bronze. Confirmed HEX from PDF extraction. */
    gold: {
      DEFAULT: '#BA9563',
      light: '#D4B27A',
      dark: '#9A7A4E',
    },
    /**
     * Primary text color — Warm Near-Black (NOT pure #000000).
     * This deliberate warmth is part of the brand identity.
     * Confirmed HEX from PDF extraction.
     */
    dark: {
      DEFAULT: '#231F20',
    },
    /**
     * Secondary / muted text — Warm Gray.
     * Used exclusively for Arabic text in the PDF project pages.
     * Confirmed HEX from PDF extraction.
     */
    muted: {
      DEFAULT: '#5B5B5B',
    },
  },
  /**
   * Font family tokens.
   *
   * Values are CSS variable references — fonts are loaded in globals.css
   * via next/font (Phase 02). This abstraction means fonts can be changed
   * in ONE place without touching any component.
   */
  fontFamily: {
    display: ['var(--font-display)', 'sans-serif'],
    body: ['var(--font-body)', 'sans-serif'],
    arabic: ['var(--font-arabic)', 'sans-serif'],
  },
} satisfies Partial<Config['theme']>

export default darElMashrqTheme
