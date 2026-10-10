import bcrypt from 'bcryptjs'
import { createDefaultDb } from './scriptDb'

const BCRYPT_COST = 12

const SEED_SERVICES = [
  { slug: 'civil-works-finishing', name: 'Civil Works & Finishing', nameAr: 'أعمال مدنية والتشطيبات', description: 'Complete civil construction and high-quality finishing works across all project types.', descriptionAr: 'أعمال البناء المدني والتشطيبات عالية الجودة لجميع أنواع المشاريع.', icon: 'Building2', order: 1 },
  { slug: 'electrical-works', name: 'Electrical Works', nameAr: 'أعمال كهربائية', description: 'Full electrical installation and systems for commercial and residential projects.', descriptionAr: 'التركيبات الكهربائية الكاملة والأنظمة للمشاريع التجارية والسكنية.', icon: 'Zap', order: 2 },
  { slug: 'air-conditioning', name: 'Air Conditioning Works', nameAr: 'أعمال تكييف الهواء', description: 'HVAC systems design, supply, and installation.', descriptionAr: 'تصميم وتوريد وتركيب أنظمة التكييف والتهوية.', icon: 'Wind', order: 3 },
  { slug: 'fire-fighting-sanitary', name: 'Fire Fighting & Sanitary Works', nameAr: 'أعمال إطفاء الحريق والصحية', description: 'Fire suppression systems and complete sanitary infrastructure.', descriptionAr: 'أنظمة إطفاء الحريق والبنية التحتية الصحية الكاملة.', icon: 'ShieldCheck', order: 4 },
  { slug: 'design', name: 'Design', nameAr: 'تصميم', description: 'Architectural and engineering design services.', descriptionAr: 'خدمات التصميم المعماري والهندسي.', icon: 'PenTool', order: 5 },
  { slug: 'construction', name: 'Construction', nameAr: 'بناء وإنشاء', description: 'Full construction execution from foundations to handover, adhering to the highest engineering standards.', descriptionAr: 'تنفيذ البناء الكامل من الأساسات حتى التسليم، مع الالتزام بأعلى المعايير الهندسية.', icon: 'HardHat', order: 6 },
  { slug: 'project-management', name: 'Project Management', nameAr: 'إدارة المشاريع', description: 'Professional project and program management merging international techniques with regional expertise.', descriptionAr: 'إدارة المشاريع والبرامج بمزج الأساليب الدولية مع الخبرة الإقليمية.', icon: 'BarChart3', order: 7 },
  { slug: 'property-development', name: 'Property Development', nameAr: 'تطوير عقاري', description: 'Real estate investment and property development services.', descriptionAr: 'خدمات الاستثمار العقاري وتطوير العقارات.', icon: 'MapPin', order: 8 },
]

