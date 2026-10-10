import type { AdminMediaContent, MediaAsset } from '@/types/media'

export const INITIAL_MEDIA_CONTENT: AdminMediaContent = {
  assets: [
    {
      id: 'med-01',
      filename: 'beverly-al-azeeza.jpg',
      title: 'Beverly Al-Azeeza Facade',
      titleAr: 'واجهة بيفرلي العزيزية',
      category: 'projects',
      url: '/images/projects/beverly-al-azeeza.jpg',
      fileSize: '2.4 MB',
      mimeType: 'image/jpeg',
      dimensions: { width: 1920, height: 1080 },
      uploadedAt: '2026-09-15T10:00:00Z',
      altText: 'Beverly Al-Azeeza Facade in Al-Azeeza',
      altTextAr: 'واجهة مشروع بيفرلي العزيزية الجديدة',
      isPublic: true,
      usageCount: 3,
    },
    {
      id: 'med-02',
      filename: 'way-care-hospital.jpg',
      title: 'Way Care Hospital Exterior',
      titleAr: 'المبنى الخارجي لمستشفى وي كير',
      category: 'projects',
      url: '/images/projects/way-care-hospital.jpg',
      fileSize: '3.1 MB',
      mimeType: 'image/jpeg',
      dimensions: { width: 2048, height: 1536 },
      uploadedAt: '2026-09-20T14:30:00Z',
      altText: 'Way Care Medical Hospital Building',
      altTextAr: 'مستشفى وي كير الطبي بالسعودية',
      isPublic: true,
      usageCount: 2,
    },
    {
      id: 'med-03',
      filename: 'iso-9001-certificate.pdf',
      title: 'ISO 9001 Quality Management Cert',
      titleAr: 'شهادة الأيزو 9001 لنظم إدارة الجودة',
      category: 'certificates',
      url: '/docs/certificates/iso-9001.pdf',
      fileSize: '1.2 MB',
      mimeType: 'application/pdf',
      uploadedAt: '2026-08-10T11:15:00Z',
      altText: 'ISO 9001 Quality Certification',
      altTextAr: 'شهادة الجودة العالمية ISO 9001',
      isPublic: true,
      usageCount: 1,
    },
    {
      id: 'med-04',
      filename: 'bank-iban-confirmation-letter.pdf',
      title: 'Official Bank IBAN Letter',
      titleAr: 'خطاب الآيبان البنكي المعتمد',
      category: 'certificates',
      url: '/docs/private/iban-letter.pdf',
      fileSize: '850 KB',
      mimeType: 'application/pdf',
      uploadedAt: '2026-07-01T09:00:00Z',
      altText: 'Bank IBAN Official Letter (Private)',
      altTextAr: 'خطاب الحساب البنكي الرسمي (خاص بالشركة)',
      isPublic: false, // Security compliance: strictly private
      usageCount: 0,
    },
    {
      id: 'med-05',
      filename: 'dar-elmashrq-logo-navy.png',
      title: 'Dar ElMashrq Main Logo - Navy',
      titleAr: 'الشعار الرئيسي لدار المشرق - كحلي',
      category: 'branding',
      url: '/images/branding/logo-navy.png',
      fileSize: '420 KB',
      mimeType: 'image/png',
      dimensions: { width: 800, height: 600 },
      uploadedAt: '2026-06-01T12:00:00Z',
      altText: 'Dar ElMashrq Corporate Logo',
      altTextAr: 'شعار شركة دار المشرق للتجارة والمقاولات',
      isPublic: true,
      usageCount: 12,
    },
  ],
  totalSizeFormatted: '7.97 MB',
  updatedAt: new Date().toISOString(),
}

import { adminApiClient } from '../lib/api'

let mediaState: AdminMediaContent = JSON.parse(JSON.stringify(INITIAL_MEDIA_CONTENT))

