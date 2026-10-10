import type { Request, Response, NextFunction } from 'express'
import { verifyJwt, type AuthTokenPayload } from '../auth/jwt'
import { UnauthorizedError, ForbiddenError } from '../errors/AppError'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthTokenPayload
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return next(
      new UnauthorizedError(
        'Authentication required. Please provide a Bearer token in the Authorization header.'
      )
    )
  }

  const [scheme, token] = authHeader.split(' ')
  if (scheme !== 'Bearer' || !token) {
    return next(
      new UnauthorizedError(
        'Malformed Authorization header. Format must be: Bearer <token>'
      )
    )
  }

  try {
    const payload = verifyJwt(token)
    req.user = payload
    next()
  } catch (err) {
    next(err)
  }
}

export function requireRole(...allowedRoles: Array<'admin' | 'editor'>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required.'))
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ForbiddenError(
          `Insufficient permissions. Role '${req.user.role}' is not allowed to access this resource.`
        )
      )
    }

    next()
  }
}
