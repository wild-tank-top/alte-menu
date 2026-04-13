-- ======================================================
-- alte-menu: Seed Data
-- ======================================================

-- 1. コース
INSERT INTO courses (slug, name, meal_type, description) VALUES
  ('lunch_B',  'コース B',  'lunch',  'スタンダードランチコース'),
  ('lunch_EP', 'EP コース', 'lunch',  'エレガントプリフィックスランチコース'),
  ('dinner_AL','A La Carte', 'dinner', 'アラカルトディナーコース'),
  ('dinner_SP','Special Course', 'dinner', 'シェフズスペシャルディナーコース');

-- 2. メニューカード（パーツ）サンプル
INSERT INTO menu_items (name, name_en, main_ingredients, sauce_description, concept, required_explanation, supplemental_explanation, english_phrase) VALUES
(
  'アミューズ・ブッシュ',
  'Amuse-bouche',
  'フォアグラ、ブリオッシュ',
  'トリュフ塩',
  '一口サイズで本日の料理の序章を演出',
  '本日の小さな前菜です。フォアグラをブリオッシュに乗せ、トリュフ塩でアクセントを加えています。',
  '「アミューズ」はフランス語で「口を楽しませる」という意味。シェフからのウェルカムギフトとして提供します。',
  'This is our amuse-bouche, a small bite to begin your journey. Foie gras on brioche with truffle salt.'
),
(
  '帆立貝のポッシェ',
  'Poached Scallop',
  '北海道産帆立貝',
  'ブールブランソース、キャビア',
  '繊細な火入れで帆立の甘みを最大限に引き出す',
  '北海道産の帆立貝をポッシェ（低温茹で）し、バターと白ワインのソースで仕上げています。上にキャビアをのせています。',
  'ポッシェとは70〜80度の湯で静かに茹でる調理法。帆立の食感を絹のように柔らかく保ちます。ブールブランは「白いバター」の意味。',
  'Hokkaido scallop, gently poached to preserve its delicate sweetness, finished with beurre blanc sauce and Oscietra caviar.'
),
(
  'フォアグラのポワレ',
  'Pan-seared Foie Gras',
  'フランス産フォアグラ',
  'ポルト酒のソース、バルサミコのリダクション',
  '外はカリッと中はとろける食感のコントラスト',
  'フランス産フォアグラを高温のパンでさっと焼き（ポワレ）、濃厚なポルト酒のソースで仕上げています。',
  'ポワレとはフライパンで焦げ目をつけながら焼く調理法。提供直前に仕上げるため、温かいうちにお召し上がりください。',
  'French foie gras, pan-seared to achieve a crispy exterior with a luxuriously soft center, served with Porto wine reduction.'
),
(
  '鮮魚のロティ',
  'Roasted Fish',
  '本日の鮮魚（白身魚）',
  'ヴェルジュソース、フヌイユのエチュベ',
  '皮目をパリッと焼いた白身魚の上品な一皿',
  '本日の鮮魚を皮目からロティ（オーブン焼き）し、酸味のあるヴェルジュソースと蒸し煮にしたフヌイユを添えています。',
  'ロティとはオーブンを使った焼き料理。本日の魚は仕入れによって変わります。ヴェルジュはブドウの青汁を使った酸味のあるソースです。',
  'Today''s fresh catch, oven-roasted skin-side down until perfectly crisp, served with verjuice sauce and braised fennel.'
),
(
  '牛フィレのロティ',
  'Roasted Beef Tenderloin',
  '国産牛フィレ肉',
  'ペリグーソース、季節の野菜',
  '最高級部位を理想の火入れで',
  '国産牛のフィレ肉をロゼ色に仕上げ、トリュフ入りのペリグーソースを合わせています。',
  'フィレ肉は牛の中で最も動かさない筋肉のため、最も柔らかい部位です。ペリグーソースはトリュフ風味のマデラソースです。',
  'Japanese wagyu tenderloin, roasted to a perfect rosé, accompanied by Périgueux sauce — a rich Madeira sauce with black truffle.'
),
(
  'ショコラのフォンダン',
  'Chocolate Fondant',
  'ヴァローナ チョコレート',
  'アングレーズソース、バニラアイスクリーム',
  '割ると溶岩のように流れ出すチョコレートの魔法',
  'ヴァローナ社のチョコレートを使ったフォンダン（溶岩ケーキ）です。中のトロトロのガナッシュはアングレーズソースと一緒にお召し上がりください。',
  'フォンダンとは「溶ける」という意味のフランス語。焼き加減が命で、ご注文から20分いただきます。',
  'Valrhona chocolate fondant — break through the shell to reveal a flowing molten center, served with crème anglaise and vanilla ice cream.'
);

