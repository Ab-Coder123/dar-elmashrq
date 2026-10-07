import type { Service } from '@dar-elmashrq/types'

/**
 * Company service offerings — single source of truth.
 *
 * Source: Dar ElMashrq corporate PDF:
 * - Page 4: design, construction, project management, property development
 * - Page 7: civil works & finishing, electrical works, AC works, fire fighting & sanitary
 *
 * Icons use Lucide React icon names (https://lucide.dev).
 * Icons will be mapped to components in Phase 02.
 */
export const SERVICES: Service[] = [
  {
    id: 'civil-works-finishing',
    slug: 'civil-works-finishing',
    name: 'Civil Works & Finishing',
    nameAr: 'أعمال مدنية والتشطيبات',
    description:
      'Complete civil construction and high-quality finishing works across all project types.',
    descriptionAr: 'أعمال البناء المدني والتشطيبات عالية الجودة لجميع أنواع المشاريع.',
    icon: 'Building2',
    order: 1,
  },
  {
    id: 'electrical-works',
    slug: 'electrical-works',
    name: 'Electrical Works',
    nameAr: 'أعمال كهربائية',
    description: 'Full electrical installation and systems for commercial and residential projects.',
    descriptionAr: 'التركيبات الكهربائية الكاملة والأنظمة للمشاريع التجارية والسكنية.',
    icon: 'Zap',
    order: 2,
  },
  {
    id: 'air-conditioning',
    slug: 'air-conditioning',
    name: 'Air Conditioning Works',
    nameAr: 'أعمال تكييف الهواء',
    description: 'HVAC systems design, supply, and installation.',
    descriptionAr: 'تصميم وتوريد وتركيب أنظمة التكييف والتهوية.',
    icon: 'Wind',
    order: 3,
  },
  {
    id: 'fire-fighting-sanitary',
    slug: 'fire-fighting-sanitary',
    name: 'Fire Fighting & Sanitary Works',
    nameAr: 'أعمال إطفاء الحريق والصحية',
    description: 'Fire suppression systems and complete sanitary infrastructure.',
    descriptionAr: 'أنظمة إطفاء الحريق والبنية التحتية الصحية الكاملة.',
    icon: 'ShieldCheck',
    order: 4,
  },
  {
    id: 'design',
    slug: 'design',
    name: 'Design',
    nameAr: 'تصميم',
    description: 'Architectural and engineering design services.',
    descriptionAr: 'خدمات التصميم المعماري والهندسي.',
    icon: 'PenTool',
    order: 5,
  },
  {
    id: 'construction',
    slug: 'construction',
    name: 'Construction',
    nameAr: 'بناء وإنشاء',
    description:
      'Full construction execution from foundations to handover, adhering to the highest engineering standards.',
    descriptionAr:
      'تنفيذ البناء الكامل من الأساسات حتى التسليم، مع الالتزام بأعلى المعايير الهندسية.',
    icon: 'HardHat',
    order: 6,
  },
  {
    id: 'project-management',
    slug: 'project-management',
    name: 'Project Management',
    nameAr: 'إدارة المشاريع',
    description:
      'Professional project and program management merging international techniques with regional expertise.',
    descriptionAr: 'إدارة المشاريع والبرامج بمزج الأساليب الدولية مع الخبرة الإقليمية.',
    icon: 'BarChart3',
    order: 7,
  },
  {
    id: 'property-development',
    slug: 'property-development',
    name: 'Property Development',
    nameAr: 'تطوير عقاري',
    description: 'Real estate investment and property development services.',
    descriptionAr: 'خدمات الاستثمار العقاري وتطوير العقارات.',
    icon: 'MapPin',
    order: 8,
  },
]
