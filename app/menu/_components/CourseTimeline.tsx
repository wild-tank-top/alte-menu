import type { CourseWithItems } from '@/lib/supabase/types'
import MenuCard from './MenuCard'

export default function CourseTimeline({ course }: { course: CourseWithItems }) {
  const items = course.course_menu_items

  return (
    <div>
      {/* Course header — sticky below the main header */}
      <div className="sticky top-[148px] z-10 px-4 py-2.5 bg-gold-50 border-b border-gold-200/60">
        <h2 className="font-display text-lg font-semibold text-crimson-700 leading-tight">
          {course.name}
        </h2>
        {course.description && (
          <p className="text-[11px] text-crimson-400 mt-0.5 tracking-wide">{course.description}</p>
        )}
      </div>

      {/* Timeline */}
      <div className="relative px-4 pt-5 pb-10">
        {/* Vertical gold line */}
        <div
          className="absolute left-[28px] top-5 bottom-10 w-px"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #d4a030 6%, #e3bc60 50%, #d4a030 94%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <ol className="space-y-5">
          {items.map((ci, idx) => (
            <li
              key={ci.id}
              className="relative flex gap-3 card-enter"
              style={{ animationDelay: `${idx * 55}ms` }}
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0 w-8 flex items-start justify-center pt-4">
                <div className="w-2.5 h-2.5 rounded-full bg-gold-400 ring-[3px] ring-gold-100 shadow dot-pulse" />
              </div>

              {/* Card */}
              <div className="flex-1 min-w-0">
                <MenuCard item={ci.menu_item} section={ci.section} index={idx + 1} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
