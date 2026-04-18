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
    <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
      {courses.map((course) => (
        <button
          key={course.slug}
          onClick={() => handleChange(course.slug)}
          className={`flex-shrink-0 px-3.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
            currentSlug === course.slug
              ? 'bg-gold-500 text-crimson-950 border-gold-400 font-semibold shadow-sm'
              : 'bg-transparent text-gold-300/80 border-crimson-600/50 hover:border-gold-500/70 hover:text-gold-200'
          }`}
        >
          {course.name}
        </button>
      ))}
    </div>
  )
}
