import bcrypt from 'bcryptjs'
import type { Db } from '../../infrastructure/database/db'
import { createAdminUsersRepository } from './adminUsers.repository'
import {
  loginInputSchema,
  changePasswordInputSchema,
  type LoginInput,
  type ChangePasswordInput,
} from './auth.schemas'
import { signJwt } from '../../shared/auth/jwt'
import { UnauthorizedError, BadRequestError } from '../../shared/errors/AppError'

export function createAuthService(db: Db) {
  const usersRepo = createAdminUsersRepository(db)

  return {
    async login(raw: LoginInput) {
      const { email, password } = loginInputSchema.parse(raw)
      const user = await usersRepo.findByEmail(email)

      if (!user || !user.is_active || !user.password_hash) {
        throw new UnauthorizedError('Invalid email or password.')
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash)
      if (!isValidPassword) {
        throw new UnauthorizedError('Invalid email or password.')
      }

      const token = signJwt({
        userId: Number(user.id),
        email: user.email,
        role: user.role,
      })

      return {
        token,
        user: {
          id: Number(user.id),
          email: user.email,
          displayName: user.display_name,
          role: user.role,
        },
      }
    },

    async getCurrentUser(userId: number) {
      const user = await usersRepo.findById(userId)
      return {
        id: Number(user.id),
        email: user.email,
        displayName: user.display_name,
        role: user.role,
        isActive: user.is_active,
        createdAt: user.created_at,
      }
    },

    async changePassword(userId: number, raw: ChangePasswordInput) {
      const { currentPassword, newPassword } = changePasswordInputSchema.parse(raw)
      const user = await usersRepo.findById(userId)

      // Fetch user with password hash
      const userWithHash = await usersRepo.findByEmail(user.email)
      if (!userWithHash || !userWithHash.password_hash) {
        throw new UnauthorizedError('User account error.')
      }

      const isValidPassword = await bcrypt.compare(
        currentPassword,
        userWithHash.password_hash
      )
      if (!isValidPassword) {
        throw new BadRequestError('Current password is incorrect.')
      }

      await usersRepo.updatePassword(userId, newPassword)
      return {
        message: 'Password updated successfully.',
      }
    },
  }
}
