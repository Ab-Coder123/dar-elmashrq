import type { Country } from './common'

export interface HomeStat {
  label: string
  labelAr?: string
  value: string
  description: string
}

export interface HomeServiceSummary {
  id: string
  number: string
  specCode: string
  title: string
  titleAr?: string
  description: string
  iconName: string
}

export interface RegionalHub {
  country: Country
  countryName: string
  countryNameAr: string
  coordinates: string
  badge: string
  description: string
  address: string
  phone: string
  classification: string
}

export interface HomeCredential {
  id: string
  category: string
  title: string
  description: string
  registrationNumber: string
  status: string
}
