import { describe, it, expect, beforeEach, vi } from 'vitest'
import { SignOut } from './SignOut'
import type { AuthRepository } from '../repositories/AuthRepository'

function createMockAuthRepository(): AuthRepository {
  return {
    signInWithGoogle: vi.fn(),
    signOut: vi.fn(),
    getCurrentUser: vi.fn(),
    onAuthStateChange: vi.fn(),
  }
}

describe('SignOut', () => {
  let useCase: SignOut
  let mockAuthRepository: AuthRepository

  beforeEach(() => {
    mockAuthRepository = createMockAuthRepository()
    useCase = new SignOut(mockAuthRepository)
  })

  describe('execute', () => {
    it('should return success status when sign-out completes', async () => {
      // Arrange
      vi.mocked(mockAuthRepository.signOut).mockResolvedValue(undefined)

      // Act
      const result = await useCase.execute()

      // Assert
      expect(result).toEqual({ success: true })
    })

    it('should provide domain-specific error context when repository fails', async () => {
      // Arrange
      const repositoryError = new Error('Session invalidation failed')
      vi.mocked(mockAuthRepository.signOut).mockRejectedValue(repositoryError)

      // Act & Assert
      await expect(useCase.execute()).rejects.toThrow(
        'Sign-out failed: Session invalidation failed'
      )
    })
  })
})
