/**
 * A single navigation item.
 * Supports bilingual labels and nested children.
 */
export interface NavigationItem {
  label: string
  labelAr?: string
  href: string
  /** External links open in a new tab. */
  external?: boolean
  children?: NavigationItem[]
}
