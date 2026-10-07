import type { Certification } from '@dar-elmashrq/types'

/**
 * Company certifications — source: corporate PDF pages 60–67.
 *
 * SECURITY NOTE:
 * The Bank IBAN Letter (page 67) is NOT included in this public config.
 * IBAN is sensitive financial data and must NOT be publicly displayed.
 *
 * Documents marked isPubliclyVisible: false should show title only,
 * with no downloadable link on the public website.
 */
export const CERTIFICATIONS: Certification[] = [
  {
    id: 'chamber-of-commerce',
    name: 'Chamber of Commerce Membership Certificate',
    nameAr: 'شهادة عضوية غرفة التجارة',
    issuingBody: 'Chamber of Commerce',
    isPubliclyVisible: true,
    referenceNumber: undefined, // NEEDS_CONFIRMATION
  },
  {
    id: 'commercial-activity-licence',
    name: 'Commercial Activity Licence',
    nameAr: 'رخصة النشاط التجاري',
    issuingBody: 'Saudi Government',
    isPubliclyVisible: true,
    referenceNumber: undefined, // NEEDS_CONFIRMATION
  },
  {
    id: 'commercial-register',
    name: 'Commercial Register (CR)',
    nameAr: 'السجل التجاري',
    issuingBody: 'Ministry of Commerce',
    isPubliclyVisible: true,
    referenceNumber: undefined, // NEEDS_CONFIRMATION
  },
  {
    id: 'gosi',
    name: 'GOSI Certificate',
    nameAr: 'شهادة التأمينات الاجتماعية',
    issuingBody: 'General Organization for Social Insurance (GOSI)',
    isPubliclyVisible: true,
    referenceNumber: undefined, // NEEDS_CONFIRMATION
  },
  {
    id: 'monshaat',
    name: 'Monshaat Certificate',
    nameAr: 'شهادة منشآت',
    issuingBody: 'Monshaat — Small and Medium Enterprises General Authority',
    isPubliclyVisible: true,
    referenceNumber: 'CER-24265135034',
  },
  {
    id: 'service-investment-license',
    name: 'Service Investment License',
    nameAr: 'رخصة الاستثمار الخدمي',
    issuingBody: 'Saudi Government',
    isPubliclyVisible: true,
    referenceNumber: undefined, // NEEDS_CONFIRMATION
  },
  {
    id: 'vat-certificate',
    name: 'VAT Certificate',
    nameAr: 'شهادة ضريبة القيمة المضافة',
    issuingBody: 'Zakat, Tax and Customs Authority (ZATCA)',
    /**
     * Display with caution — TRN number may need to be redacted.
     * Showing the certificate name/existence is fine; the TRN is optional.
     */
    isPubliclyVisible: true,
    referenceNumber: undefined, // NEEDS_CONFIRMATION — may contain TRN
  },
  // NOTE: Bank IBAN Letter (PDF page 67) is intentionally excluded.
  // IBAN is sensitive financial data. Do NOT display publicly.
]
