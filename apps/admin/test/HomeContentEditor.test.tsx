import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { HomeContentEditor } from '../components/content/HomeContentEditor'
import { mockHomeContentAdapter } from '../services/homeContent.service'

describe('HomeContentEditor Component & Mock Adapter', () => {
  beforeEach(async () => {
    await mockHomeContentAdapter.resetToDefault()
  })

  it('renders loading state initially and then displays hero form data', async () => {
    render(<HomeContentEditor />)

    expect(screen.getByText(/Loading Home Page schema/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByTestId('hero-headline-input')).toBeInTheDocument()
    })

    const headlineInput = screen.getByTestId('hero-headline-input') as HTMLInputElement
    expect(headlineInput.value).toBe('DAR EL MASHRQ')
  })

  it('allows editing fields, enables save button and saves to mock adapter', async () => {
    render(<HomeContentEditor />)

    await waitFor(() => {
      expect(screen.getByTestId('hero-headline-input')).toBeInTheDocument()
    })

    const headlineInput = screen.getByTestId('hero-headline-input') as HTMLInputElement
    const saveButton = screen.getByTestId('save-home-button')

    // Initial state: not dirty, button disabled
    expect(saveButton).toBeDisabled()

    // Edit headline
    fireEvent.change(headlineInput, { target: { value: 'DAR EL MASHRQ UPDATED' } })
    expect(saveButton).not.toBeDisabled()

    // Save changes
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByTestId('success-alert')).toBeInTheDocument()
    })

    // Verify adapter state was updated
    const updatedContent = await mockHomeContentAdapter.getHomeContent()
    expect(updatedContent.hero.headline).toBe('DAR EL MASHRQ UPDATED')
  })

  it('switches tabs to Stats and Why Dar ElMashrq correctly', async () => {
    render(<HomeContentEditor />)

    await waitFor(() => {
      expect(screen.getByTestId('tab-stats')).toBeInTheDocument()
    })

    // Click Stats tab
    fireEvent.click(screen.getByTestId('tab-stats'))
    expect(screen.getByText(/Statistic #1/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue('Foundation Year')).toBeInTheDocument()

    // Click Why tab
    fireEvent.click(screen.getByTestId('tab-why'))
    expect(screen.getByText('PROTOCOL // 01')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Engineering Rigor & BIM Precision')).toBeInTheDocument()
  })
})
