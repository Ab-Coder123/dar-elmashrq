'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { ArrowRight, Menu, X, Sun, Moon, ChevronDown, Globe } from 'lucide-react'
import { MAIN_NAVIGATION, COMPANY_PROFILE } from '@/config/site'
import { BlueprintCrosshair } from '@/components/ui/BlueprintCrosshair'
import { useTheme } from '@/providers/ThemeProvider'
import { useLanguage } from '@/providers/LanguageProvider'
import { useTranslation } from '@/lib/i18n/dict'

export function TopNavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { locale, toggleLanguage, isRtl } = useLanguage()
  const t = useTranslation(locale)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleHomeSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value
    if (target) {
      if (pathname === '/') {
        const element = document.querySelector(target)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.location.hash = target
        }
      } else {
        router.push(`/${target}`)
      }
    }
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${isScrolled
        ? 'bg-white/95 dark:bg-[#0b1a37]/95 backdrop-blur-md border-slate-200 dark:border-[#434651]/50 shadow-xl dark:shadow-2xl dark:shadow-black/50'
        : 'bg-white/80 dark:bg-[#0b1a37]/75 backdrop-blur-sm border-slate-200/60 dark:border-[#434651]/30'
        }`}
    >
      <div className="w-full max-w-[1440px] px-4 sm:px-8 md:px-12 mx-auto flex items-center justify-between relative">
        <BlueprintCrosshair position="bottom-left" />

        {/* Brand Logo & Identity */}
        <Link
          href="/"
          className="flex items-center gap-3 group outline-none focus-visible:ring-1 focus-visible:ring-[#ba9563]"
        >
          <div className="relative h-20 sm:h-24 md:h-28 w-32 sm:w-40 md:w-48 transition-transform group-hover:scale-105 flex-shrink-0">
            <Image
              src={theme == "dark" ? "/Dar-elmashrq-logo-white.png" : "/dar_elmashrq_logo-dark.png"}
              alt="DAR EL MASHRQ Logo"
              fill
              priority
              sizes="(max-width: 60px) 128px, (max-width: 768px) 160px, 192px"
              className="object-contain drop-shadow"
            />
          </div>
          <span className="hidden sm:inline-block font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ba9563] border-l border-slate-300 dark:border-[#434651]/60 pl-3 font-semibold leading-tight">
            EST.<br />1994
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
          <Link
            href="/"
            className={`transition-colors py-2 relative group ${
              locale === 'ar'
                ? 'font-arabic text-sm tracking-normal font-bold'
                : 'font-[\'Space_Grotesk\'] text-xs uppercase tracking-[0.15em] font-medium'
            } ${pathname === '/' ? 'text-[#ba9563] font-bold' : 'text-slate-800 dark:text-[#d7e2ff] hover:text-[#ba9563]'}`}
          >
            {t.home}
            <span className={`absolute bottom-0 inset-x-0 h-[2px] bg-[#ba9563] transition-all duration-300 ${pathname === '/' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          </Link>

          <Link
            href="/about"
            className={`transition-colors py-2 relative group ${
              locale === 'ar'
                ? 'font-arabic text-sm tracking-normal font-bold'
                : 'font-[\'Space_Grotesk\'] text-xs uppercase tracking-[0.15em] font-medium'
            } ${pathname === '/about' ? 'text-[#ba9563] font-bold' : 'text-slate-700 dark:text-[#c4c6d2] hover:text-[#ba9563]'}`}
          >
            {t.about}
            <span className={`absolute bottom-0 inset-x-0 h-[2px] bg-[#ba9563] transition-all duration-300 ${pathname === '/about' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          </Link>

          <Link
            href="/services"
            className={`transition-colors py-2 relative group ${
              locale === 'ar'
                ? 'font-arabic text-sm tracking-normal font-bold'
                : 'font-[\'Space_Grotesk\'] text-xs uppercase tracking-[0.15em] font-medium'
            } ${pathname === '/services' ? 'text-[#ba9563] font-bold' : 'text-slate-700 dark:text-[#c4c6d2] hover:text-[#ba9563]'}`}
          >
            {t.services}
            <span className={`absolute bottom-0 inset-x-0 h-[2px] bg-[#ba9563] transition-all duration-300 ${pathname === '/services' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          </Link>

          <Link
            href="/projects"
            className={`transition-colors py-2 relative group ${
              locale === 'ar'
                ? 'font-arabic text-sm tracking-normal font-bold'
                : 'font-[\'Space_Grotesk\'] text-xs uppercase tracking-[0.15em] font-medium'
            } ${pathname.startsWith('/projects') ? 'text-[#ba9563] font-bold' : 'text-slate-700 dark:text-[#c4c6d2] hover:text-[#ba9563]'}`}
          >
            {t.projects}
            <span className={`absolute bottom-0 inset-x-0 h-[2px] bg-[#ba9563] transition-all duration-300 ${pathname.startsWith('/projects') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          </Link>

          <Link
            href="/contact"
            className={`transition-colors py-2 relative group ${
              locale === 'ar'
                ? 'font-arabic text-sm tracking-normal font-bold'
                : 'font-[\'Space_Grotesk\'] text-xs uppercase tracking-[0.15em] font-medium'
            } ${pathname === '/contact' ? 'text-[#ba9563] font-bold' : 'text-slate-700 dark:text-[#c4c6d2] hover:text-[#ba9563]'}`}
          >
            {t.contact}
            <span className={`absolute bottom-0 inset-x-0 h-[2px] bg-[#ba9563] transition-all duration-300 ${pathname === '/contact' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle Button */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 dark:border-[#434651]/60 text-slate-700 dark:text-[#d7e2ff] bg-slate-100 dark:bg-[#0f2244] hover:border-[#ba9563] hover:text-[#ba9563] transition-all cursor-pointer font-arabic text-xs font-bold uppercase tracking-wider shadow-2xs"
            aria-label="Toggle Language Arabic / English"
            title={locale === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#ba9563] shrink-0" />
            <span>{locale === 'ar' ? 'English' : 'عربي'}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 border border-slate-300 dark:border-[#434651]/60 text-slate-700 dark:text-[#ba9563] bg-slate-100 dark:bg-[#0f2244] hover:border-[#ba9563] transition-all cursor-pointer shadow-2xs"
            aria-label="Toggle Light and Dark Mode"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#ba9563] transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-800 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Contact CTA Button */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex bg-[#123c82] hover:bg-[#ba9563] text-white hover:text-[#0b1a37] border border-[#ba9563]/60 font-arabic text-xs font-bold px-4 sm:px-5 py-2 transition-all duration-200 items-center gap-2 shadow-sm"
          >
            <span>{t.contactUs}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-800 dark:text-[#d7e2ff] hover:text-[#ba9563] border border-slate-300 dark:border-[#434651]/50 focus:outline-none cursor-pointer"
            aria-label="Toggle Mobile Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <BlueprintCrosshair position="bottom-right" />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 dark:bg-[#0b1a37]/98 border-b border-slate-200 dark:border-[#ba9563]/40 px-6 py-8 space-y-6 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="flex flex-col space-y-4">
            {MAIN_NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-arabic text-sm font-bold transition-colors border-b border-slate-200 dark:border-[#434651]/30 pb-3 flex justify-between items-center ${pathname === item.href ? 'text-[#ba9563]' : 'text-slate-800 dark:text-[#d7e2ff] hover:text-[#ba9563]'}`}
              >
                <span>{locale === 'ar' ? (item.labelAr || item.label) : item.label}</span>
                <span className="font-['Space_Grotesk'] text-xs text-[#ba9563] uppercase tracking-wider font-bold">
                  0{MAIN_NAVIGATION.indexOf(item) + 1}
                </span>
              </Link>
            ))}

            <div className="pt-2">
              <span className="font-arabic text-xs uppercase text-[#ba9563] block mb-2 font-bold">
                {locale === 'ar' ? 'الانتقال السريع للأقسام' : 'Direct Navigation'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'projects', label: 'المشاريع', labelEn: 'Projects' },
                  { id: 'capabilities', label: 'القدرات', labelEn: 'Capabilities' },
                  { id: 'presence', label: 'التواجد', labelEn: 'Presence' },
                  { id: 'credentials', label: 'الاعتمادات', labelEn: 'Credentials' },
                ].map((section) => (
                  <Link
                    key={section.id}
                    href={`/#${section.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-xs font-arabic font-bold bg-slate-100 dark:bg-[#0f2244] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#434651]/40 text-center"
                  >
                    {locale === 'ar' ? section.label : section.labelEn}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs font-arabic tracking-wide text-slate-500 dark:text-[#8e909c]">
            <p className="text-[#ba9563] font-bold mb-1">
              {locale === 'ar' ? 'المقر الرئيسي — الرياض' : 'RIYADH HEADQUARTERS'}
            </p>
            <p>{COMPANY_PROFILE.address.district}، {COMPANY_PROFILE.address.city}، {locale === 'ar' ? 'المملكة العربية السعودية' : COMPANY_PROFILE.address.country}</p>
            <p className="mt-1 text-slate-700 dark:text-[#d7e2ff]" dir="ltr">{COMPANY_PROFILE.phones[0]}</p>
          </div>
        </div>
      )}
    </header>
  )
}