import type { AuthRepository } from '../repositories/AuthRepository'
import type { User } from '../entities/User'

export interface GetCurrentUserResponse {
  user: User | null
  isAuthenticated: boolean
}

/** 現在ユーザー取得 */
export class GetCurrentUser {
  constructor(private readonly _authRepository: AuthRepository) {}

  async execute(): Promise<GetCurrentUserResponse> {
    try {
      const user = await this._authRepository.getCurrentUser()
      return {
        user,
        isAuthenticated: user !== null,
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get current user: ${error.message}`)
      }
      throw new Error('Failed to get current user: Unknown error')
    }
  }
}
