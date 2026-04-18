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
      <header className="relative sticky top-0 z-20 header-luxury shadow-xl gold-rule-bottom">
        <div className="px-4 pt-4 pb-3 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-[26px] font-semibold gold-shimmer tracking-wider leading-none">
              Alte Menu
            </h1>
            <span className="font-caps text-[9px] tracking-[0.25em] text-crimson-400 uppercase">
              Staff Guide
            </span>
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
          <div className="flex flex-col items-center justify-center py-24 text-crimson-300">
            <p className="text-4xl mb-4">🍽</p>
            <p className="text-sm">コースが見つかりません</p>
          </div>
        )}
      </main>
    </div>
  )
}
