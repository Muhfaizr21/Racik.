import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { BrandPartners } from './components/BrandPartners'
import { ScentStudio } from './components/ScentStudio'
import { WhyGenericFails } from './components/WhyGenericFails'
import { WorkflowTimeline } from './components/WorkflowTimeline'
import { ScentPassport } from './components/ScentPassport'
import { DashboardSection } from './components/DashboardSection'
import { ComparisonTable } from './components/ComparisonTable'
import { RoiCalculator } from './components/RoiCalculator'
import { Pricing } from './components/Pricing'
import { Testimonials } from './components/Testimonials'
import { FaqSection } from './components/FaqSection'
import { ContactCTA } from './components/ContactCTA'
import { Footer } from './components/Footer'
import { SpotLightBg } from './components/SpotLightBg'

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#141211] text-neutral-100 antialiased overflow-x-hidden selection:bg-[#D4AF37] selection:text-neutral-950">
      <SpotLightBg />
      <Navbar scrolled={scrolled} />
      <Hero />
      <BrandPartners />
      <ScentStudio />
      <WhyGenericFails />
      <WorkflowTimeline />
      <ScentPassport />
      <DashboardSection />
      <ComparisonTable />
      <RoiCalculator />
      <Pricing />
      <Testimonials />
      <FaqSection />
      <ContactCTA />
      <Footer />
    </div>
  )
}
