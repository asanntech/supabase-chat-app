/**
 * Supabase Client for Server Environment
 * 
 * このモジュールは、サーバー環境（Server Components、Route Handlers、Server Actions）で
 * 使用するSupabaseクライアントを提供します。
 * Next.jsのcookies()を使用してセッション管理を行います。
 */
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

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
 * サーバー用Supabaseクライアントを作成
 * 
 * @returns Supabaseクライアントインスタンス
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    SUPABASE_URL as string,
    SUPABASE_ANON_KEY as string,
    {
      cookies: {
        // Supabaseが必要とするcookie操作のメソッドを実装
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Server Componentでは、cookie設定は無視される可能性があるため
            // エラーをキャッチして続行
            // Note: cookieの設定は失敗しても問題ない（読み取り専用の場合があるため）
          }
        },
      },
    }
  )
}

// 型定義のエクスポート
export type SupabaseClient = Awaited<ReturnType<typeof createClient>>