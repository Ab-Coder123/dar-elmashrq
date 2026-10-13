import type { RegionalOffice } from '../types'

/**
 * Regional offices data.
 * Sourced from the Dar ElMashrq corporate profile.
 * Only locations confirmed in the PDF are listed.
 */
const REGIONAL_OFFICES: RegionalOffice[] = [
  {
    id: 'dammam-branch',
    city: 'Dammam',
    cityAr: 'الدمام',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    countryCode: 'SA',
    role: 'Eastern Province Hub — Business Center',
    roleAr: 'فرع المنطقة الشرقية — مركز الشاطئ للأعمال',
    address: 'Al-Shati Business Center, 8110 Prince Mohammed Bin Fahd Road, Al-Shati Al-Sharqi, Dammam, Saudi Arabia',
    addressAr: 'مركز الشاطئ للأعمال، 8110 طريق الأمير محمد بن فهد، حي الشاطئ الشرقي، الدمام، المملكة العربية السعودية',
    phone: '+966 58 160 5812',
    email: 'info@elmashrq.com',
  },
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
    phone: '+966 58 160 5812',
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
    phone: '+974 70 5555 73',
    email: 'r.hashim@elmashrq.com',
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
]

export async function getRegionalOffices(): Promise<RegionalOffice[]> {
  return REGIONAL_OFFICES
}
