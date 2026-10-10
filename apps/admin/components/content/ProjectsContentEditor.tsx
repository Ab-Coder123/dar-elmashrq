'use client'

import React, { useState, useEffect } from 'react'
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Star,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  MapPin,
  FolderGit2,
} from 'lucide-react'
import type { Project, Country, ProjectCategory } from '@dar-elmashrq/types'
import { PROJECT_CATEGORIES, COUNTRIES } from '@dar-elmashrq/types'
import type { ProjectFormData, AdminProjectFilters } from '@/types/projects'
import { mockAdminProjectsAdapter } from '@/services/projectsContent.service'

export function ProjectsContentEditor() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Filters State
  const [filters, setFilters] = useState<AdminProjectFilters>({
    country: 'all',
    category: 'all',
    search: '',
  })

  // Modal State
  const [editingProject, setEditingProject] = useState<ProjectFormData | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [filters])

  const loadProjects = async () => {
    setLoading(true)
    try {
      const data = await mockAdminProjectsAdapter.getProjects(filters)
      setProjects(data)
    } catch {
      setErrorMessage('فشل في تحميل المشاريع.')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenEdit = (project: Project) => {
    setEditingProject({ ...project })
    setIsCreating(false)
    setSuccessMessage(null)
    setErrorMessage(null)
  }

  const handleOpenCreate = () => {
    setEditingProject({
      name: '',
      nameAr: '',
      slug: '',
      country: 'saudi-arabia',
      location: '',
      locationAr: '',
      category: 'commercial',
      year: new Date().getFullYear(),
      description: '',
      descriptionAr: '',
      scope: '',
      scopeAr: '',
      services: ['Civil Works', 'Finishing'],
      images: [],
      isFeatured: false,
      order: 1,
    })
    setIsCreating(true)
    setSuccessMessage(null)
    setErrorMessage(null)
  }

  const handleCloseModal = () => {
    setEditingProject(null)
    setIsCreating(false)
  }

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject) return

    if (!editingProject.name.trim() || !editingProject.location.trim()) {
      setErrorMessage('يرجى تعبئة الحقول الأساسية المطلوبة.')
      return
    }

    setSaving(true)
    try {
      if (isCreating) {
        await mockAdminProjectsAdapter.createProject(editingProject)
        setSuccessMessage('تمت إضافة المشروع الجديد بنجاح.')
      } else if (editingProject.id) {
        await mockAdminProjectsAdapter.updateProject(editingProject.id, editingProject)
        setSuccessMessage('تم تحديث بيانات المشروع بنجاح.')
      }
      await loadProjects()
      handleCloseModal()
    } catch {
      setErrorMessage('حدث خطأ أثناء حفظ المشروع.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف المشروع "${name}" نهائياً من الـ Mock؟`)) {
      try {
        await mockAdminProjectsAdapter.deleteProject(id)
        setSuccessMessage(`تم حذف مشروع "${name}" بنجاح.`)
        await loadProjects()
      } catch {
        setErrorMessage('فشل في عملية الحذف.')
      }
    }
  }

  const handleToggleFeatured = async (project: Project) => {
    try {
      await mockAdminProjectsAdapter.updateProject(project.id, {
        isFeatured: !project.isFeatured,
      })
      await loadProjects()
      setSuccessMessage(`تم ${!project.isFeatured ? 'تمييز' : 'إلغاء تمييز'} المشروع بنجاح.`)
    } catch {
      setErrorMessage('فشل في تعديل حالة التمييز.')
    }
  }

  const handleReset = async () => {
    if (confirm('هل تريد استعادة جميع مشاريع محفظة الشركة الـ 29 الأصلية المعتمدة؟')) {
      await mockAdminProjectsAdapter.resetToDefault()
      await loadProjects()
      setSuccessMessage('تمت استعادة المحفظة الأصلية بنجاح.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-sm border border-slate-200 bg-white p-5 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">إدارة محفظة المشاريع (Projects Portfolio CRUD)</h2>
            <span className="rounded-xs bg-[#123C82]/10 px-2 py-0.5 text-xs font-semibold text-[#123C82]">
              {projects.length} مشاريع معروضة
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            إضافة وتعديل وحذف وتصنيف المشاريع في المملكة العربية السعودية ومصر ودولة قطر.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
            <span>استعادة الافتراضي (29)</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            data-testid="add-project-button"
            className="inline-flex items-center gap-2 rounded-sm bg-[#123C82] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0d2e6a] transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة مشروع جديد</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div
          data-testid="project-success-alert"
          className="flex items-center gap-2 rounded-xs border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-800"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div
          data-testid="project-error-alert"
          className="flex items-center gap-2 rounded-xs border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800"
        >
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="grid gap-3 sm:grid-cols-3 rounded-sm border border-slate-200 bg-white p-4 shadow-2xs">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            data-testid="project-search-input"
            placeholder="بحث باسم المشروع أو الموقع..."
            value={filters.search || ''}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full rounded-sm border border-slate-300 py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-[#123C82] focus:outline-none"
          />
        </div>

        {/* Country Filter */}
        <div>
          <select
            data-testid="project-country-filter"
            value={filters.country}
            onChange={(e) => setFilters({ ...filters, country: e.target.value as any })}
            className="w-full rounded-sm border border-slate-300 py-2 px-3 text-xs text-slate-900 focus:border-[#123C82] focus:outline-none"
          >
            <option value="all">جميع الدول (All Countries)</option>
            <option value="saudi-arabia">السعودية (Saudi Arabia)</option>
            <option value="egypt">مصر (Egypt)</option>
            <option value="qatar">قطر (Qatar)</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            data-testid="project-category-filter"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value as any })}
            className="w-full rounded-sm border border-slate-300 py-2 px-3 text-xs text-slate-900 focus:border-[#123C82] focus:outline-none"
          >
            <option value="all">جميع القطاعات والتصنيفات</option>
            {Object.entries(PROJECT_CATEGORIES).map(([key, value]) => (
              <option key={key} value={key}>
                {value.labelAr} ({value.label})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-2xs">
        {loading ? (
          <div className="flex h-64 items-center justify-center p-6 text-sm text-slate-500">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#123C82] border-t-transparent mr-2" />
            <span>جاري تحميل بيانات المشاريع...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            لا توجد مشاريع تطابق خيارات التصفية الحالية.
          </div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3.5">المشروع</th>
                <th className="px-6 py-3.5">الدولة والموقع</th>
                <th className="px-6 py-3.5">القطاع</th>
                <th className="px-6 py-3.5 text-center">مميز</th>
                <th className="px-6 py-3.5 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{project.name}</div>
                    <div className="text-xs text-slate-400">{project.nameAr}</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">{project.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs text-slate-700">
                      <MapPin className="h-3.5 w-3.5 text-[#BA9563]" />
                      <span>{project.location}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase mt-0.5">
                      {project.country.replace('-', ' ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-xs bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                      {PROJECT_CATEGORIES[project.category]?.label || project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(project)}
                      className={`p-1.5 rounded-xs transition-colors ${
                        project.isFeatured
                          ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                          : 'text-slate-300 hover:text-slate-500'
                      }`}
                      title={project.isFeatured ? 'مشروع مميز على الرئيسية' : 'غير مميز'}
                    >
                      <Star className="h-4 w-4 fill-current" />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(project)}
                        data-testid={`edit-project-${project.slug}`}
                        className="rounded-xs border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        title="تعديل المشروع"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project.id, project.name)}
                        data-testid={`delete-project-${project.slug}`}
                        className="rounded-xs border border-red-200 p-1.5 text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors"
                        title="حذف المشروع"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-sm border border-slate-200 bg-white p-6 shadow-xl my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="text-base font-bold text-slate-900">
                {isCreating ? 'إضافة مشروع جديد إلى المحفظة' : `تعديل مشروع: ${editingProject.name}`}
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
                  <label className="block text-xs font-bold text-slate-700">اسم المشروع (English) *</label>
                  <input
                    type="text"
                    required
                    data-testid="project-name-input"
                    value={editingProject.name}
                    onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                    className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">اسم المشروع (بالعربية)</label>
                  <input
                    type="text"
                    value={editingProject.nameAr || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, nameAr: e.target.value })}
                    className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 text-right focus:border-[#123C82] focus:outline-none"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700">الدولة *</label>
                  <select
                    value={editingProject.country}
                    onChange={(e) => setEditingProject({ ...editingProject, country: e.target.value as Country })}
                    className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none"
                  >
                    <option value="saudi-arabia">Saudi Arabia (المملكة)</option>
                    <option value="egypt">Egypt (مصر)</option>
                    <option value="qatar">Qatar (قطر)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">المدينة / المنطقة *</label>
                  <input
                    type="text"
                    required
                    data-testid="project-location-input"
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">القطاع والتصنيف *</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })
                    }
                    className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none"
                  >
                    {Object.entries(PROJECT_CATEGORIES).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.label} ({val.labelAr})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700">المعرف البرمجي (Slug)</label>
                  <input
                    type="text"
                    value={editingProject.slug || ''}
                    placeholder="يتم توليده تلقائياً إن ترك فارغاً"
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">سنة التنفيذ</label>
                  <input
                    type="number"
                    value={editingProject.year || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        year: parseInt(e.target.value, 10) || undefined,
                      })
                    }
                    className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#123C82] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">نطاق العمل والتفاصيل (Scope of Work)</label>
                <textarea
                  rows={2}
                  value={editingProject.scope || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, scope: e.target.value })}
                  className="mt-1 w-full rounded-sm border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-[#123C82] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheckbox"
                  checked={editingProject.isFeatured}
                  onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                  className="rounded-xs text-[#123C82]"
                />
                <label htmlFor="featuredCheckbox" className="text-xs font-semibold text-slate-700">
                  تمييز المشروع وعرضه في الصفحة الرئيسية (Featured Project)
                </label>
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
                  data-testid="save-project-modal-button"
                  className="rounded-sm bg-[#123C82] px-5 py-2 text-xs font-semibold text-white hover:bg-[#0d2e6a]"
                >
                  {saving ? 'جاري الحفظ...' : 'حفظ المشروع'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
