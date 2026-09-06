import { motion } from 'framer-motion'

const COMPARISONS = [
  {
    feature: 'Pencatatan Stok Masuk/Keluar',
    traditional: 'Catatan manual / Spreadsheet terpisah antar toko',
    aplikasiParfum: 'Barcode scan instan, update stok riil di seluruh cabang',
  },
  {
    feature: 'Kalkulasi HPP & Formula Campuran',
    traditional: 'Hitung manual per ml, sering miss takaran konsentrat',
    aplikasiParfum: 'Auto-kalkulasi HPP per botol berdasarkan resep & batch bibit',
  },
  {
    feature: 'Pelacakan Expired & Batch Bibit',
    traditional: 'Hanya label fisik di botol besar, rentan terlewat',
    aplikasiParfum: 'Notifikasi otomatis umur simpan bibit & identifikasi batch',
  },
  {
    feature: 'Laporan Omzet Multi-Cabang',
    traditional: 'Rekap harian via chat tiap malam, rawan selisih',
    aplikasiParfum: 'Live dashboard per outlet tanpa tunggu laporan kasir',
  },
]

export function ComparisonTable() {
  return (
    <section className="relative py-24 md:py-32 bg-[#121212] border-y border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <div className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">Solusi Industri</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100">
            Dibuat khusus untuk alur operasional bisnis parfum.
          </h2>
          <p className="mt-4 text-neutral-400 text-base">
            Software POS umum tidak paham takaran ml, maceration time, atau batch bibit parfum.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="py-4 px-4 text-sm font-semibold text-neutral-400 w-1/3">Alur Kerja</th>
                <th className="py-4 px-4 text-sm font-semibold text-neutral-500 w-1/3">Sistem Manual / POS Umum</th>
                <th className="py-4 px-4 text-sm font-bold text-[#D4AF37] w-1/3 bg-[#D4AF37]/[0.03] rounded-t-lg">Racik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {COMPARISONS.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-neutral-200 align-top">{row.feature}</td>
                  <td className="py-4 px-4 text-sm text-neutral-400 align-top">{row.traditional}</td>
                  <td className="py-4 px-4 text-sm text-neutral-100 font-medium align-top bg-[#D4AF37]/[0.03] border-x border-[#D4AF37]/10">
                    <span className="inline-block text-[#D4AF37] mr-2">✓</span>
                    {row.aplikasiParfum}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
