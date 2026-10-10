import type { Service } from '@dar-elmashrq/types'

export interface AdminServiceItem extends Service {
  specCode?: string
  status: 'published' | 'draft'
  disciplines?: string[]
}

export interface ServicesContentState {
  services: AdminServiceItem[]
  lastUpdated: string
}
