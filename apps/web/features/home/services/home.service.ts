import { publicApiClient } from '@/lib/api'
import {
  HOME_MEDIA,
  HOME_STATS,
  HOME_SERVICES,
  WHY_PILLARS,
  REGIONAL_HUBS,
  HOME_CREDENTIALS,
} from '../data/home.data'
import type {
  HomeStat,
  HomeServiceSummary,
  RegionalHub,
  HomeCredential,
  WhyPillar,
} from '../types'

export interface HomeApiData {
  content?: {
    hero?: {
      badge?: string
      headline?: string
      tagline?: string
      bodyCopy?: string
      heroImage?: string
      exploreCtaText?: string
      aboutCtaText?: string
    }
    stats?: HomeStat[]
    whyPillars?: WhyPillar[]
    services?: HomeServiceSummary[]
    regionalHubs?: RegionalHub[]
    credentials?: HomeCredential[]
  }
  featuredProjects?: any[]
  activeServices?: any[]
}

export async function getHomeContent(): Promise<{
  hero: {
    badge: string
    headline: string
    tagline: string
    bodyCopy: string
    heroImage: string
    exploreCtaText: string
    aboutCtaText: string
  }
  stats: HomeStat[]
  services: HomeServiceSummary[]
  whyPillars: WhyPillar[]
  regionalHubs: RegionalHub[]
  credentials: HomeCredential[]
}> {
  const fallbackHero = {
    badge: 'CONTRACTING & REAL ESTATE • ESTABLISHED 1994',
    headline: 'DAR EL MASHRQ',
    tagline: 'Architectural Precision. Sovereign Scale.',
    bodyCopy:
      'Tier-one civil contracting, electro-mechanical prowess, and master-planned structural execution across Saudi Arabia, Egypt, and Qatar for three continuous decades.',
    heroImage: HOME_MEDIA.heroImage,
    exploreCtaText: 'Explore Projects',
    aboutCtaText: 'About The Enterprise',
  }

  const res = await publicApiClient<HomeApiData>('/home')
  const content = res?.content

  // Prioritize verified real local hero image if content contains old mock/unsplash URL
  const apiHeroImage = content?.hero?.heroImage
  const resolvedHeroImage =
    apiHeroImage && !apiHeroImage.includes('images.unsplash.com')
      ? apiHeroImage
      : fallbackHero.heroImage

  return {
    hero: {
      badge: content?.hero?.badge || fallbackHero.badge,
      headline: content?.hero?.headline || fallbackHero.headline,
      tagline: content?.hero?.tagline || fallbackHero.tagline,
      bodyCopy: content?.hero?.bodyCopy || fallbackHero.bodyCopy,
      heroImage: resolvedHeroImage,
      exploreCtaText: content?.hero?.exploreCtaText || fallbackHero.exploreCtaText,
      aboutCtaText: content?.hero?.aboutCtaText || fallbackHero.aboutCtaText,
    },
    stats: Array.isArray(content?.stats) && content.stats.length > 0 ? content.stats : HOME_STATS,
    services: Array.isArray(content?.services) && content.services.length > 0 ? content.services : HOME_SERVICES,
    whyPillars: Array.isArray(content?.whyPillars) && content.whyPillars.length > 0 ? content.whyPillars : WHY_PILLARS,
    regionalHubs: Array.isArray(content?.regionalHubs) && content.regionalHubs.length > 0 ? content.regionalHubs : REGIONAL_HUBS,
    credentials: Array.isArray(content?.credentials) && content.credentials.length > 0 ? content.credentials : HOME_CREDENTIALS,
  }
}
