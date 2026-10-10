# Dar ElMashrq — Backend API Service

Production-ready backend API service for **Dar ElMashrq Trading & Contracting Company**.

## Overview

- **Framework:** Node.js (v24 LTS) + Express + TypeScript (Strict Mode)
- **Database:** PostgreSQL with SQL Migrations + PGlite for isolated tests
- **Security:** Helmet, CORS, Centralized Error Handling, Zod Validation
- **Logging:** Morgan
- **Testing:** Vitest + Supertest (34 automated tests passing)
- **Port:** 4000 (configurable via `.env`)

---

## Architecture & Modules Structure

```
backend/
├── src/
│   ├── config/
│   │   └── env.ts                 # Validated runtime environment schema (Zod)
│   ├── shared/
│   │   ├── errors/
│   │   │   ├── AppError.ts        # Custom typed error classes hierarchy
│   │   │   └── errorHandler.ts    # Centralized Express error handler
│   │   └── middleware/
│   │       ├── cors.ts            # Configured CORS middleware
│   │       └── requestLogger.ts   # Request logging middleware
│   ├── modules/
│   │   ├── health/                # Health-check endpoints (/health & /api/v1/health)
│   │   ├── home/                  # Home Page API (Phase 03 - Public & Admin endpoints)
│   │   ├── projects/              # Projects module (Phase 06)
│   │   ├── services/              # Services module (Phase 05)
│   │   ├── company/               # Company profile & About module (Phase 04)
│   │   ├── media/                 # Media storage & library module (Phase 07)
│   │   └── auth/                  # Admin auth & JWT module (Phase 09)
│   ├── infrastructure/
│   │   ├── database/              # DB connection pool, migrations, repositories
│   │   └── storage/               # Media storage provider (Phase 07)
│   ├── routes.ts                  # Main API router (/api/v1)
│   ├── app.ts                     # Express application factory
│   └── server.ts                  # Server entry point & graceful shutdown
├── test/
│   ├── health.test.ts             # Health check tests
│   ├── errors.test.ts             # Error handling & status code tests
│   ├── cors.test.ts               # Security headers & CORS tests
│   ├── database.test.ts           # DB schema, relations, constraints tests
│   └── home.test.ts               # Home page public & admin API integration tests
├── migrations/
│   └── 001_init.sql               # Database DDL schema & triggers
├── scripts/
│   ├── migrate.ts                 # Database migration runner CLI
│   └── create-admin.ts            # Secure first admin user creation CLI
├── Dockerfile                     # Multi-stage production container image
├── railway.json                   # Railway platform deployment configuration
├── .env.example                   # Environment configuration template
└── tsconfig.json
```

---

## Home Page API (Phase 03)

| Method | Path | Description | Access | Cache Header |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/home` | Returns published Home Page data, featured projects & active services | Public | `public, max-age=60, s-maxage=300` |
| `GET` | `/api/v1/admin/home` | Returns draft/published Home Page data for admin editor | Admin | `no-cache` |
| `PUT` | `/api/v1/admin/home` | Saves/updates Home Page content with full Zod validation | Admin | `no-cache` |
| `PATCH` | `/api/v1/admin/home/status` | Toggles publication status (`draft` / `published`) | Admin | `no-cache` |

---

## Railway Deployment Guide

This backend is containerized and ready for direct deployment on **Railway**.

### 1. Railway Environment Variables Required:
- `PORT`: Automatically provided by Railway (defaults to 4000)
- `NODE_ENV`: `production`
- `DATABASE_URL`: PostgreSQL connection string (can be added via Railway Postgres Plugin or Supabase/Neon)
- `DATABASE_SSL`: `true` (if using managed cloud Postgres)
- `CORS_ORIGIN`: Your deployed frontend domains (e.g. `https://darelmashrq.com,https://admin.darelmashrq.com`)
- `API_PREFIX`: `/api/v1`

### 2. Deploy via Railway CLI or GitHub:
```bash
# Option A: Deploy with Railway CLI
npm i -g @railway/cli
railway login
railway init
railway up

# Run DB Migrations on Railway:
railway run pnpm --filter @dar-elmashrq/backend db:migrate

# Create First Admin User on Railway:
railway run env ADMIN_EMAIL=admin@elmashrq.com ADMIN_PASSWORD=your_secure_password pnpm --filter @dar-elmashrq/backend admin:create
```

---

## Local Development & Testing

```bash
# Run all unit & integration tests (34 tests across 5 files)
pnpm --filter @dar-elmashrq/backend test

# Type-check TypeScript strictly
pnpm --filter @dar-elmashrq/backend type-check

# Compile production build
pnpm --filter @dar-elmashrq/backend build

# Start dev server with hot reload
pnpm --filter @dar-elmashrq/backend dev
```
