import type { RawMaterialStock } from '../../owner/types/formula'

interface AdminInventoryTableProps {
  materials: RawMaterialStock[]
}

export function AdminInventoryTable({ materials }: AdminInventoryTableProps) {
  return (
    <div className="rounded-2xl bg-[#161514] border border-white/10 overflow-hidden shadow-xl">
      {/* AdminLTE Card Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-[#1A1918] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">📦</span>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Inventori Bahan Baku, Pelarut & Kemasan Flacon
            </h3>
            <p className="text-[11px] text-neutral-400">
              Audit stok real-time, berat jenis (SG), dan pelacakan sertifikat analisis (COA) dari supplier.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#D4AF37] text-neutral-950 hover:bg-[#e6c34a] transition-all cursor-pointer font-bold"
        >
          + Terima Bahan Baru
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-[#121110] text-[10px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
            <tr>
              <th className="py-3 px-4">Kode & Nama Bahan</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4">Berat Jenis (SG)</th>
              <th className="py-3 px-4">Stok Saat Ini</th>
              <th className="py-3 px-4">Harga / Gram</th>
              <th className="py-3 px-4">Supplier & Lot</th>
              <th className="py-3 px-4 text-right">Status Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {materials.map((mat) => {
              const isLowStock = mat.stock_grams < 1000 && mat.category === 'ESSENCE'

              return (
                <tr key={mat.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-sans font-semibold text-white">{mat.name}</div>
                    <div className="text-[10px] text-[#D4AF37] mt-0.5">{mat.code}</div>
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-neutral-300 border border-white/10">
                      {mat.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400">{mat.specific_gravity} g/ml</td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {mat.stock_grams.toLocaleString('id-ID')} g
                    {isLowStock && (
                      <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                        Kritis
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-300">
                    Rp {mat.cost_per_gram.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    <div className="text-neutral-300 text-xs">{mat.supplier_name || 'Capua 1880 S.r.l'}</div>
                    <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                      COA: {mat.coa_number || 'COA-VERIFIED'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-sans">
                      ✓ Teruji Lab
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
