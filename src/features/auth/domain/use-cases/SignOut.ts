import type { AuthRepository } from '../repositories/AuthRepository'

export interface SignOutResponse {
  success: boolean
}

/** サインアウト */
export class SignOut {
  constructor(private readonly _authRepository: AuthRepository) {}

  async execute(): Promise<SignOutResponse> {
    try {
      await this._authRepository.signOut()
      return { success: true }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Sign-out failed: ${error.message}`)
      }
      throw new Error('Sign-out failed: Unknown error')
    }
  }
}
