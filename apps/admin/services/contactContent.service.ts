import type { AdminContactContent, OfficeLocation, ContactSettings } from '@/types/contact'

export const INITIAL_CONTACT_CONTENT: AdminContactContent = {
  offices: [
    {
      id: 'off-01',
      name: 'Saudi Arabia Headquarters — Dammam',
      nameAr: 'المقر الرئيسي — الدمام',
      country: 'saudi-arabia',
      city: 'Dammam',
      cityAr: 'الدمام',
      district: 'Al-Shati Al-Sharqi',
      districtAr: 'حي الشاطئ الشرقي',
      address: 'Al-Shati Business Center, 8110 Prince Mohammed Bin Fahd Road, Al-Shati Al-Sharqi, Dammam, Saudi Arabia',
      addressAr: 'مركز الشاطئ للأعمال، 8110 طريق الأمير محمد بن فهد، حي الشاطئ الشرقي، الدمام، السعودية',
      phones: ['+966 58 160 5812', '+966 54 882 1738'],
      email: 'info@elmashrq.com',
      workingHours: 'Sun - Thu: 8:00 AM - 5:00 PM',
      workingHoursAr: 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً',
      isHeadquarters: true,
      status: 'active',
    },
    {
      id: 'off-02',
      name: 'Cairo Regional Office',
      nameAr: 'الفرع الإقليمي — القاهرة',
      country: 'egypt',
      city: 'New Cairo',
      cityAr: 'القاهرة الجديدة',
      district: 'Fifth Settlement',
      districtAr: 'التجمع الخامس',
      address: 'South 90th Street, 5th Settlement, New Cairo, Egypt',
      addressAr: 'شارع التسعين الجنوبي، التجمع الخامس، مصر',
      phones: ['+20 111 62 5555 6'],
      email: 'info@elmashrq.com',
      workingHours: 'Sun - Thu: 9:00 AM - 5:00 PM',
      workingHoursAr: 'الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً',
      isHeadquarters: false,
      status: 'active',
    },
    {
      id: 'off-03',
      name: 'Doha Regional Office',
      nameAr: 'المكتب الإقليمي - الدوحة',
      country: 'qatar',
      city: 'Doha',
      cityAr: 'الدوحة',
      district: 'West Bay',
      districtAr: 'الدفنة / الخليج الغربي',
      address: 'West Bay Commercial District, Doha, Qatar',
      addressAr: 'منطقة أبراج الدفنة، الدوحة، قطر',
      phones: ['0097440000000'],
      email: 'qatar@elmashrq.com',
      workingHours: 'Sun - Thu: 8:00 AM - 4:30 PM',
      workingHoursAr: 'الأحد - الخميس: 8:00 صباحاً - 4:30 مساءً',
      isHeadquarters: false,
      status: 'active',
    },
  ],
  settings: {
    mainEmail: 'info@elmashrq.com',
    inquiryEmail: 'inquiries@elmashrq.com',
    careersEmail: 'careers@elmashrq.com',
    emergencyPhone: '00966581605812',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/dar-elmashrq',
      twitter: 'https://twitter.com/darelmashrq',
      instagram: 'https://instagram.com/darelmashrq',
    },
  },
  updatedAt: new Date().toISOString(),
}

import { adminApiClient } from '../lib/api'

let contactState: AdminContactContent = JSON.parse(JSON.stringify(INITIAL_CONTACT_CONTENT))

