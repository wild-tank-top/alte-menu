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
              ? 'bg-gold-500 text-crimson-950 border-gold-500'
              : 'bg-transparent text-gold-200 border-crimson-500 hover:border-gold-400 hover:text-gold-300'
          }`}
        >
          {course.name}
        </button>
      ))}
    </div>
  )
}
