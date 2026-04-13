/**
 * Supabase シードデータ投入スクリプト
 * 実行: npx tsx scripts/seed-db.ts
 */
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(url, key)

// ----------------------------------------
// 1. courses
// ----------------------------------------
const COURSES = [
  { slug: 'lunch_B',   name: 'コース B',       meal_type: 'lunch',  description: 'スタンダードランチコース' },
  { slug: 'lunch_EP',  name: 'EP コース',       meal_type: 'lunch',  description: 'エレガントプリフィックスランチコース' },
  { slug: 'dinner_AL', name: 'A La Carte',      meal_type: 'dinner', description: 'アラカルトディナーコース' },
  { slug: 'dinner_SP', name: 'Special Course',  meal_type: 'dinner', description: 'シェフズスペシャルディナーコース' },
]

// ----------------------------------------
// 2. menu_items
// ----------------------------------------
const MENU_ITEMS = [
  {
    name: 'アミューズ・ブッシュ',
    name_en: 'Amuse-bouche',
    main_ingredients: 'フォアグラ、ブリオッシュ',
    sauce_description: 'トリュフ塩',
    concept: '一口サイズで本日の料理の序章を演出',
    required_explanation: '本日の小さな前菜です。フォアグラをブリオッシュに乗せ、トリュフ塩でアクセントを加えています。',
    supplemental_explanation: '「アミューズ」はフランス語で「口を楽しませる」という意味。シェフからのウェルカムギフトとして提供します。',
    english_phrase: 'This is our amuse-bouche, a small bite to begin your journey. Foie gras on brioche with truffle salt.',
  },
  {
    name: '帆立貝のポッシェ',
    name_en: 'Poached Scallop',
    main_ingredients: '北海道産帆立貝',
    sauce_description: 'ブールブランソース、キャビア',
    concept: '繊細な火入れで帆立の甘みを最大限に引き出す',
    required_explanation: '北海道産の帆立貝をポッシェ（低温茹で）し、バターと白ワインのソースで仕上げています。上にキャビアをのせています。',
    supplemental_explanation: 'ポッシェとは70〜80度の湯で静かに茹でる調理法。帆立の食感を絹のように柔らかく保ちます。ブールブランは「白いバター」の意味。',
    english_phrase: 'Hokkaido scallop, gently poached to preserve its delicate sweetness, finished with beurre blanc sauce and Oscietra caviar.',
  },
  {
    name: 'フォアグラのポワレ',
    name_en: 'Pan-seared Foie Gras',
    main_ingredients: 'フランス産フォアグラ',
    sauce_description: 'ポルト酒のソース、バルサミコのリダクション',
    concept: '外はカリッと中はとろける食感のコントラスト',
    required_explanation: 'フランス産フォアグラを高温のパンでさっと焼き（ポワレ）、濃厚なポルト酒のソースで仕上げています。',
    supplemental_explanation: 'ポワレとはフライパンで焦げ目をつけながら焼く調理法。提供直前に仕上げるため、温かいうちにお召し上がりください。',
    english_phrase: 'French foie gras, pan-seared to achieve a crispy exterior with a luxuriously soft center, served with Porto wine reduction.',
  },
  {
    name: '鮮魚のロティ',
    name_en: 'Roasted Fish',
    main_ingredients: '本日の鮮魚（白身魚）',
    sauce_description: 'ヴェルジュソース、フヌイユのエチュベ',
    concept: '皮目をパリッと焼いた白身魚の上品な一皿',
    required_explanation: '本日の鮮魚を皮目からロティ（オーブン焼き）し、酸味のあるヴェルジュソースと蒸し煮にしたフヌイユを添えています。',
    supplemental_explanation: 'ロティとはオーブンを使った焼き料理。本日の魚は仕入れによって変わります。ヴェルジュはブドウの青汁を使った酸味のあるソースです。',
    english_phrase: "Today's fresh catch, oven-roasted skin-side down until perfectly crisp, served with verjuice sauce and braised fennel.",
  },
  {
    name: '牛フィレのロティ',
    name_en: 'Roasted Beef Tenderloin',
    main_ingredients: '国産牛フィレ肉',
    sauce_description: 'ペリグーソース、季節の野菜',
    concept: '最高級部位を理想の火入れで',
    required_explanation: '国産牛のフィレ肉をロゼ色に仕上げ、トリュフ入りのペリグーソースを合わせています。',
    supplemental_explanation: 'フィレ肉は牛の中で最も動かさない筋肉のため、最も柔らかい部位です。ペリグーソースはトリュフ風味のマデラソースです。',
    english_phrase: 'Japanese wagyu tenderloin, roasted to a perfect rosé, accompanied by Périgueux sauce — a rich Madeira sauce with black truffle.',
  },
  {
    name: 'ショコラのフォンダン',
    name_en: 'Chocolate Fondant',
    main_ingredients: 'ヴァローナ チョコレート',
    sauce_description: 'アングレーズソース、バニラアイスクリーム',
    concept: '割ると溶岩のように流れ出すチョコレートの魔法',
    required_explanation: 'ヴァローナ社のチョコレートを使ったフォンダン（溶岩ケーキ）です。中のトロトロのガナッシュはアングレーズソースと一緒にお召し上がりください。',
    supplemental_explanation: 'フォンダンとは「溶ける」という意味のフランス語。焼き加減が命で、ご注文から20分いただきます。',
    english_phrase: 'Valrhona chocolate fondant — break through the shell to reveal a flowing molten center, served with crème anglaise and vanilla ice cream.',
  },
]

