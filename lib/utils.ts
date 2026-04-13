import type { CourseSection } from '@/lib/supabase/types'

export const SECTION_LABELS: Record<CourseSection, string> = {
  amuse:       'アミューズ',
  entree_1:    '前菜 1',
  entree_2:    '前菜 2',
  entree_3:    '前菜 3',
  fish:        '魚料理',
  meat:        '肉料理',
  pre_dessert: 'プレデザート',
  dessert:     'デザート',
  mignardise:  'ミニャルディーズ',
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
