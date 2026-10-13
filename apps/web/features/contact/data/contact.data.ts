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
    cityAr: 'الرياض',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    countryCode: 'SA',
    role: 'Headquarters',
    roleAr: 'المقر الرئيسي والإدارة العامة',
    address: 'Olaya District, Riyadh 12222, Saudi Arabia',
    addressAr: 'حي العليا، الرياض 12222، المملكة العربية السعودية',
    phone: '00966581605812',
    email: 'info@elmashrq.com',
  },
  {
    id: 'cairo-regional',
    city: 'Cairo',
    cityAr: 'القاهرة',
    country: 'Egypt',
    countryAr: 'جمهورية مصر العربية',
    countryCode: 'EG',
    role: 'Regional Office — Egypt',
    roleAr: 'المكتب الإقليمي — جمهورية مصر العربية',
    address: 'Cairo, Arab Republic of Egypt',
    addressAr: 'القاهرة، جمهورية مصر العربية',
    email: 'info@elmashrq.com',
  },
  {
    id: 'doha-gulf',
    city: 'Doha',
    cityAr: 'الدوحة',
    country: 'Qatar',
    countryAr: 'دولة قطر',
    countryCode: 'QA',
    role: 'Regional Office — Gulf',
    roleAr: 'المكتب الإقليمي — الخليج العربي',
    address: 'Doha, State of Qatar',
    addressAr: 'الدوحة، دولة قطر',
    email: 'info@elmashrq.com',
  },
]

export async function getRegionalOffices(): Promise<RegionalOffice[]> {
  return REGIONAL_OFFICES
}