const SEED_PROJECTS = [
  { slug: 'beverly-al-azeeza-new-facade', name: 'Beverly Al-Azeeza New Facade', nameAr: 'بيفرلي الواجهة الجديدة للعزيزة', country: 'saudi-arabia', location: 'Al-Azeeza', locationAr: 'العزيزية', category: 'commercial', year: 2024, isFeatured: true, order: 1, services: ['Civil Works', 'Finishing'] },
  { slug: 'grc-factory', name: 'GRC Factory', nameAr: 'مصنع GRC', country: 'saudi-arabia', location: 'Saudi Arabia', locationAr: 'المملكة العربية السعودية', category: 'infrastructure', year: 2023, isFeatured: false, order: 2, services: ['Civil Works', 'Construction'] },
  { slug: 'way-care-medical-hospital', name: 'Way Care Medical Hospital', nameAr: 'مستشفى وي كير الطبي', country: 'saudi-arabia', location: 'Saudi Arabia', locationAr: 'المملكة العربية السعودية', category: 'healthcare', year: 2024, isFeatured: true, order: 3, services: ['Civil Works', 'Electrical Works', 'Finishing'] },
  { slug: 'residential-villas-al-qatif', name: 'Residential Villas, Al-Qatif', nameAr: 'فيلات سكنية بالقطيف', country: 'saudi-arabia', location: 'Al-Qatif', locationAr: 'القطيف', category: 'residential', year: 2023, isFeatured: false, order: 4, services: ['Civil Works', 'Finishing'] },
  { slug: 'western-water-pump-station-ras-tanura', name: 'Western Water Pump Station — Ras Tanura', nameAr: 'محطة ضخ المياه الغربية، رأس تنورة', country: 'saudi-arabia', location: 'Ras Tanura', locationAr: 'رأس تنورة', category: 'infrastructure', year: 2022, isFeatured: false, order: 5, services: ['Civil Works', 'Infrastructure'] },
  { slug: 'residential-tower-saudi', name: 'Residential Tower', nameAr: 'برج سكني', country: 'saudi-arabia', location: 'Saudi Arabia', locationAr: 'المملكة العربية السعودية', category: 'residential', year: 2023, isFeatured: true, order: 6, services: ['Civil Works', 'Construction', 'Finishing'] },
  { slug: 'al-smaeel-tower', name: 'Al-Smaeel Tower', nameAr: 'برج السماعيل', country: 'saudi-arabia', location: 'Saudi Arabia', locationAr: 'المملكة العربية السعودية', category: 'residential', year: 2022, isFeatured: false, order: 7, services: ['Civil Works', 'Construction', 'Finishing'] },
  { slug: 'educational-buildings-madinah-public-security', name: 'Educational Buildings — Public Security Training City, Madinah', nameAr: 'مبنيان تعليميان بمدينة تدريب الأمن العام بالمدينة المنورة', country: 'saudi-arabia', location: 'Madinah', locationAr: 'المدينة المنورة', category: 'government-institutional', year: 2024, isFeatured: true, order: 8, services: ['Civil Works', 'Construction', 'Finishing'] },
  { slug: 'forensic-evidence-building-riyadh', name: 'Forensic Evidence Building Development — Riyadh', nameAr: 'تطوير وتأهيل مبنى الأدلة الجنائية بالرياض', country: 'saudi-arabia', location: 'Riyadh', locationAr: 'الرياض', category: 'government-institutional', year: 2024, isFeatured: false, order: 9, services: ['Civil Works', 'Construction', 'Finishing'] },
  { slug: 'awlad-ragab-supermarket-chain', name: 'Awlad Ragab Supermarket Chain — 21+ Branches', nameAr: 'سلسلة سوبر ماركت أولاد رجب — أكثر من 21 فرع', country: 'egypt', location: 'Multiple Cities', locationAr: 'مدن متعددة', category: 'commercial', year: 2021, isFeatured: true, order: 10, services: ['Civil Works', 'Finishing', 'Electrical Works'] },
  { slug: 'qasr-al-husseini-residential-towers', name: 'Qasr Al-Husseini Residential Towers (12 Towers)', nameAr: 'عمارات قصر الحسيني (12 عمارة)', country: 'egypt', location: 'Egypt', locationAr: 'مصر', category: 'residential', year: 2016, isFeatured: true, order: 11, services: ['Civil Works', 'Construction'] },
  { slug: 'al-shorouk-housing-complex', name: 'Al-Shorouk Housing Complex (30 Towers)', nameAr: 'مجموعة عمارات إسكان بمدينة الشروق (30 عمارة)', country: 'egypt', location: 'Al-Shorouk City', locationAr: 'مدينة الشروق', category: 'residential', year: 2015, isFeatured: true, order: 12, services: ['Civil Works', 'Construction'] },
  { slug: 'al-hassan-towers', name: 'Al-Hassan Towers (8 Towers)', nameAr: 'مجموعة أبراج الحسن (8 أبراج)', country: 'egypt', location: 'Egypt', locationAr: 'مصر', category: 'residential', year: 2008, isFeatured: false, order: 13, services: ['Civil Works', 'Construction'] },
  { slug: 'al-maraga-hospital-reconstruction', name: 'Al-Maraga Central Hospital — Reconstruction & Expansion', nameAr: 'إعادة بناء وتوسعة مستشفى المراغة المركزي', country: 'egypt', location: 'Al-Maraga, Sohag', locationAr: 'المراغة، سوهاج', category: 'healthcare', year: 2023, isFeatured: false, order: 14, services: ['Civil Works', 'Construction', 'Finishing'] },
  { slug: 'villa-al-mishaf-qatar', name: 'Private Villa — Al-Mishaf', nameAr: 'فيلا بمنطقة المشاف', country: 'qatar', location: 'Al-Mishaf, Qatar', locationAr: 'المشاف، قطر', category: 'residential', year: 2023, isFeatured: false, order: 15, services: ['Civil Works', 'Construction', 'Finishing'] },
  { slug: 'residential-commercial-building-muwazzar', name: 'Residential & Commercial Building — Muwazzar', nameAr: 'مبنى سكني تجاري بمنطقة موازار', country: 'qatar', location: 'Muwazzar, Qatar', locationAr: 'موازار، قطر', category: 'residential', year: 2024, isFeatured: false, order: 16, services: ['Civil Works', 'Construction', 'Finishing'] },
  { slug: 'three-villas-al-dakheel-qatar', name: '3 Villas — Al-Dakheel', nameAr: '3 فيلات بمنطقة الدخيل', country: 'qatar', location: 'Al-Dakheel, Qatar', locationAr: 'الدخيل، قطر', category: 'residential', year: 2023, isFeatured: false, order: 17, services: ['Civil Works', 'Construction', 'Finishing'] },
]

