import { motion } from 'framer-motion'
import type { AuthUser, RolePreset } from '../types/auth'
import { ROLE_PRESETS } from '../services/authService'
import { Logo } from './Logo'

interface LoginSectionProps {
  currentUser: AuthUser | null
  onOpenLogin: () => void
  onQuickLoginPreset?: (preset: RolePreset) => void
}

export function LoginSection({ currentUser, onOpenLogin }: LoginSectionProps) {
  return (
    <section id="portal" className="relative py-20 md:py-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(212,175,55,0.08), transparent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
            Security & Workstation Portal
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-100 font-display">
            Portal Akses Role & Laboratorium
          </h2>
          <p className="mt-3 text-neutral-400 text-base max-w-2xl mx-auto">
            Setiap staf operasional memiliki antarmuka khusus dengan hak akses terproteksi database PostgreSQL.
          </p>
        </motion.div>

        {/* 4 Role Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {ROLE_PRESETS.map((preset, index) => {
            const isActive = currentUser?.role === preset.role

            return (
              <motion.div
                key={preset.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={`p-6 rounded-2xl border transition-all relative flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#1F1D1A] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.18)]'
                    : 'bg-[#171615]/90 border-white/5 hover:border-white/20 hover:bg-[#1C1B19]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{preset.icon}</span>
                    {isActive ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Aktif
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-neutral-500">Port 5432</span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{preset.label}</h3>
                  <div className="text-xs text-[#D4AF37] font-medium mb-3">{preset.name}</div>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">{preset.scopeDescription}</p>

                  <div className="space-y-1.5 pt-3 border-t border-white/5">
                    {preset.keyPermissions.slice(0, 2).map((perm, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-[11px] text-neutral-400">
                        <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                        <span className="truncate">{perm}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-white/5">
                  <div className="text-[11px] text-neutral-400 font-mono mb-3">
                    ID: <code className="text-neutral-300">{preset.email}</code>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="w-full py-2 rounded-xl text-xs font-semibold border border-white/10 text-neutral-200 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{isActive ? 'Kelola Sesi' : 'Masuk sebagai Role ini'}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Central CTA Banner */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#1E1C1A] via-[#1A1918] to-[#251A18] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-xl shrink-0">
              <Logo size="sm" />
            </div>
            <div>
              <h4 className="text-base md:text-lg font-bold text-white tracking-wide font-display">
                {currentUser ? `Workstation Aktif: ${currentUser.name}` : 'Akses Workstation Parfumerie OS'}
              </h4>
              <p className="text-xs md:text-sm text-neutral-400 mt-0.5">
                {currentUser
                  ? `Terotentikasi sebagai ${currentUser.role} &bull; Terhubung ke database PostgreSQL racik`
                  : 'Buka popup login untuk memilih role, melihat formula terenkripsi, atau mengecek inventori gudang.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenLogin}
            className="w-full md:w-auto px-7 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#e6c34a] text-neutral-950 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{currentUser ? 'Buka Panel Profil' : 'Buka Portal Login OS'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
