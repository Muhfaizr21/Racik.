import type { VatTankItem } from '../types/admin'

export function AdminVatTable() {
  const vats: VatTankItem[] = [
    {
      id: '1',
      vat_number: 'VAT-STAINLESS-04',
      formula_name: 'Santal Royale Extrait',
      lot_number: 'LOT-202609-SNT-01',
      volume_liters: 10.0,
      days_progress: 18,
      days_target: 32,
      evaporation_pct: 1.44,
      temperature_c: 17.2,
      status: 'MACERATING'
    },
    {
      id: '2',
      vat_number: 'VAT-STAINLESS-02',
      formula_name: 'Rose Damascena Sublime',
      lot_number: 'LOT-202608-RSE-03',
      volume_liters: 25.0,
      days_progress: 28,
      days_target: 28,
      evaporation_pct: 1.85,
      temperature_c: 16.8,
      status: 'READY_HARVEST'
    },
    {
      id: '3',
      vat_number: 'VAT-STAINLESS-05',
      formula_name: 'Bergamot & White Amber',
      lot_number: 'LOT-202609-BGA-02',
      volume_liters: 15.0,
      days_progress: 6,
      days_target: 21,
      evaporation_pct: 0.52,
      temperature_c: 17.0,
      status: 'MACERATING'
    },
    {
      id: '4',
      vat_number: 'VAT-STAINLESS-01',
      formula_name: 'Assam Agarwood Supreme',
      lot_number: 'LOT-202607-OUD-01',
      volume_liters: 5.0,
      days_progress: 45,
      days_target: 45,
      evaporation_pct: 2.10,
      temperature_c: 16.5,
      status: 'READY_HARVEST'
    }
  ]

  return (
    <div className="rounded-2xl bg-[#161514] border border-white/10 overflow-hidden shadow-xl">
      {/* AdminLTE Card Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-[#1A1918] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">🛢️</span>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Status Tangki Vat Maserasi (Maceration Chamber)
            </h3>
            <p className="text-[11px] text-neutral-400">
              Pelacakan waktu kontak zat aromatis dan solven etanol dalam tangki stainless steel tertutup.
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Chamber Temp: 16.5°C &ndash; 17.5°C
        </span>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-[#121110] text-[10px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
            <tr>
              <th className="py-3 px-4">Tangki Vat</th>
              <th className="py-3 px-4">Formula & Lot Number</th>
              <th className="py-3 px-4">Volume</th>
              <th className="py-3 px-4">Progres Maserasi</th>
              <th className="py-3 px-4">Susut Evaporasi</th>
              <th className="py-3 px-4">Status Kematangan</th>
              <th className="py-3 px-4 text-right">Aksi Lab</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {vats.map((vat) => {
              const progressPct = Math.min(100, Math.round((vat.days_progress / vat.days_target) * 100))
              const isReady = vat.status === 'READY_HARVEST'

              return (
                <tr key={vat.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold text-white">{vat.vat_number}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-sans font-semibold text-neutral-200">{vat.formula_name}</div>
                    <div className="text-[10px] text-[#D4AF37] mt-0.5">{vat.lot_number}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">{vat.volume_liters} L</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-neutral-800 overflow-hidden shrink-0">
                        <div
                          className={`h-full ${isReady ? 'bg-emerald-400' : 'bg-[#D4AF37]'}`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <span className="text-[11px]">
                        {vat.days_progress}/{vat.days_target}h ({progressPct}%)
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-rose-300 font-bold">{vat.evaporation_pct}%</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isReady
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {isReady ? '✓ Siap Panen Botol' : 'Maserasi Berjalan'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isReady
                          ? 'bg-emerald-500 text-neutral-950 hover:bg-emerald-400 font-bold shadow-sm'
                          : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {isReady ? 'Jadwalkan Botol' : 'Uji Organoleptik'}
                    </button>
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
