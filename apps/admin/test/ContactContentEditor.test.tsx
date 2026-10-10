import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ContactContentEditor } from '@/components/content/ContactContentEditor'

describe('ContactContentEditor', () => {
  it('renders loading state initially and then loads contact offices', async () => {
    render(<ContactContentEditor />)

    expect(screen.getByText(/جاري تحميل بيانات الفروع والتواصل/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('إدارة بيانات التواصل والفروع')).toBeInTheDocument()
    })

    expect(screen.getByText('المقر الرئيسي - الرياض')).toBeInTheDocument()
    expect(screen.getByText('المكتب الإقليمي - القاهرة')).toBeInTheDocument()
    expect(screen.getByText('المكتب الإقليمي - الدوحة')).toBeInTheDocument()
  })
})
