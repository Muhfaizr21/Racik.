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
import { OwnerDashboard } from './features/owner'
import { useAuth } from './hooks/useAuth'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
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

  return (
    <div className="relative min-h-screen bg-[#141211] text-neutral-100 antialiased overflow-x-hidden selection:bg-[#D4AF37] selection:text-neutral-950">
      <SpotLightBg />

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

      {/* Role 1: Master Perfumer / Owner Workstation */}
      <section id="workstation-owner" className="relative py-12 md:py-20 max-w-7xl mx-auto px-6 scroll-mt-24">
        <OwnerDashboard />
      </section>

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
