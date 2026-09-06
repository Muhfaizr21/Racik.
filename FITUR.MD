# Matriks Fitur Sistem Racik. per Role Pengguna

> **Spesifikasi Lengkap, Konkret, & Alur Fungsionalitas Operasional**

Dokumen ini memetakan seluruh fitur platform **Racik.** secara komprehensif berdasarkan peran pengguna (*User Role*) dalam ekosistem bisnis wewangian, mulai dari meja riset lab hingga transaksi konsumen akhir.

---

## Ringkasan Matriks Hak Akses (Role-Based Access Matrix)

| Modul / Kemampuan | Owner / Master Perfumer | Lab Technician (Produksi) | Warehouse Manager (Gudang) | Kasir Butik / Consultant | Konsumen Akhir (Scan QR) |
|---|:---:|:---:|:---:|:---:|:---:|
| **Master Formula Vault** | Penuh (R/W/D) | Terselubung (Masked) | Tidak Ada | Tidak Ada | Tidak Ada |
| **Kalkulasi HPP & Biaya Spray** | Ya | Tidak | Tidak | Tidak | Tidak |
| **Input Penimbangan Timbangan BLE** | Ya | Ya (Tervalidasi) | Tidak | Tidak | Tidak |
| **Pencatatan Masa Maserasi Tangki** | Penuh | Input & Log | Lihat Jadwal | Tidak | Tidak |
| **Stock Opname Bahan Mentah & Botol** | Ya | Tidak | Penuh (R/W) | Tidak | Tidak |
| **Cetak Barcode & QR Batch Label** | Ya | Ya | Ya | Tidak | Tidak |
| **Kasir Penjualan POS & Decant** | Ya | Tidak | Tidak | Penuh | Tidak |
| **Digital Scent Passport™ Publik** | Ya | Ya | Ya | Ya | Baca Publik |
| **Laporan Omzet Multi-Cabang** | Ya | Tidak | Tidak | Hanya Toko Sendiri | Tidak |

---

## 1. Role: Owner / Founder / Master Perfumer (Pemilik Bisnis)

Peran ini memiliki otoritas tertinggi atas hak cipta formula, kebijakan penetapan harga, analitik keuangan, serta kontrol cabang.

### Fitur 1.1: Master Formula Vault (R&D & Versioning)
* **Deskripsi**: Tempat merancang, menyimpan, dan merevisi formula wewangian secara terenkripsi.
* **Fungsionalitas Konkret**:
  - Input komponen aroma berdasarkan piramida olfaktori (**Top**, **Heart**, **Base**) dan pelarut (*Solvent*).
  - Sistem pencatatan versi (*Formula Versioning: v1.0, v1.1, v2.0*) untuk membandingkan perubahan performa aroma dan daya tahan (*longevity*).
  - **Pencegahan Bahan Terlarang**: Peringatan otomatis jika formulasi menggunakan bahan yang dibatasi oleh standar IFRA (misalnya ambang batas Oakmoss, Lilial, atau Lyral).
  - Penguncian formula (*Lock Recipe*): Mencegah perubahan data pada resep yang sudah masuk jalur produksi massal.

### Fitur 1.2: Mesin Kalkulasi HPP Otomatis (Cost of Goods Sold Engine)
* **Deskripsi**: Menghitung secara otomatis modal riil per mililiter dan per kemasan botol siap jual.
* **Fungsionalitas Konkret**:
  - Menggabungkan biaya bibit parfum (dikonversi dari harga beli per kg), biaya alkohol 96% denat per drum, flacon botol kaca, atomizer sprayer, kerah penutup (*collar*), label stiker, dan kemasan boks luar.
  - **Cost per Spray Calculator**: Menghitung rata-rata biaya per semprotan (berdasarkan ukuran nozel sprayer standar $0.07\text{--}0.14\text{ ml}$ per tekan) untuk kebutuhan promosi sampel atau decant.
  - Rekomendasi margin ritel: Menampilkan persentase laba kotor saat menentukan harga jual eceran.

### Fitur 1.3: Executive Dashboard & Rekonsiliasi Multi-Cabang
* **Deskripsi**: Memantau kesehatan operasional seluruh butik fisik dan toko online dalam satu layar.
* **Fungsionalitas Konkret**:
  - Pemantauan omzet real-time per jam, per outlet, dan per varian parfum.
  - Laporan stok kritis: Notifikasi langsung jika bahan baku utama (seperti pelarut alkohol atau botol 50ml) mendekati batas minimum pemesanan ulang (*reorder point*).
  - Laporan efisiensi maserasi: Mengetahui berapa liter cairan parfum yang sedang dalam masa curing di gudang pusat.

