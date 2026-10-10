import type { Project, Country, ProjectCategory } from '@dar-elmashrq/types'

export interface AdminProjectFilters {
  country?: Country | 'all'
  category?: ProjectCategory | 'all'
  status?: 'all' | 'published' | 'draft'
  search?: string
}

export interface ProjectFormData extends Omit<Project, 'id'> {
  id?: string
  status?: 'published' | 'draft'
}
