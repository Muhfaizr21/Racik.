import { useState, useEffect, useCallback } from 'react'
import type { AuthUser, LoginCredentials } from '../types/auth'
import {
  authenticate,
  getStoredSession,
  clearStoredSession,
  ROLE_PRESETS
} from '../services/authService'

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => getStoredSession())
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null)

  // Auto-dismiss toast after 4 seconds
  useEffect(() => {
    if (!feedbackToast) return
    const timer = setTimeout(() => setFeedbackToast(null), 4000)
    return () => clearTimeout(timer)
  }, [feedbackToast])

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true)
    setAuthError(null)

    try {
      const user = await authenticate(credentials)
      setCurrentUser(user)
      setIsLoading(false)
      setIsAuthModalOpen(false)
      setFeedbackToast(`Autentikasi Berhasil: Masuk sebagai ${user.name} (${user.role})`)
      return true
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Autentikasi gagal'
      setAuthError(msg)
      setIsLoading(false)
      return false
    }
  }, [])

  const logout = useCallback(() => {
    const prevName = currentUser?.name || 'Pengguna'
    clearStoredSession()
    setCurrentUser(null)
    setFeedbackToast(`Sesi ${prevName} telah diakhiri.`)
  }, [currentUser])

  const openAuthModal = useCallback(() => {
    setAuthError(null)
    setIsAuthModalOpen(true)
  }, [])

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false)
    setAuthError(null)
  }, [])

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    isAuthModalOpen,
    isLoading,
    authError,
    feedbackToast,
    rolePresets: ROLE_PRESETS,
    login,
    logout,
    openAuthModal,
    closeAuthModal,
    setAuthError,
  }
}
