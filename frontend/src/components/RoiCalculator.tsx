import { useState } from 'react'

export function RoiCalculator() {
  const [monthlyBottles, setMonthlyBottles] = useState(500)
  const [sellingPrice, setSellingPrice] = useState(250000)
  const [cogsPrice, setCogsPrice] = useState(70000)

  const revenue = monthlyBottles * sellingPrice
  const totalCost = monthlyBottles * cogsPrice
  const grossProfit = revenue - totalCost
  const marginPercentage = ((grossProfit / revenue) * 100).toFixed(0)

  // Estimasi penghematan waktu rekap & pencegahan salah takaran (rata-rata 3 jam per 100 botol)
  const hoursSaved = Math.round((monthlyBottles / 100) * 3.5)

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <section id="calculator" className="relative py-20 md:py-28 bg-[#11100F] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2">
            Simulasi Biaya & Margin
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Hitung HPP dan Perkiraan Keuntungan Kotor Penjualan.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Sesuaikan volume penjualan bulanan, harga jual, dan modal per botol untuk melihat proyeksi omzet toko parfum Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#161514] border border-white/[0.06] space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <label htmlFor="bottles-slider" className="text-neutral-300 font-medium">
                  Rata-rata Penjualan per Bulan:
                </label>
                <span className="font-mono font-bold text-[#D4AF37]">
                  {monthlyBottles.toLocaleString('id-ID')} Botol
                </span>
              </div>
              <input
                id="bottles-slider"
                type="range"
                min="50"
                max="3000"
                step="25"
                value={monthlyBottles}
                onChange={(e) => setMonthlyBottles(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <label htmlFor="price-slider" className="text-neutral-300 font-medium">
                  Harga Jual per Botol:
                </label>
                <span className="font-mono font-bold text-white">
                  {formatCurrency(sellingPrice)}
                </span>
              </div>
              <input
                id="price-slider"
                type="range"
                min="50000"
                max="1000000"
                step="10000"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <label htmlFor="cogs-slider" className="text-neutral-300 font-medium">
                  Modal Produksi (HPP) per Botol:
                </label>
                <span className="font-mono font-bold text-neutral-300">
                  {formatCurrency(cogsPrice)}
                </span>
              </div>
              <input
                id="cogs-slider"
                type="range"
                min="20000"
                max="300000"
                step="5000"
                value={cogsPrice}
                onChange={(e) => setCogsPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <p className="text-[11px] text-neutral-500 mt-2">
                Rata-rata mencakup bibit minyak wangi, pelarut alkohol, botol kaca, atomizer sprayer, dan box stiker.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#181615] border border-[#D4AF37]/30 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase text-[#D4AF37] font-semibold">
                  Proyeksi Keuangan
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Margin: ~{marginPercentage}%
                </span>
              </div>

              <div className="space-y-3 pt-4">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[11px] text-neutral-400">Omzet Penjualan Bulanan</div>
                  <div className="text-xl font-mono font-bold text-white mt-0.5">
                    {formatCurrency(revenue)}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[11px] text-neutral-400">Laba Kotor Sebelum Beban Operasional</div>
                  <div className="text-xl font-mono font-bold text-[#D4AF37] mt-0.5">
                    {formatCurrency(grossProfit)}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/20 border border-white/5 text-xs text-neutral-400 leading-relaxed">
                  Dengan otomasi perhitungan batch di Racik, Anda menghemat sekitar <strong>{hoursSaved} jam</strong> waktu rekap manual buku kas dan stok tiap bulannya.
                </div>
              </div>
            </div>

            <a
              href="#pricing"
              className="w-full block text-center py-3 rounded-xl bg-[#D4AF37] text-neutral-950 font-bold text-xs uppercase tracking-wider hover:bg-[#c49e22] transition-colors"
            >
              Coba Gratis 14 Hari
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
