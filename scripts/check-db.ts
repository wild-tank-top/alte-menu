/**
 * Supabase 接続確認スクリプト
 * 実行: npx tsx scripts/check-db.ts
 */
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('❌ 環境変数が設定されていません')
  process.exit(1)
}

const supabase = createClient(url, key)

async function checkTables() {
  const tables = ['courses', 'menu_items', 'course_menu_items', 'cooking_terms', 'wine_varieties']
  const results: Record<string, { exists: boolean; count?: number; error?: string }> = {}

  for (const table of tables) {
    const { count, error } = await (supabase as any)
      .from(table)
      .select('*', { count: 'exact', head: true })

    if (error) {
      results[table] = { exists: false, error: error.message }
    } else {
      results[table] = { exists: true, count: count ?? 0 }
    }
  }

  return results
}

async function main() {
  console.log('\n🔌 Supabase 接続確認')
  console.log(`   URL: ${url}\n`)

  const results = await checkTables()
  let allOk = true

  for (const [table, result] of Object.entries(results)) {
    if (result.exists) {
      console.log(`  ✅ ${table.padEnd(20)} ${result.count} 件`)
    } else {
      console.log(`  ❌ ${table.padEnd(20)} ${result.error}`)
      allOk = false
    }
  }

  console.log()
  if (allOk) {
    console.log('✅ 全テーブル確認OK — データベース接続成功\n')
  } else {
    console.log('⚠️  一部テーブルが見つかりません。supabase/schema.sql を実行してください。\n')
  }
}

main().catch(console.error)
