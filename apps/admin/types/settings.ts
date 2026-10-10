export interface SiteSettings {
  siteName: string
  siteNameAr: string
  tagline: string
  taglineAr: string
  defaultLocale: 'ar' | 'en'
  maintenanceMode: boolean
  seo: {
    defaultMetaTitle: string
    defaultMetaTitleAr: string
    defaultMetaDescription: string
    defaultMetaDescriptionAr: string
    keywords: string[]
  }
  branding: {
    primaryNavyHex: string
    goldAccentHex: string
    logoUrl: string
    faviconUrl: string
  }
  analytics: {
    enableGoogleAnalytics: boolean
    gaMeasurementId: string
  }
  security: {
    allowPublicCertificatesDownload: boolean
    maxUploadSizeMb: number
  }
  updatedAt: string
}
