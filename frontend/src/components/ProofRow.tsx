export function ProofRow() {
  const items = [
    { value: '150+', label: 'Brand Premium' },
    { value: '2.4K', label: 'Pengguna Aktif' },
    { value: '99.9%', label: 'Uptime Record' },
    { value: '50J+', label: 'Transaksi / Tahun' },
  ]

  return (
    <section className="relative py-16 bg-[#161616] border-y border-white/[0.04]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.label} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] tracking-tight">{item.value}</div>
              <div className="mt-1 text-sm text-neutral-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
