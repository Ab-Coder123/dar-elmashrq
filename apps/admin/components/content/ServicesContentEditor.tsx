'use client'

import React, { useState, useEffect } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Layers,
  ArrowUp,
  ArrowDown,
  X,
} from 'lucide-react'
import type { AdminServiceItem } from '@/types/services'
import { mockServicesAdapter } from '@/services/servicesContent.service'

export function ServicesContentEditor() {
  const [services, setServices] = useState<AdminServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Edit/Create Modal State
  const [editingItem, setEditingItem] = useState<AdminServiceItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    setLoading(true)
    try {
      const data = await mockServicesAdapter.getServices()
      setServices(data.sort((a, b) => a.order - b.order))
    } catch {
      setErrorMessage('فشل في تحميل قائمة الخدمات.')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenEdit = (service: AdminServiceItem) => {
    setEditingItem({ ...service })
    setIsCreating(false)
    setSuccessMessage(null)
    setErrorMessage(null)
  }

  const handleOpenCreate = () => {
    setEditingItem({
      id: '',
      slug: '',
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      icon: 'Briefcase',
      order: services.length + 1,
      status: 'published',
      specCode: `SPEC: DM-${(services.length + 1).toString().padStart(2, '0')}`,
    })
    setIsCreating(true)
    setSuccessMessage(null)
    setErrorMessage(null)
  }

  const handleCloseModal = () => {
    setEditingItem(null)
    setIsCreating(false)
  }

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return

    if (!editingItem.name.trim() || !editingItem.slug.trim()) {
      setErrorMessage('يرجى كتابة اسم الخدمة والـ Slug بشكل صحيح.')
      return
    }

    setSaving(true)
    try {
      if (isCreating) {
        await mockServicesAdapter.createService(editingItem)
        setSuccessMessage('تم إضافة الخدمة الجديدة بنجاح.')
      } else {
        await mockServicesAdapter.updateService(editingItem.id, editingItem)
        setSuccessMessage('تم تحديث بيانات الخدمة بنجاح.')
      }
      await loadServices()
      handleCloseModal()
    } catch {
      setErrorMessage('حدث خطأ أثناء حفظ الخدمة.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف الخدمة "${name}"؟`)) {
      try {
        await mockServicesAdapter.deleteService(id)
        setSuccessMessage(`تم حذف خدمة "${name}" بنجاح.`)
        await loadServices()
      } catch {
        setErrorMessage('فشل في عملية الحذف.')
      }
    }
  }

  const handleReset = async () => {
    if (confirm('هل تريد استعادة قائمة الخدمات الأصلية الـ 8 المعتمدة من بروفايل الشركة؟')) {
      await mockServicesAdapter.resetToDefault()
      await loadServices()
      setSuccessMessage('تمت استعادة الخدمات الافتراضية بنجاح.')
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-sm border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#123C82] border-t-transparent" />
          <span>جاري تحميل بيانات الخدمات الهندسية...</span>
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
            <h2 className="text-lg font-bold text-slate-900">إدارة الخدمات الهندسية (Services CRUD)</h2>
            <span className="rounded-xs bg-[#123C82]/10 px-2 py-0.5 text-xs font-semibold text-[#123C82]">
              {services.length} تخصصات نشطة
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            إضافة وتعديل وترتيب التخصصات الهندسية وأعمال المقاولات المدنية والكهروميكانيكية.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
            <span>استعادة الافتراضي</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            data-testid="add-service-button"
            className="inline-flex items-center gap-2 rounded-sm bg-[#123C82] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0d2e6a] transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة خدمة جديدة</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div
          data-testid="service-success-alert"
          className="flex items-center gap-2 rounded-xs border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-800"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div
          data-testid="service-error-alert"
          className="flex items-center gap-2 rounded-xs border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800"
        >
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Services Table / Grid */}
      <div className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-3.5">الترتيب والكود</th>
              <th className="px-6 py-3.5">اسم الخدمة (En / Ar)</th>
              <th className="px-6 py-3.5">الوصف المختصر</th>
              <th className="px-6 py-3.5">الحالة</th>
              <th className="px-6 py-3.5 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-xs bg-slate-100 text-xs font-bold text-slate-700">
                      {item.order}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{item.specCode}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{item.name}</div>
                  <div className="text-xs text-slate-400">{item.nameAr}</div>
                </td>
                <td className="px-6 py-4 max-w-xs truncate text-xs text-slate-500">
                  {item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-xs bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                    منشور
                  </span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      data-testid={`edit-service-${item.id}`}
                      className="rounded-xs border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                      title="تعديل الخدمة"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.name)}
                      data-testid={`delete-service-${item.id}`}
                      className="rounded-xs border border-red-200 p-1.5 text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors"
                      title="حذف الخدمة"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl rounded-sm border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="text-base font-bold text-slate-900">
                {isCreating ? 'إضافة خدمة هندسية جديدة' : `تعديل خدمة: ${editingItem.name}`}
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-xs p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700">اسم الخدمة (English) *</label>
                  <input
                    type="text"
                    required
                    data-testid="service-name-input"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">اسم الخدمة (بالعربية) *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.nameAr || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, nameAr: e.target.value })}
                    className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 text-right focus:border-[#123C82] focus:outline-none"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700">المعرف البرمجي (Slug) *</label>
                  <input
                    type="text"
                    required
                    data-testid="service-slug-input"
                    value={editingItem.slug}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">رقم الترتيب</label>
                  <input
                    type="number"
                    value={editingItem.order}
                    onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value, 10) || 1 })}
                    className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">الوصف بالإنجليزية</label>
                <textarea
                  rows={2}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-[#123C82] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">الوصف بالعربية</label>
                <textarea
                  rows={2}
                  value={editingItem.descriptionAr || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, descriptionAr: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-xs text-slate-800 text-right focus:border-[#123C82] focus:outline-none"
                  dir="rtl"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-sm border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSaveModal}
                  data-testid="save-service-modal-button"
                  className="rounded-sm bg-[#123C82] px-5 py-2 text-xs font-semibold text-white hover:bg-[#0d2e6a]"
                >
                  {saving ? 'جاري الحفظ...' : 'حفظ الخدمة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
