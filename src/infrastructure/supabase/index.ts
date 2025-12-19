/**
 * Supabase Infrastructure Module
 * 
 * このモジュールは、Supabaseクライアントのエントリーポイントを提供します。
 * 使用環境に応じて適切なクライアントをインポートしてください。
 */

// Client Component用のSupabaseクライアント
export { createClient as createBrowserClient } from './client'
export type { SupabaseClient as BrowserSupabaseClient } from './client'

// Server Component/Route Handler用のSupabaseクライアント
export { createClient as createServerClient } from './server'
export type { SupabaseClient as ServerSupabaseClient } from './server'

// Middleware用のヘルパー関数
export { updateSession } from './middleware'
export type { UpdateSessionResult } from './middleware'
