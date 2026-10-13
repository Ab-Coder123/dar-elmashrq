# Dar El Mashrq — Comprehensive Route Inventory

**Generated Date:** 2026-10-13  
**Environment:** Next.js 16.3.8 App Router, React 19.2.8, Express 4.21 Backend, PostgreSQL / PGlite  
**Monorepo Packages:** `@dar-elmashrq/web`, `@dar-elmashrq/admin`, `@dar-elmashrq/backend`, `@dar-elmashrq/types`, `@dar-elmashrq/ui`, `@dar-elmashrq/utils`

---

## 1. Public Corporate Website (`apps/web` — Port 3000)

| Route Path | Type | Dynamic Params / Query Variations | Access Requirements | Rendering Strategy | Reason for Performance Testing |
|:---|:---|:---|:---|:---|:---|
| `/` | Page | None (tabs: Credentials, Vision, Regional Hubs) | Public | SSR / Dynamic Server Component | Primary brand landing page, LCP hero image, Framer Motion animations, 8 service cards, 3 regional hubs. |
| `/about` | Page | None | Public | SSR / Dynamic Server Component | High-density content: 30-year interactive timeline, executive directory (CEO/Directors), governance philosophy. |
| `/services` | Page | None | Public | SSR / Dynamic Server Component | 8 comprehensive engineering disciplines, technical specifications, CAD diagrams, modal interactions. |
| `/projects` | Page | `?country=all`, `?country=saudi-arabia`, `?country=egypt`, `?country=qatar`, `?category=*`, `?search=*` | Public | SSR / Dynamic Server Component | High-impact visual gallery with 29 projects, instant client-side filtering, project covers, modal overlay details. |
| `/projects/[slug]` | Page | `[slug]` (e.g. `beverly-al-azeeza-new-facade`, `way-care-medical-hospital`, `residential-tower`, etc. 29 slugs) | Public | Dynamic SSR / ISR | Dedicated deep-dive project showcase with multi-photo image gallery, blueprints, client metadata, contract values. |
| `/contact` | Page | None | Public | Static Pre-rendered (SSG) with client form | Lead capture portal, interactive quotation form, regional bureaus contact cards, map integration. |

---

## 2. Internal CMS Admin Dashboard (`apps/admin` — Port 3001)

| Route Path | Type | Dynamic Params / Sections | Access Requirements | Rendering Strategy | Reason for Performance Testing |
|:---|:---|:---|:---|:---|:---|
| `/login` | Page | None | Public (Unauthenticated) | Static Pre-rendered (Client interactivity) | Authentication gateway, JWT handshake latency, credential validation, CSRF/error feedback. |
| `/` | Page | None (Redirects or renders Dashboard Overview) | Authenticated (JWT Bearer) | Client-side Protected Route | System health dashboard, project counts, recent audits, quick navigation cards. |
| `/projects` | Page | Search query, country filters, CRUD modal | Authenticated (JWT Bearer) | Client-side Protected Route | High-volume tabular dataset of 29 projects, live search re-renders, full project editing modal. |
| `/services` | Page | Add/Edit modal, display order | Authenticated (JWT Bearer) | Client-side Protected Route | 8 technical services management, reordering, inline status toggle, description updates. |
| `/home` | Page | Hero, Vision, Stats sections | Authenticated (JWT Bearer) | Client-side Protected Route | Live preview and form inputs for landing page statistics, headlines, and hero photography. |
| `/about` | Page | Hero, Timeline milestones, Leadership | Authenticated (JWT Bearer) | Client-side Protected Route | Multi-section rich content editor, executive leadership management, milestone CRUD. |
| `/contact` | Page | Regional branch office cards | Authenticated (JWT Bearer) | Client-side Protected Route | Multi-branch office editor (Dammam HQ, Cairo Regional, Doha), phone numbers, working hours. |
| `/media` | Page | Upload file, search, filter by tag | Authenticated (JWT Bearer) | Client-side Protected Route | Media asset storage manager, thumbnail grid rendering, file upload progress, aspect-ratio checks. |
| `/settings` | Page | SEO defaults, social links, system cache | Authenticated (JWT Bearer) | Client-side Protected Route | Global application settings, cache purge triggers, metadata configuration. |

---

## 3. Backend REST API Endpoints (`backend` — Port 4000)

| Endpoint Path | HTTP Method | Access | Purpose | Performance Testing Target |
|:---|:---|:---|:---|:---|
| `/api/v1/health` | GET | Public | Healthcheck & DB ping | Baseline server & DB latency (< 20ms target). |
| `/api/v1/auth/login` | POST | Public | Issue admin JWT token | Password hashing cost (bcrypt), payload size, rate-limiting. |
| `/api/v1/auth/me` | GET | Authenticated | Token verification & current profile | Fast session verification header latency. |
| `/api/v1/projects` | GET | Public | Public projects listing & search | Query serialization, indexing on `country` & `category`, response payload compression. |
| `/api/v1/projects/:slug` | GET | Public | Single project detailed query | DB lookup by slug with associated images array. |
| `/api/v1/services` | GET | Public | Technical services listing | Fast in-memory / DB retrieval with display order. |
| `/api/v1/home` | GET | Public | Homepage dynamic settings & media | Single-call landing page configuration. |
| `/api/v1/about` | GET | Public | About page milestones & leadership | Comprehensive timeline query. |
| `/api/v1/contact` | GET | Public | Regional bureaus & contact settings | Public contact details query. |
| `/api/v1/admin/projects` | GET, POST | Authenticated | Admin projects table & create | List retrieval and transaction execution. |
| `/api/v1/admin/projects/:id` | PUT, DELETE | Authenticated | Admin project update & delete | Mutating cache invalidation and database update. |
| `/api/v1/admin/media` | GET, POST | Authenticated | Media library asset query & upload | Media pagination, metadata storage, file processing. |

---

## 4. Discovery Summary & Scope

- **Total Discovered Frontend Routes:** 15 routes (6 in Public Web, 9 in Admin Dashboard).
- **Public Dynamic Variations:** 29 unique project slug URLs + 4 primary country query combinations (`all`, `saudi-arabia`, `egypt`, `qatar`).
- **Total Discovered API Endpoints:** 24 endpoints across 10 business modules.
- **Auditing Scope:** All 6 public routes + query filter states, all 9 admin routes, and all primary public/admin API endpoints.
