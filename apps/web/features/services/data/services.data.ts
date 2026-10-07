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
    shortTitle: 'Civil & Finishing',
    category: 'Heavy Infrastructure & Architecture',
    specCode: 'SPEC // 01-CIV',
    description:
      'Complete civil construction and high-quality finishing works adhering to the highest international engineering codes and structural tolerances. From deep foundation engineering and reinforced concrete superstructures to premium exterior architectural cladding and interior execution.',
    scopeItems: [
      'Subterranean deep foundation & reinforced concrete structural framing',
      'Structural steel erection, precast assembly & heavy civil earthworks',
      'Architectural facade engineering, curtain walling & composite panel cladding',
      'High-tolerance interior turnkey fit-outs, marble masonry & acoustic ceilings',
    ],
    standards: [
      'International Building Code (IBC)',
      'Saudi Building Code (SBC 304/305)',
      'Egyptian Concrete Code (ECP 203)',
    ],
    image: SERVICES_MEDIA.civilImage,
    iconName: 'Building2',
  },
  {
    id: 'electrical-works',
    slug: 'electrical-works',
    number: '02',
    title: 'Electrical Works',
    shortTitle: 'Electrical Systems',
    category: 'Electro-Mechanical Engineering',
    specCode: 'SPEC // 02-ELE',
    description:
      'Full-spectrum electrical engineering installations, distribution power grids, and low-current automation infrastructure for commercial, institutional, and high-density residential developments.',
    scopeItems: [
      'Medium & low-voltage (MV/LV) substation design, switchgear & transformers',
      'Emergency diesel power generation, synchronizing panels & centralized UPS',
      'Intelligent Building Management Systems (BMS) & lighting automation',
      'Structured low-current networks, CCTV surveillance & access control',
    ],
    standards: [
      'IEC International Standards',
      'NFPA 70 (National Electrical Code)',
      'SEC (Saudi Electricity Company) Specifications',
    ],
    image: SERVICES_MEDIA.electricalImage,
    iconName: 'Zap',
  },
  {
    id: 'air-conditioning',
    slug: 'air-conditioning',
    number: '03',
    title: 'Air Conditioning Works',
    shortTitle: 'HVAC & Climate Systems',
    category: 'Environmental & Thermal Engineering',
    specCode: 'SPEC // 03-HVAC',
    description:
      'Comprehensive HVAC systems design, supply, fabrication, and commissioning engineered for severe regional climatic conditions with optimal energy conservation and indoor air quality standards.',
    scopeItems: [
      'Centralized chilled water plants, cooling towers & high-efficiency air chillers',
      'Variable Refrigerant Flow (VRF/VRV) & multi-split climate systems',
      'Automated smoke control, positive pressurization & industrial ventilation',
      'Acoustically lined galvanized ductwork fabrication & precision air balancing',
    ],
    standards: [
      'ASHRAE Thermal & Ventilation Standards',
      'SMACNA Duct Construction Standards',
      'AHRI Certified Thermal Performance',
    ],
    image: SERVICES_MEDIA.hvacImage,
    iconName: 'Wind',
  },
  {
    id: 'fire-fighting',
    slug: 'fire-fighting',
    number: '04',
    title: 'Fire Fighting Works',
    shortTitle: 'Life-Safety & Fire Protection',
    category: 'Life Safety Infrastructure',
    specCode: 'SPEC // 04-FIR',
    description:
      'Rigorous fire life-safety engineering and suppression network design certified under national Civil Defense authorities to guarantee rapid hazard mitigation and occupant protection.',
    scopeItems: [
      'Automatic wet and dry sprinkler networks with hydraulic calculation modeling',
      'High-pressure UL/FM certified fire pumping stations & water storage integration',
      'Gaseous clean agent suppression systems (FM200, Novec 1230) for mission-critical hubs',
      'Fire hydrant networks, hose reel cabinets & early-warning detection integration',
    ],
    standards: [
      'NFPA 13, 14, 20 & 2001 Codes',
      'Saudi Civil Defense Pre-qualification Grade A',
      'Civil Defence Authority of Qatar & Egypt',
    ],
    image: SERVICES_MEDIA.fireFightingImage,
    iconName: 'Flame',
  },
  {
    id: 'sanitary-works',
    slug: 'sanitary-works',
    number: '05',
    title: 'Sanitary Works',
    shortTitle: 'Plumbing & Hydraulic Infrastructure',
    category: 'Hydraulic & Public Health Systems',
    specCode: 'SPEC // 05-SAN',
    description:
      'Comprehensive sanitary piping networks, potable water treatment, drainage systems, and environmental waste management installations engineered for long-term operational resilience.',
    scopeItems: [
      'Pressurized potable water supply, booster filtration & thermal insulation',
      'Gravity and vacuum soil, waste, and storm water drainage networks',
      'Commercial sewage lift stations, grease interceptors & gray water recycling',
      'High-grade commercial fixture installation & acoustic pipe isolation',
    ],
    standards: [
      'IPC (International Plumbing Code)',
      'Uniform Plumbing Code (UPC)',
      'Municipal Environmental & Drainage Regulations',
    ],
    image: SERVICES_MEDIA.sanitaryImage,
    iconName: 'Droplets',
  },
]

