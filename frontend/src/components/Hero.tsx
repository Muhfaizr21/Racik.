import { motion, useScroll, useTransform } from 'framer-motion'
import { Bottle3D } from './Bottle3D'

export function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 600], [0, -60])
  const opacity = useTransform(scrollY, [0, 450], [1, 0])

  return (
    <section id="hero" className="relative min-h-[92dvh] flex items-center overflow-hidden pt-20 pb-16">
      {/* Subtle depth glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(114,47,55,0.18), transparent 75%)' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(212,175,55,0.1), transparent 75%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: 3D Bottle Display */}
          <div className="lg:col-span-6 relative flex justify-center order-2 lg:order-1">
            <Bottle3D />
          </div>

          {/* Right: Pitch & Actions */}
          <motion.div style={{ y: y1, opacity }} className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              Sistem Operasional Khusus Industri Wewangian
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-white">
              Satu Sistem untuk Formula, Stok Bibit, & Penjualan Parfum.
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl">
              Software kasir umum tidak mengerti takaran gram ke mililiter, masa maserasi, maupun susut penguapan alkohol. Racik mengelola formulasi lab hingga transaksi butik dalam satu alur yang rapi.
            </p>

            <div className="flex flex-wrap gap-3.5 pt-2">
              <a
                href="#studio"
                className="px-7 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c49e22] text-[#141210] font-bold text-sm shadow-lg transition-all duration-200 cursor-pointer"
              >
                Coba Studio Formulasi
              </a>
              <a
                href="#pricing"
                className="px-7 py-3.5 rounded-xl border border-white/15 hover:border-white/30 text-neutral-200 font-medium text-sm bg-white/[0.03] transition-all duration-200"
              >
                Lihat Paket Harga
              </a>
            </div>

            {/* Practical Verification Points */}
            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-white/[0.06] text-xs text-neutral-400">
              <div>
                <span className="text-white font-medium block">Kalkulasi HPP Presisi</span>
                Hitung biaya bibit, botol, & solven otomatis
              </div>
              <div>
                <span className="text-white font-medium block">Vault Resep Terenkripsi</span>
                Formula rahasia terlindungi tanpa bocor ke staf
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