---

## 2. Role: Lab Technician / Operator Produksi (Tim Laboratorium)

Peran ini bertanggung jawab atas proses fisik peracikan, penimbangan bahan, pengisian tangki penuaan (*vat*), hingga penyaringan dan pembotolan.

### Fitur 2.1: Mode Produksi Terselubung (Masked Batch Formulator)
* **Deskripsi**: Membimbing operator meracik batch besar tanpa membocorkan nama dagang bahan atau persentase resep induk.
* **Fungsionalitas Konkret**:
  - Layar hanya menampilkan nomor urut wadah bahan mentah, misalnya:
    - `Wadah #L-01` $\rightarrow$ Timbang **870.0 gram**
    - `Wadah #L-02` $\rightarrow$ Timbang **348.5 gram**
    - `Pelarut #S-01` $\rightarrow$ Tambahkan **3,780.0 gram**
  - Staf tidak dapat mengekspor atau melihat nama supplier bibit parfum, menjaga kerahasiaan resep perusahaan dari risiko dibajak kompetitor.

### Fitur 2.2: Live Digital Scale Feedback & Toleransi Penimbangan
* **Deskripsi**: Integrasi langsung dengan timbangan analitik meja lab melalui koneksi Bluetooth atau USB Serial.
* **Fungsionalitas Konkret**:
  - Angka berat di timbangan otomatis terbaca di layar sistem Racik secara real-time tanpa ketik manual.
  - **Indikator Toleransi Presisi**:
    - Hijau: Berat berada dalam rentang toleransi aman ($\pm 0.05\text{ gram}$).
    - Kuning: Kurang dari target.
    - Merah: Melebihi target racikan (sistem mengunci tombol konfirmasi hingga berat disesuaikan).

### Fitur 2.3: Pelacakan Tangki Maserasi & Uji Filtrasi (Chilling Log)
* **Deskripsi**: Mencatat fase pematangan aroma di dalam tangki stainless steel.
* **Fungsionalitas Konkret**:
  - Input nomor tangki/vat dan tanggal pengisian cairan.
  - Timer kematangan: Menampilkan sisa hari maserasi (misal: "Tangki Vat #04: Hari ke-18 dari 28 hari").
  - Checklist proses pendinginan dan filtrasi (*chill filtration*): Mencatat tanggal cairan dimasukkan ke chiller ($4^\circ\text{C}$) untuk pembekuan lilin tanaman dan tanggal penyaringan kertas mikro.

---

## 3. Role: Warehouse & Inventory Manager (Kepala Gudang)

Peran ini mengontrol keluar-masuknya bahan baku cair, botol kaca, kemasan sekunder, dan penomoran batch produk jadi.

### Fitur 3.1: Manajemen Bahan Baku Multi-Satuan (Kg vs Liter)
* **Deskripsi**: Menyelesaikan masalah perbedaan satuan beli pemasok dengan satuan pakai di laboratorium.
* **Fungsionalitas Konkret**:
  - Penerimaan bahan: Input pembelian bibit dalam satuan kilogram dari drum supplier.
  - Pengurangan stok otomatis: Saat tim produksi meracik 500 botol parfum 50ml, stok bibit di gudang otomatis terpotong dalam satuan gram/kg sesuai massa jenis masing-masing bibit.
  - Riwayat dokumen supplier: Lampiran file sertifikat analisis (**COA**) dan lembar data keselamatan (**MSDS**) per lot kedatangan.

### Fitur 3.2: Peringatan Kedaluwarsa & Oksidasi Bibit
* **Deskripsi**: Mencegah pemborosan bibit wewangian yang rusak akibat terlalu lama disimpan.
* **Fungsionalitas Konkret**:
  - Pelacak umur simpan bahan peka oksigen (khususnya minyak citrus seperti lemon, bergamot, grapefruit yang rentan rusak dalam 6–12 bulan).
  - Notifikasi prioritas pakai (*First-In, First-Out / FIFO*): Menyarankan lot bibit yang harus dihabiskan terlebih dahulu untuk produksi minggu ini.

### Fitur 3.3: Serialisasi Botol & Cetak Label Batch Thermal
* **Deskripsi**: Menghubungkan setiap botol fisik dengan sistem penelusuran (*traceability*).
* **Fungsionalitas Konkret**:
  - Menghasilkan nomor batch otomatis dengan format standar: `LOT-[TAHUN][BULAN]-[KODE VARIAN]-[NOMOR URUT]`.
  - Terintegrasi dengan printer thermal label untuk mencetak stiker bagian bawah botol dan segel boks, berisi nomor batch, tanggal peracikan, dan kode QR unik.

