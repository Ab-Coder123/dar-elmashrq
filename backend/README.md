# Dar ElMashrq — Backend

This directory contains the future API and business logic layer.

## Status

**Phase 01**: Architecture boundary established. Implementation pending.

## Planned Architecture

The backend will be a modular Node.js API — NestJS is recommended.

### Modules

| Module | Responsibility |
|--------|---------------|
| `projects/` | CRUD for project data, images, metadata |
| `services/` | Company services management |
| `company/` | Company profile and content management |
| `media/` | Image/file upload and storage |
| `auth/` | Authentication and authorization for admin access |

### Each Module Contains

```
module/
├── controller.ts     — HTTP request handling
├── service.ts        — Business logic
├── repository.ts     — Data access (database)
├── dto/              — Validation schemas (class-validator)
├── types.ts          — Module-local types
└── module.ts         — NestJS module definition
```

### Infrastructure

```
infrastructure/
├── database/         — Prisma ORM config, migrations
├── storage/          — S3-compatible media storage
└── cache/            — Response caching (Redis, future)
```

## Database Recommendation

| Option | Recommendation | Reason |
|--------|---------------|--------|
| **PostgreSQL + Prisma** | ✅ Recommended | Relational (projects → images → categories), type-safe ORM, excellent Next.js integration |
| MongoDB | ⚠️ Possible | Flexible schema but overkill for this relational domain |
| SQLite | ❌ Development only | Not suitable for production media management |

## Authentication Strategy

The admin application requires:
- JWT-based sessions
- Role-based access control (admin only, initially)
- All admin operations validated server-side
- Zero admin credentials in the public website
- Protected routes via Next.js middleware in `apps/admin`

## Data Flow (Future)

```
Admin User
    ↓ (authenticate)
apps/admin
    ↓ (API call with JWT)
backend/modules/projects
    ↓ (Prisma query)
PostgreSQL Database
    ↓ (media upload)
S3-compatible Storage
```

## Integration with apps/web (Future)

When the backend is ready, ONLY these files change in `apps/web`:

```
features/projects/services/project.service.ts
features/services/services/service.service.ts
```

Zero UI component changes are required.
This is the key architectural guarantee of the service layer pattern.

## When to Start

Implement the backend when:
1. Phase 02 (public website UI) is complete
2. The client is ready to manage content themselves
3. Image upload requirements are confirmed
