import type { MenuItem } from '@/lib/supabase/types'
import { MOCK_MENU_ITEMS } from '@/lib/data/mock'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL

export async function getAllMenuItems(): Promise<MenuItem[]> {
  if (USE_MOCK) return MOCK_MENU_ITEMS

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}
