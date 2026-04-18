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
    <div className="flex bg-crimson-900/80 rounded-full p-0.5 border border-crimson-700/50">
      {(['lunch', 'dinner'] as const).map((type) => (
        <button
          key={type}
          onClick={() => handleChange(type)}
          className={`flex-1 py-1.5 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
            current === type
              ? 'bg-gold-500 text-crimson-950 font-semibold shadow-sm'
              : 'text-crimson-200 hover:text-gold-200'
          }`}
        >
          {type === 'lunch' ? 'ランチ' : 'ディナー'}
        </button>
      ))}
    </div>
  )
}
