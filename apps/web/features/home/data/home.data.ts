import type {
  HomeStat,
  HomeServiceSummary,
  RegionalHub,
  HomeCredential,
} from '../types'

export const HOME_MEDIA = {
  // Ultra high-res hero image (Riyadh modern financial towers / structural mega site at twilight)
  heroImage:
    'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=2400&q=90',
  // High-res structural concrete & modern commercial architectural engineering
  introImage:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  // Skyscraper facade in blue hour
  visionBgImage:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
  // Turnkey commercial resort / civil pavilion
  finalCtaImage:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
}

export const HOME_STATS: HomeStat[] = [
  {
    label: 'Foundation Year',
    labelAr: 'سنة التأسيس',
    value: '1994',
    description: 'Over 30 years of uninterrupted civil contracting and engineering precision.',
  },
  {
    label: 'Sovereign Presence',
    labelAr: 'الوجود الإقليمي',
    value: '3',
    description: 'Fully licensed and operational bureaus across Saudi Arabia, Egypt, and Qatar.',
  },
  {
    label: 'Longevity',
    labelAr: 'الخبرة الممتدة',
    value: '30+',
    description: 'Decades executing critical commercial, institutional, and infrastructure assets.',
  },
  {
    label: 'Execution Track',
    labelAr: 'سجل الإنجاز',
    value: '100+',
    description: 'High-profile turnkey projects delivered across municipal, state, and private sectors.',
  },
]

export const HOME_SERVICES: HomeServiceSummary[] = [
  {
    id: 'civil-works-finishing',
    number: '01',
    specCode: 'SPEC: CW-94',
    title: 'Civil Works & Finishing',
    titleAr: 'أعمال مدنية والتشطيبات',
    description:
      'Turnkey superstructure concrete, post-tension slabs, architectural facades, and luxury commercial interior fit-outs executed to exact tolerances.',
    iconName: 'Building2',
  },
  {
    id: 'electrical-works',
    number: '02',
    specCode: 'SPEC: EL-88',
    title: 'Electrical Works',
    titleAr: 'أعمال كهربائية',
    description:
      'Medium and low-voltage substations, distribution networks, SCADA automated building management, and intelligent power infrastructures.',
    iconName: 'Zap',
  },
  {
    id: 'air-conditioning',
    number: '03',
    specCode: 'SPEC: HV-02',
    title: 'Air Conditioning & HVAC',
    titleAr: 'أعمال تكييف الهواء',
    description:
      'Industrial district cooling linkages, central chilled water setups, packaged VRF installations, and custom ducted air distribution engineering.',
    iconName: 'Wind',
  },
  {
    id: 'fire-fighting',
    number: '04',
    specCode: 'SPEC: FF-10',
    title: 'Fire Fighting Systems',
    titleAr: 'أنظمة إطفاء الحريق',
    description:
      'NFPA and Civil Defense compliant deluge systems, FM-200 gas suppression, high-pressure booster pumps, and early alarm detection grids.',
    iconName: 'Flame',
  },
  {
    id: 'sanitary-works',
    number: '05',
    specCode: 'SPEC: PL-45',
    title: 'Sanitary & Plumbing Works',
    titleAr: 'أعمال صحية وشبكات مياه',
    description:
      'Complete municipal water transmission networks, wastewater treatment facilities, stormwater drainage, and internal hydraulic networks.',
    iconName: 'Droplets',
  },
  {
    id: 'construction',
    number: '06',
    specCode: 'SPEC: IN-77',
    title: 'Construction & Infrastructure',
    titleAr: 'بناء وبنية تحتية',
    description:
      'Heavy civil infrastructure, earthworks, highways, bridges, deep utilities trenching, and massive site developmental engineering.',
    iconName: 'HardHat',
  },
  {
    id: 'project-management',
    number: '07',
    specCode: 'SPEC: PM-09',
    title: 'Project Management',
    titleAr: 'إدارة المشاريع والبرامج',
    description:
      'End-to-end EPC management, Primavera P6 scheduling, value engineering, procurement control, and on-site QA/QC governance.',
    iconName: 'ClipboardCheck',
  },
  {
    id: 'property-development',
    number: '08',
    specCode: 'SPEC: PD-33',
    title: 'Property Development',
    titleAr: 'تطوير واستثمار عقاري',
    description:
      'Strategic land acquisition, feasibility modeling, structural realization, and commercial asset commissioning across regional business capitals.',
    iconName: 'Layers',
  },
]

export const REGIONAL_HUBS: RegionalHub[] = [
  {
    country: 'saudi-arabia',
    countryName: 'Kingdom of Saudi Arabia',
    countryNameAr: 'المملكة العربية السعودية',
    coordinates: '24.7136° N, 46.6753° E',
    badge: 'CORPORATE HEADQUARTERS',
    description:
      'Anchored in Riyadh’s central financial corridor. Directing mega civil undertakings, commercial ventures, and sovereign development frameworks.',
    address: 'Olaya District, Riyadh 12213',
    phone: '+966 58 160 5812 / +966 54 505 1136',
    classification: 'CLASS-1 GENERAL CONTRACTOR',
  },
  {
    country: 'egypt',
    countryName: 'Arab Republic of Egypt',
    countryNameAr: 'جمهورية مصر العربية',
    coordinates: '30.0444° N, 31.2357° E',
    badge: 'REGIONAL BUREAU',
    description:
      'Full-scale engineering bureau overseeing residential developments, New Administrative Capital projects, and retail rollouts across Egypt.',
    address: 'Cairo Engineering Center, Egypt',
    phone: '+20 2 2795 1994',
    classification: 'REGIONAL ENGINEERING HUB',
  },
  {
    country: 'qatar',
    countryName: 'State of Qatar',
    countryNameAr: 'دولة قطر',
    coordinates: '25.2854° N, 51.5310° E',
    badge: 'OPERATIONAL HUB',
    description:
      'Operational complex delivering high-density mechanical engineering, luxury residential compounds, and turnkey institutional infrastructure for Doha and Lusail.',
    address: 'West Bay Business District, Doha',
    phone: '+974 4488 1994',
    classification: 'CONTRACTING REGISTRATION',
  },
]

export const HOME_CREDENTIALS: HomeCredential[] = [
  {
    id: 'iso-9001',
    category: 'INTERNATIONAL QUALITY',
    title: 'ISO 9001 : 2015',
    description:
      'Certified Quality Management System covering comprehensive Civil, Mechanical, Electrical, and Project Engineering lifecycle protocols.',
    registrationNumber: 'KSA-QMS-9401',
    status: 'VERIFIED',
  },
  {
    id: 'civil-defense',
    category: 'STATUTORY LICENSES',
    title: 'Civil Defense Authorized',
    description:
      'Licensed Tier-1 Contractor for fire suppression, automated life safety, smoke control, and industrial emergency mitigation.',
    registrationNumber: 'DEFENSE REG # 88204-CD',
    status: 'VERIFIED',
  },
  {
    id: 'chamber-classification',
    category: 'SOVEREIGN RATINGS',
    title: 'Chamber & Classification',
    description:
      'Pre-qualified general contractor classification with the Chamber of Commerce and official commercial syndicates across the GCC.',
    registrationNumber: 'DOSSIER CLASS: GRADE A',
    status: 'VERIFIED',
  },
]
