import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ServicesContentEditor } from '../components/content/ServicesContentEditor'
import { mockServicesAdapter } from '../services/servicesContent.service'

describe('ServicesContentEditor Component & Mock Adapter (CRUD)', () => {
  beforeEach(async () => {
    await mockServicesAdapter.resetToDefault()
  })

  it('renders all 8 default services in the table', async () => {
    render(<ServicesContentEditor />)

    expect(screen.getByText(/جاري تحميل بيانات الخدمات/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Civil Works & Finishing')).toBeInTheDocument()
      expect(screen.getByText('Electrical Works')).toBeInTheDocument()
      expect(screen.getByText('Air Conditioning Works')).toBeInTheDocument()
    })
  })

  it('opens modal to create a new service and adds it to the list', async () => {
    render(<ServicesContentEditor />)

    await waitFor(() => {
      expect(screen.getByTestId('add-service-button')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('add-service-button'))
    expect(screen.getByText('إضافة خدمة هندسية جديدة')).toBeInTheDocument()

    const nameInput = screen.getByTestId('service-name-input')
    const slugInput = screen.getByTestId('service-slug-input')

    fireEvent.change(nameInput, { target: { value: 'Solar & Renewable Energy' } })
    fireEvent.change(slugInput, { target: { value: 'solar-energy' } })

    fireEvent.click(screen.getByTestId('save-service-modal-button'))

    await waitFor(() => {
      expect(screen.getByTestId('service-success-alert')).toBeInTheDocument()
      expect(screen.getByText('Solar & Renewable Energy')).toBeInTheDocument()
    })

    const allServices = await mockServicesAdapter.getServices()
    expect(allServices.some((s) => s.slug === 'solar-energy')).toBe(true)
  })

  it('opens modal to edit an existing service and updates its data', async () => {
    render(<ServicesContentEditor />)

    await waitFor(() => {
      expect(screen.getByTestId('edit-service-civil-works-finishing')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('edit-service-civil-works-finishing'))

    const nameInput = screen.getByTestId('service-name-input')
    fireEvent.change(nameInput, { target: { value: 'Civil Infrastructure & Finishing' } })

    fireEvent.click(screen.getByTestId('save-service-modal-button'))

    await waitFor(() => {
      expect(screen.getByText('Civil Infrastructure & Finishing')).toBeInTheDocument()
    })

    const updated = await mockServicesAdapter.getServiceById('civil-works-finishing')
    expect(updated?.name).toBe('Civil Infrastructure & Finishing')
  })
})
