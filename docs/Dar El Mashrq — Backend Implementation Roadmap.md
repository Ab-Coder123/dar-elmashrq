# Dar El Mashrq — Backend Implementation Roadmap

## Project Context

Build the backend for the official Dar El Mashrq General Construction website and its existing Admin Dashboard.

### Existing Project Structure

- `apps/web` — Public company website
- `apps/admin` — Existing Admin Dashboard
- `backend/` — Backend application to be implemented
- `packages/` — Shared packages, if already configured
- `docs/` — Project documentation
- `.agents/AGENTS.md` — Project-specific development rules

> **Important:** Inspect the actual repository before making architectural decisions. Do not assume a framework, database, package manager, or existing API until verified.

## Core Requirements

- Single-company CMS, not a multi-tenant SaaS.
- No public user registration.
- Admin authentication and authorization must be implemented securely.
- Public website content must come from the backend once integration is complete.
- Admin Dashboard must manage website content through authenticated APIs.
- Do not invent company information, project names, project details, or credentials.
- Do not expose private company information, credentials, passwords, or bank details.
- Use reusable modules, clear separation of concerns, validation, and consistent error handling.
- Preserve the existing monorepo structure and coding conventions.
- Never claim a feature works unless it has been implemented and tested.

---

# Phase 01 — Backend Foundation & Architecture

## Objectives

Establish a reliable backend foundation that fits the existing repository.

## Tasks

- Inspect the repository, package manager, scripts, and existing applications.
- Inspect `.agents/AGENTS.md` and existing project documentation.
- Choose or confirm the backend framework based on the repository and project requirements.
- Configure environment variables and environment validation.
- Establish the application entry point and server startup process.
- Configure request parsing, CORS, security headers, and centralized error handling.
- Add request logging and a health-check endpoint.
- Create a modular folder structure for routes, controllers, services, validation, configuration, and database access.
- Add development, test, and production scripts.
- Document local setup and required environment variables.

## Deliverables

- Backend starts successfully.
- Environment configuration is documented.
- Health endpoint responds successfully.
- Architecture and module boundaries are documented.

## Testing & Acceptance

- [ ] Backend starts in development mode.
- [ ] Health endpoint returns the expected response.
- [ ] Missing or invalid environment variables are handled clearly.
- [ ] CORS behavior is tested.
- [ ] Centralized error handling is tested.
- [ ] Unit tests, lint, type-check, and build pass where configured.

**Stop condition:** Do not begin Phase 02 until the foundation is verified.

---

# Phase 02 — Database & Content Models

## Objectives

Design the data layer for the company's website and CMS.

## Tasks

- Select and configure the database after inspecting project constraints.
- Implement database connection management.
- Create schemas/models and migrations or equivalent database setup where applicable.
- Define reusable validation schemas and content types.
- Model the following content:
  - Home Page sections
  - About Us
  - Services
  - Projects
  - Media Library
  - Contact Information
  - Global Site Settings
  - SEO Metadata
  - Admin Users and roles
- Support project countries:
  - Saudi Arabia
  - Egypt
  - Qatar
- Support project categories, descriptions, locations, services, images, and source references when available.
- Support draft and published states where required.
- Add timestamps and appropriate indexes.
- Define how image references and content relationships are stored.
- Add a safe, documented process for creating the first admin user.
- Avoid inserting fabricated company content into seed data.

## Deliverables

- Database connection works.
- Models and validation rules are documented.
- Relationships and content ownership are defined.
- Safe development seed/setup process exists.

## Testing & Acceptance

- [ ] Database connection succeeds and failures are handled.
- [ ] Models accept valid data.
- [ ] Invalid data is rejected.
- [ ] Required relationships and constraints are tested.
- [ ] Duplicate or invalid records are handled appropriately.
- [ ] Draft and published states are tested where implemented.
- [ ] Test data is isolated from production data.

**Stop condition:** Do not begin Phase 03 until the content model is tested and stable.

---

# Phase 03 — Home Page API

## Objectives

Allow the public website to retrieve Home Page content and the Admin Dashboard to manage it.

## Tasks

- Implement public endpoints for published Home Page content.
- Implement protected admin endpoints for reading and updating Home Page content.
- Support the Home Page sections actually used by the frontend.
- Support section visibility, ordering, and editable content where applicable.
- Validate all incoming payloads.
- Prevent unauthorized users from modifying content.
- Define cache behavior and cache invalidation where applicable.
- Keep the API contract aligned with the existing Home Page UI.

## Deliverables

- Public Home Page API.
- Protected Home Page management API.
- Request and response schemas.
- API documentation.

## Testing & Acceptance

- [ ] Public endpoint returns published content.
- [ ] Draft content is not exposed publicly.
- [ ] Admin updates persist correctly.
- [ ] Invalid payloads return appropriate errors.
- [ ] Unauthorized mutations are rejected.
- [ ] Section ordering and visibility work as designed.
- [ ] API integration tests pass.

**Stop condition:** Verify the Home Page API before moving to Phase 04.

---

