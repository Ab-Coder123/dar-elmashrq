'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Locale = 'ar' | 'en'

interface LanguageContextType {
  locale: Locale
  language: Locale
  isRtl: boolean
  isAr: boolean
  toggleLanguage: () => void
  setLanguage: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar')

  useEffect(() => {
    const savedLocale = (localStorage.getItem('dar-locale') as Locale) || 'ar'
    setLocaleState(savedLocale)
    applyLocaleToDocument(savedLocale)
  }, [])

  const applyLocaleToDocument = (loc: Locale) => {
    document.documentElement.lang = loc
    document.documentElement.dir = loc === 'ar' ? 'rtl' : 'ltr'
  }

  const setLanguage = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('dar-locale', newLocale)
    applyLocaleToDocument(newLocale)
  }

  const toggleLanguage = () => {
    setLanguage(locale === 'ar' ? 'en' : 'ar')
  }

  return (
    <LanguageContext.Provider
      value={{
        locale,
        language: locale,
        isRtl: locale === 'ar',
        isAr: locale === 'ar',
        toggleLanguage,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
