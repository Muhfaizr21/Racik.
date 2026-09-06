import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { BrandPartners } from './components/BrandPartners'
import { ScentStudio } from './components/ScentStudio'
import { WhyGenericFails } from './components/WhyGenericFails'
import { WorkflowTimeline } from './components/WorkflowTimeline'
import { ScentPassport } from './components/ScentPassport'
import { DashboardSection } from './components/DashboardSection'
import { LoginSection } from './components/LoginSection'
import { ComparisonTable } from './components/ComparisonTable'
import { RoiCalculator } from './components/RoiCalculator'
import { Pricing } from './components/Pricing'
import { Testimonials } from './components/Testimonials'
import { FaqSection } from './components/FaqSection'
import { ContactCTA } from './components/ContactCTA'
import { Footer } from './components/Footer'
import { SpotLightBg } from './components/SpotLightBg'
import { LoginModal } from './components/LoginModal'
import { AdminLayout } from './features/admin'
import { useAuth } from './hooks/useAuth'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [showPublicPreview, setShowPublicPreview] = useState(false)

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



  // 1. If user is logged in and not in public preview mode, render full AdminLTE Superadmin Dashboard!
  if (currentUser && !showPublicPreview) {
    return (
      <>
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

        <AdminLayout
          currentUser={currentUser}
          onSwitchToLanding={() => setShowPublicPreview(true)}
          onLogout={logout}
        />
      </>
    )
  }

  // 2. Otherwise render public Landing Page (with an admin top bar if session is active)
  return (
    <div className="relative min-h-screen bg-[#141211] text-neutral-100 antialiased overflow-x-hidden selection:bg-[#D4AF37] selection:text-neutral-950">
      <SpotLightBg />

      {/* Top Banner when user is previewing public store while logged in */}
      {currentUser && showPublicPreview && (
        <div className="sticky top-0 z-50 bg-[#D4AF37] text-neutral-950 px-6 py-2 flex items-center justify-between text-xs font-bold shadow-md">
          <div className="flex items-center gap-2">
            <span>👑 Sesi Superadmin: {currentUser.name} ({currentUser.role})</span>
            <span className="hidden sm:inline">&bull; Database PostgreSQL racik Aktif</span>
          </div>
          <button
            type="button"
            onClick={() => setShowPublicPreview(false)}
            className="px-3 py-1 rounded-lg bg-neutral-950 text-[#D4AF37] hover:bg-neutral-900 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-bold"
          >
            <span>Kembali ke Superadmin OS</span>
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
        onOpenLogin={openAuthModal}
      />

      <Hero />
      <BrandPartners />
      <ScentStudio />
      <WhyGenericFails />
      <WorkflowTimeline />
      <ScentPassport />
      <DashboardSection />

      {/* Dedicated Role Login & Security Portal Section */}
      <LoginSection
        currentUser={currentUser}
        onOpenLogin={openAuthModal}
      />

      <ComparisonTable />
      <RoiCalculator />
      <Pricing />
      <Testimonials />
      <FaqSection />
      <ContactCTA />
      <Footer />

      {/* Interactive Modal Login OS */}
      <LoginModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        currentUser={currentUser}
        isLoading={isLoading}
        errorMessage={authError}
        onLogin={login}
        onLogout={logout}
      />
    </div>
  )
}
