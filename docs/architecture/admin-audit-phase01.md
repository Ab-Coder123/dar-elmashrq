# Dar ElMashrq Admin — Phase 01 Technical Audit & Findings

**Date:** 2026-10-09  
**Phase:** Phase 01 (Admin Audit & Dashboard Foundation)  
**Author:** AI Senior Frontend & QA Engineer  

---

## 1. Monorepo & Workspace Environment

- **Package Manager:** `pnpm` (v10.26.1)
- **Monorepo Build Engine:** `Turborepo` (v2.5.2)
- **Node Version:** Node v24.14.1 (target `>=18.17.0`)
- **Shared Packages:**
  - `@dar-elmashrq/types`: Shared domain interfaces (`Project`, `Service`, `CompanyProfile`, `Country`, etc.).
  - `@dar-elmashrq/utils`: Shared utilities (`cn`, `filterProjects`, `format`).
  - `@dar-elmashrq/config`: Shared configs for Tailwind, ESLint, and TypeScript.
  - `@dar-elmashrq/ui`: Shared UI wrappers.

---

## 2. Pre-Existing State of `apps/admin`

- **Framework:** Next.js 16.3.8 (App Router), React 19.2.8, TypeScript 5.9.3.
- **Initial State:**
  - `apps/admin/app/layout.tsx`: Basic metadata with `robots: { index: false, follow: false }`, no UI styling or layout.
  - `apps/admin/app/page.tsx`: Simple placeholder text.
  - No Tailwind CSS configuration or PostCSS setup.
  - No testing framework installed in `apps/admin`.
  - No auth mechanism connected yet (boundary documented in layout).

---

## 3. Public Website (`apps/web`) Structure & Sections

The public website consists of the following verified sections and content:

| Route | Main Sections / Content Modules |
|---|---|
| `/` (Home) | Hero (`Hero.tsx`), Why Dar ElMashrq, Featured Projects, Core Services Preview, Regional Presence, CTA |
| `/about` | About Hero, Vision & Mission, Strategic Goals, Executive Message, Company Milestones |
| `/services` | Services Hero, Services Grid (8 Disciplines), Execution Process, Quality Standards |
| `/projects` | Projects Hero, Regional Filter (SA/EG/QA), Project Grid, Featured Spotlight, Detail Overlay |
| `/contact` | Contact Hero, Contact Form, Regional Offices (Riyadh HQ, Cairo, Doha) |

---

## 4. Admin Information Architecture (IA) for Phase 01

To match the public website 1:1, the Admin navigation structure is designed as:

1. **Overview Dashboard** (`/`): High-level stats, system status, quick shortcuts to content modules.
2. **Home Page** (`/home`): Hero config, services preview, featured projects selector, why us highlights.
3. **About Us** (`/about`): Corporate intro, vision/mission, milestones & history.
4. **Services** (`/services`): 8 Core service offerings management (Civil, Electrical, HVAC, Fire Fighting, Design, Construction, PM, Property Dev).
5. **Projects** (`/projects`): Portfolio management across Saudi Arabia, Egypt, and Qatar, gallery management, featured toggles.
6. **Contact** (`/contact`): Official headquarters info, regional branch details, inquiry channels.
7. **Media Library** (`/media`): Image asset explorer, metadata viewer, and upload interface adapter.
8. **Site Settings** (`/settings`): Global branding, SEO metadata defaults, contact endpoints.

---

## 5. Testing & Verification Tooling Introduced

- **Test Runner:** `vitest` + `@testing-library/react` + `jsdom` + `@testing-library/jest-dom`.
- **Targeted Test Suites:**
  - `AdminLayout`: Verifies desktop sidebar, brand header, mobile toggle, navigation links, and active states.
  - `NavigationRoutes`: Verifies that all 8 implemented route shells render appropriate headers and content without crashing.
