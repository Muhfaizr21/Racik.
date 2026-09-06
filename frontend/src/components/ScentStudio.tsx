import { useState } from 'react'

interface Note {
  name: string
  accords: string
  hours: string
  density: number // g/ml
}

const TOP_OPTIONS: Note[] = [
  { name: 'Bergamot Calabria (Cold Pressed)', accords: 'Citrus Fresh', hours: '2–3 jam', density: 0.87 },
  { name: 'Pink Pepper CO2 Extract', accords: 'Spicy Vibrant', hours: '2 jam', density: 0.89 },
  { name: 'Green Mandarin Sicily', accords: 'Fruity Sweet', hours: '3 jam', density: 0.85 },
  { name: 'Lavender Provence (Steam Distilled)', accords: 'Aromatic Herbal', hours: '3 jam', density: 0.88 },
]

const HEART_OPTIONS: Note[] = [
  { name: 'Rosa Damascena Absolute', accords: 'Floral Rich', hours: '6–8 jam', density: 0.98 },
  { name: 'Hedione (Kadar Tinggi)', accords: 'Airy Jasmine Radiance', hours: '6 jam', density: 1.01 },
  { name: 'Patchouli Heart 65% Patchoulol', accords: 'Earthy Woody', hours: '8 jam', density: 0.96 },
  { name: 'Orris Butter 15% Irone', accords: 'Powdery Violet Root', hours: '8 jam', density: 0.94 },
]

const BASE_OPTIONS: Note[] = [
  { name: 'Assam Agarwood (Oud CO2)', accords: 'Dark Balsamic Resin', hours: '16–24 jam', density: 0.98 },
  { name: 'Iso E Super Pure Matrix', accords: 'Cedar Amber Velvet', hours: '14 jam', density: 0.93 },
  { name: 'Bourbon Vanilla Bean Absolute', accords: 'Gourmand Warm', hours: '18 jam', density: 1.05 },
  { name: 'Ambroxan Crystals (10% DPG)', accords: 'Mineral Ambergris', hours: '24+ jam', density: 0.95 },
]

