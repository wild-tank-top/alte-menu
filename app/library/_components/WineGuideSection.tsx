import type { WineVariety, WineColor } from '@/lib/supabase/types'

const COLOR_CONFIG: Record<WineColor, { label: string; dot: string; bg: string }> = {
  red:      { label: '赤ワイン', dot: 'bg-rose-600',   bg: 'bg-rose-50 border-rose-100' },
  white:    { label: '白ワイン', dot: 'bg-amber-400',  bg: 'bg-amber-50 border-amber-100' },
  rose:     { label: 'ロゼ',    dot: 'bg-pink-400',   bg: 'bg-pink-50 border-pink-100' },
  sparkling:{ label: 'スパークリング', dot: 'bg-sky-400', bg: 'bg-sky-50 border-sky-100' },
}

const LEVEL_BARS: Record<string, number> = { low: 1, medium: 2, high: 3 }

function LevelBar({ value, max = 3 }: { value: string | null; max?: number }) {
  if (!value) return <span className="text-stone-300 text-xs">—</span>
  const filled = LEVEL_BARS[value] ?? 0
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 w-4 rounded-full ${i < filled ? 'bg-amber-500' : 'bg-stone-200'}`}
        />
      ))}
    </div>
  )
}

function WineCard({ wine }: { wine: WineVariety }) {
  const { bg } = COLOR_CONFIG[wine.color]
  return (
    <div className={`rounded-xl border p-4 space-y-3 ${bg}`}>
      <div>
        <div className="flex items-baseline gap-2">
          <h4 className="font-bold text-stone-800">{wine.name}</h4>
          <span className="text-xs text-stone-500 italic">{wine.name_en}</span>
        </div>
        {wine.typical_regions && (
          <p className="text-xs text-stone-500 mt-0.5">{wine.typical_regions}</p>
        )}
      </div>

      {/* Attributes grid */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="text-stone-400 mb-1">ボディ</p>
          <LevelBar value={wine.body} />
        </div>
        <div>
          <p className="text-stone-400 mb-1">酸味</p>
          <LevelBar value={wine.acidity} />
        </div>
        <div>
          <p className="text-stone-400 mb-1">タンニン</p>
          <LevelBar value={wine.tannin} />
        </div>
      </div>

      {wine.aroma && (
        <p className="text-xs text-stone-600">
          <span className="font-medium text-stone-500">香り </span>{wine.aroma}
        </p>
      )}
      {wine.flavor_notes && (
        <p className="text-xs text-stone-600 leading-relaxed">{wine.flavor_notes}</p>
      )}
    </div>
  )
}

export default function WineGuideSection({ varieties }: { varieties: WineVariety[] }) {
  const byColor = varieties.reduce<Partial<Record<WineColor, WineVariety[]>>>((acc, v) => {
    ;(acc[v.color] ??= []).push(v)
    return acc
  }, {})

  const colorOrder: WineColor[] = ['sparkling', 'white', 'rose', 'red']

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-bold text-stone-800">ワインガイド</h2>
      <p className="text-sm text-stone-500 -mt-2">主要葡萄品種の特徴早見表</p>

      {colorOrder.map((color) => {
        const items = byColor[color]
        if (!items?.length) return null
        const { label, dot } = COLOR_CONFIG[color]

        return (
          <div key={color} className="space-y-2">
            <h3 className="flex items-center gap-2 text-sm font-bold text-stone-700">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${dot}`} />
              {label}
            </h3>
            <div className="space-y-2">
              {items.map((wine) => (
                <WineCard key={wine.id} wine={wine} />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
