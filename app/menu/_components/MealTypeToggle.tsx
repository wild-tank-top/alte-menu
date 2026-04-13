'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { MealType } from '@/lib/supabase/types'

export default function MealTypeToggle({ current }: { current: MealType }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(type: MealType) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('meal', type)
    params.delete('course')
    router.push(`/menu?${params.toString()}`)
  }

  return (
    <div className="flex bg-crimson-800 rounded-xl p-1 gap-1">
      {(['lunch', 'dinner'] as const).map((type) => (
        <button
          key={type}
          onClick={() => handleChange(type)}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            current === type
              ? 'bg-gold-500 text-crimson-950 shadow-sm'
              : 'text-crimson-200 hover:text-gold-200'
          }`}
        >
          {type === 'lunch' ? 'ランチ' : 'ディナー'}
        </button>
      ))}
    </div>
  )
}
