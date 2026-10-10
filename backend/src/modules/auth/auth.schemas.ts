import { z } from 'zod'

export const loginInputSchema = z.object({
  email: z.string().trim().toLowerCase().email('Please provide a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const changePasswordInputSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(12, 'New password must be at least 12 characters').max(128),
})

export type LoginInput = z.infer<typeof loginInputSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>
