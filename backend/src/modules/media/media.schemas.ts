import { z } from 'zod'
import {
  mediaInputSchema,
  MEDIA_CATEGORIES,
} from '../content/content.schemas'

export { mediaInputSchema, type MediaInput, MEDIA_CATEGORIES } from '../content/content.schemas'

export const updateMediaSchema = z
  .object({
    filename: z.string().trim().min(1).max(200).optional(),
    altText: z.string().trim().max(300).nullable().optional(),
    altTextAr: z.string().trim().max(300).nullable().optional(),
    category: z.enum(MEDIA_CATEGORIES).optional(),
    isPublic: z.boolean().optional(),
  })
  .strict()
export type UpdateMediaInput = z.infer<typeof updateMediaSchema>

export const mediaQuerySchema = z.object({
  category: z.enum(MEDIA_CATEGORIES).optional(),
  isPublic: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === 'true')),
  search: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
})
export type MediaQueryInput = z.infer<typeof mediaQuerySchema>
