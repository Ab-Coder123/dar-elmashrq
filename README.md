# Dar ElMashrq — Corporate Portfolio Website

> **Dar ElMashrq Trading & Contracting Company**
> Established in 1994 · Operating in Saudi Arabia, Egypt, and Qatar

This repository houses the production-ready monorepo for Dar ElMashrq's digital portfolio, administrative systems, and shared architecture packages.

---

## 🛠 Tech Stack

- **Monorepo Engine:** [Turborepo](https://turbo.build/) + [pnpm](https://pnpm.io/)
- **Framework:** [Next.js](https://nextjs.org/) 15/16 (App Router, React 19)
- **Language:** TypeScript 5.8+ (Strict)
- **Styling:** Tailwind CSS 4 + Verified Brand Design Tokens
- **Icons:** Lucide React
- **Component Primitives:** shadcn/ui conventions

---

## 📂 Repository Layout

```text
dar-elmashrq/
├── apps/
│   ├── web/               # Public Corporate Portfolio Website (Port 3000)
│   └── admin/             # Future Internal Content Management Portal (Port 3001)
│
├── packages/
│   ├── types/             # Shared Domain TypeScript Definitions (@dar-elmashrq/types)
│   ├── utils/             # Shared Pure Utilities & Formatting (@dar-elmashrq/utils)
│   ├── config/            # Shared Tailwind Tokens & TS Configs (@dar-elmashrq/config)
│   └── ui/                # Shared UI Primitives Wrapper (@dar-elmashrq/ui)
│
├── backend/               # Future Backend API & Storage Boundary (NestJS / Prisma ready)
│
├── docs/
│   ├── architecture/      # Detailed System, Frontend, Backend & Typography Docs
│   ├── design/            # Brand guidelines & Design System specifications
│   └── content/           # Copy & Translation inventory from Corporate PDF
│
├── .agents/
│   └── AGENTS.md          # Architecture Contract for AI Coding Agents
│
├── package.json           # Monorepo root configuration
├── pnpm-workspace.yaml    # Workspace definition
├── turbo.json             # Turbo pipeline tasks
└── README.md
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: `>= 18.17.0` (Node 20+ recommended)
- **pnpm**: `>= 9.0.0` (pnpm 10 recommended)

### 2. Installation
```bash
pnpm install
```

### 3. Development
```bash
# Start all applications concurrently
pnpm dev

# Or run only the public web app
pnpm --filter @dar-elmashrq/web dev
```

### 4. Quality Checks & Builds
```bash
# Type-check all workspaces
pnpm type-check

# Lint all packages
pnpm lint

# Production build
pnpm build
```

---

## 🎨 Verified Visual Identity Tokens

Extracted and verified directly from the company's 68-page corporate profile PDF:

- **Navy:** `#123C82` (Primary Brand Color)
- **Gold:** `#BA9563` (Luxury Accent)
- **Dark:** `#231F20` (Warm Near-Black Typography)
- **Muted Gray:** `#5B5B5B` (Secondary Text)
- **White:** `#FFFFFF` (Backgrounds & Crisp Typography)

---

## 📖 Architecture & Design Documentation

- [System Overview](docs/architecture/system-overview.md)
- [Frontend Architecture (`apps/web`)](docs/architecture/frontend.md)
- [Backend & Database Strategy](docs/architecture/backend-architecture.md)
- [Data Flow & Abstraction](docs/architecture/data-flow.md)
- [Admin & Authentication Boundary](docs/architecture/admin-auth-boundary.md)
- [Typography & Font Licensing](docs/architecture/typography.md)
- [AI Agent Rules](.agents/AGENTS.md)
