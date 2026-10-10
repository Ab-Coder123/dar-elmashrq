export type MediaCategory = 'projects' | 'services' | 'certificates' | 'branding' | 'general'

export interface MediaAsset {
  id: string
  filename: string
  title: string
  titleAr: string
  category: MediaCategory
  url: string
  thumbnailUrl?: string
  fileSize: string
  mimeType: string
  dimensions?: { width: number; height: number }
  uploadedAt: string
  altText: string
  altTextAr?: string
  /**
   * Sensitive document boundary flag.
   * IBAN Letter & internal compliance files MUST be set to false.
   */
  isPublic: boolean
  usageCount: number
}

export interface AdminMediaContent {
  assets: MediaAsset[]
  totalSizeFormatted: string
  updatedAt: string
}