// ----------------------------------------
// 3. cooking_terms
// ----------------------------------------
const COOKING_TERMS = [
  { term: 'ポッシェ',       reading: 'ぽっしぇ',      category: 'cooking_method', description: '70〜80℃の湯で食材をゆっくり茹でる調理法。素材の旨みと食感を保ちながら優しく火を入れる。',                          example: '帆立貝のポッシェ、鶏胸肉のポッシェ' },
  { term: 'ロティ',         reading: 'ろてぃ',        category: 'cooking_method', description: 'オーブンを使った焼き料理。高温で均一に熱を加え、外はカリッと中は柔らかく仕上げる。',                              example: '牛フィレのロティ、鮮魚のロティ' },
  { term: 'ポワレ',         reading: 'ぽわれ',        category: 'cooking_method', description: 'フライパンで油や脂を使い、焦げ目をつけながら焼く調理法。表面のメイラード反応で香ばしい風味を生む。',              example: 'フォアグラのポワレ、サーモンのポワレ' },
  { term: 'フラン',         reading: 'ふらん',        category: 'cooking_method', description: '卵と牛乳（またはクリーム）を合わせてオーブンで蒸し焼きにする調理法。プリン状またはキッシュ状の仕上がり。',          example: '野菜のフラン、ショコラのフラン' },
  { term: 'エチュベ',       reading: 'えちゅべ',      category: 'cooking_method', description: '少量の水分と蓋をして蒸し煮する調理法。食材の水分を活かして柔らかく仕上げる。',                                      example: 'フヌイユのエチュベ、野菜のエチュベ' },
  { term: 'コンカッセ',     reading: 'こんかっせ',    category: 'technique',      description: 'トマトの皮と種を除き、粗みじん切りにしたもの、またはその調理法。フレッシュなソースや付け合わせに使う。',              example: 'トマトコンカッセのソース' },
  { term: 'リダクション',   reading: 'りだくしょん',  category: 'technique',      description: 'ソースや液体を煮詰めて濃縮すること。旨みと風味を凝縮させる基本技法。',                                              example: 'バルサミコのリダクション' },
  { term: 'ブールブラン',   reading: 'ぶーるぶらん',  category: 'sauce',          description: '白ワインとシャロットを煮詰め、冷たいバターを少しずつ加えて乳化させた白いバターソース。魚介料理に多用。',              example: '帆立貝のブールブラン' },
  { term: 'ペリグーソース', reading: 'ぺりぐーそーす',category: 'sauce',          description: 'マデラ酒のソースにトリュフを加えた高級ソース。フォアグラや牛肉料理に合わせる。ペリゴール地方（フランス）に由来。',  example: '牛フィレのペリグーソース' },
  { term: 'アングレーズ',   reading: 'あんぐれーず',  category: 'sauce',          description: '牛乳・生クリーム・卵黄・砂糖で作るカスタードソース。デザートに添える基本のソース。',                              example: 'ショコラフォンダンのアングレーズ' },
  { term: 'ヴェルジュ',     reading: 'ゔぇるじゅ',   category: 'sauce',          description: '未熟なブドウから搾った酸味のある果汁。酢より穏やかな酸味で料理のアクセントに使う。',                              example: '鮮魚のヴェルジュソース' },
  { term: 'フォンダン',     reading: 'ふぉんだん',    category: 'other',          description: 'フランス語で「溶ける」の意。チョコレートのフォンダンは中にガナッシュが流れ出るケーキ。',                           example: 'ショコラのフォンダン' },
]

