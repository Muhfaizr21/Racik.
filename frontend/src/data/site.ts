export const navItems = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Kubah Formula', href: '#workstation-owner' },
  { label: 'Scent Studio', href: '#studio' },
  { label: 'Alur Lab', href: '#workflow' },
  { label: 'Anti-Fake', href: '#passport' },
  { label: 'Kalkulator ROI', href: '#calculator' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Harga', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export const partnerBrands = [
  { name: 'Maison L’Ombre', origin: 'Jakarta' },
  { name: 'Aura Botanica', origin: 'Bandung' },
  { name: 'Scent Atelier', origin: 'Surabaya' },
  { name: 'Velvet & Moss', origin: 'Bali' },
  { name: 'Nosecraft Lab', origin: 'Yogyakarta' },
  { name: 'Olfactive House', origin: 'Medan' },
]

export const dashboardStats = [
  { label: 'Total Penjualan', value: 'Rp 1,24 M', change: '+12.4%', positive: true },
  { label: 'Pesanan Baru', value: '347', change: '+8.2%', positive: true },
  { label: 'Stok Tersisa', value: '892 unit', change: '-3.1%', positive: false },
  { label: 'Pelanggan Baru', value: '156', change: '+24.6%', positive: true },
]

export const salesBars = [45, 62, 38, 71, 55, 80, 65, 90, 75, 60, 85, 95]

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des']

export const categoryData = [
  { color: '#D4AF37', label: 'Eau de Parfum', pct: '55%' },
  { color: '#722F37', label: 'Parfum Floral', pct: '35%' },
  { color: '#800020', label: 'Signature Scent', pct: '25%' },
]

export const pricingPlans = [
  {
    name: 'Starter',
    tier: 'Peracik Mandiri',
    description: 'Untuk toko bibit parfum atau brand rintisan dengan satu lokasi usaha.',
    monthlyPrice: 149000,
    annualPrice: 119000,
    features: [
      'Simpan hingga 30 resep formula',
      'Pencatatan stok bibit, alkohol, dan botol',
      'Kalkulasi HPP otomatis per takaran',
      '1 Akses kasir toko / kasir web',
      'Export data ke format Excel',
      'Dukungan via WhatsApp & Email',
    ],
    popular: false,
    ctaText: 'Mulai Uji Coba 14 Hari',
  },
  {
    name: 'Bisnis',
    tier: 'Brand Lokal & Studio',
    description: 'Untuk brand wewangian yang sudah aktif jualan di butik dan marketplace.',
    monthlyPrice: 389000,
    annualPrice: 310000,
    features: [
      'Simpan formula tanpa batas',
      'Mode produksi terselubung untuk staf lab',
      'Pencatatan batch maserasi & masa simpan',
      'Sinkronisasi stok toko fisik & marketplace',
      'Cetak label barcode & QR nomor batch',
      'Pengingat restock bibit dan botol kosong',
      'Akses hingga 5 staf dengan hak akses bertingkat',
    ],
    popular: true,
    ctaText: 'Pilih Paket Bisnis',
  },
  {
    name: 'Maklon & Lab',
    tier: 'Pabrik & Waralaba',
    description: 'Untuk fasilitas produksi maklon wewangian atau jaringan cabang waralaba.',
    monthlyPrice: 950000,
    annualPrice: 760000,
    features: [
      'Semua fitur Bisnis tanpa batasan kuota',
      'Multi-gudang dan multi-cabang tak terbatas',
      'Format dokumen batch siap audit BPOM RI',
      'Integrasi printer thermal & barcode industri',
      'Bantuan migrasi data stok awal dari Excel',
      'Pendampingan tim teknis saat setup awal',
    ],
    popular: false,
    ctaText: 'Hubungi Tim Penjualan',
  },
]

export const testimonials = [
  {
    name: 'Hendra Gunawan',
    role: 'Pemilik Toko Wangi Jaya, Pasar Baru Jakarta',
    quote: 'Dulu stok bibit sering selisih karena staf salah hitung gram ke mili. Pakai Racik, takaran di lab langsung otomatis memotong sisa bibit di gudang. Akhir bulan tidak perlu lembur rekap manual lagi.',
  },
  {
    name: 'Amanda Larasati',
    role: 'Formulator & Founder Laras Scents, Bandung',
    quote: 'Fitur mode produksinya sangat membantu. Karyawan yang bantu botoling hanya melihat kode batch dan berat timbangan gram, jadi resep formula wewangian saya tetap aman tidak bocor ke luar.',
  },
  {
    name: 'Dimas Wicaksono',
    role: 'Kepala Produksi, Maklon CV Aroma Lab Surabaya',
    quote: 'Pencatatan batch maserasinya rapi. Waktu kemarin ada audit sertifikasi dan kelengkapan berkas BPOM, data nomor lot bibit dan tanggal maserasinya tinggal diunduh dalam hitungan detik.',
  },
]

export const faqItems = [
  {
    question: 'Apakah formula rahasia parfum saya aman dan tidak bisa dicuri?',
    answer: 'Sangat aman. Data formula Anda disimpan dalam database terenkripsi khusus. Anda juga bisa mengaktifkan Mode Produksi Terselubung, sehingga staf yang bertugas menimbang bahan di lab hanya melihat kode wadah (misal: Bibit A, Pelarut B) tanpa mengetahui nama formula maupun persentase lengkapnya.',
  },
  {
    question: 'Bagaimana kalau saya beli bibit dalam kilogram tapi pakainya mililiter?',
    answer: 'Racik otomatis mengonversi satuan tersebut. Cukup masukkan berat jenis (densitas) bibit yang tertera pada dokumen COA supplier Anda (misalnya 0.95 g/ml), dan sistem akan menyesuaikan pengurangan stok bahan secara presisi.',
  },
  {
    question: 'Bisa dipakai di perangkat apa saja?',
    answer: 'Racik adalah aplikasi berbasis web modern. Anda bisa membukanya melalui laptop, tablet iPad di meja kasir butik, maupun smartphone tanpa perlu instalasi aplikasi yang berat.',
  },
  {
    question: 'Apakah saya bisa memindahkan data stok lama dari file Excel?',
    answer: 'Bisa. Kami menyediakan format template Excel sederhana untuk daftar bahan baku, stok botol kaca, dan katalog produk jadi. Anda tinggal upload dan data langsung siap digunakan.',
  },
  {
    question: 'Apakah ada masa percobaan gratis?',
    answer: 'Ya, Anda bisa mencoba Racik secara gratis selama 14 hari penuh tanpa perlu memasukkan informasi kartu kredit. Anda bisa mencoba input formula, uji fitur stok, dan coba kasirnya langsung.',
  },
]

export const footerColumns = [
  { title: 'Produk', links: ['Dashboard Demo', 'Kalkulator ROI', 'Fitur Formulasi', 'Dokumentasi', 'Changelog'] },
  { title: 'Solusi', links: ['Indie Perfumer', 'Brand Retail', 'Pabrik Maklon', 'Multi-Outlet POS'] },
  { title: 'Perusahaan', links: ['Tentang Kami', 'Keamanan Data & NDA', 'Karir', 'Kontak'] },
]
