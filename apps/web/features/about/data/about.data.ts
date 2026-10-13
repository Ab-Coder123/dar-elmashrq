import type {
  Milestone,
  WhatWeDoItem,
  OrgDivision,
  AboutCredential,
} from '../types'

export const ABOUT_MEDIA = {
  // Iconic Saudi Architectural Landmark: Kingdom Centre Tower (Riyadh)
  heroImage: '/images/hero/saudi-kingdom-centre.jpg',
  introImage: '/images/projects/residential-tower/cover.jpg',
  historyImage: '/images/projects/educational-buildings-public-security-madinah/cover.jpg',
  ctaImage: '/images/projects/beverly-al-azeeza-new-facade/cover.jpg',
}

export const ABOUT_HISTORY: Milestone[] = [
  {
    year: '1994',
    title: 'FOUNDATION & ESTABLISHMENT',
    titleAr: 'التأسيس والانطلاقة الأولى',
    badge: 'ESTABLISHMENT // 1994',
    badgeAr: 'التأسيس // 1994',
    description:
      'Dar El Mashrq was officially established as an engineering contracting and real estate investment enterprise, executing high-standard residential and commercial works.',
    descriptionAr:
      'تأسست شركة دار المشرق ككيان متخصص في أعمال المقاولات الإنشائية والاستثمار العقاري ملتزمة بأعلى المعايير الهندسية والتنفيذية.',
    details: [
      'Inception of core civil and structural engineering operations',
      'Integration of multidisciplinary MEP and civil finishing capabilities',
    ],
    detailsAr: [
      'انطلاق العمليات الإنشائية والهندسية والمدنية الكبرى',
      'دمج القدرات الكهروميكانيكية المتكاملة وأعمال التشطيبات الفاخرة',
    ],
  },
  {
    year: '2000s',
    title: 'EXPANSION & MAJOR ASSETS',
    titleAr: 'التوسع وتنفيذ المشاريع الكبرى',
    badge: 'REGIONAL HORIZON',
    badgeAr: 'الآفاق الإقليمية',
    description:
      'Execution of landmark retail chains, residential tower clusters, central hospitals, and public facilities across multiple metropolitan markets.',
    descriptionAr:
      'تنفيذ سلاسل تجارية كبرى، ومجمعات أبراج سكنية، ومستشفيات مركزية ومرافق عامة في مختلف المدن والمناطق.',
    details: [
      'Delivery of major multi-tower housing complexes (Al-Shorouk 30 Towers, Qasr Al-Husseini)',
      'Expansion into commercial logistics chains (Awlad Ragab 21+ Branches)',
    ],
    detailsAr: [
      'تسليم مجمعات سكنية وأبراج متعددة (30 عمارة بالشروق، أبراج قصر الحسيني)',
      'التوسع في السلاسل اللوجستية والتجارية الكبرى (أكثر من 21 فرعاً)',
    ],
  },
  {
    year: '2010s',
    title: 'GULF ACCREDITATION & PRESENCE',
    titleAr: 'التوسع الخليجي والاعتمادات الرسمية',
    badge: 'GULF ENTRY & LICENSING',
    badgeAr: 'الانطلاق الخليجي والتراخيص',
    description:
      'Establishment of fully licensed operational hubs in the Kingdom of Saudi Arabia and the State of Qatar, obtaining Tier-1 and Class-1 general contracting certifications.',
    descriptionAr:
      'تأسيس المكاتب التشغيلية في المملكة العربية السعودية ودولة قطر والحصول على تصنيفات المقاولين المعتمدة وتراخيص الدرجة الأولى.',
    details: [
      'Establishment of Kingdom-wide operations and business hubs',
      'Delivery of specialized public security training cities and infrastructure facilities',
    ],
    detailsAr: [
      'تأسيس العمليات التشغيلية ومراكز الأعمال المعتمدة في المملكة',
      'تنفيذ مبانٍ ومنشآت متخصصة لمدن تدريب الأمن العام ومرافق البنية التحتية',
    ],
  },
  {
    year: 'TODAY',
    title: 'SOVEREIGN SCALE & 30-YEAR HERITAGE',
    titleAr: 'الريادة الإقليمية ومسيرة 30 عاماً',
    badge: '30+ YEARS OF EXCELLENCE',
    badgeAr: '30+ عاماً من التميز الهندسي',
    description:
      'Over three continuous decades of structural longevity, managing turnkey EPC contracts across Saudi Arabia, Egypt, and Qatar with ISO 9001:2015 and Civil Defense accreditations.',
    descriptionAr:
      'أكثر من ثلاثة عقود متواصلة من التنفيذ الهندسي وإدارة المشاريع المتكاملة عبر المملكة ومصر وقطر مع اعتمادات الجودة ISO 9001 والدفاع المدني.',
    details: [
      'Over 100+ turnkey assets successfully completed across municipal and private sectors',
      'Comprehensive BIM/CAD engineering, project management, and property development',
    ],
    detailsAr: [
      'إنجاز أكثر من 100 مشروع متكامل عبر القطاعات الحكومية والمؤسسية والخاصة',
      'هندسة متقدمة بنمذجة BIM/CAD وإدارة مشاريع واستثمار وتطوير عقاري شامل',
    ],
  },
]

