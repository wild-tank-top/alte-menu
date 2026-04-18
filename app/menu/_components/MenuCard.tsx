import type { MenuItem, CourseSection } from '@/lib/supabase/types'
import { SECTION_LABELS } from '@/lib/utils'

interface Props {
  item: MenuItem
  section: CourseSection
  index: number
}

const SECTION_BADGE: Record<CourseSection, { bg: string; text: string }> = {
  amuse:       { bg: 'bg-crimson-800',  text: 'text-gold-300' },
  entree_1:    { bg: 'bg-crimson-700',  text: 'text-gold-300' },
  entree_2:    { bg: 'bg-crimson-700',  text: 'text-gold-300' },
  entree_3:    { bg: 'bg-crimson-700',  text: 'text-gold-300' },
  fish:        { bg: 'bg-[#0f2840]',    text: 'text-sky-300' },
  meat:        { bg: 'bg-crimson-900',  text: 'text-gold-400' },
  pre_dessert: { bg: 'bg-[#2a1540]',   text: 'text-purple-300' },
  dessert:     { bg: 'bg-[#2a1540]',   text: 'text-purple-300' },
  mignardise:  { bg: 'bg-crimson-800',  text: 'text-gold-300' },
}

export default function MenuCard({ item, section, index }: Props) {
  const { bg, text } = SECTION_BADGE[section]

  return (
    <article
      className="bg-white rounded-2xl shadow-sm overflow-hidden"
      style={{ border: '1px solid rgba(212,160,48,0.22)' }}
    >
      {/* Section header */}
      <div className={`flex items-center justify-between px-4 py-2.5 ${bg}`}>
        <span className={`font-caps text-[10px] tracking-[0.28em] uppercase ${text}`}>
          {SECTION_LABELS[section]}
        </span>
        <span className={`font-caps text-[10px] tabular-nums opacity-40 ${text}`}>
          {String(index).padStart(2, '0')}
        </span>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Dish title */}
        <div>
          <h3 className="font-display text-[22px] font-semibold text-crimson-800 leading-tight tracking-wide">
            {item.name}
          </h3>
          {item.name_en && (
            <p className="font-display text-sm text-crimson-400 italic mt-0.5 tracking-wide">
              {item.name_en}
            </p>
          )}
        </div>

        {/* Gold divider */}
        <div className="gold-rule" />

        {/* Ingredients & Sauce */}
        {(item.main_ingredients || item.sauce_description) && (
          <div className="flex flex-wrap gap-1.5">
            {item.main_ingredients && (
              <span
                className="inline-flex items-center gap-1.5 text-xs bg-gold-50 rounded-lg px-2.5 py-1.5"
                style={{ border: '1px solid rgba(212,160,48,0.3)' }}
              >
                <span className="text-gold-600 font-medium">食材</span>
                <span className="text-crimson-700">{item.main_ingredients}</span>
              </span>
            )}
            {item.sauce_description && (
              <span
                className="inline-flex items-center gap-1.5 text-xs bg-gold-50 rounded-lg px-2.5 py-1.5"
                style={{ border: '1px solid rgba(212,160,48,0.3)' }}
              >
                <span className="text-gold-600 font-medium">ソース</span>
                <span className="text-crimson-700">{item.sauce_description}</span>
              </span>
            )}
          </div>
        )}

        {/* Concept */}
        {item.concept && (
          <p className="font-display text-sm text-crimson-500 italic leading-relaxed border-l-[3px] border-gold-300 pl-3">
            {item.concept}
          </p>
        )}

        {/* Required explanation ── most important */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(154,32,32,0.2)', background: 'rgba(253,242,242,0.8)' }}
        >
          <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5">
            <span className="text-gold-500 text-[11px]">✦</span>
            <span className="font-caps text-[9px] tracking-[0.28em] text-crimson-500 uppercase">
              必ず伝えること
            </span>
          </div>
          <div className="px-3 pb-3">
            <p className="text-sm text-crimson-900 leading-relaxed">{item.required_explanation}</p>
          </div>
        </div>

        {/* Supplemental */}
        {item.supplemental_explanation && (
          <details className="group">
            <summary className="flex items-center gap-1.5 text-xs font-medium text-crimson-400 cursor-pointer select-none hover:text-crimson-600 list-none">
              <span className="inline-block transition-transform duration-200 group-open:rotate-90 text-gold-400 text-[10px]">
                ▶
              </span>
              アドリブ補足情報
            </summary>
            <div
              className="mt-2 rounded-xl px-3 py-2.5"
              style={{ background: 'rgba(253,248,236,0.7)', border: '1px solid rgba(212,160,48,0.2)' }}
            >
              <p className="text-sm text-crimson-700 leading-relaxed">{item.supplemental_explanation}</p>
            </div>
          </details>
        )}

        {/* English phrase */}
        {item.english_phrase && (
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(212,160,48,0.3)', background: 'rgba(253,248,236,0.6)' }}
          >
            <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5">
              <span className="text-[11px]">🌍</span>
              <span className="font-caps text-[9px] tracking-[0.28em] text-gold-600 uppercase">
                English Presentation
              </span>
            </div>
            <div className="px-3 pb-3">
              <p className="font-display text-sm text-crimson-800 italic leading-relaxed">
                {item.english_phrase}
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
