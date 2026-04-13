export type MealType = 'lunch' | 'dinner'
export type CourseSection =
  | 'amuse'
  | 'entree_1'
  | 'entree_2'
  | 'entree_3'
  | 'fish'
  | 'meat'
  | 'pre_dessert'
  | 'dessert'
  | 'mignardise'

export type WineColor = 'red' | 'white' | 'rose' | 'sparkling'
export type TermCategory = 'cooking_method' | 'sauce' | 'technique' | 'other'

export interface Course {
  id: string
  slug: string
  name: string
  meal_type: MealType
  description: string | null
  created_at: string
}

export interface MenuItem {
  id: string
  name: string
  name_en: string | null
  photo_url: string | null
  main_ingredients: string | null
  sauce_description: string | null
  concept: string | null
  required_explanation: string
  supplemental_explanation: string | null
  english_phrase: string | null
  created_at: string
  updated_at: string
}

export interface CourseMenuItem {
  id: string
  course_id: string
  menu_item_id: string
  sort_order: number
  section: CourseSection
  menu_item?: MenuItem
}

export interface CourseWithItems extends Course {
  course_menu_items: (CourseMenuItem & { menu_item: MenuItem })[]
}

export interface CookingTerm {
  id: string
  term: string
  reading: string | null
  category: TermCategory
  description: string
  example: string | null
  created_at: string
}

export interface WineVariety {
  id: string
  name: string
  name_en: string
  color: WineColor
  body: string | null
  acidity: string | null
  tannin: string | null
  aroma: string | null
  flavor_notes: string | null
  typical_regions: string | null
  created_at: string
}
