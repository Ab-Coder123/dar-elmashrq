import type { Project } from '@dar-elmashrq/types'

/**
 * Static project data — Phase 01/02 placeholder.
 *
 * Source: Dar ElMashrq corporate PDF (68 pages).
 * All project names, locations, and details are PDF-verified.
 *
 * ═══════════════════════════════════════════════════════════════
 * ARCHITECTURE CONTRACT — READ BEFORE MODIFYING
 * ═══════════════════════════════════════════════════════════════
 *
 * This file is the ONLY place that knows about the static data source.
 *
 * NEVER import this file from UI components.
 * ALWAYS use project.service.ts as the entry point.
 *
 * When the backend API is ready (Phase 03):
 *   1. Update project.service.ts to call the API instead
 *   2. Archive or delete this file
 *   3. Zero UI changes required — the service interface stays the same
 *
 * ═══════════════════════════════════════════════════════════════
 *
 * CONTENT GAPS (confirmed missing from PDF, needed before launch):
 * - Project images (high-resolution photos)
 * - English descriptions for all projects
 * - Specific years for Saudi Arabia and Qatar projects
 * - Contract values for Saudi Arabia and Qatar projects
 * - Client names for most Saudi Arabia projects
 * ═══════════════════════════════════════════════════════════════
 */

