import { z } from 'zod'
import { serviceInputSchema, statusSchema } from '../content/content.schemas'

export { serviceInputSchema, type ServiceInput } from '../content/content.schemas'

export const updateServiceSchema = serviceInputSchema.partial()
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>

export const patchServiceStatusSchema = z.object({
  status: statusSchema,
})
export type PatchServiceStatusInput = z.infer<typeof patchServiceStatusSchema>

export const reorderServicesSchema = z.object({
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
export type ReorderServicesInput = z.infer<typeof reorderServicesSchema>