const SEED_HOME = {
  hero: {
    badge: 'CONTRACTING & REAL ESTATE • ESTABLISHED 1994',
    headline: 'DAR EL MASHRQ',
    tagline: 'Architectural Precision. Sovereign Scale.',
    bodyCopy: 'Tier-one civil contracting, electro-mechanical prowess, and master-planned structural execution across Saudi Arabia, Egypt, and Qatar for three continuous decades.',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=2400&q=90',
    exploreCtaText: 'Explore Projects',
    aboutCtaText: 'About The Enterprise',
    status: 'published',
  },
  stats: [
    { label: 'Foundation Year', labelAr: 'سنة التأسيس', value: '1994', description: 'Over 30 years of uninterrupted civil contracting and engineering precision.' },
    { label: 'Sovereign Presence', labelAr: 'الوجود الإقليمي', value: '3', description: 'Fully licensed and operational bureaus across Saudi Arabia, Egypt, and Qatar.' },
    { label: 'Longevity', labelAr: 'الخبرة الممتدة', value: '30+', description: 'Decades executing critical commercial, institutional, and infrastructure assets.' },
    { label: 'Execution Track', labelAr: 'سجل الإنجاز', value: '100+', description: 'High-profile turnkey projects delivered across municipal, state, and private sectors.' },
  ],
  whyPillars: [
    { id: 'protocol-01', code: 'PROTOCOL // 01', title: 'Engineering Rigor & BIM Precision', description: 'Integrating modern CAD/BIM modeling and structural engineering standards.', iconName: 'Cpu' },
    { id: 'protocol-02', code: 'PROTOCOL // 02', title: 'Multi-Disciplinary Turnkey Power', description: 'In-house self-performance across heavy civil, MEP, HVAC, and luxury finishes.', iconName: 'Zap' },
    { id: 'protocol-03', code: 'PROTOCOL // 03', title: 'Stringent QA/QC & Life-Safety Codes', description: 'ISO-aligned management protocols paired with Civil Defense pre-qualification.', iconName: 'Shield' },
    { id: 'protocol-04', code: 'PROTOCOL // 04', title: '30-Year Regional Heritage', description: 'Since 1994, our multi-country licensing anchors landmark contracts.', iconName: 'Award' },
  ],
  services: [
    { id: 'civil-works-finishing', number: '01', specCode: 'SPEC: CW-94', title: 'Civil Works & Finishing', titleAr: 'أعمال مدنية والتشطيبات', description: 'Turnkey superstructure concrete and luxury commercial interior fit-outs.', iconName: 'Building2' },
    { id: 'electrical-works', number: '02', specCode: 'SPEC: EL-88', title: 'Electrical Works', titleAr: 'أعمال كهربائية', description: 'Medium and low-voltage substations and intelligent power infrastructures.', iconName: 'Zap' },
    { id: 'air-conditioning', number: '03', specCode: 'SPEC: HV-02', title: 'Air Conditioning & HVAC', titleAr: 'أعمال تكييف الهواء', description: 'Industrial central chilled water and packaged VRF installations.', iconName: 'Wind' },
    { id: 'fire-fighting', number: '04', specCode: 'SPEC: FF-10', title: 'Fire Fighting Systems', titleAr: 'أنظمة إطفاء الحريق', description: 'NFPA compliant deluge systems and FM-200 gas suppression.', iconName: 'Flame' },
  ],
  regionalHubs: [
    { country: 'saudi-arabia', countryName: 'Kingdom of Saudi Arabia', countryNameAr: 'المملكة العربية السعودية', coordinates: '24.7136° N, 46.6753° E', badge: 'CORPORATE HEADQUARTERS', description: 'Anchored in Riyadh’s central financial corridor.', address: 'Olaya District, Riyadh 12213', phone: '+966 58 160 5812', classification: 'CLASS-1 GENERAL CONTRACTOR' },
    { country: 'egypt', countryName: 'Arab Republic of Egypt', countryNameAr: 'جمهورية مصر العربية', coordinates: '30.0444° N, 31.2357° E', badge: 'REGIONAL BUREAU', description: 'Full-scale engineering bureau overseeing Egypt operations.', address: 'Cairo Engineering Center, Egypt', phone: '+20 2 2795 1994', classification: 'REGIONAL ENGINEERING HUB' },
    { country: 'qatar', countryName: 'State of Qatar', countryNameAr: 'دولة قطر', coordinates: '25.2854° N, 51.5310° E', badge: 'OPERATIONAL HUB', description: 'Delivering turnkey institutional infrastructure for Doha and Lusail.', address: 'West Bay Business District, Doha', phone: '+974 4488 1994', classification: 'CONTRACTING REGISTRATION' },
  ],
  credentials: [
    { id: 'iso-9001', category: 'INTERNATIONAL QUALITY', title: 'ISO 9001 : 2015', description: 'Certified Quality Management System covering comprehensive engineering protocols.', registrationNumber: 'KSA-QMS-9401', status: 'VERIFIED' },
    { id: 'civil-defense', category: 'STATUTORY LICENSES', title: 'Civil Defense Authorized', description: 'Licensed Tier-1 Contractor for fire suppression and automated life safety.', registrationNumber: 'DEFENSE REG # 88204-CD', status: 'VERIFIED' },
  ],
  status: 'published',
}

