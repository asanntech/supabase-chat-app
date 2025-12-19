import { describe, it, expect, beforeEach, vi } from 'vitest'
import { SignInWithGoogle } from './SignInWithGoogle'
import type { AuthRepository } from '../repositories/AuthRepository'

function createMockAuthRepository(): AuthRepository {
  return {
    signInWithGoogle: vi.fn(),
    signOut: vi.fn(),
    getCurrentUser: vi.fn(),
    onAuthStateChange: vi.fn(),
  }
}

describe('SignInWithGoogle', () => {
  let useCase: SignInWithGoogle
  let mockAuthRepository: AuthRepository

  beforeEach(() => {
    mockAuthRepository = createMockAuthRepository()
    useCase = new SignInWithGoogle(mockAuthRepository)
  })

  describe('execute', () => {
    it('should return OAuth URL for Google sign-in initiation', async () => {
      // Arrange
      const expectedUrl =
        'https://accounts.google.com/oauth/authorize?client_id=test'
      vi.mocked(mockAuthRepository.signInWithGoogle).mockResolvedValue({
        url: expectedUrl,
      })

      // Act
      const result = await useCase.execute()

      // Assert
      expect(result).toEqual({ url: expectedUrl })
    })

    it('should validate URL response and reject invalid URLs', async () => {
      // Arrange
      vi.mocked(mockAuthRepository.signInWithGoogle).mockResolvedValue({
        url: null as any,
      })

      // Act & Assert
      await expect(useCase.execute()).rejects.toThrow(
        'Google sign-in failed: Invalid sign-in response: missing or invalid URL'
      )
    })

    it('should reject empty URLs', async () => {
      // Arrange
      vi.mocked(mockAuthRepository.signInWithGoogle).mockResolvedValue({
        url: '',
      })

      // Act & Assert
      await expect(useCase.execute()).rejects.toThrow(
        'Google sign-in failed: Invalid sign-in response: missing or invalid URL'
      )
    })

    it('should provide domain-specific error context when repository fails', async () => {
      // Arrange
      const repositoryError = new Error('Network connection failed')
      vi.mocked(mockAuthRepository.signInWithGoogle).mockRejectedValue(
        repositoryError
      )

      // Act & Assert
      await expect(useCase.execute()).rejects.toThrow(
        'Google sign-in failed: Network connection failed'
      )
    })
  })
})
