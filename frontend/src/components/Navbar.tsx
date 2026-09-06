import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '../data/site'
import { Logo } from './Logo'
import type { AuthUser } from '../types/auth'

interface NavbarProps {
  scrolled: boolean
  currentUser: AuthUser | null
  onOpenLogin: () => void
}

export function Navbar({ scrolled, currentUser, onOpenLogin }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.nav
      initial={false}
      animate={{
        background: scrolled ? 'rgba(22,21,20,0.95)' : 'rgba(22,21,20,0.82)',
        borderBottomColor: scrolled ? 'rgba(212,175,55,0.18)' : 'rgba(255,255,255,0.04)',
      }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between gap-6">
        <a href="#hero" className="inline-flex items-center shrink-0" aria-label="Racik home">
          <Logo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-neutral-400 hover:text-[#D4AF37] transition-colors duration-300 relative group/nav whitespace-nowrap"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover/nav:w-full" />
            </a>
          ))}
        </div>

        {/* Action Buttons Group */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {currentUser ? (
            <button
              type="button"
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1D1B19] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all cursor-pointer shadow-sm group whitespace-nowrap"
              title="Buka Dashboard Superadmin"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
              <span className="text-xs font-semibold text-neutral-200 group-hover:text-white">
                {currentUser.name.split(' ')[0]}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                {currentUser.role}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm whitespace-nowrap"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Masuk OS</span>
            </button>
          )}

          <a
            href="#contact"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#D4AF37] text-[#1A1A1A] hover:bg-[#e6c34a] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] whitespace-nowrap"
          >
            Mulai Sekarang
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-neutral-300 hover:text-[#D4AF37] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#181716] border-b border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-neutral-300 hover:text-[#D4AF37] transition-colors py-1.5"
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onOpenLogin()
                  }}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>{currentUser ? `Workstation: ${currentUser.name.split(' ')[0]}` : 'Masuk ke Portal OS'}</span>
                </button>

                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="w-full py-2.5 rounded-lg text-center text-sm font-semibold bg-[#D4AF37] text-[#1A1A1A] hover:bg-[#e6c34a] transition-colors"
                >
                  Mulai Sekarang
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
