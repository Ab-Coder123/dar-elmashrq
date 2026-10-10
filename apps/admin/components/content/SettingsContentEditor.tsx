'use client'

import React, { useState, useEffect } from 'react'
import {
  Settings,
  Globe,
  Palette,
  Search,
  Shield,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  BarChart,
  Lock,
} from 'lucide-react'
import type { SiteSettings } from '@/types/settings'
import { mockSettingsAdapter } from '@/services/settingsContent.service'

export function SettingsContentEditor() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const data = await mockSettingsAdapter.getSettings()
      setSettings(data)
    } catch {
      setErrorMessage('فشل في تحميل إعدادات النظام والموقع.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return

    setSaving(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      await mockSettingsAdapter.updateSettings(settings)
      setSuccessMessage('تم حفظ إعدادات الموقع والنظام بنجاح.')
    } catch {
      setErrorMessage('حدث خطأ أثناء حفظ الإعدادات.')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = async () => {
    if (!confirm('هل أنت متأكد من رغبتك في استعادة الإعدادات الافتراضية للنظام؟')) return

    setSaving(true)
    try {
      const data = await mockSettingsAdapter.resetToDefault()
      setSettings(data)
      setSuccessMessage('تمت استعادة الإعدادات الافتراضية بنجاح.')
    } catch {
      setErrorMessage('حدث خطأ أثناء استعادة الإعدادات.')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !settings) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#123C82] border-t-transparent" />
          <span>جاري تحميل إعدادات النظام...</span>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#123C82]/10 text-[#123C82]">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">إعدادات النظام والموقع العام</h1>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                النظام مكتمل
              </span>
            </div>
            <p className="text-sm text-slate-500">
              إدارة أسماء الشركة العامة، ألوان الهوية المؤسسية، إعدادات محركات البحث SEO، والتحليلات.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" />
            استعادة الافتراضي
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#123C82] px-5 py-2 text-sm font-medium text-white hover:bg-[#123C82]/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-800">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Section 1: General Identity */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Globe className="h-5 w-5 text-[#123C82]" />
          <h2 className="text-lg font-bold text-slate-900">الهوية والعناوين الأساسية للموقع</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">اسم الشركة بالعربية</label>
            <input
              type="text"
              required
              value={settings.siteNameAr}
              onChange={(e) => setSettings({ ...settings, siteNameAr: e.target.value })}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">اسم الشركة بالإنجليزية</label>
            <input
              type="text"
              required
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">الشعار اللفظي بالعربية (Tagline)</label>
            <input
              type="text"
              value={settings.taglineAr}
              onChange={(e) => setSettings({ ...settings, taglineAr: e.target.value })}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">الشعار اللفظي بالإنجليزية</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-700">اللغة الافتراضية:</label>
            <select
              value={settings.defaultLocale}
              onChange={(e) => setSettings({ ...settings, defaultLocale: e.target.value as 'ar' | 'en' })}
              className="rounded-lg border border-slate-300 p-1.5 text-xs focus:border-[#123C82] focus:outline-none"
            >
              <option value="ar">العربية (Default RTL)</option>
              <option value="en">English (LTR)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="maintMode"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-600"
            />
            <label htmlFor="maintMode" className="text-xs font-semibold text-rose-700 cursor-pointer">
              وضع الصيانة (Maintenance Mode)
            </label>
          </div>
        </div>
      </div>

      {/* Section 2: Branding Tokens */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Palette className="h-5 w-5 text-[#123C82]" />
          <h2 className="text-lg font-bold text-slate-900">ألوان وتوثيق الهوية المؤسسية (Brand Tokens)</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3 bg-slate-50">
            <div>
              <p className="text-xs font-bold text-slate-900">اللون الأزرق الكحلي (Navy Primary)</p>
              <p className="text-[11px] text-slate-500 font-mono">اللون الأساسي المعتمد في PDF الشركة</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="h-7 w-7 rounded-md border border-slate-300 shadow-xs"
                style={{ backgroundColor: settings.branding.primaryNavyHex }}
              />
              <input
                type="text"
                value={settings.branding.primaryNavyHex}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    branding: { ...settings.branding, primaryNavyHex: e.target.value },
                  })
                }
                className="w-24 rounded border border-slate-300 p-1 text-center text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3 bg-slate-50">
            <div>
              <p className="text-xs font-bold text-slate-900">اللون الذهبي/البرونزي (Gold Accent)</p>
              <p className="text-[11px] text-slate-500 font-mono">لون التمييز والأرقام المعتمد</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="h-7 w-7 rounded-md border border-slate-300 shadow-xs"
                style={{ backgroundColor: settings.branding.goldAccentHex }}
              />
              <input
                type="text"
                value={settings.branding.goldAccentHex}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    branding: { ...settings.branding, goldAccentHex: e.target.value },
                  })
                }
                className="w-24 rounded border border-slate-300 p-1 text-center text-xs font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: SEO Meta Defaults */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Search className="h-5 w-5 text-[#123C82]" />
          <h2 className="text-lg font-bold text-slate-900">إعدادات محركات البحث والتهيئة SEO</h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">عنوان الموقع للبحث بالعربية (Meta Title AR)</label>
            <input
              type="text"
              value={settings.seo.defaultMetaTitleAr}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, defaultMetaTitleAr: e.target.value },
                })
              }
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">الوصف المختصر لمحركات البحث بالعربية (Meta Description AR)</label>
            <textarea
              rows={3}
              value={settings.seo.defaultMetaDescriptionAr}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, defaultMetaDescriptionAr: e.target.value },
                })
              }
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Analytics & Security Boundaries */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <BarChart className="h-5 w-5 text-[#123C82]" />
            <h2 className="text-lg font-bold text-slate-900">التحليلات والإحصائيات</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Google Analytics Measurement ID</label>
            <input
              type="text"
              value={settings.analytics.gaMeasurementId}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  analytics: { ...settings.analytics, gaMeasurementId: e.target.value },
                })
              }
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-mono focus:border-[#123C82] focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Shield className="h-5 w-5 text-[#123C82]" />
            <h2 className="text-lg font-bold text-slate-900">الأمان وتخصيص التحميل</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allowPublicCerts"
                checked={settings.security.allowPublicCertificatesDownload}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      allowPublicCertificatesDownload: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 rounded border-slate-300 text-[#123C82] focus:ring-[#123C82]"
              />
              <label htmlFor="allowPublicCerts" className="text-xs font-semibold text-slate-700 cursor-pointer">
                السماح بتحميل ملفات الشهادات المعتمدة العامة للزوار
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">الحد الأقصى لحجم الملفات المرفوعة (ميجابايت)</label>
              <input
                type="number"
                value={settings.security.maxUploadSizeMb}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      maxUploadSizeMb: parseInt(e.target.value) || 10,
                    },
                  })
                }
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-mono focus:border-[#123C82] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
