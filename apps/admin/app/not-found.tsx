import React from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react'

export default function AdminNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-amber-50 text-amber-600 mb-4 border border-amber-200">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">Admin Section Not Found</h2>
      <p className="mt-2 max-w-md text-sm text-slate-600">
        The requested CMS route does not exist or has not been configured in the current Phase 01 architecture.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-sm bg-[#123C82] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0d2e6a] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Admin Overview</span>
        </Link>
      </div>
    </div>
  )
}
