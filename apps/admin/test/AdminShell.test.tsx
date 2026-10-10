import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AdminShell } from '../components/layout/AdminShell'
import * as navigation from 'next/navigation'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

describe('AdminShell Layout Component', () => {
  beforeEach(() => {
    vi.mocked(navigation.usePathname).mockReturnValue('/')
  })

  it('renders the brand title and navigation items in sidebar', () => {
    render(
      <AdminShell>
        <div data-testid="test-content">Dashboard Content</div>
      </AdminShell>
    )

    // Verify brand
    expect(screen.getByText('Dar ElMashrq')).toBeInTheDocument()
    expect(screen.getByText('ADMIN CMS')).toBeInTheDocument()

    // Verify content rendered
    expect(screen.getByTestId('test-content')).toBeInTheDocument()

    // Verify nav links
    expect(screen.getByTestId('nav-link-dashboard')).toBeInTheDocument()
    expect(screen.getByTestId('nav-link-home')).toBeInTheDocument()
    expect(screen.getByTestId('nav-link-about')).toBeInTheDocument()
    expect(screen.getByTestId('nav-link-services')).toBeInTheDocument()
    expect(screen.getByTestId('nav-link-projects')).toBeInTheDocument()
    expect(screen.getByTestId('nav-link-contact')).toBeInTheDocument()
    expect(screen.getByTestId('nav-link-media')).toBeInTheDocument()
    expect(screen.getByTestId('nav-link-settings')).toBeInTheDocument()
  })

  it('highlights the active navigation item based on pathname', () => {
    vi.mocked(navigation.usePathname).mockReturnValue('/projects')

    render(
      <AdminShell>
        <div>Projects Content</div>
      </AdminShell>
    )

    const projectsLink = screen.getByTestId('nav-link-projects')
    expect(projectsLink.className).toContain('bg-[#123C82]')
    expect(projectsLink.className).toContain('text-white')
  })

  it('opens and closes the mobile drawer when clicking menu buttons', () => {
    render(
      <AdminShell>
        <div>Mobile Test Content</div>
      </AdminShell>
    )

    const sidebar = screen.getByTestId('admin-sidebar')
    expect(sidebar.className).toContain('-translate-x-full')

    // Open mobile menu
    const openBtn = screen.getByTestId('open-mobile-menu')
    fireEvent.click(openBtn)
    expect(sidebar.className).toContain('translate-x-0')

    // Close via close button
    const closeBtn = screen.getByTestId('close-mobile-menu')
    fireEvent.click(closeBtn)
    expect(sidebar.className).toContain('-translate-x-full')
  })
})
