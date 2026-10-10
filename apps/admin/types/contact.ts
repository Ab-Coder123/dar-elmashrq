export interface OfficeLocation {
  id: string
  name: string
  nameAr: string
  country: 'saudi-arabia' | 'egypt' | 'qatar' | string
  city: string
  cityAr: string
  district: string
  districtAr: string
  address: string
  addressAr: string
  phones: string[]
  email: string
  workingHours: string
  workingHoursAr: string
  isHeadquarters: boolean
  status: 'active' | 'draft'
}

export interface ContactSettings {
  mainEmail: string
  inquiryEmail: string
  careersEmail: string
  emergencyPhone: string
  socialLinks: {
    linkedin: string
    twitter: string
    instagram: string
  }
}

export interface AdminContactContent {
  offices: OfficeLocation[]
  settings: ContactSettings
  updatedAt: string
}
