'use client'

import React, { useState, useEffect } from 'react'
import {
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  Layers,
  Sparkles,
  Building,
  Image as ImageIcon,
} from 'lucide-react'
import type { HomeContentState, HomeHeroContent, HomeWhyPillar } from '@/types/home'
import type { HomeStat } from '@dar-elmashrq/types'
import { mockHomeContentAdapter } from '@/services/homeContent.service'

export function HomeContentEditor() {
  const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'why' | 'hubs'>('hero')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  // Local form state
  const [heroForm, setHeroForm] = useState<HomeHeroContent | null>(null)
  const [statsForm, setStatsForm] = useState<HomeStat[]>([])
  const [whyForm, setWhyForm] = useState<HomeWhyPillar[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await mockHomeContentAdapter.getHomeContent()
      setHeroForm(data.hero)
      setStatsForm(data.stats)
      setWhyForm(data.whyPillars)
      setIsDirty(false)
    } catch {
      setErrorMessage('Failed to load home content state.')
    } finally {
      setLoading(false)
    }
  }

  const handleHeroChange = (field: keyof HomeHeroContent, value: string) => {
    if (!heroForm) return
    setHeroForm({ ...heroForm, [field]: value })
    setIsDirty(true)
    setSuccessMessage(null)
  }

  const handleStatChange = (index: number, field: keyof HomeStat, value: string) => {
    const updated = [...statsForm]
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: value }
      setStatsForm(updated)
      setIsDirty(true)
      setSuccessMessage(null)
    }
  }

  const handleWhyChange = (index: number, field: keyof HomeWhyPillar, value: string) => {
    const updated = [...whyForm]
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: value }
      setWhyForm(updated)
      setIsDirty(true)
      setSuccessMessage(null)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      if (activeTab === 'hero' && heroForm) {
        // Validation
        if (!heroForm.headline.trim()) {
          setErrorMessage('Headline is required.')
          setSaving(false)
          return
        }
        await mockHomeContentAdapter.updateHomeHero(heroForm)
      } else if (activeTab === 'stats') {
        await mockHomeContentAdapter.updateHomeStats(statsForm)
      } else if (activeTab === 'why') {
        await mockHomeContentAdapter.updateWhyPillars(whyForm)
      }

      setIsDirty(false)
      setSuccessMessage('Changes saved successfully to Mock Storage (Development Mode).')
    } catch {
      setErrorMessage('Error saving changes.')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all Home sections to default corporate profile values?')) {
      await mockHomeContentAdapter.resetToDefault()
      await loadData()
      setSuccessMessage('Reset to corporate profile defaults.')
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-sm border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#123C82] border-t-transparent" />
          <span>Loading Home Page schema &amp; data...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-sm border border-slate-200 bg-white p-5 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Home Page Content Manager</h2>
            <span className="rounded-xs bg-[#123C82]/10 px-2 py-0.5 text-xs font-semibold text-[#123C82]">
              Phase 02 Active
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Control live content for the Hero section, Why Dar ElMashrq pillars, and key statistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !isDirty}
            data-testid="save-home-button"
            className={`inline-flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-semibold shadow-xs transition-colors ${
              isDirty
                ? 'bg-[#123C82] text-white hover:bg-[#0d2e6a]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Feedback Alerts */}
      {successMessage && (
        <div
          data-testid="success-alert"
          className="flex items-center gap-2 rounded-xs border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-800"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div
          data-testid="error-alert"
          className="flex items-center gap-2 rounded-xs border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800"
        >
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-t-sm shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          data-testid="tab-hero"
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'hero'
              ? 'border-[#123C82] text-[#123C82]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>1. Hero Section</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('stats')}
          data-testid="tab-stats"
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'stats'
              ? 'border-[#123C82] text-[#123C82]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>2. Stats Counter ({statsForm.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('why')}
          data-testid="tab-why"
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'why'
              ? 'border-[#123C82] text-[#123C82]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building className="h-4 w-4" />
          <span>3. Why Dar ElMashrq ({whyForm.length})</span>
        </button>
      </div>

      {/* Tab 1: Hero Form */}
      {activeTab === 'hero' && heroForm && (
        <form onSubmit={handleSave} className="space-y-6 rounded-b-sm border border-t-0 border-slate-200 bg-white p-6 shadow-2xs">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="headline" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Primary Headline (English) *
              </label>
              <input
                id="headline"
                data-testid="hero-headline-input"
                type="text"
                value={heroForm.headline}
                onChange={(e) => handleHeroChange('headline', e.target.value)}
                className="w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none focus:ring-1 focus:ring-[#123C82]"
                placeholder="DAR EL MASHRQ"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tagline" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Sub-Tagline *
              </label>
              <input
                id="tagline"
                data-testid="hero-tagline-input"
                type="text"
                value={heroForm.tagline}
                onChange={(e) => handleHeroChange('tagline', e.target.value)}
                className="w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none focus:ring-1 focus:ring-[#123C82]"
                placeholder="Architectural Precision. Sovereign Scale."
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="badge" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Badge / Top Kicker Label
              </label>
              <input
                id="badge"
                type="text"
                value={heroForm.badge}
                onChange={(e) => handleHeroChange('badge', e.target.value)}
                className="w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none focus:ring-1 focus:ring-[#123C82]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="bodyCopy" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Narrative Body Paragraph
              </label>
              <textarea
                id="bodyCopy"
                rows={3}
                value={heroForm.bodyCopy}
                onChange={(e) => handleHeroChange('bodyCopy', e.target.value)}
                className="w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none focus:ring-1 focus:ring-[#123C82]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="heroImage" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Hero Background Image URL
              </label>
              <div className="flex gap-2">
                <input
                  id="heroImage"
                  type="text"
                  value={heroForm.heroImage}
                  onChange={(e) => handleHeroChange('heroImage', e.target.value)}
                  className="w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none focus:ring-1 focus:ring-[#123C82]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="exploreCtaText" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Primary CTA Button Label
              </label>
              <input
                id="exploreCtaText"
                type="text"
                value={heroForm.exploreCtaText}
                onChange={(e) => handleHeroChange('exploreCtaText', e.target.value)}
                className="w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none focus:ring-1 focus:ring-[#123C82]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="aboutCtaText" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Secondary CTA Button Label
              </label>
              <input
                id="aboutCtaText"
                type="text"
                value={heroForm.aboutCtaText}
                onChange={(e) => handleHeroChange('aboutCtaText', e.target.value)}
                className="w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none focus:ring-1 focus:ring-[#123C82]"
              />
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Stats Counter */}
      {activeTab === 'stats' && (
        <div className="space-y-4 rounded-b-sm border border-t-0 border-slate-200 bg-white p-6 shadow-2xs">
          <div className="grid gap-4 md:grid-cols-2">
            {statsForm.map((stat, idx) => (
              <div key={idx} className="rounded-sm border border-slate-200 bg-slate-50/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#123C82]">Statistic #{idx + 1}</span>
                  <span className="text-[11px] font-semibold text-slate-400">PDF Confirmed</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600">Metric Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                      className="mt-1 w-full rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-sm font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600">Label (English)</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                      className="mt-1 w-full rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600">Label (Arabic)</label>
                  <input
                    type="text"
                    value={stat.labelAr || ''}
                    onChange={(e) => handleStatChange(idx, 'labelAr', e.target.value)}
                    className="mt-1 w-full rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 text-right"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600">Description</label>
                  <input
                    type="text"
                    value={stat.description}
                    onChange={(e) => handleStatChange(idx, 'description', e.target.value)}
                    className="mt-1 w-full rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Why Dar ElMashrq Pillars */}
      {activeTab === 'why' && (
        <div className="space-y-4 rounded-b-sm border border-t-0 border-slate-200 bg-white p-6 shadow-2xs">
          <div className="grid gap-4 md:grid-cols-2">
            {whyForm.map((pillar, idx) => (
              <div key={pillar.id} className="rounded-sm border border-slate-200 bg-slate-50/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#BA9563]">{pillar.code}</span>
                  <span className="text-[11px] font-medium text-slate-400">Pillar #{idx + 1}</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600">Pillar Title</label>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => handleWhyChange(idx, 'title', e.target.value)}
                    className="mt-1 w-full rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600">Detailed Description</label>
                  <textarea
                    rows={3}
                    value={pillar.description}
                    onChange={(e) => handleWhyChange(idx, 'description', e.target.value)}
                    className="mt-1 w-full rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
