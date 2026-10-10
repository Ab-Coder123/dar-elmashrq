import type { Db } from '../../infrastructure/database/db'
import {
  createProjectsRepository,
  type ProjectRecord,
  type ProjectLinkedService,
  type ProjectLinkedImage,
} from './projects.repository'
import {
  projectInputSchema,
  updateProjectSchema,
  patchProjectStatusSchema,
  reorderProjectsSchema,
  type ProjectInput,
  type UpdateProjectInput,
  type PatchProjectStatusInput,
  type ReorderProjectsInput,
  type ProjectQueryInput,
} from './projects.schemas'

export interface ProjectDto {
  id: number
  slug: string
  name: string
  nameAr: string | null
  country: 'saudi-arabia' | 'egypt' | 'qatar'
  location: string | null
  locationAr: string | null
  category: string
  year: number | null
  description: string | null
  descriptionAr: string | null
  scope: string | null
  scopeAr: string | null
  sourceReference: string | null
  clientName: string | null
  isFeatured: boolean
  displayOrder: number
  status: 'draft' | 'published'
  coverImageId: number | null
  coverImageStorageKey: string | null
  publishedAt: Date | string | null
  createdAt: Date | string
  updatedAt: Date | string
  serviceSlugs: string[]
  imageIds: number[]
  services: ProjectLinkedService[]
  galleryImages: ProjectLinkedImage[]
}

function parseJsonField<T>(val: T[] | string | undefined | null): T[] {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') {
    try {
      return JSON.parse(val) as T[]
    } catch {
      return []
    }
  }
  return []
}

function mapToDto(row: ProjectRecord): ProjectDto {
  return {
    id: Number(row.id),
    slug: row.slug,
    name: row.name,
    nameAr: row.name_ar ?? null,
    country: row.country,
    location: row.location ?? null,
    locationAr: row.location_ar ?? null,
    category: row.category,
    year: row.year ? Number(row.year) : null,
    description: row.description ?? null,
    descriptionAr: row.description_ar ?? null,
    scope: row.scope ?? null,
    scopeAr: row.scope_ar ?? null,
    sourceReference: row.source_reference ?? null,
    clientName: row.client_name ?? null,
    isFeatured: row.is_featured,
    displayOrder: row.display_order,
    status: row.status,
    coverImageId: row.cover_image_id ? Number(row.cover_image_id) : null,
    coverImageStorageKey: row.cover_image_storage_key ?? null,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    serviceSlugs: row.service_slugs ?? [],
    imageIds: (row.image_ids ?? []).map(Number),
    services: parseJsonField<ProjectLinkedService>(row.services),
    galleryImages: parseJsonField<ProjectLinkedImage>(row.gallery_images),
  }
}

export function createProjectsService(db: Db) {
  const repo = createProjectsRepository(db)

  return {
    async getPublicProjects(query: ProjectQueryInput) {
      const result = await repo.list({
        country: query.country,
        category: query.category,
        isFeatured: query.featured,
        search: query.search,
        publishedOnly: true,
        page: query.page,
        pageSize: query.pageSize,
      })

      return {
        items: result.items.map(mapToDto),
        total: result.total,
        page: query.page,
        pageSize: query.pageSize,
        totalPages: Math.ceil(result.total / query.pageSize),
      }
    },

    async getFeaturedProjects() {
      const result = await repo.list({
        isFeatured: true,
        publishedOnly: true,
        pageSize: 10,
      })
      return result.items.map(mapToDto)
    },

    async getPublicProjectBySlug(slug: string): Promise<ProjectDto> {
      const record = await repo.findBySlug(slug, true)
      return mapToDto(record)
    },

    async getAdminProjects(query: ProjectQueryInput) {
      const result = await repo.list({
        country: query.country,
        category: query.category,
        isFeatured: query.featured,
        search: query.search,
        status: query.status,
        publishedOnly: false,
        page: query.page,
        pageSize: query.pageSize,
      })

      return {
        items: result.items.map(mapToDto),
        total: result.total,
        page: query.page,
        pageSize: query.pageSize,
        totalPages: Math.ceil(result.total / query.pageSize),
      }
    },

    async getAdminProjectById(id: number): Promise<ProjectDto> {
      const record = await repo.getById(id)
      return mapToDto(record)
    },

    async createProject(raw: ProjectInput, _userId?: number): Promise<ProjectDto> {
      const validated = projectInputSchema.parse(raw)
      const record = await repo.create(validated)
      return mapToDto(record)
    },

    async updateProject(
      id: number,
      raw: UpdateProjectInput,
      _userId?: number
    ): Promise<ProjectDto> {
      const validated = updateProjectSchema.parse(raw)
      const record = await repo.update(id, validated)
      return mapToDto(record)
    },

    async patchProjectStatus(
      id: number,
      raw: PatchProjectStatusInput,
      _userId?: number
    ): Promise<ProjectDto> {
      const { status } = patchProjectStatusSchema.parse(raw)
      const record = await repo.setStatus(id, status)
      return mapToDto(record)
    },

    async reorderProjects(raw: ReorderProjectsInput): Promise<void> {
      const { items } = reorderProjectsSchema.parse(raw)
      await repo.reorder(items)
    },

    async deleteProject(id: number, _userId?: number): Promise<void> {
      await repo.remove(id)
    },
  }
}