# Phase 04 — About Us API

## Objectives

Manage the official company profile through the backend.

## Tasks

- Implement a public endpoint for published About Us content.
- Implement protected admin endpoints for reading and updating About Us.
- Support company introduction, history, vision, mission, and other sections only where supported by the approved company content.
- Support images and media references.
- Validate content and enforce publishing rules.
- Preserve approved company wording and factual accuracy.

## Deliverables

- Public About Us API.
- Protected About Us management API.
- Validation schemas and API documentation.

## Testing & Acceptance

- [ ] Published content is returned correctly.
- [ ] Admin changes persist.
- [ ] Unsupported or invalid fields are rejected.
- [ ] Unauthorized users cannot update content.
- [ ] Media references are validated.
- [ ] Automated tests pass.

**Stop condition:** Verify the About Us API before moving to Phase 05.

---

# Phase 05 — Services API

## Objectives

Allow administrators to manage the company's services and display approved services publicly.

## Tasks

- Implement public endpoints for published services.
- Implement protected admin CRUD endpoints for services.
- Support fields such as title, description, image, display order, and publication status where required.
- Use approved service information from the company profile.
- Validate service data and media references.
- Support sorting and visibility controls.
- Define deletion behavior for services referenced elsewhere.

## Deliverables

- Public Services API.
- Protected Services management API.
- Service validation and documentation.

## Testing & Acceptance

- [ ] Create, read, update, and delete operations work as intended.
- [ ] Public endpoints exclude unpublished services.
- [ ] Sorting and visibility work correctly.
- [ ] Invalid payloads are rejected.
- [ ] Referenced records are handled safely.
- [ ] Authorization and regression tests pass.

**Stop condition:** Verify the Services API before moving to Phase 06.

---

# Phase 06 — Projects API

## Objectives

Build the API for the unified Projects page and project-detail overlay.

## Tasks

- Implement public endpoints for published projects.
- Implement protected admin CRUD endpoints for projects.
- Support filtering by:
  - All countries
  - Saudi Arabia
  - Egypt
  - Qatar
- Support project fields when available:
  - Project name
  - Country
  - Location
  - Category
  - Year
  - Description
  - Services
  - Scope of work
  - Images and gallery
  - Source reference
  - Publication status
- Support pagination or other appropriate listing strategies.
- Support ordering and featured-project selection where required by the UI.
- Support project-detail retrieval.
- Do not invent missing project details or fabricate image associations.
- Validate project data and image references.

## Deliverables

- Public project listing API.
- Public project-detail API.
- Protected project management API.
- Country filters and documented response schemas.

## Testing & Acceptance

- [ ] Project listing works.
- [ ] Each country filter returns the correct results.
- [ ] Project details match the requested project.
- [ ] Pagination and sorting work where implemented.
- [ ] Draft projects are hidden from public endpoints.
- [ ] Project image relationships are correct.
- [ ] CRUD validation and authorization tests pass.

**Stop condition:** Verify project listing, filtering, and detail retrieval before moving to Phase 07.

---

# Phase 07 — Media Library API

## Objectives

Provide a reliable media-management system for website content and projects.

## Tasks

- Choose a media storage provider based on deployment and project requirements.
- Keep uploaded files outside the application server's temporary filesystem when persistent storage is required.
- Implement protected upload, list, retrieve, and delete operations.
- Support media metadata such as filename, MIME type, file size, dimensions where available, alt text, and storage reference.
- Validate file types and file sizes.
- Generate safe file names and handle upload errors.
- Enforce authorization for uploads and destructive operations.
- Prevent deletion of media that is still referenced, or provide a safe replacement workflow.
- Keep provider credentials in environment variables.
- Do not store large image binaries directly in database records unless explicitly justified.

## Deliverables

- Media storage integration.
- Protected Media Library API.
- Upload validation and media metadata.
- Documented storage configuration.

## Testing & Acceptance

- [ ] Valid uploads succeed.
- [ ] Invalid file types are rejected.
- [ ] Oversized files are rejected.
- [ ] Upload failures are handled correctly.
- [ ] Media metadata is stored correctly.
- [ ] Unauthorized upload/delete attempts are rejected.
- [ ] Referenced media cannot be accidentally removed.
- [ ] Storage integration tests pass.

**Stop condition:** Verify upload, retrieval, and safe deletion behavior before moving to Phase 08.

---

# Phase 08 — Contact, Global Settings & SEO APIs

## Objectives

Manage the company's contact information, global website settings, and search metadata.

## Tasks

- Implement public endpoints for approved contact information.
- Implement protected admin endpoints for updating contact information.
- Manage public company details, such as:
  - Official website
  - Official email
  - Approved business phone numbers
  - Approved office location
  - Social links, if verified and provided
- Implement global site settings required by the frontend.
- Implement SEO metadata management for supported pages.
- Validate URLs, email addresses, phone fields, and metadata.
- Keep private operational details and financial information out of public responses.
- If a contact form is implemented, validate submissions and apply abuse protection such as rate limiting.
- Do not expose admin-only settings through public endpoints.

