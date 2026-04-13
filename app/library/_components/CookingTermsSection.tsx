import type { CookingTerm, TermCategory } from '@/lib/supabase/types'

const CATEGORY_LABELS: Record<TermCategory, { label: string; color: string }> = {
  cooking_method: { label: '調理法', color: 'bg-amber-100 text-amber-800' },
  sauce:          { label: 'ソース', color: 'bg-sky-100 text-sky-800' },
  technique:      { label: 'テクニック', color: 'bg-emerald-100 text-emerald-800' },
  other:          { label: 'その他', color: 'bg-stone-100 text-stone-700' },
}

export default function CookingTermsSection({ terms }: { terms: CookingTerm[] }) {
  const byCategory = terms.reduce<Partial<Record<TermCategory, CookingTerm[]>>>((acc, t) => {
    ;(acc[t.category] ??= []).push(t)
    return acc
  }, {})

  const categoryOrder: TermCategory[] = ['cooking_method', 'sauce', 'technique', 'other']

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-bold text-stone-800">調理法辞書</h2>

      {categoryOrder.map((cat) => {
        const items = byCategory[cat]
        if (!items?.length) return null
        const { label, color } = CATEGORY_LABELS[cat]

        return (
          <div key={cat} className="space-y-2">
            <h3 className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${color}`}>
              {label}
            </h3>
            <div className="space-y-2">
              {items.map((term) => (
                <div key={term.id} className="bg-white rounded-xl border border-stone-100 p-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-base font-bold text-stone-800">{term.term}</span>
                    {term.reading && (
                      <span className="text-xs text-stone-400">{term.reading}</span>
                    )}
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">{term.description}</p>
                  {term.example && (
                    <p className="text-xs text-stone-400 mt-2 italic">例: {term.example}</p>
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
