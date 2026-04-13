'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Course } from '@/lib/supabase/types'

export default function CourseSelector({
  courses,
  currentSlug,
}: {
  courses: Course[]
  currentSlug: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(slug: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('course', slug)
    router.push(`/menu?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {courses.map((course) => (
        <button
          key={course.slug}
          onClick={() => handleChange(course.slug)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            currentSlug === course.slug
              ? 'bg-amber-700 text-white border-amber-700'
              : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400'
          }`}
        >
          {course.name}
        </button>
      ))}
    </div>
  )
}
