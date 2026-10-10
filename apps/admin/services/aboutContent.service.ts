import type { AboutContentState } from '../types/about'
import { ABOUT_HISTORY, WHAT_WE_DO } from '../../../apps/web/features/about/data/about.data'

export const INITIAL_ABOUT_CONTENT: AboutContentState = {
  hero: {
    badge: 'ENTERPRISE PROFILE // ESTABLISHED 1994',
    headline: 'AUTHORITY, RIGOR & HERITAGE',
    tagline: 'Engineering the Built Environment Across Three Sovereign Markets',
    description:
      'Dar El Mashrq is a premier construction and real estate investment institution operating across primary regional economies in Saudi Arabia, Egypt, and Qatar for three continuous decades.',
    heroImage:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=90',
    status: 'published',
  },
  vision: {
    visionTitle: 'Our Strategic Vision',
    visionDescription:
      'To become the destination of choice for our clients in Saudi Arabia, Egypt, and the MENA region for providing project and program management solutions merging modern international industry techniques and standards with regional approaches.',
    missionTitle: 'Our Engineering Mission',
    missionDescription:
      'Delivering uncompromising structural longevity, technical precision, and full-spectrum EPC execution while fostering sovereign development across the Middle East.',
  },
  history: [...ABOUT_HISTORY],
  capabilities: [...WHAT_WE_DO],
  divisions: [
    {
      name: 'Engineering & Technical Affairs',
      nameAr: 'الشؤون الهندسية والفنية',
      lead: 'Chief Technical Officer',
      badge: 'DIVISION 01',
      departments: [
        {
          title: 'Design & BIM Architecture',
          titleAr: 'التصميم والمعمارية الرقمية',
          code: 'DEP-ARC',
          roles: ['CAD/BIM Lead Engineers', 'Clash Detection Specialists', 'Structural Designers'],
        },
        {
          title: 'Civil Construction Superstructures',
          titleAr: 'الإنشاءات المدنية والهياكل',
          code: 'DEP-CIV',
          roles: ['Site Operations Directors', 'Senior Project Managers', 'QA/QC Inspectors'],
        },
      ],
    },
    {
      name: 'Electro-Mechanical (MEP) & Systems',
      nameAr: 'الكهروميكانيك والأنظمة',
      lead: 'Director of MEP Engineering',
      badge: 'DIVISION 02',
      departments: [
        {
          title: 'Electrical Infrastructures',
          titleAr: 'البنية التحتية الكهربائية',
          code: 'DEP-ELE',
          roles: ['Power Distribution Engineers', 'Low-Current & SCADA Specialists'],
        },
        {
          title: 'HVAC & Life Safety Works',
          titleAr: 'التكييف والسلامة والحرائق',
          code: 'DEP-SAF',
          roles: ['NFPA Certified Fire Specialists', 'Chilled Water & VRF Engineers'],
        },
      ],
    },
  ],
  credentials: [
    {
      id: 'iso-9001',
      name: 'ISO 9001:2015 Quality Management',
      nameAr: 'شهادة الجودة العالمية آيزو 9001:2015',
      issuingBody: 'International Standards Organization',
      classification: 'QUALITY ASSURANCE',
    },
    {
      id: 'civil-defense',
      name: 'Civil Defense Tier-1 License',
      nameAr: 'ترخيص الدفاع المدني من الفئة الأولى',
      issuingBody: 'General Directorate of Civil Defense',
      classification: 'LIFE SAFETY',
    },
  ],
  lastUpdated: new Date().toISOString(),
}

let inMemoryAboutContent: AboutContentState = { ...INITIAL_ABOUT_CONTENT }

export interface IAboutContentAdapter {
  getAboutContent(): Promise<AboutContentState>
  updateAboutHero(hero: Partial<AboutContentState['hero']>): Promise<AboutContentState['hero']>
  updateAboutVision(vision: Partial<AboutContentState['vision']>): Promise<AboutContentState['vision']>
  updateMilestones(history: AboutContentState['history']): Promise<AboutContentState['history']>
  resetToDefault(): Promise<AboutContentState>
}

export const mockAboutContentAdapter: IAboutContentAdapter = {
  async getAboutContent(): Promise<AboutContentState> {
    return JSON.parse(JSON.stringify(inMemoryAboutContent))
  },

  async updateAboutHero(heroUpdate: Partial<AboutContentState['hero']>): Promise<AboutContentState['hero']> {
    inMemoryAboutContent = {
      ...inMemoryAboutContent,
      hero: {
        ...inMemoryAboutContent.hero,
        ...heroUpdate,
      },
      lastUpdated: new Date().toISOString(),
    }
    return JSON.parse(JSON.stringify(inMemoryAboutContent.hero))
  },

  async updateAboutVision(visionUpdate: Partial<AboutContentState['vision']>): Promise<AboutContentState['vision']> {
    inMemoryAboutContent = {
      ...inMemoryAboutContent,
      vision: {
        ...inMemoryAboutContent.vision,
        ...visionUpdate,
      },
      lastUpdated: new Date().toISOString(),
    }
    return JSON.parse(JSON.stringify(inMemoryAboutContent.vision))
  },

  async updateMilestones(historyUpdate: AboutContentState['history']): Promise<AboutContentState['history']> {
    inMemoryAboutContent = {
      ...inMemoryAboutContent,
      history: [...historyUpdate],
      lastUpdated: new Date().toISOString(),
    }
    return JSON.parse(JSON.stringify(inMemoryAboutContent.history))
  },

  async resetToDefault(): Promise<AboutContentState> {
    inMemoryAboutContent = JSON.parse(JSON.stringify(INITIAL_ABOUT_CONTENT))
    return JSON.parse(JSON.stringify(inMemoryAboutContent))
  },
}
