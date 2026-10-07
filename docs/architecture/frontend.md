# Frontend Architecture — `apps/web`

## Directory Structure & Responsibilities

```text
apps/web/
├── app/                    # Next.js App Router (Routing, Layouts, Server Pages)
│   ├── layout.tsx          # Global Root Layout (Metadata, Theme, Typography variables)
│   ├── page.tsx            # Home Page route
│   ├── about/page.tsx      # About Page route
│   ├── services/page.tsx   # Services Page route
│   ├── projects/
│   │   ├── page.tsx        # Projects Listing Page (Filtering, Grid)
│   │   └── [slug]/page.tsx # Project Detail Dynamic Route
│   └── contact/page.tsx    # Contact & Inquiry Page route
│
├── features/               # Feature-Oriented Modules
│   ├── home/               # Homepage hero, stats bar, overview modules
│   ├── about/              # Company history, vision, organizational structure
│   ├── services/           # Service catalog and details
│   ├── projects/           # Project portfolio (most complex domain)
│   │   ├── components/     # Feature-specific components (ProjectCard, ProjectGrid, ProjectFilters)
│   │   ├── hooks/          # useProjectFilters, useProjectDetail
│   │   ├── services/       # project.service.ts (Data access abstraction)
│   │   ├── data/           # projects.data.ts (Initial static data contract)
│   │   └── types/          # Feature-local types & re-exports
│   └── contact/            # Inquiry form, location details
│
├── components/             # Truly Shared Presentation Components
│   ├── ui/                 # shadcn/ui primitives (button, dialog, card, etc.)
│   ├── layout/             # Shell, HeaderContainer, SectionWrapper
│   ├── navigation/         # Header, MobileNav, Footer
│   └── shared/             # Cross-feature visual utilities
│
├── config/                 # Centralized Static Configurations
│   ├── site.ts             # Company metadata, contacts, navigation links, stats
│   ├── services.ts         # Service offerings list (from PDF)
│   └── certifications.ts   # Official company certifications list
│
├── lib/                    # Application Utilities & Environment
│   └── env.ts              # Type-safe environment variable gateway
│
└── public/                 # Static public assets (Favicons, SVGs, Logos)
```

---

## Component Strategy

### 1. Server Components by Default
All page components and non-interactive layout containers run as React Server Components (RSC).
- Zero client-side JavaScript overhead for static sections.
- Direct asynchronous service calls (`await getProjects()`).
- High SEO score and instant Initial Server Render.

### 2. Client Components Only Where Interaction Demands
Mark files with `'use client'` only when:
- Managing interactive state (e.g. `useState` in filter tabs).
- Handling browser events (`onClick`, `onScroll`).
- Utilizing animation/motion hooks (e.g. Framer Motion, View Transitions).

### 3. Geographic & Filter Architecture
As specified in requirements:
- Projects are filtered dynamically (`ALL`, `SAUDI ARABIA`, `EGYPT`, `QATAR`).
- No hardcoded regional routes (like `/projects/saudi-arabia`).
- Filter logic is completely separated from card presentation components via `@dar-elmashrq/utils` (`filterProjects`).