export const mockMediaAdapter = {
  getMediaContent: async (): Promise<AdminMediaContent> => {
    try {
      const res = await adminApiClient<{ items: any[]; total: number } | AdminMediaContent>('/admin/media')
      const items = res && 'items' in res ? res.items : (res && 'assets' in res ? res.assets : null)
      if (items && Array.isArray(items)) {
        mediaState = {
          assets: items.map((it: any) => ({
            id: String(it.id),
            filename: it.filename || 'asset.jpg',
            title: it.title || it.filename || 'Media Asset',
            titleAr: it.titleAr || it.filename || 'ملف وسائط',
            category: it.category || 'general',
            url: it.url || it.storageKey ? `/uploads/${it.storageKey}` : '/images/general/placeholder.jpg',
            fileSize: it.fileSize || `${Math.round((it.sizeBytes || 1024000) / 1024 / 1024 * 10) / 10} MB`,
            mimeType: it.mimeType || 'image/jpeg',
            dimensions: it.dimensions || (it.width ? { width: it.width, height: it.height || 1080 } : undefined),
            uploadedAt: it.createdAt || it.uploadedAt || new Date().toISOString(),
            altText: it.altText || '',
            altTextAr: it.altTextAr || '',
            isPublic: it.isPublic ?? true,
            usageCount: it.usageCount || 0,
          })),
          totalSizeFormatted: '8.5 MB',
          updatedAt: new Date().toISOString(),
        }
        return JSON.parse(JSON.stringify(mediaState))
      }
    } catch {
      // Fallback
    }
    return JSON.parse(JSON.stringify(mediaState))
  },

  uploadAsset: async (fileData: Partial<MediaAsset>): Promise<MediaAsset> => {
    const newAsset: MediaAsset = {
      id: `med-${Date.now()}`,
      filename: fileData.filename || 'uploaded-file.jpg',
      title: fileData.title || 'New Media Asset',
      titleAr: fileData.titleAr || 'ملف وسائط جديد',
      category: fileData.category || 'general',
      url: fileData.url || '/images/general/placeholder.jpg',
      fileSize: fileData.fileSize || '1.5 MB',
      mimeType: fileData.mimeType || 'image/jpeg',
      dimensions: fileData.dimensions || { width: 1280, height: 720 },
      uploadedAt: new Date().toISOString(),
      altText: fileData.altText || '',
      altTextAr: fileData.altTextAr || '',
      isPublic: fileData.isPublic ?? true,
      usageCount: 0,
    }

    try {
      const res = await adminApiClient<{ item: any }>('/admin/media', {
        method: 'POST',
        body: JSON.stringify({
          storageKey: `uploads/media-${Date.now()}-${newAsset.filename}`,
          filename: newAsset.filename,
          mimeType: newAsset.mimeType as any,
          sizeBytes: 1500000,
          width: newAsset.dimensions?.width,
          height: newAsset.dimensions?.height,
          altText: newAsset.altText,
          altTextAr: newAsset.altTextAr,
          category: newAsset.category,
          isPublic: newAsset.isPublic,
        }),
      })
      if (res && res.item) {
        newAsset.id = String(res.item.id)
      }
    } catch {
      // Fallback
    }

    mediaState.assets.unshift(newAsset)
    mediaState.updatedAt = new Date().toISOString()
    return JSON.parse(JSON.stringify(newAsset))
  },

  updateAsset: async (id: string, updates: Partial<MediaAsset>): Promise<MediaAsset> => {
    const idx = mediaState.assets.findIndex((a) => a.id === id)
    const current = mediaState.assets[idx]
    if (idx === -1 || !current) {
      throw new Error('Asset not found')
    }
    const updated: MediaAsset = { ...current, ...updates }
    mediaState.assets[idx] = updated
    mediaState.updatedAt = new Date().toISOString()

    try {
      await adminApiClient(`/admin/media/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          filename: updated.filename,
          altText: updated.altText,
          altTextAr: updated.altTextAr,
          category: updated.category,
          isPublic: updated.isPublic,
        }),
      })
    } catch {
      // Fallback
    }

    return JSON.parse(JSON.stringify(updated))
  },

  deleteAsset: async (id: string): Promise<boolean> => {
    mediaState.assets = mediaState.assets.filter((a) => a.id !== id)
    mediaState.updatedAt = new Date().toISOString()

    try {
      await adminApiClient(`/admin/media/${id}`, {
        method: 'DELETE',
      })
    } catch {
      // Fallback
    }

    return true
  },

  resetToDefault: async (): Promise<AdminMediaContent> => {
    mediaState = JSON.parse(JSON.stringify(INITIAL_MEDIA_CONTENT))
    return JSON.parse(JSON.stringify(mediaState))
  },
}
