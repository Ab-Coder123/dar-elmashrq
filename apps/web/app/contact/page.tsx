import type { Metadata } from 'next'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { Footer } from '@/components/navigation/Footer'
import { ContactHero } from '@/features/contact/components/ContactHero'
import { ContactFormSection } from '@/features/contact/components/ContactFormSection'
import { ContactOfficesSection } from '@/features/contact/components/ContactOfficesSection'
import { getOffices, getContactPhones } from '@/features/contact/services/contact.service'

export const metadata: Metadata = {
  title: 'Contact Us | Dar El Mashrq Trading & Contracting',
  description:
    'Get in touch with Dar El Mashrq Trading & Contracting Company. Submit tender inquiries, request pre-qualification dossiers, or reach our offices in Saudi Arabia, Egypt, and Qatar.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ContactPage() {
  const [offices, phones] = await Promise.all([
    getOffices(),
    getContactPhones(),
  ])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f2244] text-slate-900 dark:text-white transition-colors duration-300">
      <TopNavBar />
      <main>
        <ContactHero />
        <ContactFormSection directPhones={phones} />
        <ContactOfficesSection offices={offices} />
      </main>
      <Footer />
    </div>
  )
}
