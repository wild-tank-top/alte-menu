'use client'

import { useState } from 'react'
import type { CookingTerm, WineVariety } from '@/lib/supabase/types'
import CookingTermsSection from './CookingTermsSection'
import WineGuideSection from './WineGuideSection'

const TABS = [
  { key: 'terms' as const, label: '調理法辞書' },
  { key: 'wine'  as const, label: 'ワインガイド' },
]

export default function LibraryTabs({
  terms,
  varieties,
}: {
  terms: CookingTerm[]
  varieties: WineVariety[]
}) {
  const [tab, setTab] = useState<'terms' | 'wine'>('terms')

  return (
    <div>
      {/* Tab bar */}
      <div className="sticky top-[82px] z-10 bg-gold-50 border-b border-gold-200/60">
        <div className="flex px-4">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-all duration-200 tracking-wide ${
                tab === key
                  ? 'border-gold-500 text-crimson-700 font-semibold'
                  : 'border-transparent text-crimson-400 hover:text-crimson-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5">
        {tab === 'terms' ? (
          <CookingTermsSection terms={terms} />
        ) : (
          <WineGuideSection varieties={varieties} />
        )}
      </div>
    </div>
  )
}
