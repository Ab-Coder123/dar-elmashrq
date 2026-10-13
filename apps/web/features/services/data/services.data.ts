import type { TechnicalService, IntegratedDiscipline, ServiceProjectRelation } from '../types'

/**
 * High-fidelity architectural & construction photography for services
 */
export const SERVICES_MEDIA = {
  heroImage:
    'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=2000&q=85',
  introImage:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
  civilImage:
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85',
  electricalImage:
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=85',
  hvacImage:
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1600&q=85',
  fireFightingImage:
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85',
  sanitaryImage:
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
  qualityImage:
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
  ctaImage:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
}

/**
 * 5 Core Technical Services (Official PDF Pages 4 & 7)
 */
export const TECHNICAL_SERVICES: TechnicalService[] = [
  {
    id: 'civil-works-finishing',
    slug: 'civil-works-finishing',
    number: '01',
    title: 'Civil Works & Finishing',
    titleAr: 'الأعمال المدنية والتشطيبات الفاخرة',
    shortTitle: 'Civil & Finishing',
    shortTitleAr: 'الأعمال المدنية والتشطيبات',
    category: 'Heavy Infrastructure & Architecture',
    categoryAr: 'البنية التحتية والهندسة المعمارية',
    specCode: 'SPEC // 01-CIV',
    specCodeAr: 'المواصفة // 01-مدني',
    description:
      'Complete civil construction and high-quality finishing works adhering to the highest international engineering codes and structural tolerances. From deep foundation engineering and reinforced concrete superstructures to premium exterior architectural cladding and interior execution.',
    descriptionAr:
      'تنفيذ أعمال البناء والإنشاءات المدنية المتكاملة والتشطيبات المعمارية الراقية وفق أعلى الأكواد الهندسية العالمية والتفاوتات الإنشائية الدقيقة، بدءاً من الأساسات العميقة والهياكل الخرسانية المسلحة حتى الكسوة الخارجية الفاخرة والديكورات الداخلية.',
    scopeItems: [
      'Subterranean deep foundation & reinforced concrete structural framing',
      'Structural steel erection, precast assembly & heavy civil earthworks',
      'Architectural facade engineering, curtain walling & composite panel cladding',
      'High-tolerance interior turnkey fit-outs, marble masonry & acoustic ceilings',
    ],
    scopeItemsAr: [
      'الأساسات العميقة تحت الأرض وتأطير الهياكل الخرسانية المسلحة',
      'تركيب الهياكل الفولاذية والخرسانة مسبقة الصب وأعمال الحفر والردم الثقيلة',
      'هندسة الواجهات المعمارية والواجهات الزجاجية المستمرة وكسوة الكلادينج',
      'تشطيبات داخلية متكاملة عالية الدقة، وأعمال الرخام والأسقف الصوتية',
    ],
    standards: [
      'International Building Code (IBC)',
      'Saudi Building Code (SBC 304/305)',
      'Egyptian Concrete Code (ECP 203)',
    ],
    standardsAr: [
      'كود البناء العالمي (IBC)',
      'كود البناء السعودي (SBC 304/305)',
      'الكود المصري لتصميم وتنفيذ المنشآت الخرسانية (ECP 203)',
    ],
    image: SERVICES_MEDIA.civilImage,
    iconName: 'Building2',
  },
  {
    id: 'electrical-works',
    slug: 'electrical-works',
    number: '02',
    title: 'Electrical Works',
    titleAr: 'الأعمال والتمديدات الكهربائية',
    shortTitle: 'Electrical Systems',
    shortTitleAr: 'الأنظمة الكهربائية',
    category: 'Electro-Mechanical Engineering',
    categoryAr: 'الهندسة الكهروميكانيكية',
    specCode: 'SPEC // 02-ELE',
    specCodeAr: 'المواصفة // 02-كهرباء',
    description:
      'Full-spectrum electrical engineering installations, distribution power grids, and low-current automation infrastructure for commercial, institutional, and high-density residential developments.',
    descriptionAr:
      'تنفيذ التركيبات والشبكات الكهربائية المتكاملة، وشبكات توزيع الطاقة، والبنية التحتية لأنظمة التيار الخفيف والأتمتة الذكية للمشاريع التجارية والمؤسسية والمجمعات السكنية الكبرى.',
    scopeItems: [
      'Medium & low-voltage (MV/LV) substation design, switchgear & transformers',
      'Emergency diesel power generation, synchronizing panels & centralized UPS',
      'Intelligent Building Management Systems (BMS) & lighting automation',
      'Structured low-current networks, CCTV surveillance & access control',
    ],
    scopeItemsAr: [
      'محطات التحويل للجهد المتوسط والمنخفض ولوحات التوزيع والمحولات',
      'توليد الطاقة الاحتياطية بالديزل ولوحات التزامن ومنظومات الـ UPS المركزية',
      'أنظمة إدارة المباني الذكية (BMS) والتحكم الآلي في الإضاءة',
      'شبكات التيار الخفيف المتكاملة والمراقبة التلفزيونية والتحكم في الدخول',
    ],
    standards: [
      'IEC International Standards',
      'NFPA 70 (National Electrical Code)',
      'SEC (Saudi Electricity Company) Specifications',
    ],
    standardsAr: [
      'المعايير الدولية للكهرباء (IEC)',
      'الكود الوطني للكهرباء (NFPA 70)',
      'مواصفات الشركة السعودية للكهرباء (SEC)',
    ],
    image: SERVICES_MEDIA.electricalImage,
    iconName: 'Zap',
  },
  {
    id: 'air-conditioning',
    slug: 'air-conditioning',
    number: '03',
    title: 'Air Conditioning Works',
    titleAr: 'أعمال تكييف الهواء والتهوية HVAC',
    shortTitle: 'HVAC & Climate Systems',
    shortTitleAr: 'أنظمة التكييف والتحكم الحراري',
    category: 'Environmental & Thermal Engineering',
    categoryAr: 'الهندسة الحرارية والبيئية',
    specCode: 'SPEC // 03-HVAC',
    specCodeAr: 'المواصفة // 03-تكييف',
    description:
      'Comprehensive HVAC systems design, supply, fabrication, and commissioning engineered for severe regional climatic conditions with optimal energy conservation and indoor air quality standards.',
    descriptionAr:
      'تصميم وتوريد وتركيب وتشغيل أنظمة التكييف والتهوية المتطورة المصممة لتحمل الظروف المناخية القاسية في المنطقة، مع تحقيق أعلى كفاءة في استهلاك الطاقة وجودة الهواء الداخلي.',
    scopeItems: [
      'Centralized chilled water plants, cooling towers & high-efficiency air chillers',
      'Variable Refrigerant Flow (VRF/VRV) & multi-split climate systems',
      'Automated smoke control, positive pressurization & industrial ventilation',
      'Acoustically lined galvanized ductwork fabrication & precision air balancing',
    ],
    scopeItemsAr: [
      'محطات المياه المثلجة المركزية وأبراج التبريد ومبردات الهواء عالية الكفاءة',
      'أنظمة تدفق وسيط التبريد المتغير (VRF/VRV) وأنظمة التبريد متعددة الوحدات',
      'أنظمة التحكم الآلي في الدخان والضغط الإيجابي والتهوية الصناعية',
      'تصنيع مجاري الهواء المعزولة صوتياً ومعايرة وموازنة الهواء الدقيقة',
    ],
    standards: [
      'ASHRAE Thermal & Ventilation Standards',
      'SMACNA Duct Construction Standards',
      'AHRI Certified Thermal Performance',
    ],
    standardsAr: [
      'معايير الجمعية الأمريكية لمهندسي التبريد والتدفئة (ASHRAE)',
      'معايير تصنيع مجاري الهواء (SMACNA)',
      'شهادات كفاءة الأداء الحراري (AHRI)',
    ],
    image: SERVICES_MEDIA.hvacImage,
    iconName: 'Wind',
  },
  {
    id: 'fire-fighting',
    slug: 'fire-fighting',
    number: '04',
    title: 'Fire Fighting Works',
    titleAr: 'أعمال أنظمة مكافحة وإطفاء الحريق',
    shortTitle: 'Life-Safety & Fire Protection',
    shortTitleAr: 'السلامة والوقاية من الحريق',
    category: 'Life Safety Infrastructure',
    categoryAr: 'بنية السلامة وحماية الأرواح',
    specCode: 'SPEC // 04-FIR',
    specCodeAr: 'المواصفة // 04-إطفاء',
    description:
      'Rigorous fire life-safety engineering and suppression network design certified under national Civil Defense authorities to guarantee rapid hazard mitigation and occupant protection.',
    descriptionAr:
      'هندسة متطورة لشبكات مكافحة الحريق والسلامة المعتمدة لدى إدارات الدفاع المدني، لضمان السيطرة السريعة على المخاطر وحماية الأرواح والمنشآت وفق أعلى درجات الأمان.',
    scopeItems: [
      'Automatic wet and dry sprinkler networks with hydraulic calculation modeling',
      'High-pressure UL/FM certified fire pumping stations & water storage integration',
      'Gaseous clean agent suppression systems (FM200, Novec 1230) for mission-critical hubs',
      'Fire hydrant networks, hose reel cabinets & early-warning detection integration',
    ],
    scopeItemsAr: [
      'شبكات الرش الآلي الرطبة والجافة مع النمذجة الهيدروليكية المعتمدة',
      'محطات مضخات الحريق المعتمدة عالمياً (UL/FM) مع خزانات المياه المتخصصة',
      'منظومات الإخماد بالغازات النظيفة (FM200, Novec 1230) لغرف الخوادم والتحكم',
      'شبكات فوهات وصناديق الحريق الميدانية وتكامل أنظمة الإنذار المبكر',
    ],
    standards: [
      'NFPA 13, 14, 20 & 2001 Codes',
      'Saudi Civil Defense Pre-qualification Grade A',
      'Civil Defence Authority of Qatar & Egypt',
    ],
    standardsAr: [
      'أكواد الجمعية الوطنية الأمريكية للوقاية من الحرائق (NFPA 13, 14, 20, 2001)',
      'تأهيل الدفاع المدني السعودي من الفئة (أ)',
      'اشتراطات وتراخيص الدفاع المدني في قطر ومصر',
    ],
    image: SERVICES_MEDIA.fireFightingImage,
    iconName: 'Flame',
  },
  {
    id: 'sanitary-works',
    slug: 'sanitary-works',
    number: '05',
    title: 'Sanitary Works',
    titleAr: 'الأعمال والتمديدات الصحية',
    shortTitle: 'Plumbing & Hydraulic Infrastructure',
    shortTitleAr: 'الشبكات الصحية والهيدروليكية',
    category: 'Hydraulic & Public Health Systems',
    categoryAr: 'الأنظمة الهيدروليكية والصحة العامة',
    specCode: 'SPEC // 05-SAN',
    specCodeAr: 'المواصفة // 05-صحي',
    description:
      'Comprehensive sanitary piping networks, potable water treatment, drainage systems, and environmental waste management installations engineered for long-term operational resilience.',
    descriptionAr:
      'شبكات تمديدات صحية متكاملة تشمل تغذية ومعالجة مياه الشرب، وشبكات الصرف وتصريف مياه الأمطار وإدارة المخلفات البيئية لضمان استدامة التشغيل على المدى الطويل.',
    scopeItems: [
      'Pressurized potable water supply, booster filtration & thermal insulation',
      'Gravity and vacuum soil, waste, and storm water drainage networks',
      'Commercial sewage lift stations, grease interceptors & gray water recycling',
      'High-grade commercial fixture installation & acoustic pipe isolation',
    ],
    scopeItemsAr: [
      'شبكات تغذية مياه الشرب المضغوطة ووحدات التنقية والفلترة والعزل الحراري',
      'شبكات تصريف مياه الصرف والأمطار بالانحدار والأنظمة الفراغية المتطورة',
      'محطات رفع الصرف الصحي ومصائد الشحوم وأنظمة معالجة المياه الرمادية',
      'تركيب الأدوات الصحية التجارية الفاخرة والعزل الصوتي لمواسير الصرف',
    ],
    standards: [
      'IPC (International Plumbing Code)',
      'Uniform Plumbing Code (UPC)',
      'Municipal Environmental & Drainage Regulations',
    ],
    standardsAr: [
      'الكود العالمي للسباكة (IPC)',
      'الكود الموحد للسباكة (UPC)',
      'لوائح واشتراطات الصرف الصحي والبلدية',
    ],
    image: SERVICES_MEDIA.sanitaryImage,
    iconName: 'Droplets',
  },
]