-- 3. コース↔メニューカードのアサイン
-- ランチ コースB
WITH c AS (SELECT id FROM courses WHERE slug = 'lunch_B'),
     items AS (
       SELECT id, name FROM menu_items WHERE name IN (
         'アミューズ・ブッシュ', '帆立貝のポッシェ', '鮮魚のロティ', 'ショコラのフォンダン'
       )
     )
INSERT INTO course_menu_items (course_id, menu_item_id, sort_order, section)
SELECT
  c.id,
  items.id,
  CASE items.name
    WHEN 'アミューズ・ブッシュ' THEN 1
    WHEN '帆立貝のポッシェ'     THEN 2
    WHEN '鮮魚のロティ'        THEN 3
    WHEN 'ショコラのフォンダン' THEN 4
  END,
  CASE items.name
    WHEN 'アミューズ・ブッシュ' THEN 'amuse'
    WHEN '帆立貝のポッシェ'     THEN 'entree_1'
    WHEN '鮮魚のロティ'        THEN 'fish'
    WHEN 'ショコラのフォンダン' THEN 'dessert'
  END
FROM c, items;

-- ディナー スペシャル コース
WITH c AS (SELECT id FROM courses WHERE slug = 'dinner_SP'),
     items AS (
       SELECT id, name FROM menu_items WHERE name IN (
         'アミューズ・ブッシュ', 'フォアグラのポワレ', '帆立貝のポッシェ',
         '鮮魚のロティ', '牛フィレのロティ', 'ショコラのフォンダン'
       )
     )
INSERT INTO course_menu_items (course_id, menu_item_id, sort_order, section)
SELECT
  c.id,
  items.id,
  CASE items.name
    WHEN 'アミューズ・ブッシュ' THEN 1
    WHEN 'フォアグラのポワレ'   THEN 2
    WHEN '帆立貝のポッシェ'     THEN 3
    WHEN '鮮魚のロティ'        THEN 4
    WHEN '牛フィレのロティ'     THEN 5
    WHEN 'ショコラのフォンダン' THEN 6
  END,
  CASE items.name
    WHEN 'アミューズ・ブッシュ' THEN 'amuse'
    WHEN 'フォアグラのポワレ'   THEN 'entree_1'
    WHEN '帆立貝のポッシェ'     THEN 'entree_2'
    WHEN '鮮魚のロティ'        THEN 'fish'
    WHEN '牛フィレのロティ'     THEN 'meat'
    WHEN 'ショコラのフォンダン' THEN 'dessert'
  END
FROM c, items;

