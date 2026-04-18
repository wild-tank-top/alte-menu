'use server'

import { revalidatePath } from 'next/cache'
import type { CourseSection } from '@/lib/supabase/types'

interface AssignedItemInput {
  menu_item_id: string
  section: CourseSection
}

export async function saveCourseAssignments(
  courseId: string,
  items: AssignedItemInput[]
): Promise<{ error?: string }> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { error: 'Supabase が設定されていません。.env.local を確認してください。' }
  }

  const { createServiceClient } = await import('@/lib/supabase/service')
  const supabase = createServiceClient()

  const { error: deleteError } = await supabase
    .from('course_menu_items')
    .delete()
    .eq('course_id', courseId)
  if (deleteError) return { error: deleteError.message }

  if (items.length > 0) {
    const rows = items.map((a, i) => ({
      course_id: courseId,
      menu_item_id: a.menu_item_id,
      section: a.section,
      sort_order: i + 1,
    }))
    const { error } = await supabase.from('course_menu_items').insert(rows)
    if (error) return { error: error.message }
  }

  revalidatePath(`/admin/courses/${courseId}`)
  revalidatePath('/menu')
  return {}
}
