/**
 * Supabase Client for Browser Environment
 * 
 * このモジュールは、ブラウザ環境（Client Components）で使用するSupabaseクライアントを提供します。
 * クッキーベースのセッション管理を行い、認証状態を維持します。
 */
import { createBrowserClient } from '@supabase/ssr'

// 環境変数の型安全なアクセス
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 環境変数の検証
if (!SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

/**
 * ブラウザ用Supabaseクライアントを作成
 * 
 * @returns Supabaseクライアントインスタンス
 */
export function createClient() {
  // 型アサーションを使用（環境変数は事前に検証済み）
  return createBrowserClient(
    SUPABASE_URL as string,
    SUPABASE_ANON_KEY as string
  )
}

// 型定義のエクスポート（将来的にはSupabaseから生成されたtypes.tsを使用）
export type SupabaseClient = ReturnType<typeof createClient>