export function ScentStudio() {
  const [top, setTop] = useState<Note>(TOP_OPTIONS[0])
  const [heart, setHeart] = useState<Note>(HEART_OPTIONS[0])
  const [base, setBase] = useState<Note>(BASE_OPTIONS[0])
  const [concentration, setConcentration] = useState<number>(20) // 20% EDP
  const [batchVolumeL, setBatchVolumeL] = useState<number>(5) // 5 Liter

  // Scientific Conversions
  const totalVolumeMl = batchVolumeL * 1000
  const oilVolumeMl = totalVolumeMl * (concentration / 100)
  const ethanolVolumeMl = totalVolumeMl - oilVolumeMl
  const bottles50ml = Math.floor(totalVolumeMl / 50)

  // Weighted specific gravity of oil mixture
  const avgDensity = ((top.density * 0.25) + (heart.density * 0.35) + (base.density * 0.40)).toFixed(2)
  const oilWeightGrams = Math.round(oilVolumeMl * Number(avgDensity))

  // Estimated COGS & Aging
  const estimatedCostPerBottle = Math.round(38000 + (concentration * 1900))
  const macerationDays = Math.round(18 + (concentration * 0.6))

  const tierName =
    concentration >= 24 ? 'Extrait de Parfum' : concentration >= 15 ? 'Eau de Parfum' : 'Eau de Toilette'

  return (
    <section id="studio" className="relative py-20 md:py-28 bg-[#121110] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2">
            Simulasi Formulasi Laboratorium
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Uji Resep Wewangian & Hitung HPP Sebelum Campur Bahan.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Pilih komponen aroma, atur konsentrasi konsentrat, dan lihat bagaimana konversi berat jenis (densitas) mempengaruhi gramatur bahan serta masa maserasi.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Ingredients Formulation */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Note */}
            <div className="p-5 rounded-2xl bg-[#181615] border border-white/[0.06]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Top Notes (0–30 Menit Awal)
                </span>
                <span className="text-[11px] font-mono text-neutral-500">Porsi: ~25%</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TOP_OPTIONS.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setTop(item)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      top.name === item.name
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                        : 'border-white/5 bg-white/[0.01] hover:border-white/20 text-neutral-300'
                    }`}
                  >
                    <div className="text-xs font-semibold">{item.name}</div>
                    <div className="text-[10px] text-neutral-400 mt-1 flex justify-between">
                      <span>{item.accords}</span>
                      <span className="font-mono text-neutral-400">BJ: {item.density}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Heart Note */}
            <div className="p-5 rounded-2xl bg-[#181615] border border-white/[0.06]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Heart Notes (Karakter Inti 2–6 Jam)
                </span>
                <span className="text-[11px] font-mono text-neutral-500">Porsi: ~35%</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {HEART_OPTIONS.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setHeart(item)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      heart.name === item.name
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                        : 'border-white/5 bg-white/[0.01] hover:border-white/20 text-neutral-300'
                    }`}
                  >
                    <div className="text-xs font-semibold">{item.name}</div>
                    <div className="text-[10px] text-neutral-400 mt-1 flex justify-between">
                      <span>{item.accords}</span>
                      <span className="font-mono text-neutral-400">BJ: {item.density}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Base Note */}
            <div className="p-5 rounded-2xl bg-[#181615] border border-white/[0.06]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Base Notes (Fiksatif & Daya Tahan 8–24 Jam)
                </span>
                <span className="text-[11px] font-mono text-neutral-500">Porsi: ~40%</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BASE_OPTIONS.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setBase(item)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      base.name === item.name
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                        : 'border-white/5 bg-white/[0.01] hover:border-white/20 text-neutral-300'
                    }`}
                  >
                    <div className="text-xs font-semibold">{item.name}</div>
                    <div className="text-[10px] text-neutral-400 mt-1 flex justify-between">
                      <span>{item.accords}</span>
                      <span className="font-mono text-neutral-400">BJ: {item.density}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="p-5 rounded-2xl bg-[#151413] border border-white/[0.06] space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-neutral-300">Konsentrasi Minyak Bibit:</span>
                  <span className="font-mono font-bold text-[#D4AF37]">
                    {concentration}% ({tierName})
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="30"
                  step="1"
                  value={concentration}
                  onChange={(e) => setConcentration(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-neutral-300">Volume Batch yang Diracik:</span>
                  <span className="font-mono font-bold text-white">{batchVolumeL} Liter</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={batchVolumeL}
                  onChange={(e) => setBatchVolumeL(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Right: Technical Formulation Sheet */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#181614] border border-[#D4AF37]/30 shadow-xl space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                Lembar Kerja Formulasi
              </span>
              <h3 className="text-lg font-bold text-white mt-1">Spesifikasi Batch #RK-{batchVolumeL}L</h3>
            </div>

            {/* Conversions Table */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-neutral-400">Total Volume Cairan:</span>
                <span className="font-mono text-white">{totalVolumeMl.toLocaleString('id-ID')} ml</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-neutral-400">Kebutuhan Bibit (ml):</span>
                <span className="font-mono text-white">{oilVolumeMl} ml</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-neutral-400">Timbangan Bibit (Gramatur riil):</span>
                <span className="font-mono text-[#D4AF37] font-semibold">
                  ~{oilWeightGrams} gram (BJ {avgDensity})
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-neutral-400">Kebutuhan Pelarut (Alkohol 96%):</span>
                <span className="font-mono text-white">{ethanolVolumeMl} ml</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-neutral-400">Hasil Jadi Botol 50 ml:</span>
                <span className="font-mono text-white">{bottles50ml} botol</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-neutral-400">Waktu Maserasi yang Dianjurkan:</span>
                <span className="font-mono text-[#D4AF37] font-bold">{macerationDays} hari</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-400">Estimasi HPP per Botol:</span>
                <span className="font-mono text-emerald-400 font-bold">
                  Rp {estimatedCostPerBottle.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-neutral-400 leading-relaxed">
              Catatan: Perhitungan di atas telah mengoreksi densitas rata-rata ekstrak ({avgDensity} g/ml) dan menyertakan estimasi botol kaca serta sprayer standar industri.
            </div>

            <a
              href="#pricing"
              className="w-full block text-center py-3 rounded-xl bg-[#D4AF37] text-neutral-950 font-bold text-xs uppercase tracking-wider hover:bg-[#c49e22] transition-colors"
            >
              Simpan Formula ke Akun Racik
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
