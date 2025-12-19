import { SupabaseAuthRepository } from './SupabaseAuthRepository'

/**
 * 認証リポジトリのシングルトンインスタンス
 * use-cases層からこのインスタンスを使用してSupabase認証機能にアクセス
 */
export const authRepository = new SupabaseAuthRepository()