export const WHAT_WE_DO: WhatWeDoItem[] = [
  {
    number: '01',
    title: 'DESIGN & ENGINEERING',
    titleAr: 'التصميم الهندسي والمعماري',
    subtitle: 'Architectural, Structural & Electro-Mechanical BIM Modeling',
    subtitleAr: 'النمذجة المعمارية والإنشائية والكهروميكانيكية بتقنيات BIM',
    description:
      'End-to-end design engineering combining advanced architectural aesthetics with structural optimization, electromechanical design, and clash-free BIM coordination.',
    descriptionAr:
      'تصميم هندسي متكامل يجمع بين الجمال المعماري الرفيع والكفاءة الإنشائية العالية، مع التنسيق الكهروميكانيكي الدقيق لتفادي التعارضات بتقنيات BIM الحديثة.',
    disciplines: [
      'Architectural Concept & Detailed Design',
      'Structural Calculation & Post-Tension Analysis',
      'MEP & HVAC System Schematics',
      '3D BIM Modeling & Constructability Audits',
    ],
    disciplinesAr: [
      'التصميم المعماري المفهومي والتفصيلي',
      'الحسابات الإنشائية والخرسانة سابقة الإجهاد',
      'مخططات الأنظمة الكهروميكانيكية والتكييف MEP/HVAC',
      'نمذجة ثلاثية الأبعاد BIM وتدقيق قابلية التنفيذ',
    ],
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '02',
    title: 'CONSTRUCTION & INFRASTRUCTURE',
    titleAr: 'البناء والتشييد والبنية التحتية',
    subtitle: 'Turnkey Civil Execution & High-Tolerance Superstructures',
    subtitleAr: 'التنفيذ المدني الشامل والهياكل الخرسانية الدقيقة',
    description:
      'Direct self-performance across heavy concrete foundations, multistory superstructures, industrial plants, pump stations, and luxury architectural facades.',
    descriptionAr:
      'تنفيذ ذاتي مباشر يشمل الأساسات العميقة، الهياكل الخرسانية متعددة الأدوار، المحطات الصناعية ومحطات الضخ، والواجهات المعمارية الفاخرة.',
    disciplines: [
      'Heavy Concrete & Subterranean Works',
      'Commercial Towers & Residential Complexes',
      'Municipal Pumping Stations & Networks',
      'Architectural Exterior Cladding & Facades',
    ],
    disciplinesAr: [
      'الأعمال الخرسانية الثقيلة وأعمال ما تحت الأرض',
      'الأبراج التجارية والمجمعات السكنية الكبرى',
      'محطات ضخ المياه البلدية وشبكات البنية التحتية',
      'الكسوة الخارجية والواجهات المعمارية المتطورة',
    ],
    image:
      'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '03',
    title: 'PROJECT MANAGEMENT',
    titleAr: 'إدارة المشاريع والبرامج',
    subtitle: 'EPC Lifecycle Governance & Primavera P6 Scheduling',
    subtitleAr: 'حوكمة دورة حياة المشاريع والجدولة الزمنية Primavera P6',
    description:
      'Professional project and program management aligning international standards with regional execution realities to guarantee budget fidelity and milestone completion.',
    descriptionAr:
      'إدارة احترافية للمشاريع والبرامج توائم بين المعايير الدولية والواقع التنفيذي الإقليمي لضمان الالتزام الصارم بالميزانيات ومواعيد التسليم.',
    disciplines: [
      'Primavera P6 Baseline Time Control',
      'Procurement & Supply Chain Management',
      'On-Site QA/QC & Material Testing',
      'Safety & Risk Mitigation Governance',
    ],
    disciplinesAr: [
      'التحكم بالجدول الزمني عبر Primavera P6',
      'إدارة المشتريات وسلاسل التوريد واللوجستيات',
      'ضبط ومراقبة الجودة وفحص المواد بالموقع QA/QC',
      'حوكمة السلامة والصحة المهنية وإدارة المخاطر',
    ],
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '04',
    title: 'PROPERTY DEVELOPMENT',
    titleAr: 'التطوير والاستثمار العقاري',
    subtitle: 'Commercial Asset Realization & Strategic Land Ventures',
    subtitleAr: 'تطوير الأصول التجارية والمشاريع الاستثمارية الكبرى',
    description:
      'Identification, financial modeling, structural development, and commissioning of high-value commercial, residential, and institutional real estate assets.',
    descriptionAr:
      'دراسة الجدوى والنمذجة المالية والتطوير الإنشائي والتشغيل للأصول العقارية الفاخرة، السكنية، التجارية، والمؤسسية ذات القيمة العالية.',
    disciplines: [
      'Site Selection & Feasibility Analysis',
      'Master-Planned Residential Communities',
      'Commercial Retail & Logistics Hubs',
      'Turnkey Handover & Facility Commissioning',
    ],
    disciplinesAr: [
      'اختيار المواقع ودراسات الجدوى الاقتصادية',
      'المجتمعات والمجمعات السكنية المتكاملة',
      'المراكز التجارية وسلاسل التجزئة والمستودعات',
      'التسليم المفتاحي وتشغيل المنشآت',
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
    leadAr: 'المدير التنفيذي للعمليات والمشروعات',
    badge: 'TECHNICAL DIV // 01',
    badgeAr: 'القطاع الفني // 01',
    departments: [
      {
        title: 'Project Management',
        titleAr: 'إدارة المشاريع والبرامج',
        code: 'DEPT-PM',
        roles: ['Project Directors', 'Project Managers', 'Planning Engineers'],
        rolesAr: ['مديرو المشاريع', 'مهندسو التخطيط والجدولة', 'منسقو التنفيذ'],
      },
      {
        title: 'Site Management & Civil Works',
        titleAr: 'إدارة المواقع والأعمال المدنية',
        code: 'DEPT-SM',
        roles: ['Site Engineers', 'General Foremen', 'Civil Surveyors'],
        rolesAr: ['مهندسو الموقع', 'مشرفو التنفيذ العام', 'مهندسو المساحة'],
      },
      {
        title: 'Engineering & Technical Office',
        titleAr: 'المكتب الفني والتصميم الهندسي',
        code: 'DEPT-ENG',
        roles: ['Architectural Designers', 'Structural Engineers', 'BIM Specialists', 'Shop Drawing Leads'],
        rolesAr: ['المصممون المعماريون', 'المهندسون الإنشائيون', 'أخصائيو BIM', 'مهندسو المخططات التنفيذية'],
      },
      {
        title: 'Quality Control & Safety (HSE)',
        titleAr: 'الجودة والسلامة المهنية والبيئة',
        code: 'DEPT-QA/HSE',
        roles: ['QA/QC Managers', 'HSE Inspectors', 'Materials Engineers'],
        rolesAr: ['مديرو الجودة QA/QC', 'مفتشو السلامة HSE', 'مهندسو ضبط جودة المواد'],
      },
      {
        title: 'Fleet & Heavy Equipment',
        titleAr: 'إدارة الحركة والمعدات الثقيلة',
        code: 'DEPT-FLT',
        roles: ['Fleet Supervisors', 'Heavy Equipment Operators', 'Maintenance Technicians'],
        rolesAr: ['مشرفو الحركة', 'مشغلو المعدات الثقيلة', 'فنيو الصيانة الميدانية'],
      },
    ],
  },
  {
    name: 'BUSINESS DEVELOPMENT & COMMERCIAL',
    nameAr: 'قطاع تطوير الأعمال والشؤون التجارية',
    lead: 'Commercial & Strategy Director',
    leadAr: 'المدير التجاري واستراتيجيات النمو',
    badge: 'COMMERCIAL DIV // 02',
    badgeAr: 'القطاع التجاري // 02',
    departments: [
      {
        title: 'Business Development & Estimating',
        titleAr: 'تطوير الأعمال والتسعير والعطاءات',
        code: 'DEPT-BD',
        roles: ['Business Development Managers', 'Tender Estimation Engineers', 'Market Analysts'],
        rolesAr: ['مديرو تطوير الأعمال', 'مهندسو تسعير المناقصات', 'محللو السوق والفرص'],
      },
      {
        title: 'Contracts & Legal Affairs',
        titleAr: 'العقود والشؤون القانونية',
        code: 'DEPT-CNT',
        roles: ['Contract Administrators', 'Legal Advisors', 'Claims Specialists'],
        rolesAr: ['مديرو العقود والاتفاقيات', 'المستشارون القانونيون', 'أخصائيو المطالبات'],
      },
      {
        title: 'Procurement & Supply Chain',
        titleAr: 'المشتريات وسلاسل الإمداد اللوجستية',
        code: 'DEPT-PRC',
        roles: ['Procurement Managers', 'Vendor Evaluators', 'Logistics Coordinators'],
        rolesAr: ['مديرو المشتريات', 'أخصائيو تأهيل الموردين', 'منسقو الإمداد والخدمات اللوجستية'],
      },
      {
        title: 'Public Relations & Marketing',
        titleAr: 'العلاقات العامة والاتصال المؤسسي',
        code: 'DEPT-PR',
        roles: ['Corporate Communications', 'Brand Managers', 'Client Relations'],
        rolesAr: ['مسؤولو الاتصال المؤسسي', 'مديرو الهوية والعلامة', 'أخصائيو علاقات العملاء'],
      },
    ],
  },
  {
    name: 'ADMINISTRATION & CORPORATE GOVERNANCE',
    nameAr: 'قطاع الشؤون الإدارية والمالية والحوكمة',
    lead: 'Chief Financial & Administrative Officer',
    leadAr: 'المدير المالي والإداري العام',
    badge: 'ADMIN DIV // 03',
    badgeAr: 'القطاع الإداري // 03',
    departments: [
      {
        title: 'Finance & Accounts',
        titleAr: 'الإدارة المالية والحسابات والميزانية',
        code: 'DEPT-FIN',
        roles: ['Chief Accountants', 'Financial Controllers', 'Treasury & Audit Leads'],
        rolesAr: ['كبار المحاسبين', 'المراقبون الماليون', 'مسؤولو الخزينة والتدقيق'],
      },
      {
        title: 'Human Resources & Talent',
        titleAr: 'الموارد البشرية واستقطاب الكفاءات',
        code: 'DEPT-HR',
        roles: ['HR Directors', 'Recruitment Officers', 'Personnel Administrators'],
        rolesAr: ['مديرو الموارد البشرية', 'مسؤولو الاستقطاب والتوظيف', 'أخصائيو شؤون الموظفين'],
      },
      {
        title: 'Corporate Administration',
        titleAr: 'الخدمات المساندة والإدارة العامة',
        code: 'DEPT-ADM',
        roles: ['Office Administrators', 'Document Controllers', 'IT Support Specialists'],
        rolesAr: ['مديرو المكاتب', 'أخصائيو مراقبة المستندات', 'مهندسو الدعم التقني IT'],
      },
      {
        title: 'External & Governmental Relations',
        titleAr: 'العلاقات الحكومية والامتثال النظامي',
        code: 'DEPT-EXT',
        roles: ['Government Liaison Officers', 'Compliance Officers', 'Licensing Coordinators'],
        rolesAr: ['مسؤولو التعقيب والجهات الحكومية', 'أخصائيو الامتثال والحوكمة', 'منسقو التراخيص والسجلات'],
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
    issuingBodyAr: 'وزارة التجارة — المملكة / مصر / قطر',
    classification: 'Commercial Activity & General Contracting',
    classificationAr: 'نشاط تجاري عام ومقاولات عامة معتمدة',
  },
  {
    id: 'chamber',
    name: 'Chamber of Commerce Membership',
    nameAr: 'عضوية الغرفة التجارية',
    issuingBody: 'Riyadh Chamber of Commerce & Industry',
    issuingBodyAr: 'الغرفة التجارية الصناعية بالرياض',
    classification: 'Class-1 General Contracting Syndicate',
    classificationAr: 'تصنيف الدرجة الأولى في نقابة المقاولين',
  },
  {
    id: 'civil-defense',
    name: 'Civil Defense License',
    nameAr: 'ترخيص الدفاع المدني',
    issuingBody: 'General Directorate of Civil Defense',
    issuingBodyAr: 'المديرية العامة للدفاع المدني',
    classification: 'Fire Life Safety & Fire Suppression Class A',
    classificationAr: 'أنظمة السلامة ومكافحة الحريق — فئة (أ)',
  },
  {
    id: 'iso-9001',
    name: 'ISO 9001 : 2015 Quality Management',
    nameAr: 'شهادة الجودة العالمية آيزو 9001:2015',
    issuingBody: 'International Standards Accreditation',
    issuingBodyAr: 'هيئة الاعتماد الدولي لمعايير الجودة',
    classification: 'Civil & Electro-Mechanical Engineering Standard',
    classificationAr: 'معيار الهندسة المدنية والكهروميكانيكية',
  },
  {
    id: 'monshaat',
    name: 'Monshaat SME & Enterprise Certification',
    nameAr: 'شهادة منشآت الرسمية',
    issuingBody: 'Small and Medium Enterprises Authority',
    issuingBodyAr: 'الهيئة العامة للمنشآت (منشآت)',
    classification: 'Verified Corporate Enterprise',
    classificationAr: 'منشأة معتمدة وموثقة رسمياً',
  },
  {
    id: 'gosi',
    name: 'GOSI Social Insurance Compliance',
    nameAr: 'شهادة التأمينات الاجتماعية',
    issuingBody: 'General Organization for Social Insurance',
    issuingBodyAr: 'المؤسسة العامة للتأمينات الاجتماعية',
    classification: 'Active Workforce Compliance',
    classificationAr: 'امتثال نظامي تام لكوادر العمل',
  },
  {
    id: 'investment',
    name: 'Service Investment License',
    nameAr: 'ترخيص الاستثمار الخدمي',
    issuingBody: 'Ministry of Investment (MISA)',
    issuingBodyAr: 'وزارة الاستثمار (MISA)',
    classification: 'Foreign & Regional Investment Operations',
    classificationAr: 'عمليات الاستثمار الخدمي والإقليمي',
  },
  {
    id: 'vat',
    name: 'VAT & Tax Compliance Registration',
    nameAr: 'شهادة ضريبة القيمة المضافة',
    issuingBody: 'Zakat, Tax and Customs Authority (ZATCA)',
    issuingBodyAr: 'هيئة الزكاة والضريبة والجمارك (ZATCA)',
    classification: 'Verified Taxpayer Registration',
    classificationAr: 'شهادة تسجيل المكلف الضريبي المعتمدة',
  },
]
