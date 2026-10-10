'use client'

import React, { useState, useEffect } from 'react'
import {
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Compass,
  History,
  Building2,
} from 'lucide-react'
import type { AboutContentState, AboutHeroContent, AboutVisionContent } from '@/types/about'
import type { Milestone } from '@dar-elmashrq/types'
import { mockAboutContentAdapter } from '@/services/aboutContent.service'

export function AboutContentEditor() {
  const [activeTab, setActiveTab] = useState<'hero' | 'vision' | 'history'>('hero')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  // Form states
  const [heroForm, setHeroForm] = useState<AboutHeroContent | null>(null)
  const [visionForm, setVisionForm] = useState<AboutVisionContent | null>(null)
  const [historyForm, setHistoryForm] = useState<Milestone[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await mockAboutContentAdapter.getAboutContent()
      setHeroForm(data.hero)
      setVisionForm(data.vision)
      setHistoryForm(data.history)
      setIsDirty(false)
    } catch {
      setErrorMessage('Failed to load About page content.')
    } finally {
      setLoading(false)
    }
  }

  const handleHeroChange = (field: keyof AboutHeroContent, value: string) => {
    if (!heroForm) return
    setHeroForm({ ...heroForm, [field]: value })
    setIsDirty(true)
    setSuccessMessage(null)
  }

  const handleVisionChange = (field: keyof AboutVisionContent, value: string) => {
    if (!visionForm) return
    setVisionForm({ ...visionForm, [field]: value })
    setIsDirty(true)
    setSuccessMessage(null)
  }

  const handleHistoryChange = (index: number, field: keyof Milestone, value: string) => {
    const updated = [...historyForm]
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: value }
      setHistoryForm(updated)
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
        if (!heroForm.headline.trim()) {
          setErrorMessage('Headline is required.')
          setSaving(false)
          return
        }
        await mockAboutContentAdapter.updateAboutHero(heroForm)
      } else if (activeTab === 'vision' && visionForm) {
        await mockAboutContentAdapter.updateAboutVision(visionForm)
      } else if (activeTab === 'history') {
        await mockAboutContentAdapter.updateMilestones(historyForm)
      }

      setIsDirty(false)
      setSuccessMessage('About Us content saved successfully to Mock Storage.')
    } catch {
      setErrorMessage('Error saving About Us changes.')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = async () => {
    if (confirm('Reset About Us section to corporate profile defaults?')) {
      await mockAboutContentAdapter.resetToDefault()
      await loadData()
      setSuccessMessage('Reset to corporate profile defaults.')
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-sm border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#123C82] border-t-transparent" />
          <span>Loading About Us content...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-sm border border-slate-200 bg-white p-5 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">About Us Content Manager</h2>
            <span className="rounded-xs bg-[#123C82]/10 px-2 py-0.5 text-xs font-semibold text-[#123C82]">
              Phase 02 Active
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Manage company vision, mission statement, historical milestones, and corporate profile narratives.
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
            data-testid="save-about-button"
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

      {/* Alerts */}
      {successMessage && (
        <div
          data-testid="about-success-alert"
          className="flex items-center gap-2 rounded-xs border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-800"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div
          data-testid="about-error-alert"
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
          data-testid="tab-about-hero"
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'hero'
              ? 'border-[#123C82] text-[#123C82]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>1. Hero &amp; Intro</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('vision')}
          data-testid="tab-about-vision"
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'vision'
              ? 'border-[#123C82] text-[#123C82]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>2. Vision &amp; Mission</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          data-testid="tab-about-history"
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'history'
              ? 'border-[#123C82] text-[#123C82]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <History className="h-4 w-4" />
          <span>3. Historical Milestones ({historyForm.length})</span>
        </button>
      </div>

      {/* Tab 1: Hero */}
      {activeTab === 'hero' && heroForm && (
        <form onSubmit={handleSave} className="space-y-6 rounded-b-sm border border-t-0 border-slate-200 bg-white p-6 shadow-2xs">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="aboutHeadline" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Primary Headline *
              </label>
              <input
                id="aboutHeadline"
                data-testid="about-headline-input"
                type="text"
                value={heroForm.headline}
                onChange={(e) => handleHeroChange('headline', e.target.value)}
                className="w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none focus:ring-1 focus:ring-[#123C82]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="aboutTagline" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Sub-Tagline *
              </label>
              <input
                id="aboutTagline"
                type="text"
                value={heroForm.tagline}
                onChange={(e) => handleHeroChange('tagline', e.target.value)}
                className="w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none focus:ring-1 focus:ring-[#123C82]"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="aboutBadge" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Kicker Badge
              </label>
              <input
                id="aboutBadge"
                type="text"
                value={heroForm.badge}
                onChange={(e) => handleHeroChange('badge', e.target.value)}
                className="w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none focus:ring-1 focus:ring-[#123C82]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="aboutDesc" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Main Enterprise Narrative
              </label>
              <textarea
                id="aboutDesc"
                rows={4}
                value={heroForm.description}
                onChange={(e) => handleHeroChange('description', e.target.value)}
                className="w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none focus:ring-1 focus:ring-[#123C82]"
              />
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Vision & Mission */}
      {activeTab === 'vision' && visionForm && (
        <form onSubmit={handleSave} className="space-y-6 rounded-b-sm border border-t-0 border-slate-200 bg-white p-6 shadow-2xs">
          <div className="space-y-6">
            <div className="rounded-sm border border-slate-200 bg-slate-50/50 p-5 space-y-3">
              <label htmlFor="visionTitle" className="block text-xs font-bold uppercase tracking-wider text-[#123C82]">
                Official Vision Statement (PDF Page 6 Confirmed)
              </label>
              <input
                id="visionTitle"
                type="text"
                value={visionForm.visionTitle}
                onChange={(e) => handleVisionChange('visionTitle', e.target.value)}
                className="w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2 text-sm font-bold text-slate-900"
              />
              <textarea
                rows={4}
                value={visionForm.visionDescription}
                onChange={(e) => handleVisionChange('visionDescription', e.target.value)}
                className="w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800"
              />
            </div>

            <div className="rounded-sm border border-slate-200 bg-slate-50/50 p-5 space-y-3">
              <label htmlFor="missionTitle" className="block text-xs font-bold uppercase tracking-wider text-[#BA9563]">
                Corporate Mission Statement
              </label>
              <input
                id="missionTitle"
                type="text"
                value={visionForm.missionTitle}
                onChange={(e) => handleVisionChange('missionTitle', e.target.value)}
                className="w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2 text-sm font-bold text-slate-900"
              />
              <textarea
                rows={4}
                value={visionForm.missionDescription}
                onChange={(e) => handleVisionChange('missionDescription', e.target.value)}
                className="w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800"
              />
            </div>
          </div>
        </form>
      )}

      {/* Tab 3: History Milestones */}
      {activeTab === 'history' && (
        <div className="space-y-4 rounded-b-sm border border-t-0 border-slate-200 bg-white p-6 shadow-2xs">
          <div className="grid gap-4 md:grid-cols-2">
            {historyForm.map((item, idx) => (
              <div key={idx} className="rounded-sm border border-slate-200 bg-slate-50/60 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-xs bg-[#123C82] px-2 py-0.5 text-xs font-bold text-white">
                    {item.year}
                  </span>
                  <span className="text-[11px] font-semibold text-[#BA9563]">{item.badge}</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600">Era Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleHistoryChange(idx, 'title', e.target.value)}
                    className="mt-1 w-full rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600">Era Title (Arabic)</label>
                  <input
                    type="text"
                    value={item.titleAr || ''}
                    onChange={(e) => handleHistoryChange(idx, 'titleAr', e.target.value)}
                    className="mt-1 w-full rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 text-right"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600">Historical Description</label>
                  <textarea
                    rows={3}
                    value={item.description}
                    onChange={(e) => handleHistoryChange(idx, 'description', e.target.value)}
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
