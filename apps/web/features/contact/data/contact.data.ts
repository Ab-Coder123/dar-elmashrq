import type { RegionalOffice } from '../types'

/**
 * Regional offices data.
 * Sourced from the Dar ElMashrq corporate profile.
 * Only locations confirmed in the PDF are listed.
 */
const REGIONAL_OFFICES: RegionalOffice[] = [
  {
    id: 'dammam-hq',
    city: 'Dammam',
    cityAr: 'الدمام',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    countryCode: 'SA',
    role: 'Saudi Arabia Headquarters — Al-Shati Business Center',
    roleAr: 'المقر الرئيسي — مركز الشاطئ للأعمال',
    address: 'Al-Shati Business Center, 8110 Prince Mohammed Bin Fahd Road, Al-Shati Al-Sharqi, Dammam, Saudi Arabia',
    addressAr: 'مركز الشاطئ للأعمال، 8110 طريق الأمير محمد بن فهد، حي الشاطئ الشرقي، الدمام، السعودية',
    phone: '+966 58 160 5812',
    email: 'info@elmashrq.com',
  },
  {
    id: 'cairo-regional',
    city: 'New Cairo',
    cityAr: 'القاهرة الجديدة',
    country: 'Egypt',
    countryAr: 'جمهورية مصر العربية',
    countryCode: 'EG',
    role: 'Egypt Regional Hub — 5th Settlement',
    roleAr: 'الفرع الإقليمي بمصر — التجمع الخامس',
    address: 'South 90th Street, 5th Settlement, New Cairo, Egypt',
    addressAr: 'شارع التسعين الجنوبي، التجمع الخامس، مصر',
    phone: '+20 111 62 5555 6',
    email: 'info@elmashrq.com',
  },
  {
    id: 'doha-gulf',
    city: 'Doha',
    cityAr: 'الدوحة',
    country: 'Qatar',
    countryAr: 'دولة قطر',
    countryCode: 'QA',
    role: 'Regional Office — Gulf Operations',
    roleAr: 'المكتب الإقليمي — عمليات الخليج العربي',
    address: 'Doha, State of Qatar',
    addressAr: 'الدوحة، دولة قطر',
    phone: '+974 70 5555 73',
    email: 'r.hashim@elmashrq.com',
  },
]

export async function getRegionalOffices(): Promise<RegionalOffice[]> {
  return REGIONAL_OFFICES
}
