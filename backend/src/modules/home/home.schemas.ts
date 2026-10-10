import { z } from 'zod'
import { statusSchema } from '../content/content.schemas'

export const homeHeroSchema = z.object({
  badge: z.string().trim().min(1).max(100),
  headline: z.string().trim().min(1).max(250),
  tagline: z.string().trim().max(300).default(''),
  bodyCopy: z.string().trim().max(2000).default(''),
  heroImage: z.string().trim().default('/images/hero/hero-architectural-overlay.jpg'),
  exploreCtaText: z.string().trim().max(100).default('Explore Projects'),
  aboutCtaText: z.string().trim().max(100).default('About Dar ElMashrq'),
  status: statusSchema.default('draft'),
})

export const homeStatSchema = z.object({
  label: z.string().trim().min(1).max(100),
  labelAr: z.string().trim().max(100).optional(),
  value: z.string().trim().min(1).max(50),
  description: z.string().trim().max(300).default(''),
})

export const homeWhyPillarSchema = z.object({
  id: z.string().trim().min(1).max(50),
  code: z.string().trim().min(1).max(50),
  title: z.string().trim().min(1).max(150),
  description: z.string().trim().min(1).max(1000),
  iconName: z.string().trim().max(50).default('ShieldCheck'),
})

export const homeServiceSummarySchema = z.object({
  id: z.string().trim().min(1).max(50),
  number: z.string().trim().max(20),
  specCode: z.string().trim().max(50),
  title: z.string().trim().min(1).max(150),
  titleAr: z.string().trim().max(150).optional(),
  description: z.string().trim().min(1).max(1000),
  iconName: z.string().trim().max(50).default('Briefcase'),
})

export const regionalHubSchema = z.object({
  country: z.enum(['saudi-arabia', 'egypt', 'qatar']),
  countryName: z.string().trim().min(1).max(100),
  countryNameAr: z.string().trim().max(100).default(''),
  coordinates: z.string().trim().max(50).default(''),
  badge: z.string().trim().max(100).default(''),
  description: z.string().trim().max(500).default(''),
  address: z.string().trim().max(300).default(''),
  phone: z.string().trim().max(100).default(''),
  classification: z.string().trim().max(100).default(''),
})

export const homeCredentialSchema = z.object({
  id: z.string().trim().min(1).max(50),
  category: z.string().trim().max(100),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(500).default(''),
  registrationNumber: z.string().trim().max(100).default(''),
  status: z.string().trim().max(50).default('Active / Verified'),
})

export const homeContentSchema = z.object({
  hero: homeHeroSchema,
  stats: z.array(homeStatSchema).max(20).default([]),
  whyPillars: z.array(homeWhyPillarSchema).max(20).default([]),
  services: z.array(homeServiceSummarySchema).max(30).default([]),
  regionalHubs: z.array(regionalHubSchema).max(10).default([]),
  credentials: z.array(homeCredentialSchema).max(30).default([]),
  status: statusSchema.default('draft'),
})

export const patchHomeStatusSchema = z.object({
  status: statusSchema,
})

export type HomeContentInput = z.input<typeof homeContentSchema>
export type HomeContentOutput = z.infer<typeof homeContentSchema>
export type PatchHomeStatusInput = z.infer<typeof patchHomeStatusSchema>
