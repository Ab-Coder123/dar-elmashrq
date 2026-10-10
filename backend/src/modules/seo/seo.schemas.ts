import { z } from 'zod'

export const seoPageKeySchema = z
  .string()
  .min(2)
  .max(50)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'pageKey must be lowercase kebab-case')

export const seoMetadataInputSchema = z.object({
  title: z.string().trim().max(70, 'SEO title must not exceed 70 characters').optional().nullable(),
  titleAr: z.string().trim().max(70, 'SEO title (Arabic) must not exceed 70 characters').optional().nullable(),
  description: z.string().trim().max(320, 'SEO description must not exceed 320 characters').optional().nullable(),
  descriptionAr: z.string().trim().max(320, 'SEO description (Arabic) must not exceed 320 characters').optional().nullable(),
  ogImageId: z.number().int().positive().optional().nullable(),
})

export type SeoMetadataInput = z.infer<typeof seoMetadataInputSchema>
