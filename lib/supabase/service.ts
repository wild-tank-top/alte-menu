import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * サービスロールクライアント（サーバーサイド専用）
 * RLS をバイパスして書き込み操作に使用する。
 * 絶対にクライアントコンポーネントで import しないこと。
 */
export function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
