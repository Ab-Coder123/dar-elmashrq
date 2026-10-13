/**
 * Contact feature types.
 */

export interface RegionalOffice {
  id: string
  city: string
  cityAr?: string
  country: string
  countryAr?: string
  countryCode: 'SA' | 'EG' | 'QA'
  role: string
  roleAr?: string
  address: string
  addressAr?: string
  phone?: string
  email?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  territory: string
  subject: string
  message: string
}
