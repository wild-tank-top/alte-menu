-- =====================================================
-- RLS ポリシーの修正
-- Supabase Dashboard > SQL Editor で実行してください
-- =====================================================

-- 既存の SELECT ポリシーを削除して再作成（anon + authenticated 両方を許可）

DROP POLICY IF EXISTS "Authenticated users can read courses"           ON courses;
DROP POLICY IF EXISTS "Authenticated users can read menu_items"        ON menu_items;
DROP POLICY IF EXISTS "Authenticated users can read course_menu_items" ON course_menu_items;
DROP POLICY IF EXISTS "Authenticated users can read cooking_terms"     ON cooking_terms;
DROP POLICY IF EXISTS "Authenticated users can read wine_varieties"    ON wine_varieties;

-- 全員（ログイン不要）が読み取り可能
CREATE POLICY "Anyone can read courses"
  ON courses FOR SELECT USING (true);

CREATE POLICY "Anyone can read menu_items"
  ON menu_items FOR SELECT USING (true);

CREATE POLICY "Anyone can read course_menu_items"
  ON course_menu_items FOR SELECT USING (true);

CREATE POLICY "Anyone can read cooking_terms"
  ON cooking_terms FOR SELECT USING (true);

CREATE POLICY "Anyone can read wine_varieties"
  ON wine_varieties FOR SELECT USING (true);