// ----------------------------------------
// 4. wine_varieties
// ----------------------------------------
const WINE_VARIETIES = [
  { name: 'シャルドネ',               name_en: 'Chardonnay',                   color: 'white',    body: 'full',   acidity: 'medium', tannin: null,   aroma: 'バター、ヴァニラ、リンゴ、ナシ',          flavor_notes: '樽熟成によりクリーミーでリッチ。辛口で魚料理・鶏肉に合う。',             typical_regions: 'ブルゴーニュ（フランス）、カリフォルニア' },
  { name: 'ソーヴィニヨン・ブラン',    name_en: 'Sauvignon Blanc',              color: 'white',    body: 'light',  acidity: 'high',   tannin: null,   aroma: 'グレープフルーツ、ハーブ、草',            flavor_notes: 'シャープな酸味と爽やかな香り。シーフード、山羊チーズに好相性。',     typical_regions: 'ロワール（フランス）、ニュージーランド' },
  { name: 'リースリング',              name_en: 'Riesling',                     color: 'white',    body: 'light',  acidity: 'high',   tannin: null,   aroma: '白桃、アプリコット、石油（熟成）',         flavor_notes: '繊細な甘みと高い酸味のバランス。辛口〜甘口まで幅広いスタイル。',   typical_regions: 'アルザス（フランス）、ドイツ、オーストリア' },
  { name: 'カベルネ・ソーヴィニヨン',  name_en: 'Cabernet Sauvignon',           color: 'red',      body: 'full',   acidity: 'medium', tannin: 'high', aroma: 'カシス、スギ、タバコ、ブラックベリー',    flavor_notes: '力強いタンニンと長い余韻。熟成で複雑みが増す。牛肉・ラムに最適。',  typical_regions: 'ボルドー（フランス）、ナパバレー（米）' },
  { name: 'ピノ・ノワール',            name_en: 'Pinot Noir',                   color: 'red',      body: 'light',  acidity: 'high',   tannin: 'low',  aroma: 'チェリー、イチゴ、腐葉土、スミレ',        flavor_notes: 'エレガントで繊細。タンニン穏やか。鴨・サーモン・キノコ料理に。',     typical_regions: 'ブルゴーニュ（フランス）、オレゴン（米）' },
  { name: 'シラー',                    name_en: 'Syrah / Shiraz',               color: 'red',      body: 'full',   acidity: 'medium', tannin: 'high', aroma: 'ブラックペッパー、スミレ、ブルーベリー',  flavor_notes: 'スパイシーで力強い。北ローヌはエレガント、オーストラリアはジャーミー。', typical_regions: 'ローヌ（フランス）、オーストラリア' },
  { name: 'ネッビオーロ',              name_en: 'Nebbiolo',                     color: 'red',      body: 'full',   acidity: 'high',   tannin: 'high', aroma: 'タール、バラ、チェリー、革',              flavor_notes: 'タンニンと酸味が強く長期熟成向き。イタリアの高級品種。',             typical_regions: 'ピエモンテ（イタリア）: バローロ、バルバレスコ' },
  { name: 'シャンパーニュ',            name_en: 'Champagne (Blanc de Blancs)',  color: 'sparkling', body: 'medium', acidity: 'high',  tannin: null,   aroma: '白い花、レモン、クリーム、トースト',       flavor_notes: '繊細な泡と生き生きとした酸味。食前酒やシーフードに万能。',           typical_regions: 'シャンパーニュ地方（フランス）' },
]