-- 4. 調理法辞書
INSERT INTO cooking_terms (term, reading, category, description, example) VALUES
('ポッシェ', 'ぽっしぇ', 'cooking_method', '70〜80℃の湯で食材をゆっくり茹でる調理法。素材の旨みと食感を保ちながら優しく火を入れる。', '帆立貝のポッシェ、鶏胸肉のポッシェ'),
('ロティ', 'ろてぃ', 'cooking_method', 'オーブンを使った焼き料理。高温で均一に熱を加え、外はカリッと中は柔らかく仕上げる。', '牛フィレのロティ、鮮魚のロティ'),
('ポワレ', 'ぽわれ', 'cooking_method', 'フライパンで油や脂を使い、焦げ目をつけながら焼く調理法。表面のメイラード反応で香ばしい風味を生む。', 'フォアグラのポワレ、サーモンのポワレ'),
('フラン', 'ふらん', 'cooking_method', '卵と牛乳（またはクリーム）を合わせてオーブンで蒸し焼きにする調理法。プリン状またはキッシュ状の仕上がり。', '野菜のフラン、ショコラのフラン'),
('コンカッセ', 'こんかっせ', 'technique', 'トマトの皮と種を除き、粗みじん切りにしたもの、またはその調理法。フレッシュなソースや付け合わせに使う。', 'トマトコンカッセのソース'),
('エチュベ', 'えちゅべ', 'cooking_method', '少量の水分と蓋をして蒸し煮する調理法。食材の水分を活かして柔らかく仕上げる。', 'フヌイユのエチュベ、野菜のエチュベ'),
('ブールブラン', 'ぶーるぶらん', 'sauce', '白ワインとシャロットを煮詰め、冷たいバターを少しずつ加えて乳化させた白いバターソース。魚介料理に多用。', '帆立貝のブールブラン'),
('ペリグーソース', 'ぺりぐーそーす', 'sauce', 'マデラ酒のソースにトリュフを加えた高級ソース。フォアグラや牛肉料理に合わせる。ペリゴール地方（フランス）に由来。', '牛フィレのペリグーソース'),
('アングレーズ', 'あんぐれーず', 'sauce', '牛乳・生クリーム・卵黄・砂糖で作るカスタードソース。デザートに添える基本のソース。', 'ショコラフォンダンのアングレーズ'),
('ヴェルジュ', 'ゔぇるじゅ', 'sauce', '未熟なブドウから搾った酸味のある果汁。酢より穏やかな酸味で料理のアクセントに使う。', '鮮魚のヴェルジュソース'),
('リダクション', 'りだくしょん', 'technique', 'ソースや液体を煮詰めて濃縮すること。旨みと風味を凝縮させる基本技法。', 'バルサミコのリダクション'),
('フォンダン', 'ふぉんだん', 'other', 'フランス語で「溶ける」の意。チョコレートのフォンダンは中にガナッシュが流れ出るケーキ。', 'ショコラのフォンダン');

-- 5. ワイン品種ガイド
INSERT INTO wine_varieties (name, name_en, color, body, acidity, tannin, aroma, flavor_notes, typical_regions) VALUES
('シャルドネ', 'Chardonnay', 'white', 'full', 'medium', NULL, 'バター、ヴァニラ、リンゴ、ナシ', '樽熟成によりクリーミーでリッチ。辛口で魚料理・鶏肉に合う。', 'ブルゴーニュ（フランス）、カリフォルニア'),
('ソーヴィニヨン・ブラン', 'Sauvignon Blanc', 'white', 'light', 'high', NULL, 'グレープフルーツ、ハーブ、草、カシス芽', 'シャープな酸味と爽やかな香り。シーフード、山羊チーズに好相性。', 'ロワール（フランス）、ニュージーランド'),
('リースリング', 'Riesling', 'white', 'light', 'high', NULL, '白桃、アプリコット、石油（熟成）', '繊細な甘みと高い酸味のバランス。辛口〜甘口まで幅広いスタイル。', 'アルザス（フランス）、ドイツ、オーストリア'),
('カベルネ・ソーヴィニヨン', 'Cabernet Sauvignon', 'red', 'full', 'medium', 'high', 'カシス、スギ、タバコ、ブラックベリー', '力強いタンニンと長い余韻。熟成で複雑みが増す。牛肉・ラムに最適。', 'ボルドー（フランス）、ナパバレー（米）'),
('ピノ・ノワール', 'Pinot Noir', 'red', 'light', 'high', 'low', 'チェリー、イチゴ、腐葉土、スミレ', 'エレガントで繊細。タンニン穏やか。鴨・サーモン・キノコ料理に。', 'ブルゴーニュ（フランス）、オレゴン（米）'),
('シラー', 'Syrah / Shiraz', 'red', 'full', 'medium', 'high', 'ブラックペッパー、スミレ、ブルーベリー', 'スパイシーで力強い。北ローヌはエレガント、オーストラリアはジャーミー。', 'ローヌ（フランス）、オーストラリア'),
('ネッビオーロ', 'Nebbiolo', 'red', 'full', 'high', 'high', 'タール、バラ、チェリー、革', 'タンニンと酸味が強く長期熟成向き。イタリアの高級品種。', 'ピエモンテ（イタリア）: バローロ、バルバレスコ'),
('シャンパーニュ（シャルドネ主体）', 'Champagne (Blanc de Blancs)', 'sparkling', 'medium', 'high', NULL, '白い花、レモン、クリーム、トースト', '繊細な泡と生き生きとした酸味。食前酒やシーフードに万能。', 'シャンパーニュ地方（フランス）');
