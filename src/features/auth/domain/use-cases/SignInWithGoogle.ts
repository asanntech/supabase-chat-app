import type { AuthRepository } from '../repositories/AuthRepository'

export interface SignInWithGoogleResponse {
  url: string
}

/** Googleサインイン */
export class SignInWithGoogle {
  constructor(private readonly _authRepository: AuthRepository) {}

  async execute(): Promise<SignInWithGoogleResponse> {
    try {
      const result = await this._authRepository.signInWithGoogle()

      if (!result.url || typeof result.url !== 'string') {
        throw new Error('Invalid sign-in response: missing or invalid URL')
      }

      return { url: result.url }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Google sign-in failed: ${error.message}`)
      }
      throw new Error('Google sign-in failed: Unknown error')
    }
  }
}