export const mockContactAdapter = {
  getContactContent: async (): Promise<AdminContactContent> => {
    try {
      const res = await adminApiClient<{ data: any } | AdminContactContent>('/admin/contact')
      const payload = res && 'data' in res ? res.data : res
      if (payload && payload.offices && Array.isArray(payload.offices)) {
        contactState = {
          offices: payload.offices.map((off: any) => ({
            id: off.id || `off-${Math.random().toString(36).substr(2, 9)}`,
            name: off.countryName || off.name || 'Regional Office',
            nameAr: off.countryNameAr || off.nameAr || 'مكتب إقليمي',
            country: off.country || 'saudi-arabia',
            city: off.city || '',
            cityAr: off.cityAr || off.city || '',
            district: off.district || '',
            districtAr: off.districtAr || off.district || '',
            address: off.address || '',
            addressAr: off.addressAr || off.address || '',
            phones: off.phones || (off.phone ? [off.phone] : ['00966581605812']),
            email: off.email || 'info@elmashrq.com',
            workingHours: off.workingHours || 'Sun - Thu: 8:00 AM - 5:00 PM',
            workingHoursAr: off.workingHoursAr || 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً',
            isHeadquarters: !!(off.isHQ || off.isHeadquarters),
            status: off.status || 'active',
          })),
          settings: {
            mainEmail: payload.generalEmail || contactState.settings.mainEmail,
            inquiryEmail: payload.supportEmail || contactState.settings.inquiryEmail,
            careersEmail: contactState.settings.careersEmail,
            emergencyPhone: (payload.phones && payload.phones[0]) || contactState.settings.emergencyPhone,
            socialLinks: contactState.settings.socialLinks,
          },
          updatedAt: new Date().toISOString(),
        }
        return JSON.parse(JSON.stringify(contactState))
      }
    } catch {
      // Fallback to in-memory state
    }
    return JSON.parse(JSON.stringify(contactState))
  },

  updateContactContent: async (data: AdminContactContent): Promise<AdminContactContent> => {
    contactState = { ...data, updatedAt: new Date().toISOString() }
    try {
      await adminApiClient('/admin/contact', {
        method: 'PUT',
        body: JSON.stringify({
          hero: {
            badge: 'CONNECT // REGIONAL NETWORK',
            headline: 'DIRECT ENGAGEMENT & PROJECT INQUIRIES',
            tagline: 'Strategic Presence Across Saudi Arabia, Egypt & Qatar',
            description: 'Connect directly with our engineering leadership and regional project offices.',
          },
          offices: data.offices.map((off) => ({
            id: off.id,
            country: off.country,
            countryName: off.name,
            countryNameAr: off.nameAr,
            city: off.city || 'Main',
            district: off.district || '',
            address: off.address,
            addressAr: off.addressAr,
            phone: off.phones[0] || '00966581605812',
            email: off.email,
            coordinates: '',
            isHQ: off.isHeadquarters,
          })),
          generalEmail: data.settings.mainEmail,
          supportEmail: data.settings.inquiryEmail,
          phones: [data.settings.emergencyPhone, ...data.offices.flatMap((o) => o.phones)].filter(Boolean),
          workingHours: 'Sun - Thu: 8:00 AM - 5:00 PM',
          workingHoursAr: 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً',
          status: 'published',
        }),
      })
    } catch {
      // Fallback
    }
    return JSON.parse(JSON.stringify(contactState))
  },

  saveOffice: async (office: OfficeLocation): Promise<OfficeLocation> => {
    const existingIdx = contactState.offices.findIndex((o) => o.id === office.id)
    if (existingIdx >= 0) {
      contactState.offices[existingIdx] = office
    } else {
      contactState.offices.push(office)
    }
    if (office.isHeadquarters) {
      contactState.offices.forEach((o) => {
        if (o.id !== office.id) o.isHeadquarters = false
      })
    }
    contactState.updatedAt = new Date().toISOString()

    try {
      await mockContactAdapter.updateContactContent(contactState)
    } catch {
      // Fallback
    }
    return JSON.parse(JSON.stringify(office))
  },

  deleteOffice: async (id: string): Promise<boolean> => {
    contactState.offices = contactState.offices.filter((o) => o.id !== id)
    contactState.updatedAt = new Date().toISOString()
    try {
      await mockContactAdapter.updateContactContent(contactState)
    } catch {
      // Fallback
    }
    return true
  },

  resetToDefault: async (): Promise<AdminContactContent> => {
    contactState = JSON.parse(JSON.stringify(INITIAL_CONTACT_CONTENT))
    try {
      await mockContactAdapter.updateContactContent(contactState)
    } catch {
      // Fallback
    }
    return JSON.parse(JSON.stringify(contactState))
  },
}
