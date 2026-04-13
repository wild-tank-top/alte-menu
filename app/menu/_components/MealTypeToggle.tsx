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
    <div className="flex bg-stone-100 rounded-xl p-1 gap-1">
      {(['lunch', 'dinner'] as const).map((type) => (
        <button
          key={type}
          onClick={() => handleChange(type)}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            current === type
              ? 'bg-white text-amber-700 shadow-sm'
              : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          {type === 'lunch' ? 'ランチ' : 'ディナー'}
        </button>
      ))}
    </div>
  )
}
