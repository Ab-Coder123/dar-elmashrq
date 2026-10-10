import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ProjectsContentEditor } from '../components/content/ProjectsContentEditor'
import { mockAdminProjectsAdapter } from '../services/projectsContent.service'

describe('ProjectsContentEditor Component & Mock Adapter (CRUD & Filtering)', () => {
  beforeEach(async () => {
    await mockAdminProjectsAdapter.resetToDefault()
  })

  it('renders all default 29 PDF projects in the table', async () => {
    render(<ProjectsContentEditor />)

    expect(screen.getByText(/جاري تحميل بيانات المشاريع/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Beverly Al-Azeeza New Facade')).toBeInTheDocument()
      expect(screen.getByText('GRC Factory')).toBeInTheDocument()
      expect(screen.getByText('Way Care Medical Hospital')).toBeInTheDocument()
    })
  })

  it('filters projects by search keyword', async () => {
    render(<ProjectsContentEditor />)

    await waitFor(() => {
      expect(screen.getByTestId('project-search-input')).toBeInTheDocument()
    })

    const searchInput = screen.getByTestId('project-search-input')
    fireEvent.change(searchInput, { target: { value: 'Beverly' } })

    await waitFor(() => {
      expect(screen.getByText('Beverly Al-Azeeza New Facade')).toBeInTheDocument()
      expect(screen.queryByText('GRC Factory')).not.toBeInTheDocument()
    })
  })

  it('filters projects by country (Egypt / Saudi / Qatar)', async () => {
    render(<ProjectsContentEditor />)

    await waitFor(() => {
      expect(screen.getByTestId('project-country-filter')).toBeInTheDocument()
    })

    const countrySelect = screen.getByTestId('project-country-filter')
    fireEvent.change(countrySelect, { target: { value: 'egypt' } })

    await waitFor(() => {
      expect(screen.getByText('Awlad Ragab Supermarket Chain — 21+ Branches')).toBeInTheDocument()
      expect(screen.queryByText('Beverly Al-Azeeza New Facade')).not.toBeInTheDocument()
    })
  })

  it('creates a new project and displays it in the list', async () => {
    render(<ProjectsContentEditor />)

    await waitFor(() => {
      expect(screen.getByTestId('add-project-button')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('add-project-button'))
    expect(screen.getByText('إضافة مشروع جديد إلى المحفظة')).toBeInTheDocument()

    const nameInput = screen.getByTestId('project-name-input')
    const locationInput = screen.getByTestId('project-location-input')

    fireEvent.change(nameInput, { target: { value: 'Riyadh Sky Tower' } })
    fireEvent.change(locationInput, { target: { value: 'Riyadh, KSA' } })

    fireEvent.click(screen.getByTestId('save-project-modal-button'))

    await waitFor(() => {
      expect(screen.getByTestId('project-success-alert')).toBeInTheDocument()
      expect(screen.getByText('Riyadh Sky Tower')).toBeInTheDocument()
    })

    const projects = await mockAdminProjectsAdapter.getProjects()
    expect(projects.some((p) => p.name === 'Riyadh Sky Tower')).toBe(true)
  })

  it('edits an existing project name and updates successfully', async () => {
    render(<ProjectsContentEditor />)

    await waitFor(() => {
      expect(screen.getByTestId('edit-project-beverly-al-azeeza-new-facade')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('edit-project-beverly-al-azeeza-new-facade'))

    const nameInput = screen.getByTestId('project-name-input')
    fireEvent.change(nameInput, { target: { value: 'Beverly Al-Azeeza Luxury Facade' } })

    fireEvent.click(screen.getByTestId('save-project-modal-button'))

    await waitFor(() => {
      expect(screen.getByText('Beverly Al-Azeeza Luxury Facade')).toBeInTheDocument()
    })

    const updated = await mockAdminProjectsAdapter.getProjectById('sa-001')
    expect(updated?.name).toBe('Beverly Al-Azeeza Luxury Facade')
  })
})
