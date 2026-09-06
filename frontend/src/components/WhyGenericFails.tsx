const COMPARISONS = [
  {
    title: 'Penyusutan Alkohol & Evaporasi (Angels’ Share)',
    problem: 'Software POS biasa mencatat 10 liter cairan masuk harus keluar 10 liter. Padahal selama proses maserasi 3–4 minggu, penguapan alkohol alami memangkas 2–4% volume. Di software umum, ini tercatat sebagai selisih kasir atau tuduhan barang hilang.',
    solution: 'Racik menghitung faktor toleransi evaporasi berdasarkan durasi maserasi dan suhu ruang simpan, sehingga pembukuan stok tetap akurat tanpa menyalahkan staf.',
  },
  {
    title: 'Konversi Takaran (1 mL Tidak Sama Dengan 1 Gram)',
    problem: 'Minyak atsiri gaharu atau vanila memiliki massa jenis berbeda dibanding minyak jeruk atau alkohol. Menakar resep berdasarkan mililiter saat pembelian grosir menggunakan kilogram sering memicu selisih HPP dan aroma botol yang tidak konsisten.',
    solution: 'Database bahan di Racik mencatat berat jenis (specific gravity) masing-masing supplier. Timbangan digital di lab otomatis terkonversi ke mililiter botol.',
  },
  {
    title: 'Keamanan Formula Rahasia di Depan Karyawan',
    problem: 'Pada software ritel standar, karyawan gudang atau tim peracik bisa melihat persentase formula utuh di lembar kerja atau sistem, memicu risiko resep dicuri atau dibawa keluar.',
    solution: 'Mode Produksi Terselubung: Tim peracik hanya menerima instruksi batch dengan kode wadah dan gramatur timbang, tanpa pernah melihat nama dagang bibit atau formula induk.',
  },
  {
    title: 'Dokumentasi Batch untuk Kebutuhan BPOM & Uji Lab',
    problem: 'Saat mengurus notifikasi BPOM atau menghadapi audit, pencatatan batch manual di buku tulis memakan waktu berhari-hari untuk menelusuri tanggal kedaluwarsa bibit aroma.',
    solution: 'Satu klik untuk mengunduh riwayat batch lengkap: nomor lot bibit, tanggal maserasi, jenis pelarut, hingga nomor serial botol yang terdistribusi ke toko.',
  },
]

export function WhyGenericFails() {
  return (
    <section className="relative py-20 md:py-28 bg-[#141312] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2">
            Perbandingan Alur Operasional
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Kenapa Software Kasir Biasa Tidak Cocok untuk Usaha Parfum?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Parfum melibatkan reaksi kimia, pematangan cairan, dan konversi takaran yang tidak ditemukan pada bisnis ritel pakaian atau makanan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {COMPARISONS.map((item, index) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-[#181615] border border-white/[0.06] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                    Masalah 0{index + 1}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 rounded-xl bg-red-500/[0.05] border border-red-500/15 text-neutral-300">
                    <strong className="text-red-300 block mb-1">Kendala di Software Biasa:</strong>
                    {item.problem}
                  </div>
                  <div className="p-3 rounded-xl bg-[#D4AF37]/[0.05] border border-[#D4AF37]/20 text-neutral-200">
                    <strong className="text-[#D4AF37] block mb-1">Pendekatan Racik:</strong>
                    {item.solution}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