const SEED_ABOUT = {
  hero: {
    badge: 'ENTERPRISE PROFILE // ESTABLISHED 1994',
    headline: 'AUTHORITY, RIGOR & HERITAGE',
    tagline: 'Engineering the Built Environment Across Three Sovereign Markets',
    description: 'Dar El Mashrq is a premier construction and real estate investment institution operating across primary regional economies in Saudi Arabia, Egypt, and Qatar for three continuous decades.',
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=90',
    status: 'published',
  },
  vision: {
    visionTitle: 'Our Strategic Vision',
    visionDescription: 'To become the destination of choice for our clients in Saudi Arabia, Egypt, and the MENA region for providing project and program management solutions merging modern international industry techniques and standards with regional approaches.',
    missionTitle: 'Our Engineering Mission',
    missionDescription: 'Delivering uncompromising structural longevity, technical precision, and full-spectrum EPC execution while fostering sovereign development across the Middle East.',
  },
  history: [
    { year: '1994', title: 'Enterprise Inception', titleAr: 'تأسيس الشركة', description: 'Founding of Dar ElMashrq contracting operations.', details: ['Civil works', 'Commercial development'] },
    { year: '2010', title: 'Regional Expansion', titleAr: 'التوسع الإقليمي', description: 'Expanded operations across Egypt and Gulf markets.', details: ['Retail chains', 'Supermarkets'] },
    { year: '2024', title: 'Institutional Mega-Projects', titleAr: 'المشاريع الكبرى', description: 'Executing major institutional, healthcare, and state developments.', details: ['Vision 2030 alignment', 'EPC contracts'] },
  ],
  capabilities: [
    { number: '01', title: 'Heavy Civil & Superstructures', titleAr: 'الإنشاءات المدنية والهياكل', subtitle: 'Turnkey structural engineering', description: 'Deep excavation, post-tension concrete, and commercial developments.', disciplines: ['Foundations', 'High-Rise', 'Industrial'] },
    { number: '02', title: 'Electro-Mechanical (MEP)', titleAr: 'الكهروميكانيك والأنظمة', subtitle: 'Total MEP execution', description: 'HVAC district cooling, substations, and life safety.', disciplines: ['Power', 'HVAC', 'Life-Safety'] },
  ],
  divisions: [
    { name: 'Engineering & Technical Affairs', nameAr: 'الشؤون الهندسية والفنية', lead: 'Chief Technical Officer', badge: 'DIVISION 01', departments: [{ title: 'Design & BIM Architecture', titleAr: 'التصميم والمعمارية الرقمية', code: 'DEP-ARC', roles: ['CAD/BIM Lead Engineers', 'Clash Detection Specialists'] }] },
    { name: 'Electro-Mechanical (MEP) & Systems', nameAr: 'الكهروميكانيك والأنظمة', lead: 'Director of MEP Engineering', badge: 'DIVISION 02', departments: [{ title: 'Electrical Infrastructures', titleAr: 'البنية التحتية الكهربائية', code: 'DEP-ELE', roles: ['Power Distribution Engineers'] }] },
  ],
  credentials: [
    { id: 'iso-9001', name: 'ISO 9001:2015 Quality Management', nameAr: 'شهادة الجودة العالمية آيزو 9001:2015', issuingBody: 'International Standards Organization', classification: 'QUALITY ASSURANCE' },
    { id: 'civil-defense', name: 'Civil Defense Tier-1 License', nameAr: 'ترخيص الدفاع المدني من الفئة الأولى', issuingBody: 'General Directorate of Civil Defense', classification: 'LIFE SAFETY' },
  ],
  status: 'published',
}