---

## 4. Role: Store Cashier & Scent Consultant (Kasir Butik & Frontliner)

Peran ini melayani pembelian langsung konsumen di butik, melayani refill botol, dan mencatat transaksi penjualan dengan cepat.

### Fitur 4.1: Point of Sale (POS) Khusus Toko Parfum
* **Deskripsi**: Kasir layar sentuh yang cepat dan fleksibel untuk berbagai jenis produk wewangian.
* **Fungsionalitas Konkret**:
  - Dukungan multi-varian: Menjual ukuran botol kemasan reguler (30ml, 50ml, 100ml) serta botol *discovery set* (5 x 5ml).
  - **Menu Penjualan Decant / Sample**: Kasir dapat mencatat penjualan tester/decant 2ml atau 5ml, yang secara otomatis memotong stok botol tester display toko.
  - Pembayaran instan: Mendukung QRIS statis/dinamis, kartu debit/kredit, tunai, dan transfer bank.

### Fitur 4.2: Katalog Interaktif Profil Aroma & Layering Consultant
* **Deskripsi**: Alat bantu staf butik untuk memandu calon pembeli memilih wewangian yang cocok.
* **Fungsionalitas Konkret**:
  - Filter pencarian aroma berdasarkan suasana: *Fresh/Office*, *Date Night*, *Warm Woody*, *Floral Soft*, *Outdoor Sporty*.
  - Menampilkan piramida aroma di layar kasir untuk dijelaskan kepada pembeli saat mereka mencium *blotter* (kertas tester).
  - Panduan *Scent Layering*: Memberi rekomendasi kombinasi 2 varian parfum yang menghasilkan wangi baru harmonis saat dipakai bersamaan.

### Fitur 4.3: Program Refill Botol Kosong & Tukar Kemasan
* **Deskripsi**: Mendukung inisiatif ramah lingkungan sekaligus program loyalitas pelanggan.
* **Fungsionalitas Konkret**:
  - Opsi transaksi *Refill Only*: Mengurangi stok cairan parfum tanpa memotong stok botol kaca dan boks kemasan.
  - Diskon daur ulang: Otomatis memotong harga jual botol baru jika konsumen membawa kembali kemasan botol kosong bekas mereka.

---

## 5. Role: End Customer (Konsumen Akhir via Digital Scent Passport™)

Peran ini adalah pembeli parfum yang mengakses sistem tanpa perlu login atau menginstal aplikasi, cukup dengan memindai kode QR atau menempelkan smartphone (NFC) pada botol.

### Fitur 5.1: Verifikasi Keaslian Batch Kriptografis
* **Deskripsi**: Menjamin kepada konsumen bahwa botol parfum yang mereka miliki asli dan bukan produk tiruan/oplosan.
* **Fungsionalitas Konkret**:
  - Menampilkan status keaslian: *"Batch Resmi Terdaftar: LOT #2609-EDP-042"*.
  - Indikator riwayat pemindaian: Menampilkan berapa kali kode QR ini telah dipindai untuk mendeteksi apabila kemasan dipalsukan atau diduplikasi oleh pihak tidak bertanggung jawab.

### Fitur 5.2: Kartu Kurasi Bahan & Catatan Maserasi Publik
* **Deskripsi**: Pengalaman mewah yang menceritakan perjalanan terciptanya wewangian tersebut.
* **Fungsionalitas Konkret**:
  - Informasi asal panen bahan alami utama (misalnya: *Bergamot Calabria - Panen 2025*, *Patchouli Gayo Aceh*).
  - Catatan tanggal peracikan dan durasi pematangan aroma dalam tangki sebelum dibotolkan.
  - Tips perawatan aroma: Panduan cara menyimpan botol agar terhindar dari panas matahari langsung dan oksidasi udara.

### Fitur 5.3: Akses Cepat Refill & Layanan Pelanggan
* **Deskripsi**: Memudahkan konsumen memesan ulang varian yang sama saat parfum mulai habis.
* **Fungsionalitas Konkret**:
  - Tombol satu klik: *"Pesan Refill Varian Ini"* langsung terhubung ke WhatsApp resmi brand atau marketplace pilihan.
  - Notifikasi rekomendasi varian pendamping (*Complementary Accords*) berdasarkan profil wangi botol yang sedang dibuka.
