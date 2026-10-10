# Dar ElMashrq Admin — Implementation Roadmap & Phases

This document records the 3-phase execution roadmap for developing the `apps/admin` application within the Dar ElMashrq monorepo.

---

## Overview

The Admin application is located at `apps/admin`. Development is strictly divided into 3 sequential phases. Each phase requires verification, testing, and approval before proceeding to the next.

---

## Phase 01 — Admin Audit & Dashboard Foundation

### Goals
- Inspect and audit existing workspace, packages, and `apps/admin` structure.
- Establish responsive Admin Layout (Desktop persistent sidebar, Mobile drawer, Header, Breadcrumbs).
- Implement navigation routing shells for all website content sections (Home, About, Services, Projects, Contact, Media Library, Site Settings).
- Ensure active route states, error handling (404/not found), and clean keyboard/accessibility interactions.
- Set up and run baseline component/layout tests and verify type-check and build pass cleanly.

### Key Requirements
1. **Layout & Sidebar:**
   - Persistent sidebar on desktop.
   - Mobile-friendly drawer.
   - Consistent brand tokens (Navy `#123C82`, Gold `#BA9563`, Dark `#231F20`).
2. **Navigation Structure:**
   - Dashboard Overview (`/`)
   - Home Page (`/home`)
   - About Us (`/about`)
   - Services (`/services`)
   - Projects (`/projects`)
   - Contact (`/contact`)
   - Media Library (`/media`)
   - Site Settings (`/settings`)
3. **Quality & Testing:**
   - Test sidebar navigation and active states.
   - Verify mobile menu open/close behavior.
   - Confirm route shells render without console errors.
   - Execute type-check, lint, and build.

---

## Phase 02 — Content Management UI

### Goals
- Build rich content management editors and forms for all public website sections.
- Create typed data-access layer with explicit mock adapters (no fake persistence claims).
- Add form validation, field controls, section toggles/reordering, and destructive action confirmations.
- Provide comprehensive unit and component tests for editors and adapters.

### Key Requirements
1. **Section Editors:**
   - **Home:** Hero, Services Preview, Featured Projects, Regional Summary.
   - **About:** Introduction, Vision/Mission, History, Organizational Info.
   - **Services:** Full CRUD (list, create, edit, delete, ordering).
   - **Projects:** Full CRUD, search, filter by country/status, gallery management.
   - **Contact:** Official company contact info (email, phones, branches).
   - **Media Library:** Asset browsing, metadata inspection, upload adapter mock.
   - **Site Settings:** Global company settings, branding, SEO defaults.
2. **Forms & UX:**
   - Controlled fields with validation.
   - Unsaved changes protection.
   - Explicit mock indicators (never pretend data is permanently saved to DB).
3. **Quality & Testing:**
   - Component tests for form state, validation, and CRUD operations.
   - Adapter tests for mock data handling.
   - Regression testing on Phase 01 layout.

---

## Phase 03 — Integration, Authentication & Quality Assurance

### Goals
- Connect Admin to the real backend API, database, and media storage when available.
- Implement secure authentication and role-based route/mutation protection.
- Build E2E testing workflows and verify full content publishing and cache invalidation.
- Complete security audits and finalize production readiness.

### Key Requirements
1. **API Integration:**
   - Centralized, typed API client.
   - Robust error handling, timeouts, and loading states.
   - Graceful separation between mock development and production API.
2. **Authentication & Authorization:**
   - Protected routes and mutation endpoints.
   - Session expiry and secure token management.
   - No public signup.
3. **Media & Publishing:**
   - Real media upload to storage provider.
   - Draft vs. published states with public cache invalidation.
4. **Mandatory Testing:**
   - API client contract tests.
   - Integration & Security tests.
   - End-to-End (E2E) workflow tests.
   - Full monorepo type-check, lint, and production build verification.