export const INTEGRATED_DISCIPLINES: IntegratedDiscipline[] = [
  {
    step: '01',
    title: 'Design',
    titleAr: 'التصميم الهندسي والمعماري',
    subtitle: 'Architectural & Engineering Concepts',
    subtitleAr: 'المفاهيم المعمارية والهندسية المتكاملة',
    description:
      'Translating project vision into precision architectural, structural, and electro-mechanical models with full BIM coordination, clash mitigation, and compliance before ground breaking.',
    descriptionAr:
      'تحويل رؤية المشروع إلى نماذج معمارية وإنشائية وكهروميكانيكية دقيقة مع التنسيق التام بنمذجة BIM وتفادي التعارضات قبل بدء العمل الميداني.',
    deliverables: ['Architectural Schematics', 'Structural Calculations', 'MEP BIM Coordination', 'Statutory Permit Packages'],
    deliverablesAr: ['المخططات المعمارية التنفيذية', 'الحسابات والتصاميم الإنشائية', 'تنسيق الأنظمة الكهروميكانيكية BIM', 'حزم التراخيص والموافقات النظامية'],
    roleInLifecycle: 'Phase 1: Conceptualization & Engineering Rigor',
    roleInLifecycleAr: 'المرحلة 1: بلورة المفاهيم والدقة الهندسية',
  },
  {
    step: '02',
    title: 'Construction',
    titleAr: 'البناء والتشييد والتنفيذ',
    subtitle: 'Turnkey Physical Execution',
    subtitleAr: 'التنفيذ الميداني الشامل بنظام تسليم المفتاح',
    description:
      'Mobilizing specialized heavy machinery, certified engineering squads, and trusted supply chain networks to execute civil foundations, structural frames, and bespoke luxury finishes.',
    descriptionAr:
      'حشد المعدات الثقيلة والكوادر الهندسية المعتمدة وسلاسل الإمداد الموثوقة لتنفيذ الأساسات والهياكل الخرسانية وأعمال التشطيبات الفاخرة بدقة متناهية.',
    deliverables: ['Subterranean Earthworks', 'Concrete Superstructures', 'Specialized MEP Fit-Out', 'Turnkey Facility Handover'],
    deliverablesAr: ['الأعمال الترابية والأساسات العميقة', 'الهياكل الخرسانية الفوقية', 'التجهيزات الكهروميكانيكية التخصصية', 'تسليم المنشآت بنظام المفتاح'],
    roleInLifecycle: 'Phase 2: Heavy Civil & Multi-Disciplinary Delivery',
    roleInLifecycleAr: 'المرحلة 2: التنفيذ المدني والإنشائي المتعدد التخصصات',
  },
  {
    step: '03',
    title: 'Project Management',
    titleAr: 'إدارة المشاريع والبرامج',
    subtitle: 'Integrated Program & EPC Control',
    subtitleAr: 'الحوكمة المتكاملة والتحكم في عقود EPC',
    description:
      'Deploying international program management techniques merging CPM scheduling, cost baseline governance, risk mitigation, and stringent site safety oversight.',
    descriptionAr:
      'تطبيق أحدث منهجيات إدارة البرامج والمشاريع عبر جدولة المسار الحرج (CPM)، والتحكم بالميزانيات، وإدارة المخاطر، والإشراف الصارم على السلامة بالموقع.',
    deliverables: ['Primavera P6 Master Schedules', 'Earned Value Cost Management', 'QA/QC Compliance Auditing', 'Life Safety Field Supervision'],
    deliverablesAr: ['جداول زمنية رئيسية Primavera P6', 'إدارة التكاليف والقيمة المكتسبة (EVM)', 'تدقيق وضبط الجودة الشامل QA/QC', 'الإشراف الميداني على السلامة والصحة'],
    roleInLifecycle: 'Phase 3: Schedule, Budget & Quality Assurance',
    roleInLifecycleAr: 'المرحلة 3: ضمان الجداول الزمنية والميزانيات والجودة',
  },
  {
    step: '04',
    title: 'Property Development',
    titleAr: 'التطوير والاستثمار العقاري',
    subtitle: 'Strategic Real Estate Investment',
    subtitleAr: 'الاستثمار العقاري الاستراتيجي',
    description:
      'Originating and asset-managing master-planned residential communities, corporate towers, and commercial retail hubs across high-yield growth corridors in KSA, Egypt, and Qatar.',
    descriptionAr:
      'تطوير وإدارة الأصول العقارية الكبرى من مجمعات سكنية وأبراج أعمال ومراكز تجارية عبر أهم مسارات النمو في السعودية ومصر وقطر.',
    deliverables: ['Land Acquisition Feasibility', 'Asset Lifecycle Valuation', 'Tenant Fit-Out Coordination', 'Sovereign Real Estate Portfolios'],
    deliverablesAr: ['دراسات جدوى الاستحواذ على الأراضي', 'تقييم دورة حياة الأصول', 'تنسيق تشطيبات وتجهيز المستأجرين', 'محافظ عقارية واستثمارية رائدة'],
    roleInLifecycle: 'Phase 4: Asset Creation & Commercial Longevity',
    roleInLifecycleAr: 'المرحلة 4: خلق الأصول والاستدامة التجارية',
  },
]

