# Dar ElMashrq — System Architecture Overview

## Why This Architecture Exists

The Dar ElMashrq platform starts as a high-performance corporate portfolio website (`apps/web`). However, the business requires a clear expansion path for internal content and project management (`apps/admin`) and a robust backend API (`backend/`).

The architecture guarantees that **the public website and its UI components will NOT need to be rewritten or restructured when the backend and admin systems are implemented**.

---

## Core Architecture Principles

### 1. Data Boundary Isolation
```
TODAY (Phase 01 & 02):
  Static Data Source (`features/*/data/*.data.ts`)
          ↓
  Feature Service Layer (`features/*/services/*.service.ts`)
          ↓
  UI Presentation Components (`features/*/components/*`)

FUTURE (Phase 03):
  PostgreSQL / Media Storage
          ↓
  Backend REST/GraphQL API (`backend/`)
          ↓
  Feature Service Layer (`features/*/services/*.service.ts`)
          ↓
  UI Presentation Components (`features/*/components/*`)
```
Only the feature service layer changes when connecting the backend API. UI components consume standardized domain interfaces and never interact directly with database models or raw endpoints.

### 2. High Cohesion & Feature Orientation
Instead of grouping everything by technical type (e.g. putting all components in one global folder and all hooks in another), code is grouped by business domain:
- `features/projects/` contains its own data contract, service layer, and types.
- `features/services/`, `features/home/`, `features/about/`, `features/contact/` remain modular and self-contained.

### 3. Low Coupling
Presentation components (e.g. `ProjectCard`) do not know:
- Where data comes from (mock file vs database vs API).
- How filters are computed internally.
- Authentication or session details.

---

## Workspace Map

| Target | Role | Technology |
|---|---|---|
| `apps/web` | Public Corporate Portfolio | Next.js 15/16 App Router, React 19, Tailwind CSS 4 |
| `apps/admin` | Company Management Portal (CMS) | Next.js App Router (Isolated Boundary, Port 3001) |
| `packages/types` | Domain TypeScript Definitions | TypeScript (Strict) |
| `packages/utils` | Shared Pure Functions | TypeScript, Tailwind Merge, CLSX |
| `packages/config` | Shared Configurations | Tailwind Tokens, TypeScript Base & Next.js presets |
| `packages/ui` | Shared UI Primitives | Shadcn UI wrapper / Primitives |
| `backend/` | Future API & Business Logic Layer | Modular Node.js / NestJS architecture |

---

## Security Boundaries

- **Public Website (`apps/web`)**: Purely client/public facing, read-only data access, zero secrets exposed.
- **Admin App (`apps/admin`)**: Strict authentication barrier, no public search engine indexing (`robots: noindex, nofollow`), separated from public site assets.
- **Sensitive Documents**: Scanned documents containing private financial details (such as the Bank IBAN Letter on page 67 of the corporate profile) are strictly excluded from public configurations and client-accessible bundles.
