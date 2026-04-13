import type { CookingTerm, WineVariety } from '@/lib/supabase/types'
import { MOCK_COOKING_TERMS, MOCK_WINE_VARIETIES } from '@/lib/data/mock'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL

export async function getCookingTerms(): Promise<CookingTerm[]> {
  if (USE_MOCK) return MOCK_COOKING_TERMS

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cooking_terms')
    .select('*')
    .order('category')
    .order('term')

  if (error) throw error
  return data ?? []
}

export async function getWineVarieties(): Promise<WineVariety[]> {
  if (USE_MOCK) return MOCK_WINE_VARIETIES

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('wine_varieties')
    .select('*')
    .order('color')
    .order('name')

  if (error) throw error
  return data ?? []
}
