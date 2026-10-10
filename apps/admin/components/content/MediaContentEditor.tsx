'use client'

import React, { useState, useEffect } from 'react'
import {
  FolderOpen,
  Upload,
  Search,
  Filter,
  Trash2,
  Edit2,
  Lock,
  Globe,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  X,
  Eye,
  ShieldAlert,
} from 'lucide-react'
import type { AdminMediaContent, MediaAsset, MediaCategory } from '@/types/media'
import { mockMediaAdapter } from '@/services/mediaContent.service'

export function MediaContentEditor() {
  const [data, setData] = useState<AdminMediaContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    title: '',
    titleAr: '',
    category: 'projects' as MediaCategory,
    filename: '',
    altText: '',
    altTextAr: '',
    isPublic: true,
  })

  // Edit Metadata Modal State
  const [editingAsset, setEditingAsset] = useState<MediaAsset | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await mockMediaAdapter.getMediaContent()
      setData(res)
    } catch {
      setErrorMessage('فشل في تحميل مكتبة الوسائط.')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenUpload = () => {
    setUploadForm({
      title: '',
      titleAr: '',
      category: 'projects',
      filename: '',
      altText: '',
      altTextAr: '',
      isPublic: true,
    })
    setIsUploadModalOpen(true)
    setSuccessMessage(null)
    setErrorMessage(null)
  }

  const handleSimulateUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadForm.titleAr.trim()) {
      setErrorMessage('يرجى كتابة عنوان الملف بالعربية.')
      return
    }

    setSaving(true)
    try {
      const created = await mockMediaAdapter.uploadAsset({
        title: uploadForm.title || uploadForm.titleAr,
        titleAr: uploadForm.titleAr,
        category: uploadForm.category,
        filename: uploadForm.filename || `file-${Date.now()}.jpg`,
        altText: uploadForm.altText,
        altTextAr: uploadForm.altTextAr,
        isPublic: uploadForm.isPublic,
        url: `/images/${uploadForm.category}/${uploadForm.filename || 'uploaded.jpg'}`,
        mimeType: uploadForm.filename?.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
      })
      await loadData()
      setIsUploadModalOpen(false)
      setSuccessMessage(`تم رفع الملف "${created.titleAr}" بنجاح إلى المكتبة.`)
    } catch {
      setErrorMessage('حدث خطأ أثناء رفع الملف.')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveMetadata = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingAsset) return
    setSaving(true)
    try {
      await mockMediaAdapter.updateAsset(editingAsset.id, editingAsset)
      await loadData()
      setEditingAsset(null)
      setSuccessMessage('تم تحديث بيانات الملف بنجاح.')
    } catch {
      setErrorMessage('حدث خطأ أثناء تحديث بيانات الملف.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAsset = async (id: string, nameAr: string) => {
    if (!confirm(`هل أنت متأكد من حذف الملف "${nameAr}"؟`)) return
    setSaving(true)
    try {
      await mockMediaAdapter.deleteAsset(id)
      await loadData()
      setSuccessMessage('تم حذف الملف من المكتبة بنجاح.')
    } catch {
      setErrorMessage('حدث خطأ أثناء حذف الملف.')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = async () => {
    if (!confirm('هل تريد استعادة مكتبة الوسائط الافتراضية؟')) return
    setSaving(true)
    try {
      const res = await mockMediaAdapter.resetToDefault()
      setData(res)
      setSuccessMessage('تمت استعادة المكتبة الافتراضية بنجاح.')
    } catch {
      setErrorMessage('حدث خطأ أثناء استعادة المكتبة.')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !data) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#123C82] border-t-transparent" />
          <span>جاري تحميل مكتبة الوسائط...</span>
        </div>
      </div>
    )
  }

  // Filter Assets
  const filteredAssets = data.assets.filter((asset) => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      asset.titleAr.toLowerCase().includes(query) ||
      asset.title.toLowerCase().includes(query) ||
      asset.filename.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#123C82]/10 text-[#123C82]">
            <FolderOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">مكتبة الوسائط والمستندات الرقمية</h1>
              <span className="rounded-full bg-[#123C82]/10 px-2.5 py-0.5 text-xs font-semibold text-[#123C82]">
                {data.assets.length} ملف
              </span>
            </div>
            <p className="text-sm text-slate-500">
              إدارة صور المشاريع، شعارات الشركة، الشهادات الرسمية وحماية المستندات المخصصة للمعاينة الداخلية فقط.
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
            type="button"
            onClick={handleOpenUpload}
            className="flex items-center gap-2 rounded-lg bg-[#123C82] px-4 py-2 text-sm font-medium text-white hover:bg-[#123C82]/90"
          >
            <Upload className="h-4 w-4" />
            رفع ملف جديد
          </button>
        </div>
      </div>

      {/* Security Compliance Notice */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
        <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold">تنبيه أمان وامتثال المستندات:</p>
          <p>
            تأكد من ضبط المستندات الحساسة (مثل خطاب الحساب البنكي IBAN) على خيار{' '}
            <span className="font-bold underline">"غير متاح للعامة (Private)"</span> لمنع ظهور روابطها بشكل علني على الموقع الرئيسي.
          </p>
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

      {/* Controls Bar: Search & Category Filter */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="بحث بالاسم أو اسم الملف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pr-9 pl-4 text-sm focus:border-[#123C82] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          {[
            { id: 'all', label: 'الكل' },
            { id: 'projects', label: 'المشاريع' },
            { id: 'services', label: 'الخدمات' },
            { id: 'certificates', label: 'الشهادات' },
            { id: 'branding', label: 'الهوية البصرية' },
            { id: 'general', label: 'عام' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id as MediaCategory | 'all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#123C82] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className={`group relative flex flex-col justify-between rounded-xl border bg-white p-4 shadow-xs transition-all hover:shadow-md ${
              !asset.isPublic ? 'border-amber-300 bg-amber-50/30' : 'border-slate-200'
            }`}
          >
            <div>
              {/* Card Header Preview Icon */}
              <div className="relative mb-3 flex h-36 w-full items-center justify-center rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                {asset.mimeType.includes('pdf') ? (
                  <div className="flex flex-col items-center gap-2 text-slate-500">
                    <FileText className="h-10 w-10 text-rose-500" />
                    <span className="text-xs font-mono font-semibold">PDF Document</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <ImageIcon className="h-10 w-10 text-[#123C82]" />
                    <span className="text-xs font-mono">{asset.filename}</span>
                  </div>
                )}

                {/* Privacy Badge */}
                <span
                  className={`absolute top-2 left-2 flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    asset.isPublic ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {asset.isPublic ? (
                    <>
                      <Globe className="h-3 w-3" />
                      عام
                    </>
                  ) : (
                    <>
                      <Lock className="h-3 w-3 text-amber-700" />
                      خاص (Private)
                    </>
                  )}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{asset.titleAr}</h3>
              <p className="text-xs text-slate-400 font-mono line-clamp-1 mb-2">{asset.filename}</p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>الحجم: {asset.fileSize}</span>
                <span>استخدام: {asset.usageCount} مرات</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                {asset.category}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingAsset({ ...asset })}
                  className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 hover:text-[#123C82]"
                  title="تعديل البيانات"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteAsset(asset.id, asset.titleAr)}
                  className="rounded-lg p-1.5 text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                  title="حذف"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-center">
          <FolderOpen className="h-10 w-10 text-slate-300 mb-2" />
          <p className="text-sm font-semibold text-slate-600">لا توجد ملفات تطابق الفلتر المSelected.</p>
        </div>
      )}

      {/* Upload File Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">رفع ملف جديد لمكتبة الوسائط</h3>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSimulateUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">اسم الملف / المستند بالعربية</label>
                <input
                  type="text"
                  required
                  value={uploadForm.titleAr}
                  onChange={(e) => setUploadForm({ ...uploadForm, titleAr: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
                  placeholder="مثال: صورة مشروع برج السماعيل"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">اسم الملف بالإنجليزية (اختياري)</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
                  placeholder="e.g. Al-Smaeel Tower Image"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">تصنيف الوسائط</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value as MediaCategory })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
                  >
                    <option value="projects">المشاريع</option>
                    <option value="services">الخدمات</option>
                    <option value="certificates">الشهادات</option>
                    <option value="branding">الهوية البصرية</option>
                    <option value="general">عام</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">اسم الملف الفعلي (Filename)</label>
                  <input
                    type="text"
                    value={uploadForm.filename}
                    onChange={(e) => setUploadForm({ ...uploadForm, filename: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-mono focus:border-[#123C82] focus:outline-none"
                    placeholder="project-01.jpg"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <input
                  type="checkbox"
                  id="isPublicUpload"
                  checked={uploadForm.isPublic}
                  onChange={(e) => setUploadForm({ ...uploadForm, isPublic: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-[#123C82] focus:ring-[#123C82]"
                />
                <label htmlFor="isPublicUpload" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  متاح للجمهور على الموقع العام (Publicly Visible)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#123C82] px-5 py-2 text-sm font-medium text-white hover:bg-[#123C82]/90 disabled:opacity-50"
                >
                  {saving ? 'جاري الرفع...' : 'رفع للمكتبة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editingAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">تعديل بيانات الملف: {editingAsset.filename}</h3>
              <button
                type="button"
                onClick={() => setEditingAsset(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMetadata} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">عنوان الملف بالعربية</label>
                <input
                  type="text"
                  required
                  value={editingAsset.titleAr}
                  onChange={(e) => setEditingAsset({ ...editingAsset, titleAr: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">النص البديل (Alt Text Arabic)</label>
                <input
                  type="text"
                  value={editingAsset.altTextAr || ''}
                  onChange={(e) => setEditingAsset({ ...editingAsset, altTextAr: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <input
                  type="checkbox"
                  id="isPublicEdit"
                  checked={editingAsset.isPublic}
                  onChange={(e) => setEditingAsset({ ...editingAsset, isPublic: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-[#123C82] focus:ring-[#123C82]"
                />
                <label htmlFor="isPublicEdit" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  إتاحة الملف علنياً للمشاهدة على الموقع العام
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingAsset(null)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#123C82] px-5 py-2 text-sm font-medium text-white hover:bg-[#123C82]/90 disabled:opacity-50"
                >
                  حفظ التغييرات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
