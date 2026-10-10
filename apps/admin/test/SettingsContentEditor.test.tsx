import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SettingsContentEditor } from '@/components/content/SettingsContentEditor'

describe('SettingsContentEditor', () => {
  it('renders loading state initially and then loads site settings', async () => {
    render(<SettingsContentEditor />)

    expect(screen.getByText(/جاري تحميل إعدادات النظام/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('إعدادات النظام والموقع العام')).toBeInTheDocument()
    })

    expect(screen.getByDisplayValue('شركة دار المشرق للتجارة والمقاولات')).toBeInTheDocument()
    expect(screen.getByDisplayValue('#123C82')).toBeInTheDocument()
    expect(screen.getByDisplayValue('#BA9563')).toBeInTheDocument()
  })
})
