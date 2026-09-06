import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '../data/site'
import { Logo } from './Logo'

export function Navbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.nav
      initial={false}
      animate={{
        background: scrolled ? 'rgba(26,26,26,0.92)' : 'rgba(26,26,26,0.8)',
        borderBottomColor: scrolled ? 'rgba(212,175,55,0.14)' : 'rgba(255,255,255,0.03)',
      }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <a href="#hero" className="inline-flex items-center" aria-label="Racik home">
          <Logo size="md" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-neutral-400 hover:text-[#D4AF37] transition-colors duration-300 relative group/nav"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover/nav:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 px-5 py-2 rounded-lg text-sm font-semibold bg-[#D4AF37] text-[#1A1A1A] hover:bg-[#e6c34a] transition-colors shadow"
          >
            Mulai Sekarang
          </a>
        </div>

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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#1A1A1A] border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-neutral-300 hover:text-[#D4AF37] transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 px-5 py-3 rounded-lg text-center text-sm font-semibold bg-[#D4AF37] text-[#1A1A1A] hover:bg-[#e6c34a] transition-colors"
              >
                Mulai Sekarang
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
