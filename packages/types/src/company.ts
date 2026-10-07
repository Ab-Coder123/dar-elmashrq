/**
 * Company profile data.
 * Source: Dar ElMashrq corporate PDF — all values PDF-verified.
 */
export interface CompanyProfile {
  name: string
  nameAr: string
  tagline?: string
  taglineAr?: string
  /** Founding year — confirmed from PDF: 1994 */
  foundedYear: number
  /** Vision statement — confirmed from PDF page 6 */
  vision: string
  visionAr?: string
  /** Mission — NOT in PDF; marked NEEDS_CONFIRMATION */
  mission?: string
  missionAr?: string
  website: string
  email: string
  phones: string[]
  /** Primary address — confirmed from PDF: Saudi Arabia, Riyadh, Olaya */
  address: {
    country: string
    city: string
    district: string
  }
}

/**
 * An official certification or document.
 * Source: PDF pages 60–67 contain 7 certifications.
 */
export interface Certification {
  id: string
  name: string
  nameAr?: string
  issuingBody?: string
  /**
   * Whether to display this certificate publicly.
   *
   * CAUTION: The Bank IBAN Letter should NOT be publicly visible.
   * Set isPubliclyVisible: false for sensitive financial documents.
   */
  isPubliclyVisible: boolean
  referenceNumber?: string
  issuedAt?: string
  /** URL to the document — should be private-access for sensitive docs */
  documentUrl?: string
}
