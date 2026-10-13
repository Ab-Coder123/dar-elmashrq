export interface Milestone {
  year: string
  title: string
  titleAr?: string
  badge: string
  badgeAr?: string
  description: string
  descriptionAr?: string
  details?: string[]
  detailsAr?: string[]
}

export interface WhatWeDoItem {
  number: string
  title: string
  titleAr: string
  subtitle: string
  subtitleAr?: string
  description: string
  descriptionAr?: string
  disciplines: string[]
  disciplinesAr?: string[]
  image: string
}

export interface OrgDepartment {
  title: string
  titleAr: string
  code: string
  roles: string[]
  rolesAr?: string[]
}

export interface OrgDivision {
  name: string
  nameAr: string
  lead: string
  leadAr?: string
  badge: string
  badgeAr?: string
  departments: OrgDepartment[]
}

export interface AboutCredential {
  id: string
  name: string
  nameAr: string
  issuingBody: string
  issuingBodyAr?: string
  classification: string
  classificationAr?: string
}
