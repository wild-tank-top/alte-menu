'use server'

import { revalidatePath } from 'next/cache'

interface MenuItemPayload {
  name: string
  name_en: string | null
  photo_url: string | null
  main_ingredients: string | null
  sauce_description: string | null
  concept: string | null
  required_explanation: string
  supplemental_explanation: string | null
  english_phrase: string | null
}

export async function saveMenuItem(
  id: string | null,
  data: MenuItemPayload
): Promise<{ error?: string }> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { error: 'Supabase が設定されていません。.env.local を確認してください。' }
  }

  const { createServiceClient } = await import('@/lib/supabase/service')
  const supabase = createServiceClient()

  if (id) {
    const { error } = await supabase
      .from('menu_items')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from('menu_items').insert(data)
    if (error) return { error: error.message }
  }

  revalidatePath('/admin/menu-items')
  return {}
}
