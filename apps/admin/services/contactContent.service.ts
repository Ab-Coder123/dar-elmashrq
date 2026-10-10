import type { AdminContactContent, OfficeLocation, ContactSettings } from '@/types/contact'

export const INITIAL_CONTACT_CONTENT: AdminContactContent = {
  offices: [
    {
      id: 'off-01',
      name: 'Riyadh Headquarters',
      nameAr: 'المقر الرئيسي - الرياض',
      country: 'saudi-arabia',
      city: 'Riyadh',
      cityAr: 'الرياض',
      district: 'Olaya District',
      districtAr: 'حي العليا',
      address: 'King Fahd Road, Olaya District, Riyadh, Kingdom of Saudi Arabia',
      addressAr: 'طريق الملك فهد، حي العليا، الرياض، المملكة العربية السعودية',
      phones: ['00966581605812', '00966545051136'],
      email: 'info@elmashrq.com',
      workingHours: 'Sun - Thu: 8:00 AM - 5:00 PM',
      workingHoursAr: 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً',
      isHeadquarters: true,
      status: 'active',
    },
    {
      id: 'off-02',
      name: 'Cairo Regional Office',
      nameAr: 'المكتب الإقليمي - القاهرة',
      country: 'egypt',
      city: 'Cairo',
      cityAr: 'القاهرة',
      district: 'New Cairo',
      districtAr: 'القاهرة الجديدة',
      address: 'Fifth Settlement, Business District, Cairo, Egypt',
      addressAr: 'التجمع الخامس، الحي التجاري، القاهرة، مصر',
      phones: ['00201000000000'],
      email: 'egypt@elmashrq.com',
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

let contactState: AdminContactContent = JSON.parse(JSON.stringify(INITIAL_CONTACT_CONTENT))

export const mockContactAdapter = {
  getContactContent: async (): Promise<AdminContactContent> => {
    return new Promise((resolve) => setTimeout(() => resolve(contactState), 150))
  },
  updateContactContent: async (data: AdminContactContent): Promise<AdminContactContent> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        contactState = { ...data, updatedAt: new Date().toISOString() }
        resolve(contactState)
      }, 200)
    })
  },
  saveOffice: async (office: OfficeLocation): Promise<OfficeLocation> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingIdx = contactState.offices.findIndex((o) => o.id === office.id)
        if (existingIdx >= 0) {
          contactState.offices[existingIdx] = office
        } else {
          contactState.offices.push(office)
        }
        // If this office is set as HQ, unset HQ for others
        if (office.isHeadquarters) {
          contactState.offices.forEach((o) => {
            if (o.id !== office.id) o.isHeadquarters = false
          })
        }
        contactState.updatedAt = new Date().toISOString()
        resolve(office)
      }, 200)
    })
  },
  deleteOffice: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        contactState.offices = contactState.offices.filter((o) => o.id !== id)
        contactState.updatedAt = new Date().toISOString()
        resolve(true)
      }, 200)
    })
  },
  resetToDefault: async (): Promise<AdminContactContent> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        contactState = JSON.parse(JSON.stringify(INITIAL_CONTACT_CONTENT))
        resolve(contactState)
      }, 200)
    })
  },
}
