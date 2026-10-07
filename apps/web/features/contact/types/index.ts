/**
 * Contact feature types.
 */

export interface RegionalOffice {
  id: string
  city: string
  country: string
  countryCode: 'SA' | 'EG' | 'QA'
  role: string
  address: string
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
