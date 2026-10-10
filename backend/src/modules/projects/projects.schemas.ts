import { z } from 'zod'
import {
  projectInputSchema,
  statusSchema,
  countrySchema,
  projectCategorySchema,
} from '../content/content.schemas'

export {
  projectInputSchema,
  type ProjectInput,
  countrySchema,
  projectCategorySchema,
  statusSchema,
} from '../content/content.schemas'

export const updateProjectSchema = projectInputSchema.partial()
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>

export const patchProjectStatusSchema = z.object({
  status: statusSchema,
})
export type PatchProjectStatusInput = z.infer<typeof patchProjectStatusSchema>

export const reorderProjectsSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.number().int().positive(),
        displayOrder: z.number().int().min(0),
      })
    )
    .min(1, 'At least one item must be provided for reordering')
    .max(200, 'Cannot reorder more than 200 items at once'),
})
export type ReorderProjectsInput = z.infer<typeof reorderProjectsSchema>

export const projectQuerySchema = z.object({
  country: countrySchema.optional(),
  category: projectCategorySchema.optional(),
  featured: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === 'true')),
  search: z.string().trim().max(100).optional(),
  status: statusSchema.optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
})
export type ProjectQueryInput = z.infer<typeof projectQuerySchema>
