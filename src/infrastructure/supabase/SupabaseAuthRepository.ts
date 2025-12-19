import type { AuthRepository } from '../../features/auth/domain/repositories/AuthRepository'
import { User } from '../../features/auth/domain/entities/User'
import { createClient } from './core/client'

/**
 * Supabase認証リポジトリの実装
 *
 * 責務:
 * - Supabaseの認証APIを使用した認証操作
 * - auth.users と profiles テーブルの結合によるユーザー情報取得
 * - Supabaseの型とドメインエンティティ間の変換
 * - 認証状態変更の監視
 */
export class SupabaseAuthRepository implements AuthRepository {
  private readonly supabase = createClient()

  /**
   * Googleログイン
   * OAuth フローを開始し、認可URLを返す
   */
  async signInWithGoogle(): Promise<{ url: string }> {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      throw new Error(`Google sign-in failed: ${error.message}`)
    }

    if (!data.url) {
      throw new Error('Failed to get OAuth URL')
    }

    return { url: data.url }
  }

  /**
   * ログアウト
   * セッションを削除し、認証状態をクリア
   */
  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut()

    if (error) {
      throw new Error(`Sign out failed: ${error.message}`)
    }
  }

  /**
   * 現在のユーザー取得
   * auth.users と profiles テーブルを結合してユーザー情報を取得
   */
  async getCurrentUser(): Promise<User | null> {
    // 1. 認証済みユーザーの取得
    const { data: authData, error: authError } =
      await this.supabase.auth.getUser()

    if (authError) {
      throw new Error(`Failed to get authenticated user: ${authError.message}`)
    }

    if (!authData.user) {
      return null
    }

    // 2. プロファイル情報の取得
    const { data: profile, error: profileError } = await this.supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', authData.user.id)
      .single()

    if (profileError) {
      // プロファイルが見つからない場合はnullを返す（まだ作成されていない可能性）
      if (profileError.code === 'PGRST116') {
        return null
      }
      throw new Error(`Failed to get user profile: ${profileError.message}`)
    }

    // 3. ドメインエンティティに変換
    return new User(
      authData.user.id,
      authData.user.email || '',
      profile.username,
      profile.avatar_url
    )
  }

  /**
   * 認証状態変更の監視
   * 認証状態が変更された際にコールバックを実行
   */
  onAuthStateChange(callback: (_user: User | null) => void): () => void {
    const {
      data: { subscription },
    } = this.supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        callback(null)
        return
      }

      // 認証状態変更時はプロファイル情報も取得
      try {
        const user = await this.getCurrentUser()
        callback(user)
      } catch {
        // 認証状態変更時のエラーはログ出力を避け、nullユーザーとして処理
        callback(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }
}
