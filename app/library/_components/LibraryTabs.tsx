'use client'

import { useState } from 'react'
import type { CookingTerm, WineVariety } from '@/lib/supabase/types'
import CookingTermsSection from './CookingTermsSection'
import WineGuideSection from './WineGuideSection'

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
      <div className="sticky top-[64px] z-10 bg-white border-b border-stone-100 px-4 pt-2 pb-0">
        <div className="flex gap-0">
          {(['terms', 'wine'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === t
                  ? 'border-amber-600 text-amber-700'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              {t === 'terms' ? '調理法辞書' : 'ワインガイド'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {tab === 'terms' ? (
          <CookingTermsSection terms={terms} />
        ) : (
          <WineGuideSection varieties={varieties} />
        )}
      </div>
    </div>
  )
}