const SEED_CONTACT = {
  hero: {
    badge: 'CONNECT // REGIONAL NETWORK',
    headline: 'DIRECT ENGAGEMENT & PROJECT INQUIRIES',
    tagline: 'Strategic Presence Across Saudi Arabia, Egypt & Qatar',
    description: 'Connect directly with our engineering leadership and regional project offices.',
  },
  offices: [
    { id: 'off-01', country: 'saudi-arabia', countryName: 'Riyadh Headquarters', countryNameAr: 'المقر الرئيسي - الرياض', city: 'Riyadh', district: 'Olaya District', address: 'King Fahd Road, Olaya District, Riyadh, Kingdom of Saudi Arabia', addressAr: 'طريق الملك فهد، حي العليا، الرياض، المملكة العربية السعودية', phone: '00966581605812', email: 'info@elmashrq.com', coordinates: '', isHQ: true },
    { id: 'off-02', country: 'egypt', countryName: 'Cairo Regional Office', countryNameAr: 'المكتب الإقليمي - القاهرة', city: 'Cairo', district: 'New Cairo', address: 'Fifth Settlement, Business District, Cairo, Egypt', addressAr: 'التجمع الخامس، الحي التجاري، القاهرة، مصر', phone: '00201000000000', email: 'egypt@elmashrq.com', coordinates: '', isHQ: false },
    { id: 'off-03', country: 'qatar', countryName: 'Doha Regional Office', countryNameAr: 'المكتب الإقليمي - الدوحة', city: 'Doha', district: 'West Bay', address: 'West Bay Commercial District, Doha, Qatar', addressAr: 'منطقة أبراج الدفنة، الدوحة، قطر', phone: '0097440000000', email: 'qatar@elmashrq.com', coordinates: '', isHQ: false },
  ],
  generalEmail: 'info@elmashrq.com',
  supportEmail: 'inquiries@elmashrq.com',
  phones: ['00966581605812', '00966545051136'],
  workingHours: 'Sun - Thu: 8:00 AM - 5:00 PM',
  workingHoursAr: 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً',
  status: 'published',
}

