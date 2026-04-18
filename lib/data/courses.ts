import type { Course, CourseWithItems, MealType } from '@/lib/supabase/types'
import { MOCK_COURSES, MOCK_COURSES_WITH_ITEMS } from '@/lib/data/mock'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL

export async function getCoursesByMealType(mealType: MealType): Promise<CourseWithItems[]> {
  if (USE_MOCK) {
    return MOCK_COURSES_WITH_ITEMS.filter((c) => c.meal_type === mealType)
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      course_menu_items (
        *,
        menu_item:menu_items (*)
      )
    `)
    .eq('meal_type', mealType)
    .order('slug')

  if (error) throw error
  return (data ?? []).map((course) => ({
    ...course,
    course_menu_items: [...(course.course_menu_items ?? [])].sort(
      (a, b) => a.sort_order - b.sort_order
    ),
  }))
}

export async function getAllCourses(): Promise<Course[]> {
  if (USE_MOCK) return MOCK_COURSES

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('meal_type')
    .order('slug')

  if (error) throw error
  return data ?? []
}

export async function getCourseById(id: string): Promise<CourseWithItems | null> {
  if (USE_MOCK) {
    return MOCK_COURSES_WITH_ITEMS.find((c) => c.id === id) ?? null
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      course_menu_items (
        *,
        menu_item:menu_items (*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) return null
  return {
    ...data,
    course_menu_items: [...(data.course_menu_items ?? [])].sort(
      (a, b) => a.sort_order - b.sort_order
    ),
  }
}

export async function getCourseBySlug(slug: string): Promise<CourseWithItems | null> {
  if (USE_MOCK) {
    return MOCK_COURSES_WITH_ITEMS.find((c) => c.slug === slug) ?? null
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      course_menu_items (
        *,
        menu_item:menu_items (*)
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) return null
  return {
    ...data,
    course_menu_items: [...(data.course_menu_items ?? [])].sort(
      (a, b) => a.sort_order - b.sort_order
    ),
  }
}
