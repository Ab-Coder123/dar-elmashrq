import type { CompanyProfile, NavigationItem } from '@dar-elmashrq/types'

/**
 * Company profile data — single source of truth.
 *
 * All values sourced and verified from the Dar ElMashrq corporate PDF (68 pages).
 * Fields marked NEEDS_CONFIRMATION require client input before launch.
 *
 * Do NOT scatter company information across components.
 * Always import from this file.
 */
export const COMPANY_PROFILE: CompanyProfile = {
  name: 'Dar ElMashrq',
  nameAr: 'دار المشرق',
  tagline: 'Trading & Contracting Company',
  taglineAr: 'للتجارة والمقاولات',
  /** Source: PDF page 5 — "established in 1994" */
  foundedYear: 1994,
  /** Source: PDF page 6 — verbatim */
  vision:
    'Become the destination of choice for our clients in Saudi Arabia, Egypt and in MENA region for providing project and program management solutions merging modern international industry techniques and standards with regional approaches.',
  visionAr:
    'أن نكون الوجهة المفضلة لعملائنا في المملكة العربية السعودية ومصر ومنطقة الشرق الأوسط وشمال أفريقيا في تقديم حلول إدارة المشاريع والبرامج، بدمج الأساليب الدولية الحديثة في الصناعة والمعايير مع الأساليب الإقليمية.',
  /** NEEDS_CONFIRMATION: Mission statement not found in PDF */
  mission: undefined,
  missionAr: undefined,
  /** Source: Business Cards & Corporate Profile */
  website: 'https://www.elmashrq.com',
  email: 'info@elmashrq.com',
  phones: ['+966 58 160 5812', '+20 111 62 5555 6', '+966 54 882 1738', '+974 70 5555 73'],
  address: {
    country: 'Saudi Arabia',
    city: 'Dammam',
    district: 'Al-Shati Al-Sharqi, 8110 Prince Mohammed Bin Fahd Road, Al-Shati Business Center',
  },
}

/**
 * Key Corporate Leadership Executives (from verified official business cards)
 */
export const COMPANY_LEADERSHIP = [
  {
    name: 'Raafat Hashim',
    nameAr: 'رأفت هاشم',
    role: 'Chief Executive Officer (CEO)',
    roleAr: 'الرئيس التنفيذي',
    phone: '+966 58 160 5812',
    intlPhone: '+974 70 5555 73',
    email: 'r.hashim@elmashrq.com',
  },
  {
    name: 'Mohamed El Shenawy',
    nameAr: 'محمد الشناوي',
    role: 'Operations Director',
    roleAr: 'مدير العمليات',
    phone: '+966 54 882 1738',
    email: 'm.elshenawy@elmashrq.com',
  },
  {
    name: 'Walid Salem',
    nameAr: 'وليد سالم',
    role: 'Business Development Director',
    roleAr: 'مدير تطوير الأعمال',
    phone: '+966 54 755 2373',
    email: 'w.salem@elmashrq.com',
  },
] as const

/**
 * Primary navigation — single source of truth.
 *
 * Components import this array.
 * Navigation is NEVER hard-coded inside individual components.
 */
export const MAIN_NAVIGATION: NavigationItem[] = [
  { label: 'Home', labelAr: 'الرئيسية', href: '/' },
  { label: 'About', labelAr: 'عن الشركة', href: '/about' },
  { label: 'Services', labelAr: 'خدماتنا', href: '/services' },
  { label: 'Projects', labelAr: 'مشاريعنا', href: '/projects' },
  { label: 'Contact', labelAr: 'تواصل معنا', href: '/contact' },
]

/**
 * Company statistics for the Stats Bar section.
 *
 * Values confirmed from PDF.
 * "35+" projects is a conservative count of named projects in the PDF.
 * Client should confirm the official total before launch.
 */
export const COMPANY_STATS = [
  {
    label: 'Years of Experience',
    labelAr: 'سنوات من الخبرة',
    value: '30+',
    note: 'Since 1994 — PDF confirmed',
  },
  {
    label: 'Countries',
    labelAr: 'دول',
    value: '3',
    note: 'Saudi Arabia, Egypt, Qatar — PDF confirmed',
  },
  {
    label: 'Projects Delivered',
    labelAr: 'مشروع منفذ',
    value: '35+',
    note: 'Counted from PDF project pages — NEEDS_CONFIRMATION',
  },
  {
    label: 'Certifications',
    labelAr: 'شهادة رسمية',
    value: '7',
    note: 'PDF pages 60–67 — confirmed',
  },
] as const
