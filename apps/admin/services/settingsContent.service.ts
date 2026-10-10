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

import { adminApiClient } from '../lib/api'

let settingsState: SiteSettings = JSON.parse(JSON.stringify(INITIAL_SITE_SETTINGS))

export const mockSettingsAdapter = {
  getSettings: async (): Promise<SiteSettings> => {
    try {
      const res = await adminApiClient<{ data: any } | SiteSettings>('/admin/settings')
      const payload = res && 'data' in res ? res.data : res
      if (payload && payload.siteName) {
        settingsState = {
          ...settingsState,
          siteName: payload.siteName || settingsState.siteName,
          siteNameAr: payload.siteNameAr || settingsState.siteNameAr,
          tagline: payload.tagline || settingsState.tagline,
          taglineAr: payload.taglineAr || settingsState.taglineAr,
          maintenanceMode: typeof payload.maintenanceMode === 'boolean' ? payload.maintenanceMode : settingsState.maintenanceMode,
          updatedAt: new Date().toISOString(),
        }
        return JSON.parse(JSON.stringify(settingsState))
      }
    } catch {
      // Fallback
    }
    return JSON.parse(JSON.stringify(settingsState))
  },

  updateSettings: async (newSettings: SiteSettings): Promise<SiteSettings> => {
    settingsState = { ...newSettings, updatedAt: new Date().toISOString() }
    try {
      await adminApiClient('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          siteName: newSettings.siteName,
          siteNameAr: newSettings.siteNameAr,
          tagline: newSettings.tagline,
          taglineAr: newSettings.taglineAr,
          foundedYear: 1994,
          officialEmail: 'info@elmashrq.com',
          phones: ['00966581605812', '00966545051136'],
          socialLinks: {
            linkedin: 'https://linkedin.com/company/dar-elmashrq',
            twitter: 'https://twitter.com/darelmashrq',
            instagram: 'https://instagram.com/darelmashrq',
          },
          headerNavigation: [
            { label: 'Home', labelAr: 'الرئيسية', href: '/', external: false },
            { label: 'About', labelAr: 'عن الشركة', href: '/about', external: false },
            { label: 'Services', labelAr: 'خدماتنا', href: '/services', external: false },
            { label: 'Projects', labelAr: 'المشاريع', href: '/projects', external: false },
            { label: 'Contact', labelAr: 'تواصل معنا', href: '/contact', external: false },
          ],
          footer: {
            copyrightText: '© 1994-2026 Dar ElMashrq Trading & Contracting. All Rights Reserved.',
            copyrightTextAr: '© 1994-2026 شركة دار المشرق للتجارة والمقاولات. جميع الحقوق محفوظة.',
            commercialRegistrationKSA: '1010199401',
            commercialRegistrationEG: '2020199402',
            taxNumber: '300099400010003',
          },
          maintenanceMode: newSettings.maintenanceMode,
          status: 'published',
        }),
      })
    } catch {
      // Fallback
    }
    return JSON.parse(JSON.stringify(settingsState))
  },

  resetToDefault: async (): Promise<SiteSettings> => {
    settingsState = JSON.parse(JSON.stringify(INITIAL_SITE_SETTINGS))
    try {
      await mockSettingsAdapter.updateSettings(settingsState)
    } catch {
      // Fallback
    }
    return JSON.parse(JSON.stringify(settingsState))
  },
}
