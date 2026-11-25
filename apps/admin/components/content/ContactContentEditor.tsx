'use client'

import React, { useState, useEffect } from 'react'
import {
  PhoneCall,
  MapPin,
  Mail,
  Building2,
  Plus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Globe,
  X,
  Star,
} from 'lucide-react'
import type { AdminContactContent, OfficeLocation } from '@/types/contact'
import { mockContactAdapter } from '@/services/contactContent.service'

export function ContactContentEditor() {
  const [data, setData] = useState<AdminContactContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Edit / Create Modal State
  const [editingOffice, setEditingOffice] = useState<OfficeLocation | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await mockContactAdapter.getContactContent()
      setData(res)
    } catch {
      setErrorMessage('فشل في تحميل بيانات الاتصال والفروع.')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenEdit = (office: OfficeLocation) => {
    setEditingOffice({ ...office })
    setIsCreating(false)
    setSuccessMessage(null)
    setErrorMessage(null)
  }

  const handleOpenCreate = () => {
    setEditingOffice({
      id: `off-${Date.now()}`,
      name: '',
      nameAr: '',
      country: 'saudi-arabia',
      city: '',
      cityAr: '',
      district: '',
      districtAr: '',
      address: '',
      addressAr: '',
      phones: [''],
      email: '',
      workingHours: 'Sun - Thu: 8:00 AM - 5:00 PM',
      workingHoursAr: 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً',
      isHeadquarters: false,
      status: 'active',
    })
    setIsCreating(true)
    setSuccessMessage(null)
    setErrorMessage(null)
  }

  const handleSaveOfficeModal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingOffice || !data) return

    if (!editingOffice.name.trim() || !editingOffice.nameAr.trim()) {
      setErrorMessage('يرجى ملء اسم الفرع بالعربية والإنجليزية.')
      return
    }

    setSaving(true)
    try {
      await mockContactAdapter.saveOffice(editingOffice)
      await loadData()
      setEditingOffice(null)
      setIsCreating(false)
      setSuccessMessage('تم حفظ بيانات الفرع بنجاح.')
    } catch {
      setErrorMessage('حدث خطأ أثناء حفظ بيانات الفرع.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteOffice = async (id: string) => {
    if (!confirm('هل أنت تأكد من رغبتك في حذف هذا الفرع؟')) return
    setSaving(true)
    try {
      await mockContactAdapter.deleteOffice(id)
      await loadData()
      setSuccessMessage('تم حذف الفرع بنجاح.')
    } catch {
      setErrorMessage('حدث خطأ أثناء حذف الفرع.')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data) return
    setSaving(true)
    try {
      await mockContactAdapter.updateContactContent(data)
      setSuccessMessage('تم حفظ إعدادات الاتصال العامة بنجاح.')
    } catch {
      setErrorMessage('فشل في حفظ إعدادات الاتصال.')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = async () => {
    if (!confirm('هل تريد استعادة بيانات الاتصال الافتراضية؟')) return
    setSaving(true)
    try {
      const res = await mockContactAdapter.resetToDefault()
      setData(res)
      setSuccessMessage('تمت استعادة البيانات الافتراضية بنجاح.')
    } catch {
      setErrorMessage('حدث خطأ أثناء استعادة البيانات.')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !data) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#123C82] border-t-transparent" />
          <span>جاري تحميل بيانات الفروع والتواصل...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#123C82]/10 text-[#123C82]">
            <PhoneCall className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">إدارة بيانات التواصل والفروع</h1>
              <span className="rounded-full bg-[#BA9563]/15 px-2.5 py-0.5 text-xs font-semibold text-[#BA9563]">
                {data.offices.length} فروع إقليمية
              </span>
            </div>
            <p className="text-sm text-slate-500">
              تحديث العناوين، هواتف المقر الرئيسي، والمكاتب الإقليمية بالمملكة، مصر، وقطر.
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
            onClick={handleOpenCreate}
            className="flex items-center gap-2 rounded-lg bg-[#123C82] px-4 py-2 text-sm font-medium text-white hover:bg-[#123C82]/90"
          >
            <Plus className="h-4 w-4" />
            إضافة فرع جديد
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

      {/* Offices Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">المكاتب والفروع الإقليمية</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.offices.map((office) => (
            <div
              key={office.id}
              className={`relative flex flex-col justify-between rounded-xl border p-5 bg-white shadow-xs transition-all ${
                office.isHeadquarters ? 'border-[#BA9563] ring-1 ring-[#BA9563]/30' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-[#123C82]" />
                    <h3 className="font-bold text-slate-900">{office.nameAr}</h3>
                  </div>
                  {office.isHeadquarters && (
                    <span className="flex items-center gap-1 rounded-full bg-[#BA9563]/10 px-2 py-0.5 text-xs font-bold text-[#BA9563]">
                      <Star className="h-3 w-3 fill-[#BA9563]" />
                      المقر الرئيسي
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-slate-400 mb-3">{office.name}</p>

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{office.addressAr}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="font-mono text-xs">{office.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <PhoneCall className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <div className="font-mono text-xs dir-ltr text-right">
                      {office.phones.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-xs text-slate-400 font-mono">{office.workingHoursAr}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(office)}
                    className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 hover:text-[#123C82]"
                    title="تعديل"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  {!office.isHeadquarters && (
                    <button
                      type="button"
                      onClick={() => handleDeleteOffice(office.id)}
                      className="rounded-lg p-1.5 text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                      title="حذف"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General Settings Form */}
      <form onSubmit={handleSaveSettings} className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Globe className="h-5 w-5 text-[#123C82]" />
          <h2 className="text-lg font-bold text-slate-900">إعدادات بريد وتواصل الموقع العام</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">البريد الإلكتروني الرئيسي (Main Email)</label>
            <input
              type="email"
              value={data.settings.mainEmail}
              onChange={(e) =>
                setData({
                  ...data,
                  settings: { ...data.settings, mainEmail: e.target.value },
                })
              }
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-mono focus:border-[#123C82] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">بريد الاستفسارات (Inquiries Email)</label>
            <input
              type="email"
              value={data.settings.inquiryEmail}
              onChange={(e) =>
                setData({
                  ...data,
                  settings: { ...data.settings, inquiryEmail: e.target.value },
                })
              }
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-mono focus:border-[#123C82] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">بريد التوظيف (Careers Email)</label>
            <input
              type="email"
              value={data.settings.careersEmail}
              onChange={(e) =>
                setData({
                  ...data,
                  settings: { ...data.settings, careersEmail: e.target.value },
                })
              }
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-mono focus:border-[#123C82] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">هاتف الطوارئ (Emergency Phone)</label>
            <input
              type="text"
              value={data.settings.emergencyPhone}
              onChange={(e) =>
                setData({
                  ...data,
                  settings: { ...data.settings, emergencyPhone: e.target.value },
                })
              }
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-mono focus:border-[#123C82] focus:outline-none"
            />
          </div>
        </div>

        {/* Direct Telephone Lines Manager */}
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">أرقام الهاتف المباشرة للموقع (Direct Telephone Lines)</h3>
              <p className="text-xs text-slate-500">أضف أو احذف أرقام الهواتف المعروضة للجمهور في الموقع الرئيسي والتذييل وصفحة الاتصال.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const current = data.settings.directPhones || ['+966 58 160 5812']
                setData({
                  ...data,
                  settings: {
                    ...data.settings,
                    directPhones: [...current, ''],
                  },
                })
              }}
              className="flex items-center gap-1.5 rounded-lg border border-[#123C82] px-3 py-1.5 text-xs font-bold text-[#123C82] hover:bg-[#123C82]/5"
            >
              <Plus className="h-3.5 w-3.5" />
              إضافة رقم هاتف
            </button>
          </div>

          <div className="space-y-2">
            {(data.settings.directPhones || ['+966 58 160 5812', '+966 54 755 2373']).map((phone, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={phone}
                  placeholder="+966 5X XXX XXXX"
                  onChange={(e) => {
                    const updated = [...(data.settings.directPhones || ['+966 58 160 5812', '+966 54 755 2373'])]
                    updated[idx] = e.target.value
                    setData({
                      ...data,
                      settings: {
                        ...data.settings,
                        directPhones: updated,
                      },
                    })
                  }}
                  className="flex-1 rounded-lg border border-slate-300 p-2.5 text-sm font-mono focus:border-[#123C82] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = (data.settings.directPhones || ['+966 58 160 5812', '+966 54 755 2373']).filter((_, i) => i !== idx)
                    setData({
                      ...data,
                      settings: {
                        ...data.settings,
                        directPhones: updated.length > 0 ? updated : ['+966 58 160 5812'],
                      },
                    })
                  }}
                  className="rounded-lg p-2.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 border border-slate-200"
                  title="حذف الرقم"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#123C82] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#123C82]/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            حفظ إعدادات الهواتف والبريد العامة
          </button>
        </div>
      </form>

      {/* Edit / Create Modal */}
      {editingOffice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {isCreating ? 'إضافة فرع إقليمي جديد' : `تعديل فرع: ${editingOffice.nameAr}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingOffice(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOfficeModal} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">اسم الفرع بالعربية</label>
                  <input
                    type="text"
                    required
                    value={editingOffice.nameAr}
                    onChange={(e) => setEditingOffice({ ...editingOffice, nameAr: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
                    placeholder="مثال: المقر الرئيسي - الرياض"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">اسم الفرع بالإنجليزية</label>
                  <input
                    type="text"
                    required
                    value={editingOffice.name}
                    onChange={(e) => setEditingOffice({ ...editingOffice, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
                    placeholder="e.g. Riyadh Headquarters"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">الدولة</label>
                  <select
                    value={editingOffice.country}
                    onChange={(e) => setEditingOffice({ ...editingOffice, country: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
                  >
                    <option value="saudi-arabia">المملكة العربية السعودية (Saudi Arabia)</option>
                    <option value="egypt">جمهورية مصر العربية (Egypt)</option>
                    <option value="qatar">دولة قطر (Qatar)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">البريد الإلكتروني للفرع</label>
                  <input
                    type="email"
                    required
                    value={editingOffice.email}
                    onChange={(e) => setEditingOffice({ ...editingOffice, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-mono focus:border-[#123C82] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">العنوان الكامل بالعربية</label>
                  <input
                    type="text"
                    required
                    value={editingOffice.addressAr}
                    onChange={(e) => setEditingOffice({ ...editingOffice, addressAr: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">العنوان الكامل بالإنجليزية</label>
                  <input
                    type="text"
                    required
                    value={editingOffice.address}
                    onChange={(e) => setEditingOffice({ ...editingOffice, address: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">أرقام هواتف هذا الفرع</label>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingOffice({
                          ...editingOffice,
                          phones: [...editingOffice.phones, ''],
                        })
                      }
                      className="text-xs font-bold text-[#123C82] hover:underline flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" /> إضافة رقم هاتف للفرع
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editingOffice.phones.map((ph, phIdx) => (
                      <div key={phIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          required
                          value={ph}
                          placeholder="+966 5X XXX XXXX"
                          onChange={(e) => {
                            const newPhones = [...editingOffice.phones]
                            newPhones[phIdx] = e.target.value
                            setEditingOffice({ ...editingOffice, phones: newPhones })
                          }}
                          className="flex-1 rounded-lg border border-slate-300 p-2 text-sm font-mono focus:border-[#123C82] focus:outline-none"
                        />
                        {editingOffice.phones.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newPhones = editingOffice.phones.filter((_, i) => i !== phIdx)
                              setEditingOffice({ ...editingOffice, phones: newPhones })
                            }}
                            className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 border border-slate-200"
                            title="حذف هذا الرقم"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">أوقات العمل بالعربية</label>
                  <input
                    type="text"
                    value={editingOffice.workingHoursAr}
                    onChange={(e) => setEditingOffice({ ...editingOffice, workingHoursAr: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-[#123C82] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isHq"
                  checked={editingOffice.isHeadquarters}
                  onChange={(e) => setEditingOffice({ ...editingOffice, isHeadquarters: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-[#123C82] focus:ring-[#123C82]"
                />
                <label htmlFor="isHq" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  تعيين كـ "المقر الرئيسي" للشـركة (Main Headquarters)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingOffice(null)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#123C82] px-5 py-2 text-sm font-medium text-white hover:bg-[#123C82]/90 disabled:opacity-50"
                >
                  {saving ? 'جاري الحفظ...' : 'حفظ البيانات'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