const PROJECTS: Project[] = [
  // ──────────────────────────────────────────────
  // SAUDI ARABIA PROJECTS (PDF pages 10–44)
  // ──────────────────────────────────────────────
  {
    id: 'sa-001',
    slug: 'beverly-al-azeeza-new-facade',
    name: 'Beverly Al-Azeeza New Facade',
    nameAr: 'بيفرلي الواجهة الجديدة للعزيزة',
    country: 'saudi-arabia',
    location: 'Al-Azeeza',
    category: 'commercial',
    services: ['Civil Works', 'Finishing'],
    images: [],
    isFeatured: true,
    order: 1,
  },
  {
    id: 'sa-002',
    slug: 'grc-factory',
    name: 'GRC Factory',
    nameAr: 'مصنع GRC',
    country: 'saudi-arabia',
    location: 'Saudi Arabia',
    category: 'infrastructure',
    services: ['Civil Works', 'Construction'],
    images: [],
    isFeatured: false,
    order: 2,
  },
  {
    id: 'sa-003',
    slug: 'way-care-medical-hospital',
    name: 'Way Care Medical Hospital',
    nameAr: 'مستشفى وي كير الطبي',
    country: 'saudi-arabia',
    location: 'Saudi Arabia',
    category: 'healthcare',
    services: ['Civil Works', 'Electrical Works', 'Air Conditioning', 'Finishing'],
    images: [],
    isFeatured: true,
    order: 3,
  },
  {
    id: 'sa-004',
    slug: 'residential-villas-al-qatif',
    name: 'Residential Villas — Al-Qatif',
    nameAr: 'فيلات سكنية بالقطيف',
    country: 'saudi-arabia',
    location: 'Al-Qatif',
    category: 'residential',
    services: ['Civil Works', 'Finishing', 'Electrical Works', 'Sanitary Works'],
    images: [],
    isFeatured: false,
    order: 4,
  },
  {
    id: 'sa-005',
    slug: 'asbestos-pipe-replacement-al-naeriyah',
    name: 'Asbestos Pipe Replacement — Al-Naeriyah',
    nameAr: 'تغيير مواسير الأسبستوس منطقة النعيرية',
    country: 'saudi-arabia',
    location: 'Al-Naeriyah',
    category: 'infrastructure',
    services: ['Civil Works', 'Infrastructure'],
    images: [],
    isFeatured: false,
    order: 5,
  },
  {
    id: 'sa-006',
    slug: 'western-water-pump-station-ras-tanura',
    name: 'Western Water Pump Station — Ras Tanura',
    nameAr: 'محطة ضخ المياه الغربية، رأس تنورة',
    country: 'saudi-arabia',
    location: 'Ras Tanura',
    description:
      'Water pump station for the General Administration of Water Services in the Eastern Region.',
    descriptionAr:
      'محطة ضخ المياه الغربية — رأس تنورة — الإدارة العامة لخدمات المياه بالمنطقة الشرقية.',
    category: 'infrastructure',
    services: ['Civil Works', 'Infrastructure', 'Electrical Works'],
    images: [],
    isFeatured: false,
    order: 6,
  },
  {
    id: 'sa-007',
    slug: 'residential-tower',
    name: 'Residential Tower',
    nameAr: 'برج سكني',
    country: 'saudi-arabia',
    location: 'Saudi Arabia',
    category: 'residential',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: true,
    order: 7,
  },
  {
    id: 'sa-008',
    slug: 'al-smaeel-tower',
    name: 'Al-Smaeel Tower',
    nameAr: 'برج السماعيل',
    country: 'saudi-arabia',
    location: 'Saudi Arabia',
    category: 'residential',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 8,
  },
  {
    id: 'sa-009',
    slug: 'crispy-restaurant-al-sharea-al-awal',
    name: 'Crispy Restaurant — Al-Sharea Al-Awal',
    nameAr: 'مطاعم كرسبي الشارع الأول',
    country: 'saudi-arabia',
    location: 'Saudi Arabia',
    category: 'hospitality',
    services: ['Civil Works', 'Finishing', 'Electrical Works', 'MEP'],
    images: [],
    isFeatured: false,
    order: 9,
  },
  {
    id: 'sa-010',
    slug: 'crispy-cream-dhahran',
    name: 'Crispy Cream — Dhahran',
    nameAr: 'كرسبي كريم الظهران',
    country: 'saudi-arabia',
    location: 'Dhahran',
    category: 'hospitality',
    services: ['Civil Works', 'Finishing', 'Electrical Works'],
    images: [],
    isFeatured: false,
    order: 10,
  },
  {
    id: 'sa-011',
    slug: 'kfc-hardees-prince-turki-khobar',
    name: 'KFC & Hardees — Prince Turki, Al-Khobar',
    nameAr: 'كنتاكي وهارديز البرنس ترك الخبر',
    country: 'saudi-arabia',
    location: 'Al-Khobar',
    category: 'hospitality',
    services: ['Civil Works', 'Finishing', 'Electrical Works'],
    images: [],
    isFeatured: false,
    order: 11,
  },
  {
    id: 'sa-012',
    slug: 'kfc-al-safa-al-rakha',
    name: 'KFC — Al-Safa Al-Rakha',
    nameAr: 'كنتاكي الصفا الراكة',
    country: 'saudi-arabia',
    location: 'Saudi Arabia',
    category: 'hospitality',
    services: ['Civil Works', 'Finishing', 'Electrical Works'],
    images: [],
    isFeatured: false,
    order: 12,
  },
  {
    id: 'sa-013',
    slug: 'educational-buildings-public-security-madinah',
    name: '2 Educational Buildings — Public Security Training City, Madinah',
    nameAr: 'مبنيان تعليميان بمدينة تدريب الأمن العام بالمدينة المنورة',
    country: 'saudi-arabia',
    location: 'Madinah',
    category: 'government-institutional',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: true,
    order: 13,
  },
  {
    id: 'sa-014',
    slug: 'forensic-evidence-building-development-riyadh',
    name: 'Forensic Evidence Building Development & Rehabilitation — Riyadh',
    nameAr: 'تطوير وتأهيل مبنى الأدلة الجنائية بالرياض',
    country: 'saudi-arabia',
    location: 'Riyadh',
    category: 'government-institutional',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 14,
  },
  {
    id: 'sa-015',
    slug: 'disciplinary-councils-renovation-riyadh',
    name: 'General Administration for Disciplinary Councils Renovation — Riyadh',
    nameAr: 'تطوير وترميم مبنى الإدارة العامة للمجالس التأديبية بالرياض',
    country: 'saudi-arabia',
    location: 'Riyadh',
    category: 'government-institutional',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 15,
  },
  {
    id: 'sa-016',
    slug: 'forensic-evidence-site-preparation-riyadh',
    name: 'General Administration of Forensic Evidence — Site Preparation, Riyadh',
    nameAr: 'تجهيز الموقع العام لمبنى الإدارة العامة للأدلة الجنائية في الرياض',
    country: 'saudi-arabia',
    location: 'Riyadh',
    category: 'government-institutional',
    services: ['Civil Works', 'Construction'],
    images: [],
    isFeatured: false,
    order: 16,
  },

  // ──────────────────────────────────────────────
  // EGYPT PROJECTS (PDF pages 46–54)
  // ──────────────────────────────────────────────
  {
    id: 'eg-001',
    slug: 'awlad-ragab-supermarket-chain-21-branches',
    name: 'Awlad Ragab Supermarket Chain — 21+ Branches',
    nameAr: 'سلسلة سوبر ماركت أولاد رجب — أكثر من 21 فرع',
    country: 'egypt',
    location: 'Multiple Cities — Egypt',
    locationAr: 'مدن متعددة في مصر',
    year: 2021,
    description:
      'Construction and fit-out of 21+ supermarket branches across Egypt from 2010 to 2021, including branches in Madinaty, Hurghada, Mansoura, Al-Qanater, Port Said, and more.',
    descriptionAr:
      'إنشاء وتجهيز أكثر من 21 فرعاً لسلسلة سوبر ماركت أولاد رجب في الفترة من 2010 إلى 2021.',
    category: 'commercial',
    services: ['Civil Works', 'Finishing', 'Electrical Works', 'MEP'],
    images: [],
    isFeatured: true,
    order: 1,
  },
  {
    id: 'eg-002',
    slug: 'qasr-al-husseini-residential-towers',
    name: 'Qasr Al-Husseini Residential Towers — 12 Towers',
    nameAr: 'عمارات قصر الحسيني (12 عمارة)',
    country: 'egypt',
    location: 'Egypt',
    year: 2016,
    description: '12 residential buildings for Al-Hussein Real Estate Development Company.',
    descriptionAr:
      'إنشاء 12 عمارة سكنية لصالح شركة الحسين للتنمية العقارية بإجمالي 20 مليون جنيه.',
    category: 'residential',
    contractValue: { amount: 20000000, currency: 'EGP' },
    clientName: 'Al-Hussein Real Estate Development Company',
    services: ['Civil Works', 'Construction'],
    images: [],
    isFeatured: true,
    order: 2,
  },
  {
    id: 'eg-003',
    slug: 'al-shorouk-housing-complex-30-towers',
    name: 'Al-Shorouk Housing Complex — 30 Towers',
    nameAr: 'مجموعة عمارات إسكان بمدينة الشروق (30 عمارة)',
    country: 'egypt',
    location: 'Al-Shorouk City',
    year: 2015,
    description: '30 residential buildings in Al-Shorouk City for Eskan Investment Company.',
    descriptionAr:
      'مجموعة عمارات إسكان (30 عمارة) بمدينة الشروق لصالح شركة إسكان للاستثمار بإجمالي 60 مليون جنيه.',
    category: 'residential',
    contractValue: { amount: 60000000, currency: 'EGP' },
    clientName: 'Eskan Investment Company',
    services: ['Civil Works', 'Construction'],
    images: [],
    isFeatured: true,
    order: 3,
  },
  {
    id: 'eg-004',
    slug: 'al-hassan-towers-8-towers',
    name: 'Al-Hassan Towers — 8 Towers',
    nameAr: 'مجموعة أبراج الحسن (8 أبراج)',
    country: 'egypt',
    location: 'Egypt',
    year: 2008,
    description: '8 residential towers for Al-Hassan Real Estate Development Company.',
    descriptionAr: 'مجموعة أبراج الحسن (8 أبراج) لصالح شركة الحسن للتنمة العقارية.',
    category: 'residential',
    contractValue: { amount: 21000000, currency: 'EGP' },
    clientName: 'Al-Hassan Real Estate Development Company',
    services: ['Civil Works', 'Construction'],
    images: [],
    isFeatured: false,
    order: 4,
  },
  {
    id: 'eg-005',
    slug: 'al-maraga-central-hospital-reconstruction',
    name: 'Al-Maraga Central Hospital — Reconstruction & Expansion',
    nameAr: 'إعادة بناء وتوسعة قسم الاستقبال والعيادات الخارجية — مستشفى المراغة المركزي',
    country: 'egypt',
    location: 'Al-Maraga, Sohag',
    category: 'healthcare',
    description:
      'Demolition and reconstruction of the reception and outpatient clinic sections of Al-Maraga Central Hospital, Sohag Governorate.',
    services: ['Civil Works', 'Construction', 'Finishing', 'MEP'],
    images: [],
    isFeatured: false,
    order: 5,
  },
  {
    id: 'eg-006',
    slug: 'al-balina-hospital-medical-equipment',
    name: 'Al-Balina Central Hospital — Medical Equipment Supply & Installation',
    nameAr: 'أعمال توريد وتركيب وصيانة أجهزة طبية — مستشفى البلينا المركزي',
    country: 'egypt',
    location: 'Al-Balina, Sohag',
    category: 'healthcare',
    services: ['Electrical Works', 'Technical Installation'],
    images: [],
    isFeatured: false,
    order: 6,
  },
  {
    id: 'eg-007',
    slug: 'taha-general-hospital-renovation',
    name: 'Taha General Hospital — Renovation',
    nameAr: 'أعمال ترميم وتجديد مستشفى طهطا العام',
    country: 'egypt',
    location: 'Taha, Sohag',
    category: 'healthcare',
    services: ['Civil Works', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 7,
  },

  // ──────────────────────────────────────────────
  // QATAR PROJECTS (PDF pages 56–59)
  // ──────────────────────────────────────────────
  {
    id: 'qa-001',
    slug: 'villa-al-mishaf-qatar',
    name: 'Private Villa — Al-Mishaf',
    nameAr: 'مشروع فيلا بمنطقة المشاف',
    country: 'qatar',
    location: 'Al-Mishaf, Qatar',
    category: 'residential',
    clientName: 'Qasim Al-Obeidan',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 1,
  },
  {
    id: 'qa-002',
    slug: 'villa-muraikh-qatar',
    name: 'Private Villa — Muraikh',
    nameAr: 'مشروع فيلا بمنطقة موراكة',
    country: 'qatar',
    location: 'Muraikh, Qatar',
    category: 'residential',
    clientName: 'Khaled Al-Ali',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 2,
  },
  {
    id: 'qa-003',
    slug: 'residential-commercial-building-muwazzar',
    name: 'Residential & Commercial Building — Muwazzar',
    nameAr: 'مشروع مبنى سكني تجاري بمنطقة موازار',
    country: 'qatar',
    location: 'Muwazzar, Qatar',
    category: 'residential',
    clientName: 'Muhammad Al-Dosari',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 3,
  },
  {
    id: 'qa-004',
    slug: 'three-villas-al-dakheel',
    name: '3 Private Villas — Al-Dakheel',
    nameAr: 'مشروع عدد 3 فيلا بمنطقة الدخيل',
    country: 'qatar',
    location: 'Al-Dakheel, Qatar',
    category: 'residential',
    clientName: 'Nasser & Hammad Al-Noaimi',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 4,
  },
  {
    id: 'qa-005',
    slug: 'two-villas-al-sali',
    name: '2 Private Villas — Al-Sali',
    nameAr: 'مشروع عدد 2 فيلا بمنطقة السلي',
    country: 'qatar',
    location: 'Al-Sali, Qatar',
    category: 'residential',
    clientName: 'Fahad Al-Maadeed',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 5,
  },
  {
    id: 'qa-006',
    slug: 'villa-ain-khaled',
    name: 'Private Villa — Ain Khaled',
    nameAr: 'مشروع فيلا بمنطقة عين خالد',
    country: 'qatar',
    location: 'Ain Khaled, Qatar',
    category: 'residential',
    clientName: 'Ahmed Al-Hamr',
    services: ['Civil Works', 'Construction', 'Finishing'],
    images: [],
    isFeatured: false,
    order: 6,
  },
]

/**
 * Returns all projects.
 * Async signature — designed for drop-in replacement with API call.
 */
export async function getAllProjects(): Promise<Project[]> {
  return PROJECTS
}

/**
 * Returns only featured projects (for the homepage).
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  return PROJECTS.filter((p) => p.isFeatured)
}
