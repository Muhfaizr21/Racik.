import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from './Logo'
import type { AuthUser, RolePreset } from '../types/auth'
import { ROLE_PRESETS } from '../services/authService'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  currentUser: AuthUser | null
  isLoading: boolean
  errorMessage: string | null
  onLogin: (credentials: { email: string; password: string }) => Promise<boolean>
  onLogout: () => void
}

export function LoginModal({
  isOpen,
  onClose,
  currentUser,
  isLoading,
  errorMessage,
  onLogin,
  onLogout,
}: LoginModalProps) {
  const [selectedPreset, setSelectedPreset] = useState<RolePreset>(ROLE_PRESETS[0])
  const [email, setEmail] = useState<string>(ROLE_PRESETS[0].email)
  const [password, setPassword] = useState<string>(ROLE_PRESETS[0].defaultPassword)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [rememberDevice, setRememberDevice] = useState<boolean>(true)

  // Auto-fill form when user picks a demo role
  const handleSelectPreset = (preset: RolePreset) => {
    setSelectedPreset(preset)
    setEmail(preset.email)
    setPassword(preset.defaultPassword)
  }

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onLogin({ email, password })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with luxury blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.45, bounce: 0.1 }}
            className="relative w-full max-w-2xl my-8 z-10 rounded-2xl overflow-hidden bg-[#161514] border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.12)] text-neutral-100"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Ambient Background Lights */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#722F37]/20 blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative px-6 py-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-b from-white/[0.03] to-transparent">
              <div className="flex items-center gap-3">
                <Logo size="sm" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 id="modal-title" className="text-base font-bold tracking-wide text-neutral-100 font-display">
                      Racik Parfumerie OS
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                      Workstation v2.0
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Kubah Autentikasi Laboratorium & Manajemen Bisnis
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup jendela login"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 space-y-6">
              {currentUser ? (
                /* Authenticated State Display */
                <div className="space-y-6">
                  <div className="p-5 rounded-xl bg-gradient-to-br from-[#1F1D1B] to-[#171615] border border-[#D4AF37]/40 shadow-inner">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-2xl shadow-lg">
                          {ROLE_PRESETS.find((p) => p.role === currentUser.role)?.icon || '👤'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-bold text-white tracking-wide">
                              {currentUser.name}
                            </h4>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                              {currentUser.role}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-1">{currentUser.email}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Workstation Aktif &bull; Terhubung ke PostgreSQL (racik)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/10">
                      <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
                        Hak Akses Aktif Sesuai Role:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ROLE_PRESETS.find((p) => p.role === currentUser.role)?.keyPermissions.map(
                          (perm, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                              <svg className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>{perm}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={onLogout}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-red-500/30 text-red-300 hover:bg-red-500/10 transition-colors text-sm font-medium flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Keluar / Ganti Akun
                    </button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D4AF37] text-neutral-950 hover:bg-[#e6c34a] transition-all font-semibold text-sm shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer"
                    >
                      Buka Workstation OS
                    </button>
                  </div>
                </div>
              ) : (
                /* Login Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Preset Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Pilih Profil Cepat (Multi-Role):
                      </label>
                      <span className="text-[11px] text-[#D4AF37]">Klik untuk auto-fill demo</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {ROLE_PRESETS.map((preset) => {
                        const isSelected = selectedPreset.role === preset.role
                        return (
                          <button
                            key={preset.role}
                            type="button"
                            onClick={() => handleSelectPreset(preset)}
                            className={`p-3 rounded-xl text-left border transition-all relative flex flex-col justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.18)]'
                                : 'bg-[#1E1C1A]/80 border-white/5 hover:border-white/20 hover:bg-[#252321]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xl">{preset.icon}</span>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                              )}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-neutral-100 truncate">{preset.name.split(' ')[0]}</div>
                              <div className="text-[10px] text-neutral-400 mt-0.5 truncate">{preset.label.split(' ')[0]}</div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Selected Preset Details Banner */}
                  <div className="p-3.5 rounded-xl bg-[#1C1B19] border border-white/5 flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{selectedPreset.icon}</span>
                    <div className="text-xs">
                      <div className="font-semibold text-neutral-200">
                        {selectedPreset.label} &bull; <span className="text-[#D4AF37]">{selectedPreset.scopeDescription}</span>
                      </div>
                      <p className="text-neutral-400 mt-0.5 leading-relaxed">
                        Email: <span className="text-neutral-200 font-mono">{selectedPreset.email}</span> &bull; Sandi: <span className="text-neutral-200 font-mono">{selectedPreset.defaultPassword}</span>
                      </p>
                    </div>
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl text-xs flex items-center gap-2 border bg-red-950/40 text-red-300 border-red-500/30">
                      <span>✕</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Form Inputs */}
                  <div className="space-y-4">
                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                        Email Terdaftar
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nama@racik.id"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1E1C1A] border border-white/10 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                          Sandi / Lab Security Key
                        </label>
                        <span className="text-[11px] text-neutral-400">
                          Default: <code className="text-[#D4AF37] font-mono">admin</code>
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Masukkan kata sandi..."
                          className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-[#1E1C1A] border border-white/10 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                          aria-label={showPassword ? 'Sembunyikan sandi' : 'Lihat sandi'}
                        >
                          {showPassword ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-neutral-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberDevice}
                        onChange={(e) => setRememberDevice(e.target.checked)}
                        className="rounded border-white/20 bg-[#1E1C1A] text-[#D4AF37] focus:ring-0"
                      />
                      <span>Ingat sesi workstation ini</span>
                    </label>

                    <span className="text-neutral-400 hover:text-[#D4AF37] transition-colors cursor-pointer">
                      Lupa Kredensial?
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C9A02E] via-[#D4AF37] to-[#e6c34a] text-neutral-950 font-bold text-sm tracking-wide hover:opacity-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-neutral-950" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Mengautentikasi ke Database PostgreSQL...</span>
                      </>
                    ) : (
                      <>
                        <span>Masuk ke Workstation OS</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* System Footnote */}
                  <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>PostgreSQL <code className="text-neutral-300 font-mono">racik</code> (Port 5432) &bull; TLS 1.3 Terenkripsi</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
