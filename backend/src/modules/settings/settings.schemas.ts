import { z } from 'zod'
import { statusSchema } from '../content/content.schemas'

export const navigationLinkSchema = z.object({
  label: z.string().trim().min(1).max(100),
  labelAr: z.string().trim().min(1).max(100),
  href: z.string().trim().min(1).max(200),
  external: z.boolean().default(false),
})

export const socialLinksSchema = z.object({
  linkedin: z.string().trim().url().or(z.literal('')).default(''),
  twitter: z.string().trim().url().or(z.literal('')).default(''),
  instagram: z.string().trim().url().or(z.literal('')).default(''),
  youtube: z.string().trim().url().or(z.literal('')).default(''),
  facebook: z.string().trim().url().or(z.literal('')).default(''),
})

export const footerSettingsSchema = z.object({
  copyrightText: z.string().trim().min(1).max(200),
  copyrightTextAr: z.string().trim().max(200).optional(),
  commercialRegistrationKSA: z.string().trim().max(100).default(''),
  commercialRegistrationEG: z.string().trim().max(100).default(''),
  taxNumber: z.string().trim().max(100).default(''),
})

export const siteSettingsSchema = z.object({
  siteName: z.string().trim().min(1).max(100),
  siteNameAr: z.string().trim().min(1).max(100),
  tagline: z.string().trim().max(300).default(''),
  taglineAr: z.string().trim().max(300).default(''),
  foundedYear: z.number().int().min(1900).max(2100).default(1994),
  officialEmail: z.string().trim().email(),
  supportEmail: z.string().trim().email().optional(),
  phones: z.array(z.string().trim()).min(1).max(10),
  socialLinks: socialLinksSchema.default({}),
  headerNavigation: z.array(navigationLinkSchema).max(20).default([]),
  footer: footerSettingsSchema,
  maintenanceMode: z.boolean().default(false),
  status: statusSchema.default('draft'),
})

export const patchSettingsStatusSchema = z.object({
  status: statusSchema,
})

export type SiteSettingsInput = z.input<typeof siteSettingsSchema>
export type SiteSettingsOutput = z.infer<typeof siteSettingsSchema>
