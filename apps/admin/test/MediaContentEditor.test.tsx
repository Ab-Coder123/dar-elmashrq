import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MediaContentEditor } from '@/components/content/MediaContentEditor'

describe('MediaContentEditor', () => {
  it('renders loading state initially and then loads media library assets', async () => {
    render(<MediaContentEditor />)

    expect(screen.getByText(/جاري تحميل مكتبة الوسائط/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('مكتبة الوسائط والمستندات الرقمية')).toBeInTheDocument()
    })

    expect(screen.getByText('واجهة بيفرلي العزيزية')).toBeInTheDocument()
    expect(screen.getByText('المبنى الخارجي لمستشفى وي كير')).toBeInTheDocument()
    expect(screen.getByText('خطاب الآيبان البنكي المعتمد')).toBeInTheDocument()
  })
})
