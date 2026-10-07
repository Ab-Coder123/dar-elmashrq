import type {
  Milestone,
  WhatWeDoItem,
  OrgDivision,
  AboutCredential,
} from '../types'

export const ABOUT_MEDIA = {
  heroImage:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=90',
  introImage:
    'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1600&q=85',
  historyImage:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  ctaImage:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
}

export const ABOUT_HISTORY: Milestone[] = [
  {
    year: '1994',
    title: 'FOUNDATION & ESTABLISHMENT',
    titleAr: 'التأسيس والانطلاقة الأولى',
    badge: 'ESTABLISHMENT // 1994',
    description:
      'Dar El Mashrq was officially established as an engineering contracting and real estate investment enterprise, executing high-standard residential and commercial works.',
    descriptionAr:
      'تأسست شركة دار المشرق ككيان متخصص في أعمال المقاولات الإنشائية والاستثمار العقاري ملتزمة بأعلى المعايير الهندسية.',
    details: [
      'Inception of core civil and structural engineering operations',
      'Integration of multidisciplinary MEP and civil finishing capabilities',
    ],
  },
  {
    year: '2000s',
    title: 'EXPANSION & MAJOR ASSETS',
    titleAr: 'التوسع وتنفيذ المشاريع الكبرى',
    badge: 'REGIONAL HORIZON',
    description:
      'Execution of landmark retail chains, residential tower clusters, central hospitals, and public facilities across multiple metropolitan markets.',
    descriptionAr:
      'تنفيذ سلاسل تجارية كبرى، ومجمعات أبراج سكنية، ومستشفيات مركزية ومرافق عامة.',
    details: [
      'Delivery of major multi-tower housing complexes (Al-Shorouk 30 Towers, Qasr Al-Husseini)',
      'Expansion into commercial logistics chains (Awlad Ragab 21+ Branches)',
    ],
  },
  {
    year: '2010s',
    title: 'GULF ACCREDITATION & PRESENCE',
    titleAr: 'التوسع الخليجي والاعتمادات الرسمية',
    badge: 'GULF ENTRY & LICENSING',
    description:
      'Establishment of fully licensed operational hubs in the Kingdom of Saudi Arabia and the State of Qatar, obtaining Tier-1 and Class-1 general contracting certifications.',
    descriptionAr:
      'تأسيس المكاتب التشغيلية في المملكة العربية السعودية ودولة قطر والحصول على تصنيفات المقاولين المعتمدة.',
    details: [
      'Establishment of Riyadh Corporate Headquarters in Olaya District',
      'Delivery of specialized public security training cities and infrastructure facilities',
    ],
  },
  {
    year: 'TODAY',
    title: 'SOVEREIGN SCALE & 30-YEAR HERITAGE',
    titleAr: 'الريادة الإقليمية ومسيرة 30 عاماً',
    badge: '30+ YEARS OF EXCELLENCE',
    description:
      'Over three continuous decades of structural longevity, managing turnkey EPC contracts across Saudi Arabia, Egypt, and Qatar with ISO 9001:2015 and Civil Defense accreditations.',
    descriptionAr:
      'أكثر من ثلاثة عقود متواصلة من التنفيذ الهندسي وإدارة المشاريع المتكاملة عبر المملكة ومصر وقطر.',
    details: [
      'Over 100+ turnkey assets successfully completed across municipal and private sectors',
      'Comprehensive BIM/CAD engineering, project management, and property development',
    ],
  },
]