const SEED_SETTINGS = {
  siteName: 'Dar ElMashrq Trading & Contracting Company',
  siteNameAr: 'شركة دار المشرق للتجارة والمقاولات',
  tagline: 'Leading Construction & Engineering Solutions Since 1994',
  taglineAr: 'حلول البناء والمقاولات الرائدة منذ عام 1994',
  foundedYear: 1994,
  officialEmail: 'info@elmashrq.com',
  phones: ['00966581605812', '00966545051136'],
  socialLinks: {
    linkedin: 'https://linkedin.com/company/dar-elmashrq',
    twitter: 'https://twitter.com/darelmashrq',
    instagram: 'https://instagram.com/darelmashrq',
  },
  headerNavigation: [
    { label: 'Home', labelAr: 'الرئيسية', href: '/', external: false },
    { label: 'About', labelAr: 'عن الشركة', href: '/about', external: false },
    { label: 'Services', labelAr: 'خدماتنا', href: '/services', external: false },
    { label: 'Projects', labelAr: 'المشاريع', href: '/projects', external: false },
    { label: 'Contact', labelAr: 'تواصل معنا', href: '/contact', external: false },
  ],
  footer: {
    copyrightText: '© 1994-2026 Dar ElMashrq Trading & Contracting. All Rights Reserved.',
    copyrightTextAr: '© 1994-2026 شركة دار المشرق للتجارة والمقاولات. جميع الحقوق محفوظة.',
    commercialRegistrationKSA: '1010199401',
    commercialRegistrationEG: '2020199402',
    taxNumber: '300099400010003',
  },
  maintenanceMode: false,
  status: 'published',
}

