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

let mediaState: AdminMediaContent = JSON.parse(JSON.stringify(INITIAL_MEDIA_CONTENT))

export const mockMediaAdapter = {
  getMediaContent: async (): Promise<AdminMediaContent> => {
    return new Promise((resolve) => setTimeout(() => resolve(mediaState), 150))
  },
  uploadAsset: async (fileData: Partial<MediaAsset>): Promise<MediaAsset> => {
    return new Promise((resolve) => {
      setTimeout(() => {
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
        mediaState.assets.unshift(newAsset)
        mediaState.updatedAt = new Date().toISOString()
        resolve(newAsset)
      }, 200)
    })
  },
  updateAsset: async (id: string, updates: Partial<MediaAsset>): Promise<MediaAsset> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = mediaState.assets.findIndex((a) => a.id === id)
        const current = mediaState.assets[idx]
        if (idx === -1 || !current) {
          reject(new Error('Asset not found'))
          return
        }
        const updated: MediaAsset = { ...current, ...updates }
        mediaState.assets[idx] = updated
        mediaState.updatedAt = new Date().toISOString()
        resolve(updated)
      }, 150)
    })
  },
  deleteAsset: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mediaState.assets = mediaState.assets.filter((a) => a.id !== id)
        mediaState.updatedAt = new Date().toISOString()
        resolve(true)
      }, 150)
    })
  },
  resetToDefault: async (): Promise<AdminMediaContent> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mediaState = JSON.parse(JSON.stringify(INITIAL_MEDIA_CONTENT))
        resolve(mediaState)
      }, 150)
    })
  },
}
