export interface Milestone {
  year: string
  title: string
  titleAr?: string
  badge: string
  description: string
  descriptionAr?: string
  details?: string[]
}

export interface WhatWeDoItem {
  number: string
  title: string
  titleAr: string
  subtitle: string
  description: string
  disciplines: string[]
  image: string
}

export interface OrgDepartment {
  title: string
  titleAr: string
  code: string
  roles: string[]
}

export interface OrgDivision {
  name: string
  nameAr: string
  lead: string
  badge: string
  departments: OrgDepartment[]
}

export interface AboutCredential {
  id: string
  name: string
  nameAr: string
  issuingBody: string
  classification: string
}
