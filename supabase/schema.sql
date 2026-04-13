-- ======================================================
-- alte-menu: Restaurant Staff Menu Education App Schema
-- ======================================================

-- 1. コーステーブル
CREATE TABLE courses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,  -- 'lunch_B' | 'lunch_EP' | 'dinner_AL' | 'dinner_SP'
  name        TEXT NOT NULL,         -- 'コース B' | 'EP コース' etc.
  meal_type   TEXT NOT NULL CHECK (meal_type IN ('lunch', 'dinner')),
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. メニューカード（パーツ）テーブル
CREATE TABLE menu_items (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                     TEXT NOT NULL,
  name_en                  TEXT,
  photo_url                TEXT,
  main_ingredients         TEXT,
  sauce_description        TEXT,
  concept                  TEXT,
  required_explanation     TEXT NOT NULL,   -- 必須で伝えるべき内容
  supplemental_explanation TEXT,            -- アドリブ用補足情報
  english_phrase           TEXT,            -- 英語での説明フレーズ
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW()
);

-- 3. コース↔メニューカード 中間テーブル（多対多 + 順序 + セクション）
CREATE TABLE course_menu_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  menu_item_id  UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  section       TEXT NOT NULL,
  -- セクション例: 'amuse' | 'entree_1' | 'entree_2' | 'entree_3'
  --               | 'fish' | 'meat' | 'pre_dessert' | 'dessert' | 'mignardise'
  UNIQUE (course_id, menu_item_id)
);

CREATE INDEX course_menu_items_course_id_idx ON course_menu_items (course_id, sort_order);

-- 4. 調理法辞書テーブル
CREATE TABLE cooking_terms (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term        TEXT NOT NULL,
  reading     TEXT,             -- ふりがな
  category    TEXT NOT NULL,    -- 'cooking_method' | 'sauce' | 'technique' | 'other'
  description TEXT NOT NULL,
  example     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ワイン品種ガイドテーブル
CREATE TABLE wine_varieties (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  name_en         TEXT NOT NULL,
  color           TEXT NOT NULL CHECK (color IN ('red', 'white', 'rose', 'sparkling')),
  body            TEXT,     -- 'light' | 'medium' | 'full'
  acidity         TEXT,     -- 'low' | 'medium' | 'high'
  tannin          TEXT,     -- 'low' | 'medium' | 'high'
  aroma           TEXT,
  flavor_notes    TEXT,
  typical_regions TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ======================================================
-- Row Level Security (RLS)
-- ======================================================
ALTER TABLE courses           ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items        ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cooking_terms     ENABLE ROW LEVEL SECURITY;
ALTER TABLE wine_varieties    ENABLE ROW LEVEL SECURITY;

-- 認証済みユーザーは全テーブルを読み取り可能
CREATE POLICY "Authenticated users can read courses"
  ON courses FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read menu_items"
  ON menu_items FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read course_menu_items"
  ON course_menu_items FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read cooking_terms"
  ON cooking_terms FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read wine_varieties"
  ON wine_varieties FOR SELECT USING (auth.role() = 'authenticated');

-- 管理者のみ書き込み可能（role = 'service_role' or claims に admin フラグ）
CREATE POLICY "Admins can write courses"
  ON courses FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can write menu_items"
  ON menu_items FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can write course_menu_items"
  ON course_menu_items FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can write cooking_terms"
  ON cooking_terms FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can write wine_varieties"
  ON wine_varieties FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
