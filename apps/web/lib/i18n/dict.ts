import type { Locale } from '@/providers/LanguageProvider'

export interface NavigationTranslation {
  home: string
  about: string
  services: string
  projects: string
  contact: string
  contactUs: string
  exploreProjects: string
  aboutEnterprise: string
  allCountries: string
  allCategories: string
  searchPlaceholder: string
  viewDetails: string
  yearsExperience: string
  countries: string
  projectsDelivered: string
  certifications: string
  quickLinks: string
  workingHours: string
  rightsReserved: string
  backToHome: string
  scopeOfWork: string
  projectInfo: string
  location: string
  year: string
  client: string
  category: string
  servicesDelivered: string
}

export const DICTIONARY: Record<Locale, NavigationTranslation> = {
  ar: {
    home: 'الرئيسية',
    about: 'عن الشركة',
    services: 'خدماتنا',
    projects: 'مشاريعنا',
    contact: 'تواصل معنا',
    contactUs: 'تواصل معنا',
    exploreProjects: 'استكشف المشاريع',
    aboutEnterprise: 'عن المجموعة',
    allCountries: 'جميع الدول',
    allCategories: 'جميع القطاعات',
    searchPlaceholder: 'ابحث باسم المشروع أو المدينة...',
    viewDetails: 'عرض التفاصيل',
    yearsExperience: 'سنوات من الخبرة',
    countries: 'دول إقليمية',
    projectsDelivered: 'مشروع منجز',
    certifications: 'شهادات معتمدة',
    quickLinks: 'روابط سريعة',
    workingHours: 'ساعات العمل الرسمية',
    rightsReserved: 'جميع الحقوق محفوظة لشركة دار المشرق للتجارة والمقاولات.',
    backToHome: 'العودة للرئيسية',
    scopeOfWork: 'نطاق الأعمال المنفذة',
    projectInfo: 'بيانات المشروع',
    location: 'الموقع',
    year: 'سنة التنفيذ',
    client: 'الجهة المالكة / العميل',
    category: 'القطاع الهندسي',
    servicesDelivered: 'الخدمات المنفذة',
  },
  en: {
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    projects: 'Projects',
    contact: 'Contact Us',
    contactUs: 'Contact Us',
    exploreProjects: 'Explore Projects',
    aboutEnterprise: 'About Enterprise',
    allCountries: 'All Countries',
    allCategories: 'All Categories',
    searchPlaceholder: 'Search by project name or city...',
    viewDetails: 'View Details',
    yearsExperience: 'Years Experience',
    countries: 'Regional Countries',
    projectsDelivered: 'Projects Delivered',
    certifications: 'Official Certifications',
    quickLinks: 'Quick Links',
    workingHours: 'Official Hours',
    rightsReserved: 'All rights reserved. Dar El Mashrq Trading & Contracting Co.',
    backToHome: 'Back to Home',
    scopeOfWork: 'Scope of Work',
    projectInfo: 'Project Information',
    location: 'Location',
    year: 'Execution Year',
    client: 'Client / Owner',
    category: 'Engineering Sector',
    servicesDelivered: 'Delivered Services',
  },
}

export function useTranslation(locale: Locale): NavigationTranslation {
  return DICTIONARY[locale] || DICTIONARY.ar
}