export const WHAT_WE_DO: WhatWeDoItem[] = [
  {
    number: '01',
    title: 'DESIGN & ENGINEERING',
    titleAr: 'التصميم الهندسي والمعماري',
    subtitle: 'Architectural, Structural & Electro-Mechanical BIM Modeling',
    description:
      'End-to-end design engineering combining advanced architectural aesthetics with structural optimization, electromechanical design, and clash-free BIM coordination.',
    disciplines: [
      'Architectural Concept & Detailed Design',
      'Structural Calculation & Post-Tension Analysis',
      'MEP & HVAC System Schematics',
      '3D BIM Modeling & Constructability Audits',
    ],
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '02',
    title: 'CONSTRUCTION & INFRASTRUCTURE',
    titleAr: 'البناء والتشييد والبنية التحتية',
    subtitle: 'Turnkey Civil Execution & High-Tolerance Superstructures',
    description:
      'Direct self-performance across heavy concrete foundations, multistory superstructures, industrial plants, pump stations, and luxury architectural facades.',
    disciplines: [
      'Heavy Concrete & Subterranean Works',
      'Commercial Towers & Residential Complexes',
      'Municipal Pumping Stations & Networks',
      'Architectural Exterior Cladding & Facades',
    ],
    image:
      'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '03',
    title: 'PROJECT MANAGEMENT',
    titleAr: 'إدارة المشاريع والبرامج',
    subtitle: 'EPC Lifecycle Governance & Primavera P6 Scheduling',
    description:
      'Professional project and program management aligning international standards with regional execution realities to guarantee budget fidelity and milestone completion.',
    disciplines: [
      'Primavera P6 Baseline Time Control',
      'Procurement & Supply Chain Management',
      'On-Site QA/QC & Material Testing',
      'Safety & Risk Mitigation Governance',
    ],
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '04',
    title: 'PROPERTY DEVELOPMENT',
    titleAr: 'التطوير والاستثمار العقاري',
    subtitle: 'Commercial Asset Realization & Strategic Land Ventures',
    description:
      'Identification, financial modeling, structural development, and commissioning of high-value commercial, residential, and institutional real estate assets.',
    disciplines: [
      'Site Selection & Feasibility Analysis',
      'Master-Planned Residential Communities',
      'Commercial Retail & Logistics Hubs',
      'Turnkey Handover & Facility Commissioning',
    ],
    image:
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
  },
]

export const ORGANIZATIONAL_DIVISIONS: OrgDivision[] = [
  {
    name: 'PROJECTS & TECHNICAL OPERATIONS',
    nameAr: 'قطاع المشروعات والعمليات الفنية',
    lead: 'Executive Operations Director',
    badge: 'TECHNICAL DIV // 01',
    departments: [
      {
        title: 'Project Management',
        titleAr: 'إدارة المشاريع',
        code: 'DEPT-PM',
        roles: ['Project Directors', 'Project Managers', 'Planning Engineers'],
      },
      {
        title: 'Site Management & Civil Works',
        titleAr: 'إدارة المواقع والأعمال المدنية',
        code: 'DEPT-SM',
        roles: ['Site Engineers', 'General Foremen', 'Civil Surveyors'],
      },
      {
        title: 'Engineering & Technical Office',
        titleAr: 'المكتب الفني والتصميم',
        code: 'DEPT-ENG',
        roles: ['Architectural Designers', 'Structural Engineers', 'BIM Specialists', 'Shop Drawing Leads'],
      },
      {
        title: 'Quality Control & Safety (HSE)',
        titleAr: 'الجودة والسلامة المهنية',
        code: 'DEPT-QA/HSE',
        roles: ['QA/QC Managers', 'HSE Inspectors', 'Materials Engineers'],
      },
      {
        title: 'Fleet & Heavy Equipment',
        titleAr: 'إدارة الحركة والمعدات',
        code: 'DEPT-FLT',
        roles: ['Fleet Supervisors', 'Heavy Equipment Operators', 'Maintenance Technicians'],
      },
    ],
  },
  {
    name: 'BUSINESS DEVELOPMENT & COMMERCIAL',
    nameAr: 'قطاع تطوير الأعمال والشؤون التجارية',
    lead: 'Commercial & Strategy Director',
    badge: 'COMMERCIAL DIV // 02',
    departments: [
      {
        title: 'Business Development & Estimating',
        titleAr: 'تطوير الأعمال والتسعير',
        code: 'DEPT-BD',
        roles: ['Business Development Managers', 'Tender Estimation Engineers', 'Market Analysts'],
      },
      {
        title: 'Contracts & Legal Affairs',
        titleAr: 'العقود والشؤون القانونية',
        code: 'DEPT-CNT',
        roles: ['Contract Administrators', 'Legal Advisors', 'Claims Specialists'],
      },
      {
        title: 'Procurement & Supply Chain',
        titleAr: 'المشتريات وسلاسل الإمداد',
        code: 'DEPT-PRC',
        roles: ['Procurement Managers', 'Vendor Evaluators', 'Logistics Coordinators'],
      },
      {
        title: 'Public Relations & Marketing',
        titleAr: 'العلاقات العامة والتسويق',
        code: 'DEPT-PR',
        roles: ['Corporate Communications', 'Brand Managers', 'Client Relations'],
      },
    ],
  },
  {
    name: 'ADMINISTRATION & CORPORATE GOVERNANCE',
    nameAr: 'قطاع الشؤون الإدارية والمالية',
    lead: 'Chief Financial & Administrative Officer',
    badge: 'ADMIN DIV // 03',
    departments: [
      {
        title: 'Finance & Accounts',
        titleAr: 'الإدارة المالية والحسابات',
        code: 'DEPT-FIN',
        roles: ['Chief Accountants', 'Financial Controllers', 'Treasury & Audit Leads'],
      },
      {
        title: 'Human Resources & Talent',
        titleAr: 'الموارد البشرية والكفاءات',
        code: 'DEPT-HR',
        roles: ['HR Directors', 'Recruitment Officers', 'Personnel Administrators'],
      },
      {
        title: 'Corporate Administration',
        titleAr: 'الشؤون الإدارية العامة',
        code: 'DEPT-ADM',
        roles: ['Office Administrators', 'Document Controllers', 'IT Support Specialists'],
      },
      {
        title: 'External & Governmental Relations',
        titleAr: 'العلاقات الحكومية والخارجية',
        code: 'DEPT-EXT',
        roles: ['Government Liaison Officers', 'Compliance Officers', 'Licensing Coordinators'],
      },
    ],
  },
]

