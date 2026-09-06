import { useState } from 'react'

export function ScentPassport() {
  const [activeTab, setActiveTab] = useState<'batch' | 'komposisi' | 'lab'>('batch')

  return (
    <section id="passport" className="relative py-20 md:py-28 bg-[#131211] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: Explanation */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block">
              Fitur Keaslian & Batch Label
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              Cetak QR Code Batch Unik untuk Tiap Botol yang Beredar.
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Beri kepastian kepada pembeli bahwa parfum yang mereka terima asli dan diracik sesuai standar. Konsumen cukup memindai QR code di kotak atau stiker botol untuk melihat nomor batch resmi.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-[#171615] border border-white/[0.06]">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Mencegah Barang Tiruan & Oplosan
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Tiap nomor seri hanya terdaftar satu kali pada sistem Racik. Jika ada kode yang dipindai berulang kali dari lokasi mencurigakan, sistem memberi peringatan duplikasi.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#171615] border border-white/[0.06]">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Transparansi Masa Simpan & Asal Bibit
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Tampilkan informasi umum yang aman untuk publik, seperti tanggal peracikan, piramida wewangian, dan saran penyimpanan tanpa membocorkan gramatur rahasia.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Phone Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl p-5 bg-[#171514] border border-white/10 shadow-2xl">
              <div className="text-center pb-4 border-b border-white/10">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                  BATCH TERVERIFIKASI
                </span>
                <h3 className="text-base font-bold text-white">MAISON PARFUM ID</h3>
                <p className="text-xs font-mono text-[#D4AF37] mt-0.5">LOT #2609-EDP-042</p>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-1 my-3 p-1 rounded-xl bg-black/40 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('batch')}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'batch' ? 'bg-[#D4AF37] text-neutral-950 font-bold' : 'text-neutral-400'
                  }`}
                >
                  Info Batch
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('komposisi')}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'komposisi' ? 'bg-[#D4AF37] text-neutral-950 font-bold' : 'text-neutral-400'
                  }`}
                >
                  Karakter
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('lab')}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'lab' ? 'bg-[#D4AF37] text-neutral-950 font-bold' : 'text-neutral-400'
                  }`}
                >
                  Uji Lab
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 min-h-[160px] text-xs space-y-2">
                {activeTab === 'batch' && (
                  <>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-neutral-400">Tanggal Pembotolan:</span>
                      <span className="text-white">18 Februari 2026</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-neutral-400">Masa Pematangan:</span>
                      <span className="text-white">28 Hari (Vat Stainless)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-neutral-400">Total Produksi Batch:</span>
                      <span className="text-white">200 Botol</span>
                    </div>
                  </>
                )}

                {activeTab === 'komposisi' && (
                  <>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-neutral-400">Keluarga Aroma:</span>
                      <span className="text-white">Woody Aromatic Citrus</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-neutral-400">Konsentrasi Minyak:</span>
                      <span className="text-white">22% (Eau de Parfum)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-neutral-400">Daya Tahan Uji Kulit:</span>
                      <span className="text-white">8–10 Jam</span>
                    </div>
                  </>
                )}

                {activeTab === 'lab' && (
                  <>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-neutral-400">Uji Kejernihan:</span>
                      <span className="text-emerald-400 font-medium">Lolos (Bebas Endapan)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-neutral-400">Jenis Alkohol:</span>
                      <span className="text-white">Absolute Denat 96%</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-neutral-400">Sertifikasi Bibit:</span>
                      <span className="text-white">COA & MSDS Terlampir</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
