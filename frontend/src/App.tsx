import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { SpotLightBg } from './components/SpotLightBg'
import { LoginModal } from './components/LoginModal'
import { HomePage } from './pages/HomePage'
import { PassportPage } from './pages/PassportPage'
import { StudioPage } from './pages/StudioPage'
import { WorkflowPage } from './pages/WorkflowPage'
import { PricingPage } from './pages/PricingPage'
import { AdminPage } from './pages/AdminPage'
import { useAuth } from './hooks/useAuth'
import { useRoute } from './hooks/useRoute'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const { route, hashParam, navigate } = useRoute()

  const {
    currentUser,
    isAuthModalOpen,
    isLoading,
    authError,
    feedbackToast,
    login,
    logout,
    openAuthModal,
    closeAuthModal,
  } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // If route is admin, render the Superadmin OS or Login Workstation directly
  if (route === 'admin') {
    return (
      <div className="relative min-h-screen bg-[#141211] text-neutral-100 antialiased overflow-x-hidden selection:bg-[#D4AF37] selection:text-neutral-950">
        {/* Global Feedback Toast */}
        <AnimatePresence>
          {feedbackToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
              className="fixed top-20 left-1/2 z-50 px-4 py-2 rounded-xl bg-[#1E1C1A] border border-[#D4AF37]/50 text-neutral-200 text-xs font-semibold shadow-2xl flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span>{feedbackToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AdminPage
          currentUser={currentUser}
          onNavigate={navigate}
          onOpenLogin={openAuthModal}
          onLogout={logout}
        />

        <LoginModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          currentUser={currentUser}
          isLoading={isLoading}
          errorMessage={authError}
          onLogin={async (creds) => {
            const ok = await login(creds)
            if (ok) navigate('admin')
            return ok
          }}
          onLogout={logout}
        />
      </div>
    )
  }

  // Dynamic Public & Feature Routes (home, passport, studio, workflow, pricing)
  return (
    <div className="relative min-h-screen bg-[#141211] text-neutral-100 antialiased overflow-x-hidden selection:bg-[#D4AF37] selection:text-neutral-950 flex flex-col justify-between">
      <SpotLightBg />

      {/* Top Banner when an admin session is active on public routes */}
      {currentUser && (
        <div className="sticky top-0 z-50 bg-[#D4AF37] text-neutral-950 px-6 py-2 flex items-center justify-between text-xs font-bold shadow-md">
          <div className="flex items-center gap-2">
            <span>👑 Sesi Superadmin: {currentUser.name} ({currentUser.role})</span>
            <span className="hidden sm:inline">&bull; Database PostgreSQL racik Aktif</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('admin')}
            className="px-3 py-1 rounded-lg bg-neutral-950 text-[#D4AF37] hover:bg-neutral-900 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-bold"
          >
            <span>Buka Superadmin OS</span>
            <span>➜</span>
          </button>
        </div>
      )}

      {/* Global Feedback Toast */}
      <AnimatePresence>
        {feedbackToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#1E1C1A] border border-[#D4AF37]/50 text-neutral-200 text-xs font-semibold shadow-2xl flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span>{feedbackToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar
        scrolled={scrolled}
        currentUser={currentUser}
        currentRoute={route}
        onNavigate={navigate}
        onOpenLogin={openAuthModal}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {route === 'passport' && (
            <motion.div
              key="route-passport"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <PassportPage
                initialHash={hashParam}
                onSelectHash={(h) => navigate('passport', h)}
                onNavigateHome={() => navigate('home')}
              />
            </motion.div>
          )}

          {route === 'studio' && (
            <motion.div
              key="route-studio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <StudioPage onNavigate={navigate} />
            </motion.div>
          )}

          {route === 'workflow' && (
            <motion.div
              key="route-workflow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <WorkflowPage onNavigate={navigate} />
            </motion.div>
          )}

          {route === 'pricing' && (
            <motion.div
              key="route-pricing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <PricingPage onNavigate={navigate} />
            </motion.div>
          )}

          {route === 'home' && (
            <motion.div
              key="route-home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <HomePage
                onNavigate={navigate}
                onOpenLogin={openAuthModal}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Interactive Modal Login OS */}
      <LoginModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        currentUser={currentUser}
        isLoading={isLoading}
        errorMessage={authError}
        onLogin={async (creds) => {
          const ok = await login(creds)
          if (ok) navigate('admin')
          return ok
        }}
        onLogout={logout}
      />
    </div>
  )
}
