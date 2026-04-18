import type { WineVariety, WineColor } from '@/lib/supabase/types'

const COLOR_CONFIG: Record<WineColor, {
  label: string
  dot: string
  cardBg: string
  cardBorder: string
  barColor: string
}> = {
  red:       { label: '赤ワイン',       dot: 'bg-rose-700',   cardBg: 'rgba(255,245,245,0.8)',   cardBorder: 'rgba(200,80,80,0.2)',  barColor: 'bg-rose-600' },
  white:     { label: '白ワイン',       dot: 'bg-gold-400',   cardBg: 'rgba(253,248,236,0.7)',   cardBorder: 'rgba(212,160,48,0.25)', barColor: 'bg-gold-500' },
  rose:      { label: 'ロゼ',          dot: 'bg-pink-400',   cardBg: 'rgba(255,245,250,0.8)',   cardBorder: 'rgba(240,120,160,0.2)', barColor: 'bg-pink-500' },
  sparkling: { label: 'スパークリング', dot: 'bg-sky-400',    cardBg: 'rgba(245,250,255,0.8)',   cardBorder: 'rgba(100,170,220,0.2)', barColor: 'bg-sky-500' },
}

const LEVEL_VALUE: Record<string, number> = { low: 1, medium: 2, high: 3 }

function LevelBar({ value, barColor }: { value: string | null; barColor: string }) {
  if (!value) return <span className="text-crimson-300 text-xs">—</span>
  const filled = LEVEL_VALUE[value] ?? 0
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={`h-1.5 w-5 rounded-full ${i < filled ? barColor : 'bg-crimson-100'}`} />
      ))}
    </div>
  )
}

function WineCard({ wine }: { wine: WineVariety }) {
  const { cardBg, cardBorder, barColor } = COLOR_CONFIG[wine.color]

  return (
    <div
      className="rounded-2xl p-4 space-y-3"
      style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
    >
      <div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <h4 className="font-display text-[18px] font-semibold text-crimson-800 leading-tight">
            {wine.name}
          </h4>
          <span className="font-display text-xs text-crimson-400 italic">{wine.name_en}</span>
        </div>
        {wine.typical_regions && (
          <p className="text-[11px] text-crimson-400 mt-0.5 tracking-wide">{wine.typical_regions}</p>
        )}
      </div>

      {/* Attribute bars */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'ボディ',   value: wine.body },
          { label: '酸味',     value: wine.acidity },
          { label: 'タンニン', value: wine.tannin },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] text-crimson-400 mb-1.5 font-medium">{label}</p>
            <LevelBar value={value} barColor={barColor} />
          </div>
        ))}
      </div>

      {wine.aroma && (
        <>
          <div className="gold-rule" />
          <p className="text-xs text-crimson-600 leading-relaxed">
            <span className="font-medium text-crimson-500 mr-1">アロマ</span>
            {wine.aroma}
          </p>
        </>
      )}
      {wine.flavor_notes && (
        <p className="text-xs text-crimson-600 leading-relaxed">{wine.flavor_notes}</p>
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
    <section className="space-y-7">
      {colorOrder.map((color) => {
        const items = byColor[color]
        if (!items?.length) return null
        const { label, dot } = COLOR_CONFIG[color]

        return (
          <div key={color} className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`} />
              <span className="font-caps text-[10px] tracking-[0.25em] text-crimson-600 uppercase">
                {label}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-gold-200/60 to-transparent" />
            </div>
            <div className="space-y-2">
              {items.map((wine, idx) => (
                <div key={wine.id} className="card-enter" style={{ animationDelay: `${idx * 50}ms` }}>
                  <WineCard wine={wine} />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
