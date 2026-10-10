import type { Milestone, WhatWeDoItem, OrgDivision, AboutCredential } from '@dar-elmashrq/types'

export interface AboutHeroContent {
  badge: string
  headline: string
  tagline: string
  description: string
  heroImage: string
  status: 'published' | 'draft'
}

export interface AboutVisionContent {
  visionTitle: string
  visionDescription: string
  missionTitle: string
  missionDescription: string
}

export interface AboutContentState {
  hero: AboutHeroContent
  vision: AboutVisionContent
  history: Milestone[]
  capabilities: WhatWeDoItem[]
  divisions: OrgDivision[]
  credentials: AboutCredential[]
  lastUpdated: string
}
