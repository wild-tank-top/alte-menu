import type { MenuItem, CourseSection } from '@/lib/supabase/types'
import { SECTION_LABELS } from '@/lib/utils'

interface Props {
  item: MenuItem
  section: CourseSection
  index: number
}

const SECTION_COLORS: Record<CourseSection, string> = {
  amuse:       'bg-stone-100 text-stone-600',
  entree_1:    'bg-amber-50 text-amber-700',
  entree_2:    'bg-amber-50 text-amber-700',
  entree_3:    'bg-amber-50 text-amber-700',
  fish:        'bg-sky-50 text-sky-700',
  meat:        'bg-rose-50 text-rose-700',
  pre_dessert: 'bg-purple-50 text-purple-700',
  dessert:     'bg-purple-50 text-purple-700',
  mignardise:  'bg-stone-100 text-stone-600',
}

export default function MenuCard({ item, section, index }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
      {/* Section badge + index */}
      <div className={`flex items-center gap-2 px-4 py-2 ${SECTION_COLORS[section]}`}>
        <span className="text-xs font-bold tabular-nums opacity-60">{String(index).padStart(2, '0')}</span>
        <span className="text-xs font-semibold tracking-wide uppercase">{SECTION_LABELS[section]}</span>
      </div>

      <div className="p-4 space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-stone-800 leading-snug">{item.name}</h3>
          {item.name_en && (
            <p className="text-sm text-stone-400 italic mt-0.5">{item.name_en}</p>
          )}
        </div>

        {/* Ingredients & Sauce */}
        {(item.main_ingredients || item.sauce_description) && (
          <div className="flex flex-wrap gap-2">
            {item.main_ingredients && (
              <div className="text-xs bg-stone-50 border border-stone-100 rounded-lg px-3 py-1.5">
                <span className="text-stone-400 font-medium">食材 </span>
                <span className="text-stone-700">{item.main_ingredients}</span>
              </div>
            )}
            {item.sauce_description && (
              <div className="text-xs bg-stone-50 border border-stone-100 rounded-lg px-3 py-1.5">
                <span className="text-stone-400 font-medium">ソース </span>
                <span className="text-stone-700">{item.sauce_description}</span>
              </div>
            )}
          </div>
        )}

        {/* Concept */}
        {item.concept && (
          <p className="text-sm text-stone-500 italic border-l-2 border-amber-300 pl-3">
            {item.concept}
          </p>
        )}

        {/* Required explanation */}
        <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 space-y-1">
          <p className="text-xs font-bold text-amber-700 flex items-center gap-1">
            <span>★</span> 必ず伝えること
          </p>
          <p className="text-sm text-stone-800 leading-relaxed">{item.required_explanation}</p>
        </div>

        {/* Supplemental explanation */}
        {item.supplemental_explanation && (
          <details className="group">
            <summary className="text-xs font-medium text-stone-400 cursor-pointer select-none hover:text-stone-600 flex items-center gap-1">
              <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
              アドリブ補足情報
            </summary>
            <div className="mt-2 rounded-xl bg-stone-50 border border-stone-100 p-3">
              <p className="text-sm text-stone-600 leading-relaxed">{item.supplemental_explanation}</p>
            </div>
          </details>
        )}

        {/* English phrase */}
        {item.english_phrase && (
          <div className="rounded-xl bg-sky-50 border border-sky-100 p-3 space-y-1">
            <p className="text-xs font-bold text-sky-600 flex items-center gap-1">
              <span>🌍</span> 英語での案内
            </p>
            <p className="text-sm text-stone-700 leading-relaxed font-medium">{item.english_phrase}</p>
          </div>
        )}
      </div>
    </div>
  )
}
