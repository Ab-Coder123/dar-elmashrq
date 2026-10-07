# Data Flow Architecture

## Phase 01 & 02 Flow (Static Mock Data)

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Page as Next.js Page (RSC)
    participant Service as Project Service (project.service.ts)
    participant Util as Filter Utility (filterProjects)
    participant Data as Static Data Contract (projects.data.ts)

    User->>Page: Requests /projects?country=saudi-arabia
    Page->>Service: getProjects({ country: 'saudi-arabia' })
    Service->>Data: getAllProjects()
    Data-->>Service: Project[]
    Service->>Util: filterProjects(projects, filters)
    Util-->>Service: Filtered ProjectSummary[]
    Service-->>Page: ProjectSummary[]
    Page-->>User: Renders Project Cards HTML
```

---

## Phase 03 Flow (Future Backend & API Integration)

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Page as Next.js Page (RSC)
    participant Service as Project Service (project.service.ts)
    participant API as Backend API (NestJS)
    participant DB as PostgreSQL Database

    User->>Page: Requests /projects?country=saudi-arabia
    Page->>Service: getProjects({ country: 'saudi-arabia' })
    Service->>API: GET /api/v1/projects?country=saudi-arabia
    API->>DB: Prisma Query (Indexed SQL)
    DB-->>API: Project records
    API-->>Service: JSON response (PaginatedResponse<ProjectSummary>)
    Service-->>Page: ProjectSummary[]
    Page-->>User: Renders Project Cards HTML
```

### Key Architectural Benefit
Notice that in both sequence diagrams, **Step 1 and Step 6 are identical**. The UI (`Page` and UI presentation components) does not care whether the data comes from a local static contract or an external NestJS API.
