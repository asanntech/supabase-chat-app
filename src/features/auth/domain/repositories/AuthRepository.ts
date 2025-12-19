import type { User } from '../entities/User'

/** 認証リポジトリ */
export interface AuthRepository {
  signInWithGoogle(): Promise<{ url: string }>
  signOut(): Promise<void>
  getCurrentUser(): Promise<User | null>
  onAuthStateChange(_callback: (_user: User | null) => void): () => void
}
