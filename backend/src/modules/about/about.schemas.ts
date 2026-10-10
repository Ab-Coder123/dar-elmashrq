import { z } from 'zod'
import { statusSchema } from '../content/content.schemas'

export const aboutHeroSchema = z.object({
  badge: z.string().trim().min(1).max(100),
  headline: z.string().trim().min(1).max(250),
  tagline: z.string().trim().max(300).default(''),
  description: z.string().trim().max(2000).default(''),
  heroImage: z.string().trim().default('/images/about/about-hero.jpg'),
  status: statusSchema.default('draft'),
})

export const aboutVisionSchema = z.object({
  visionTitle: z.string().trim().min(1).max(150),
  visionDescription: z.string().trim().min(1).max(2000),
  missionTitle: z.string().trim().min(1).max(150),
  missionDescription: z.string().trim().min(1).max(2000),
})

export const milestoneSchema = z.object({
  year: z.string().trim().min(1).max(20),
  title: z.string().trim().min(1).max(150),
  titleAr: z.string().trim().max(150).optional(),
  badge: z.string().trim().max(100).default(''),
  description: z.string().trim().min(1).max(1000),
  descriptionAr: z.string().trim().max(1000).optional(),
  details: z.array(z.string().trim()).max(20).default([]),
})

export const whatWeDoItemSchema = z.object({
  number: z.string().trim().max(20),
  title: z.string().trim().min(1).max(150),
  titleAr: z.string().trim().min(1).max(150),
  subtitle: z.string().trim().max(200).default(''),
  description: z.string().trim().min(1).max(1000),
  disciplines: z.array(z.string().trim()).max(20).default([]),
  image: z.string().trim().default(''),
})

export const orgDepartmentSchema = z.object({
  title: z.string().trim().min(1).max(150),
  titleAr: z.string().trim().min(1).max(150),
  code: z.string().trim().max(50),
  roles: z.array(z.string().trim()).max(30).default([]),
})

export const orgDivisionSchema = z.object({
  name: z.string().trim().min(1).max(150),
  nameAr: z.string().trim().min(1).max(150),
  lead: z.string().trim().max(150).default(''),
  badge: z.string().trim().max(100).default(''),
  departments: z.array(orgDepartmentSchema).max(20).default([]),
})

export const aboutCredentialSchema = z.object({
  id: z.string().trim().min(1).max(50),
  name: z.string().trim().min(1).max(200),
  nameAr: z.string().trim().min(1).max(200),
  issuingBody: z.string().trim().max(150).default(''),
  classification: z.string().trim().max(100).default(''),
})

export const aboutContentSchema = z.object({
  hero: aboutHeroSchema,
  vision: aboutVisionSchema,
  history: z.array(milestoneSchema).max(30).default([]),
  capabilities: z.array(whatWeDoItemSchema).max(30).default([]),
  divisions: z.array(orgDivisionSchema).max(20).default([]),
  credentials: z.array(aboutCredentialSchema).max(30).default([]),
  status: statusSchema.default('draft'),
})

export const patchAboutStatusSchema = z.object({
  status: statusSchema,
})

export type AboutContentInput = z.input<typeof aboutContentSchema>
export type AboutContentOutput = z.infer<typeof aboutContentSchema>
export type PatchAboutStatusInput = z.infer<typeof patchAboutStatusSchema>
