const STEPS = [
  {
    step: '01',
    title: 'Formula & Bahan Baku',
    subtitle: 'Presisi Timbangan',
    desc: 'Input komposisi per gram atau mililiter. Sistem otomatis mengunci resep induk agar tidak bisa diubah sembarangan oleh staf.',
  },
  {
    step: '02',
    title: 'Masa Maserasi',
    subtitle: 'Pematangan Cairan',
    desc: 'Catat tanggal tangki vat mulai diisi. Sistem memberi notifikasi saat waktu maserasi mencapai umur optimal untuk disaring dan dibotolkan.',
  },
  {
    step: '03',
    title: 'Label & Nomor Batch',
    subtitle: 'Penelusuran Produk',
    desc: 'Cetak label dengan nomor batch unik. Tiap botol terhubung ke data asal bibit dan tanggal racik jika ada keluhan dari konsumen.',
  },
  {
    step: '04',
    title: 'Penjualan Multi-Toko',
    subtitle: 'Stok Otomatis Terpotong',
    desc: 'Baik transaksi di kasir butik maupun pesanan marketplace online, stok botol jadi dan sisa bahan baku di gudang terpotong secara bersamaan.',
  },
  {
    step: '05',
    title: 'Data Pelanggan & Refill',
    subtitle: 'Catatan Aroma Favorit',
    desc: 'Simpan riwayat varian parfum yang disukai pembeli untuk rekomendasi aroma berikutnya atau program refill botol kosong.',
  },
]

export function WorkflowTimeline() {
  return (
    <section id="workflow" className="relative py-20 md:py-28 bg-[#11100F] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2">
            Alur Kerja Sistem
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Bagaimana Racik Bekerja di Tempat Usaha Anda
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Menghubungkan meja timbangan peracik di belakang toko dengan meja kasir dan pembukuan pemilik usaha.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl bg-[#161514] border border-white/[0.06] flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono font-bold text-[#D4AF37] mb-3">
                  LANGKAH {item.step}
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  {item.title}
                </h3>
                <div className="text-xs font-medium text-neutral-400 mb-3">
                  {item.subtitle}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
