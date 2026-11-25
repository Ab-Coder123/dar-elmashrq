import type { RegionalOffice } from '../types'
import { getRegionalOffices } from '../data/contact.data'
import { publicApiClient } from '@/lib/api'

/**
 * Contact service — data boundary layer.
 * Consumes public REST API (/api/v1/contact) with seamless fallback to static verified assets.
 */

export interface ContactDataResponse {
  hero?: {
    badge?: string
    headline?: string
    tagline?: string
    description?: string
  }
  offices?: Array<{
    id: string
    country: string
    countryName: string
    countryNameAr: string
    city: string
    district: string
    address: string
    addressAr?: string
    phone: string
    phones?: string[]
    email: string
    coordinates?: string
    isHQ?: boolean
  }>
  generalEmail?: string
  supportEmail?: string
  phones?: string[]
  workingHours?: string
  workingHoursAr?: string
}

export async function getOffices(): Promise<RegionalOffice[]> {
  try {
    const res = await publicApiClient<{ content?: ContactDataResponse } | ContactDataResponse>('/contact')
    const content = (res && 'content' in res ? res.content : res) as ContactDataResponse
    if (content?.offices && Array.isArray(content.offices) && content.offices.length > 0) {
      return content.offices.map((off) => ({
        id: off.id,
        city: off.city,
        cityAr: off.city,
        country: off.countryName || off.country,
        countryAr: off.countryNameAr || off.country,
        countryCode: (off.country === 'egypt' ? 'EG' : off.country === 'qatar' ? 'QA' : 'SA') as 'SA' | 'EG' | 'QA',
        role: off.isHQ ? 'Saudi Arabia Headquarters' : `${off.countryName} Regional Hub`,
        roleAr: off.isHQ ? 'المقر الرئيسي' : `${off.countryNameAr} المكتب الإقليمي`,
        address: off.address,
        addressAr: off.addressAr || off.address,
        phone: (off.phones && off.phones[0]) || off.phone || '+966 58 160 5812',
        email: off.email || 'info@elmashrq.com',
      }))
    }
    return getRegionalOffices()
  } catch (err) {
    console.warn('Failed to fetch contact offices from API, using static fallback:', err)
    return getRegionalOffices()
  }
}

export async function getContactPhones(): Promise<string[]> {
  try {
    const res = await publicApiClient<{ content?: ContactDataResponse } | ContactDataResponse>('/contact')
    const content = (res && 'content' in res ? res.content : res) as ContactDataResponse
    if (content?.phones && Array.isArray(content.phones) && content.phones.length > 0) {
      return content.phones
    }
    return ['+966 58 160 5812', '+966 51 070 1704']
  } catch (err) {
    console.warn('Failed to fetch contact phones from API, using fallback:', err)
    return ['+966 58 160 5812', '+966 51 070 1704']
  }
}
