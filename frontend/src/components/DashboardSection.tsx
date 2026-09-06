import { motion } from 'framer-motion'
import { TiltedCard } from './TiltedCard'
import { dashboardStats, salesBars, months } from '../data/site'

export function DashboardSection() {

  return (
    <section id="dashboard" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold tracking-[0.15em] uppercase mb-6">Dashboard</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-100">Pandangan Bisnis Anda</h2>
          <p className="mt-4 text-neutral-400 text-lg max-w-2xl mx-auto">Lihat angka penjualan, stok, dan performa toko Anda secara real-time melalui dashboard yang intuitif.</p>
        </motion.div>

        <TiltedCard className="rounded-2xl overflow-hidden">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0F0F0F]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="text-xs font-medium text-neutral-400">Dashboard Demo</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30" />
            </div>

            <div className="p-5 md:p-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {dashboardStats.map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-[#1A1A1A]/80 border border-white/5 hover:border-[#D4AF37]/20 transition-colors">
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">{stat.label}</div>
                    <div className="text-xl md:text-2xl font-bold text-neutral-100">{stat.value}</div>
                    <div className={`text-xs font-medium mt-1 ${stat.positive ? 'text-[#D4AF37]' : 'text-red-400'}`}>
                      {stat.change} bulan ini
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-[#1A1A1A]/60 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-sm font-semibold text-neutral-200">Tren Penjualan</h4>
                  <div className="flex gap-2">
                    {['7h', '30h', '90h'].map((period) => (
                      <button key={period} className="px-2.5 py-1 rounded-md text-[10px] font-medium text-neutral-500 hover:text-[#D4AF37] transition-colors">{period}</button>
                    ))}
                  </div>
                </div>
                <div className="flex items-end gap-2 md:gap-3 h-32 md:h-40">
                  {salesBars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.6, ease: 'easeOut' }}
                      className="flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-[#722F37] to-[#D4AF37] hover:from-[#800020] hover:to-[#e6c34a] transition-colors"
                      style={{ height: `${h}%`, opacity: 0.6 + (h / 200) }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-neutral-600">
                  {months.map((m) => <span key={m}>{m}</span>)}
                </div>
              </div>
            </div>
          </div>
        </TiltedCard>
      </div>
    </section>
  )
}
