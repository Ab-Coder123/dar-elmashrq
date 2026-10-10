import type { SiteSettings } from '@/types/settings'

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  siteName: 'Dar ElMashrq Trading & Contracting Company',
  siteNameAr: 'شركة دار المشرق للتجارة والمقاولات',
  tagline: 'Leading Construction & Engineering Solutions Since 1994',
  taglineAr: 'حلول البناء والمقاولات الرائدة منذ عام 1994',
  defaultLocale: 'ar',
  maintenanceMode: false,
  seo: {
    defaultMetaTitle: 'Dar ElMashrq — Trading & Contracting Company',
    defaultMetaTitleAr: 'دار المشرق — شركة التجارة والمقاولات (السعودية، مصر، قطر)',
    defaultMetaDescription:
      'Dar ElMashrq Trading & Contracting Company delivering premier construction, MEP, civil works, and property development in Saudi Arabia, Egypt, and Qatar since 1994.',
    defaultMetaDescriptionAr:
      'شركة دار المشرق للتجارة والمقاولات - تقديم أحدث الأعمال المدنية، التشطيبات، الكهروميكانيكية والتطوير العقاري بالسعودية ومصر وقطر منذ 1994.',
    keywords: ['Dar ElMashrq', 'دار المشرق', 'مقاولات الرياض', 'أعمال مدنية', 'Saudi Arabia Construction', 'Egypt Real Estate'],
  },
  branding: {
    primaryNavyHex: '#123C82',
    goldAccentHex: '#BA9563',
    logoUrl: '/images/branding/logo-navy.png',
    faviconUrl: '/favicon.ico',
  },
  analytics: {
    enableGoogleAnalytics: true,
    gaMeasurementId: 'G-DM1994PROD',
  },
  security: {
    allowPublicCertificatesDownload: true,
    maxUploadSizeMb: 25,
  },
  updatedAt: new Date().toISOString(),
}

let settingsState: SiteSettings = JSON.parse(JSON.stringify(INITIAL_SITE_SETTINGS))

export const mockSettingsAdapter = {
  getSettings: async (): Promise<SiteSettings> => {
    return new Promise((resolve) => setTimeout(() => resolve(settingsState), 150))
  },
  updateSettings: async (newSettings: SiteSettings): Promise<SiteSettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        settingsState = { ...newSettings, updatedAt: new Date().toISOString() }
        resolve(settingsState)
      }, 200)
    })
  },
  resetToDefault: async (): Promise<SiteSettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        settingsState = JSON.parse(JSON.stringify(INITIAL_SITE_SETTINGS))
        resolve(settingsState)
      }, 200)
    })
  },
}
