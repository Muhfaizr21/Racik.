export function BrandPartners() {
  const ecosystem = [
    { label: 'Standar Keamanan', value: 'IFRA 51st Amendment' },
    { label: 'Regulasi Edar', value: 'Format Notifikasi BPOM RI' },
    { label: 'Analisis Formula', value: 'Kompatibel GC-MS Testing' },
    { label: 'Kanal Penjualan', value: 'Shopee · Tokopedia · POS Butik' },
    { label: 'Enkripsi Data', value: 'Zero-Knowledge AES-256' },
  ]

  return (
    <section className="relative py-8 border-y border-white/[0.06] bg-[#111010]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {ecosystem.map((item) => (
            <div key={item.label} className="space-y-1">
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
                {item.label}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-200 block">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
