/**
 * @dar-elmashrq/ui
 *
 * This package re-exports shared UI primitives and utilities.
 *
 * shadcn/ui components are installed per-app via:
 *   pnpm dlx shadcn@latest add <component> --cwd apps/web
 *
 * This package holds only app-agnostic primitives that are
 * genuinely shared between apps (web and admin).
 */
export { cn } from '@dar-elmashrq/utils'