export const SERVICE_PROJECT_SHOWCASES: ServiceProjectRelation[] = [
  {
    serviceId: 'civil-works-finishing',
    projectSlug: 'beverly-al-azeeza-new-facade',
    projectName: 'Beverly Al-Azeeza New Facade',
    projectNameAr: 'بيفرلي الواجهة الجديدة للعزيزة',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    location: 'Al-Azeeza, KSA',
    locationAr: 'العزيزية، المملكة العربية السعودية',
    category: 'Commercial',
    categoryAr: 'تجاري',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85',
  },
  {
    serviceId: 'electrical-works',
    projectSlug: 'way-care-medical-hospital',
    projectName: 'Way Care Medical Hospital',
    projectNameAr: 'مستشفى وي كير الطبي',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    location: 'Saudi Arabia',
    locationAr: 'المملكة العربية السعودية',
    category: 'Healthcare',
    categoryAr: 'رعاية صحية',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    serviceId: 'civil-works-finishing',
    projectSlug: 'qasr-al-husseini-residential-towers',
    projectName: 'Qasr Al-Husseini Towers (12 Towers)',
    projectNameAr: 'أبراج قصر الحسيني (12 برجاً سكنياً)',
    country: 'Egypt',
    countryAr: 'مصر',
    location: 'Egypt',
    locationAr: 'جمهورية مصر العربية',
    category: 'Residential',
    categoryAr: 'سكني',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
  },
  {
    serviceId: 'sanitary-works',
    projectSlug: 'western-water-pump-station-ras-tanura',
    projectName: 'Western Water Pump Station — Ras Tanura',
    projectNameAr: 'محطة ضخ المياه الغربية — رأس تنورة',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    location: 'Ras Tanura, KSA',
    locationAr: 'رأس تنورة، المملكة العربية السعودية',
    category: 'Infrastructure',
    categoryAr: 'بنية تحتية',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85',
  },
]