## Deliverables

- Public contact and site-settings endpoints.
- Protected settings-management endpoints.
- SEO metadata API.
- Contact-form API only if required by the product.

## Testing & Acceptance

- [ ] Public endpoints return only approved fields.
- [ ] Admin updates persist.
- [ ] Invalid contact information is rejected.
- [ ] Private fields are never exposed publicly.
- [ ] SEO metadata validation works.
- [ ] Contact-form abuse protections are tested if applicable.
- [ ] Authorization and regression tests pass.

**Stop condition:** Verify public/private field separation before moving to Phase 09.

---

# Phase 09 — Authentication, Authorization & Publishing

## Objectives

Secure the Admin Dashboard and define a reliable publishing workflow.

## Tasks

- Implement secure admin authentication.
- Provide a safe first-admin creation process.
- Define roles and permissions appropriate for a single-company CMS.
- Protect every admin mutation endpoint.
- Apply authorization checks at the API/service layer, not only in the frontend.
- Implement secure session or token handling appropriate to the chosen architecture.
- Add login rate limiting and appropriate security protections.
- Define password hashing and credential-reset procedures if password authentication is used.
- Implement draft, publish, and unpublish workflows where required.
- Record audit information for important content changes where appropriate.
- Ensure the public API exposes published content only.
- Do not add public signup.
- Do not implement fake authentication or rely on frontend-only route guards.

## Deliverables

- Working admin authentication.
- Server-enforced authorization.
- Publishing workflow.
- Security configuration and documentation.

## Testing & Acceptance

- [ ] Valid admin credentials work.
- [ ] Invalid credentials are rejected.
- [ ] Unauthenticated admin requests are rejected.
- [ ] Unauthorized roles cannot perform restricted operations.
- [ ] Passwords and tokens are not leaked in responses or logs.
- [ ] Session/token expiry and logout behavior are tested.
- [ ] Draft content remains private.
- [ ] Publishing makes approved content publicly available.
- [ ] Security tests pass.

**Stop condition:** Do not integrate the Admin Dashboard as production-ready until authentication and authorization are verified.

---

# Phase 10 — Frontend Integration, End-to-End Testing & Deployment

## Objectives

Connect the Public Website and existing Admin Dashboard to the completed backend and prepare the system for deployment.

## Tasks

- Create or finalize a centralized typed API client.
- Integrate `apps/web` with public endpoints.
- Integrate `apps/admin` with authenticated management endpoints.
- Define consistent loading, empty, success, and error states.
- Handle expired authentication and API failures.
- Configure environment variables separately for local, preview, and production environments.
- Configure CORS for the actual deployed origins.
- Configure database and media-storage production settings.
- Add request timeouts and appropriate retry behavior where safe.
- Document database backup and recovery procedures.
- Configure production logging and health monitoring.
- Prepare deployment instructions for the backend and its dependencies.
- Verify that no secrets are committed to the repository.
- Verify that public pages work on direct navigation and refresh.
- Document the final API contract and known limitations.

## Deliverables

- Integrated public website.
- Integrated Admin Dashboard.
- Tested production configuration.
- Deployment and recovery documentation.
- Final implementation report.

## Testing & Acceptance

- [ ] Backend unit and integration tests pass.
- [ ] Frontend and Admin Dashboard builds pass.
- [ ] Public pages load data from the backend.
- [ ] Admin CRUD operations persist to the database.
- [ ] Authentication and publishing work end to end.
- [ ] Project filters and project details work correctly.
- [ ] Media upload and rendering work in the deployed environment.
- [ ] Error, loading, empty, and unauthorized states work.
- [ ] CORS and production environment configuration are verified.
- [ ] Smoke tests pass against the deployed backend.
- [ ] No secrets are exposed in client bundles or repository files.
- [ ] All known failures and blocked tests are documented.

**Stop condition:** Declare the backend ready only after the required tests and deployment checks have actually passed.

---

# Rules for Every Phase

For every phase, follow this exact workflow:

1. **Inspect** — Read the current implementation, repository instructions, and relevant documentation.
2. **Plan** — List the intended changes and files before implementing.
3. **Implement** — Complete only the current phase.
4. **Test** — Add and run appropriate unit, integration, or end-to-end tests.
5. **Verify** — Run relevant lint, type-check, and build commands available in the repository.
6. **Report** — Summarize changed files, endpoints, tests executed, and results.
7. **Stop** — Do not start the next phase without explicit approval.

## Required Phase Report

At the end of each phase, provide:

- Phase number and title
- What was implemented
- Files created or modified
- Endpoints and data models added
- Tests added and commands executed
- Actual test results: PASS or FAIL
- Any known issues or missing dependencies
- Any security concerns
- Whether the phase acceptance criteria are satisfied
- The exact next phase, without implementing it

## Final Architecture Principle

The backend is the source of truth for persistent website content. The Admin Dashboard manages content through protected APIs, while the public website consumes approved published content through public APIs. A mock adapter may be used temporarily during UI development, but it must never be represented as real backend persistence.
