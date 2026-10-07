# Dar ElMashrq — AI Coding Agent Contract & Architecture Guidelines

> **Project:** Dar ElMashrq Trading & Contracting Company — Corporate Portfolio Website
> **Phase:** 01 (Foundation & Architecture) Complete → Ready for Phase 02 (UI & Experience)

---

## 1. Stack & Runtime Conventions

- **Framework:** Next.js 15/16 App Router
- **Runtime:** Node.js >= 18.17 (Node 24 active in workspace), React 19
- **Monorepo Manager:** Turborepo + pnpm workspace
- **Language:** TypeScript 5.8+ (Strict Mode Enabled)
- **Styling:** Tailwind CSS 4 (`@tailwindcss/postcss`) + CSS Variable Tokens
- **Icons:** `lucide-react`
- **Component Base:** `shadcn/ui` conventions (using `cn()` from `@dar-elmashrq/utils`)

---

## 2. Core Architecture Rules (Non-Negotiable)

### Rule A: Feature-Driven Organization
- Code belongs in `features/[featureName]/` (e.g. `features/projects/`, `features/home/`).
- Only place components in `components/` if they are genuinely shared across multiple features (e.g. `components/ui/`, `components/layout/`, `components/navigation/`).
- A `ProjectCard` belongs in `features/projects/components/ProjectCard.tsx`, NOT `components/shared/`.

### Rule B: Strict Data Boundary
- **NEVER** import from `*.data.ts` or database clients directly inside UI components.
- UI components **MUST** consume data through service functions located in `features/[featureName]/services/` (e.g. `getProjects()`, `getProjectBySlug()`).
- This ensures the UI is 100% agnostic to whether data is sourced from static mock files or a live NestJS / PostgreSQL backend.

### Rule C: Server Components First
- Treat every component as a Server Component by default.
- Add `'use client'` strictly when client-side interactivity (`useState`, `useEffect`, `onClick`, motion hooks) is mandatory.
- Push client boundaries as far down the component tree as possible.

### Rule D: Zero `any` Types
- All types must be strictly defined in `@dar-elmashrq/types` (domain level) or `features/[featureName]/types/` (feature level).

---

## 3. Visual Identity & Token Specifications

| Token Name | Verified HEX Code | Description | Role |
|---|---|---|---|
| **Navy** | `#123C82` | Deep Navy Blue | Primary brand accent, hero overlays, primary CTAs |
| **Gold** | `#BA9563` | Warm Gold / Bronze | Luxury accent, badges, hover highlights, numbers |
| **Dark** | `#231F20` | Warm Near-Black | Main typography & dark background sections |
| **Muted** | `#5B5B5B` | Warm Gray | Secondary Arabic body text, captions, subtitles |
| **White** | `#FFFFFF` | Pure White | Section backgrounds, light typography |

### UI Aesthetics Guidelines
- **Border Radius:** 0px or 2px maximum. Avoid overly rounded "SaaS-style" pill buttons.
- **Motion:** Slow, architectural, precise, and dignified (durations 600ms–1200ms). No cartoonish bounce or spring effects.
- **Photography:** Full-bleed, structured architectural framing with deep navy overlay (`rgba(18, 60, 130, 0.65)`).

---

## 4. Security & Compliance Rules

1. **No Credentials in Code:** Use `lib/env.ts` for environment variable access. Never hardcode API keys or secret tokens.
2. **Document Privacy:** Sensitive corporate documents (such as the Bank IBAN Letter on page 67 of the PDF) are strictly omitted from public configs.
3. **Admin Isolation:** `apps/admin` is isolated from `apps/web` with separate ports, layouts, and `robots: noindex` meta tags.
4. **Font Licensing:** Never bundle unlicensed `AudiType` font files; use the web-safe abstraction (`Barlow Condensed` / `IBM Plex Arabic`).