async function main(): Promise<void> {
  const db = createDefaultDb()
  console.log('🚀 Starting complete database seed to Supabase PostgreSQL...')

  try {
    // 1. Seed Admin User
    const email = 'elmashrq5555@gmail.com'
    const password = 'Mgc$5555'
    const displayName = 'Dar ElMashrq Admin'
    const role = 'admin'
    const hash = await bcrypt.hash(password, BCRYPT_COST)

    const existingAdmin = await db.query<{ id: string }>(
      'select id from admin_users where email = $1',
      [email]
    )
    if (existingAdmin.rows.length > 0) {
      await db.query(
        'update admin_users set password_hash = $1, display_name = $2, role = $3, is_active = true where email = $4',
        [hash, displayName, role, email]
      )
      console.log(`✅ Admin user updated: ${email}`)
    } else {
      await db.query(
        `insert into admin_users (email, password_hash, display_name, role, is_active)
         values ($1, $2, $3, $4, true)`,
        [email, hash, displayName, role]
      )
      console.log(`✅ Admin user seeded: ${email}`)
    }

    // 2. Seed Services
    console.log('🔄 Seeding services...')
    for (const s of SEED_SERVICES) {
      const existing = await db.query<{ id: string }>(
        'select id from services where slug = $1',
        [s.slug]
      )
      if (existing.rows.length === 0) {
        await db.query(
          `insert into services (slug, name, name_ar, description, description_ar, icon, display_order, status)
           values ($1, $2, $3, $4, $5, $6, $7, 'published')`,
          [s.slug, s.name, s.nameAr, s.description, s.descriptionAr, s.icon, s.order]
        )
      } else {
        await db.query(
          `update services set name = $1, name_ar = $2, description = $3, description_ar = $4, icon = $5, display_order = $6, status = 'published'
           where slug = $7`,
          [s.name, s.nameAr, s.description, s.descriptionAr, s.icon, s.order, s.slug]
        )
      }
    }
    console.log(`✅ Seeded ${SEED_SERVICES.length} services.`)

    // 3. Seed Projects
    console.log('🔄 Seeding projects...')
    for (const p of SEED_PROJECTS) {
      const existing = await db.query<{ id: string }>(
        'select id from projects where slug = $1',
        [p.slug]
      )

      let projectId: string
      if (existing.rows.length === 0) {
        const res = await db.query<{ id: string }>(
          `insert into projects (slug, name, name_ar, country, location, location_ar, category, year, description, description_ar, scope, scope_ar, client_name, is_featured, display_order, status)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 'published')
           returning id`,
          [
            p.slug,
            p.name,
            p.nameAr,
            p.country,
            p.location,
            p.locationAr,
            p.category,
            p.year,
            '',
            '',
            '',
            '',
            null,
            p.isFeatured,
            p.order,
          ]
        )
        const row = res.rows[0]
        if (!row) throw new Error('Failed to insert project')
        projectId = row.id
      } else {
        const row = existing.rows[0]
        if (!row) throw new Error('Project not found')
        projectId = row.id
        await db.query(
          `update projects set
             name = $1, name_ar = $2, country = $3, location = $4, location_ar = $5,
             category = $6, year = $7, is_featured = $8, display_order = $9, status = 'published'
           where id = $10`,
          [
            p.name,
            p.nameAr,
            p.country,
            p.location,
            p.locationAr,
            p.category,
            p.year,
            p.isFeatured,
            p.order,
            projectId,
          ]
        )
      }

      // Link services
      if (p.services && p.services.length > 0) {
        await db.query('delete from project_services where project_id = $1', [projectId])
        for (const sName of p.services) {
          const sRow = await db.query<{ id: string }>(
            'select id from services where name ILIKE $1 or name_ar ILIKE $1 limit 1',
            [`%${sName}%`]
          )
          const firstService = sRow.rows[0]
          if (firstService) {
            await db.query(
              'insert into project_services (project_id, service_id) values ($1, $2) on conflict do nothing',
              [projectId, firstService.id]
            )
          }
        }
      }
    }
    console.log(`✅ Seeded ${SEED_PROJECTS.length} projects.`)

    // 4. Seed Content Documents
    console.log('🔄 Seeding content documents...')
    const documents = [
      { key: 'home', status: 'published', data: SEED_HOME },
      { key: 'about', status: 'published', data: SEED_ABOUT },
      { key: 'contact', status: 'published', data: SEED_CONTACT },
      { key: 'settings', status: 'published', data: SEED_SETTINGS },
    ]

    for (const doc of documents) {
      const existing = await db.query<{ key: string }>(
        'select key from content_documents where key = $1',
        [doc.key]
      )
      if (existing.rows.length === 0) {
        await db.query(
          `insert into content_documents (key, status, data)
           values ($1, $2, $3)`,
          [doc.key, doc.status, JSON.stringify(doc.data)]
        )
      } else {
        await db.query(
          `update content_documents set status = $1, data = $2, updated_at = now()
           where key = $3`,
          [doc.status, JSON.stringify(doc.data), doc.key]
        )
      }
    }
    console.log(`✅ Seeded ${documents.length} content documents.`)

    console.log('🎉 Full database seeding completed successfully!')
  } finally {
    await db.close()
  }
}

main().catch((err) => {
  console.error('❌ Database seed failed:', err)
  process.exit(1)
})
