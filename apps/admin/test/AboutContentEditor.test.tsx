import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AboutContentEditor } from '../components/content/AboutContentEditor'
import { mockAboutContentAdapter } from '../services/aboutContent.service'

describe('AboutContentEditor Component & Mock Adapter', () => {
  beforeEach(async () => {
    await mockAboutContentAdapter.resetToDefault()
  })

  it('renders loading state initially and then displays hero form data', async () => {
    render(<AboutContentEditor />)

    expect(screen.getByText(/Loading About Us content/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByTestId('about-headline-input')).toBeInTheDocument()
    })

    const headlineInput = screen.getByTestId('about-headline-input') as HTMLInputElement
    expect(headlineInput.value).toBe('AUTHORITY, RIGOR & HERITAGE')
  })

  it('allows editing fields, enables save button and saves to mock adapter', async () => {
    render(<AboutContentEditor />)

    await waitFor(() => {
      expect(screen.getByTestId('about-headline-input')).toBeInTheDocument()
    })

    const headlineInput = screen.getByTestId('about-headline-input') as HTMLInputElement
    const saveButton = screen.getByTestId('save-about-button')

    expect(saveButton).toBeDisabled()

    fireEvent.change(headlineInput, { target: { value: 'AUTHORITY & EXCELLENCE' } })
    expect(saveButton).not.toBeDisabled()

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByTestId('about-success-alert')).toBeInTheDocument()
    })

    const updatedContent = await mockAboutContentAdapter.getAboutContent()
    expect(updatedContent.hero.headline).toBe('AUTHORITY & EXCELLENCE')
  })

  it('switches tabs to Vision and History correctly', async () => {
    render(<AboutContentEditor />)

    await waitFor(() => {
      expect(screen.getByTestId('tab-about-vision')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('tab-about-vision'))
    expect(screen.getByText(/Official Vision Statement/i)).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('tab-about-history'))
    expect(screen.getByText('1994')).toBeInTheDocument()
    expect(screen.getByDisplayValue('FOUNDATION & ESTABLISHMENT')).toBeInTheDocument()
  })
})
