import type { RegionalOffice } from '../types'

/**
 * Regional offices data.
 * Sourced from the Dar ElMashrq corporate profile.
 * Only locations confirmed in the PDF are listed.
 */
const REGIONAL_OFFICES: RegionalOffice[] = [
  {
    id: 'riyadh-hq',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    role: 'Headquarters',
    address: 'Olaya District, Riyadh 12222, Saudi Arabia',
    phone: '00966581605812',
    email: 'info@elmashrq.com',
  },
  {
    id: 'cairo-regional',
    city: 'Cairo',
    country: 'Egypt',
    countryCode: 'EG',
    role: 'Regional Office — Egypt',
    address: 'Cairo, Arab Republic of Egypt',
    email: 'info@elmashrq.com',
  },
  {
    id: 'doha-gulf',
    city: 'Doha',
    country: 'Qatar',
    countryCode: 'QA',
    role: 'Regional Office — Gulf',
    address: 'Doha, State of Qatar',
    email: 'info@elmashrq.com',
  },
]

export async function getRegionalOffices(): Promise<RegionalOffice[]> {
  return REGIONAL_OFFICES
}
