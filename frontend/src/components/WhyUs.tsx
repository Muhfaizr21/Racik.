import { motion } from 'framer-motion'

const REASONS = [
  {
    title: 'Mengerti Formula Parfum',
    body: 'Dibangun untuk menghitung HPP per ml, batch bibit, waktu macerasi, dan rasio konsentrat, bukan untuk menjual sepatu atau makanan.',
  },
  {
    title: 'Satu Sistem Multi-Cabang',
    body: 'Sinkronisasi real-time antar cabang. Stok pusat, gudang lokal, dan outlet jual satu data yang sama.',
  },
  {
    title: 'Otomatisasi Tanpa Biaya Setup',
    body: 'Import data awal dari spreadsheet, otomatis normalisasi SKU, dan langsung jalan tanpa konsultan.',
  },
  {
    title: 'Dibangun untuk Pemilik Bisnis',
    body: 'Tampilan untuk Anda yang menjual, bukan untuk tim IT. Tidak ada istilah teknis yang membingungkan.',
  },
]

export function WhyUs() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">Mengapa Kami</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100 leading-tight">
              Bukan software umum yang dipaksa ke industri ini.
            </h2>
            <p className="mt-4 text-neutral-400 text-base leading-relaxed">
              Sebagian besar POS dan ERP tidak tahu bedanya Eau de Parfum dan Extrait, atau cara menghitung konsentrat 15% dalam batch 10 liter.
            </p>
            <div className="mt-8 p-5 rounded-2xl bg-[#161616] border border-white/[0.06]">
              <p className="text-sm text-neutral-300 italic leading-relaxed">
                "Kami pakai software umum selama 2 tahun. Setiap akhir bulan harus rekap manual. Sekarang semua real-time."
              </p>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] text-xs font-bold">RA</div>
                <div>
                  <div className="text-sm font-semibold text-neutral-200">Rizky A.</div>
                  <div className="text-xs text-neutral-500">Owner, Parfum Gallery Surabaya</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 space-y-6">
            {REASONS.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-5 p-6 rounded-2xl bg-[#161616] border border-white/[0.06]"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] text-xs font-bold">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-100 mb-1">{reason.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{reason.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
