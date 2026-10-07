import type { RegionalOffice } from '../types'
import { getRegionalOffices } from '../data/contact.data'

/**
 * Contact service — data boundary layer.
 * UI components NEVER import from contact.data.ts directly.
 */

export async function getOffices(): Promise<RegionalOffice[]> {
  return getRegionalOffices()
}
