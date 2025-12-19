import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GetCurrentUser } from './GetCurrentUser'
import { User } from '../entities/User'
import type { AuthRepository } from '../repositories/AuthRepository'

function createMockAuthRepository(): AuthRepository {
  return {
    signInWithGoogle: vi.fn(),
    signOut: vi.fn(),
    getCurrentUser: vi.fn(),
    onAuthStateChange: vi.fn(),
  }
}

describe('GetCurrentUser', () => {
  let useCase: GetCurrentUser
  let mockAuthRepository: AuthRepository

  beforeEach(() => {
    mockAuthRepository = createMockAuthRepository()
    useCase = new GetCurrentUser(mockAuthRepository)
  })

  describe('execute', () => {
    it('should return authenticated state when user exists', async () => {
      // Arrange
      const mockUser = new User(
        '123',
        'test@example.com',
        'testuser',
        'https://example.com/avatar.jpg'
      )
      vi.mocked(mockAuthRepository.getCurrentUser).mockResolvedValue(mockUser)

      // Act
      const result = await useCase.execute()

      // Assert
      expect(result).toEqual({
        user: mockUser,
        isAuthenticated: true,
      })
    })

    it('should return unauthenticated state when no user exists', async () => {
      // Arrange
      vi.mocked(mockAuthRepository.getCurrentUser).mockResolvedValue(null)

      // Act
      const result = await useCase.execute()

      // Assert
      expect(result).toEqual({
        user: null,
        isAuthenticated: false,
      })
    })

    it('should provide domain-specific error context when repository fails', async () => {
      // Arrange
      const repositoryError = new Error('Database connection failed')
      vi.mocked(mockAuthRepository.getCurrentUser).mockRejectedValue(
        repositoryError
      )

      // Act & Assert
      await expect(useCase.execute()).rejects.toThrow(
        'Failed to get current user: Database connection failed'
      )
    })
  })
})
