import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DashboardOverviewPage from '../app/page'
import AdminHomePage from '../app/home/page'
import AdminAboutPage from '../app/about/page'
import AdminServicesPage from '../app/services/page'
import AdminProjectsPage from '../app/projects/page'
import AdminContactPage from '../app/contact/page'
import AdminMediaPage from '../app/media/page'
import AdminSettingsPage from '../app/settings/page'
import AdminNotFound from '../app/not-found'

describe('Admin Route Shells Rendering', () => {
  it('renders Dashboard Overview page with stats and cards', () => {
    render(<DashboardOverviewPage />)
    expect(screen.getByText('Admin Content Management System')).toBeInTheDocument()
    expect(screen.getByText('Total Projects')).toBeInTheDocument()
    expect(screen.getByText('Services Active')).toBeInTheDocument()
  })

  it('renders Home Page editor', async () => {
    render(<AdminHomePage />)
    const editorTitle = await screen.findByText('Home Page Content Manager')
    expect(editorTitle).toBeInTheDocument()
    expect(screen.getByTestId('tab-hero')).toBeInTheDocument()
  })

  it('renders About Us page editor', async () => {
    render(<AdminAboutPage />)
    const editorTitle = await screen.findByText('About Us Content Manager')
    expect(editorTitle).toBeInTheDocument()
    expect(screen.getByTestId('tab-about-hero')).toBeInTheDocument()
  })

  it('renders Services page editor', async () => {
    render(<AdminServicesPage />)
    const editorTitle = await screen.findByText('إدارة الخدمات الهندسية (Services CRUD)')
    expect(editorTitle).toBeInTheDocument()
  })

  it('renders Projects page editor', async () => {
    render(<AdminProjectsPage />)
    const editorTitle = await screen.findByText('إدارة محفظة المشاريع (Projects Portfolio CRUD)')
    expect(editorTitle).toBeInTheDocument()
  })

  it('renders Contact page editor', async () => {
    render(<AdminContactPage />)
    const editorTitle = await screen.findByText('إدارة بيانات التواصل والفروع')
    expect(editorTitle).toBeInTheDocument()
  })

  it('renders Media Library page editor', async () => {
    render(<AdminMediaPage />)
    const editorTitle = await screen.findByText('مكتبة الوسائط والمستندات الرقمية')
    expect(editorTitle).toBeInTheDocument()
  })

  it('renders Site Settings page editor', async () => {
    render(<AdminSettingsPage />)
    const editorTitle = await screen.findByText('إعدادات النظام والموقع العام')
    expect(editorTitle).toBeInTheDocument()
  })

  it('renders Not Found page shell', () => {
    render(<AdminNotFound />)
    expect(screen.getByText('Admin Section Not Found')).toBeInTheDocument()
    expect(screen.getByText('Return to Admin Overview')).toBeInTheDocument()
  })
})
