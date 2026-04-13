import type { CourseWithItems } from '@/lib/supabase/types'
import MenuCard from './MenuCard'

export default function CourseTimeline({ course }: { course: CourseWithItems }) {
  const items = course.course_menu_items

  return (
    <div className="space-y-1">
      {/* Course header */}
      <div className="px-4 py-3 bg-white border-b border-stone-100 sticky top-[104px] z-10">
        <h2 className="text-base font-bold text-stone-700">{course.name}</h2>
        {course.description && (
          <p className="text-xs text-stone-400 mt-0.5">{course.description}</p>
        )}
      </div>

      {/* Timeline */}
      <div className="relative px-4 py-4">
        {/* Vertical line */}
        <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-stone-200" aria-hidden="true" />

        <ol className="space-y-4">
          {items.map((ci, idx) => (
            <li key={ci.id} className="relative flex gap-4">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0 w-8 h-8 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-white ring-offset-1" />
              </div>

              {/* Card */}
              <div className="flex-1 min-w-0 -mt-1">
                <MenuCard
                  item={ci.menu_item}
                  section={ci.section}
                  index={idx + 1}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
