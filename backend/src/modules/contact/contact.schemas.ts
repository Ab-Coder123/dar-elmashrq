import { z } from 'zod'
import { statusSchema, countrySchema } from '../content/content.schemas'

export const officeLocationSchema = z.object({
  id: z.string().trim().min(1).max(50),
  country: countrySchema,
  countryName: z.string().trim().min(1).max(100),
  countryNameAr: z.string().trim().min(1).max(100),
  city: z.string().trim().min(1).max(100),
  district: z.string().trim().max(100).default(''),
  address: z.string().trim().min(1).max(300),
  addressAr: z.string().trim().max(300).optional(),
  phone: z.string().trim().min(1).max(50),
  email: z.string().trim().email(),
  coordinates: z.string().trim().max(100).default(''),
  isHQ: z.boolean().default(false),
})

export const contactHeroSchema = z.object({
  badge: z.string().trim().min(1).max(100),
  headline: z.string().trim().min(1).max(250),
  tagline: z.string().trim().max(300).default(''),
  description: z.string().trim().max(2000).default(''),
})

export const contactContentSchema = z.object({
  hero: contactHeroSchema,
  offices: z.array(officeLocationSchema).min(1).max(10),
  generalEmail: z.string().trim().email(),
  supportEmail: z.string().trim().email().optional(),
  phones: z.array(z.string().trim()).min(1).max(10),
  workingHours: z.string().trim().min(1).max(150),
  workingHoursAr: z.string().trim().max(150).optional(),
  status: statusSchema.default('draft'),
})

export const patchContactStatusSchema = z.object({
  status: statusSchema,
})

export const contactInquiryInputSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address').max(254),
  phone: z.string().trim().max(30).optional(),
  company: z.string().trim().max(150).optional(),
  serviceOfInterest: z.string().trim().max(100).optional(),
  country: countrySchema.optional(),
  message: z.string().trim().min(5, 'Message must be at least 5 characters').max(3000),
})

export const patchInquiryStatusSchema = z.object({
  status: z.enum(['unread', 'read', 'archived', 'replied']),
})

export const inquiryQuerySchema = z.object({
  status: z.enum(['unread', 'read', 'archived', 'replied']).optional(),
  search: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
})

export type ContactContentInput = z.input<typeof contactContentSchema>
export type ContactContentOutput = z.infer<typeof contactContentSchema>
export type ContactInquiryInput = z.infer<typeof contactInquiryInputSchema>
export type PatchInquiryStatusInput = z.infer<typeof patchInquiryStatusSchema>
export type InquiryQueryInput = z.infer<typeof inquiryQuerySchema>
