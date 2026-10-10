import { z } from 'zod'
import type { Country, ProjectCategory } from '@dar-elmashrq/types'

export const COUNTRIES = ['saudi-arabia', 'egypt', 'qatar'] as const satisfies readonly Country[]
export const PROJECT_CATEGORIES = [
  'residential',
  'commercial',
  'government-institutional',
  'healthcare',
  'infrastructure',
  'hospitality',
] as const satisfies readonly ProjectCategory[]
export const MEDIA_CATEGORIES = ['projects', 'services', 'certificates', 'branding', 'general'] as const
export const PUBLISH_STATUSES = ['draft', 'published'] as const

const slug = z
  .string()
  .min(2)
  .max(120)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug must be lowercase kebab-case')
const text = (max = 500) => z.string().trim().min(1).max(max)
const longText = z.string().trim().min(1).max(5000)
const idList = z.array(z.number().int().positive()).max(100).default([])

export const countrySchema = z.enum(COUNTRIES)
export const projectCategorySchema = z.enum(PROJECT_CATEGORIES)
export const statusSchema = z.enum(PUBLISH_STATUSES)

export const projectInputSchema = z
  .object({
    slug,
    name: text(200),
    nameAr: text(200).optional(),
    country: countrySchema,
    location: text(200).optional(),
    locationAr: text(200).optional(),
    category: projectCategorySchema,
    year: z.number().int().min(1900).max(2100).optional(),
    description: longText.optional(),
    descriptionAr: longText.optional(),
    scope: longText.optional(),
    scopeAr: longText.optional(),
    sourceReference: text(200).optional(),
    clientName: text(200).optional(),
    isFeatured: z.boolean().default(false),
    displayOrder: z.number().int().min(0).default(0),
    status: statusSchema.default('draft'),
    coverImageId: z.number().int().positive().optional(),
    serviceIds: idList,
    imageIds: idList,
  })
  .strict()
export type ProjectInput = z.input<typeof projectInputSchema>

export const serviceInputSchema = z
  .object({
    slug,
    name: text(200),
    nameAr: text(200).optional(),
    description: longText.optional(),
    descriptionAr: longText.optional(),
    icon: text(60).optional(),
    displayOrder: z.number().int().min(0).default(0),
    status: statusSchema.default('draft'),
    imageId: z.number().int().positive().optional(),
  })
  .strict()
export type ServiceInput = z.input<typeof serviceInputSchema>

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf'] as const
export const mediaInputSchema = z
  .object({
    storageKey: z
      .string()
      .min(3)
      .max(300)
      .regex(/^[a-zA-Z0-9/_\-.]+$/, 'unsafe storage key')
      .refine((k) => !k.includes('..') && !k.startsWith('/') && !k.includes('//'), 'unsafe storage key'),
    filename: text(200),
    mimeType: z.enum(ALLOWED_MIME),
    sizeBytes: z.number().int().positive().max(25 * 1024 * 1024),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    altText: text(300).optional(),
    altTextAr: text(300).optional(),
    category: z.enum(MEDIA_CATEGORIES).default('general'),
    isPublic: z.boolean().default(false),
    uploadedBy: z.number().int().positive().optional(),
  })
  .strict()
export type MediaInput = z.input<typeof mediaInputSchema>

export const adminUserInputSchema = z
  .object({
    email: z.string().trim().toLowerCase().email().max(254),
    password: z.string().min(12, 'password must be at least 12 characters').max(128),
    displayName: text(100).optional(),
    role: z.enum(['admin', 'editor']).default('editor'),
  })
  .strict()
export type AdminUserInput = z.input<typeof adminUserInputSchema>

export const seoInputSchema = z
  .object({
    pageKey: slug,
    title: text(70).optional(),
    titleAr: text(70).optional(),
    description: text(320).optional(),
    descriptionAr: text(320).optional(),
    ogImageId: z.number().int().positive().optional(),
  })
  .strict()
export type SeoInput = z.input<typeof seoInputSchema>

const fullContactSchema = z
  .object({
    hero: z
      .object({
        badge: z.string().trim().min(1),
        headline: z.string().trim().min(1),
      })
      .passthrough(),
    offices: z.array(z.record(z.unknown())).min(1),
    generalEmail: z.string().email(),
    phones: z.array(z.string().trim()).min(1),
  })
  .passthrough()

export const contactDocumentSchema = z.union([
  z
    .object({
      website: z.string().url(),
      email: z.string().email(),
      phones: z.array(z.string().regex(/^\+?[0-9]{7,16}$/, 'invalid phone')).min(1).max(10),
      address: z.object({ country: text(100), city: text(100), district: text(100).optional() }).strict(),
      socialLinks: z.record(z.string().url()).optional(),
    })
    .strict(),
  fullContactSchema,
])

const looseDocument = z.record(z.unknown())
export const documentSchemas = {
  home: looseDocument,
  about: looseDocument,
  settings: looseDocument,
  contact: contactDocumentSchema,
} as const
export type DocumentKey = keyof typeof documentSchemas

