/**
 * Supabase Middleware Helper
 * 
 * このモジュールは、Next.js Middlewareで使用するSupabaseクライアントの
 * ヘルパー関数を提供します。主にセッションの更新と管理を行います。
 */
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

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
 * Middlewareでセッションを更新し、Supabaseクライアントを返す
 * 
 * この関数は、Next.js Middlewareで使用され、以下の処理を行います：
 * 1. リクエストからcookieを読み取る
 * 2. Supabaseセッションを更新
 * 3. 必要に応じてレスポンスヘッダーにcookieを設定
 * 4. 更新されたレスポンスとSupabaseクライアントを返す
 * 
 * @param request - Next.jsのリクエストオブジェクト
 * @returns レスポンスとSupabaseクライアント
 */
export async function updateSession(request: NextRequest) {
  // レスポンスオブジェクトを作成
  const supabaseResponse = NextResponse.next({
    request,
  })

  // Supabaseクライアントを作成
  const supabase = createServerClient(
    SUPABASE_URL as string,
    SUPABASE_ANON_KEY as string,
    {
      cookies: {
        // リクエストからcookieを取得
        getAll() {
          return request.cookies.getAll()
        },
        // レスポンスにcookieを設定
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // セッションの更新（期限切れトークンのリフレッシュなど）
  // これは重要：ユーザーのセッションを維持するために必要
  await supabase.auth.getUser()

  return { response: supabaseResponse, supabase }
}

/**
 * 型定義：updateSession関数の戻り値
 */
export type UpdateSessionResult = Awaited<ReturnType<typeof updateSession>>