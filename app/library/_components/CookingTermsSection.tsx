import type { CookingTerm, TermCategory } from '@/lib/supabase/types'

const CATEGORY_CONFIG: Record<TermCategory, { label: string; bg: string; text: string }> = {
  cooking_method: { label: '調理法',     bg: 'bg-crimson-700', text: 'text-gold-300' },
  sauce:          { label: 'ソース',     bg: 'bg-crimson-800', text: 'text-gold-300' },
  technique:      { label: 'テクニック', bg: 'bg-crimson-600', text: 'text-gold-200' },
  other:          { label: 'その他',     bg: 'bg-crimson-900', text: 'text-gold-300' },
}

export default function CookingTermsSection({ terms }: { terms: CookingTerm[] }) {
  const byCategory = terms.reduce<Partial<Record<TermCategory, CookingTerm[]>>>((acc, t) => {
    ;(acc[t.category] ??= []).push(t)
    return acc
  }, {})

  const categoryOrder: TermCategory[] = ['cooking_method', 'sauce', 'technique', 'other']

  return (
    <section className="space-y-7">
      {categoryOrder.map((cat) => {
        const items = byCategory[cat]
        if (!items?.length) return null
        const { label, bg, text } = CATEGORY_CONFIG[cat]

        return (
          <div key={cat} className="space-y-2.5">
            {/* Category badge */}
            <div className="flex items-center gap-3">
              <span className={`font-caps text-[9px] tracking-[0.28em] uppercase px-3 py-1 rounded-full ${bg} ${text}`}>
                {label}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-gold-200/60 to-transparent" />
            </div>

            <div className="space-y-2">
              {items.map((term, idx) => (
                <div
                  key={term.id}
                  className="bg-white rounded-2xl p-4 card-enter"
                  style={{
                    border: '1px solid rgba(212,160,48,0.2)',
                    animationDelay: `${idx * 40}ms`,
                  }}
                >
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-[19px] font-semibold text-crimson-800 leading-tight">
                      {term.term}
                    </span>
                    {term.reading && (
                      <span className="text-xs text-crimson-400 tracking-wider">{term.reading}</span>
                    )}
                  </div>
                  <div className="gold-rule mb-2.5" />
                  <p className="text-sm text-crimson-700 leading-relaxed">{term.description}</p>
                  {term.example && (
                    <p className="font-display text-xs text-crimson-400 mt-2 italic">
                      例: {term.example}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