// course_menu_items の定義（menu_item の name で参照、後で id に変換）
const COURSE_ASSIGNMENTS: Record<string, { name: string; section: string; sort_order: number }[]> = {
  lunch_B: [
    { name: 'アミューズ・ブッシュ', section: 'amuse',    sort_order: 1 },
    { name: '帆立貝のポッシェ',     section: 'entree_1', sort_order: 2 },
    { name: '鮮魚のロティ',         section: 'fish',     sort_order: 3 },
    { name: 'ショコラのフォンダン', section: 'dessert',  sort_order: 4 },
  ],
  lunch_EP: [
    { name: 'アミューズ・ブッシュ', section: 'amuse',    sort_order: 1 },
    { name: 'フォアグラのポワレ',   section: 'entree_1', sort_order: 2 },
    { name: '帆立貝のポッシェ',     section: 'entree_2', sort_order: 3 },
    { name: '牛フィレのロティ',     section: 'meat',     sort_order: 4 },
    { name: 'ショコラのフォンダン', section: 'dessert',  sort_order: 5 },
  ],
  dinner_AL: [
    { name: 'アミューズ・ブッシュ', section: 'amuse',    sort_order: 1 },
    { name: '帆立貝のポッシェ',     section: 'entree_1', sort_order: 2 },
    { name: '鮮魚のロティ',         section: 'fish',     sort_order: 3 },
    { name: '牛フィレのロティ',     section: 'meat',     sort_order: 4 },
    { name: 'ショコラのフォンダン', section: 'dessert',  sort_order: 5 },
  ],
  dinner_SP: [
    { name: 'アミューズ・ブッシュ', section: 'amuse',    sort_order: 1 },
    { name: 'フォアグラのポワレ',   section: 'entree_1', sort_order: 2 },
    { name: '帆立貝のポッシェ',     section: 'entree_2', sort_order: 3 },
    { name: '鮮魚のロティ',         section: 'fish',     sort_order: 4 },
    { name: '牛フィレのロティ',     section: 'meat',     sort_order: 5 },
    { name: 'ショコラのフォンダン', section: 'dessert',  sort_order: 6 },
  ],
}

// ----------------------------------------
async function main() {
  console.log('\n🌱 Supabase シードデータ投入\n')

  // 1. courses
  process.stdout.write('  courses          ... ')
  const { data: courses, error: e1 } = await supabase
    .from('courses').insert(COURSES).select()
  if (e1) { console.log(`❌ ${e1.message}`); process.exit(1) }
  console.log(`✅ ${courses!.length} 件`)

  // 2. menu_items
  process.stdout.write('  menu_items       ... ')
  const { data: menuItems, error: e2 } = await supabase
    .from('menu_items').insert(MENU_ITEMS).select()
  if (e2) { console.log(`❌ ${e2.message}`); process.exit(1) }
  console.log(`✅ ${menuItems!.length} 件`)

  // 3. cooking_terms
  process.stdout.write('  cooking_terms    ... ')
  const { data: terms, error: e3 } = await supabase
    .from('cooking_terms').insert(COOKING_TERMS).select()
  if (e3) { console.log(`❌ ${e3.message}`); process.exit(1) }
  console.log(`✅ ${terms!.length} 件`)

  // 4. wine_varieties
  process.stdout.write('  wine_varieties   ... ')
  const { data: wines, error: e4 } = await supabase
    .from('wine_varieties').insert(WINE_VARIETIES).select()
  if (e4) { console.log(`❌ ${e4.message}`); process.exit(1) }
  console.log(`✅ ${wines!.length} 件`)

  // 5. course_menu_items (name → id に変換)
  process.stdout.write('  course_menu_items... ')
  const courseMap = Object.fromEntries(courses!.map((c: any) => [c.slug, c.id]))
  const itemMap   = Object.fromEntries(menuItems!.map((m: any) => [m.name, m.id]))

  const assignments = Object.entries(COURSE_ASSIGNMENTS).flatMap(([slug, items]) =>
    items.map(({ name, section, sort_order }) => ({
      course_id:    courseMap[slug],
      menu_item_id: itemMap[name],
      section,
      sort_order,
    }))
  )

  const { data: assigns, error: e5 } = await supabase
    .from('course_menu_items').insert(assignments).select()
  if (e5) { console.log(`❌ ${e5.message}`); process.exit(1) }
  console.log(`✅ ${assigns!.length} 件`)

  console.log('\n✅ 全データの投入が完了しました\n')
}

main().catch(console.error)
