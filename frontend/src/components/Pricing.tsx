import { useState } from 'react'
import { pricingPlans } from '../data/site'

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true)

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <section id="pricing" className="relative py-20 md:py-28 bg-[#151413] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2">
            Pilihan Paket Langganan
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Investasi Terjangkau Sesuai Tahap Usaha
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Tanpa biaya tersembunyi. Mulai dengan uji coba gratis 14 hari tanpa perlu kartu kredit.
          </p>

          {/* Toggle */}
          <div className="mt-7 inline-flex items-center p-1 rounded-xl bg-neutral-900 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                !isAnnual ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Bayar Bulanan
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                isAnnual ? 'bg-[#D4AF37] text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Bayar Tahunan
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isAnnual ? 'bg-black/20 text-neutral-900' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}`}>
                Hemat 20%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {pricingPlans.map((plan) => {
            const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice

            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'bg-[#1C1A18] border-2 border-[#D4AF37] shadow-xl'
                    : 'bg-[#181615] border border-white/[0.06]'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                      {plan.tier}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 min-h-[32px] leading-relaxed mb-5">
                    {plan.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white font-mono">
                        {formatPrice(currentPrice)}
                      </span>
                      <span className="text-xs text-neutral-400">/ bulan</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-1 font-mono">
                      {isAnnual ? 'Ditagih per tahun' : 'Ditagih per bulan'}
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-8">
                    <div className="text-xs font-semibold text-neutral-300">Termasuk:</div>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-normal">
                        <span className="text-[#D4AF37] font-bold text-sm shrink-0 leading-none mt-0.5">
                          ✓
                        </span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className={`w-full block text-center py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    plan.popular
                      ? 'bg-[#D4AF37] text-neutral-950 hover:bg-[#c49e22]'
                      : 'bg-white/10 text-white hover:bg-white/15'
                  }`}
                >
                  {plan.ctaText}
                </a>
              </div>
            )
          })}
        </div>

        {/* Security / Terms */}
        <div className="mt-12 text-center text-xs text-neutral-500 space-x-6">
          <span>Enkripsi Database AES-256</span>
          <span>•</span>
          <span>Bisa Berhenti Langganan Kapan Saja</span>
          <span>•</span>
          <span>Garansi Uang Kembali 14 Hari</span>
        </div>
      </div>
    </section>
  )
}
