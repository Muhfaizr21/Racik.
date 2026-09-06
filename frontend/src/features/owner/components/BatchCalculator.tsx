import { useState } from 'react'
import type { Formula, BatchProjection } from '../types/formula'

interface BatchCalculatorProps {
  formula: Formula | null
  batchVolumeLiters: number
  projection: BatchProjection | null
  onVolumeChange: (volume: number) => void
}

const VOLUME_PRESETS = [5, 10, 25, 50, 100]

export function BatchCalculator({
  formula,
  batchVolumeLiters,
  projection,
  onVolumeChange
}: BatchCalculatorProps) {
  const [retailPrice, setRetailPrice] = useState<number>(450000)

  if (!formula || !projection) {
    return (
      <div className="p-8 rounded-2xl bg-[#171615] border border-white/5 text-center text-neutral-400">
        Pilih formula dari kubah di atas untuk melakukan simulasi proyeksi batch produksi.
      </div>
    )
  }

  // Margin calculation
  const costPerBottle = projection.estimated_cost_per_bottle
  const grossProfitPerBottle = Math.max(0, retailPrice - costPerBottle)
  const grossMarginPct = retailPrice > 0 ? ((grossProfitPerBottle / retailPrice) * 100).toFixed(1) : '0'
  const totalBatchRevenue = projection.finished_bottles_50ml * retailPrice
  const totalBatchCost = projection.finished_bottles_50ml * costPerBottle
  const totalBatchProfit = totalBatchRevenue - totalBatchCost

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#181716] border border-[#D4AF37]/30 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <h3 className="text-lg font-bold text-white font-display tracking-wide">
              Simulasi Proyeksi Batch Produksi & Margin
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Menghitung konversi massa bahan (gram ke liter), susut penguapan, & HPP untuk{' '}
            <span className="text-[#D4AF37] font-semibold">{formula.name}</span> ({formula.code})
          </p>
        </div>

        {/* Volume Preset Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-medium">Kapasitas Tangki:</span>
          <div className="flex gap-1.5 bg-[#121110] p-1 rounded-xl border border-white/10">
            {VOLUME_PRESETS.map((vol) => (
              <button
                key={vol}
                type="button"
                onClick={() => onVolumeChange(vol)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  batchVolumeLiters === vol
                    ? 'bg-[#D4AF37] text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {vol}L
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of 4 Key Industrial Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Output Botol */}
        <div className="p-4 rounded-xl bg-[#1D1B1A] border border-white/5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
            Target Output Botol (50ml)
          </span>
          <div className="text-2xl font-bold text-white tracking-tight">
            {projection.finished_bottles_50ml}{' '}
            <span className="text-xs font-normal text-neutral-400">flacon</span>
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <span>✓</span> Toleransi isi presisi
          </div>
        </div>

        {/* Metric 2: Waktu Maserasi Tangki */}
        <div className="p-4 rounded-xl bg-[#1D1B1A] border border-white/5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
            Durasi Maserasi Tangki Vat
          </span>
          <div className="text-2xl font-bold text-amber-300 tracking-tight">
            {projection.estimated_maceration_days}{' '}
            <span className="text-xs font-normal text-neutral-400">hari kalender</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            Suhu ideal: 16°C &ndash; 18°C
          </div>
        </div>

        {/* Metric 3: Susut Evaporasi (Angels' Share) */}
        <div className="p-4 rounded-xl bg-[#1D1B1A] border border-white/5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
            Susut Evaporasi (Angels' Share)
          </span>
          <div className="text-2xl font-bold text-rose-300 tracking-tight">
            {projection.evaporation_shrinkage_loss}%
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            Estimasi susut: ~{((batchVolumeLiters * projection.evaporation_shrinkage_loss) / 100).toFixed(2)}L
          </div>
        </div>

        {/* Metric 4: HPP per Botol */}
        <div className="p-4 rounded-xl bg-[#1D1B1A] border border-white/5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
            HPP per Botol 50ml
          </span>
          <div className="text-2xl font-bold text-[#D4AF37] tracking-tight">
            Rp {costPerBottle.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            Biaya per semprot: Rp {projection.cost_per_spray_idr}
          </div>
        </div>
      </div>

      {/* Financial Margin & Profitability Simulator */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-[#1D1B1A] to-[#241A17] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide">
              Simulasi Harga Jual Butik & Laba Kotor Batch
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5">
              Sesuaikan target harga ritel untuk memproyeksikan laba kotor seluruh volume tangki.
            </p>
          </div>

          {/* Retail price input */}
          <div className="flex items-center gap-2 bg-[#141312] px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-xs text-neutral-400">Harga Jual: Rp</span>
            <input
              type="number"
              step="5000"
              value={retailPrice}
              onChange={(e) => setRetailPrice(Number(e.target.value))}
              className="w-24 bg-transparent text-sm font-bold text-[#D4AF37] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/10 text-xs">
          <div>
            <span className="text-neutral-400 block">Laba Kotor per Botol:</span>
            <span className="text-base font-bold text-white">
              Rp {grossProfitPerBottle.toLocaleString('id-ID')}
            </span>
            <span className="ml-2 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold text-[10px]">
              {grossMarginPct}% Margin
            </span>
          </div>

          <div>
            <span className="text-neutral-400 block">Total Modal Bahan (Batch {batchVolumeLiters}L):</span>
            <span className="text-base font-bold text-neutral-300">
              Rp {totalBatchCost.toLocaleString('id-ID')}
            </span>
          </div>

          <div>
            <span className="text-neutral-400 block">Potensi Laba Bersih Batch:</span>
            <span className="text-base font-bold text-emerald-400">
              Rp {totalBatchProfit.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      {/* Specific Gravity & Gramatur Breakdown Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            Timbangan Kebutuhan Gramatur Tangki ({batchVolumeLiters} Liter):
          </h4>
          <span className="text-[11px] text-neutral-400 font-mono">
            Rumus: Massa (g) = Volume (ml) &times; Specific Gravity
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-[#121110] text-[11px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
              <tr>
                <th className="py-2.5 px-4">Nama Bahan</th>
                <th className="py-2.5 px-4">Layer</th>
                <th className="py-2.5 px-4">Proporsi (%)</th>
                <th className="py-2.5 px-4">Berat Jenis (SG)</th>
                <th className="py-2.5 px-4 text-right">Target Gramatur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {formula.ingredients?.map((ing, idx) => {
                const totalVolumeMl = batchVolumeLiters * 1000
                const ingredientVolumeMl = (totalVolumeMl * ing.percentage) / 100
                const targetWeightG = Number((ingredientVolumeMl * ing.specific_gravity).toFixed(1))

                return (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="py-2 px-4 font-sans font-medium text-white">{ing.material_name}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ing.layer === 'TOP'
                          ? 'bg-amber-500/15 text-amber-300'
                          : ing.layer === 'HEART'
                          ? 'bg-rose-500/15 text-rose-300'
                          : ing.layer === 'BASE'
                          ? 'bg-amber-600/15 text-amber-400'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {ing.layer}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-neutral-300">{ing.percentage}%</td>
                    <td className="py-2 px-4 text-neutral-400">{ing.specific_gravity} g/ml</td>
                    <td className="py-2 px-4 text-right font-bold text-[#D4AF37]">
                      {targetWeightG.toLocaleString('id-ID')} g
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
