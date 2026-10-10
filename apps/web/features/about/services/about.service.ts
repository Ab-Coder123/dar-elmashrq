import { publicApiClient } from '@/lib/api'
import {
  ABOUT_MEDIA,
  ABOUT_HISTORY,
  WHAT_WE_DO,
  ORGANIZATIONAL_DIVISIONS,
  ABOUT_CREDENTIALS,
} from '../data/about.data'
import type {
  Milestone,
  WhatWeDoItem,
  OrgDivision,
  AboutCredential,
} from '../types'

export interface AboutApiData {
  content?: {
    hero?: {
      badge?: string
      headline?: string
      tagline?: string
      description?: string
      heroImage?: string
    }
    history?: Milestone[]
    capabilities?: WhatWeDoItem[]
    divisions?: OrgDivision[]
    credentials?: AboutCredential[]
  }
}

export async function getAboutContent(): Promise<{
  hero: {
    badge: string
    headline: string
    tagline: string
    description: string
    heroImage: string
  }
  history: Milestone[]
  capabilities: WhatWeDoItem[]
  divisions: OrgDivision[]
  credentials: AboutCredential[]
}> {
  const fallbackHero = {
    badge: 'ABOUT THE ENTERPRISE • ESTABLISHED 1994',
    headline: 'DAR EL MASHRQ',
    tagline: 'THREE DECADES OF ENGINEERING LEADERSHIP',
    description:
      'From foundational groundworks to high-specification sovereign infrastructure, Dar El Mashrq blends three decades of Middle Eastern contracting pedigree with modern computational construction rigor.',
    heroImage: ABOUT_MEDIA.heroImage,
  }

  const res = await publicApiClient<AboutApiData>('/about')
  const content = res?.content

  return {
    hero: {
      badge: content?.hero?.badge || fallbackHero.badge,
      headline: content?.hero?.headline || fallbackHero.headline,
      tagline: content?.hero?.tagline || fallbackHero.tagline,
      description: content?.hero?.description || fallbackHero.description,
      heroImage: content?.hero?.heroImage || fallbackHero.heroImage,
    },
    history: Array.isArray(content?.history) && content.history.length > 0 ? content.history : ABOUT_HISTORY,
    capabilities: Array.isArray(content?.capabilities) && content.capabilities.length > 0 ? content.capabilities : WHAT_WE_DO,
    divisions: Array.isArray(content?.divisions) && content.divisions.length > 0 ? content.divisions : ORGANIZATIONAL_DIVISIONS,
    credentials: Array.isArray(content?.credentials) && content.credentials.length > 0 ? content.credentials : ABOUT_CREDENTIALS,
  }
}
