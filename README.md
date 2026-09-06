# Racik.

> **Sistem Operasional & Manajemen Bisnis Wewangian Terpadu**

Racik adalah platform digital modern yang dirancang khusus untuk memenuhi kebutuhan unik industri parfum—mulai dari peracik independen (*indie perfumer*), toko bibit wewangian, butik ritel, hingga pabrik maklon wewangian. 

Berbeda dari software kasir (POS) atau ERP ritel umum, Racik dibangun dengan pemahaman mendalam seputar kimia parfum: konversi densitas berat jenis (gram ke mililiter), toleransi penyusutan penguapan alkohol (*angels' share*), perhitungan masa maserasi, hingga kerahasiaan resep formula dan penelusuran batch BPOM.

---

## 💎 Fitur Utama

### 1. Studio Arsitektur Piramida Aroma (Interactive Formulation Sheet)
- Simulasi komposisi piramida aroma: **Top Notes** (0–30 menit), **Heart Notes** (2–6 jam), dan **Base Notes** (8–24 jam).
- Koreksi massa jenis bahan alami (BJ 0.84 – 1.05 g/ml) untuk konversi timbangan gram laboratorium ke volume mililiter botol jadi.
- Kalkulasi otomatis rasio konsentrasi (*Eau de Toilette*, *Eau de Parfum*, hingga *Extrait de Parfum*).
- Estimasi waktu maserasi/curing ideal (hari) dan perhitungan HPP (*Cost of Goods Sold*) per semprotan (*cost per spray*).

### 2. Vault Formula Terenkripsi & Mode Produksi Terselubung
- Penyimpanan formula rahasia wewangian dengan enkripsi database aman.
- **Masked Production Mode**: Karyawan penimbang dan staf pembotolan di lab hanya melihat kode batch dan gramatur timbangan tanpa mengetahui nama dagang bahan maupun persentase formula utuh.

### 3. Digital Scent Passport™ & Anti-Pemalsuan
- Pembuatan nomor batch unik dan label QR Code untuk setiap botol.
- Konsumen dapat memindai kode untuk memverifikasi keaslian produk, melihat riwayat tanggal maserasi, lot panen bibit, dan karakteristik wewangian tanpa membocorkan formula rahasia.

### 4. Toleransi Evaporasi & Pelacakan Stok Curing
- Perhitungan faktor susut alami alkohol (*angels' share* 2–4%) selama masa simpan dalam tangki vat maserasi, mencegah selisih fiktif pada pembukuan stok akhir bulan.

### 5. Kalkulator Margin & Simulasi Bisnis
- Simulasi interaktif untuk menghitung proyeksi omzet, laba kotor, dan jam kerja manual yang dihemat melalui otomasi rekap stok dan pesanan.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Animasi & Interaktivitas**: [Framer Motion](https://www.framer.com/motion/)

---

## 📁 Struktur Direktori

```text
Parfum/
├── README.md
├── .gitignore
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── index.html
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── index.css
        ├── data/
        │   └── site.ts
        └── components/
            ├── Logo.tsx               # Emblem logo vektor eksklusif Racik
            ├── Navbar.tsx             # Navigasi responsif
            ├── Hero.tsx               # Hero banner dengan value proposition
            ├── Bottle3D.tsx           # Mockup 3D botol parfum interaktif (tilt effect)
            ├── BrandPartners.tsx      # Standar ekosistem industri (IFRA, BPOM, GC-MS)
            ├── ScentStudio.tsx        # Studio simulasi piramida aroma & HPP
            ├── WhyGenericFails.tsx    # Perbandingan operasional parfum vs ERP umum
            ├── WorkflowTimeline.tsx   # 5 Tahap alur kerja dari lab ke kasir
            ├── ScentPassport.tsx      # Fitur QR batch & verifikasi keaslian botol
            ├── DashboardSection.tsx   # Pratinjau antarmuka dashboard bisnis
            ├── ComparisonTable.tsx    # Tabel perbandingan sistem manual vs Racik
            ├── RoiCalculator.tsx      # Kalkulator laba & penghematan jam kerja
            ├── Pricing.tsx            # Pilihan paket langganan (Bulanan/Tahunan)
            ├── Testimonials.tsx       # Ulasan pelaku usaha wewangian di Indonesia
            ├── FaqSection.tsx         # Tanya jawab seputar formula, stok, dan regulasi
            ├── ContactCTA.tsx         # Form jadwal demo & kontak
            ├── Footer.tsx             # Footer situs
            └── SpotLightBg.tsx        # Efek latar belakang ambient luxury
```

---

## 🚀 Panduan Memulai (Quick Start)

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 ke atas disarankan)
- Package Manager: `npm`, `yarn`, atau `pnpm`

### Instalasi & Menjalankan Lokal

1. **Clone repository**:
   ```bash
   git clone https://github.com/Muhfaizr21/Racik..git
   cd Racik./frontend
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

4. **Kompilasi untuk produksi**:
   ```bash
   npm run build
   ```

---

## 📄 Lisensi & Hak Cipta

© 2026 **Racik.** Hak cipta dilindungi undang-undang.
Dibuat untuk memajukan industri wewangian dan peracik parfum di Indonesia.