/**
 * 4 Integrated Disciplines (The Complete Built-Environment Lifecycle)
 */
export const INTEGRATED_DISCIPLINES: IntegratedDiscipline[] = [
  {
    step: '01',
    title: 'Design',
    subtitle: 'Architectural & Engineering Concepts',
    description:
      'Translating project vision into precision architectural, structural, and electro-mechanical models with full BIM coordination, clash mitigation, and compliance before ground breaking.',
    deliverables: ['Architectural Schematics', 'Structural Calculations', 'MEP BIM Coordination', 'Statutory Permit Packages'],
    roleInLifecycle: 'Phase 1: Conceptualization & Engineering Rigor',
  },
  {
    step: '02',
    title: 'Construction',
    subtitle: 'Turnkey Physical Execution',
    description:
      'Mobilizing specialized heavy machinery, certified engineering squads, and trusted supply chain networks to execute civil foundations, structural frames, and bespoke luxury finishes.',
    deliverables: ['Subterranean Earthworks', 'Concrete Superstructures', 'Specialized MEP Fit-Out', 'Turnkey Facility Handover'],
    roleInLifecycle: 'Phase 2: Heavy Civil & Multi-Disciplinary Delivery',
  },
  {
    step: '03',
    title: 'Project Management',
    subtitle: 'Integrated Program & EPC Control',
    description:
      'Deploying international program management techniques merging CPM scheduling, cost baseline governance, risk mitigation, and stringent site safety oversight.',
    deliverables: ['Primavera P6 Master Schedules', 'Earned Value Cost Management', 'QA/QC Compliance Auditing', 'Life Safety Field Supervision'],
    roleInLifecycle: 'Phase 3: Schedule, Budget & Quality Assurance',
  },
  {
    step: '04',
    title: 'Property Development',
    subtitle: 'Strategic Real Estate Investment',
    description:
      'Originating and asset-managing master-planned residential communities, corporate towers, and commercial retail hubs across high-yield growth corridors in KSA, Egypt, and Qatar.',
    deliverables: ['Land Acquisition Feasibility', 'Asset Lifecycle Valuation', 'Tenant Fit-Out Coordination', 'Sovereign Real Estate Portfolios'],
    roleInLifecycle: 'Phase 4: Asset Creation & Commercial Longevity',
  },
]

/**
 * Services In Practice (Project Showcases mapped to technical services)
 */
export const SERVICE_PROJECT_SHOWCASES: ServiceProjectRelation[] = [
  {
    serviceId: 'civil-works-finishing',
    projectSlug: 'beverly-al-azeeza-new-facade',
    projectName: 'Beverly Al-Azeeza New Facade',
    country: 'Saudi Arabia',
    location: 'Al-Azeeza, KSA',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85',
  },
  {
    serviceId: 'electrical-works',
    projectSlug: 'way-care-medical-hospital',
    projectName: 'Way Care Medical Hospital',
    country: 'Saudi Arabia',
    location: 'Saudi Arabia',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    serviceId: 'civil-works-finishing',
    projectSlug: 'qasr-al-husseini-residential-towers',
    projectName: 'Qasr Al-Husseini Towers (12 Towers)',
    country: 'Egypt',
    location: 'Egypt',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
  },
  {
    serviceId: 'sanitary-works',
    projectSlug: 'western-water-pump-station-ras-tanura',
    projectName: 'Western Water Pump Station — Ras Tanura',
    country: 'Saudi Arabia',
    location: 'Ras Tanura, KSA',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85',
  },
]
