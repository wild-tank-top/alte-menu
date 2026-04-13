-- =====================================================
-- 重複データの削除（各テーブルで name/term が同じ行のうち古い方を残す）
-- Supabase Dashboard > SQL Editor で実行してください
-- =====================================================

-- 1. course_menu_items の重複削除（先に削除しないと外部キー制約に引っかかる）
DELETE FROM course_menu_items
WHERE id NOT IN (
  SELECT DISTINCT ON (course_id, menu_item_id) id
  FROM course_menu_items
  ORDER BY course_id, menu_item_id, created_at ASC
);

-- 2. menu_items の重複削除
DELETE FROM menu_items
WHERE id NOT IN (
  SELECT DISTINCT ON (name) id
  FROM menu_items
  ORDER BY name, created_at ASC
);

-- 3. cooking_terms の重複削除
DELETE FROM cooking_terms
WHERE id NOT IN (
  SELECT DISTINCT ON (term) id
  FROM cooking_terms
  ORDER BY term, created_at ASC
);

-- 4. wine_varieties の重複削除
DELETE FROM wine_varieties
WHERE id NOT IN (
  SELECT DISTINCT ON (name) id
  FROM wine_varieties
  ORDER BY name, created_at ASC
);

-- 5. courses の重複削除（slug にユニーク制約があるので通常は不要だが念のため）
DELETE FROM courses
WHERE id NOT IN (
  SELECT DISTINCT ON (slug) id
  FROM courses
  ORDER BY slug, created_at ASC
);
