import { Hero } from '../components/Hero'
import { BrandPartners } from '../components/BrandPartners'
import { WhyGenericFails } from '../components/WhyGenericFails'
import { DashboardSection } from '../components/DashboardSection'
import { Testimonials } from '../components/Testimonials'
import { ContactCTA } from '../components/ContactCTA'
import type { AppRoute } from '../hooks/useRoute'

interface HomePageProps {
  onNavigate: (route: AppRoute, param?: string) => void
  onOpenLogin?: () => void
}

export function HomePage({ onNavigate, onOpenLogin: _onOpenLogin }: HomePageProps) {
  return (
    <div className="space-y-0">
      <Hero />
      <BrandPartners />

      {/* Feature Gateway Navigation Grid */}
      <section className="py-16 bg-[#161413] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2">
                Modul Eksklusif Racik Cloud
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Pilih Modul & Navigasi Halaman Dinamis
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              Setiap modul memiliki halaman dan route tersendiri yang dapat diakses langsung lewat URL browser Anda.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Anti-Fake Passport */}
            <div
              onClick={() => onNavigate('passport', '2609-EDP-042')}
              className="p-6 rounded-2xl bg-[#1B1918] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all cursor-pointer group shadow-lg flex flex-col justify-between hover:scale-[1.02]"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-neutral-950 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01M12 12h.01" />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live Route
                  </span>
                  <span className="text-xs font-mono text-neutral-400">#/passport</span>
                </div>
                <h3 className="text-base font-bold text-white font-display group-hover:text-[#D4AF37] transition-colors">
                  Digital Scent Passport
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Cek keaslian wewangian, verifikasi nomor lot batch PostgreSQL, dan pantau masa maserasi.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                <span>Buka Passport</span>
                <span className="group-hover:translate-x-1 transition-transform">➜</span>
              </div>
            </div>

            {/* Card 2: Studio Lab */}
            <div
              onClick={() => onNavigate('studio')}
              className="p-6 rounded-2xl bg-[#1B1918] border border-white/[0.08] hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between hover:scale-[1.02]"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Interactive
                  </span>
                  <span className="text-xs font-mono text-neutral-400">#/studio</span>
                </div>
                <h3 className="text-base font-bold text-white font-display group-hover:text-amber-400 transition-colors">
                  Scent Studio Lab
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Kalkulasi gramatur formula, pyramid olfactory (Top/Heart/Base), dan hitung HPP botol otomatis.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-amber-400">
                <span>Buka Studio Lab</span>
                <span className="group-hover:translate-x-1 transition-transform">➜</span>
              </div>
            </div>

            {/* Card 3: Workflow */}
            <div
              onClick={() => onNavigate('workflow')}
              className="p-6 rounded-2xl bg-[#1B1918] border border-white/[0.08] hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between hover:scale-[1.02]"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:bg-sky-400 group-hover:text-neutral-950 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    Proses Lab
                  </span>
                  <span className="text-xs font-mono text-neutral-400">#/workflow</span>
                </div>
                <h3 className="text-base font-bold text-white font-display group-hover:text-sky-400 transition-colors">
                  Alur Kerja Produksi
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Timeline maserasi tangki vat, filtrasi dingin, dan standar pencatatan batch BPOM.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-sky-400">
                <span>Pelajari Alur</span>
                <span className="group-hover:translate-x-1 transition-transform">➜</span>
              </div>
            </div>

            {/* Card 4: Pricing & ROI */}
            <div
              onClick={() => onNavigate('pricing')}
              className="p-6 rounded-2xl bg-[#1B1918] border border-white/[0.08] hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between hover:scale-[1.02]"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-neutral-950 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Kalkulator
                  </span>
                  <span className="text-xs font-mono text-neutral-400">#/pricing</span>
                </div>
                <h3 className="text-base font-bold text-white font-display group-hover:text-emerald-400 transition-colors">
                  Paket & ROI
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Simulasi penghematan bibit tumpah, perbandingan tier Starter hingga Maklon Industri.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Hitung ROI</span>
                <span className="group-hover:translate-x-1 transition-transform">➜</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyGenericFails />
      <DashboardSection />
      <Testimonials />
      <ContactCTA />
    </div>
  )
}
