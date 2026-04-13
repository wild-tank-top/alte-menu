import { Suspense } from 'react'
import type { MealType } from '@/lib/supabase/types'
import { getCoursesByMealType } from '@/lib/data/courses'
import MealTypeToggle from './_components/MealTypeToggle'
import CourseSelector from './_components/CourseSelector'
import CourseTimeline from './_components/CourseTimeline'

interface SearchParams {
  meal?: string
  course?: string
}

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { meal, course } = await searchParams

  const mealType: MealType = meal === 'dinner' ? 'dinner' : 'lunch'
  const courses = await getCoursesByMealType(mealType)

  const defaultSlug = courses[0]?.slug ?? ''
  const selectedSlug = course && courses.some((c) => c.slug === course) ? course : defaultSlug
  const selectedCourse = courses.find((c) => c.slug === selectedSlug) ?? courses[0]

  return (
    <div className="min-h-screen">
      {/* Sticky header */}
      <header className="sticky top-0 z-20 bg-white border-b border-stone-100 shadow-sm">
        <div className="px-4 pt-4 pb-2 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-stone-800 tracking-tight">Alte Menu</h1>
            <span className="text-xs text-stone-400 font-medium">スタッフ用</span>
          </div>
          <Suspense>
            <MealTypeToggle current={mealType} />
          </Suspense>
          {courses.length > 0 && (
            <Suspense>
              <CourseSelector courses={courses} currentSlug={selectedSlug} />
            </Suspense>
          )}
        </div>
      </header>

      {/* Course content */}
      <main>
        {selectedCourse ? (
          <CourseTimeline course={selectedCourse} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-stone-400">
            <p className="text-4xl mb-4">🍽</p>
            <p className="text-sm">コースが見つかりません</p>
          </div>
        )}
      </main>
    </div>
  )
}