export const ABOUT_CREDENTIALS: AboutCredential[] = [
  {
    id: 'cr',
    name: 'Commercial Registration',
    nameAr: 'السجل التجاري المعتمد',
    issuingBody: 'Ministry of Commerce — KSA / Egypt / Qatar',
    classification: 'Commercial Activity & General Contracting',
  },
  {
    id: 'chamber',
    name: 'Chamber of Commerce Membership',
    nameAr: 'عضوية الغرفة التجارية',
    issuingBody: 'Riyadh Chamber of Commerce & Industry',
    classification: 'Class-1 General Contracting Syndicate',
  },
  {
    id: 'civil-defense',
    name: 'Civil Defense License',
    nameAr: 'ترخيص الدفاع المدني',
    issuingBody: 'General Directorate of Civil Defense',
    classification: 'Fire Life Safety & Fire Suppression Class A',
  },
  {
    id: 'iso-9001',
    name: 'ISO 9001 : 2015 Quality Management',
    nameAr: 'شهادة الجودة العالمية آيزو 9001',
    issuingBody: 'International Standards Accreditation',
    classification: 'Civil & Electro-Mechanical Engineering Standard',
  },
  {
    id: 'monshaat',
    name: 'Monshaat SME & Enterprise Certification',
    nameAr: 'شهادة منشآت الرسمية',
    issuingBody: 'Small and Medium Enterprises Authority',
    classification: 'Verified Corporate Enterprise',
  },
  {
    id: 'gosi',
    name: 'GOSI Social Insurance Compliance',
    nameAr: 'شهادة التأمينات الاجتماعية',
    issuingBody: 'General Organization for Social Insurance',
    classification: 'Active Workforce Compliance',
  },
  {
    id: 'investment',
    name: 'Service Investment License',
    nameAr: 'ترخيص الاستثمار الخدمي',
    issuingBody: 'Ministry of Investment (MISA)',
    classification: 'Foreign & Regional Investment Operations',
  },
  {
    id: 'vat',
    name: 'VAT & Tax Compliance Registration',
    nameAr: 'شهادة ضريبة القيمة المضافة',
    issuingBody: 'Zakat, Tax and Customs Authority (ZATCA)',
    classification: 'Verified Taxpayer Registration',
  },
]
