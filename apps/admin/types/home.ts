import type { HomeStat, HomeServiceSummary, RegionalHub, HomeCredential } from '@dar-elmashrq/types'

export interface HomeHeroContent {
  badge: string
  headline: string
  tagline: string
  bodyCopy: string
  heroImage: string
  exploreCtaText: string
  aboutCtaText: string
  status: 'published' | 'draft'
}

export interface HomeWhyPillar {
  id: string
  code: string
  title: string
  description: string
  iconName: string
}

export interface HomeContentState {
  hero: HomeHeroContent
  stats: HomeStat[]
  whyPillars: HomeWhyPillar[]
  services: HomeServiceSummary[]
  regionalHubs: RegionalHub[]
  credentials: HomeCredential[]
  lastUpdated: string
}
