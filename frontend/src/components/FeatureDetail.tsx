import { motion } from 'framer-motion'

const FEATURES = [
  {
    number: '01',
    title: 'Inventaris Real-time',
    desc: 'Pantau stok di setiap toko dan gudang dalam satu tampilan. Tidak ada parfum yang hilang tanpa sebab.',
    items: ['Multi-gudang sinkronisasi instan', 'Alert otomatis saat stok minim', 'Scan barcode lewat kamera'],
  },
  {
    number: '02',
    title: 'Analytics Penjualan',
    desc: 'Konversi, tren bulanan, dan segmen pelanggan terlihat jelas. Keputusan berdasarkan angka, bukan firasat.',
    items: ['Tren penjualan per hari, minggu, bulan', 'Segmentasi pelanggan aktif vs. churn', 'Export laporan PDF siap kirim'],
  },
  {
    number: '03',
    title: 'Manajemen Tim',
    desc: 'Kontrol akses level staff, audit log, dan persetujuan alur kerja. Siapa melakukan apa, kapan.',
    items: ['Role-based access: admin, manager, staff', 'Audit trail lengkap setiap transaksi', 'Persetujuan alur kerja yang dapat disesuaikan'],
  },
]

export function FeatureDetail() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mb-16 md:mb-20"
        >
          <div className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">Fitur Utama</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-100 leading-tight">
            Tiga hal yang mengubah cara kerja Anda.
          </h2>
          <p className="mt-4 text-neutral-400 text-base leading-relaxed">
            Tidak ada fitur berlebih. Setiap fitur ada karena bisnis parfum membutuhkannya setiap hari.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left column: bold statement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:sticky lg:top-32 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 to-[#722F37]/10 border border-[#D4AF37]/20">
              <div className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-2">Mengapa ini berbeda</div>
              <p className="text-neutral-200 text-base leading-relaxed">
                Platform ini dibangun untuk industri parfum — bukan template yang dipaksa ke produk lain.
              </p>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Tiga modul utama mencakup seluruh operasional harian. Tidak perlu plugin tambahan, tidak perlu integrasi rumit.
            </p>
          </motion.div>

          {/* Right column: feature cards */}
          <div className="lg:col-span-7 space-y-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="p-6 md:p-8 rounded-2xl bg-[#161616] border border-white/[0.06] hover:border-[#D4AF37]/15 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                    {feature.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-neutral-100 mb-2">{feature.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">{feature.desc}</p>
                    <ul className="space-y-2">
                      {feature.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-neutral-300">
                          <span className="text-[#D4AF37] text-xs leading-none">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
